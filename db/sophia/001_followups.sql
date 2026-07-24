-- =============================================================================
-- Follow-up automatico de leads (WhatsApp / Sophia Brutos)
-- Banco: projeto Supabase "SOPHIA" (vfwvwiioldajuicxpwgc) - o banco do bot.
--
-- Cadencia: etapa 1 = +24h, etapa 2 = +3 dias, etapa 3 = +7 dias, e encerra.
-- Toda a regra de negocio vive aqui (e nao espalhada em IFs do n8n), para que
-- o fluxo do bot precise de um unico no novo e o comportamento seja testavel
-- por SQL.
-- =============================================================================

create table if not exists public.followups (
    id               bigint generated always as identity primary key,
    telefone_cliente text        not null,
    cliente_id       bigint      references public."Clientes"(id) on delete cascade,
    nome_cliente     text,
    etapa            smallint    not null check (etapa between 1 and 3),
    status           text        not null default 'pendente'
                     check (status in ('pendente','processando','enviado','cancelado','erro')),
    agendado_para    timestamptz not null,
    enviado_em       timestamptz,
    mensagem         text,
    erro             text,
    created_at       timestamptz not null default now()
);

comment on table public.followups is
    'Fila de follow-ups de leads que pararam de responder. Uma linha viva por lead.';

-- Garante um unico follow-up vivo por lead: se o cliente responde, o pendente e
-- cancelado antes de reagendar, entao esse indice nunca deve estourar.
create unique index if not exists followups_um_vivo_por_lead
    on public.followups (telefone_cliente)
    where status in ('pendente','processando');

-- Indice da varredura (Schedule Trigger a cada 15 min).
create index if not exists followups_devidos
    on public.followups (status, agendado_para)
    where status = 'pendente';

-- Auditoria por lead.
create index if not exists followups_por_lead
    on public.followups (telefone_cliente, created_at desc);


-- -----------------------------------------------------------------------------
-- agendar_followup(telefone, nome)
-- Chamada pelo fluxo do bot ao fim de cada resposta enviada ao cliente.
-- Faz as duas coisas de uma vez:
--   1. cancela o follow-up pendente (o cliente respondeu, entao nao cobra mais);
--   2. reagenda a etapa 1 para daqui 24h a partir desta ultima interacao.
-- Nao agenda se a IA foi pausada para o lead (humano assumiu / lead descartado).
-- -----------------------------------------------------------------------------
create or replace function public.agendar_followup(
    p_telefone text,
    p_nome     text default null
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
    v_cliente  public."Clientes"%rowtype;
    v_id       bigint;
begin
    if p_telefone is null or btrim(p_telefone) = '' then
        return null;
    end if;

    -- 1. o cliente falou, entao qualquer cobranca agendada perde o sentido
    update public.followups
       set status = 'cancelado'
     where telefone_cliente = p_telefone
       and status in ('pendente','processando');

    select * into v_cliente
      from public."Clientes"
     where telefone_cliente = p_telefone
     order by created_at desc
     limit 1;

    -- 2. IA pausada = vendedora assumiu a conversa; o bot nao volta sozinho
    if v_cliente.id is not null and coalesce(v_cliente."iaAtiva", true) = false then
        return null;
    end if;

    -- 3. reagenda a etapa 1
    insert into public.followups (telefone_cliente, cliente_id, nome_cliente, etapa, agendado_para)
    values (
        p_telefone,
        v_cliente.id,
        coalesce(nullif(btrim(p_nome), ''), v_cliente.nome_cliente),
        1,
        now() + interval '24 hours'
    )
    returning id into v_id;

    return v_id;
end;
$$;


-- -----------------------------------------------------------------------------
-- pegar_followups_devidos(limite)
-- Chamada pelo workflow de varredura. Reserva as linhas devidas marcando-as como
-- 'processando' na mesma transacao. FOR UPDATE SKIP LOCKED e o que impede envio
-- duplicado se duas execucoes do cron se sobrepuserem.
-- Revalida iaAtiva e traz o long_memory mais recente do lead para a IA escrever
-- uma mensagem com contexto.
-- -----------------------------------------------------------------------------
create or replace function public.pegar_followups_devidos(
    p_limite int default 8
)
returns table (
    id               bigint,
    telefone_cliente text,
    nome_cliente     text,
    etapa            smallint,
    long_memory      text,
    ultima_mensagem  text
)
language plpgsql
security definer
set search_path = public
as $$
begin
    return query
    with devidos as (
        select f.id
          from public.followups f
          left join public."Clientes" c on c.telefone_cliente = f.telefone_cliente
         where f.status = 'pendente'
           and f.agendado_para <= now()
           and coalesce(c."iaAtiva", true) = true
         order by f.agendado_para
           for update of f skip locked
         limit greatest(p_limite, 0)
    ),
    reservados as (
        update public.followups f
           set status = 'processando'
          from devidos d
         where f.id = d.id
        returning f.id, f.telefone_cliente, f.nome_cliente, f.etapa
    )
    select r.id,
           r.telefone_cliente,
           r.nome_cliente,
           r.etapa,
           l.long_memory,
           l.mensagem_output
      from reservados r
      left join lateral (
            select lt.long_memory, lt.mensagem_output
              from public."Log_think" lt
             where lt.telefone_cliente = r.telefone_cliente
             order by lt.created_at desc
             limit 1
      ) l on true;
end;
$$;


-- -----------------------------------------------------------------------------
-- concluir_followup(id, mensagem)
-- Marca o envio como concluido e agenda a proxima etapa a partir de agora:
--   etapa 1 -> etapa 2 em +3 dias
--   etapa 2 -> etapa 3 em +7 dias
--   etapa 3 -> encerra o ciclo (lead frio)
-- -----------------------------------------------------------------------------
create or replace function public.concluir_followup(
    p_id       bigint,
    p_mensagem text default null
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
    v_fu       public.followups%rowtype;
    v_proximo  bigint;
    v_intervalo interval;
begin
    update public.followups
       set status     = 'enviado',
           enviado_em = now(),
           mensagem   = p_mensagem
     where id = p_id
    returning * into v_fu;

    if v_fu.id is null then
        return null;
    end if;

    v_intervalo := case v_fu.etapa
                       when 1 then interval '3 days'
                       when 2 then interval '7 days'
                       else null
                   end;

    if v_intervalo is null then
        return null;  -- fim da cadencia
    end if;

    insert into public.followups (telefone_cliente, cliente_id, nome_cliente, etapa, agendado_para)
    values (v_fu.telefone_cliente, v_fu.cliente_id, v_fu.nome_cliente,
            v_fu.etapa + 1, now() + v_intervalo)
    on conflict do nothing
    returning id into v_proximo;

    return v_proximo;
end;
$$;


-- -----------------------------------------------------------------------------
-- falhar_followup(id, erro)
-- Envio falhou. Marca como erro sem reagendar, para ficar visivel na auditoria.
-- -----------------------------------------------------------------------------
create or replace function public.falhar_followup(
    p_id   bigint,
    p_erro text default null
)
returns void
language sql
security definer
set search_path = public
as $$
    update public.followups
       set status = 'erro',
           erro   = left(coalesce(p_erro, 'erro desconhecido'), 1000)
     where id = p_id;
$$;

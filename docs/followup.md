# Follow-up automático de leads (WhatsApp)

Quando a Sophia manda o catálogo e o lead some, o bot volta sozinho.
Antes disso não existia: **51% dos leads morriam exatamente nesse ponto** (135 de 266 leads
receberam o link do catálogo e nunca mais responderam).

## Cadência

| Etapa | Quando | Tom |
|---|---|---|
| 1 | 24h depois da última resposta da Sophia | "Conseguiu dar uma olhada no catálogo?" |
| 2 | 3 dias depois da etapa 1 | Cita o interesse do lead (vem do `long_memory`) e quebra objeção |
| 3 | 7 dias depois da etapa 2 | Última chamada, oferece falar com a vendedora |

Depois da etapa 3 o ciclo encerra. O lead nunca recebe uma quarta cobrança.

## Peças

| Onde | O quê |
|---|---|
| Banco `SOPHIA` (`vfwvwiioldajuicxpwgc`) | tabela `followups` + 4 funções SQL — `db/sophia/001_followups.sql` |
| n8n `s3LiXOFgzjo9tLYf` (bot, **ativo**) | 1 nó novo: `AGENDA FOLLOW-UP` |
| n8n `vyIgjJpiN5C6QkiU` (**inativo** até liberar) | `🟩SOPHIA BRUTOS | FOLLOW-UP` — `n8n/followup-sophia.json` |

Infra reaproveitada, sem credencial nova: Evolution `Soph.ia` (`evo-sb.lanceinaweb.com`),
`Supabase account`, `🟥OPENAI | SOPHIA` (gpt-4.1-mini).

## Como funciona

O bot, ao fim de cada resposta enviada, chama `agendar_followup(telefone, nome)`. Essa função:

1. **cancela** qualquer follow-up pendente daquele lead (ele respondeu, não faz sentido cobrar);
2. **não agenda** se `Clientes.iaAtiva = false` (a vendedora assumiu a conversa);
3. **agenda** a etapa 1 para daqui 24h.

O workflow de follow-up roda a cada 15 min, só em horário comercial: **seg a sex, 09h–17h BRT**.
A loja atende seg–qui até 18h, sex até 17h, e **não abre sábado** — a janela 09h–17h cabe dentro
do expediente em qualquer dia útil, sem precisar de regra por dia da semana.
Ele reserva as linhas devidas com `FOR UPDATE SKIP LOCKED` — é isso que impede envio duplicado
se duas execuções do cron se sobrepuserem. Depois gera a mensagem com IA usando o `long_memory`
do lead, espera de 20 a 45s (jitter anti-spam), envia, grava no `Log_think` e agenda a próxima etapa.

Toda a regra de negócio está nas funções SQL, não espalhada em IFs do n8n. Dá para testar tudo
por SQL sem disparar mensagem nenhuma.

## Operação

**Pausar tudo:** desative o workflow `🟩SOPHIA BRUTOS | FOLLOW-UP` no n8n. Nada se perde,
a fila só para de ser consumida.

**Pausar um lead só:** `update "Clientes" set "iaAtiva" = false where telefone_cliente = '...';`
(é o mesmo mecanismo do `escalar_humano`).

**Acompanhar:**
```sql
select etapa, status, count(*) from followups group by 1, 2 order by 1, 2;

-- quem está na fila para hoje
select telefone_cliente, nome_cliente, etapa, agendado_para
  from followups where status = 'pendente' order by agendado_para;

-- falhas de envio
select telefone_cliente, etapa, erro, created_at
  from followups where status = 'erro' order by created_at desc;
```

**Mudar a cadência:** os intervalos estão em `concluir_followup` (`3 days` / `7 days`) e em
`agendar_followup` (`24 hours`). Alterar a função basta, não precisa mexer no n8n.

## Decisões e limites

- **Sem backfill.** Os 278 leads que já estavam no banco não entram. Disparar 135 mensagens de
  uma vez queima o número no WhatsApp. Só valem conversas a partir da ativação.
- **Instância hardcoded.** O bot pega `instanceName` do webhook da Evolution; o follow-up não tem
  webhook, então usa `Soph.ia` fixo no nó `config`. **Se a instância for renomeada, mudar lá.**
- **`Clientes.data_n8n` e `Clientes.transferido` continuam mortos** (sempre NULL / sempre 0).
  Não foram usados aqui de propósito, para não herdar campo com semântica indefinida.
- Nenhuma tabela do banco `SOPHIA` tem RLS ligado. Está protegido só porque o n8n usa
  `service_role`, mas a `anon key` existe e hoje leria o `Log_think` inteiro. Vale tratar
  separado — não bloqueia o follow-up.

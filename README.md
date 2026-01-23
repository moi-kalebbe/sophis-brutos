
# Sophia Brutos - Next.js 14

Projeto desenvolvido com Next.js 14, Tailwind CSS e Supabase.

## Funcionalidades

### Landing Page
- Conversão fiel do design original (`model3.html`)
- Design responsivo e moderno com animações
- **Tracking de WhatsApp**: Captura UTMs da URL e salva no banco de dados
- **Dynamic Scripts**: Injeção de pixels (Facebook, Google) gerenciável via admin

### Painel Administrativo (`/admin`)
- **Login**: Autenticação segura via Supabase Auth
- **Dashboard**: Visão geral de cliques e pixels ativos
- **Pixels**: Ativação/desativação de scripts sem mexer no código
- **Analytics**: Tabela de cliques com filtros e exportação CSV

## Tecnologias

- [Next.js 14](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Auth + Database)
- [Lucide React](https://lucide.dev/) (Ícones)
- [Recharts](https://recharts.org/) (Gráficos)

## Configuração Local

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente em `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=seu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do Banco de Dados (Supabase)

O SQL para criar as tabelas está disponível na documentação interna ou pode ser recriado com:

```sql
-- Tabela de Configurações
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facebook_pixel_id TEXT,
  facebook_active BOOLEAN DEFAULT FALSE,
  google_analytics_id TEXT,
  analytics_active BOOLEAN DEFAULT FALSE,
  google_ads_id TEXT,
  ads_active BOOLEAN DEFAULT FALSE,
  custom_scripts TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Rastreamento
CREATE TABLE click_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,
  device_type TEXT
);
```

## Deploy

O projeto está pronto para deploy na Vercel. 
Lembre-se de configurar as variáveis de ambiente no painel da Vercel.

# Stack Tecnológica Recomendada – Reconstrução ILC Log

## Princípios Norteadores da Escolha

1. **Performance** – Core Web Vitals excelentes (LCP < 2.5s, CLS < 0.1)
2. **Escalabilidade** – Suportar crescimento sem reescrita
3. **Manutenibilidade** – Código tipado, testável, documentado
4. **Segurança** – Autenticação robusta, proteção de conteúdo, LGPD
5. **DX (Developer Experience)** – Deploy simples, hot reload, TypeScript
6. **Custo** – Stack com opções gratuitas/acessíveis para começar

---

## STACK COMPLETA

### FRONTEND

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Framework | **Next.js** | 15 (App Router) | SSR/SSG/ISR, SEO nativo, React Server Components |
| Linguagem | **TypeScript** | 5.x | Tipagem estática, menos bugs, melhor DX |
| Estilização | **Tailwind CSS** | 4.x | Utility-first, design consistente, bundle pequeno |
| Componentes UI | **shadcn/ui** | latest | Componentes acessíveis, customizáveis, sem vendor lock-in |
| Ícones | **Lucide React** | latest | Leve, consistente, open-source |
| Formulários | **React Hook Form** + **Zod** | latest | Validação client-side performática e type-safe |
| Estado Global | **Zustand** | 5.x | Simples, leve, sem boilerplate |
| Animações | **Framer Motion** | 11.x | Animações profissionais e acessíveis |
| Editor de Conteúdo (Admin) | **Tiptap** | 2.x | Editor rico extensível, output HTML/JSON |

---

### BACKEND

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| API Routes | **Next.js API Routes** / **Route Handlers** | 15 | Serverless por padrão, mesmo repositório |
| ORM | **Drizzle ORM** | latest | Type-safe, migrations nativas, excelente performance |
| Validação | **Zod** | 3.x | Schema validation compartilhado front+back |
| Autenticação | **Auth.js (NextAuth v5)** | 5.x | JWT + Sessions, integração Next.js nativa |
| E-mail | **Resend** + **React Email** | latest | API moderna, templates em React, gratuito até 3k/mês |
| Upload de Arquivos | **UploadThing** | 7.x | Upload seguro, integrado com Next.js, storage automático |

---

### BANCO DE DADOS & STORAGE

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Banco de Dados | **PostgreSQL** via **Supabase** | Managed, gratuito até 500MB, Row Level Security |
| Storage (PDFs/Imagens) | **Supabase Storage** | Integrado, CDN, políticas de acesso, gratuito 1GB |
| Cache | **Vercel KV** (Redis) | Cache de sessões e dados frequentes |

> **Alternativa self-hosted:** Neon (PostgreSQL serverless, gratuito), Cloudflare R2 (storage)

---

### INFRA & DEPLOY

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Hosting | **Vercel** | Deploy zero-config para Next.js, Edge Network global |
| CI/CD | **GitHub Actions** | Testes automáticos, lint, deploy na PR |
| DNS / CDN | **Cloudflare** | CDN gratuito, proteção DDoS, WAF |
| Monitoramento | **Sentry** | Error tracking, performance monitoring |
| Analytics | **Vercel Analytics** + **Umami** | Privacy-first, sem cookies, LGPD compliant |

---

### PAINEL ADMINISTRATIVO

| Abordagem | Tecnologia | Justificativa |
|-----------|-----------|---------------|
| Admin UI | **Construído no próprio Next.js** (`/admin/*`) | Sem dependência externa, controle total |
| Autenticação Admin | **Auth.js** com role `admin`/`editor` | Mesmo sistema de auth |
| Tabelas de dados | **TanStack Table** | Paginação, filtros, ordenação |
| Gráficos | **Recharts** | Leve, React-native |

---

## ESTRUTURA DO PROJETO

```
ilclog/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # Layout público
│   │   │   ├── page.tsx              # Home
│   │   │   ├── quem-somos/
│   │   │   ├── servicos/
│   │   │   │   └── [slug]/
│   │   │   ├── mastermind-infraestrutura-e-logistica/
│   │   │   │   ├── [track]/
│   │   │   │   │   └── [session]/
│   │   │   ├── contato/
│   │   │   ├── redes-sociais/
│   │   │   └── category/[slug]/      # Blog por categoria
│   │   ├── (auth)/                   # Layout de autenticação
│   │   │   ├── login/
│   │   │   └── password-reset/
│   │   ├── (protected)/              # Conteúdo protegido (requer login)
│   │   │   └── mastermind/           # Acesso completo ao Mastermind
│   │   ├── admin/                    # Painel administrativo
│   │   │   ├── dashboard/
│   │   │   ├── posts/
│   │   │   ├── services/
│   │   │   ├── mastermind/
│   │   │   ├── contacts/
│   │   │   ├── users/
│   │   │   └── settings/
│   │   └── api/                      # API Routes
│   │       ├── auth/
│   │       ├── contact/
│   │       ├── posts/
│   │       ├── services/
│   │       ├── mastermind/
│   │       └── upload/
│   ├── components/
│   │   ├── ui/                       # shadcn/ui base components
│   │   ├── layout/                   # Header, Footer, Nav
│   │   ├── home/                     # Seções da home
│   │   ├── mastermind/               # Componentes do Mastermind
│   │   ├── blog/                     # Componentes do blog
│   │   └── admin/                    # Componentes do admin
│   ├── lib/
│   │   ├── db/                       # Drizzle schema + queries
│   │   │   ├── schema.ts
│   │   │   └── migrations/
│   │   ├── auth/                     # Auth.js config
│   │   ├── email/                    # Templates React Email
│   │   ├── storage/                  # Upload helpers
│   │   └── validations/              # Schemas Zod compartilhados
│   ├── types/                        # TypeScript types globais
│   └── middleware.ts                 # Proteção de rotas
├── public/
├── .env.local
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## DEPENDÊNCIAS PRINCIPAIS

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@auth/nextjs": "^5.0.0",
    "drizzle-orm": "latest",
    "drizzle-kit": "latest",
    "@neondatabase/serverless": "latest",
    "zod": "^3.0.0",
    "react-hook-form": "^7.0.0",
    "@hookform/resolvers": "latest",
    "resend": "latest",
    "@react-email/components": "latest",
    "uploadthing": "^7.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "latest",
    "@tiptap/react": "^2.0.0",
    "@tanstack/react-table": "^8.0.0",
    "zustand": "^5.0.0",
    "recharts": "latest"
  }
}
```

---

## VARIÁVEIS DE AMBIENTE

```env
# Banco de Dados
DATABASE_URL=postgresql://...

# Auth
AUTH_SECRET=
AUTH_URL=https://ilclog.com

# E-mail (Resend)
RESEND_API_KEY=
EMAIL_FROM=noreply@ilclog.com
EMAIL_CONTACT=gerencia.comercial@ilclog.com

# Storage (Supabase)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Upload (UploadThing)
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Sentry
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
```

---

## COMPARATIVO: ATUAL vs NOVO

| Aspecto | WordPress (Atual) | Next.js + Supabase (Novo) |
|---------|-------------------|--------------------------|
| Performance | Média (plugins pesados) | Excelente (SSG/ISR, CDN) |
| Segurança | Vulnerável a plugins | Auth.js + RLS + TypeScript |
| SEO | Plugin Yoast | Nativo no Next.js |
| Escalabilidade | Limitada | Edge-ready, serverless |
| Manutenção | Alto custo (updates) | Baixo, stack moderna |
| Admin | wp-admin genérico | Admin customizado ao negócio |
| Área de membros | Plugin pago | Nativa + controle total |
| TypeScript | Não | Sim (100%) |
| Testes | Raros | Vitest + Playwright |
| Deploy | Manual/cPanel | CI/CD automático |

---

## ESTRATÉGIA DE MIGRAÇÃO

### Fase 1 – Fundação (Semanas 1-3)
- Setup do projeto Next.js + TypeScript
- Schema Drizzle + migrations PostgreSQL
- Sistema de autenticação (Auth.js)
- Componentes base (shadcn/ui + layout)

### Fase 2 – Conteúdo Público (Semanas 4-6)
- Home, Quem Somos, Serviços, Contato, Redes Sociais
- Blog/Notícias (listagem + artigo)
- SEO (sitemap, meta tags, og:image)
- Formulário de contato com envio de e-mail

### Fase 3 – Mastermind (Semanas 7-10)
- Área protegida com controle de acesso
- Listagem de trilhas e sessões
- Download protegido de PDFs
- Player/embed de vídeo por sessão

### Fase 4 – Painel Admin (Semanas 11-14)
- Dashboard com métricas
- CRUD: Posts, Serviços, Sessões, PDFs, Usuários
- Gestão de contatos recebidos
- Editor de conteúdo rico (Tiptap)
- Upload de imagens e PDFs

### Fase 5 – Polimento & Launch (Semanas 15-16)
- Testes E2E (Playwright)
- Revisão de performance (Lighthouse)
- Migração de dados do WordPress
- DNS cutover

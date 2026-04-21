# Documentação de Engenharia Reversa – ILC Log
## Índice Geral

> **Site analisado:** https://ilclog.com/  
> **Data da análise:** Abril/2026  
> **Objetivo:** Reconstrução completa em stack moderna (Next.js 15 + TypeScript + PostgreSQL)

---

## Documentos

| # | Arquivo | Conteúdo |
|---|---------|---------|
| 01 | [01-VISAO-GERAL.md](./01-VISAO-GERAL.md) | Identidade da empresa, equipe, público-alvo, tecnologia atual identificada |
| 02 | [02-MAPA-DO-SITE.md](./02-MAPA-DO-SITE.md) | Estrutura completa de páginas, hierarquia de URLs, detalhamento por seção |
| 03 | [03-REGRAS-DE-NEGOCIO.md](./03-REGRAS-DE-NEGOCIO.md) | Todas as regras de negócio: acesso, formulários, conteúdo, usuários, SEO |
| 04 | [04-SCHEMA-BANCO-DE-DADOS.md](./04-SCHEMA-BANCO-DE-DADOS.md) | Schema completo PostgreSQL com DDL, índices e ordem de migrations |
| 05 | [05-STACK-TECNOLOGICA.md](./05-STACK-TECNOLOGICA.md) | Stack alvo, estrutura real do repositório e diretrizes de execução |
| 06 | [06-FLUXOS-E-CASOS-DE-USO.md](./06-FLUXOS-E-CASOS-DE-USO.md) | Casos de uso detalhados, fluxos de autenticação, proteção de rotas |
| 07 | [07-INFRA-CONTAINERS.md](./07-INFRA-CONTAINERS.md) | Arquitetura Docker: aplicação + PostgreSQL + Redis opcional |
| 08 | [08-DIRETRIZES-DESIGN-3D.md](./08-DIRETRIZES-DESIGN-3D.md) | Padrões visuais atuais com elementos 3D para evolução das páginas |

---

## Resumo Executivo

### O que é o site
A ILC é uma consultoria especializada em infraestrutura e logística com sede em Brasília. O site serve como:
1. **Vitrine institucional** – apresenta a empresa, equipe e serviços
2. **Hub de notícias** – publica artigos sobre o setor
3. **Plataforma de membros** – entrega o programa **Mastermind** (sessões protegidas com PDFs)

### Tecnologia atual
WordPress com WPForms Lite. Área de membros via plugin nativo do WordPress.

### Tecnologia proposta para reconstrução
```
Frontend:  Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui
Backend:   Next.js API Routes + Drizzle ORM
Banco:     PostgreSQL (container local + managed em produção)
Auth:      Auth.js v5
E-mail:    Resend + React Email
Storage:   Supabase Storage (PDFs e imagens)
Cache:     Redis (opcional por profile)
Deploy:    Docker/Compose + CI/CD
```

### Estrutura atual do repositório
```
site-ilc/
├── docs/
├── prototype/
├── src/app/
├── Dockerfile
├── docker-compose.yml
├── .env / .env.example
└── package.json
```

### Volume de conteúdo a migrar
- 9 posts/artigos
- 4 páginas de serviços
- ~120+ sessões do Mastermind (5 trilhas: Infra 2023/24/25/26 + Portos)
- PDFs associados às sessões
- 7 páginas estáticas (home, quem somos, contato, redes sociais, login, password-reset, serviços index)

### Tabelas do banco de dados
12 tabelas: `users`, `team_members`, `social_links`, `services`, `categories`, `posts`, `mastermind_tracks`, `mastermind_sessions`, `session_pdfs`, `session_post_links`, `contacts`, `site_settings`

---

## Próximos Passos Recomendados

1. Validar documentação com o cliente (prioridades e backlog de migração)
2. Subir stack local em containers (ver `07-INFRA-CONTAINERS.md`)
3. Evoluir páginas públicas para o padrão de design 3D (ver `08-DIRETRIZES-DESIGN-3D.md`)
4. Implementar camada de dados (Drizzle + migrations + seeds)
5. Iniciar migração de conteúdo do WordPress (posts, sessões e PDFs)

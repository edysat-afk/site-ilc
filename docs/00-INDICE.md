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
| 05 | [05-STACK-TECNOLOGICA.md](./05-STACK-TECNOLOGICA.md) | Stack recomendada, comparativo atual vs novo, estrutura de projeto, plano de migração |
| 06 | [06-FLUXOS-E-CASOS-DE-USO.md](./06-FLUXOS-E-CASOS-DE-USO.md) | Casos de uso detalhados, fluxos de autenticação, proteção de rotas |

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
Banco:     PostgreSQL (Supabase)
Auth:      Auth.js v5
E-mail:    Resend + React Email
Storage:   Supabase Storage (PDFs e imagens)
Deploy:    Vercel + GitHub Actions
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

1. Validar documentação com o cliente (confirmar regras de negócio)
2. Definir identidade visual (redesign ou replicar atual?)
3. Setup do ambiente de desenvolvimento (ver `05-STACK-TECNOLOGICA.md` > Fase 1)
4. Iniciar migrations do banco de dados
5. Exportar conteúdo do WordPress atual (wp-export XML) antes de desativar

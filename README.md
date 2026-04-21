# ILC Site – Base Containerizada

Este repositório contém:

- `docs/`: documentação funcional/técnica do projeto
- `prototype/`: protótipos HTML de referência visual
- `src/app`: aplicação Next.js (estrutura inicial)
- `docker-compose.yml`: orquestração de aplicação + banco + cache opcional

## Subir com Docker (app + PostgreSQL)

```bash
docker compose up -d --build
```

## Subir com Redis habilitado (cache opcional)

```bash
docker compose --profile cache up -d --build
```

## URLs locais

- App: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis (quando profile cache ativo): localhost:6379

## Desenvolvimento sem Docker

```bash
npm install
npm run dev
```
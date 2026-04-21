# Infraestrutura em Containers – ILC

## Arquitetura proposta

```text
┌──────────────────┐      ┌─────────────────┐
│   ilc-app        │ <--> │     ilc-db      │
│ Next.js (3000)   │      │ PostgreSQL:16   │
└──────────────────┘      └─────────────────┘
          │
          │ opcional (profile cache)
          v
┌──────────────────┐
│    ilc-redis     │
│ Redis:7 (6379)   │
└──────────────────┘
```

---

## Serviços e responsabilidades

### `app`
- executa aplicação Next.js em modo produção (`npm run start`);
- depende da saúde do banco para inicialização;
- recebe `DATABASE_URL` e `REDIS_URL` por ambiente.

### `db`
- PostgreSQL 16 em volume persistente `postgres_data`;
- healthcheck com `pg_isready` para coordenação de dependências;
- ideal para desenvolvimento e homologação local.

### `redis` (opcional)
- ativado apenas com profile `cache`;
- persistência AOF habilitada (`appendonly yes`);
- foco inicial em cache/rate limit.

---

## Comandos operacionais

### Ambiente base
```bash
docker compose up -d --build
```

### Ambiente com cache
```bash
docker compose --profile cache up -d --build
```

### Encerrar ambiente
```bash
docker compose down
```

### Encerrar e remover volumes
```bash
docker compose down -v
```

---

## Checklist de validação de infraestrutura

- [ ] aplicação responde em `http://localhost:3000`;
- [ ] banco aceita conexão em `localhost:5432`;
- [ ] healthcheck de `db` fica `healthy`;
- [ ] Redis sobe com `--profile cache`;
- [ ] variáveis em `.env` e `.env.example` estão consistentes;
- [ ] volumes persistem dados após reinício.

---

## Riscos e mitigação

1. **Build lento de imagem**
   - Mitigar com cache de camadas e lockfile fixo.

2. **Divergência entre local e produção**
   - Mitigar padronizando runtime Node e variáveis obrigatórias.

3. **Uso indevido de Redis sem estratégia de invalidação**
   - Mitigar com políticas de TTL e monitoramento de hit-rate.
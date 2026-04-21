# Stack Tecnológica Recomendada – Reconstrução ILC Log

## Objetivo desta versão

Este documento reflete o estado atual do repositório e a estratégia prática de execução:

- aplicação web em Next.js;
- banco PostgreSQL em container dedicado;
- cache Redis como componente opcional;
- protótipos HTML preservados como referência visual.

---

## Stack alvo

### Aplicação

| Camada | Tecnologia | Status no repositório |
|---|---|---|
| Framework | Next.js 15 (App Router) | Estrutura inicial criada |
| Linguagem | TypeScript | Configurado |
| Runtime | Node 22 | Alinhado ao Dockerfile |

### Dados e infraestrutura

| Camada | Tecnologia | Estratégia |
|---|---|---|
| Banco transacional | PostgreSQL 16 | Container dedicado em `docker-compose.yml` |
| Cache | Redis 7 | Opcional via profile `cache` |
| Orquestração local | Docker Compose | Subida padronizada do ambiente |

---

## Estrutura atual do projeto

```text
site-ilc/
├── docs/                      # Documentação de produto, regras e arquitetura
├── prototype/                 # Protótipos HTML originais (referência)
├── src/
│   └── app/                   # Aplicação Next.js (layout, home, estilos globais)
├── Dockerfile                 # Build e runtime da aplicação
├── docker-compose.yml         # App + Postgres + Redis (opcional)
├── .env                       # Variáveis para execução local/container
├── .env.example               # Exemplo versionado
└── package.json               # Scripts e dependências
```

---

## Redis: avaliação de adoção

### Quando usar Redis

- cache de consultas frequentes (home, lista de trilhas, sessões públicas);
- rate limiting de login e endpoints sensíveis;
- armazenamento de sessão distribuída (quando houver múltiplas réplicas do app);
- fila leve para tarefas assíncronas (futuro).

### Quando não é obrigatório

- ambiente local de desenvolvimento inicial;
- carga baixa com volume reduzido de acessos simultâneos;
- aplicação ainda sem endpoints com gargalo de latência.

### Decisão recomendada

- manter Redis habilitável por profile (`docker compose --profile cache up`);
- operar sem Redis no início e ativar assim que métricas indicarem ganho;
- projetar código já com interface de cache para evitar refatoração futura.

---

## Operação local padronizada

### Subida padrão (app + banco)

```bash
docker compose up -d --build
```

### Subida com cache Redis

```bash
docker compose --profile cache up -d --build
```

### Endpoints locais

- aplicação: `http://localhost:3000`
- banco: `localhost:5432`
- redis (profile cache): `localhost:6379`

---

## Próxima evolução técnica recomendada

1. adicionar camada de acesso a dados (Drizzle + migrations);
2. criar healthcheck da aplicação com status de banco e cache;
3. integrar autenticação e rotas protegidas do Mastermind;
4. implementar cache seletivo de páginas e queries de leitura.
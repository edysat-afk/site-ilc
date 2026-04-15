# Schema do Banco de Dados – ILC Log
## Modelagem para PostgreSQL

---

## DIAGRAMA ENTIDADE-RELACIONAMENTO (Textual)

```
users ──────────────── sessions_mastermind (acesso via user_session_access)
  │
  └── posts (autor)

services (catálogo independente)

mastermind_editions ──── mastermind_sessions ──── session_pdfs
                                │
                            posts (relacionados)

contacts (formulário – sem FK, standalone)

social_links (standalone)

team_members (standalone)
```

---

## TABELAS

---

### `users`
Usuários do sistema (administradores, editores e membros).

```sql
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100)  NOT NULL,
    email           VARCHAR(255)  NOT NULL UNIQUE,
    password_hash   VARCHAR(255)  NOT NULL,
    role            VARCHAR(20)   NOT NULL DEFAULT 'member'
                    CHECK (role IN ('admin', 'editor', 'member')),
    is_active       BOOLEAN       NOT NULL DEFAULT true,
    avatar_url      TEXT,
    remember_token  VARCHAR(255),
    reset_token     VARCHAR(255),
    reset_expires   TIMESTAMP WITH TIME ZONE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email    ON users (email);
CREATE INDEX idx_users_role     ON users (role);
```

---

### `team_members`
Membros da equipe exibidos no site (perfil público e contatos).

```sql
CREATE TABLE team_members (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(150) NOT NULL,
    role        VARCHAR(100) NOT NULL,      -- Ex: "Diretor Executivo"
    bio         TEXT,
    phone       VARCHAR(20),
    email       VARCHAR(255),
    photo_url   TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    is_active   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### `social_links`
Links de redes sociais por entidade (empresa ou pessoa da equipe).

```sql
CREATE TABLE social_links (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type     VARCHAR(20) NOT NULL
                    CHECK (entity_type IN ('company', 'team_member')),
    entity_id       UUID,                   -- NULL quando entity_type = 'company'
    platform        VARCHAR(30) NOT NULL
                    CHECK (platform IN ('linkedin', 'instagram', 'facebook', 'youtube', 'twitter', 'tiktok')),
    url             TEXT NOT NULL,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_social_links_entity ON social_links (entity_type, entity_id);
```

---

### `services`
Catálogo de serviços da ILC.

```sql
CREATE TABLE services (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug            VARCHAR(200) NOT NULL UNIQUE,
    title           VARCHAR(200) NOT NULL,
    short_desc      TEXT         NOT NULL,   -- Texto resumido (para cards)
    full_desc       TEXT         NOT NULL,   -- Texto completo da página do serviço
    icon_name       VARCHAR(100),            -- Nome do ícone (ex: lucide icon name)
    cover_image_url TEXT,
    meta_title      VARCHAR(200),
    meta_desc       TEXT,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_published    BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_services_slug ON services (slug);
```

---

### `categories`
Categorias para posts/notícias.

```sql
CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        VARCHAR(100) NOT NULL UNIQUE,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed: categoria padrão
-- INSERT INTO categories (slug, name) VALUES ('noticias', 'Notícias');
```

---

### `posts`
Artigos do blog/notícias.

```sql
CREATE TABLE posts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug            VARCHAR(300) NOT NULL UNIQUE,
    title           VARCHAR(300) NOT NULL,
    excerpt         TEXT,                    -- Resumo para listagens
    content         TEXT         NOT NULL,   -- Conteúdo completo (HTML/Markdown)
    cover_image_url TEXT,
    author_id       UUID REFERENCES users(id) ON DELETE SET NULL,
    category_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
    status          VARCHAR(20)  NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'published', 'archived')),
    published_at    TIMESTAMP WITH TIME ZONE,
    meta_title      VARCHAR(300),
    meta_desc       TEXT,
    view_count      INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_posts_slug         ON posts (slug);
CREATE INDEX idx_posts_status       ON posts (status);
CREATE INDEX idx_posts_published_at ON posts (published_at DESC);
CREATE INDEX idx_posts_category_id  ON posts (category_id);
```

---

### `mastermind_tracks`
Trilhas/edições do programa Mastermind (ex: Infra 2023, Infra 2024, Portos).

```sql
CREATE TABLE mastermind_tracks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug            VARCHAR(200) NOT NULL UNIQUE,
    title           VARCHAR(200) NOT NULL,   -- Ex: "Infra 2023", "Portos"
    description     TEXT,
    year            INTEGER,                 -- NULL para trilhas temáticas (Portos)
    track_type      VARCHAR(20) NOT NULL DEFAULT 'infra'
                    CHECK (track_type IN ('infra', 'portos', 'ferrovias', 'outros')),
    cover_image_url TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_mastermind_tracks_slug ON mastermind_tracks (slug);
```

---

### `mastermind_sessions`
Sessões individuais de cada trilha do Mastermind.

```sql
CREATE TABLE mastermind_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    track_id        UUID NOT NULL REFERENCES mastermind_tracks(id) ON DELETE CASCADE,
    slug            VARCHAR(300) NOT NULL UNIQUE,
    title           VARCHAR(300) NOT NULL,
    description     TEXT,
    content         TEXT,                    -- Conteúdo completo da sessão
    session_date    DATE,
    speaker_name    VARCHAR(200),
    speaker_bio     TEXT,
    speaker_photo   TEXT,
    cover_image_url TEXT,
    video_url       TEXT,                    -- URL do vídeo (YouTube, Vimeo, etc.)
    is_published    BOOLEAN NOT NULL DEFAULT true,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    meta_title      VARCHAR(300),
    meta_desc       TEXT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_mastermind_sessions_track_id ON mastermind_sessions (track_id);
CREATE INDEX idx_mastermind_sessions_slug     ON mastermind_sessions (slug);
CREATE INDEX idx_mastermind_sessions_date     ON mastermind_sessions (session_date DESC);
```

---

### `session_pdfs`
PDFs associados a sessões do Mastermind.

```sql
CREATE TABLE session_pdfs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      UUID NOT NULL REFERENCES mastermind_sessions(id) ON DELETE CASCADE,
    title           VARCHAR(300) NOT NULL,
    file_url        TEXT NOT NULL,           -- URL no storage (S3 / Supabase Storage)
    file_size_kb    INTEGER,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_session_pdfs_session_id ON session_pdfs (session_id);
```

---

### `session_post_links`
Relacionamento N:N entre sessões do Mastermind e posts/notícias.

```sql
CREATE TABLE session_post_links (
    session_id UUID NOT NULL REFERENCES mastermind_sessions(id) ON DELETE CASCADE,
    post_id    UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    PRIMARY KEY (session_id, post_id)
);
```

---

### `contacts`
Mensagens recebidas pelo formulário de contato.

```sql
CREATE TABLE contacts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100),
    email       VARCHAR(255) NOT NULL,
    message     TEXT,
    ip_address  INET,
    user_agent  TEXT,
    status      VARCHAR(20) NOT NULL DEFAULT 'new'
                CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contacts_email     ON contacts (email);
CREATE INDEX idx_contacts_status    ON contacts (status);
CREATE INDEX idx_contacts_created   ON contacts (created_at DESC);
```

---

### `site_settings`
Configurações gerais do site (chave-valor).

```sql
CREATE TABLE site_settings (
    key         VARCHAR(100) PRIMARY KEY,
    value       TEXT,
    label       VARCHAR(200),               -- Descrição amigável para o painel admin
    type        VARCHAR(20) NOT NULL DEFAULT 'text'
                CHECK (type IN ('text', 'textarea', 'url', 'email', 'phone', 'boolean', 'json')),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exemplos de seeds:
-- INSERT INTO site_settings VALUES
--   ('site_name',         'ILC – Infraestrutura e Logística Conectada', 'Nome do Site', 'text', NOW()),
--   ('contact_email',     'gerencia.comercial@ilclog.com', 'E-mail de contato', 'email', NOW()),
--   ('address',           'Centro Empresarial Norte, Sl 233, 235...', 'Endereço', 'textarea', NOW()),
--   ('phone_executive',   '(61) 99942-1123', 'Tel. Diretor Executivo', 'phone', NOW()),
--   ('phone_financial',   '(61) 98111-9889', 'Tel. Diretor Financeiro', 'phone', NOW()),
--   ('phone_commercial',  '(61) 99325-9222', 'Tel. Gerente Comercial', 'phone', NOW());
```

---

## RESUMO DAS TABELAS

| Tabela | Finalidade | Relacionamentos |
|--------|-----------|-----------------|
| `users` | Autenticação e controle de acesso | → posts (autor) |
| `team_members` | Equipe pública | → social_links |
| `social_links` | Links de redes sociais | ← team_members, company |
| `services` | Catálogo de serviços | standalone |
| `categories` | Categorias de posts | → posts |
| `posts` | Blog/Notícias | ← users, categories |
| `mastermind_tracks` | Trilhas/Edições do Mastermind | → mastermind_sessions |
| `mastermind_sessions` | Sessões individuais | ← mastermind_tracks, → session_pdfs |
| `session_pdfs` | PDFs das sessões | ← mastermind_sessions |
| `session_post_links` | Vínculo sessão-post | ← mastermind_sessions, posts |
| `contacts` | Mensagens do formulário | standalone |
| `site_settings` | Configurações globais | standalone |

---

## ÍNDICES E PERFORMANCE

- Todos os slugs têm índice `UNIQUE` (busca por URL amigável)
- Posts indexados por `status` e `published_at DESC` (listagem e home)
- Sessions indexadas por `track_id` e `session_date`
- Contacts indexados por `status` (gestão admin) e `created_at`

---

## MIGRATIONS (Ordem de Criação)

```
01_create_users.sql
02_create_team_members.sql
03_create_social_links.sql
04_create_services.sql
05_create_categories.sql
06_create_posts.sql
07_create_mastermind_tracks.sql
08_create_mastermind_sessions.sql
09_create_session_pdfs.sql
10_create_session_post_links.sql
11_create_contacts.sql
12_create_site_settings.sql
13_seed_categories.sql
14_seed_services.sql
15_seed_site_settings.sql
16_seed_team_members.sql
```

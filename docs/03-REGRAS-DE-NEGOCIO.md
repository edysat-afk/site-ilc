# Regras de Negócio – ILC Infraestrutura e Logística Conectada

---

## RN-01: ACESSO AO CONTEÚDO MASTERMIND

### RN-01.1 – Conteúdo Protegido
- Todo o conteúdo das seções Mastermind (Infra 2023, 2024, 2025, 2026 e Portos) é restrito a usuários autenticados.
- Usuário não autenticado ao tentar acessar qualquer página Mastermind deve ser redirecionado para `/login`.

### RN-01.2 – Autenticação
- O sistema aceita login por **usuário** ou **e-mail** + **senha**.
- Existe opção de "Lembrar-me" (sessão persistente).
- Existe recuperação de senha via e-mail (`/password-reset`).

### RN-01.3 – Sessões do Mastermind
- Cada edição do Mastermind possui múltiplas **sessões individuais**.
- Cada sessão pode conter:
  - Texto/descrição da sessão
  - Palestrante(s)
  - Data de realização
  - Material em PDF para download
- PDFs são documentos protegidos associados às sessões.

### RN-01.4 – Organização Temporal
- O Mastermind é organizado por **edição/ano** (2023, 2024, 2025, 2026).
- Existe uma trilha especial **Portos** (thematic track independente do ano).

---

## RN-02: SERVIÇOS

### RN-02.1 – Catálogo de Serviços
- O sistema deve manter um catálogo de no mínimo **4 serviços**:
  1. Gestão de Projetos Estratégicos
  2. Consultoria Personalizada
  3. Treinamento e Palestras Técnicas
  4. Defesa de Pautas e Projetos Estratégicos
- Cada serviço tem: título, descrição resumida, descrição completa, ícone/imagem.

### RN-02.2 – Sem Precificação Pública
- Os serviços **não exibem preço** publicamente.
- Interessados são sempre direcionados para o formulário de contato.

### RN-02.3 – CTA de Serviços
- Toda página de serviço deve conter CTA direcionando para `/contato`.

---

## RN-03: BLOG / NOTÍCIAS

### RN-03.1 – Publicação de Notícias
- O sistema deve suportar criação, edição e publicação de artigos/notícias.
- Cada artigo deve conter: título, conteúdo, data de publicação, imagem de destaque (opcional), autor, categoria.

### RN-03.2 – Categoria Padrão
- Existe uma categoria padrão: **Notícias**.
- O sistema deve suportar múltiplas categorias para escalabilidade futura.

### RN-03.3 – Artigos na Home
- A home exibe os **3 artigos mais recentes** publicados.

### RN-03.4 – Artigos Relacionados ao Mastermind
- Artigos do blog podem ser vinculados/relacionados a sessões do Mastermind.

---

## RN-04: FORMULÁRIO DE CONTATO

### RN-04.1 – Campos
| Campo | Obrigatório | Tipo |
|-------|-------------|------|
| Nome | Sim | Texto (max 100 chars) |
| Sobrenome | Não | Texto (max 100 chars) |
| E-mail | Sim | E-mail válido |
| Mensagem | Não | Texto longo |

### RN-04.2 – Envio
- Ao submeter o formulário, o sistema deve:
  1. Validar campos obrigatórios (client-side e server-side)
  2. Validar formato do e-mail
  3. Enviar e-mail de notificação para `gerencia.comercial@ilclog.com`
  4. Enviar e-mail de confirmação para o remetente (opcional, recomendado)
  5. Exibir mensagem de sucesso/erro ao usuário

### RN-04.3 – Anti-Spam
- O formulário deve ter proteção contra bots (reCAPTCHA ou honeypot).

---

## RN-05: REDES SOCIAIS

### RN-05.1 – Perfis Cadastrados
- O sistema deve gerenciar links de redes sociais para:
  - Empresa ILC (LinkedIn, Instagram)
  - Diretor Executivo (LinkedIn, Instagram, Facebook)
  - Diretor Financeiro (LinkedIn, Instagram, Facebook)
- Links devem abrir em nova aba (`_blank`).

### RN-05.2 – Redes Suportadas
- LinkedIn, Instagram, Facebook, YouTube (mínimo).

---

## RN-06: GESTÃO DE USUÁRIOS

### RN-06.1 – Tipos de Usuário
| Tipo | Permissões |
|------|------------|
| Administrador | Acesso total: gerenciar conteúdo, usuários, configurações |
| Editor | Criar/editar/publicar posts, serviços, sessões Mastermind |
| Membro | Acesso ao conteúdo protegido do Mastermind |
| Visitante | Acesso apenas ao conteúdo público |

### RN-06.2 – Cadastro de Membros
- Novos membros são cadastrados pelo administrador (não há self-registration pública visível).
- Membro recebe credenciais por e-mail.

### RN-06.3 – Recuperação de Senha
- Sistema deve enviar e-mail com link de redefinição de senha.
- Link de redefinição expira após 24 horas.

---

## RN-07: SEO E CONTEÚDO

### RN-07.1 – URLs Amigáveis (Slug)
- Todas as páginas, posts e sessões devem ter URLs legíveis e amigáveis (slugs).
- Exemplo: `/mastermind-infraestrutura-e-logistica/infra-2024/nome-da-sessao`

### RN-07.2 – Meta Dados
- Cada página deve ter: title tag, meta description, og:image.

### RN-07.3 – Sitemap
- O sistema deve gerar sitemap.xml automaticamente com todas as páginas públicas.

---

## RN-08: DOCUMENTOS PDF

### RN-08.1 – Associação
- PDFs são associados a sessões específicas do Mastermind.
- Somente usuários autenticados podem acessar/baixar os PDFs.

### RN-08.2 – Armazenamento
- PDFs são armazenados em storage dedicado (não no banco de dados).
- URLs de PDFs devem ser protegidas (sem acesso direto sem autenticação).

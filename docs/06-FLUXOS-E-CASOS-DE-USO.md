# Fluxos e Casos de Uso – ILC Log

---

## UC-01: Visitante acessa a Home

**Ator:** Visitante (não autenticado)  
**Pré-condição:** Nenhuma  
**Fluxo:**
1. Visitante acessa `ilclog.com/`
2. Sistema exibe: Hero com CTA, 4 cards de serviços, 3 posts recentes
3. Visitante clica em "Saiba Mais" → vai para `/contato`
4. Visitante clica em serviço → vai para `/servicos/[slug]`
5. Visitante clica em post → vai para `/[slug-do-post]`

---

## UC-02: Visitante envia formulário de contato

**Ator:** Visitante  
**Fluxo:**
1. Acessa `/contato`
2. Preenche: Nome*, E-mail*, Sobrenome (opcional), Mensagem (opcional)
3. Clica "Enviar"
4. **Client-side:** Zod valida campos obrigatórios e formato do e-mail
5. **Server-side (API Route):** Valida novamente + verifica anti-spam
6. Sistema salva registro na tabela `contacts`
7. Sistema envia e-mail para `gerencia.comercial@ilclog.com`
8. Sistema exibe mensagem de sucesso ao usuário

**Exceções:**
- Campo obrigatório vazio → exibe erro inline
- E-mail inválido → exibe erro inline
- Falha no envio → exibe mensagem de erro genérica, não perde dados

---

## UC-03: Membro faz login

**Ator:** Membro cadastrado  
**Fluxo:**
1. Acessa `/login`
2. Informa usuário ou e-mail + senha
3. (Opcional) Marca "Lembrar-me"
4. Clica "Entrar"
5. Sistema valida credenciais via Auth.js
6. Se válido: cria sessão, redireciona para página anterior ou `/`
7. Se inválido: exibe "Credenciais inválidas"

**Exceções:**
- Conta inativa → "Conta desativada, entre em contato"
- Muitas tentativas falhas → bloqueio temporário (rate limiting)

---

## UC-04: Membro recupera senha

**Ator:** Membro  
**Fluxo:**
1. Acessa `/login` → clica "Esqueci minha senha"
2. Informa e-mail cadastrado
3. Sistema verifica se e-mail existe
4. Se sim: gera `reset_token` (expira em 24h), salva em `users`, envia e-mail com link
5. Membro acessa link `/password-reset?token=xxx`
6. Sistema valida token (existe + não expirou)
7. Membro informa nova senha (mínimo 8 caracteres)
8. Sistema atualiza `password_hash`, invalida token
9. Redireciona para `/login` com mensagem de sucesso

---

## UC-05: Membro acessa conteúdo Mastermind

**Ator:** Membro autenticado  
**Fluxo:**
1. Acessa `/mastermind-infraestrutura-e-logistica/`
2. Sistema verifica autenticação via middleware
3. Exibe listagem de trilhas disponíveis (Infra 2023, 2024, 2025, 2026, Portos)
4. Membro seleciona uma trilha (ex: Infra 2024)
5. Sistema exibe sessões ordenadas por `sort_order` / `session_date`
6. Membro clica em uma sessão
7. Exibe: título, data, palestrante, descrição, conteúdo completo, vídeo (se houver), PDFs

**Exceções:**
- Não autenticado → redireciona para `/login?callbackUrl=/mastermind-...`

---

## UC-06: Membro baixa PDF de sessão

**Ator:** Membro autenticado  
**Fluxo:**
1. Está na página de uma sessão do Mastermind
2. Clica no botão de download do PDF
3. Sistema verifica autenticação (via API Route + middleware)
4. Sistema gera URL temporária assinada do storage (expira em 5 minutos)
5. Browser inicia download do PDF

**Exceções:**
- Não autenticado → retorna 401
- PDF não encontrado → retorna 404

---

## UC-07: Admin gerencia posts

**Ator:** Admin ou Editor  
**Fluxo:**
1. Acessa `/admin/posts`
2. Visualiza lista de posts com status, data, categoria
3. Cria novo post: título, slug (gerado automaticamente), conteúdo (Tiptap), categoria, imagem, status
4. Salva como rascunho ou publica imediatamente
5. Post publicado aparece no blog e na home (se for o mais recente)

---

## UC-08: Admin gerencia sessões Mastermind

**Ator:** Admin  
**Fluxo:**
1. Acessa `/admin/mastermind`
2. Seleciona trilha
3. Cria/edita sessão: título, data, palestrante, conteúdo, vídeo
4. Faz upload de PDFs associados à sessão
5. Define `sort_order` para ordenação
6. Publica sessão

---

## UC-09: Admin visualiza contatos recebidos

**Ator:** Admin  
**Fluxo:**
1. Acessa `/admin/contacts`
2. Visualiza lista de mensagens (status: nova, lida, respondida, arquivada)
3. Clica em mensagem → visualiza detalhes
4. Atualiza status (marca como lida/respondida)
5. Pode exportar para CSV

---

## UC-10: Admin gerencia usuários/membros

**Ator:** Admin  
**Fluxo:**
1. Acessa `/admin/users`
2. Visualiza lista de usuários com role e status
3. Cria novo membro: nome, e-mail, role, senha temporária
4. Sistema envia e-mail de boas-vindas com credenciais
5. Admin pode desativar/reativar conta
6. Admin pode resetar senha de usuário

---

## ROTAS PROTEGIDAS (Middleware)

```typescript
// Rotas que requerem autenticação (role: member, editor, admin)
const protectedRoutes = [
  '/mastermind-infraestrutura-e-logistica/*',
  '/admin/*',
  '/api/mastermind/*',
  '/api/upload/*',
];

// Rotas que requerem role admin ou editor
const adminRoutes = [
  '/admin/*',
  '/api/admin/*',
];

// Rotas públicas (sem restrição)
const publicRoutes = [
  '/',
  '/quem-somos',
  '/servicos/*',
  '/contato',
  '/redes-sociais',
  '/login',
  '/password-reset',
  '/category/*',
  '/[post-slug]',
  '/api/contact',
];
```

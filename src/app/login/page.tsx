import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page-bg auth-shell">
      <section className="auth-card">
        <div className="brand auth-brand">
          <div className="brand-mark">ILC</div>
          <div>
            <strong>Área do Membro</strong>
            <span>Acesso ao conteúdo exclusivo do Mastermind</span>
          </div>
        </div>

        <form className="contact-form compact-form">
          <div>
            <label htmlFor="login">Usuário ou E-mail</label>
            <input id="login" className="form-input" placeholder="seu@email.com.br" />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" className="form-input" placeholder="••••••••" />
          </div>
          <button type="button" className="btn btn-primary form-submit">
            Entrar
          </button>
        </form>

        <div className="auth-links">
          <Link href="/contato">Não é membro ainda? Entre em contato</Link>
          <Link href="/">Voltar ao site</Link>
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";
import { company, leaders, siteNavigation } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="ILC Home">
          <div className="brand-mark">ILC</div>
          <div>
            <strong>{company.name}</strong>
            <span>Infraestrutura, inteligência e logística</span>
          </div>
        </Link>

        <nav className="site-nav" aria-label="Navegação principal">
          {siteNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/login" className="btn btn-primary nav-cta">
          Área Restrita
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <div className="brand-mark">ILC</div>
            <div>
              <strong>{company.name}</strong>
              <span>{company.tagline}</span>
            </div>
          </div>
        </div>

        <div>
          <h3>Links</h3>
          <ul className="footer-list">
            {siteNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contato</h3>
          <ul className="footer-list">
            {leaders.map((leader) => (
              <li key={leader.name}>{leader.phone}</li>
            ))}
            <li>{company.email}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 ILC Infra e Logística. Todos os direitos reservados.</div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-hero">
      <div className="mesh" aria-hidden />
      <div className="container page-hero-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="subtitle">{description}</p>
      </div>
    </section>
  );
}
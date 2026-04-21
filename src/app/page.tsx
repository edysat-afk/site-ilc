import Link from "next/link";
import type { Route } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { getCachedHomeSnapshot } from "@/lib/cached-site-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { company, mastermind, services } = await getCachedHomeSnapshot();

  return (
    <main className="page-bg page-shell">
      <SiteHeader />
      <section className="hero">
        <div className="mesh" aria-hidden />
        <div className="hero-content container">
          <div>
            <p className="eyebrow">ILC – Infraestrutura e Logística Conectada</p>
            <h1>
              Conhecimento estratégico para <span>infraestrutura e logística</span>
            </h1>
            <p className="subtitle">
              {company.tagline}
            </p>
            <div className="actions">
              <Link href="/servicos" className="btn btn-primary">
                Ver serviços
              </Link>
              <Link href="/mastermind-infraestrutura-e-logistica" className="btn btn-secondary">
                Explorar Mastermind
              </Link>
            </div>
          </div>

          <div className="scene" aria-hidden>
            <div className="cube cube-a" />
            <div className="cube cube-b" />
            <div className="glass-card">
              <strong>Mastermind ILC</strong>
              <span>10 módulos · 40 horas · área restrita para membros</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container section two-col intro-grid">
        <article className="content-card accent-blue">
          <span className="section-kicker">Quem somos</span>
          <h2>{company.name}</h2>
          <p>
            O mais novo centro de inteligência e inovação em infraestrutura e logística,
            conciliando conhecimento, informação, networking e oportunidades de negócios.
          </p>
          <p>
            A ILC reúne diferentes atividades como Mastermind, newsletter, cursos e
            consultorias em projetos para apoiar empresas, investidores e instituições.
          </p>
          <Link href="/quem-somos" className="inline-link">
            Saiba mais sobre a empresa
          </Link>
        </article>

        <article className="content-card accent-gold">
          <span className="section-kicker">Mastermind</span>
          <h2>{mastermind.subtitle}</h2>
          <p>{mastermind.description}</p>
          <ul className="bullet-list compact">
            {mastermind.methodology.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container section">
        <div className="section-heading">
          <span className="section-kicker">Serviços</span>
          <h2>Atuação consultiva e estratégica</h2>
        </div>
        <div className="grid cards-2">
          {services.map((service) => (
            <article key={service.slug} className={`service-card accent-${service.accent}`}>
              <h3>{service.title}</h3>
              <p>{service.excerpt}</p>
              <Link href={`/servicos/${service.slug}` as Route} className="inline-link">
                Explorar serviço
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <span className="section-kicker">Trilhas</span>
          <h2>Programa Mastermind</h2>
        </div>
        <div className="grid cards-5">
          {mastermind.tracks.map((track) => (
            <article key={track} className="content-card track-card">
              <h3>{track}</h3>
              <p>Acesso mediante autenticação.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section cta-band">
        <div>
          <span className="section-kicker">Contato</span>
          <h2>Fale com a equipe ILC</h2>
          <p>
            Atendemos empresas de infraestrutura, fundos de investimento, consultorias e
            instituições públicas e privadas interessadas em soluções estratégicas.
          </p>
        </div>
        <Link href="/contato" className="btn btn-primary">
          Entrar em contato
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}

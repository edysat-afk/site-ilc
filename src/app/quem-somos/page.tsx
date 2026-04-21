import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { getCachedCompanySnapshot } from "@/lib/cached-site-content";

export const dynamic = "force-dynamic";

export default async function QuemSomosPage() {
  const { company, leaders } = await getCachedCompanySnapshot();

  return (
    <main className="page-bg page-shell">
      <SiteHeader />
      <PageHero
        eyebrow="Quem Somos"
        title="A Empresa ILC – Infraestrutura e Logística Conectada"
        description="Conheça a missão, a visão, os valores e a liderança que estruturam a atuação da ILC no setor brasileiro de infraestrutura e logística."
      />

      <section className="container section two-col">
        <div className="content-card">
          <span className="section-kicker">Sobre a empresa</span>
          <h2>Centro de inteligência, inovação e articulação setorial</h2>
          <p>
            {company.tagline} Com visão integrada sobre infraestrutura e logística em todas as
            esferas, a ILC reúne iniciativas como Mastermind, newsletter, cursos e consultorias
            em projetos.
          </p>
          <p>
            Somos uma empresa orientada por conhecimento, inovação e sustentabilidade, com foco
            em apoiar organizações que atuam nos segmentos aquaviário, ferroviário e rodoviário.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card accent-blue">
            <h3>Missão</h3>
            <p>{company.mission}</p>
          </article>
          <article className="feature-card accent-gold">
            <h3>Visão</h3>
            <p>{company.vision}</p>
          </article>
          <article className="feature-card">
            <h3>Valores</h3>
            <ul className="bullet-list compact">
              {company.values.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="feature-card">
            <h3>Público-alvo</h3>
            <ul className="bullet-list compact">
              {company.audiences.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <span className="section-kicker">Nossos diretores</span>
          <h2>Liderança com experiência prática e articulação institucional</h2>
        </div>
        <div className="grid cards-3">
          {leaders.map((leader) => (
            <article key={leader.name} className="content-card person-card">
              <div className="avatar-token">{leader.initials}</div>
              <h3>{leader.name}</h3>
              <p className="muted strong">{leader.role}</p>
              <p>{leader.bio}</p>
              <a href={`tel:+55${leader.phone.replace(/\D/g, "")}`} className="inline-link">
                {leader.phone}
              </a>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import Link from "next/link";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { getCachedMastermindSnapshot } from "@/lib/cached-site-content";

export const dynamic = "force-dynamic";

export default async function MastermindPage() {
  const { mastermind } = await getCachedMastermindSnapshot();

  return (
    <main className="page-bg page-shell">
      <SiteHeader />
      <PageHero
        eyebrow="Programa exclusivo"
        title={mastermind.title}
        description={`${mastermind.subtitle} ${mastermind.description}`}
      />

      <section className="container section two-col">
        <article className="content-card">
          <span className="section-kicker">Como funciona</span>
          <h2>Imersão técnica para quem toma decisões</h2>
          <p>
            O programa reúne conhecimento aplicado, debate qualificado e visão estratégica sobre
            os temas mais relevantes da infraestrutura nacional.
          </p>
          <ul className="bullet-list">
            {mastermind.methodology.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="content-card accent-blue">
          <span className="section-kicker">Destaques</span>
          <h2>Consolidação desde 2022</h2>
          <ul className="bullet-list compact">
            {mastermind.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="stack-actions">
            <Link href="/login" className="btn btn-primary">
              Acessar área restrita
            </Link>
            <Link href="/contato" className="btn btn-secondary">
              Quero ser membro
            </Link>
          </div>
        </article>
      </section>

      <section className="container section">
        <div className="section-heading">
          <span className="section-kicker">Trilhas</span>
          <h2>Edições e recortes temáticos</h2>
        </div>
        <div className="grid cards-5">
          {mastermind.tracks.map((track) => (
            <article key={track} className="content-card track-card">
              <h3>{track}</h3>
              <p>Acesso mediante autenticação na área restrita.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <span className="section-kicker">Área restrita</span>
          <h2>Prévia da experiência do membro</h2>
        </div>
        <div className="stack-grid">
          {mastermind.sessionsPreview.map((session) => (
            <article key={session.number} className={`session-card ${session.status === "Restrita" ? "locked-card" : ""}`}>
              <div className="session-number">{session.number}</div>
              <div className="session-copy">
                <span className="session-meta">{session.status} · {session.date}</span>
                <h3>{session.title}</h3>
                <p>{session.speaker}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

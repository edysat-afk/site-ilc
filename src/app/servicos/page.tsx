import Link from "next/link";
import type { Route } from "next";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { getCachedServicesSnapshot } from "@/lib/cached-site-content";

export const dynamic = "force-dynamic";

export default async function ServicosPage() {
  const { services } = await getCachedServicesSnapshot();

  return (
    <main className="page-bg page-shell">
      <SiteHeader />
      <PageHero
        eyebrow="Serviços"
        title="Soluções estratégicas em infraestrutura e logística"
        description="A ILC reúne consultoria, gestão, capacitação e articulação institucional para apoiar decisões e operações com maior eficiência e impacto setorial."
      />

      <section className="container section">
        <div className="grid cards-2">
          {services.map((service) => (
            <article key={service.slug} className={`service-card accent-${service.accent}`}>
              <span className="section-kicker">Serviço</span>
              <h2>{service.title}</h2>
              <p>{service.excerpt}</p>
              <ul className="bullet-list">
                {service.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="row-actions">
                <Link href={`/servicos/${service.slug}` as Route} className="btn btn-primary">
                  Ver detalhes
                </Link>
                <Link href="/contato" className="btn btn-secondary">
                  Solicitar contato
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { services } from "@/lib/site-content";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicoDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  return (
    <main className="page-bg page-shell">
      <SiteHeader />
      <PageHero eyebrow="Serviços" title={service.title} description={service.excerpt} />

      <section className="container section two-col service-detail-layout">
        <article className="content-card service-detail-copy">
          {service.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <aside className={`content-card sticky-card accent-${service.accent}`}>
          <h3>Entregas típicas</h3>
          <ul className="bullet-list compact">
            {service.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="stack-actions">
            <Link href="/contato" className="btn btn-primary">
              Solicitar este serviço
            </Link>
            <Link href="/servicos" className="btn btn-secondary">
              Voltar para serviços
            </Link>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}

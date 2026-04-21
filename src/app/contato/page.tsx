import { ContactForm } from "@/components/contact-form";
import { PageHero, SiteFooter, SiteHeader } from "@/components/site-shell";
import { getCachedContactSnapshot } from "@/lib/cached-site-content";

export const dynamic = "force-dynamic";

export default async function ContatoPage() {
  const { company, leaders } = await getCachedContactSnapshot();

  return (
    <main className="page-bg page-shell">
      <SiteHeader />
      <PageHero
        eyebrow="Entre em contato"
        title="Contato"
        description="Estamos prontos para entender sua necessidade e propor soluções em infraestrutura, logística, inteligência de mercado e relacionamento setorial."
      />

      <section className="container section two-col">
        <article className="content-card">
          <span className="section-kicker">Envie sua mensagem</span>
          <h2>Fale com a equipe ILC</h2>
          <p>
            Esta etapa reproduz a experiência do site e do protótipo enquanto a integração
            server-side do envio é preparada.
          </p>
          <ContactForm />
        </article>

        <div className="stack-grid">
          <article className="content-card">
            <h3>Contato direto</h3>
            <p>{company.email}</p>
            <p>{company.address}</p>
          </article>

          <article className="content-card">
            <h3>Equipe</h3>
            <ul className="contact-list">
              {leaders.map((leader) => (
                <li key={leader.name}>
                  <strong>{leader.name}</strong>
                  <span>{leader.role}</span>
                  <span>{leader.phone}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

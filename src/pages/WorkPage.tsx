import { useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown, Download, Mail, Megaphone, Monitor, Share2 } from "lucide-react";
import { useTheme } from "next-themes";
import { ContentLink } from "@/components/ContentLink";
import { ThemeToggle } from "@/components/SiteShell";
import { WorkImage } from "@/components/WorkImage";
import { useContent } from "@/content/context";
import { contactVCard, shareDevCard } from "@/lib/contact";
import { publicWorkUrl, WORK_COMPANIES, workDescription, type WorkCompany, type WorkCompanyId } from "@/lib/work";
import "./dev.css";
import "./work.css";

export function WorkPage({ companyId }: { companyId: WorkCompanyId }) {
  const { copy } = useContent();
  const { resolvedTheme } = useTheme();
  const company: WorkCompany = WORK_COMPANIES[companyId];
  const marketingEmail = company.marketingEmail;
  const projects = company.projects ?? [];
  const marketingActivities = company.marketingActivities ?? [];
  const logo = resolvedTheme === "dark" ? company.darkLogo : company.logo;
  const url = publicWorkUrl(company);
  const [status, setStatus] = useState<"copied" | "shared" | "blocked" | "downloadError" | null>(null);
  const feedback = {
    copied: "Enlace copiado.",
    shared: "Tarjeta compartida.",
    blocked: "No se pudo copiar. Selecciona el enlace para copiarlo.",
    downloadError: "No se pudo descargar el contacto. Puedes escribirme por correo.",
  };

  function download() {
    try {
      const blob = new Blob([contactVCard({ name: "Arturo Vela", email: company.email }, "es", {
        organization: company.name, title: company.role, alternateEmail: company.systemsEmail,
        additionalEmails: marketingEmail ? [marketingEmail] : undefined, url,
      })], { type: "text/vcard;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `arturo-vela-${companyId}.vcf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      setStatus(null);
    } catch { setStatus("downloadError"); }
  }

  return <div className="dev-page work-page" data-company={companyId} style={{ "--work-accent": company.accent, "--work-accent-text": company.accentText ?? "#080B12" } as CSSProperties}>
    <a className="work-skip" href="#contenido">Saltar al contenido</a>
    <header className="work-header">
      {company.website ? <a className="work-logo" href={company.website} target="_blank" rel="noopener noreferrer" aria-label={`Visitar web de ${company.name}`}>
        <WorkImage key={logo} src={logo} alt={company.name} width={240} height={72} />
      </a> : <div className="work-logo"><WorkImage key={logo} src={logo} alt={company.name} width={240} height={72} /></div>}
      <ThemeToggle copy={copy} />
    </header>

    <main id="contenido">
      <section className="dev-card work-card" aria-labelledby="work-name">
        <div className="dev-portrait work-portrait">
          <WorkImage key={company.portrait.src} {...company.portrait} sizes="(max-width: 760px) calc(100vw - 3rem), (max-width: 1072px) 38vw, 384px" alt={`Arturo Vela — ${company.name}`} priority />
        </div>
        <div className="dev-introduction">
          <h1 id="work-name">Arturo Vela<span aria-hidden="true">.</span></h1>
          <p className="dev-role">{company.role}</p>
          <p className="work-marketing">{company.subtitle}</p>
          <p className="work-period">{company.current ? "Experiencia actual" : "Experiencia anterior"}<span>{company.period}</span></p>
          <p className="dev-bio">{workDescription(company)}</p>

          <div className="dev-actions">
            <a className="dev-button dev-button-primary" href={`mailto:${company.email}`}><Mail size={18} aria-hidden="true" />Escríbeme<ArrowUpRight size={18} aria-hidden="true" /></a>
            {company.website && <a className="dev-button dev-button-secondary" href={company.website} target="_blank" rel="noopener noreferrer">Web de la empresa<ArrowUpRight size={18} aria-hidden="true" /></a>}
          </div>

          <dl className="work-emails">
            <div><dt>{company.current ? "Correo directo" : "Correo personal profesional"}</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
            {company.systemsEmail && <div><dt>Correo de Sistemas</dt><dd><a href={`mailto:${company.systemsEmail}`}>{company.systemsEmail}</a></dd></div>}
            {marketingEmail && <div><dt>Correo de Marketing</dt><dd><a href={`mailto:${marketingEmail}`}>{marketingEmail}</a></dd></div>}
          </dl>

          <div className="dev-card-tools">
            <div className="dev-card-tool-buttons">
              <button type="button" onClick={download}><Download size={16} aria-hidden="true" />Guardar contacto</button>
              <button type="button" onClick={async () => {
                const result = await shareDevCard(`Arturo Vela — ${company.name}`, "es", url);
                setStatus(result === "cancelled" ? null : result);
              }}><Share2 size={16} aria-hidden="true" />Compartir tarjeta</button>
              <details className="dev-qr"><summary>Mostrar QR</summary><div>
                <img src={`/assets/images/portfolio/work-qr-${companyId}.png`} alt={`Código QR para abrir la tarjeta de Arturo Vela en ${company.name}`} width="296" height="296" loading="lazy" />
                <a href={url}>{url}</a>
              </div></details>
            </div>
            {status && <p role="status">{feedback[status]}</p>}
            {status === "blocked" && <a className="dev-share-url" href={url}>{url}</a>}
          </div>
        </div>
      </section>
      {(projects.length > 0 || company.contributions?.length) && <details className="work-contributions">
        <summary><span>Mi trabajo en {company.name}</span><ChevronDown size={18} aria-hidden="true" /></summary>
        <div className="work-contributions-body">
          {projects.length > 0 && <section className="work-systems" aria-labelledby="work-systems-title">
            <h2 id="work-systems-title" className="work-area-heading"><Monitor size={20} aria-hidden="true" />Sistemas</h2>
            <ul className="work-projects">
              {projects.map(project => <li key={project.url}>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <div><h3>{project.title}</h3><p>{project.description}</p><span>{new URL(project.url).hostname}</span></div>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </li>)}
            </ul>
          </section>}
          {company.contributions && <ul className="work-contribution-list">{company.contributions.map(item => <li key={item}>{item}</li>)}</ul>}
          {company.socialSupport && <section className="work-social" aria-labelledby="work-social-title">
            <h2 id="work-social-title" className="work-area-heading"><Megaphone size={20} aria-hidden="true" />Marketing y redes sociales</h2>
            <p>{company.socialSupport}</p>
            {marketingActivities.length > 0 && <>
              <h3 id="work-marketing-title">Actividades de marketing</h3>
              <ol className="work-marketing-activities" aria-labelledby="work-marketing-title" role="list">
                {marketingActivities.map(activity => <li key={`${activity.date}-${activity.title}`}>
                  <time dateTime={activity.date}>{activity.date.split("-").reverse().join("/")}</time>
                  <div><strong>{activity.title}</strong><span>{activity.role}</span></div>
                </li>)}
              </ol>
            </>}
          </section>}
        </div>
      </details>}
    </main>

    <footer className="work-footer">
      <ContentLink to="/"><ArrowLeft size={15} aria-hidden="true" />Ver portafolio</ContentLink>
      <ContentLink to="/work">Work</ContentLink>
      <ContentLink to="/legal">Privacidad y condiciones</ContentLink>
    </footer>
  </div>;
}

import { LayoutGroup, MotionConfig, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Copy, Divide, LockKeyhole, Search, WalletCards } from "lucide-react";
import { useRef, useState, type CSSProperties, type TouchEvent } from "react";
import { useSearchParams } from "react-router";
import { ContentLink } from "@/components/ContentLink";
import { useContent } from "@/content/context";
import { WALLET_COLLECTIONS, WALLET_PROJECTS, walletCollections, type WalletProject } from "@/lib/linktree";
import type { ProjectContent } from "@/types/content";
import "./linktree.css";

function PassArt({ project }: { project: WalletProject }) {
  return project.image ? (
    <img className="wallet-pass__art" src={project.image} alt="" width="750" height="288" loading="lazy" decoding="async" />
  ) : (
    <div className="wallet-pass__custom" aria-hidden="true">
      <div><strong>divide.</strong><span>Buenos momentos.<br />Cuentas claras.</span><small>{project.domain}</small></div>
      <Divide size={54} strokeWidth={1.8} />
    </div>
  );
}

// A broad card expansion gets the Apple-style spring from the Animate skill.
const walletSpring = { type: "spring", duration: .5, bounce: .2 } as const;

function WalletCard({ project, detail, cardKey, expanded, preview, last, instant, onToggle, onPreview }: {
  project: WalletProject;
  detail?: ProjectContent;
  cardKey: string;
  expanded: boolean;
  preview: boolean;
  last: boolean;
  instant: boolean;
  onToggle: (keyboard: boolean) => void;
  onPreview: (key: string | null) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [feedback, setFeedback] = useState("");

  async function copyLink() {
    try { await navigator.clipboard.writeText(`https://${project.domain}`); setFeedback("Enlace copiado"); }
    catch { setFeedback("No se pudo copiar. Selecciona el enlace que aparece arriba."); }
  }

  return (
    <motion.li layout="position" className="wallet-slot" data-expanded={expanded || undefined} data-last={last || undefined} data-preview={preview || undefined} data-wallet-key={cardKey} onPointerEnter={(event) => {
      if (event.pointerType === "mouse" && matchMedia("(hover: hover) and (pointer: fine)").matches) onPreview(cardKey);
    }} onPointerLeave={(event) => { if (event.pointerType === "mouse") onPreview(null); }}>
      <motion.div initial={false} animate={{ transform: preview && !expanded && !instant ? "translateY(-6px) scale(1.012)" : "translateY(0px) scale(1)" }}>
      <motion.article layout className="wallet-pass" style={{ "--pass-color": project.color, borderRadius: 17, boxShadow: "0 -3px 14px rgb(0 0 0 / 28%), inset 0 1px rgb(255 255 255 / 15%)" } as CSSProperties} onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) { event.preventDefault(); buttonRef.current?.focus(); onToggle(true); }
      }}>
        <motion.button layout ref={buttonRef} className="wallet-pass__toggle" type="button" aria-label={`${expanded ? "Cerrar" : "Ver"} ${project.name}`} aria-expanded={expanded} aria-controls={`detail-${cardKey}`} onClick={(event) => { setFeedback(""); onToggle(event.detail === 0); }}>
          <motion.span layout="position" className="wallet-pass__label"><span>{project.name}</span><ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" /></motion.span>
          <motion.div layout className="wallet-pass__cover" style={{ height: expanded || last ? "auto" : preview ? 24 : 16 }}><motion.div layout="position"><PassArt project={project} /></motion.div></motion.div>
        </motion.button>
        <motion.div layout id={`detail-${cardKey}`} className="wallet-detail" style={{ height: expanded ? "auto" : 0 }} inert={!expanded} aria-hidden={!expanded}>
          <motion.div layout="position" initial={false} animate={{ opacity: expanded ? 1 : 0 }} transition={{ opacity: { duration: instant ? 0 : .16 } }}>
            <div className="wallet-detail__body">
              {project.private ? <span className="wallet-detail__private"><LockKeyhole size={13} aria-hidden="true" /> Acceso privado</span> : null}
              <a className="wallet-detail__domain" href={`https://${project.domain}`} target="_blank" rel="noopener noreferrer">{project.domain}<ArrowUpRight size={14} aria-hidden="true" /></a>
              <p className="wallet-detail__description">{detail?.excerpt ?? project.description}</p>
              <h3>Qué puedes hacer</h3>
              <ul className="wallet-detail__features">{(detail?.outcomes.length ? detail.outcomes : project.features).map((feature) => <li key={feature}><Check size={17} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              {detail?.stack.length ? <div className="wallet-detail__technology"><h3>Construido con</h3><p>{detail.stack.join(" · ")}</p></div> : null}
              {detail ? <ContentLink className="wallet-detail__case" to={`/proyectos/${detail.slug}`}>Ver caso de estudio <ArrowUpRight size={16} aria-hidden="true" /></ContentLink> : null}
            </div>
            <div className="wallet-detail__actions"><a className="wallet-open" href={`https://${project.domain}`} target="_blank" rel="noopener noreferrer">Abrir proyecto<ArrowUpRight size={19} aria-hidden="true" /></a><button className="wallet-copy" type="button" aria-label={`Copiar enlace de ${project.name}`} onClick={copyLink}><Copy size={19} aria-hidden="true" /></button></div>
            <p className="wallet-feedback" role="status">{feedback}</p>
          </motion.div>
        </motion.div>
      </motion.article>
      </motion.div>
    </motion.li>
  );
}

export function LinktreePage() {
  const { content } = useContent();
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("todas");
  const [params, setParams] = useSearchParams();
  const [instant, setInstant] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const groups = walletCollections(query, collection);
  const count = new Set(groups.flatMap((group) => group.projects.map((project) => project.id))).size;
  const activeGroups = groups.filter((group) => group.projects.some((project) => project.id === params.get("project")));
  const activeGroup = (activeGroups.find((group) => group.id === params.get("group")) ?? activeGroups[0])?.id;

  function peekCard(key: string | null) { setInstant(false); setPreview(key); }

  function touchPreview(event: TouchEvent<HTMLUListElement>) {
    const touch = event.touches[0];
    if (!touch) return;
    const card = document.elementFromPoint(touch.clientX, touch.clientY)?.closest<HTMLElement>("[data-wallet-key]");
    peekCard(card && event.currentTarget.contains(card) ? card.dataset.walletKey ?? null : null);
  }

  return (
    <MotionConfig reducedMotion="user" transition={instant || reduced ? { duration: 0 } : walletSpring}>
    <div className="wallet-page">
      <a className="wallet-skip" href="#contenido">Saltar al contenido</a>
      <div className="wallet-container">
        <header className="wallet-header">
          <ContentLink to="/" className="wallet-profile" aria-label="Arturo Vela, ir al portafolio">
            <img className="wallet-avatar" src="/assets/images/Me/Fototech.jpg" alt="" width="48" height="48" decoding="async" />
            <span><strong>Arturo Vela</strong><small>Producto e ingeniería web</small></span>
          </ContentLink>
          <ContentLink to="/" className="wallet-icon-button" aria-label="Volver al portafolio"><ArrowUpRight size={21} aria-hidden="true" /></ContentLink>
        </header>

        <main id="contenido">
          <div className="wallet-intro">
            <div><h1>Mis proyectos</h1><WalletCards size={31} strokeWidth={1.6} aria-hidden="true" /></div>
            <p>{WALLET_PROJECTS.length} proyectos. Un solo tarjetero.</p>
          </div>

          <div className="wallet-controls">
            <label className="wallet-search">
              <Search size={19} aria-hidden="true" />
              <span className="sr-only">Buscar proyectos</span>
              <input type="search" placeholder="Buscar un proyecto…" value={query} onChange={(event) => { setInstant(true); setPreview(null); setQuery(event.target.value); }} autoComplete="off" />
            </label>
            <nav className="wallet-filters" aria-label="Filtrar colecciones">
              {[{ id: "todas", name: "Todas" }, ...WALLET_COLLECTIONS].map((group) => (
                <button key={group.id} type="button" aria-pressed={collection === group.id} onClick={(event) => { setInstant(event.detail === 0); setPreview(null); setCollection(group.id); }}>{group.name}</button>
              ))}
            </nav>
          </div>

          <p className="wallet-hint" role="status">{query.trim() ? `${count} ${count === 1 ? "proyecto encontrado" : "proyectos encontrados"}` : "Desliza para explorar. Toca una tarjeta para abrirla."}</p>
          <LayoutGroup id="wallet">
          <div className="wallet-collections">
            {groups.map((group) => (
              <motion.section layout="position" className="wallet-collection" key={group.id} aria-labelledby={`collection-${group.id}`}>
                <div className="wallet-collection__heading"><h2 id={`collection-${group.id}`}>{group.name}</h2><span>{group.projects.length} {group.projects.length === 1 ? "tarjeta" : "tarjetas"}</span></div>
                <ul className="wallet-stack" onTouchStart={touchPreview} onTouchMove={touchPreview} onTouchEnd={() => peekCard(null)} onTouchCancel={() => peekCard(null)}>
                  {group.projects.map((project, index) => {
                    const cardKey = `${group.id}-${project.id}`;
                    const expanded = params.get("project") === project.id && activeGroup === group.id;
                    return <WalletCard key={project.id} project={project} detail={content.projects.find((item) => item.slug === project.caseSlug)} cardKey={cardKey} expanded={expanded} preview={preview === cardKey} last={index === group.projects.length - 1} instant={instant || !!reduced} onPreview={peekCard} onToggle={(keyboard) => {
                      setInstant(keyboard);
                      setPreview(null);
                      setParams((current) => {
                        const next = new URLSearchParams(current);
                        if (expanded) { next.delete("project"); next.delete("group"); }
                        else { next.set("project", project.id); next.set("group", group.id); }
                        return next;
                      }, { replace: true });
                    }} />;
                  })}
                </ul>
              </motion.section>
            ))}
          </div>
          </LayoutGroup>
          {!groups.length ? <div className="wallet-empty"><Search size={28} aria-hidden="true" /><h2>No encontré ese proyecto</h2><p>Prueba otro nombre o busca en todas las colecciones.</p><button type="button" onClick={(event) => { setInstant(event.detail === 0); setPreview(null); setQuery(""); setCollection("todas"); }}>Ver todos los proyectos</button></div> : null}
        </main>

        <footer className="wallet-footer"><ContentLink to="/"><ArrowLeft size={15} aria-hidden="true" /> Volver al portafolio</ContentLink><ContentLink to="/legal">Privacidad y condiciones</ContentLink><span>Hecho por Arturo Vela · Perú</span></footer>
      </div>

    </div>
    </MotionConfig>
  );
}

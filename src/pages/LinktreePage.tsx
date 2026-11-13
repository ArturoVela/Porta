import { LayoutGroup, MotionConfig, motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "@/components/PortfolioMotion";
import { Activity, ArrowUpRight, Check, ChevronRight, Copy, Divide, LockKeyhole, Search, WalletCards } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import { useSearchParams } from "react-router";
import { ContentLink } from "@/components/ContentLink";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavigation } from "@/components/SiteNavigation";
import { useContent } from "@/content/context";
import { WALLET_COLLECTIONS, WALLET_PROJECTS, walletCollections, type WalletProject } from "@/lib/linktree";
import type { ProjectContent } from "@/types/content";
import "./linktree.css";

const WalletQr = lazy(() => import("./WalletQr").catch(() => ({
  default: () => <span role="status">No se pudo cargar el QR. Usa el botón «Abrir proyecto».</span>,
})));

function PassArt({ project }: { project: WalletProject }) {
  return project.image ? (
    <img className="wallet-pass__art" src={project.image} alt="" width="750" height="288" loading="lazy" decoding="async" />
  ) : (
    <div className="wallet-pass__custom" aria-hidden="true">
      <div><strong>{project.id === "divide" ? "divide." : project.name}</strong><span>{project.id === "divide" ? <>Buenos momentos.<br />Cuentas claras.</> : project.features[0]}</span><small>{project.domain}</small></div>
      {project.id === "divide" ? <Divide size={54} strokeWidth={1.8} /> : project.id === "sphere" ? <img className="wallet-pass__custom-icon" src="/assets/images/sphere-icon.svg" alt="" width="54" height="54" /> : <Activity size={54} strokeWidth={1.8} />}
    </div>
  );
}

// A restrained spring keeps the stack responsive when its direction changes.
const walletSpring = { type: "spring", duration: .4, bounce: 0 } as const;

function WalletCard({ project, detail, cardKey, expanded, preview, last, instant, replacingOpen, onToggle, onPreview }: {
  project: WalletProject;
  detail?: ProjectContent;
  cardKey: string;
  expanded: boolean;
  preview: boolean;
  last: boolean;
  instant: boolean;
  replacingOpen: boolean;
  onToggle: (keyboard: boolean) => void;
  onPreview: (key: string | null) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const revealAfterSwitch = useRef(false);
  const [feedback, setFeedback] = useState("");
  const url = project.href ?? `https://${project.domain}`;
  const personalColor = cardKey.startsWith("personal-") ? project.personalColor : undefined;
  const color = personalColor ?? project.color;

  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setFeedback("Enlace copiado"); }
    catch { setFeedback("No se pudo copiar. Selecciona el enlace que aparece arriba."); }
  }

  function keepSelectedCardVisible() {
    const label = buttonRef.current?.querySelector(".wallet-pass__label")?.getBoundingClientRect();
    const controlsBottom = Math.max(0, document.querySelector(".wallet-controls")?.getBoundingClientRect().bottom ?? 0);
    if (!label) return;
    const offset = label.top < controlsBottom + 12 ? label.top - controlsBottom - 12
      : label.bottom > window.innerHeight - 12 ? label.bottom - window.innerHeight + 12 : 0;
    if (offset) window.scrollBy({ top: offset, behavior: "instant" });
  }

  function finishSelection() {
    if (!instant && expanded && revealAfterSwitch.current) {
      keepSelectedCardVisible();
      revealAfterSwitch.current = false;
    }
  }

  useEffect(() => {
    if (!expanded || !revealAfterSwitch.current) return;
    let frame = 0;
    const stopFollowing = () => {
      revealAfterSwitch.current = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stopFollowing);
      window.removeEventListener("touchmove", stopFollowing);
      window.removeEventListener("pointerdown", stopFollowing);
      window.removeEventListener("keydown", stopFollowing);
    };
    const follow = () => {
      if (!revealAfterSwitch.current) { stopFollowing(); return; }
      keepSelectedCardVisible();
      if (instant) stopFollowing();
      else frame = requestAnimationFrame(follow);
    };
    frame = requestAnimationFrame(() => {
      window.addEventListener("keydown", stopFollowing);
      frame = requestAnimationFrame(follow);
    });
    window.addEventListener("wheel", stopFollowing, { passive: true });
    window.addEventListener("touchmove", stopFollowing, { passive: true });
    window.addEventListener("pointerdown", stopFollowing, { passive: true });
    return stopFollowing;
  }, [expanded, instant]);

  return (
    <motion.li layout="position" className="wallet-slot" data-expanded={expanded || undefined} data-last={last || undefined} data-preview={preview || undefined} data-wallet-key={cardKey} onPointerEnter={(event) => {
      if (event.pointerType === "mouse" && matchMedia("(hover: hover) and (pointer: fine)").matches) onPreview(cardKey);
    }} onPointerLeave={(event) => { if (event.pointerType === "mouse") onPreview(null); }}>
      <motion.div initial={false} animate={{ transform: !instant && (preview || expanded) ? "translateY(-4px)" : "translateY(0px)" }}>
      <motion.article layout="position" className="wallet-pass" data-project-card={`wallet:${cardKey}`} style={{ "--pass-color": color, borderRadius: 17, boxShadow: "0 -3px 14px rgb(0 0 0 / 28%), inset 0 1px rgb(255 255 255 / 15%)" } as CSSProperties} onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) { event.preventDefault(); buttonRef.current?.focus(); onToggle(true); }
      }}>
        <button ref={buttonRef} className="wallet-pass__toggle" type="button" aria-label={`${expanded ? "Cerrar" : "Ver"} ${project.name}`} aria-expanded={expanded} aria-controls={`detail-${cardKey}`} onClick={(event) => { setFeedback(""); revealAfterSwitch.current = !expanded && replacingOpen; onToggle(event.detail === 0); }}>
          <span className="wallet-pass__label"><span>{project.name}</span><ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" /></span>
          <motion.div className="wallet-pass__cover" data-project-image={detail?.slug} data-project-art={project.image ?? "wallet-art"} initial={false} animate={{ height: expanded || last ? "auto" : preview ? 24 : 16 }}><div className={personalColor && project.image ? "wallet-pass__art-tinted" : undefined}><PassArt project={project} /></div></motion.div>
        </button>
        <motion.div id={`detail-${cardKey}`} className="wallet-detail" initial={false} animate={{ height: expanded ? "auto" : 0 }} onAnimationComplete={finishSelection} inert={!expanded} aria-hidden={!expanded}>
          <motion.div initial={false} animate={{ opacity: expanded ? 1 : 0 }} transition={{ opacity: { duration: instant ? 0 : .16 } }}>
            <div className="wallet-detail__body">
              {project.private ? <span className="wallet-detail__private"><LockKeyhole size={13} aria-hidden="true" /> Acceso privado</span> : null}
              <a className="wallet-detail__domain" href={url} target="_blank" rel="noopener noreferrer">{project.domain}<ArrowUpRight size={14} aria-hidden="true" /></a>
              <p className="wallet-detail__description">{detail?.excerpt ?? project.description}</p>
              <h3>Qué puedes hacer</h3>
              <ul className="wallet-detail__features">{(detail?.outcomes.length ? detail.outcomes : project.features).map((feature) => <li key={feature}><Check size={17} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              {detail?.stack.length ? <div className="wallet-detail__technology"><h3>Construido con</h3><p>{detail.stack.join(" · ")}</p></div> : null}
              {detail ? <ContentLink className="wallet-detail__case" to={`/proyectos/${detail.slug}`}>Ver caso de estudio <ArrowUpRight size={16} aria-hidden="true" /></ContentLink> : null}
            </div>
            <div className="wallet-detail__actions"><a className="wallet-open" href={url} target="_blank" rel="noopener noreferrer">Abrir proyecto<ArrowUpRight size={19} aria-hidden="true" /></a><button className="wallet-copy" type="button" aria-label={`Copiar enlace de ${project.name}`} onClick={copyLink}><Copy size={19} aria-hidden="true" /></button></div>
            <p className="wallet-feedback" role="status">{feedback}</p>
            <div className="wallet-qr">
              <h3>Escanea para visitar</h3>
              <p>Abre esta web en otro dispositivo.</p>
              <div className="wallet-qr__code">
                {expanded ? <Suspense fallback={<span role="status">Preparando QR…</span>}><WalletQr url={url} name={project.name} /></Suspense> : null}
              </div>
            </div>
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
          <SiteNavigation />
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
                <ScrollReveal className="wallet-collection__heading"><h2 id={`collection-${group.id}`}>{group.name}</h2><span>{group.projects.length} {group.projects.length === 1 ? "tarjeta" : "tarjetas"}</span></ScrollReveal>
                <ul className="wallet-stack" onTouchStart={touchPreview} onTouchMove={touchPreview} onTouchEnd={() => peekCard(null)} onTouchCancel={() => peekCard(null)}>
                  {group.projects.map((project, index) => {
                    const cardKey = `${group.id}-${project.id}`;
                    const expanded = params.get("project") === project.id && activeGroup === group.id;
                    return <WalletCard key={project.id} project={project} detail={content.projects.find((item) => item.slug === project.caseSlug)} cardKey={cardKey} expanded={expanded} preview={preview === cardKey} last={index === group.projects.length - 1} instant={instant || !!reduced} replacingOpen={!!params.get("project") && !expanded} onPreview={peekCard} onToggle={(keyboard) => {
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
      </div>
      <SiteFooter />
    </div>
    </MotionConfig>
  );
}

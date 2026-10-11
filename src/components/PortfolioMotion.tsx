import { inView } from "motion";
import { animate } from "motion/mini";
import { useEffect, useLayoutEffect, useRef, type HTMLAttributes, type MouseEvent, type ReactNode } from "react";

export const MOTION_EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const MOTION_EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const projectOrigins = new Map<string, { path: string; slot: string; scroll: number }>();
let renderedPath = "";
let projectImageTransition: { slug: string; path: string; cleanup: () => void; finish: (container: HTMLElement) => void } | undefined;

function navigationPath(href: string) {
  const url = new URL(href, window.location.href);
  return (url.pathname === "/__preview" ? (url.searchParams.get("path") ?? "/").split(/[?#]/)[0] : url.pathname).replace(/\/$/, "") || "/";
}

function projectSlug(path: string) {
  return /\/(?:proyectos|projects)\/([^/]+)$/.exec(path)?.[1];
}

export function returningProjectSlug() { return projectImageTransition?.slug; }

export function listenForProjectHistory() {
  const onHistory = () => startProjectNavigation(window.location.href);
  window.addEventListener("popstate", onHistory);
  return () => window.removeEventListener("popstate", onHistory);
}

export function startProjectImageTransition(event: MouseEvent<HTMLAnchorElement>) {
  const link = event.currentTarget;
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank" || link.hasAttribute("download")) return;
  startProjectNavigation(link.href, link);
}

export function startProjectNavigation(href: string, link?: HTMLElement) {
  projectImageTransition?.cleanup();
  if (reducedMotion()) return;
  const path = navigationPath(href);
  if (path === renderedPath) return;
  const slug = projectSlug(path);
  const hero = document.querySelector<HTMLElement>("[data-project-hero]");
  const visuals = Array.from(document.querySelectorAll<HTMLElement>("[data-project-image]"));
  const origin = slug ? projectOrigins.get(slug) : undefined;
  const source = link?.closest("[data-project-card]")?.querySelector<HTMLElement>("[data-project-image]")
    ?? hero ?? visuals.find((visual) => visual.dataset.projectImage === slug && !visual.closest("[inert]") && (!origin || visual.closest<HTMLElement>("[data-project-card]")?.dataset.projectCard === origin.slot))
    ?? visuals.find((visual) => visual.dataset.projectImage === slug && !visual.closest("[inert]"));
  if (!source) return;
  const bounds = source.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const sourceSlug = source.dataset.projectImage!;
  if (!hero && slug) projectOrigins.set(slug, { path: renderedPath, slot: source.closest<HTMLElement>("[data-project-card]")?.dataset.projectCard ?? "", scroll: window.scrollY });

  const sourceStyle = getComputedStyle(source);
  const image = document.createElement("div");
  image.className = "project-image-transition";
  image.setAttribute("aria-hidden", "true");
  image.inert = true;
  Object.assign(image.style, {
    width: `${bounds.width}px`, height: `${bounds.height}px`,
    transform: `translate(${bounds.x}px, ${bounds.y}px)`,
    background: sourceStyle.backgroundColor, color: sourceStyle.color, font: sourceStyle.font,
  });
  const snapshot = source.cloneNode(true) as HTMLElement;
  snapshot.removeAttribute("data-project-image");
  snapshot.removeAttribute("data-project-hero");
  Object.assign(snapshot.style, { width: "100%", height: "100%", minHeight: "0", maxHeight: "none", transform: "none", opacity: sourceStyle.opacity });
  image.appendChild(snapshot);
  document.body.appendChild(image);

  let animation: ReturnType<typeof animate> | undefined;
  let target: HTMLElement | undefined;
  let frame = 0;
  let arriving = false;
  const cleanup = () => {
    cancelAnimationFrame(frame);
    animation?.stop();
    image.remove();
    target?.style.removeProperty("visibility");
    window.clearTimeout(timeout);
    window.removeEventListener("resize", cleanup);
    if (projectImageTransition?.cleanup === cleanup) projectImageTransition = undefined;
  };
  // Bound the snapshot lifetime if a route fails or never mounts.
  const timeout = window.setTimeout(cleanup, 1500);
  window.addEventListener("resize", cleanup, { once: true });
  const finish = (container: HTMLElement) => {
    if (arriving) return;
    arriving = true;
    const returnOrigin = projectOrigins.get(sourceSlug);
    const candidates = Array.from(container.querySelectorAll<HTMLElement>("[data-project-image]"));
    target = slug ? container.querySelector<HTMLElement>("[data-project-hero]") ?? undefined
      : candidates.find((visual) => visual.dataset.projectImage === sourceSlug && (!returnOrigin || returnOrigin.path !== path || visual.closest<HTMLElement>("[data-project-card]")?.dataset.projectCard === returnOrigin.slot))
        ?? candidates.find((visual) => visual.dataset.projectImage === sourceSlug);
    const sameVisual = target?.dataset.projectImage === sourceSlug && target.dataset.projectArt === source.dataset.projectArt;
    if (sameVisual) target!.style.visibility = "hidden";
    // Wait for the shell's scroll reset before measuring the destination.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (projectImageTransition?.cleanup !== cleanup) return;
        if (reducedMotion()) { cleanup(); return; }
        if (!slug && target) {
          if (returnOrigin?.path === path) window.scrollTo({ top: returnOrigin.scroll, behavior: "instant" });
          else target.scrollIntoView({ block: "center", behavior: "instant" });
          const position = target.getBoundingClientRect();
          if (position.top < 0 || position.bottom > window.innerHeight) target.scrollIntoView({ block: "center", behavior: "instant" });
        }
        const destination = target?.getBoundingClientRect();
        animation = animate(image, {
          ...(destination ? { transform: `translate(${destination.x}px, ${destination.y}px) scale(${destination.width / bounds.width}, ${destination.height / bounds.height})` } : {}),
          opacity: sameVisual ? 1 : 0,
        }, {
          duration: 0.28, ease: MOTION_EASE_IN_OUT,
        });
        void animation.then(cleanup);
      });
    });
  };
  projectImageTransition = { slug: sourceSlug, path, cleanup, finish };
}

export function finishProjectImageTransition(container: HTMLElement, path: string) {
  const transition = projectImageTransition;
  renderedPath = path.replace(/\/$/, "") || "/";
  if (!transition) return;
  if (transition.path !== renderedPath) { transition.cleanup(); return; }
  transition.finish(container);
}

export function ScrollReveal({ delay = 0, ...props }: HTMLAttributes<HTMLDivElement> & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current!;
    let animation: ReturnType<typeof animate> | undefined;
    const stop = inView(element, () => {
      if (projectImageTransition) return;
      if (document.activeElement?.matches("input, textarea, select")) return;
      const reduced = reducedMotion();
      animation = animate(element, {
        opacity: [0, 1],
        transform: reduced ? ["none", "none"] : ["translateY(18px)", "none"],
      }, { duration: reduced ? 0.12 : 0.42, delay: reduced ? 0 : delay, ease: MOTION_EASE_OUT });
    }, { margin: "0px 0px -32px 0px" });

    // Keep keyboard focus visible, even during an entrance or before intersection.
    const focusTarget = element.closest("a") ?? element;
    const showFocused = () => { stop(); animation?.complete(); };
    focusTarget.addEventListener("focusin", showFocused);
    return () => { stop(); animation?.complete(); focusTarget.removeEventListener("focusin", showFocused); };
  }, [delay]);

  return <div {...props} ref={ref} data-scroll-reveal="" />;
}

export function PageTransition({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const previousRoute = useRef(routeKey);

  useLayoutEffect(() => { if (ref.current) finishProjectImageTransition(ref.current, routeKey); }, [routeKey]);
  useEffect(() => {
    if (previousRoute.current === routeKey) return;
    previousRoute.current = routeKey;
    const animation = animate(ref.current!, { opacity: [0, 1] }, {
      duration: reducedMotion() ? 0.12 : 0.22, ease: MOTION_EASE_OUT,
    });
    const showFocused = () => animation.complete();
    const element = ref.current!;
    element.addEventListener("focusin", showFocused);
    return () => { animation.complete(); element.removeEventListener("focusin", showFocused); };
  }, [routeKey]);

  return <div ref={ref} data-page-transition="">{children}</div>;
}

import { createElement, type MouseEvent } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { finishProjectImageTransition, listenForProjectHistory, PageTransition, ScrollReveal, startProjectImageTransition, startProjectNavigation, returningProjectSlug } from "@/components/PortfolioMotion";

const animation = vi.hoisted(() => ({ stop: vi.fn(), then: vi.fn() }));
vi.mock("motion/mini", () => ({ animate: vi.fn(() => animation) }));
import { animate } from "motion/mini";

afterEach(() => { if (vi.isFakeTimers()) vi.runOnlyPendingTimers(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.clearAllMocks(); });

function projectTransitionFixture({ reduced = false, href = "https://portfolio.test/es/proyectos/explora-san-martin" } = {}) {
  vi.useFakeTimers();
  const snapshot = { style: {}, removeAttribute: vi.fn() };
  const card = { dataset: { projectCard: "carousel" } };
  const source = { dataset: { projectImage: "explora-san-martin" }, style: { visibility: "", removeProperty: vi.fn() },
    closest: (selector: string) => selector === "[inert]" ? null : card, cloneNode: vi.fn(() => snapshot), scrollIntoView: vi.fn(),
    getBoundingClientRect: () => ({ x: 600, y: 100, width: 320, height: 180 }) };
  const image = { style: {}, inert: false, setAttribute: vi.fn(), appendChild: vi.fn(), remove: vi.fn() };
  const document = { createElement: vi.fn(() => image), body: { appendChild: vi.fn() }, querySelector: vi.fn((): unknown => null), querySelectorAll: vi.fn(() => [source]) };
  vi.stubGlobal("document", document);
  const scrollTo = vi.fn();
  vi.stubGlobal("window", { matchMedia: () => ({ matches: reduced }), location: { href: "https://portfolio.test/es" }, scrollY: 150,
    scrollTo, setTimeout, clearTimeout, addEventListener: vi.fn(), removeEventListener: vi.fn() });
  vi.stubGlobal("getComputedStyle", () => ({ backgroundColor: "#101722", color: "#fff", font: "16px Satoshi", opacity: "1" }));
  const frame = vi.fn();
  vi.stubGlobal("requestAnimationFrame", frame);
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  const event = { defaultPrevented: false, detail: 1, button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false,
    currentTarget: { href, target: "", hasAttribute: () => false, closest: () => ({ querySelector: () => source }) } } as unknown as MouseEvent<HTMLAnchorElement>;
  const style = { visibility: "", removeProperty: vi.fn() };
  const target = { ...source, style, getBoundingClientRect: () => ({ x: 24, y: 500, width: 960, height: 540 }) };
  const container = { querySelector: () => target, querySelectorAll: () => [target] } as unknown as HTMLElement;
  const list = { querySelector: () => null, querySelectorAll: () => [source] } as unknown as HTMLElement;
  finishProjectImageTransition(list, "/es");
  const arrive = (root = container, path = "/es/proyectos/explora-san-martin") => {
    const index = frame.mock.calls.length;
    finishProjectImageTransition(root, path);
    frame.mock.calls[index][0]();
    frame.mock.calls[index + 1][0]();
  };
  const complete = () => animation.then.mock.calls.at(-1)![0]();
  return { event, image, snapshot, document, frame, target, style, source, container, list, arrive, complete, scrollTo };
}

describe("project visual route transition", () => {
  it("clones the complete visual, including SVG and generated artwork, and handles StrictMode arrivals once", () => {
    const f = projectTransitionFixture();
    startProjectImageTransition(f.event);
    expect(f.source.cloneNode).toHaveBeenCalledWith(true);
    expect(f.document.body.appendChild).toHaveBeenCalledWith(f.image);
    expect(f.snapshot.style).toMatchObject({ opacity: "1" });
    expect(f.image.style).toMatchObject({ font: "16px Satoshi" });
    expect(f.image.inert).toBe(true);
    expect(f.image.setAttribute).toHaveBeenCalledWith("aria-hidden", "true");
    finishProjectImageTransition(f.container, "/es/proyectos/explora-san-martin");
    finishProjectImageTransition(f.container, "/es/proyectos/explora-san-martin");
    expect(f.frame).toHaveBeenCalledOnce();
    f.frame.mock.calls[0][0]();
    f.frame.mock.calls[1][0]();
    expect(f.style.visibility).toBe("hidden");
    expect(animate).toHaveBeenCalledWith(f.image, { transform: "translate(24px, 500px) scale(3, 3)", opacity: 1 }, { duration: 0.28, ease: [0.77, 0, 0.175, 1] });
    f.complete();
    expect(f.image.remove).toHaveBeenCalledOnce();
    expect(f.style.removeProperty).toHaveBeenCalledWith("visibility");
  });

  it.each([{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { defaultPrevented: true }])("preserves native navigation for %j", (overrides) => {
    const f = projectTransitionFixture();
    startProjectImageTransition({ ...f.event, ...overrides });
    expect(f.document.createElement).not.toHaveBeenCalled();
  });

  it("respects reduced motion", () => {
    const f = projectTransitionFixture({ reduced: true });
    startProjectImageTransition(f.event);
    expect(f.document.createElement).not.toHaveBeenCalled();
  });

  it("animates keyboard links and does not require an img element", () => {
    const f = projectTransitionFixture();
    startProjectImageTransition({ ...f.event, detail: 0 });
    expect(f.source.cloneNode).toHaveBeenCalledWith(true);
  });

  it("cleans failed routes, rapid navigation and hidden destinations", () => {
    const f = projectTransitionFixture();
    startProjectImageTransition(f.event);
    finishProjectImageTransition(f.container, "/es/proyectos/explora-san-martin");
    startProjectImageTransition({ ...f.event, currentTarget: { ...f.event.currentTarget, href: "https://portfolio.test/es/proyectos/coffee" } } as MouseEvent<HTMLAnchorElement>);
    f.frame.mock.calls[0][0]();
    f.frame.mock.calls[1][0]();
    expect(animate).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1500);
    expect(f.image.remove).toHaveBeenCalledTimes(2);
    expect(f.style.removeProperty).toHaveBeenCalledWith("visibility");
  });

  it("restores the originating card and scroll on back, then animates forward without a clicked link", () => {
    const f = projectTransitionFixture();
    startProjectImageTransition(f.event);
    f.arrive();
    f.complete();
    f.document.querySelector.mockReturnValue(f.target);
    startProjectNavigation("https://portfolio.test/es");
    expect(returningProjectSlug()).toBe("explora-san-martin");
    f.arrive(f.list, "/es");
    expect(f.scrollTo).toHaveBeenCalledWith({ top: 150, behavior: "instant" });
    expect(animate).toHaveBeenLastCalledWith(f.image, { transform: "translate(600px, 100px) scale(0.3333333333333333, 0.3333333333333333)", opacity: 1 }, { duration: 0.28, ease: [0.77, 0, 0.175, 1] });
    f.complete();
    f.document.querySelector.mockReturnValue(null);
    startProjectNavigation(f.event.currentTarget.href);
    f.arrive();
    expect(animate).toHaveBeenCalledTimes(3);
  });

  it("captures history navigation before the destination mounts and removes the listener on disposal", () => {
    const f = projectTransitionFixture();
    const stop = listenForProjectHistory();
    const onHistory = vi.mocked(window.addEventListener).mock.calls[0][1] as () => void;
    window.location.href = f.event.currentTarget.href;
    onHistory();
    expect(f.source.cloneNode).toHaveBeenCalledOnce();
    f.arrive();
    f.complete();
    stop();
    expect(window.removeEventListener).toHaveBeenCalledWith("popstate", onHistory);
  });

  it("returns to the originating collection when a project appears more than once", () => {
    const f = projectTransitionFixture();
    startProjectImageTransition(f.event);
    f.arrive();
    f.complete();
    f.document.querySelector.mockReturnValue(f.target);
    const duplicate = { ...f.source, style: { visibility: "" }, closest: () => ({ dataset: { projectCard: "other-collection" } }) };
    startProjectNavigation("https://portfolio.test/es");
    f.arrive({ querySelectorAll: () => [duplicate, f.source] } as unknown as HTMLElement, "/es");
    expect(f.source.style.visibility).toBe("hidden");
    expect(duplicate.style.visibility).toBe("");
    f.complete();
  });

  it("crossfades when moving directly between different projects", () => {
    const f = projectTransitionFixture();
    startProjectImageTransition(f.event);
    f.arrive();
    f.complete();
    f.document.querySelector.mockReturnValue(f.target);
    startProjectNavigation("https://portfolio.test/es/proyectos/coffee");
    const coffee = { ...f.target, dataset: { projectImage: "coffee" } };
    f.arrive({ querySelector: () => coffee, querySelectorAll: () => [coffee] } as unknown as HTMLElement, "/es/proyectos/coffee");
    expect(animate).toHaveBeenLastCalledWith(f.image, { transform: "translate(24px, 500px) scale(1, 1)", opacity: 0 }, { duration: 0.28, ease: [0.77, 0, 0.175, 1] });
  });

  it("handles English preview navigation", () => {
    const f = projectTransitionFixture({ href: "https://portfolio.test/__preview?token=preview&path=%2Fen%2Fprojects%2Fexplora-san-martin" });
    startProjectImageTransition(f.event);
    f.arrive(f.container, "/en/projects/explora-san-martin");
    expect(animate).toHaveBeenCalledOnce();
  });
});

describe("portfolio motion accessibility", () => {
  it("keeps scroll content visible before observers or animations run", () => {
    const markup = renderToStaticMarkup(createElement(ScrollReveal, {
      className: "project-feature", delay: 0.05,
      children: createElement("a", { href: "/en/projects/example" }, "View case"),
    }));
    expect(markup).toContain('class="project-feature"');
    expect(markup).toContain('href="/en/projects/example"');
    expect(markup).toContain("View case");
    expect(markup).not.toMatch(/opacity|transform|hidden|inert/);
  });

  it("keeps page content visible and creates no transform containing block", () => {
    const markup = renderToStaticMarkup(createElement(PageTransition, {
      routeKey: "/en/projects", children: createElement("h1", null, "Projects"),
    }));
    expect(markup).toContain("<h1>Projects</h1>");
    expect(markup).not.toMatch(/opacity|transform|hidden|inert/);
  });
});

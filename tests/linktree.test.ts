import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { ContentProvider } from "@/content/context";
import { LinktreePage } from "@/pages/LinktreePage";
import { WALLET_COLLECTIONS, WALLET_PROJECTS, walletCollections } from "@/lib/linktree";
import { localizedPath } from "@/i18n";
import { FALLBACK_ENVELOPE } from "@/content/fallback";
import { metaForPath } from "../worker/index";

describe("tarjetero de proyectos", () => {
  it("separa herramientas y proyectos, conservando las otras listas y sus pases", () => {
    expect(WALLET_PROJECTS).toHaveLength(26);
    expect(new Set(WALLET_PROJECTS.map((project) => project.id)).size).toBe(26);
    expect(WALLET_COLLECTIONS.map((group) => group.projects.length)).toEqual([15, 3, 3, 1, 6]);
    expect(WALLET_COLLECTIONS[0]).toMatchObject({ id: "herramientas", name: "Herramientas" });
    expect(WALLET_COLLECTIONS[1]).toEqual({ id: "proyectos", name: "Proyectos", projects: ["coffee", "explora", "un-ramito"] });
    expect(WALLET_COLLECTIONS[2].projects).toEqual(["brain", "hub", "cv"]);
    expect(WALLET_COLLECTIONS[0].projects).toContain("hub");
    expect(WALLET_COLLECTIONS[0].projects).toContain("cv");
    for (const group of WALLET_COLLECTIONS) {
      expect(group.projects.every((id) => WALLET_PROJECTS.some((project) => project.id === id))).toBe(true);
    }
    for (const project of WALLET_PROJECTS) {
      expect(new URL(`https://${project.domain}`).protocol).toBe("https:");
      expect(project.description.length).toBeGreaterThan(20);
      if (project.image) expect(existsSync(resolve("public", project.image.slice(1)))).toBe(true);
      if (project.caseSlug) expect(FALLBACK_ENVELOPE.data.projects.some((item) => item.slug === project.caseSlug)).toBe(true);
    }
    expect(WALLET_PROJECTS.find((project) => project.id === "bc")?.domain).toBe("bc.velaarturo.com");
    expect(WALLET_PROJECTS.find((project) => project.id === "coffee")?.domain).toBe("cafetero.velaarturo.com");
  });

  it("filtra nombre, dominio y función sin distinguir acentos", () => {
    expect(walletCollections("  cotización  ").flatMap((group) => group.projects).map((project) => project.id)).toEqual(["cotiza"]);
    expect(walletCollections("bc.velaarturo.com", "saas")[0].projects[0].id).toBe("bc");
    expect(walletCollections("tarjetas.velaarturo.com", "saas")[0].projects[0]).toMatchObject({ id: "tarjetas", image: "/assets/images/pases-webs/https-::tarjetas.velaarturo.com:.png" });
    expect(walletCollections("fidelización", "saas")[0].projects.map((project) => project.id)).toEqual(["tarjetas"]);
    expect(walletCollections("hub", "personal")[0].projects.map((project) => project.id)).toEqual(["hub"]);
    expect(walletCollections("color", "herramientas")[0].projects.map((project) => project.id)).toEqual(["color"]);
    expect(walletCollections("Cafetero", "herramientas")).toEqual([]);
    expect(walletCollections("no-existe")).toEqual([]);
    expect(walletCollections("", "principal")[0].projects[0].id).toBe("principal");
  });

  it("sirve la ruta pública con metadatos válidos", () => {
    expect(localizedPath("/linktree?project=hub", "es")).toBe("/linktree?project=hub");
    for (const path of ["/linktree", "/linktree/"]) {
      const meta = metaForPath(path, FALLBACK_ENVELOPE.data, "https://velaarturo.com");
      expect(meta.status).toBe(200);
      expect(meta.noindex).toBe(false);
      expect(meta.title).toContain("Tarjetero");
      expect(meta.canonicalPath).toBe("/linktree");
    }
  });

  it("amplía una sola tarjeta en su grupo y conserva enlaces antiguos", () => {
    for (const [url, group] of [["/linktree?project=hub&group=personal", "personal"], ["/linktree?project=hub", "herramientas"], ["/linktree?project=hub&group=proyectos", "herramientas"]]) {
      const html = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [url] }, createElement(ContentProvider, null, createElement(LinktreePage))));
      expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
      expect(html).toContain(`aria-expanded="true" aria-controls="detail-${group}-hub"`);
      expect(html.match(/aria-hidden="false"/g)).toHaveLength(1);
      expect(html.match(/class="wallet-detail" inert=""/g)).toHaveLength(27);
      expect(html).not.toContain("<dialog");
    }
  });
});

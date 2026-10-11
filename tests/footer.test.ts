import { ChakraProvider } from "@chakra-ui/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteShell } from "@/components/SiteShell";
import { ContentProvider } from "@/content/context";
import { system } from "@/theme";

describe("footer compartido", () => {
  it.each(["es", "en"])("mantiene contacto y enlaces legales en %s antes de cargar animaciones", (locale) => {
    const html = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [`/${locale}`] },
      createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: createElement(SiteFooter) }) })));
    expect(html).toContain('<footer class="site-footer">');
    expect(html).toContain('<div class="footer-wordmark" aria-hidden="true"><span>VELA</span></div>');
    expect(html.match(/<a /g)).toHaveLength(18);
    expect(html).toContain(`href="https://store.velaarturo.com/${locale}/"`);
    expect(html).toContain('href="mailto:dev@velaarturo.com"');
    for (const section of ["privacidad", "cookies", "condiciones", "derechos"]) {
      expect(html).toContain(`href="/${locale}/legal#${section}"`);
    }
    expect(html.replace(/<style[\s\S]*?<\/style>/g, "")).not.toMatch(/data-visible|opacity|transform|inert|<img/);
  });
  it.each(["es", "en"])("enlaza Store desde header y footer conservando idioma %s", (locale) => {
    const html = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [`/${locale}/`] },
      createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: createElement(SiteShell, { children: "Content" }) }) })));
    for (const tag of ["header", "footer"]) {
      const section = html.match(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}>`))?.[0];
      expect(section).toContain(`href="https://store.velaarturo.com/${locale}/"`);
    }
  });
});

import { ChakraProvider } from "@chakra-ui/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/SiteFooter";
import { ContentProvider } from "@/content/context";
import { system } from "@/theme";

describe("footer compartido", () => {
  it.each(["es", "en"])("mantiene contacto y enlaces legales en %s antes de cargar animaciones", (locale) => {
    const html = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [`/${locale}`] },
      createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: createElement(SiteFooter) }) })));
    expect(html).toContain('<footer class="site-footer">');
    expect(html).toContain('<div class="footer-wordmark" aria-hidden="true"><span>VELA</span></div>');
    expect(html.match(/<a /g)).toHaveLength(17);
    expect(html).toContain('href="mailto:dev@velaarturo.com"');
    for (const section of ["privacidad", "cookies", "condiciones", "derechos"]) {
      expect(html).toContain(`href="/${locale}/legal#${section}"`);
    }
    expect(html.replace(/<style[\s\S]*?<\/style>/g, "")).not.toMatch(/data-visible|opacity|transform|inert|<img/);
  });
});

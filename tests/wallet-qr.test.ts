import { ChakraProvider } from "@chakra-ui/react";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { expect, it, vi } from "vitest";
import { ContentProvider } from "@/content/context";
import { WALLET_PROJECTS } from "@/lib/linktree";
import { LinktreePage } from "@/pages/LinktreePage";
import WalletQr from "@/pages/WalletQr";
import { system } from "@/theme";

function renderWallet(path: string) {
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] },
    createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, null, createElement(LinktreePage)) })));
}

function qrPattern(html: string) {
  const svg = html.match(/<svg[^>]*aria-label="Código QR para visitar [^"]+"[^>]*>[\s\S]*?<\/svg>/)?.[0];
  return svg?.match(/<path\b[^>]*\sd="([^"]+)"/)?.[1];
}

it("carga únicamente el QR de la tarjeta abierta y codifica su enlace", async () => {
  expect(renderWallet("/linktree")).not.toContain("Código QR para visitar");
  expect(renderWallet("/linktree?project=torneo&group=herramientas")).toContain("Preparando QR…");

  await vi.waitFor(() => expect(renderWallet("/linktree?project=torneo&group=herramientas")).toContain("Código QR para visitar Torneo"));

  for (const [id, group] of [["torneo", "herramientas"], ["hub", "personal"], ["principal", "principal"]]) {
    const project = WALLET_PROJECTS.find((item) => item.id === id)!;
    const html = renderWallet(`/linktree?project=${id}&group=${group}`);
    const expected = renderToStaticMarkup(createElement(ChakraProvider, { value: system, children:
      createElement(WalletQr, { url: `https://${project.domain}`, name: project.name }) }));
    expect(html.match(/aria-label="Código QR para visitar /g)).toHaveLength(1);
    expect(qrPattern(html)).toBe(qrPattern(expected));
    expect(qrPattern(expected)).toMatch(/^M40,40/);
  }
});

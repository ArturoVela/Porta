import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContentProvider } from "@/content/context";
import { ContactPage } from "@/pages/ContactPage";
import { system } from "@/theme";

const provider = vi.hoisted(() => ({ state: { submitting: false, succeeded: false, errors: null as null | { getFieldErrors: (name: string) => { message: string }[] } } }));
vi.mock("@formspree/react", async (importOriginal) => ({
  ...await importOriginal<typeof import("@formspree/react")>(),
  useForm: () => [provider.state, vi.fn(), vi.fn()],
}));

function render(locale = "es") {
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [locale === "en" ? "/en/contact" : "/es/contacto"] },
    createElement(ChakraProvider, { value: system, children: createElement(ContentProvider, { children: createElement(ContactPage) }) })));
}

afterEach(() => { provider.state = { submitting: false, succeeded: false, errors: null }; });

describe("estados de contacto sin enviar mensajes reales", () => {
  it("conserva campos y consentimiento sin marcar al fallar", () => {
    provider.state.errors = { getFieldErrors: (name) => name === "email" ? [{ message: "Invalid email" }] : [] };
    const markup = render();
    expect(markup).toContain("No se pudo enviar el mensaje");
    expect(markup).toContain('role="alert"');
    expect(markup).toContain("Correo Invalid email");
    for (const field of ["name", "email", "organization", "message", "privacyConsent"]) expect(markup).toContain(`name="${field}"`);
    expect(markup).not.toContain('checked=""');
    expect(markup).toContain("Copiar correo");
  });

  it("bloquea nuevos envíos y comunica progreso", () => {
    provider.state.submitting = true;
    const markup = render("en");
    expect(markup).toContain("Sending message…");
    expect(markup).toContain('disabled=""');
    expect(markup).toContain("Tell me about your project");
  });

  it("confirma éxito y sustituye formulario por estado accesible", () => {
    provider.state.succeeded = true;
    const markup = render();
    expect(markup).toContain("Mensaje enviado");
    expect(markup).toContain('role="status"');
    expect(markup).not.toContain("<form");
  });
});

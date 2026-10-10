import type { Locale } from "@/i18n";
import type { SiteContent } from "@/types/content";

export function publicDevUrl(locale: Locale) {
  return `https://velaarturo.com${locale === "en" ? "/en/dev" : "/dev"}`;
}

export function contactVCard(site: Pick<SiteContent, "name" | "email">, locale: Locale) {
  const escape = (value: string) => value.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `N:;${escape(site.name)};;;`, `FN:${escape(site.name)}`, `EMAIL:${escape(site.email)}`, `URL:${publicDevUrl(locale)}`, "END:VCARD"];
  return lines.map((line) => {
    let folded = "", bytes = 0;
    for (const character of line) {
      const length = new TextEncoder().encode(character).length;
      if (bytes + length > 75) { folded += "\r\n "; bytes = 1; }
      folded += character;
      bytes += length;
    }
    return folded;
  }).join("\r\n") + "\r\n";
}

export async function copyText(value: string): Promise<"copied" | "blocked"> {
  try {
    await navigator.clipboard.writeText(value);
    return "copied";
  } catch { return "blocked"; }
}

export async function shareDevCard(name: string, locale: Locale): Promise<"shared" | "copied" | "blocked" | "cancelled"> {
  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title: name, url: publicDevUrl(locale) });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "cancelled";
    }
  }
  return copyText(publicDevUrl(locale));
}

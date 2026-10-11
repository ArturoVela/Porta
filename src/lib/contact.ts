import type { Locale } from "@/i18n";
import type { SiteContent } from "@/types/content";

export function publicDevUrl(locale: Locale) {
  return `https://velaarturo.com${locale === "en" ? "/en/dev" : "/dev"}`;
}

export function contactVCard(site: Pick<SiteContent, "name" | "email">, locale: Locale, details: { organization?: string; title?: string; alternateEmail?: string; additionalEmails?: readonly string[]; url?: string } = {}) {
  const escape = (value: string) => value.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `N:;${escape(site.name)};;;`, `FN:${escape(site.name)}`, `EMAIL:${escape(site.email)}`];
  if (details.alternateEmail) lines.push(`EMAIL;TYPE=WORK:${escape(details.alternateEmail)}`);
  for (const email of details.additionalEmails ?? []) lines.push(`EMAIL;TYPE=WORK:${escape(email)}`);
  if (details.organization) lines.push(`ORG:${escape(details.organization)}`);
  if (details.title) lines.push(`TITLE:${escape(details.title)}`);
  lines.push(`URL:${escape(details.url ?? publicDevUrl(locale))}`, "END:VCARD");
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

export async function shareDevCard(name: string, locale: Locale, url = publicDevUrl(locale)): Promise<"shared" | "copied" | "blocked" | "cancelled"> {
  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title: name, url });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "cancelled";
    }
  }
  return copyText(url);
}

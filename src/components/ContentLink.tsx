import { Link, type LinkProps } from "react-router";
import { useContent } from "@/content/context";
import { contentHref } from "@/lib/preview";
import { localizedPath } from "@/i18n";
import { startProjectImageTransition } from "@/components/PortfolioMotion";

export function ContentLink({ to, onClick, onPointerEnter, onFocus, ...props }: Omit<LinkProps, "to"> & { to: string }) {
  const { previewToken, locale } = useContent();
  const preload = () => { if (to.startsWith("/proyectos/")) void import("@/pages/ProjectPage").catch(() => {}); };
  return <Link {...props} to={contentHref(localizedPath(to, locale), previewToken)}
    onPointerEnter={(event) => { onPointerEnter?.(event); preload(); }}
    onFocus={(event) => { onFocus?.(event); preload(); }}
    onClick={(event) => { onClick?.(event); startProjectImageTransition(event); }} />;
}

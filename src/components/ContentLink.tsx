import { Link, type LinkProps } from "react-router";
import { useContent } from "@/content/context";
import { contentHref } from "@/lib/preview";
import { blogHref, localizedPath } from "@/i18n";
import { startProjectImageTransition } from "@/components/PortfolioMotion";

export function ContentLink({ to, onClick, onPointerEnter, onFocus, ...props }: Omit<LinkProps, "to"> & { to: string }) {
  const { previewToken, locale } = useContent();
  const path = localizedPath(to, locale);
  const blog = previewToken ? null : blogHref(path);
  const preload = () => { if (to.startsWith("/proyectos/")) void import("@/pages/ProjectPage").catch(() => {}); };
  return <Link {...props} to={blog ?? contentHref(path, previewToken)} reloadDocument={Boolean(blog) || props.reloadDocument}
    onPointerEnter={(event) => { onPointerEnter?.(event); preload(); }}
    onFocus={(event) => { onFocus?.(event); preload(); }}
    onClick={(event) => { onClick?.(event); startProjectImageTransition(event); }} />;
}

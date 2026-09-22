import { Link, type LinkProps } from "react-router";
import { useContent } from "@/content/context";
import { contentHref } from "@/lib/preview";
import { localizedPath } from "@/i18n";

export function ContentLink({ to, ...props }: Omit<LinkProps, "to"> & { to: string }) {
  const { previewToken, locale } = useContent();
  return <Link {...props} to={contentHref(localizedPath(to, locale), previewToken)} />;
}

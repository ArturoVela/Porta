import { Link, type LinkProps } from "react-router";
import { useContent } from "@/content/context";
import { contentHref } from "@/lib/preview";

export function ContentLink({ to, ...props }: Omit<LinkProps, "to"> & { to: string }) {
  const { previewToken } = useContent();
  return <Link {...props} to={contentHref(to, previewToken)} />;
}

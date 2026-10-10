export function contentHref(path: string, previewToken: string | null) {
  if (!previewToken || !path.startsWith("/") || path.startsWith("//")) return path;
  const target = new URL(path, "https://portfolio.invalid");
  return `/__preview?${new URLSearchParams({ token: previewToken, path: target.pathname + target.search })}${target.hash}`;
}

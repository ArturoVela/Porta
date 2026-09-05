export function contentHref(path: string, previewToken: string | null) {
  if (!previewToken || !path.startsWith("/") || path.startsWith("//")) return path;
  return `/__preview?${new URLSearchParams({ token: previewToken, path })}`;
}

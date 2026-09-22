import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import { fetchManifest, initialManifest } from "@/lib/content";
import { COPY, localeFromPath, type Locale, type LocaleCopy } from "@/i18n";
import type { PortfolioManifest } from "@/types/content";

interface ContentState {
  content: PortfolioManifest;
  isRefreshing: boolean;
  refreshWarning: string | null;
  previewToken: string | null;
  locale: Locale;
  copy: LocaleCopy;
}

const ContentContext = createContext<ContentState | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const previewToken = location.pathname === "/__preview" ? new URLSearchParams(location.search).get("token") : null;
  const previewPath = location.pathname === "/__preview" ? new URLSearchParams(location.search).get("path") : null;
  const locale = localeFromPath(previewPath ?? location.pathname) ?? "es";
  const [content, setContent] = useState(() => initialManifest(locale));
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [refreshWarning, setRefreshWarning] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const controller = new AbortController();
    setContent(initialManifest(locale));
    setIsRefreshing(true);
    fetchManifest(locale, controller.signal, previewToken)
      .then((envelope) => {
        setContent(envelope.data);
        setRefreshWarning(null);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setRefreshWarning(error instanceof Error ? error.message : locale === "en" ? "Local content active" : "Contenido local activo");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsRefreshing(false);
      });
    return () => controller.abort();
  }, [locale, previewToken]);

  const value = useMemo(() => ({ content, isRefreshing, refreshWarning, previewToken, locale, copy: COPY[locale] }), [content, isRefreshing, refreshWarning, previewToken, locale]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContent debe usarse dentro de ContentProvider");
  return value;
}

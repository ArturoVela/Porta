import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import { fetchManifest, initialManifest } from "@/lib/content";
import type { PortfolioManifest } from "@/types/content";

interface ContentState {
  content: PortfolioManifest;
  isRefreshing: boolean;
  refreshWarning: string | null;
  previewToken: string | null;
}

const ContentContext = createContext<ContentState | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const previewToken = location.pathname === "/__preview" ? new URLSearchParams(location.search).get("token") : null;
  const [content, setContent] = useState(initialManifest);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [refreshWarning, setRefreshWarning] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsRefreshing(true);
    fetchManifest(controller.signal, previewToken)
      .then((envelope) => {
        setContent(envelope.data);
        setRefreshWarning(null);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setRefreshWarning(error instanceof Error ? error.message : "Contenido local activo");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsRefreshing(false);
      });
    return () => controller.abort();
  }, [previewToken]);

  const value = useMemo(() => ({ content, isRefreshing, refreshWarning, previewToken }), [content, isRefreshing, refreshWarning, previewToken]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContent debe usarse dentro de ContentProvider");
  return value;
}

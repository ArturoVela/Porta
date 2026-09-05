import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Box, Text } from "@chakra-ui/react";
import { ContentProvider } from "@/content/context";
import { SiteShell } from "@/components/SiteShell";
import { HomePage } from "@/pages/HomePage";

const ProjectsPage = lazy(() => import("@/pages/ProjectsPage").then((module) => ({ default: module.ProjectsPage })));
const ProjectPage = lazy(() => import("@/pages/ProjectPage").then((module) => ({ default: module.ProjectPage })));
const ProfilePage = lazy(() => import("@/pages/ProfilePage").then((module) => ({ default: module.ProfilePage })));
const ArticlesPage = lazy(() => import("@/pages/ArticlesPage").then((module) => ({ default: module.ArticlesPage })));
const ArticlePage = lazy(() => import("@/pages/ArticlePage").then((module) => ({ default: module.ArticlePage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then((module) => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));

function PortfolioRoutes() {
  const location = useLocation();
  const previewPath = location.pathname === "/__preview" ? new URLSearchParams(location.search).get("path") || "/" : null;
  return (
    <>
      {previewPath ? <Box bg="app.accent-subtle" borderBottomWidth="1px" borderColor="app.border" px="5" py="3"><Text textAlign="center" fontSize="sm" fontWeight="650">Vista previa privada · los cambios aún no están publicados</Text></Box> : null}
      <Routes location={previewPath ?? location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        <Route path="/proyectos/:slug" element={<ProjectPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/articulos" element={<ArticlesPage />} />
        <Route path="/articulos/:slug" element={<ArticlePage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export function App() {
  return (
    <ContentProvider>
      <SiteShell>
        <Suspense fallback={<div className="route-loading" role="status">Cargando contenido…</div>}>
          <PortfolioRoutes />
        </Suspense>
      </SiteShell>
    </ContentProvider>
  );
}

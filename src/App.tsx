import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Box, Text } from "@chakra-ui/react";
import { ContentProvider } from "@/content/context";
import { useContent } from "@/content/context";
import { SiteShell } from "@/components/SiteShell";
import { HomePage } from "@/pages/HomePage";

const ProjectsPage = lazy(() => import("@/pages/ProjectsPage").then((module) => ({ default: module.ProjectsPage })));
const AllProjectsPage = lazy(() => import("@/pages/AllProjectsPage").then((module) => ({ default: module.AllProjectsPage })));
const ProjectPage = lazy(() => import("@/pages/ProjectPage").then((module) => ({ default: module.ProjectPage })));
const ProfilePage = lazy(() => import("@/pages/ProfilePage").then((module) => ({ default: module.ProfilePage })));
const ArticlesPage = lazy(() => import("@/pages/ArticlesPage").then((module) => ({ default: module.ArticlesPage })));
const ArticlePage = lazy(() => import("@/pages/ArticlePage").then((module) => ({ default: module.ArticlePage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then((module) => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));

function PortfolioRoutes() {
  const location = useLocation();
  const previewPath = location.pathname === "/__preview" ? new URLSearchParams(location.search).get("path") || "/" : null;
  const { copy } = useContent();
  return (
    <>
      {previewPath ? <Box bg="app.accent-subtle" borderBottomWidth="1px" borderColor="app.border" px="5" py="3"><Text textAlign="center" fontSize="sm" fontWeight="650">{copy.preview}</Text></Box> : null}
      <Routes location={previewPath ?? location}>
        <Route path="/es" element={<HomePage />} />
        <Route path="/en" element={<HomePage />} />
        <Route path="/es/proyectos" element={<ProjectsPage />} />
        <Route path="/en/projects" element={<ProjectsPage />} />
        <Route path="/es/todos" element={<AllProjectsPage />} />
        <Route path="/en/all" element={<AllProjectsPage />} />
        <Route path="/es/proyectos/:slug" element={<ProjectPage />} />
        <Route path="/en/projects/:slug" element={<ProjectPage />} />
        <Route path="/es/perfil" element={<ProfilePage />} />
        <Route path="/en/profile" element={<ProfilePage />} />
        <Route path="/es/articulos" element={<ArticlesPage />} />
        <Route path="/en/articles" element={<ArticlesPage />} />
        <Route path="/es/articulos/:slug" element={<ArticlePage />} />
        <Route path="/en/articles/:slug" element={<ArticlePage />} />
        <Route path="/es/contacto" element={<ContactPage />} />
        <Route path="/en/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export function App() {
  return (
    <ContentProvider>
      <LocalizedRoutes />
    </ContentProvider>
  );
}

function LocalizedRoutes() {
  const { copy } = useContent();
  return (
    <SiteShell>
      <Suspense fallback={<div className="route-loading" role="status">{copy.common.loading}</div>}>
        <PortfolioRoutes />
      </Suspense>
    </SiteShell>
  );
}

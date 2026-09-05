import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ProjectFeature } from "@/components/ContentCards";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent } from "@/content/context";
import { Link } from "react-router";

export function ProjectsPage() {
  const { content } = useContent();
  const projects = [...content.projects].sort((a, b) => a.order - b.order);
  const featured = projects.filter((project) => project.featured);
  const archive = projects.filter((project) => !project.featured);
  return (
    <>
      <Container maxW="7xl" py={{ base: "14", md: "24" }}><SectionHeading title="Proyectos" description="Una selección de productos propios, trabajo para clientes y experimentos donde la decisión técnica responde a una necesidad concreta." /></Container>
      <Box bg="app.panel" borderYWidth="1px" borderColor="app.border"><Container maxW="7xl">{featured.map((project, index) => <ProjectFeature key={project.id} project={project} reverse={index % 2 === 1} index={index} />)}</Container></Box>
      {archive.length ? <Container maxW="7xl" py={{ base: "16", md: "24" }}><Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.045em" mb="10">Archivo</Heading><SimpleGrid columns={{ base: 1, md: 3 }} gap="8">{archive.map((project) => <Link key={project.id} to={`/proyectos/${project.slug}`}><Stack borderTopWidth="1px" borderColor="app.border" pt="5" gap="3"><Text color="app.muted" fontSize="sm">{project.year} · {project.type}</Text><Heading as="h3" fontSize="2xl">{project.title}</Heading><Text color="app.muted">{project.excerpt}</Text></Stack></Link>)}</SimpleGrid></Container> : null}
    </>
  );
}

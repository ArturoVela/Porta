import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ProjectArchiveCard, ProjectFeature } from "@/components/ContentCards";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent } from "@/content/context";

export function ProjectsPage() {
  const { content } = useContent();
  const projects = [...content.projects].sort((a, b) => a.order - b.order);
  const featured = projects.filter((project) => project.featured);
  const archive = projects.filter((project) => !project.featured);
  return (
    <>
      <Container maxW="7xl" py={{ base: "14", md: "24" }}><SectionHeading title="Proyectos" description="Productos propios, trabajo para clientes y experimentos donde cada decisión técnica responde a una necesidad concreta." /></Container>
      <Box bg="app.panel" borderYWidth="1px" borderColor="app.border"><Container maxW="7xl">{featured.map((project, index) => <ProjectFeature key={project.id} project={project} reverse={index % 2 === 1} index={index} />)}</Container></Box>
      {archive.length ? <Container maxW="7xl" py={{ base: "16", md: "24" }}><Stack gap="3" mb="10"><Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.045em">Archivo de proyectos</Heading><Text color="app.muted" maxW="62ch">Una vista rápida de cada producto, sistema y experimento. Cada portada se construye con la identidad y las tecnologías del proyecto.</Text></Stack><SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: "8", lg: "10" }}>{archive.map((project) => <ProjectArchiveCard key={project.id} project={project} />)}</SimpleGrid></Container> : null}
    </>
  );
}

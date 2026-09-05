import { Box, Button, Container, Flex, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ProjectVisual } from "@/components/ContentCards";
import { useContent } from "@/content/context";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function ProjectPage() {
  const { slug } = useParams();
  const { content } = useContent();
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) return <NotFoundPage />;
  const availability = projectAvailabilityLabel(project);
  return (
    <Container maxW="7xl" py={{ base: "10", md: "18" }}>
      <Link to="/proyectos"><HStack color="app.muted" mb="10"><ArrowLeft size={17} /><Text>Volver a proyectos</Text></HStack></Link>
      <Grid templateColumns={{ base: "1fr", lg: "1.35fr .65fr" }} gap={{ base: "8", lg: "16" }} alignItems="end" mb={{ base: "10", md: "16" }}>
        <Stack gap="6"><HStack color="app.muted"><Text>{project.category}</Text><Box w="8" h="1px" bg="app.border" /><Text>{project.year}</Text></HStack><Heading as="h1" fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }} lineHeight=".9" letterSpacing="-.06em">{project.title}</Heading><Text color="app.muted" fontSize={{ base: "lg", md: "xl" }} maxW="55ch">{project.excerpt}</Text></Stack>
        <Stack gap="3"><Text fontSize="sm" color="app.muted">Rol</Text><Text fontWeight="650">{project.role}</Text><HStack color="app.muted" fontSize="sm"><Box w="2" h="2" borderRadius="full" bg="app.accent" /><Text>{availability}</Text></HStack><Flex gap="3" wrap="wrap" pt="3">{project.liveUrl ? <Button asChild borderRadius="0" bg="brand.600" color="white"><a href={project.liveUrl} target="_blank" rel="noreferrer">{availability === "Acceso restringido" ? "Abrir acceso" : "Abrir proyecto"} <ExternalLink size={16} /></a></Button> : null}{project.repoUrl ? <Button asChild borderRadius="0" variant="outline" borderColor="app.text"><a href={project.repoUrl} target="_blank" rel="noreferrer"><Github size={16} /> Código</a></Button> : null}</Flex></Stack>
      </Grid>
      <ProjectVisual project={project} />
      <Grid templateColumns={{ base: "1fr", lg: "1.2fr .8fr" }} gap={{ base: "12", lg: "20" }} py={{ base: "12", md: "20" }}>
        <MarkdownBody>{project.body}</MarkdownBody>
        <Stack gap="10">
          <Box><Text fontSize="sm" color="app.muted" mb="4">Tecnologías y capacidades</Text><Flex gap="2" wrap="wrap">{project.stack.map((item) => <Text key={item} borderWidth="1px" borderColor="app.border" px="3" py="1.5" fontSize="sm">{item}</Text>)}</Flex></Box>
          <Box><Text fontSize="sm" color="app.muted" mb="4">Resultados verificables</Text><Stack gap="0">{project.outcomes.map((outcome) => <HStack key={outcome} align="start" py="4" borderTopWidth="1px" borderColor="app.border"><Box mt="2" w="2" h="2" borderRadius="full" bg="brand.500" flexShrink="0" /><Text>{outcome}</Text></HStack>)}</Stack></Box>
        </Stack>
      </Grid>
      <Box borderTopWidth="1px" borderColor="app.border" pt="12"><Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.04em" mb="8">Siguiente lectura</Heading><SimpleGrid columns={{ base: 1, md: 2 }} gap="6">{content.projects.filter((item) => item.id !== project.id).slice(0, 2).map((item) => <Link key={item.id} to={`/proyectos/${item.slug}`}><Stack bg="app.panel" borderWidth="1px" borderColor="app.border" p="6" _hover={{ borderColor: "app.accent" }}><Text color="app.muted">{item.type}</Text><Heading as="h3" fontSize="2xl">{item.title}</Heading></Stack></Link>)}</SimpleGrid></Box>
    </Container>
  );
}

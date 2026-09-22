import { AspectRatio, Box, Button, Container, Flex, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { useParams } from "react-router";
import { ContentLink as Link } from "@/components/ContentLink";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ProjectVisual } from "@/components/ContentCards";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useContent } from "@/content/context";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import { selectSpotlightProjects } from "@/lib/spotlight";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function ProjectPage() {
  const { slug } = useParams();
  const { content, copy, locale } = useContent();
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) return <NotFoundPage />;

  const availability = projectAvailabilityLabel(project, locale);
  const isRestricted = projectAvailabilityLabel(project) === "Acceso restringido";
  const related = [...selectSpotlightProjects(content.projects), ...content.projects]
    .filter((item, index, items) => item.id !== project.id && items.findIndex((candidate) => candidate.id === item.id) === index)
    .slice(0, 2);

  return (
    <Container maxW="7xl" py={{ base: "8", md: "16" }}>
      <Link to="/proyectos" className="project-back-link">
        <HStack color="app.muted" mb={{ base: "8", md: "10" }} minH="11" w="fit-content"><ArrowLeft size={17} /><Text>{copy.project.back}</Text></HStack>
      </Link>

      <Grid templateColumns={{ base: "1fr", lg: "1.35fr .65fr" }} gap={{ base: "8", lg: "16" }} alignItems="end" mb={{ base: "10", md: "16" }}>
        <Stack gap="6">
          <HStack color="app.muted"><Text>{project.category}</Text><Box w="8" h="1px" bg="app.border" /><Text>{project.year}</Text></HStack>
          <Heading as="h1" fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }} lineHeight=".9" letterSpacing="-.06em">{project.title}</Heading>
          <Text color="app.muted" fontSize={{ base: "lg", md: "xl" }} maxW="55ch">{project.excerpt}</Text>
        </Stack>
        <Stack gap="3">
          <Text fontSize="sm" color="app.muted">{copy.project.role}</Text>
          <Text fontWeight="650">{project.role}</Text>
          <HStack color="app.muted" fontSize="sm"><Box w="2" h="2" borderRadius="full" bg="app.accent" /><Text>{availability}</Text></HStack>
          <Flex gap="3" wrap="wrap" pt="3">
            {project.liveUrl ? <Button asChild minH="11" borderRadius="0" bg="brand.600" color="white"><a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{isRestricted ? copy.project.restrictedOpen : copy.project.openProject} <ExternalLink size={16} /></a></Button> : null}
            {project.repoUrl ? <Button asChild minH="11" borderRadius="0" variant="outline" borderColor="app.text"><a href={project.repoUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> {copy.project.code}</a></Button> : null}
          </Flex>
          {project.liveUrl ? <Text color="app.muted" fontSize="sm">{project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</Text> : null}
        </Stack>
      </Grid>

      <ProjectVisual project={project} />

      <Grid templateColumns={{ base: "1fr", lg: "1.2fr .8fr" }} gap={{ base: "12", lg: "20" }} py={{ base: "12", md: "20" }}>
        <MarkdownBody>{project.body}</MarkdownBody>
        <Stack gap="10">
          <Box><Text fontSize="sm" color="app.muted" mb="4">{copy.project.technology}</Text><Flex gap="2" wrap="wrap">{project.stack.map((item) => <Text key={item} borderWidth="1px" borderColor="app.border" px="3" py="1.5" fontSize="sm">{item}</Text>)}</Flex></Box>
          <Box><Text fontSize="sm" color="app.muted" mb="4">{copy.project.scope}</Text><Stack gap="0">{project.outcomes.map((outcome) => <HStack key={outcome} align="start" py="4" borderTopWidth="1px" borderColor="app.border"><Box mt="2" w="2" h="2" borderRadius="full" bg="brand.500" flexShrink="0" /><Text>{outcome}</Text></HStack>)}</Stack></Box>
        </Stack>
      </Grid>

      {project.gallery?.length ? (
        <Box as="section" pb={{ base: "12", md: "20" }} aria-label={`${copy.project.screens} ${project.title}`}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
            {project.gallery.map((image) => <Box as="figure" key={image.src}><AspectRatio ratio={image.width / image.height} overflow="hidden" bg="app.surface"><ResponsiveImage image={image} /></AspectRatio><Text as="figcaption" color="app.muted" fontSize="sm" mt="3">{image.alt}</Text></Box>)}
          </SimpleGrid>
        </Box>
      ) : null}

      <Box as="section" bg="brand.600" color="white" px={{ base: "6", md: "10" }} py={{ base: "9", md: "12" }} mb={{ base: "12", md: "20" }}>
        <Grid templateColumns={{ base: "1fr", md: "1.35fr .65fr" }} gap="8" alignItems="end">
          <Stack gap="3"><Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.045em" lineHeight=".98">{copy.project.ctaTitle}</Heading><Text color="brand.100" fontSize={{ md: "lg" }} maxW="55ch">{copy.project.ctaDescription}</Text></Stack>
          <Button asChild minH="11" size="lg" bg="white" color="brand.800" borderRadius="0" justifySelf={{ md: "end" }} px="7" _hover={{ bg: "brand.50" }}><Link to="/contacto">{copy.project.ctaButton} <ArrowUpRight size={18} /></Link></Button>
        </Grid>
      </Box>

      <Box borderTopWidth="1px" borderColor="app.border" pt="12">
        <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.04em" mb="8">{copy.project.next}</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
          {related.map((item) => <Link key={item.id} to={`/proyectos/${item.slug}`}><Stack minH="11" bg="app.panel" borderWidth="1px" borderColor="app.border" p="6" _hover={{ borderColor: "app.accent" }}><Text color="app.muted">{item.type}</Text><Heading as="h3" fontSize="2xl">{item.title}</Heading></Stack></Link>)}
        </SimpleGrid>
      </Box>
    </Container>
  );
}

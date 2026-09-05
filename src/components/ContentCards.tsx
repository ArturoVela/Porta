import { AspectRatio, Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import type { ArticleContent, ProjectContent } from "@/types/content";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const visualCopy: Record<string, string[]> = {
  hub: ["39 utilidades", "Local-first", "Carga modular"],
  "un-ramito": ["Diseña", "Cifra", "Comparte"],
  "security-lab": ["V1", "V2", "V3", "V4"],
};

function AbstractProjectVisual({ project }: { project: ProjectContent }) {
  const labels = visualCopy[project.slug] ?? project.stack.slice(0, 3);
  return (
    <Flex h="100%" minH="17rem" bg="app.accent-subtle" color="app.text" p={{ base: "5", md: "7" }} direction="column" justify="space-between" borderRadius="2xl">
      <HStack justify="space-between"><Text fontWeight="700">{project.type}</Text><Text color="app.muted">{project.year}</Text></HStack>
      <Stack gap="3">
        {labels.map((label, index) => (
          <Flex key={label} align="center" gap="3" ml={`${index * 9}%`}>
            <Box w="2.5" h="2.5" borderRadius="full" bg={index === 1 ? "app.text" : "brand.500"} />
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="650">{label}</Text>
          </Flex>
        ))}
      </Stack>
      <Box h="1px" bg="app.border" />
    </Flex>
  );
}

export function ProjectVisual({ project }: { project: ProjectContent }) {
  if (!project.cover) return <AbstractProjectVisual project={project} />;
  return (
    <AspectRatio ratio={16 / 10} overflow="hidden" borderRadius="2xl" bg="app.surface">
      <ResponsiveImage image={project.cover} />
    </AspectRatio>
  );
}

export function ProjectFeature({ project, reverse = false }: { project: ProjectContent; reverse?: boolean }) {
  return (
    <Box borderTopWidth="1px" borderColor="app.border" py={{ base: "8", md: "12" }}>
      <Flex direction={{ base: "column", lg: reverse ? "row-reverse" : "row" }} gap={{ base: "7", lg: "12" }} align="stretch">
        <Box flex="1.25"><ProjectVisual project={project} /></Box>
        <Stack flex=".75" justify="center" align="start" gap="5">
          <HStack color="app.muted" fontSize="sm"><Text>{project.category}</Text><Box w="8" h="1px" bg="app.border" /><Text>{project.year}</Text></HStack>
          <Heading as="h3" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.045em" lineHeight=".98">{project.title}</Heading>
          <Text color="app.muted" fontSize={{ base: "md", md: "lg" }} maxW="50ch">{project.excerpt}</Text>
          <Link to={`/proyectos/${project.slug}`}>
            <HStack fontWeight="700" gap="2" borderBottomWidth="1px" borderColor="app.text" pb="1"><Text>Ver caso</Text><ArrowUpRight size={17} /></HStack>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}

export function ArticleCard({ article }: { article: ArticleContent }) {
  return (
    <Link to={`/articulos/${article.slug}`}>
      <Stack h="100%" borderTopWidth="1px" borderColor="app.border" pt="5" pb="3" gap="4" _hover={{ transform: "translateY(-2px)" }} transition="transform .18s ease">
        <HStack justify="space-between" color="app.muted" fontSize="sm"><Text>{article.category}</Text><Text>{new Intl.DateTimeFormat("es-PE", { year: "numeric", month: "short", day: "numeric", timeZone: "America/Lima" }).format(new Date(`${article.publishedAt}T12:00:00-05:00`))}</Text></HStack>
        <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} letterSpacing="-.025em" lineHeight="1.15">{article.title}</Heading>
        <Text color="app.muted">{article.excerpt}</Text>
        <HStack mt="auto" fontWeight="650"><Text>{article.readingMinutes} min de lectura</Text><ArrowUpRight size={16} /></HStack>
      </Stack>
    </Link>
  );
}

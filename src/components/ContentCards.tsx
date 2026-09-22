import { AspectRatio, Box, Flex, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { ContentLink as Link } from "@/components/ContentLink";
import type { ArticleContent, ProjectContent } from "@/types/content";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useContent } from "@/content/context";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import { projectDisplayCover } from "@/lib/spotlight";

const visualCopy: Record<string, string[]> = {
  hub: ["39 utilidades", "Local-first", "Carga modular"],
  "un-ramito": ["Diseña", "Cifra", "Comparte"],
  "security-lab": ["V1", "V2", "V3", "V4"],
};

const posterPalettes = [
  { background: "#081538", foreground: "#F4F7FF" },
  { background: "#FF5A36", foreground: "#160B08" },
  { background: "#DCE76A", foreground: "#171A08" },
  { background: "#0D4B4F", foreground: "#E1FFF7" },
  { background: "#48225F", foreground: "#FBEAFF" },
  { background: "#2453F4", foreground: "#FFFFFF" },
  { background: "#D6AF66", foreground: "#211607" },
  { background: "#702640", foreground: "#FFEAF1" },
] as const;

const posterPaletteOverrides: Partial<Record<string, { background: string; foreground: string }>> = {
  hub: posterPalettes[0],
  "un-ramito": posterPalettes[1],
  "security-lab": { background: "#121722", foreground: "#8FF0BD" },
  "nieto-import": { background: "#1D2430", foreground: "#F7F4EF" },
  coffee: posterPalettes[6],
  "explora-san-martin": posterPalettes[3],
  color: posterPalettes[4],
};

function posterPalette(slug: string) {
  const override = posterPaletteOverrides[slug];
  if (override) return override;
  const index = Array.from(slug).reduce((total, character) => total + character.charCodeAt(0), 0) % posterPalettes.length;
  return posterPalettes[index];
}

function AbstractProjectVisual({ project, compact = false }: { project: ProjectContent; compact?: boolean }) {
  const labels = visualCopy[project.slug] ?? project.stack.slice(0, 3);
  const monogram = project.title.split(/\s+/).map((word) => word[0]).join("").slice(0, 2);
  const palette = posterPalette(project.slug);
  const posterStyle = {
    "--poster-background": palette.background,
    "--poster-foreground": palette.foreground,
  } as CSSProperties;
  return (
    <Flex className="project-poster" style={posterStyle} h="100%" minH={compact ? "0" : { base: "20rem", md: "27rem" }} p={compact ? "5" : { base: "6", md: "8" }} direction="column" justify="space-between" position="relative" overflow="hidden">
      <HStack justify="space-between" position="relative" zIndex="1"><Text fontWeight="750">{project.type}</Text><Text opacity=".7">{project.year}</Text></HStack>
      <Text className="project-poster__monogram" data-compact={compact || undefined} aria-hidden="true">{monogram}</Text>
      <Stack gap="2" align="start" position="relative" zIndex="1">
        {labels.map((label, index) => <Text key={label} display={compact && index > 1 ? "none" : "block"} borderWidth="1px" borderColor="currentColor" bg={index === 1 ? "currentColor" : "transparent"} color={index === 1 ? "var(--poster-background)" : "currentColor"} px="3" py="1" fontSize={compact ? "sm" : "md"} fontWeight="650">{label}</Text>)}
      </Stack>
    </Flex>
  );
}

export function ProjectVisual({ project, compact = false }: { project: ProjectContent; compact?: boolean }) {
  const { locale } = useContent();
  const cover = projectDisplayCover(project, locale);
  if (!cover) {
    return compact
      ? <AspectRatio className="project-card__visual" ratio={16 / 10} overflow="hidden"><AbstractProjectVisual project={project} compact /></AspectRatio>
      : <AbstractProjectVisual project={project} />;
  }
  return (
    <AspectRatio className={compact ? "project-card__visual" : undefined} ratio={cover.width / cover.height} overflow="hidden" borderRadius="0" bg="app.surface">
      <ResponsiveImage image={cover} />
    </AspectRatio>
  );
}

export function ProjectArchiveCard({ project }: { project: ProjectContent }) {
  const { copy, locale } = useContent();
  return (
    <Link to={`/proyectos/${project.slug}`} className="project-card">
      <Stack h="100%" gap="0">
        <ProjectVisual project={project} compact />
        <Stack className="project-card__body" flex="1" borderWidth="1px" borderTopWidth="0" borderColor="app.border" p={{ base: "5", md: "6" }} gap="4">
          <Flex justify="space-between" gap="4" color="app.muted" fontSize="sm"><Text>{project.year}</Text><Text textAlign="right">{projectAvailabilityLabel(project, locale)}</Text></Flex>
          <Stack gap="2">
            <Text color="app.accent" fontWeight="700" fontSize="sm">{project.category}</Text>
            <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-.035em" lineHeight="1">{project.title}</Heading>
          </Stack>
          <Text color="app.muted">{project.excerpt}</Text>
          <HStack className="project-card__action" minH="11" mt="auto" pt="3" justify="space-between" fontWeight="750"><Text>{copy.cards.viewCase}</Text><ArrowUpRight size={17} /></HStack>
        </Stack>
      </Stack>
    </Link>
  );
}

export function ProjectFeature({ project, reverse = false, index = 0 }: { project: ProjectContent; reverse?: boolean; index?: number }) {
  const { copy, locale } = useContent();
  const evidence = project.outcomes.find((outcome) => /\d|dos empresas|two companies/i.test(outcome)) ?? project.outcomes[0];
  return (
    <Box className="project-feature" borderTopWidth="1px" borderColor="app.border" py={{ base: "9", md: "14" }}>
      <Grid templateColumns={{ base: "1fr", lg: reverse ? ".72fr 1.28fr" : "1.28fr .72fr" }} gap={{ base: "7", lg: "12" }} alignItems="stretch">
        <Box gridColumn={{ lg: reverse ? "2" : "1" }} gridRow={{ lg: "1" }}><ProjectVisual project={project} /></Box>
        <Stack gridColumn={{ lg: reverse ? "1" : "2" }} gridRow={{ lg: "1" }} justify="space-between" align="start" gap="8" py={{ lg: "2" }}>
          <Flex justify="space-between" w="full" color="app.muted" fontSize="sm"><Text>{String(index + 1).padStart(2, "0")}</Text><Text>{project.year}</Text></Flex>
          <Stack gap="5" align="start">
            <HStack gap="3" flexWrap="wrap">
              <Text color="app.accent" fontWeight="700">{project.category}</Text>
              <Text color="app.muted" fontSize="sm">· {projectAvailabilityLabel(project, locale)}</Text>
            </HStack>
            <Heading as="h3" fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }} letterSpacing="-.055em" lineHeight=".9">{project.title}</Heading>
            <Text color="app.muted" fontSize={{ base: "md", md: "lg" }} maxW="44ch">{project.excerpt}</Text>
            {evidence ? <HStack gap="3" align="start" borderLeftWidth="3px" borderColor="app.signal" pl="4"><Text fontWeight="700">{evidence}</Text></HStack> : null}
            <HStack gap="2" flexWrap="wrap">{project.stack.slice(0, 4).map((item) => <Text key={item} fontSize="sm" borderBottomWidth="1px" borderColor="app.border">{item}</Text>)}</HStack>
          </Stack>
          <Link to={`/proyectos/${project.slug}`} className="project-feature__link">
            <HStack minH="11" fontWeight="750" gap="2"><Text>{copy.cards.viewCase}</Text><ArrowUpRight size={17} /></HStack>
          </Link>
        </Stack>
      </Grid>
    </Box>
  );
}

export function ArticleCard({ article, index = 0 }: { article: ArticleContent; index?: number }) {
  const { locale, copy } = useContent();
  return (
    <Link to={`/articulos/${article.slug}`}>
      <Stack className="article-card" h="100%" borderTopWidth="1px" borderColor="app.text" pt="5" pb="3" gap="4" transition="transform .18s ease, border-color .18s ease" _hover={{ transform: "translateY(-4px)", borderColor: "app.accent" }}>
        <HStack justify="space-between" color="app.muted" fontSize="sm"><Text>0{index + 1} · {article.category}</Text><Text>{new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-PE", { year: "numeric", month: "short", day: "numeric", timeZone: "America/Lima" }).format(new Date(`${article.publishedAt}T12:00:00-05:00`))}</Text></HStack>
        <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} letterSpacing="-.025em" lineHeight="1.15">{article.title}</Heading>
        <Text color="app.muted">{article.excerpt}</Text>
        <HStack mt="auto" pt="5" minH="11" fontWeight="650" justify="space-between"><Text>{article.readingMinutes} {copy.articles.reading}</Text><Flex className="article-card__arrow" w="9" h="9" align="center" justify="center" bg="app.accent-subtle"><ArrowUpRight size={16} /></Flex></HStack>
      </Stack>
    </Link>
  );
}

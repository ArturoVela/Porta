import { Box, Button, Container, Flex, Heading, HStack, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ProjectArchiveCard, ProjectFeature } from "@/components/ContentCards";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent } from "@/content/context";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import { selectSpotlightProjects } from "@/lib/spotlight";

type DemoFilter = "all" | "public" | "other";

function searchable(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function ProjectsPage() {
  const { content, copy } = useContent();
  const [query, setQuery] = useState("");
  const [demoFilter, setDemoFilter] = useState<DemoFilter>("all");
  const demoFilters: { value: DemoFilter; label: string }[] = [
    { value: "all", label: copy.projects.filterAll },
    { value: "public", label: copy.projects.filterPublic },
    { value: "other", label: copy.projects.filterOther },
  ];
  const featured = selectSpotlightProjects(content.projects);
  const featuredIds = new Set(featured.map((project) => project.id));
  const archive = [...content.projects].filter((project) => !featuredIds.has(project.id)).sort((a, b) => a.order - b.order);
  const search = searchable(query.trim());
  const visible = archive.filter((project) => {
    const hasPublicDemo = projectAvailabilityLabel(project) === "Disponible en línea";
    if (demoFilter === "public" && !hasPublicDemo) return false;
    if (demoFilter === "other" && hasPublicDemo) return false;
    return !search || searchable([project.title, project.excerpt, project.category, ...project.stack].join(" ")).includes(search);
  });

  return (
    <>
      <Container maxW="7xl" py={{ base: "14", md: "24" }}><SectionHeading as="h1" title={copy.projects.title} description={copy.projects.description} /></Container>
      <Box bg="app.panel" borderYWidth="1px" borderColor="app.border"><Container maxW="7xl"><Heading as="h2" color="app.accent" fontSize="lg" fontWeight="750" pt="10">{copy.projects.featured}</Heading>{featured.map((project, index) => <ProjectFeature key={project.id} project={project} reverse={index % 2 === 1} index={index} />)}</Container></Box>
      {archive.length ? <Container maxW="7xl" py={{ base: "16", md: "24" }}>
        <Stack gap="3" mb="10"><Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.045em">{copy.projects.moreTitle}</Heading><Text color="app.muted" maxW="62ch">{copy.projects.moreDescription}</Text></Stack>
        <Flex gap="4" justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} mb="8">
          <Input minH="11" aria-label={copy.projects.searchAria} placeholder={copy.projects.searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} maxW={{ md: "22rem" }} borderRadius="0" borderColor="app.border" bg="app.panel" />
          <HStack gap="2" flexWrap="wrap" role="group" aria-label={copy.projects.filterAria}>
            {demoFilters.map((filter) => <Button key={filter.value} minH="11" px="4" size="sm" variant={demoFilter === filter.value ? "solid" : "outline"} bg={demoFilter === filter.value ? "brand.600" : "app.panel"} color={demoFilter === filter.value ? "white" : "app.text"} borderColor="app.border" borderRadius="0" aria-pressed={demoFilter === filter.value} onClick={() => setDemoFilter(filter.value)}>{filter.label}</Button>)}
          </HStack>
        </Flex>
        <Text color="app.muted" fontSize="sm" mb="6" role="status">{visible.length} {visible.length === 1 ? copy.projects.singular : copy.projects.plural}</Text>
        {visible.length ? <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: "8", lg: "10" }}>{visible.map((project) => <ProjectArchiveCard key={project.id} project={project} />)}</SimpleGrid> : <Box borderTopWidth="1px" borderColor="app.border" py="12"><Text fontWeight="700">{copy.projects.emptyTitle}</Text><Text color="app.muted" mt="2">{copy.projects.emptyDescription}</Text></Box>}
      </Container> : null}
    </>
  );
}

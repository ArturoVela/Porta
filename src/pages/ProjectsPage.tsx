import { Box, Button, Container, Flex, Heading, HStack, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MOTION_EASE_IN_OUT } from "@/components/PortfolioMotion";
import { ProjectArchiveCard, ProjectFeature } from "@/components/ContentCards";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent } from "@/content/context";
import { projectAvailabilityLabel } from "@/lib/projectAvailability";
import { selectSpotlightProjects } from "@/lib/spotlight";
import { projectCatalogGroups } from "@/lib/projectCatalog";

type DemoFilter = "all" | "public" | "other";

function searchable(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function ProjectsPage() {
  const { content, copy, locale } = useContent();
  const [query, setQuery] = useState("");
  const [demoFilter, setDemoFilter] = useState<DemoFilter>("all");
  const [collection, setCollection] = useState("all");
  const [filterInstant, setFilterInstant] = useState(false);
  const reduced = useReducedMotion();
  const demoFilters: { value: DemoFilter; label: string }[] = [
    { value: "all", label: copy.projects.filterAll },
    { value: "public", label: copy.projects.filterPublic },
    { value: "other", label: copy.projects.filterOther },
  ];
  const featured = selectSpotlightProjects(content.projects);
  const catalog = [...content.projects].sort((a, b) => a.order - b.order);
  const groups = projectCatalogGroups(catalog);
  const selectedGroups = groups.filter((group) => collection === "all" || group.id === collection);
  const eligible = new Set(selectedGroups.flatMap((group) => group.projects.map((project) => project.id)));
  const search = searchable(query.trim());
  const visible = catalog.filter((project) => {
    if (!eligible.has(project.id)) return false;
    const hasPublicDemo = projectAvailabilityLabel(project) === "Disponible en línea";
    if (demoFilter === "public" && !hasPublicDemo) return false;
    if (demoFilter === "other" && hasPublicDemo) return false;
    return !search || searchable([project.title, project.excerpt, project.category, project.liveUrl ?? "", ...project.stack, ...project.outcomes].join(" ")).includes(search);
  });
  const visibleIds = new Set(visible.map((project) => project.id));

  return (
    <>
      <Container maxW="7xl" py={{ base: "14", md: "24" }}><SectionHeading as="h1" title={copy.projects.title} description={copy.projects.description} /></Container>
      <Box bg="app.panel" borderYWidth="1px" borderColor="app.border"><Container maxW="7xl"><Heading as="h2" color="app.accent" fontSize="lg" fontWeight="750" pt="10">{copy.projects.featured}</Heading>{featured.map((project, index) => <ProjectFeature key={project.id} project={project} reverse={index % 2 === 1} index={index} />)}</Container></Box>
      {catalog.length ? <Container maxW="7xl" py={{ base: "16", md: "24" }}>
        <Stack gap="3" mb="10"><Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.045em">{copy.projects.moreTitle}</Heading><Text color="app.muted" maxW="62ch">{copy.projects.moreDescription}</Text></Stack>
        <Stack gap="4" mb="8">
          <Flex gap="4" direction={{ base: "column", md: "row" }}>
            <Input minH="11" minW="0" flex="1" aria-label={copy.projects.searchAria} placeholder={copy.projects.searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} borderRadius="0" bg="app.panel" />
            <Box w={{ base: "full", md: "14rem" }} minW="0"><select className="project-collection-select" aria-label={copy.projects.collection} value={collection} onChange={(event) => setCollection(event.target.value)}>
              <option value="all">{copy.projects.allCollections}</option>
              {groups.filter((group) => group.projects.length).map((group) => <option key={group.id} value={group.id}>{locale === "en" ? group.nameEn : group.name}</option>)}
            </select></Box>
          </Flex>
          <HStack gap="2" flexWrap="wrap" role="group" aria-label={copy.projects.filterAria}>
            {demoFilters.map((filter) => <Button key={filter.value} position="relative" minH="11" px="4" size="sm" variant={demoFilter === filter.value ? "solid" : "outline"} bg={demoFilter === filter.value ? "brand.600" : "app.panel"} color={demoFilter === filter.value ? "white" : "app.text"} borderColor="app.border" borderRadius="0" aria-pressed={demoFilter === filter.value} onClick={(event) => { setFilterInstant(event.detail === 0); setDemoFilter(filter.value); }}>{filter.label}
              {demoFilter === filter.value && <motion.span className="project-filter-marker" aria-hidden="true" layoutId="project-filter"
                transition={{ duration: reduced || filterInstant ? 0 : 0.2, ease: MOTION_EASE_IN_OUT }} />}
            </Button>)}
          </HStack>
        </Stack>
        <Text color="app.muted" fontSize="sm" mb="6" role="status">{visible.length} {visible.length === 1 ? copy.projects.singular : copy.projects.plural}</Text>
        {visible.length ? <Stack gap="16">{selectedGroups.map((group) => {
          const items = group.projects.filter((project) => visibleIds.has(project.id));
          return items.length ? <Box as="section" key={group.id} id={`collection-${group.id}`} scrollMarginTop="7rem">
            <Flex justify="space-between" align="baseline" gap="4" mb="6" borderTopWidth="1px" borderColor="app.border" pt="6"><Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>{locale === "en" ? group.nameEn : group.name}</Heading><Text color="app.muted" fontSize="sm">{items.length}</Text></Flex>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: "8", lg: "10" }}>{items.map((project) => <ProjectArchiveCard key={project.id} project={project} collection={group.id} />)}</SimpleGrid>
          </Box> : null;
        })}</Stack> : <Box borderTopWidth="1px" borderColor="app.border" py="12"><Text fontWeight="700">{copy.projects.emptyTitle}</Text><Text color="app.muted" mt="2">{copy.projects.emptyDescription}</Text></Box>}
      </Container> : null}
    </>
  );
}

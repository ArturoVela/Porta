import { Box, Button, Flex, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ContentLink as Link } from "@/components/ContentLink";
import type { ProjectContent } from "@/types/content";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const projectPalettes = [
  { background: "#081538", foreground: "#F4F7FF", signal: "#79A0FF" },
  { background: "#FF5A36", foreground: "#140A07", signal: "#FFD8CE" },
  { background: "#131722", foreground: "#F8FAFF", signal: "#8FF0BD" },
  { background: "#DCD2FF", foreground: "#17102E", signal: "#7250E8" },
];

export function HeroStage({ projects }: { projects: ProjectContent[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(activeIndex, Math.max(projects.length - 1, 0));
  const project = projects[safeIndex];
  if (!project) return null;

  const palette = projectPalettes[safeIndex % projectPalettes.length];
  const projectNumber = String(safeIndex + 1).padStart(2, "0");

  return (
    <Box className="hero-stage" borderWidth="1px" borderColor="app.border" bg="app.panel">
      <Flex
        className="hero-stage__poster"
        bg={palette.background}
        color={project.cover ? "white" : palette.foreground}
        minH={{ base: "25rem", md: "31rem" }}
        direction="column"
        justify="space-between"
        p={{ base: "6", md: "8" }}
        position="relative"
        overflow="hidden"
      >
        {project.cover ? <>
          <Box position="absolute" inset="0"><ResponsiveImage image={project.cover} loading="eager" /></Box>
          <Box position="absolute" inset="0" bg="linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.12) 30%, rgba(0,0,0,.82))" aria-hidden="true" />
        </> : <>
          <Box className="hero-stage__orb" style={{ borderColor: palette.signal }} aria-hidden="true" />
          <Box className="hero-stage__axis" style={{ background: palette.signal }} aria-hidden="true" />
        </>}
        <Flex justify="space-between" align="start" position="relative" zIndex="1">
          <Stack gap="1">
            <Text fontWeight="700">Proyecto seleccionado</Text>
            <Text opacity=".68" fontSize="sm">{project.category}</Text>
          </Stack>
          <Text fontSize={{ base: "4xl", md: "6xl" }} fontWeight="800" letterSpacing="-.07em" lineHeight="1">
            {projectNumber}
          </Text>
        </Flex>

        <Stack gap="5" align="start" position="relative" zIndex="1">
          <HStack gap="2" flexWrap="wrap">
            {project.stack.slice(0, 3).map((item) => (
              <Text key={item} borderWidth="1px" borderColor="currentColor" px="3" py="1" fontSize="xs" fontWeight="650">
                {item}
              </Text>
            ))}
          </HStack>
          <Heading as="h2" fontSize={{ base: "5xl", md: "7xl" }} letterSpacing="-.065em" lineHeight=".88" maxW="8ch">
            {project.title}
          </Heading>
          <Button asChild bg={palette.foreground} color={palette.background} borderRadius="0" px="5" _hover={{ transform: "translate(3px, -3px)" }} transition="transform .18s ease">
            <Link to={`/proyectos/${project.slug}`}>Abrir caso <ArrowUpRight size={17} /></Link>
          </Button>
        </Stack>
      </Flex>

      <Grid templateColumns={{ base: "1fr 1fr", md: `repeat(${projects.length}, 1fr)` }}>
        {projects.map((item, index) => {
          const active = index === safeIndex;
          return (
            <Button
              key={item.id}
              aria-pressed={active}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              variant="plain"
              h="auto"
              minH="5.5rem"
              borderRadius="0"
              borderTopWidth="1px"
              borderRightWidth={{ base: index % 2 === 0 ? "1px" : "0", md: index < projects.length - 1 ? "1px" : "0" }}
              borderColor="app.border"
              justifyContent="flex-start"
              px="4"
              py="3"
              bg={active ? "app.text" : "app.panel"}
              color={active ? "app.canvas" : "app.text"}
              _hover={{ bg: active ? "app.text" : "app.accent-subtle" }}
            >
              <Stack gap="1" align="start" textAlign="left">
                <Text fontSize="xs" opacity=".62">{String(index + 1).padStart(2, "0")}</Text>
                <Text fontWeight="700" lineClamp="1">{item.title}</Text>
              </Stack>
            </Button>
          );
        })}
      </Grid>
    </Box>
  );
}

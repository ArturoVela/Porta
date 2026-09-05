import { Box, Button, Container, Flex, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowDown, ArrowUpRight, Check, CodeXml, Component, DatabaseZap, Gauge } from "lucide-react";
import { ContentLink as Link } from "@/components/ContentLink";
import { ArticleCard, ProjectFeature } from "@/components/ContentCards";
import { HeroStage } from "@/components/HeroStage";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent } from "@/content/context";

const process = [
  ["Entender", "El problema, las personas y las restricciones antes de elegir tecnología."],
  ["Dar forma", "Un flujo principal claro, prototipos rápidos y decisiones visibles."],
  ["Construir", "Interfaz, datos y servicios desarrollados como un solo producto."],
  ["Verificar", "Accesibilidad, rendimiento y despliegue comprobados con evidencia."],
] as const;

const disciplines = [
  [CodeXml, "Frontend", "React, TypeScript y experiencias responsive"],
  [Component, "Sistemas de UI", "Chakra UI, tokens y accesibilidad"],
  [DatabaseZap, "Datos y automatización", "D1, modelado e integraciones"],
  [Gauge, "Entrega en edge", "Workers, observabilidad y rendimiento"],
] as const;

export function HomePage() {
  const { content } = useContent();
  const featured = content.projects.filter((project) => project.featured).sort((a, b) => a.order - b.order).slice(0, 4);
  const articles = [...content.articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);
  const stack = Array.from(new Set(featured.flatMap((project) => project.stack))).slice(0, 12);

  return (
    <>
      <Box as="section" position="relative" overflow="hidden">
        <Box className="hero-grid" aria-hidden="true" />
        <Container maxW="7xl" py={{ base: "12", md: "20", lg: "24" }} position="relative">
          <Grid templateColumns={{ base: "1fr", lg: "1.02fr .98fr" }} gap={{ base: "12", lg: "12" }} alignItems="center">
            <Stack gap={{ base: "7", md: "9" }} align="start">
              <HStack gap="3" fontWeight="650">
                <Box className="availability-pulse" w="2.5" h="2.5" borderRadius="full" bg="app.signal" />
                <Text>{content.site.availability}</Text>
              </HStack>
              <Heading
                as="h1"
                fontSize="clamp(3.5rem, 4.7vw, 5rem)"
                letterSpacing="-.055em"
                lineHeight=".9"
                maxW="14ch"
              >
                {content.site.headline}
              </Heading>
              <Grid templateColumns={{ base: "1fr", sm: "1fr auto" }} gap="6" alignItems="end" w="full" maxW="44rem">
                <Text color="app.muted" fontSize={{ base: "lg", md: "xl" }} maxW="43ch">{content.site.intro}</Text>
                <Box className="hero-signature" aria-label={`${content.site.name}, ${content.site.location}`}>
                  <Text fontSize="sm" fontWeight="750">{content.site.name}</Text>
                  <Text fontSize="xs" color="app.muted">{content.site.location}</Text>
                </Box>
              </Grid>
              <Flex gap="3" wrap="wrap">
                <Button asChild size="lg" bg="brand.600" color="white" borderRadius="0" px="7" _hover={{ bg: "brand.700", transform: "translateY(-2px)" }}>
                  <Link to="/proyectos">Explorar mi trabajo <ArrowUpRight size={18} /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" borderColor="app.text" borderRadius="0" px="7" _hover={{ bg: "app.text", color: "app.canvas" }}>
                  <Link to="/perfil">Conocer mi enfoque</Link>
                </Button>
              </Flex>
            </Stack>
            <HeroStage projects={featured} />
          </Grid>
          <HStack mt={{ base: "12", md: "16" }} color="app.muted" gap="2"><ArrowDown size={16} /><Text fontSize="sm">Explora proyectos, proceso y notas de trabajo</Text></HStack>
        </Container>
      </Box>

      <Box borderYWidth="1px" borderColor="app.border" bg="app.panel">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr 1fr", lg: "repeat(4, 1fr)" }}>
            {[
              ["Base", "Ingeniería de sistemas"],
              ["Trabajo", "Producto de punta a punta"],
              ["Especialidad", "Web, datos y edge"],
              ["Ubicación", `${content.site.location} · remoto`],
            ].map(([label, value], index) => (
              <Stack key={label} gap="1" py={{ base: "6", md: "7" }} px={{ base: index % 2 ? "5" : "0", lg: index ? "7" : "0" }} borderLeftWidth={{ base: index % 2 ? "1px" : "0", lg: index ? "1px" : "0" }} borderColor="app.border">
                <Text color="app.muted" fontSize="sm">{label}</Text>
                <Text fontWeight="750">{value}</Text>
              </Stack>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box as="section" bg="app.panel" py={{ base: "16", md: "24" }} id="trabajo">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: ".55fr 1.45fr" }} gap={{ base: "6", lg: "16" }} alignItems="end" mb={{ base: "8", md: "14" }}>
            <Text color="app.accent" fontWeight="750">Trabajo seleccionado</Text>
            <SectionHeading title="Casos que conectan producto, interfaz y tecnología." description="Cada proyecto parte de una necesidad distinta. La constante es reducir fricción y construir una solución proporcionada al contexto." />
          </Grid>
          <Box>{featured.map((project, index) => <ProjectFeature key={project.id} project={project} reverse={index % 2 === 1} index={index} />)}</Box>
          <Button asChild mt="8" variant="outline" borderColor="app.text" borderRadius="0"><Link to="/proyectos">Ver archivo completo <ArrowUpRight size={17} /></Link></Button>
        </Container>
      </Box>

      <Box as="section" bg="brand.600" color="white" py={{ base: "16", md: "24" }} id="enfoque">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: ".85fr 1.15fr" }} gap={{ base: "12", lg: "20" }}>
            <Stack gap="7" align="start" position={{ lg: "sticky" }} top={{ lg: "8rem" }} alignSelf="start">
              <Text fontWeight="750" color="brand.100">Cómo construyo</Text>
              <Heading as="h2" fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }} letterSpacing="-.065em" lineHeight=".9" maxW="9ch">Menos ruido. Más producto.</Heading>
              <Text color="brand.100" fontSize="lg" maxW="40ch">Un proceso breve y legible para pasar de una necesidad real a algo que funciona y se puede mantener.</Text>
            </Stack>
            <Stack gap="0">
              {process.map(([title, description], index) => (
                <Grid key={title} templateColumns={{ base: "4rem 1fr", md: "7rem 1fr" }} gap="5" py={{ base: "7", md: "9" }} borderTopWidth="1px" borderColor="whiteAlpha.400">
                  <Text color="brand.100" fontSize={{ base: "xl", md: "2xl" }}>0{index + 1}</Text>
                  <Stack gap="3"><Heading as="h3" fontSize={{ base: "2xl", md: "4xl" }} letterSpacing="-.035em">{title}</Heading><Text color="brand.100" fontSize={{ md: "lg" }} maxW="48ch">{description}</Text></Stack>
                </Grid>
              ))}
            </Stack>
          </Grid>
        </Container>
      </Box>

      <Box as="section" py={{ base: "16", md: "24" }} id="capacidades">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: ".8fr 1.2fr" }} gap={{ base: "12", lg: "20" }}>
            <Stack gap="8">
              <SectionHeading title="Una práctica híbrida." description="No separo la experiencia de la implementación: diseño y desarrollo avanzan juntos desde el primer flujo." />
              <Stack gap="0">
                {disciplines.map(([Icon, title, description]) => (
                  <Grid key={title} templateColumns="2.75rem 1fr" gap="4" py="5" borderTopWidth="1px" borderColor="app.border">
                    <Icon size={21} />
                    <Box><Text fontWeight="750">{title}</Text><Text color="app.muted" mt="1">{description}</Text></Box>
                  </Grid>
                ))}
              </Stack>
            </Stack>
            <Box className="stack-board" bg="app.text" color="app.canvas" p={{ base: "7", md: "10" }}>
              <Flex justify="space-between" align="start" gap="6" mb={{ base: "12", md: "20" }}>
                <Stack gap="2"><Text fontWeight="750">Stack actual</Text><Text opacity=".68" maxW="36ch">Herramientas elegidas por el problema, no por la tendencia.</Text></Stack>
                <Text fontSize="sm" opacity=".58">{String(stack.length).padStart(2, "0")}</Text>
              </Flex>
              <Flex wrap="wrap" gap={{ base: "2", md: "3" }}>
                {stack.map((item, index) => <Text key={item} className="stack-chip" fontSize={{ base: "xl", md: "3xl" }} fontWeight="700" letterSpacing="-.035em" borderWidth="1px" borderColor="currentColor" px={{ base: "3", md: "4" }} py="2" opacity={index > 7 ? ".58" : "1"}>{item}</Text>)}
              </Flex>
            </Box>
          </Grid>

          <Grid templateColumns={{ base: "1fr", lg: ".55fr 1.45fr" }} gap={{ base: "8", lg: "16" }} mt={{ base: "16", md: "24" }}>
            <Stack gap="3"><Text color="app.accent" fontWeight="750">Formas de colaborar</Text><Text color="app.muted" maxW="34ch">Alcance claro y una solución que tu equipo pueda sostener.</Text></Stack>
            <Stack gap="0">
              {content.services.map((service, index) => (
                <Grid key={service.id} templateColumns={{ base: "3rem 1fr", md: "3rem .7fr 1.3fr" }} gap={{ base: "4", md: "6" }} py="7" borderTopWidth="1px" borderColor="app.border">
                  <Text color="app.muted">0{index + 1}</Text>
                  <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-.03em">{service.title}</Heading>
                  <Stack gap="4" gridColumn={{ base: "2", md: "auto" }}><Text color="app.muted">{service.description}</Text><Flex wrap="wrap" gap="2">{service.capabilities.map((item) => <HStack key={item} gap="2" fontSize="sm"><Check size={14} color="var(--chakra-colors-app-accent)" /><Text>{item}</Text></HStack>)}</Flex></Stack>
                </Grid>
              ))}
            </Stack>
          </Grid>
        </Container>
      </Box>

      <Box as="section" borderYWidth="1px" borderColor="app.border" bg="app.panel" py={{ base: "16", md: "24" }}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: ".55fr 1.45fr" }} gap={{ base: "8", lg: "16" }} mb="10">
            <Text color="app.accent" fontWeight="750">Notas de trabajo</Text>
            <Flex justify="space-between" align="end" gap="6"><SectionHeading title="Pensar también es parte de construir." description="Investigación, decisiones técnicas y aprendizajes que vale la pena conservar." /><Button asChild display={{ base: "none", md: "inline-flex" }} variant="plain" flexShrink="0"><Link to="/articulos">Todos <ArrowUpRight size={17} /></Link></Button></Flex>
          </Grid>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "8", md: "7" }}>{articles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</SimpleGrid>
        </Container>
      </Box>

      <Box as="section" bg="app.signal" color="#160B08">
        <Container maxW="7xl" py={{ base: "14", md: "20" }}>
          <Grid templateColumns={{ base: "1fr", md: "1.4fr .6fr" }} gap="10" alignItems="end">
            <Stack gap="4"><Text fontWeight="750">Disponible para el próximo reto</Text><Heading as="h2" fontSize={{ base: "4xl", md: "7xl", lg: "8xl" }} letterSpacing="-.07em" lineHeight=".86" maxW="12ch">¿Qué debería sentirse más simple?</Heading></Stack>
            <Stack gap="6" align={{ base: "start", md: "end" }}><Text maxW="34ch" textAlign={{ md: "right" }}>{content.site.availability}</Text><Button asChild size="lg" bg="#160B08" color="white" borderRadius="0" px="7" _hover={{ transform: "translate(3px, -3px)" }}><Link to="/contacto">Cuéntame el contexto <ArrowUpRight size={18} /></Link></Button></Stack>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

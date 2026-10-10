import { Box, Button, Container, Flex, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowUpRight, Check } from "lucide-react";
import { ContentLink as Link } from "@/components/ContentLink";
import { ProjectFeature } from "@/components/ContentCards";
import { HomeProductCarousel } from "@/components/HomeProductCarousel";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent } from "@/content/context";
import { selectHomeProducts, selectSpotlightProjects } from "@/lib/spotlight";

export function HomePage() {
  const { content, copy, locale } = useContent();
  const featured = selectSpotlightProjects(content.projects);
  const products = selectHomeProducts(content.projects, locale);

  return (
    <>
      <Box as="section" className="home-hero" position="relative" overflow="hidden">
        <Box className="hero-grid" aria-hidden="true" />
        <Container maxW="7xl" py={{ base: "10", md: "14", lg: "18" }} position="relative">
          <Grid templateColumns={{ base: "1fr", lg: products.length ? "1.1fr 1fr" : "1fr" }} gap={{ base: "9", lg: "14" }} alignItems="center">
            <Stack gap={{ base: "6", md: "7" }} align="start" maxW={products.length ? undefined : "52rem"}>
              <Heading as="h1" fontSize={{ base: "clamp(2.75rem, 10vw, 4rem)", lg: "clamp(3.5rem, 4.6vw, 4.75rem)" }} letterSpacing="-.04em" lineHeight="1.02" textWrap="balance">{content.site.headline}</Heading>
              <Text color="app.muted" fontSize={{ base: "md", md: "lg" }} maxW="52ch">{content.site.intro}</Text>
              <Flex gap="3" wrap="wrap">
                <Button asChild minH="11" size="lg" bg="app.signal" color="#160B08" borderRadius="0" px="7" _hover={{ bg: "app.text", color: "app.canvas" }}>
                  <Link to="/contacto">{copy.home.heroContact} <ArrowUpRight size={18} aria-hidden="true" /></Link>
                </Button>
                <Button asChild minH="11" size="lg" variant="outline" borderColor="app.border" borderRadius="0" px="7" _hover={{ bg: "app.surface" }}>
                  <Link to="/proyectos">{copy.home.heroCases}</Link>
                </Button>
              </Flex>
              <HStack gap="3" align="start"><Box mt="2" w="2" h="2" borderRadius="full" bg="app.signal" flexShrink="0" /><Text color="app.muted" fontSize="sm" maxW="48ch">{content.site.availability}</Text></HStack>
            </Stack>
            {products.length > 0 && <HomeProductCarousel products={products} />}
          </Grid>
        </Container>
      </Box>

      <Box as="section" bg="app.panel" borderYWidth="1px" borderColor="app.border" py={{ base: "14", md: "22" }} id="trabajo">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: ".55fr 1.45fr" }} gap={{ base: "5", lg: "16" }} alignItems="end" mb={{ base: "8", md: "12" }}>
            <Text color="app.accent" fontWeight="750">{copy.home.projectsLabel}</Text>
            <SectionHeading title={copy.home.projectsTitle} description={copy.home.projectsDescription} />
          </Grid>
          <Box>{featured.map((project, index) => <ProjectFeature key={project.id} project={project} reverse={index % 2 === 1} index={index} />)}</Box>
          <Button asChild minH="11" mt="7" variant="outline" borderColor="app.text" borderRadius="0" px="6"><Link to="/proyectos">{copy.home.allProjects} <ArrowUpRight size={17} /></Link></Button>
        </Container>
      </Box>

      <Box as="section" bg="brand.600" color="white" py={{ base: "14", md: "20" }} id="enfoque">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: ".7fr 1.3fr" }} gap={{ base: "7", lg: "16" }} mb={{ base: "9", md: "12" }} alignItems="end">
            <Text fontWeight="750" color="brand.100">{copy.home.processLabel}</Text>
            <Stack gap="4"><Heading as="h2" fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-.055em" lineHeight=".94">{copy.home.processTitle}</Heading><Text color="brand.100" fontSize={{ md: "lg" }} maxW="54ch">{copy.home.processDescription}</Text></Stack>
          </Grid>
          <SimpleGrid columns={{ base: 1, md: 3 }} borderTopWidth="1px" borderLeftWidth="1px" borderColor="whiteAlpha.400">
            {copy.home.processSteps.map((step, index) => (
              <Stack key={step.title} minH={{ md: "15rem" }} justify="space-between" gap="8" p={{ base: "6", md: "7" }} borderRightWidth="1px" borderBottomWidth="1px" borderColor="whiteAlpha.400">
                <Text color="brand.100" fontSize="lg">0{index + 1}</Text>
                <Stack gap="2"><Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-.035em">{step.title}</Heading><Text color="brand.100">{step.description}</Text></Stack>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" py={{ base: "14", md: "22" }} id="servicios">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: ".55fr 1.45fr" }} gap={{ base: "5", lg: "16" }} mb={{ base: "8", md: "12" }} alignItems="end">
            <Text color="app.accent" fontWeight="750">{copy.home.servicesLabel}</Text>
            <SectionHeading title={copy.home.servicesTitle} description={copy.home.servicesDescription} />
          </Grid>
          <Stack gap="0">
            {content.services.map((service, index) => (
              <Grid key={service.id} templateColumns={{ base: "3rem 1fr", md: "3rem .7fr 1.3fr" }} gap={{ base: "4", md: "6" }} py={{ base: "6", md: "7" }} borderTopWidth="1px" borderColor="app.border">
                <Text color="app.muted">0{index + 1}</Text>
                <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-.03em">{service.title}</Heading>
                <Stack gap="4" gridColumn={{ base: "2", md: "auto" }}><Text color="app.muted">{service.description}</Text><Flex wrap="wrap" gap="3">{service.capabilities.map((item) => <HStack key={item} gap="2" fontSize="sm"><Check size={14} color="var(--chakra-colors-app-accent)" /><Text>{item}</Text></HStack>)}</Flex></Stack>
              </Grid>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box as="section" bg="app.signal" color="#160B08">
        <Container maxW="7xl" py={{ base: "12", md: "18" }}>
          <Grid templateColumns={{ base: "1fr", md: "1.4fr .6fr" }} gap="10" alignItems="end">
            <Stack gap="4"><Text fontWeight="750">{copy.home.ctaLabel}</Text><Heading as="h2" fontSize={{ base: "4xl", md: "7xl", lg: "8xl" }} letterSpacing="-.07em" lineHeight=".86" maxW="12ch">{copy.home.ctaTitle}</Heading></Stack>
            <Stack gap="6" align={{ base: "start", md: "end" }}><Text maxW="36ch" textAlign={{ md: "right" }}>{copy.home.ctaDescription}</Text><Button asChild minH="11" size="lg" bg="#160B08" color="white" borderRadius="0" px="7"><Link to="/contacto">{copy.home.ctaButton} <ArrowUpRight size={18} /></Link></Button></Stack>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

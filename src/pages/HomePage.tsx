import { Box, Button, Container, Flex, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ContentLink as Link } from "@/components/ContentLink";
import { ProjectFeature } from "@/components/ContentCards";
import { HomeProductCarousel } from "@/components/HomeProductCarousel";
import { HomeSignals } from "@/components/HomeSignals";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/PortfolioMotion";
import { useContent } from "@/content/context";
import { selectHomeProducts, selectSpotlightProjects } from "@/lib/spotlight";
import "@/pages/home.css";

export function HomePage() {
  const { content, copy, locale } = useContent();
  const featured = selectSpotlightProjects(content.projects);
  const products = selectHomeProducts(content.projects, locale);
  const processRef = useRef<HTMLDivElement>(null);
  const processInView = useInView(processRef, { amount: 0.15 });

  return (
    <>
      <Box as="section" className="home-hero">
        <Container maxW="7xl" px={{ base: "5", md: "8" }}>
          <Flex className="home-hero__topline" justify="space-between" gap="4" wrap="wrap">
            <Text>{content.site.name} <span aria-hidden="true">/</span> {copy.common.brandSubtitle}</Text>
            <Text>{content.site.location}</Text>
          </Flex>
          <Grid className="home-hero__layout" templateColumns={{ base: "1fr", lg: products.length ? "1fr 1fr" : "1fr" }} gap={{ base: "7", lg: "10" }} columnGap={{ lg: "20" }} alignItems="start">
            <Heading className="home-hero__title" as="h1" gridColumn={{ lg: "1 / -1" }} fontSize={{ base: "clamp(2.75rem, 10vw, 4.75rem)", lg: "clamp(4rem, 6.4vw, 6.25rem)" }} letterSpacing="-.065em" lineHeight=".98" textWrap="balance">{content.site.headline}</Heading>
            <Stack className="home-hero__copy" gap={{ base: "6", md: "7" }} align="start" maxW={products.length ? undefined : "60rem"}>
              <Text color="app.muted" fontSize={{ base: "md", md: "lg" }} maxW="47ch">{content.site.intro}</Text>
              <Flex className="home-hero__actions" gap="3" wrap="wrap">
                <Button asChild minH="12" size="lg" bg="app.text" color="app.canvas" borderRadius="0" px="7" _hover={{ bg: "app.accent", color: "app.panel" }}>
                  <Link to="/contacto">{copy.home.heroContact} <ArrowUpRight size={18} aria-hidden="true" /></Link>
                </Button>
                <Button asChild minH="12" size="lg" variant="outline" borderColor="app.control-border" borderRadius="0" px="7" _hover={{ bg: "app.surface" }}>
                  <Link to="/proyectos">{copy.home.heroCases}</Link>
                </Button>
              </Flex>
              <Stack className="home-hero__status" gap="1" w="full">
                <HStack gap="3" align="start"><Box mt="2" w="2" h="2" borderRadius="full" bg="app.accent" flexShrink="0" /><Text color="app.muted" fontSize="sm" maxW="48ch">{content.site.availability}</Text></HStack>
                <HomeSignals />
              </Stack>
            </Stack>
            {products.length > 0 && <ScrollReveal delay={0.06} className="home-showcase">
              <Flex className="home-showcase__heading" justify="space-between" gap="4" align="center">
                <Text>{copy.home.carousel}</Text>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Flex>
              <HomeProductCarousel products={products} />
            </ScrollReveal>}
          </Grid>
        </Container>
      </Box>

      <Box as="section" className="home-work" bg="app.panel" borderYWidth="1px" borderColor="app.border" py={{ base: "16", md: "24" }} id="trabajo">
        <Container maxW="7xl" px={{ base: "5", md: "8" }}>
          <Grid className="home-section-heading" templateColumns={{ base: "1fr", lg: ".55fr 1.45fr" }} gap={{ base: "5", lg: "16" }} alignItems="end" mb={{ base: "8", md: "12" }}>
            <Text color="app.accent" fontWeight="700">{copy.home.projectsLabel}</Text>
            <SectionHeading title={copy.home.projectsTitle} description={copy.home.projectsDescription} />
          </Grid>
          <Box>{featured.map((project, index) => <ProjectFeature key={project.id} project={project} reverse={index % 2 === 1} index={index} />)}</Box>
          <Button asChild minH="12" mt="7" variant="outline" borderColor="app.text" borderRadius="0" px="6"><Link to="/proyectos">{copy.home.allProjects} <ArrowUpRight size={17} aria-hidden="true" /></Link></Button>
        </Container>
      </Box>

      <Box as="section" ref={processRef} className="home-process" data-scan-visible={processInView} bg="brand.900" color="white" py={{ base: "16", md: "24" }} id="enfoque">
        <Box className="process-scan" aria-hidden="true" />
        <Container maxW="7xl" px={{ base: "5", md: "8" }} position="relative" zIndex="1">
          <Grid className="home-section-heading" templateColumns={{ base: "1fr", lg: ".55fr 1.45fr" }} gap={{ base: "5", lg: "16" }} mb={{ base: "10", md: "16" }} alignItems="end">
            <Text fontWeight="700" color="brand.200">{copy.home.processLabel}</Text>
            <Stack asChild gap="4"><ScrollReveal><Heading as="h2" fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-.055em" lineHeight=".98">{copy.home.processTitle}</Heading><Text color="brand.100" fontSize={{ md: "lg" }} maxW="54ch">{copy.home.processDescription}</Text></ScrollReveal></Stack>
          </Grid>
          <SimpleGrid className="home-process__steps" columns={{ base: 1, md: 3 }} gap={{ base: "0", md: "8" }}>
            {copy.home.processSteps.map((step, index) => (
              <Stack asChild key={step.title} minH={{ md: "14rem" }} justify="space-between" gap="8" py="6" borderTopWidth="1px" borderColor="whiteAlpha.400"><ScrollReveal delay={index * 0.05}>
                <Text color="brand.200" fontSize="sm">0{index + 1}</Text>
                <Stack gap="2"><Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-.035em">{step.title}</Heading><Text color="brand.100">{step.description}</Text></Stack>
              </ScrollReveal></Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" className="home-services" py={{ base: "16", md: "24" }} id="servicios">
        <Container maxW="7xl" px={{ base: "5", md: "8" }}>
          <Grid className="home-section-heading" templateColumns={{ base: "1fr", lg: ".55fr 1.45fr" }} gap={{ base: "5", lg: "16" }} mb={{ base: "8", md: "12" }} alignItems="end">
            <Text color="app.accent" fontWeight="700">{copy.home.servicesLabel}</Text>
            <SectionHeading title={copy.home.servicesTitle} description={copy.home.servicesDescription} />
          </Grid>
          <Stack gap="0">
            {content.services.map((service, index) => (
              <Grid asChild key={service.id} templateColumns={{ base: "3rem 1fr", md: "3rem .7fr 1.3fr" }} gap={{ base: "4", md: "6" }} py={{ base: "6", md: "8" }} borderTopWidth="1px" borderColor="app.border"><ScrollReveal>
                <Text color="app.muted">0{index + 1}</Text>
                <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-.03em">{service.title}</Heading>
                <Stack gap="4" gridColumn={{ base: "2", md: "auto" }}><Text color="app.muted">{service.description}</Text><Flex wrap="wrap" gap="3">{service.capabilities.map((item) => <HStack key={item} gap="2" fontSize="sm"><Check size={14} color="var(--chakra-colors-app-accent)" /><Text>{item}</Text></HStack>)}</Flex></Stack>
              </ScrollReveal></Grid>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box as="section" className="home-contact" bg="app.signal" color="#18221B">
        <Container maxW="7xl" px={{ base: "5", md: "8" }} py={{ base: "16", md: "24" }}>
          <Grid asChild templateColumns={{ base: "1fr", md: "1.35fr .65fr" }} gap="10" alignItems="end"><ScrollReveal>
            <Stack gap="6"><Text fontWeight="700">{copy.home.ctaLabel}</Text><Heading as="h2" fontSize={{ base: "4xl", md: "7xl", lg: "8xl" }} letterSpacing="-.065em" lineHeight=".9" maxW="13ch">{copy.home.ctaTitle}</Heading></Stack>
            <Stack gap="6" align={{ base: "start", md: "end" }}><Text maxW="36ch" textAlign={{ md: "right" }}>{copy.home.ctaDescription}</Text><Button asChild minH="12" size="lg" bg="#18221B" color="white" borderRadius="0" px="7"><Link to="/contacto">{copy.home.ctaButton} <ArrowUpRight size={18} aria-hidden="true" /></Link></Button></Stack>
          </ScrollReveal></Grid>
        </Container>
      </Box>
    </>
  );
}

import { Box, Button, Container, Flex, Grid, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router";
import { ArticleCard, ProjectFeature } from "@/components/ContentCards";
import { SectionHeading } from "@/components/SectionHeading";
import { SystemMap } from "@/components/SystemMap";
import { useContent } from "@/content/context";

export function HomePage() {
  const { content } = useContent();
  const featured = content.projects.filter((project) => project.featured).sort((a, b) => a.order - b.order).slice(0, 4);
  const articles = [...content.articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);

  return (
    <>
      <Container maxW="7xl" py={{ base: "14", md: "24", lg: "28" }}>
        <Grid templateColumns={{ base: "1fr", lg: "1.08fr .92fr" }} gap={{ base: "12", lg: "16" }} alignItems="center">
          <Stack gap="8" align="start">
            <HStack gap="3" color="app.muted"><Box w="2.5" h="2.5" borderRadius="full" bg="brand.500" /><Text fontWeight="600">{content.site.location} · Producto e ingeniería web</Text></HStack>
            <Heading as="h1" fontSize={{ base: "4xl", sm: "5xl", md: "7xl", xl: "7.5rem" }} letterSpacing="-.065em" lineHeight=".89" maxW="10ch">{content.site.headline}</Heading>
            <Text color="app.muted" fontSize={{ base: "lg", md: "xl" }} maxW="57ch">{content.site.intro}</Text>
            <Flex gap="3" wrap="wrap">
              <Button asChild size="lg" bg="app.text" color="app.canvas" borderRadius="full" px="7" _hover={{ opacity: .86 }}><Link to="/proyectos">Explorar proyectos <ArrowUpRight size={18} /></Link></Button>
              <Button asChild size="lg" variant="outline" borderColor="app.border" borderRadius="full" px="7"><Link to="/contacto">Iniciar una conversación</Link></Button>
            </Flex>
            <HStack color="app.muted" gap="2" pt="4"><ArrowDown size={17} /><Text fontSize="sm">Casos seleccionados</Text></HStack>
          </Stack>
          <SystemMap />
        </Grid>
      </Container>

      <Box bg="app.panel" borderYWidth="1px" borderColor="app.border" py={{ base: "16", md: "24" }}>
        <Container maxW="7xl">
          <SectionHeading title="Trabajo reciente" description="Casos donde producto, interfaz y tecnología se resolvieron como un mismo sistema." />
          <Box mt={{ base: "8", md: "14" }}>{featured.map((project, index) => <ProjectFeature key={project.id} project={project} reverse={index % 2 === 1} />)}</Box>
          <Button asChild mt="6" variant="outline" borderColor="app.border" borderRadius="full"><Link to="/proyectos">Ver archivo completo <ArrowUpRight size={17} /></Link></Button>
        </Container>
      </Box>

      <Container maxW="7xl" py={{ base: "16", md: "24" }} id="servicios">
        <Grid templateColumns={{ base: "1fr", lg: ".72fr 1.28fr" }} gap={{ base: "10", lg: "20" }}>
          <SectionHeading title="Tres formas de colaborar" description="Alcance claro, decisiones visibles y una solución que el equipo pueda mantener." />
          <Stack gap="0">
            {content.services.map((service) => (
              <Grid key={service.id} templateColumns={{ base: "1fr", md: ".7fr 1.3fr" }} gap="6" py="8" borderTopWidth="1px" borderColor="app.border">
                <Heading as="h3" fontSize="2xl" letterSpacing="-.025em">{service.title}</Heading>
                <Stack gap="4"><Text color="app.muted">{service.description}</Text><Flex wrap="wrap" gap="2">{service.capabilities.map((item) => <HStack key={item} bg="app.accent-subtle" px="3" py="1.5" borderRadius="full" fontSize="sm"><Check size={14} /><Text>{item}</Text></HStack>)}</Flex></Stack>
              </Grid>
            ))}
          </Stack>
        </Grid>
      </Container>

      <Box bg="brand.950" color="brand.50" py={{ base: "16", md: "24" }}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: ".7fr 1.3fr" }} gap={{ base: "10", lg: "20" }}>
            <Stack gap="5"><Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-.045em" lineHeight="1">Del proceso al producto</Heading><Text color="brand.300" maxW="42ch">Mi experiencia combina sistemas, web y trabajo directo con necesidades operativas.</Text></Stack>
            <Stack>
              {[
                ["Ahora", "Productos web y sistemas sobre Cloudflare", "React, TypeScript, D1, Workers y diseño de interfaces."],
                ["2022–2025", "Proyectos académicos y para clientes", "Sistemas de ventas, propuestas institucionales e investigación aplicada."],
                ["Desde 2018", "Comunidades y operación digital", "Moderación, permisos, automatización y soporte en Discord."],
              ].map(([period, title, description]) => (
                <Grid key={period} templateColumns={{ base: "1fr", md: "9rem 1fr" }} gap="5" py="7" borderTopWidth="1px" borderColor="brand.800"><Text color="brand.300">{period}</Text><Stack gap="2"><Heading as="h3" fontSize="xl">{title}</Heading><Text color="brand.300">{description}</Text></Stack></Grid>
              ))}
            </Stack>
          </Grid>
        </Container>
      </Box>

      <Container maxW="7xl" py={{ base: "16", md: "24" }}>
        <Flex justify="space-between" align="end" gap="6" mb="10"><SectionHeading title="Notas de trabajo" description="Investigación, decisiones técnicas y aprendizajes que vale la pena conservar." /><Button asChild display={{ base: "none", md: "inline-flex" }} variant="ghost"><Link to="/articulos">Todos los artículos <ArrowUpRight size={17} /></Link></Button></Flex>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "8", md: "7" }}>{articles.map((article) => <ArticleCard key={article.id} article={article} />)}</SimpleGrid>
      </Container>

      <Container maxW="7xl" pb={{ base: "16", md: "24" }}>
        <Flex bg="app.text" color="app.canvas" borderRadius={{ base: "2xl", md: "3xl" }} p={{ base: "8", md: "14" }} direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "start", md: "end" }} gap="10">
          <Stack gap="4" maxW="3xl"><Text opacity=".7">{content.site.availability}</Text><Heading as="h2" fontSize={{ base: "3xl", md: "6xl" }} letterSpacing="-.05em" lineHeight=".95">¿Qué proceso debería sentirse más simple?</Heading></Stack>
          <Button asChild size="lg" bg="app.canvas" color="app.text" borderRadius="full" px="7" flexShrink="0"><Link to="/contacto">Cuéntame el contexto <ArrowUpRight size={18} /></Link></Button>
        </Flex>
      </Container>
    </>
  );
}

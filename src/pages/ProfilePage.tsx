import { AspectRatio, Box, Button, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Download } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useContent } from "@/content/context";

export function ProfilePage() {
  const { content } = useContent();
  return (
    <Container maxW="7xl" py={{ base: "14", md: "24" }}>
      <Grid templateColumns={{ base: "1fr", lg: ".8fr 1.2fr" }} gap={{ base: "12", lg: "20" }} alignItems="start">
        <Stack gap="6" position={{ lg: "sticky" }} top={{ lg: "7rem" }}>
          <AspectRatio className="profile-portrait" ratio={545 / 667} maxW={{ base: "28rem", lg: "100%" }} overflow="hidden" bg="app.surface"><ResponsiveImage loading="eager" image={content.site.portrait ?? { src: "/assets/images/about/about_1-1.webp", alt: `Retrato de ${content.site.name}`, width: 545, height: 667 }} /></AspectRatio>
          {content.site.cvUrl ? <Button asChild alignSelf="start" variant="outline" borderColor="app.text" borderRadius="0"><a href={content.site.cvUrl} target="_blank" rel="noreferrer"><Download size={17} /> Descargar CV</a></Button> : null}
        </Stack>
        <Stack gap={{ base: "12", md: "16" }}>
          <Box><SectionHeading title="Ingeniería con criterio de producto" /><Text color="app.muted" fontSize={{ base: "lg", md: "xl" }} maxW="62ch" mt="7">{content.site.bio}</Text></Box>
          <Box><Heading as="h2" fontSize="3xl" mb="6">Experiencia</Heading>{[
            ["Productos propios", "Diseño y desarrollo de aplicaciones sobre React, Vite y Cloudflare."],
            ["Sistemas para operación", "Herramientas de ventas, inventario, información y automatización."],
            ["Comunidades digitales", "Configuración, permisos, moderación y acompañamiento en Discord."],
          ].map(([title, detail]) => <Grid key={title} templateColumns={{ base: "1fr", md: ".7fr 1.3fr" }} gap="5" py="6" borderTopWidth="1px" borderColor="app.border"><Heading as="h3" fontSize="xl">{title}</Heading><Text color="app.muted">{detail}</Text></Grid>)}</Box>
          <Box><Heading as="h2" fontSize="3xl" mb="6">Forma de trabajar</Heading>{[
            ["Entender", "Mapear la necesidad, las personas y las restricciones antes de elegir tecnología."],
            ["Construir", "Resolver el flujo principal con una interfaz accesible y una arquitectura proporcionada."],
            ["Verificar", "Probar comportamiento, rendimiento y despliegue con evidencia reproducible."],
          ].map(([title, detail], index) => <HStack key={title} align="start" py="5" borderTopWidth="1px" borderColor="app.border" gap="5"><Text color="app.muted" minW="8">0{index + 1}</Text><Box><Heading as="h3" fontSize="xl">{title}</Heading><Text color="app.muted" mt="2">{detail}</Text></Box></HStack>)}</Box>
        </Stack>
      </Grid>
    </Container>
  );
}

import { AspectRatio, Box, Button, Container, Grid, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useContent } from "@/content/context";
import { CV_URL } from "@/lib/links";

export function ProfilePage() {
  const { content, copy, locale } = useContent();
  return (
    <Container maxW="7xl" py={{ base: "14", md: "24" }}>
      <Grid templateColumns={{ base: "1fr", lg: ".8fr 1.2fr" }} gap={{ base: "12", lg: "20" }} alignItems="start">
        <Stack gap="6" position={{ lg: "sticky" }} top={{ lg: "7rem" }}>
          <AspectRatio className="profile-portrait" ratio={545 / 667} maxW={{ base: "28rem", lg: "100%" }} overflow="hidden" bg="app.surface"><ResponsiveImage loading="eager" image={content.site.portrait ?? { src: "/assets/images/about/about_1-1.webp", alt: locale === "en" ? `Portrait of ${content.site.name}` : `Retrato de ${content.site.name}`, width: 545, height: 667 }} /></AspectRatio>
        </Stack>
        <Stack gap={{ base: "12", md: "16" }}>
          <Box>
            <SectionHeading as="h1" title={copy.profile.title} />
            <Text color="app.muted" fontSize={{ base: "lg", md: "xl" }} maxW="62ch" mt="7">{content.site.bio}</Text>
            <Stack gap="2" align="start" mt="7">
              <Button asChild variant="outline" borderColor="app.text" borderRadius="0"><a href={CV_URL} target="_blank" rel="noopener noreferrer">{copy.profile.cv} <ArrowUpRight size={17} /></a></Button>
              <Text color="app.muted" fontSize="sm">{copy.profile.cvAvailable}</Text>
            </Stack>
          </Box>
          <Box><Heading as="h2" fontSize="3xl" mb="6">{copy.profile.experience}</Heading>{copy.profile.experienceItems.map(([title, detail]) => <Grid key={title} templateColumns={{ base: "1fr", md: ".7fr 1.3fr" }} gap="5" py="6" borderTopWidth="1px" borderColor="app.border"><Heading as="h3" fontSize="xl">{title}</Heading><Text color="app.muted">{detail}</Text></Grid>)}</Box>
          <Box><Heading as="h2" fontSize="3xl" mb="6">{copy.profile.work}</Heading>{copy.profile.workItems.map(([title, detail], index) => <HStack key={title} align="start" py="5" borderTopWidth="1px" borderColor="app.border" gap="5"><Text color="app.muted" minW="8">0{index + 1}</Text><Box><Heading as="h3" fontSize="xl">{title}</Heading><Text color="app.muted" mt="2">{detail}</Text></Box></HStack>)}</Box>
        </Stack>
      </Grid>
    </Container>
  );
}

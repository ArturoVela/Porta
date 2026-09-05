import { useForm, ValidationError } from "@formspree/react";
import { Box, Button, Container, Field, Grid, Heading, HStack, Input, Link as ChakraLink, Stack, Text, Textarea } from "@chakra-ui/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useContent } from "@/content/context";

export function ContactPage() {
  const { content } = useContent();
  const [state, handleSubmit] = useForm("myzwkoqa");
  return (
    <Container maxW="7xl" py={{ base: "14", md: "24" }}>
      <Grid templateColumns={{ base: "1fr", lg: ".8fr 1.2fr" }} gap={{ base: "12", lg: "20" }}>
        <Stack gap="8">
          <Stack gap="5"><Heading as="h1" fontSize={{ base: "5xl", md: "7xl" }} letterSpacing="-.055em" lineHeight=".92">Conversemos sobre el problema, no solo sobre la pantalla.</Heading><Text color="app.muted" fontSize="lg">{content.site.availability}</Text></Stack>
          <Stack gap="4">
            <HStack><Mail size={18} /><ChakraLink href={`mailto:${content.site.email}`}>{content.site.email}</ChakraLink></HStack>
            {content.site.phone ? <HStack><Phone size={18} /><ChakraLink href={`tel:${content.site.phone.replace(/\s/g, "")}`}>{content.site.phone}</ChakraLink></HStack> : null}
            <HStack><MapPin size={18} /><Text>{content.site.location}</Text></HStack>
          </Stack>
        </Stack>
        <Box className="contact-panel" bg="app.panel" borderWidth="1px" borderColor="app.border" p={{ base: "6", md: "10" }}>
          {state.succeeded ? <Stack role="status" gap="3"><Heading as="h2" fontSize="3xl">Mensaje enviado</Heading><Text color="app.muted">Gracias por compartir el contexto. Te responderé por correo.</Text></Stack> : (
            <form onSubmit={handleSubmit}>
              <Stack gap="5">
                <Heading as="h2" fontSize="2xl">Cuéntame qué necesitas resolver</Heading>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="5">
                  <Field.Root required><Field.Label>Nombre</Field.Label><Input name="name" required autoComplete="name" /></Field.Root>
                  <Field.Root required><Field.Label>Correo</Field.Label><Input type="email" name="email" required autoComplete="email" /><ValidationError prefix="Correo" field="email" errors={state.errors} /></Field.Root>
                </Grid>
                <Field.Root><Field.Label>Organización o proyecto</Field.Label><Input name="organization" autoComplete="organization" /></Field.Root>
                <Field.Root required><Field.Label>Contexto</Field.Label><Textarea name="message" required minH="11rem" resize="vertical" placeholder="Qué ocurre hoy, a quién afecta y qué te gustaría mejorar." /><ValidationError prefix="Mensaje" field="message" errors={state.errors} /></Field.Root>
                <Button type="submit" alignSelf="start" size="lg" borderRadius="0" bg="brand.600" color="white" loading={state.submitting}>Enviar mensaje <Send size={17} /></Button>
              </Stack>
            </form>
          )}
        </Box>
      </Grid>
    </Container>
  );
}

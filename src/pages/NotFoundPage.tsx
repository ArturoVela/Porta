import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { ContentLink as Link } from "@/components/ContentLink";

export function NotFoundPage() {
  return <Container maxW="5xl" py={{ base: "24", md: "36" }}><Stack align="start" gap="6"><Text color="app.muted">404 · Ruta no encontrada</Text><Heading as="h1" fontSize={{ base: "5xl", md: "8xl" }} letterSpacing="-.06em" lineHeight=".9">Esta parte del sistema no existe.</Heading><Text color="app.muted" fontSize="lg">Puedes volver al inicio o revisar los proyectos publicados.</Text><Button asChild borderRadius="full" bg="app.text" color="app.canvas"><Link to="/"><ArrowLeft size={17} /> Volver al inicio</Link></Button></Stack></Container>;
}

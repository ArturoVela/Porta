import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { ContentLink as Link } from "@/components/ContentLink";
import { useContent } from "@/content/context";

export function NotFoundPage() {
  const { copy } = useContent();
  return <Container maxW="5xl" py={{ base: "24", md: "36" }}><Stack align="start" gap="6"><Text color="app.muted">{copy.notFound.eyebrow}</Text><Heading as="h1" fontSize={{ base: "5xl", md: "8xl" }} letterSpacing="-.06em" lineHeight=".9">{copy.notFound.title}</Heading><Text color="app.muted" fontSize="lg">{copy.notFound.description}</Text><Button asChild borderRadius="full" bg="app.text" color="app.canvas"><Link to="/"><ArrowLeft size={17} /> {copy.notFound.action}</Link></Button></Stack></Container>;
}

import { AspectRatio, Box, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { Comments } from "@/components/Comments";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useContent } from "@/content/context";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function ArticlePage() {
  const { slug } = useParams();
  const { content } = useContent();
  const article = content.articles.find((item) => item.slug === slug);
  if (!article) return <NotFoundPage />;
  const date = new Intl.DateTimeFormat("es-PE", { dateStyle: "long", timeZone: "America/Lima" }).format(new Date(`${article.publishedAt}T12:00:00-05:00`));
  return (
    <Container maxW="5xl" py={{ base: "10", md: "18" }}>
      <Link to="/articulos"><HStack color="app.muted" mb="10"><ArrowLeft size={17} /><Text>Volver a artículos</Text></HStack></Link>
      <Stack gap="7" maxW="4xl"><HStack color="app.muted" gap="3"><Text>{article.category}</Text><Box w="7" h="1px" bg="app.border" /><Text>{date}</Text><Box w="7" h="1px" bg="app.border" /><Text>{article.readingMinutes} min</Text></HStack><Heading as="h1" fontSize={{ base: "4xl", md: "7xl" }} letterSpacing="-.055em" lineHeight=".95">{article.title}</Heading><Text color="app.muted" fontSize={{ base: "lg", md: "xl" }} maxW="60ch">{article.excerpt}</Text></Stack>
      {article.cover ? <AspectRatio ratio={16 / 8} mt={{ base: "10", md: "14" }} overflow="hidden"><ResponsiveImage image={article.cover} /></AspectRatio> : null}
      <Box py={{ base: "10", md: "16" }}><MarkdownBody>{article.body}</MarkdownBody></Box>
      <Comments publicationId={article.id} />
    </Container>
  );
}

import { Container, SimpleGrid } from "@chakra-ui/react";
import { ArticleCard } from "@/components/ContentCards";
import { SectionHeading } from "@/components/SectionHeading";
import { useContent } from "@/content/context";

export function ArticlesPage() {
  const { content } = useContent();
  const articles = [...content.articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return <Container maxW="7xl" py={{ base: "14", md: "24" }}><SectionHeading as="h1" title="Artículos" description="Notas sobre investigación, producto, comunidades y las decisiones que aparecen mientras construyo." /><SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "9", md: "8" }} mt="14">{articles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}</SimpleGrid></Container>;
}

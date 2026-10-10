import { Box, Button, Carousel, Flex, HStack, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ContentLink } from "@/components/ContentLink";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useContent } from "@/content/context";
import { devAppDescription } from "@/lib/dev";
import type { selectHomeProducts } from "@/lib/spotlight";

export function HomeProductCarousel({ products }: { products: ReturnType<typeof selectHomeProducts> }) {
  const { content, copy, locale } = useContent();
  const [reducedMotion] = useMediaQuery(["(prefers-reduced-motion: reduce)"], { fallback: [true] });
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const number = new Intl.NumberFormat(locale);

  return (
    <Carousel.Root className="home-product-carousel" slideCount={products.length} autoplay={false} gap="0" minW="0"
      aria-label={copy.home.carousel} aria-roledescription={locale === "es" ? "carrusel" : "carousel"}
      translations={{ item: (index, count) => `${number.format(index + 1)} ${copy.home.productPosition} ${number.format(count)}` }}>
      <Carousel.Context>{(api) => <>
        <Carousel.ItemGroup>
          {products.map(({ app, project, cover }, index) => {
            const image = cover ?? (app.image ? { src: app.image, alt: `${copy.home.brandImage}: ${app.name}`, width: 750, height: 288 } : undefined);
            const unavailable = !image || failedImages.includes(image.src);
            const title = project?.title ?? app.name;
            return <Carousel.Item key={app.id} index={index} inert={api.page !== index} aria-roledescription={locale === "es" ? "producto" : "product"}>
              <Box as="figure" m="0">
                <Box className="home-product-visual" data-brand={!cover || undefined} aspectRatio="16 / 9" overflow="hidden" bg={cover ? "app.surface" : app.color}
                  onErrorCapture={() => image && setFailedImages((previous) => previous.includes(image.src) ? previous : [...previous, image.src])}>
                  {unavailable ? <Flex h="100%" align="center" justify="center" bg="app.surface"><Text color="app.muted">{copy.home.imageUnavailable}</Text></Flex>
                    : <ResponsiveImage image={image} loading={index === 0 ? "eager" : "lazy"} />}
                </Box>
                <Stack as="figcaption" gap="2" pt="5" pb="4" minH={{ base: "11rem", md: "10rem" }}>
                  <Text fontWeight="750" fontSize="lg">{title}</Text>
                  <Text fontSize="sm" color="app.muted">{project?.outcomes[0] ?? devAppDescription(app, locale, content.projects)}</Text>
                  <Flex gap="5" wrap="wrap" mt="auto" pt="1">
                    <a href={`https://${app.domain}`} target="_blank" rel="noopener noreferrer" className="home-product-link">
                      {copy.dev.openApp} <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    {project && <ContentLink to={`/proyectos/${project.slug}`} className="home-product-link">{copy.dev.viewCase}</ContentLink>}
                  </Flex>
                </Stack>
              </Box>
            </Carousel.Item>;
          })}
        </Carousel.ItemGroup>
        <Flex align="center" justify="space-between" borderTopWidth="1px" borderColor="app.border" pt="3" gap="3">
          <Text fontSize="sm" color="app.muted" fontVariantNumeric="tabular-nums" aria-live="polite" aria-atomic="true">
            {number.format(api.page + 1)} {copy.home.productPosition} {number.format(products.length)}
          </Text>
          <HStack gap="2">
            <Button variant="outline" borderRadius="0" borderColor="app.border" w="11" h="11" p="0" aria-label={copy.home.previousProduct} aria-controls={api.getItemGroupProps().id} disabled={!api.canScrollPrev}
              onClick={(event) => api.scrollPrev(reducedMotion || event.detail === 0)}><ArrowLeft size={19} aria-hidden="true" /></Button>
            <Button variant="outline" borderRadius="0" borderColor="app.border" w="11" h="11" p="0" aria-label={copy.home.nextProduct} aria-controls={api.getItemGroupProps().id} disabled={!api.canScrollNext}
              onClick={(event) => api.scrollNext(reducedMotion || event.detail === 0)}><ArrowRight size={19} aria-hidden="true" /></Button>
          </HStack>
        </Flex>
      </>}</Carousel.Context>
    </Carousel.Root>
  );
}

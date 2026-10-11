import { Box, Button, Carousel, Flex, HStack, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Infinity, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ContentLink } from "@/components/ContentLink";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { ProjectPreview } from "@/components/ProjectPreview";
import { returningProjectSlug } from "@/components/PortfolioMotion";
import { useContent } from "@/content/context";
import { devAppDescription } from "@/lib/dev";
import type { selectHomeProducts } from "@/lib/spotlight";

const AUTOPLAY_DELAY = 5_000;

export function HomeProductCarousel({ products }: { products: ReturnType<typeof selectHomeProducts> }) {
  const { content, copy, locale } = useContent();
  const [reducedMotion] = useMediaQuery(["(prefers-reduced-motion: reduce)"], { fallback: [true] });
  const [defaultPage] = useState(() => Math.max(0, products.findIndex(({ project }) => project?.slug === returningProjectSlug())));
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(reducedMotion || !!returningProjectSlug());
  const [inView, setInView] = useState(false);
  const [playbackEpoch, setPlaybackEpoch] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const previousPage = useRef(defaultPage);
  const number = new Intl.NumberFormat(locale);

  useEffect(() => setPaused(reducedMotion || !!returningProjectSlug()), [reducedMotion]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <Carousel.Root ref={root} className="home-product-carousel" defaultPage={defaultPage} slideCount={products.length} loop={products.length > 1}
      autoplay={inView && !paused && products.length > 1 ? { delay: AUTOPLAY_DELAY } : false} allowMouseDrag gap="0" minW="0"
      style={{ "--home-carousel-delay": `${AUTOPLAY_DELAY}ms` } as CSSProperties}
      data-instant={reducedMotion || instant || undefined}
      onPointerDownCapture={(event) => { setInstant(false); if (!(event.target as Element).closest(".home-product-playback")) setPaused(true); }}
      onKeyDownCapture={(event) => { setInstant(true); if (!(event.target as Element).closest(".home-product-playback")) setPaused(true); }}
      onFocusCapture={(event) => { if (!(event.target as Element).closest(".home-product-playback")) setPaused(true); }}
      onPageChange={({ page, pageSnapPoint }) => {
        // Jump across the loop boundary without scrolling backwards through every product.
        if (Math.abs(page - previousPage.current) === products.length - 1) {
          root.current?.querySelector('[data-part="item-group"]')?.scrollTo({ left: pageSnapPoint, behavior: "instant" });
        }
        previousPage.current = page;
      }}
      onAutoplayStatusChange={({ type }) => { if (type === "autoplay.start") setPlaybackEpoch((epoch) => epoch + 1); }}
      aria-label={copy.home.carousel} aria-roledescription={locale === "es" ? "carrusel" : "carousel"}
      translations={{ item: (index, count) => `${number.format(index + 1)} ${copy.home.productPosition} ${number.format(count)}` }}>
      <Carousel.Context>{(api) => <>
        <Carousel.ItemGroup minW="0" maxW="full">
          {products.map(({ app, project, cover }, index) => {
            const image = cover ?? (app.image ? { src: app.image, alt: `${copy.home.brandImage}: ${app.name}`, width: 750, height: 288 } : undefined);
            const title = project?.title ?? app.name;
            return <Carousel.Item key={app.id} index={index} data-active={api.page === index || undefined} inert={api.page !== index} aria-roledescription={locale === "es" ? "producto" : "product"}>
              <Box as="figure" m="0" data-project-card="carousel">
                <ProjectPreview project={project ?? { title, excerpt: devAppDescription(app, locale, content.projects), liveUrl: `https://${app.domain}` }} imageSrc={image?.src} onOpen={() => setPaused(true)}>
                <Box className="home-product-visual" data-project-image={project?.slug} data-project-art={image?.src} data-brand={!cover || undefined} aspectRatio="16 / 9" overflow="hidden" bg={cover ? "app.surface" : app.color}>
                  {!image ? <Flex h="100%" align="center" justify="center" bg="app.surface"><Text color="app.muted">{copy.home.imageUnavailable}</Text></Flex>
                    : <ResponsiveImage image={image} loading={index === 0 ? "eager" : "lazy"} />}
                </Box>
                </ProjectPreview>
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
        <HStack className="home-product-indicators" gap="0" w="full" maxW="22rem" alignSelf="center" role="group" aria-label={copy.home.carousel} data-playing={api.isPlaying}>
          {products.map(({ app, project }, index) => <Button key={app.id} type="button" className="home-product-indicator"
            variant="plain" borderWidth="0" borderRadius="0" flex="1" minW="0" minH="11" px="0"
            aria-label={`${project?.title ?? app.name} — ${number.format(index + 1)} ${copy.home.productPosition} ${number.format(products.length)}`}
            aria-pressed={api.page === index} aria-controls={api.getItemGroupProps().id}
            onClick={(event) => api.scrollToIndex(index, reducedMotion || event.detail === 0)}>
            <Box as="span" className="home-product-indicator-dot" aria-hidden="true">
              <Box as="span" key={playbackEpoch} className="home-product-indicator-progress" />
            </Box>
          </Button>)}
        </HStack>
        <Flex align="center" justify="space-between" pt="3" gap="3">
          <HStack gap="2" color="app.muted">
            <Text fontSize="sm" fontVariantNumeric="tabular-nums" aria-live={api.isPlaying ? "off" : "polite"} aria-atomic="true">
              {number.format(api.page + 1)} {copy.home.productPosition} {number.format(products.length)}
            </Text>
            {products.length > 1 && <Infinity size={16} aria-hidden="true" />}
          </HStack>
          <HStack gap="2">
            <Button variant="outline" borderRadius="0" borderColor="app.border" w="11" h="11" p="0" aria-label={copy.home.previousProduct} aria-controls={api.getItemGroupProps().id} disabled={!api.canScrollPrev}
              onClick={(event) => api.scrollPrev(reducedMotion || event.detail === 0)}><ArrowLeft size={19} aria-hidden="true" /></Button>
            <Button className="home-product-playback" variant="outline" borderRadius="0" borderColor="app.border" w="11" h="11" p="0"
              aria-label={api.isPlaying ? copy.home.pauseProducts : copy.home.playProducts} aria-controls={api.getItemGroupProps().id} disabled={products.length < 2}
              onClick={() => {
                if (api.isPlaying) { setPaused(true); api.pause(); }
                else {
                  setInView(true);
                  setPaused(false);
                  if (inView && !paused) api.play();
                }
              }}>
              {api.isPlaying ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
            </Button>
            <Button variant="outline" borderRadius="0" borderColor="app.border" w="11" h="11" p="0" aria-label={copy.home.nextProduct} aria-controls={api.getItemGroupProps().id} disabled={!api.canScrollNext}
              onClick={(event) => api.scrollNext(reducedMotion || event.detail === 0)}><ArrowRight size={19} aria-hidden="true" /></Button>
          </HStack>
        </Flex>
      </>}</Carousel.Context>
    </Carousel.Root>
  );
}

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

export function carouselTransition(root: HTMLElement | null, previous: number, page: number, pageSnapPoint: number, instant: boolean) {
  const group = root?.querySelector<HTMLElement>('[data-part="item-group"]');
  if (!group || page === previous || !Number.isFinite(pageSnapPoint) || Math.abs(group.scrollLeft - pageSnapPoint) <= 1) return;
  const image = root?.querySelector<HTMLImageElement>(`[data-part="item"][data-index="${previous}"] .home-product-visual img`);
  const src = !instant && image?.complete && image.naturalWidth ? image.currentSrc || image.src : undefined;
  return { group, src };
}

export function HomeProductCarousel({ products }: { products: ReturnType<typeof selectHomeProducts> }) {
  const { content, copy, locale } = useContent();
  const [reducedMotion] = useMediaQuery(["(prefers-reduced-motion: reduce)"], { fallback: [true] });
  const [defaultPage] = useState(() => Math.max(0, products.findIndex(({ project }) => project?.slug === returningProjectSlug())));
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(reducedMotion || !!returningProjectSlug());
  const [inView, setInView] = useState(false);
  const [playbackEpoch, setPlaybackEpoch] = useState(0);
  const [fade, setFade] = useState<{ src: string; id: number } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const previousPage = useRef(defaultPage);
  const instantInteraction = useRef(false);
  const fadeId = useRef(0);
  const scrollFrame = useRef(0);
  const number = new Intl.NumberFormat(locale);

  useEffect(() => setPaused(reducedMotion || !!returningProjectSlug()), [reducedMotion]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root.current!);
    return () => observer.disconnect();
  }, []);
  useEffect(() => () => cancelAnimationFrame(scrollFrame.current), []);

  return (
    <Carousel.Root ref={root} className="home-product-carousel" defaultPage={defaultPage} slideCount={products.length} loop={products.length > 1}
      autoplay={inView && !paused && products.length > 1 ? { delay: AUTOPLAY_DELAY } : false} allowMouseDrag gap="0" minW="0"
      style={{ "--home-carousel-delay": `${AUTOPLAY_DELAY}ms` } as CSSProperties}
      data-instant={reducedMotion || instant || undefined}
      onPointerDownCapture={(event) => { instantInteraction.current = false; setInstant(false); setFade(null); if (!(event.target as Element).closest(".home-product-playback")) setPaused(true); }}
      onKeyDownCapture={(event) => { instantInteraction.current = true; setInstant(true); setFade(null); if (!(event.target as Element).closest(".home-product-playback")) setPaused(true); }}
      onFocusCapture={(event) => { if (!(event.target as Element).closest(".home-product-playback")) setPaused(true); }}
      onPageChange={({ page, pageSnapPoint }) => {
        // A completed swipe is already at its destination; keep native touch scrolling intact.
        const transition = carouselTransition(root.current, previousPage.current, page, pageSnapPoint, reducedMotion || instantInteraction.current);
        if (transition) {
          if (transition.src) setFade({ src: transition.src, id: ++fadeId.current });
          cancelAnimationFrame(scrollFrame.current);
          scrollFrame.current = requestAnimationFrame(() => transition.group.scrollTo({ left: pageSnapPoint, behavior: "instant" }));
        }
        previousPage.current = page;
      }}
      onAutoplayStatusChange={({ type }) => { if (type === "autoplay.start") setPlaybackEpoch((epoch) => epoch + 1); }}
      aria-label={copy.home.carousel} aria-roledescription={locale === "es" ? "carrusel" : "carousel"}
      translations={{ item: (index, count) => `${number.format(index + 1)} ${copy.home.productPosition} ${number.format(count)}` }}>
      <Carousel.Context>{(api) => <>
        <Carousel.ItemGroup minW="0" maxW="full">
          {products.map(({ app, project, cover }, index) => {
            const image = cover;
            const title = project?.title ?? app.name;
            return <Carousel.Item key={app.id} index={index} data-active={api.page === index || undefined} inert={api.page !== index} aria-roledescription={locale === "es" ? "producto" : "product"}>
              <Box as="figure" m="0" data-project-card="carousel">
                <ProjectPreview project={project ?? { title, excerpt: devAppDescription(app, locale, content.projects), liveUrl: `https://${app.domain}` }} imageSrc={image?.src} onOpen={() => setPaused(true)}>
                <Box className="home-product-visual" data-project-image={project?.slug} data-project-art={image?.src} aspectRatio="16 / 9" overflow="hidden" bg="app.surface">
                  {!image ? <Flex h="100%" align="center" justify="center" bg="app.surface"><Text color="app.muted">{copy.home.imageUnavailable}</Text></Flex>
                    : <ResponsiveImage image={image} loading={index === 0 ? "eager" : "lazy"} sizes="(min-width: 80rem) 640px, (min-width: 64rem) 50vw, 100vw" />}
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
        {fade && <div key={fade.id} className="home-product-crossfade" aria-hidden="true" onAnimationEnd={() => setFade(null)}><img src={fade.src} alt="" /></div>}
        <HStack className="home-product-indicators" gap="0" w="full" maxW="22rem" alignSelf="center" role="group" aria-label={copy.home.carousel} data-playing={api.isPlaying}>
          {products.map(({ app, project }, index) => <Button key={app.id} type="button" className="home-product-indicator"
            variant="plain" borderWidth="0" borderRadius="0" flex="1" minW="0" minH="11" px="0"
            aria-label={`${project?.title ?? app.name} — ${number.format(index + 1)} ${copy.home.productPosition} ${number.format(products.length)}`}
            aria-pressed={api.page === index} aria-controls={api.getItemGroupProps().id}
            onClick={() => api.scrollToIndex(index, true)}>
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
              onClick={() => api.scrollPrev(true)}><ArrowLeft size={19} aria-hidden="true" /></Button>
            <Button className="home-product-playback" variant="outline" borderRadius="0" borderColor="app.border" w="11" h="11" p="0"
              aria-label={api.isPlaying ? copy.home.pauseProducts : copy.home.playProducts} aria-controls={api.getItemGroupProps().id} disabled={products.length < 2}
              onClick={() => {
                if (api.isPlaying) { setPaused(true); api.pause(); }
                else {
                  instantInteraction.current = false;
                  setInstant(false);
                  setInView(true);
                  setPaused(false);
                  if (inView && !paused) api.play();
                }
              }}>
              {api.isPlaying ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
            </Button>
            <Button variant="outline" borderRadius="0" borderColor="app.border" w="11" h="11" p="0" aria-label={copy.home.nextProduct} aria-controls={api.getItemGroupProps().id} disabled={!api.canScrollNext}
              onClick={() => api.scrollNext(true)}><ArrowRight size={19} aria-hidden="true" /></Button>
          </HStack>
        </Flex>
      </>}</Carousel.Context>
    </Carousel.Root>
  );
}

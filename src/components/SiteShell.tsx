import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion, useIsPresent, usePresenceData, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router";
import { ContentLink as Link } from "@/components/ContentLink";
import { MOTION_EASE_OUT } from "@/components/PortfolioMotion";
import { SiteFooter } from "@/components/SiteFooter";
import { useContent } from "@/content/context";
import { CV_URL } from "@/lib/links";
import { contentHref } from "@/lib/preview";
import { localeCookie, localizedPath, routePath, type LocaleCopy } from "@/i18n";

export function ThemeToggle({ copy }: { copy: LocaleCopy }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <IconButton
      aria-label={mounted ? (dark ? copy.theme.light : copy.theme.dark) : copy.theme.change}
      variant="plain"
      bg="transparent"
      color="app.text"
      borderRadius="0"
      w="11"
      h="11"
      minW="11"
      minH="11"
      flexShrink="0"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </IconButton>
  );
}

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const { copy, locale } = useContent();
  const navigation = [
    { label: copy.nav.projects, to: "/proyectos" },
    { label: copy.nav.profile, to: "/perfil" },
    { label: "Dev", to: "/dev" },
    { label: copy.nav.articles, to: "/articulos" },
    { label: copy.nav.linktree, to: "/linktree" },
    { label: "Store", to: `https://store.velaarturo.com/${locale}/` },
  ];
  const pathname = location.pathname === "/__preview" ? new URLSearchParams(location.search).get("path") ?? "/" : location.pathname;
  return <>
    {navigation.map((item) => {
      const target = localizedPath(item.to, locale);
      const active = pathname === target || pathname.startsWith(`${target}/`);
      return (
        <Link key={item.to} to={item.to} onClick={onNavigate} aria-current={active ? "page" : undefined}>
          <Text
            as="span"
            className="nav-item"
            display="flex"
            alignItems="center"
            px="3"
            h="11"
            minH="11"
            color={active ? "app.text" : "app.muted"}
            borderBottomWidth="2px"
            borderColor="transparent"
            fontSize="sm"
            fontWeight="600"
            _hover={{ color: "app.text" }}
          >
            {item.label}
          </Text>
        </Link>
      );
    })}
    <a href={CV_URL} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
      <Text as="span" className="nav-item" display="flex" alignItems="center" h="11" minH="11" px="3" color="app.muted" borderBottomWidth="2px" borderColor="transparent" fontSize="sm" fontWeight="600" _hover={{ color: "app.text" }}>{copy.common.cv}</Text>
    </a>
  </>;
}

function LanguageSwitch() {
  const { locale, copy, previewToken } = useContent();
  const location = useLocation();
  const currentPath = location.pathname === "/__preview" ? new URLSearchParams(location.search).get("path") ?? routePath(locale, "home") : location.pathname;
  if (currentPath.replace(/\/$/, "") === "/work") return null;
  return (
    <HStack role="group" aria-label={copy.common.language} gap="0" h="11" flexShrink="0">
      {(["es", "en"] as const).map((target) => (
        <RouterLink
          key={target}
          to={contentHref(localizedPath(`${currentPath}${location.hash}`, target), previewToken)}
          hrefLang={target}
          aria-current={locale === target ? "page" : undefined}
          onClick={() => { document.cookie = localeCookie(target); }}
        >
          <Text as="span" className="language-option" display="flex" alignItems="center" justifyContent="center" minW="10" h="11" fontSize="xs" fontWeight="700" color={locale === target ? "app.text" : "app.muted"}>{target.toUpperCase()}</Text>
        </RouterLink>
      ))}
    </HStack>
  );
}

function MobileNavigation({ onNavigate }: { onNavigate: () => void }) {
  const { copy } = useContent();
  const present = useIsPresent();
  const instant = usePresenceData();
  const closed = { opacity: 0, transform: instant ? "none" : "translateY(-6px)" };
  return (
    <Stack asChild className="mobile-navigation" display={{ lg: "none" }} position="absolute" top="100%" right={{ base: "5", md: "8" }} w="calc(100% - 2.5rem)" maxW="20rem" maxH="calc(100dvh - 5.5rem)" overflowY="auto" p="2" gap="0" bg="app.panel" borderWidth="1px" borderColor="app.border">
      <motion.nav id="mobile-navigation" aria-label={copy.footer.explore} inert={!present}
        initial={closed} animate={{ opacity: 1, transform: "none" }} exit={closed}
        transition={{ duration: instant ? 0 : 0.18, ease: MOTION_EASE_OUT }}>
        <NavigationLinks onNavigate={onNavigate} />
        <Button asChild display={{ base: "inline-flex", sm: "none" }} mt="2" h="11" minH="11" w="full" bg="app.signal" color="#18221B" borderRadius="0">
          <Link to="/contacto" onClick={onNavigate}>{copy.common.talk} <ArrowUpRight size={17} /></Link>
        </Button>
      </motion.nav>
    </Stack>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { content, copy } = useContent();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [menuInstant, setMenuInstant] = useState(false);
  const reduced = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <Flex minH="100vh" direction="column">
      <Box
        asChild
        position="fixed"
        top="3"
        left="3"
        zIndex="skipLink"
        transform="translateY(-180%)"
        _focusVisible={{ transform: "translateY(0)" }}
        bg="app.text"
        color="app.canvas"
        px="4"
        py="2"
        borderRadius="lg"
      >
        <a href="#contenido">{copy.common.skip}</a>
      </Box>
      <Box as="header" className="site-header" position="sticky" top="0" zIndex="sticky" bg="app.canvas/94" backdropFilter="blur(18px)" borderBottomWidth="1px" borderColor="app.border">
        <Container ref={headerRef} position="relative" maxW="7xl" px={{ base: "5", md: "8" }}>
          <Flex className="site-header-bar" minH="20" align="center" justify="space-between" gap={{ base: "2", md: "4" }} py="2">
            <Link to="/" aria-label={content.site.name} className="site-header-brand">
              <HStack gap="3">
                <Flex className="brand-mark" w="10" h="10" flexShrink="0" bg="app.text" color="app.canvas" align="center" justify="center" fontWeight="850">A/</Flex>
                <Stack gap="0" display={{ base: "none", xl: "flex" }}>
                  <Text fontWeight="750" letterSpacing="-.025em" lineHeight="1.1">{content.site.name}</Text>
                  <Text color="app.muted" fontSize="xs">{copy.common.brandSubtitle}</Text>
                </Stack>
              </HStack>
            </Link>
            <HStack display={{ base: "none", lg: "flex" }} gap="1" flexShrink="0">
              <NavigationLinks />
            </HStack>
            <HStack gap="2" flexShrink="0">
              <LanguageSwitch />
              <ThemeToggle copy={copy} />
              <Button asChild display={{ base: "none", sm: "inline-flex" }} h="11" minH="11" bg="app.signal" color="#18221B" borderRadius="0" px="5">
                <Link to="/contacto">{copy.common.talk} <ArrowUpRight size={17} /></Link>
              </Button>
              <IconButton
                ref={menuButtonRef}
                display={{ base: "inline-flex", lg: "none" }}
                aria-label={open ? copy.menu.close : copy.menu.open}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                variant="plain"
                bg="transparent"
                borderRadius="0"
                w="11"
                h="11"
                minW="11"
                minH="11"
                flexShrink="0"
                onClick={(event) => { setMenuInstant(event.detail === 0); setOpen((value) => !value); }}
              >
                {open ? <X size={19} /> : <Menu size={19} />}
              </IconButton>
            </HStack>
          </Flex>
          <AnimatePresence initial={false} custom={menuInstant || reduced}>
            {open && <MobileNavigation key="navigation" onNavigate={() => setOpen(false)} />}
          </AnimatePresence>
        </Container>
      </Box>
      <Box as="main" id="contenido" flex="1">{children}</Box>
      <SiteFooter />
    </Flex>
  );
}

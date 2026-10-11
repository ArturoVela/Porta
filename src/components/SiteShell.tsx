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
import { useEffect, useState, type ReactNode } from "react";
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
      variant="outline"
      borderColor="app.border"
      bg="app.panel"
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
            fontWeight="600"
            _hover={{ color: "app.text" }}
          >
            {item.label}
          </Text>
        </Link>
      );
    })}
    <a href={CV_URL} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
      <Text as="span" className="nav-item" display="flex" alignItems="center" h="11" minH="11" px="3" color="app.muted" borderBottomWidth="2px" borderColor="transparent" fontWeight="600" _hover={{ color: "app.text" }}>{copy.common.cv}</Text>
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
          <Text as="span" className="language-option" display="flex" alignItems="center" justifyContent="center" minW="11" h="11" borderWidth="1px" borderInlineStartWidth={target === "en" ? "0" : "1px"} borderColor="app.border" px="3" fontSize="sm" fontWeight="700" bg={locale === target ? "app.text" : "app.panel"} color={locale === target ? "app.canvas" : "app.muted"}>{target.toUpperCase()}</Text>
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
    <Stack asChild display={{ lg: "none" }} p="4" gap="1" bg="app.panel" borderWidth="1px" borderTopWidth="0" borderColor="app.border">
      <motion.nav id="mobile-navigation" aria-label={copy.footer.explore} inert={!present}
        initial={closed} animate={{ opacity: 1, transform: "none" }} exit={closed}
        transition={{ duration: instant ? 0 : 0.18, ease: MOTION_EASE_OUT }}>
        <NavigationLinks onNavigate={onNavigate} />
        <Button asChild mt="2" h="11" minH="11" bg="app.signal" color="#160B08" borderRadius="0">
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

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    setOpen(false);
  }, [location.pathname, location.search]);

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
      <Box as="header" position="sticky" top="0" zIndex="sticky" bg="app.canvas/88" backdropFilter="blur(18px)" py="3">
        <Container maxW="7xl" px={{ base: "2", md: "4" }}>
          <Flex className="site-header-bar" minH="16" align="center" justify="space-between" gap={{ base: "2", md: "4" }} bg="app.panel/92" borderWidth="1px" borderColor="app.border" px={{ base: "2", md: "5" }} py="2" boxShadow="0 8px 30px rgba(8, 11, 18, .06)">
            <Link to="/" aria-label={content.site.name} className="site-header-brand">
              <HStack gap="3">
                <Flex className="brand-mark" w="11" h="11" flexShrink="0" bg="brand.600" color="white" align="center" justify="center" fontWeight="850">A/</Flex>
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
              <Button asChild display={{ base: "none", sm: "inline-flex" }} h="11" minH="11" bg="app.signal" color="#160B08" borderRadius="0" px="5">
                <Link to="/contacto">{copy.common.talk} <ArrowUpRight size={17} /></Link>
              </Button>
              <IconButton
                display={{ base: "inline-flex", lg: "none" }}
                aria-label={open ? copy.menu.close : copy.menu.open}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                variant="outline"
                borderColor="app.border"
                bg="app.panel"
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

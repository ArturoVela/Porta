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
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useContent } from "@/content/context";

const navigation = [
  { label: "Proyectos", to: "/proyectos" },
  { label: "Perfil", to: "/perfil" },
  { label: "Artículos", to: "/articulos" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <IconButton
      aria-label={mounted ? `Cambiar a modo ${dark ? "claro" : "oscuro"}` : "Cambiar tema"}
      variant="outline"
      borderColor="app.border"
      bg="app.panel"
      color="app.text"
      borderRadius="0"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </IconButton>
  );
}

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  return navigation.map((item) => (
    <NavLink key={item.to} to={item.to} onClick={onNavigate}>
      {({ isActive }) => (
        <Text
          as="span"
          display="block"
          px="3"
          py="2"
          color={isActive ? "app.text" : "app.muted"}
          borderBottomWidth="2px"
          borderColor={isActive ? "app.accent" : "transparent"}
          fontWeight="600"
          _hover={{ color: "app.text", borderColor: "app.accent" }}
        >
          {item.label}
        </Text>
      )}
    </NavLink>
  ));
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { content } = useContent();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setOpen(false);
  }, [location.pathname]);

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
        <a href="#contenido">Saltar al contenido</a>
      </Box>
      <Box as="header" position="sticky" top="0" zIndex="sticky" bg="app.canvas/88" backdropFilter="blur(18px)" py="3">
        <Container maxW="7xl">
          <Flex minH="15" align="center" justify="space-between" gap="4" bg="app.panel/92" borderWidth="1px" borderColor="app.border" px={{ base: "3", md: "5" }} boxShadow="0 8px 30px rgba(8, 11, 18, .06)">
            <Link to="/">
              <HStack gap="3">
                <Flex className="brand-mark" w="9" h="9" bg="brand.600" color="white" align="center" justify="center" fontWeight="850">A/</Flex>
                <Stack gap="0" display={{ base: "none", sm: "flex" }}>
                  <Text fontWeight="750" letterSpacing="-.025em" lineHeight="1.1">{content.site.name}</Text>
                  <Text color="app.muted" fontSize="xs">Producto e ingeniería web</Text>
                </Stack>
              </HStack>
            </Link>
            <HStack display={{ base: "none", md: "flex" }} gap="1">
              <NavigationLinks />
            </HStack>
            <HStack gap="2">
              <ThemeToggle />
              <Button asChild display={{ base: "none", sm: "inline-flex" }} bg="app.signal" color="#160B08" borderRadius="0" px="5" _hover={{ transform: "translate(2px, -2px)" }}>
                <Link to="/contacto">Hablemos <ArrowUpRight size={17} /></Link>
              </Button>
              <IconButton
                display={{ base: "inline-flex", md: "none" }}
                aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
                variant="outline"
                borderColor="app.border"
                bg="app.panel"
                borderRadius="0"
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X size={19} /> : <Menu size={19} />}
              </IconButton>
            </HStack>
          </Flex>
          {open ? (
            <Stack display={{ md: "none" }} p="4" gap="1" bg="app.panel" borderWidth="1px" borderTopWidth="0" borderColor="app.border">
              <NavigationLinks onNavigate={() => setOpen(false)} />
              <Button asChild mt="2" bg="app.signal" color="#160B08" borderRadius="0">
                <Link to="/contacto">Hablemos <ArrowUpRight size={17} /></Link>
              </Button>
            </Stack>
          ) : null}
        </Container>
      </Box>
      <Box as="main" id="contenido" flex="1">{children}</Box>
      <Box as="footer" bg="#080B12" color="#F7F9FC" py={{ base: "12", md: "16" }}>
        <Container maxW="7xl">
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "end" }} gap="12">
            <Stack gap="6" maxW="2xl">
              <Text color="#AAB5C6">{content.site.name} · {content.site.location}</Text>
              <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="750" letterSpacing="-.05em" lineHeight=".95">Productos digitales claros, seguros y mantenibles.</Text>
            </Stack>
            <Stack align={{ base: "start", md: "end" }} gap="5">
              <HStack gap="5" flexWrap="wrap">
                {content.site.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer"><Text color="#AAB5C6" borderBottomWidth="1px" borderColor="#596476" _hover={{ color: "white", borderColor: "white" }}>{social.label}</Text></a>)}
              </HStack>
              <Text color="#7D899B" fontSize="sm">© {new Date().getFullYear()} · Construido desde {content.site.location}</Text>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}

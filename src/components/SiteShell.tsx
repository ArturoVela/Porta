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
      borderRadius="full"
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
          borderRadius="lg"
          color={isActive ? "app.text" : "app.muted"}
          bg={isActive ? "app.accent-subtle" : "transparent"}
          fontWeight="600"
          _hover={{ color: "app.text", bg: "app.accent-subtle" }}
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
      <Box as="header" position="sticky" top="0" zIndex="sticky" bg="app.canvas/88" backdropFilter="blur(18px)" borderBottomWidth="1px" borderColor="app.border">
        <Container maxW="7xl">
          <Flex minH="18" align="center" justify="space-between" gap="4">
            <Link to="/">
              <HStack gap="3">
                <Flex w="9" h="9" bg="app.text" color="app.canvas" borderRadius="xl" align="center" justify="center" fontWeight="800">AV</Flex>
                <Text fontWeight="700" letterSpacing="-.02em">{content.site.name}</Text>
              </HStack>
            </Link>
            <HStack display={{ base: "none", md: "flex" }} gap="1">
              <NavigationLinks />
            </HStack>
            <HStack gap="2">
              <ThemeToggle />
              <Button asChild display={{ base: "none", sm: "inline-flex" }} bg="app.text" color="app.canvas" borderRadius="full" px="5" _hover={{ opacity: .86 }}>
                <Link to="/contacto">Hablemos <ArrowUpRight size={17} /></Link>
              </Button>
              <IconButton
                display={{ base: "inline-flex", md: "none" }}
                aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
                variant="outline"
                borderColor="app.border"
                bg="app.panel"
                borderRadius="full"
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X size={19} /> : <Menu size={19} />}
              </IconButton>
            </HStack>
          </Flex>
          {open ? (
            <Stack display={{ md: "none" }} pb="5" gap="1">
              <NavigationLinks onNavigate={() => setOpen(false)} />
              <Button asChild mt="2" bg="app.text" color="app.canvas" borderRadius="full">
                <Link to="/contacto">Hablemos <ArrowUpRight size={17} /></Link>
              </Button>
            </Stack>
          ) : null}
        </Container>
      </Box>
      <Box as="main" id="contenido" flex="1">{children}</Box>
      <Box as="footer" borderTopWidth="1px" borderColor="app.border" py={{ base: "10", md: "14" }}>
        <Container maxW="7xl">
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap="8">
            <Stack gap="2" maxW="md">
              <Text fontSize="xl" fontWeight="700">{content.site.name}</Text>
              <Text color="app.muted">Productos digitales claros, seguros y mantenibles.</Text>
            </Stack>
            <Stack align={{ base: "start", md: "end" }} gap="3">
              <HStack gap="5" flexWrap="wrap">
                {content.site.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer"><Text color="app.muted" _hover={{ color: "app.text" }}>{social.label}</Text></a>)}
              </HStack>
              <Text color="app.muted" fontSize="sm">© {new Date().getFullYear()} · Construido desde {content.site.location}</Text>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}

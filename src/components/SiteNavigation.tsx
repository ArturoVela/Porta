import { Box, CloseButton, Drawer, Flex, IconButton, Portal, Stack, Text } from "@chakra-ui/react";
import { ArrowUpRight, BookOpen, BriefcaseBusiness, ChevronRight, Code2, FileText, Home, Mail, Menu, Monitor, Moon, ShoppingBag, Sun, UserRound, WalletCards } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocation } from "react-router";
import { ContentLink } from "@/components/ContentLink";
import { useContent } from "@/content/context";
import { localizedPath, type Locale, type LocaleCopy } from "@/i18n";
import { CV_URL } from "@/lib/links";

export function portfolioNavigation(copy: LocaleCopy, locale: Locale) {
  return [
    { label: copy.nav.projects, to: "/proyectos", icon: BriefcaseBusiness },
    { label: copy.nav.profile, to: "/perfil", icon: UserRound },
    { label: "Dev", to: "/dev", icon: Code2 },
    { label: copy.nav.articles, to: "/articulos", icon: BookOpen },
    { label: copy.nav.linktree, to: "/linktree", icon: WalletCards },
    { label: "Store", to: `https://store.velaarturo.com/${locale}/`, icon: ShoppingBag },
  ];
}

export function SiteNavigation() {
  const { content, copy, locale } = useContent();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(80);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = location.pathname === "/__preview" ? new URLSearchParams(location.search).get("path") ?? "/" : location.pathname;
  const items = [{ label: locale === "es" ? "Inicio" : "Home", to: "/", icon: Home }, ...portfolioNavigation(copy, locale)];
  const themes = [
    { value: "system", label: locale === "es" ? "Sistema" : "System", icon: Monitor },
    { value: "light", label: locale === "es" ? "Claro" : "Light", icon: Sun },
    { value: "dark", label: locale === "es" ? "Oscuro" : "Dark", icon: Moon },
  ];

  useEffect(() => { setOpen(false); }, [location.pathname, location.search]);
  useEffect(() => {
    if (!open) return;
    const measure = () => setHeaderBottom(Math.max(0, trigger.current?.closest("header")?.getBoundingClientRect().bottom ?? 80));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);
  const inset = { "--site-drawer-top": `${headerBottom}px` } as CSSProperties;

  return <Drawer.Root open={open} onOpenChange={(event) => setOpen(event.open)} placement="start" lazyMount unmountOnExit>
    <Drawer.Trigger asChild><IconButton ref={trigger} className="site-drawer-trigger" aria-label={copy.menu.open} variant="ghost" boxSize="11" flexShrink="0" borderRadius="0"><Menu size={20} aria-hidden="true" /></IconButton></Drawer.Trigger>
    <Portal>
      <Drawer.Backdrop className="site-drawer-backdrop" style={inset} />
      <Drawer.Positioner className="site-drawer-positioner" style={inset}>
        <Drawer.Content className="site-drawer-panel" bg="app.panel" color="app.text">
          <Drawer.Header className="site-drawer-heading">
            <Flex boxSize="10" flexShrink="0" bg="app.text" color="app.canvas" align="center" justify="center" fontWeight="850" aria-hidden="true">A/</Flex>
            <Stack gap="0" flex="1" minW="0"><Drawer.Title fontSize="md" fontWeight="750">{content.site.name}</Drawer.Title><Drawer.Description fontSize="xs" color="app.muted">{copy.common.brandSubtitle}</Drawer.Description></Stack>
            <Drawer.CloseTrigger asChild position="static"><CloseButton aria-label={copy.menu.close} variant="ghost" boxSize="11" flexShrink="0" /></Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body className="site-drawer-body">
            <nav className="site-drawer-links" aria-label={copy.footer.explore}>
              {items.map(({ label, to, icon: Icon }) => {
                const target = localizedPath(to, locale);
                const active = to === "/" ? pathname.replace(/\/$/, "") === target.replace(/\/$/, "") : pathname === target || pathname.startsWith(`${target}/`);
                return <ContentLink key={to} to={to} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}><Icon size={19} aria-hidden="true"/><span>{label}</span>{active ? <ChevronRight size={16} aria-hidden="true"/> : to.startsWith("http") ? <ArrowUpRight size={16} aria-hidden="true"/> : null}</ContentLink>;
              })}
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><FileText size={19} aria-hidden="true"/><span>{copy.common.cv}</span><ArrowUpRight size={16} aria-hidden="true"/></a>
              <ContentLink to="/contacto" onClick={() => setOpen(false)}><Mail size={19} aria-hidden="true"/><span>{copy.common.talk}</span><ArrowUpRight size={16} aria-hidden="true"/></ContentLink>
            </nav>
            <section className="site-drawer-appearance" aria-label={locale === "es" ? "Apariencia" : "Appearance"}>
              <h3>{locale === "es" ? "Apariencia" : "Appearance"}</h3>
              <fieldset className="site-drawer-themes" aria-label={locale === "es" ? "Modo de color" : "Color mode"}>
                {themes.map(({ value, label, icon: Icon }) => <label key={value}><input type="radio" name="portfolio-color-mode" value={value} checked={(theme ?? "system") === value} onChange={() => setTheme(value)} /><Icon size={18} aria-hidden="true"/><span>{label}</span></label>)}
              </fieldset>
            </section>
          </Drawer.Body>
          <Box className="site-drawer-footer"><Text>{copy.footer.scope}</Text></Box>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  </Drawer.Root>;
}

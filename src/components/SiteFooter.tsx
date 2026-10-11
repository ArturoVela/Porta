import { Container } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { ContentLink as Link } from "@/components/ContentLink";
import { useContent } from "@/content/context";
import { CV_URL } from "@/lib/links";

export function SiteFooter() {
  const { content, copy } = useContent();
  const wordmark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const element = wordmark.current!;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting && entry.intersectionRatio >= 0.2);
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="site-footer">
      <Container maxW="7xl">
        <div className="footer-main">
          <div className="footer-intro">
            <Link to="/" className="footer-name">{content.site.name}<span>· {content.site.location}</span></Link>
            <a href={`mailto:${content.site.email}`} className="footer-contact">{content.site.email}<ArrowUpRight size={16} aria-hidden="true" /></a>
            <p className="footer-scope">{copy.footer.scope}</p>
          </div>
          <div className="footer-navigation">
            <nav aria-label={copy.footer.explore}>
              <p className="footer-nav-title">{copy.footer.explore}</p>
              <div className="footer-links">
                <Link to="/proyectos">{copy.nav.projects}</Link>
                <Link to="/perfil">{copy.nav.profile}</Link>
                <Link to="/dev">Dev</Link>
                <Link to="/work">Work</Link>
                <Link to="/articulos">{copy.nav.articles}</Link>
                <Link to="/linktree">{copy.nav.linktree}</Link>
              </div>
            </nav>
            <nav aria-label={copy.footer.connect}>
              <p className="footer-nav-title">{copy.footer.connect}</p>
              <div className="footer-links">
                <Link to="/contacto">{copy.common.talk}</Link>
                {content.site.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
                <a href={CV_URL} target="_blank" rel="noopener noreferrer">{copy.common.cv}<ArrowUpRight size={14} aria-hidden="true" /></a>
              </div>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {content.site.name}</p>
          <nav className="footer-legal" aria-label={copy.footer.legal}>
            <Link to="/legal#privacidad">{copy.footer.privacy}</Link>
            <Link to="/legal#cookies">{copy.footer.cookies}</Link>
            <Link to="/legal#condiciones">{copy.footer.terms}</Link>
            <Link to="/legal#derechos">{copy.footer.rights}</Link>
          </nav>
          <p className="footer-copyright">{copy.footer.copyright}</p>
        </div>
      </Container>
      <div ref={wordmark} className="footer-wordmark" aria-hidden="true"><span>VELA</span></div>
    </footer>
  );
}

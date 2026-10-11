import { Container } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { ContentLink } from "@/components/ContentLink";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkImage } from "@/components/WorkImage";
import { WORK_COMPANIES } from "@/lib/work";
import "./work.css";

export function WorkIndexPage() {
  const { resolvedTheme } = useTheme();
  return <Container className="work-index" maxW="7xl" py={{ base: "14", md: "24" }}>
    <SectionHeading as="h1" title="Work" description="Tarjetas de presentación y experiencia laboral. Elige una empresa para conocer mi trabajo y abrir su tarjeta." />
    <ul className="work-index-list">
      {Object.entries(WORK_COMPANIES).map(([id, company]) => {
        const logo = resolvedTheme === "dark" ? company.darkLogo : company.logo;
        return <li key={id}>
          <ContentLink to={company.path} className="work-index-link">
            <div className="work-index-logo"><WorkImage key={logo} src={logo} alt="" width={240} height={96} /></div>
            <div className="work-index-identity"><h2>{company.name}</h2><p>{company.role}</p></div>
            <div className="work-index-period"><span>{company.current ? "Experiencia actual" : "Experiencia anterior"}</span><p>{company.period}</p></div>
            <span className="work-index-action">Ver tarjeta<ArrowUpRight size={18} aria-hidden="true" /></span>
          </ContentLink>
        </li>;
      })}
    </ul>
  </Container>;
}

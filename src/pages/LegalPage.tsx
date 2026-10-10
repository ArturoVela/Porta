import { Box, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { ContentLink } from "@/components/ContentLink";
import { MarkdownBody } from "@/components/MarkdownBody";
import { useContent } from "@/content/context";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal";

export function LegalPage() {
  const { content, copy, locale } = useContent();
  const { hash } = useLocation();
  const { name, email, location } = content.site;
  const contact = `[${email}](mailto:${email})`;
  const sections = locale === "es" ? [
    {
      id: "privacidad", title: "Política de privacidad",
      body: `### Responsable y alcance
${name} administra este portafolio desde ${location}. Contacto para asuntos de privacidad: ${contact}. Esta política cubre el portafolio; las aplicaciones y sitios enlazados tienen sus propias políticas.

### Datos y finalidades
- **Contacto:** nombre, correo y mensaje para atender tu consulta. Organización o proyecto es opcional. Se registran en Formspree y pueden recibirse en el correo del responsable.
- **Comentarios:** nombre o alias, texto, publicación, fecha y versión del consentimiento, almacenados en Cloudflare D1. Nombre, texto y fecha se muestran públicamente junto a la publicación.
- **Seguridad:** Cloudflare recibe datos técnicos de conexión, como dirección IP, y señales del navegador para alojar el sitio, limitar abusos y verificar comentarios con Turnstile.
- **Rendimiento:** el sitio publicado utiliza Cloudflare Web Analytics para métricas de navegación y rendimiento sin cookies de seguimiento.

Los formularios requieren una autorización expresa, desmarcada por defecto. Si no proporcionas los campos obligatorios o no autorizas el tratamiento, no podrás enviar ese formulario; podrás seguir navegando. No se solicita información sensible ni autorización para publicidad.

### Proveedores y tratamiento internacional
Formspree procesa los mensajes de contacto; Cloudflare presta alojamiento, almacenamiento, seguridad y métricas. Sus servicios pueden tratar datos fuera del Perú. La autorización del formulario comprende el tratamiento descrito por estos proveedores para la finalidad indicada, incluida esa transferencia. Consulta las políticas de [Formspree](https://formspree.io/legal/privacy-policy/) y [Cloudflare](https://www.cloudflare.com/privacypolicy/).

### Conservación
Los mensajes de contacto y los comentarios no tienen una caducidad automática configurada. Los comentarios permanecen almacenados mientras no se eliminen y pueden mostrarse mientras la publicación siga disponible. Puedes solicitar su eliminación o retirar tu consentimiento por correo. Los plazos de registros técnicos y copias de respaldo dependen también de los proveedores; retirar un comentario del sitio no elimina copias que otras personas hayan realizado.

### Tus decisiones
Publica solo información que quieras compartir. Puedes usar un alias en comentarios. Para acceso, corrección, eliminación, oposición o revocación del consentimiento, utiliza el canal de derechos indicado abajo. La revocación no afecta la licitud del tratamiento anterior.

### Marco normativo
Esta información toma como referencia la [Ley N.º 29733](https://www.smv.gob.pe/Uploads/Ley_29733_vigente_2025.pdf) y su [Reglamento, D. S. N.º 016-2024-JUS](https://www.gob.pe/institucion/anpd/normas-legales/6554453-16-2024-jus).`,
    },
    {
      id: "derechos", title: "Tus derechos sobre tus datos",
      body: `Puedes ejercer acceso, rectificación, cancelación y oposición (ARCO), así como revocar tu consentimiento. Escribe a ${contact} con el asunto **Datos personales**, indica qué derecho deseas ejercer y qué mensaje o comentario permite ubicar tus datos. Solo se solicitará información adicional cuando sea necesaria para verificar tu identidad.

Si no recibes atención conforme a la normativa, puedes acudir a la [Autoridad Nacional de Protección de Datos Personales](https://www.gob.pe/anpd).`,
    },
    {
      id: "cookies", title: "Cookies y almacenamiento local",
      body: `- **Idioma:** la cookie **portfolio_locale** conserva tu elección de español o inglés durante un año. Se establece al elegir idioma.
- **Apariencia:** la preferencia **theme** se guarda en el almacenamiento local del navegador, sin caducidad automática, para recordar el modo claro, oscuro o del sistema.
- **Protección:** Cloudflare puede utilizar mecanismos técnicos necesarios para seguridad y verificación. [Más información sobre Turnstile](https://developers.cloudflare.com/turnstile/concepts/privacy/).
- **Métricas:** Cloudflare Web Analytics no utiliza cookies ni almacenamiento local para medir el uso. [Información del proveedor](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/).

Este portafolio no incorpora cookies publicitarias. Puedes borrar cookies y datos locales desde tu navegador; se restablecerán tus preferencias y puede ser necesario repetir verificaciones de seguridad. Las aplicaciones que abras mediante enlaces gestionan su propio almacenamiento.`,
    },
    {
      id: "condiciones", title: "Condiciones de uso",
      body: `### Un portafolio para conocer el trabajo
Este sitio presenta proyectos, artículos y canales de contacto de ${name}. Aquí no se procesan compras ni pagos ni se formalizan contratos de servicios. Un mensaje de contacto no constituye por sí mismo una contratación. Las condiciones comerciales, precios y obligaciones se acuerdan en el canal correspondiente.

### Contenido y enlaces
Los textos y trabajos originales están protegidos por derechos de autor, salvo que indiquen una licencia distinta. Las marcas, imágenes y recursos de terceros pertenecen a sus respectivos titulares. El código publicado se rige por la licencia de cada repositorio.

Los enlaces a otras aplicaciones, redes y sitios llevan a servicios con sus propias condiciones, políticas de privacidad y, cuando corresponda, canales de reclamación. Esta política no sustituye las obligaciones de esos servicios.

### Participación
Los comentarios son públicos. No publiques datos sensibles o de terceros sin autorización, spam, amenazas ni contenido ilícito. Los comentarios que vulneren estas condiciones pueden retirarse. Puedes solicitar la revisión o eliminación de tu propio comentario mediante ${contact}.

### Contacto y cambios
Para consultas sobre el portafolio o sus contenidos, escribe a ${contact}. Las actualizaciones se publicarán aquí con su fecha. Estas condiciones se interpretan conforme a la legislación peruana, sin limitar derechos reconocidos por ley.`,
    },
  ] : [
    {
      id: "privacidad", title: "Privacy policy",
      body: `### Controller and scope
${name} operates this portfolio from ${location}. Privacy contact: ${contact}. This policy covers the portfolio; linked applications and websites have their own policies.

### Data and purposes
- **Contact:** name, email and message to answer your inquiry. Organization or project is optional. Submissions are recorded by Formspree and may reach the controller's email.
- **Comments:** name or alias, text, publication, date and consent version, stored in Cloudflare D1. Name, text and date are displayed publicly with the publication.
- **Security:** Cloudflare receives technical connection data, including IP addresses and browser signals, to host the site, limit abuse and verify comments through Turnstile.
- **Performance:** the published site uses Cloudflare Web Analytics for navigation and performance metrics without tracking cookies.

Forms require explicit authorization, unchecked by default. Without mandatory fields or authorization, you cannot submit that form; browsing remains available. Sensitive information and advertising authorization are not requested.

### Providers and international processing
Formspree processes contact messages; Cloudflare provides hosting, storage, security and metrics. Their services may process data outside Peru. Form authorization covers the described processing by these providers for the stated purpose, including this transfer. Read the [Formspree](https://formspree.io/legal/privacy-policy/) and [Cloudflare](https://www.cloudflare.com/privacypolicy/) policies.

### Retention
Contact messages and comments have no configured automatic expiration. Comments remain stored until deleted and may be displayed while their publication is available. You can request deletion or withdraw consent by email. Technical logs and backup retention also depend on providers; removing a comment cannot remove copies made by other people.

### Your choices
Only publish information you want to share. You can use an alias in comments. Use the data-rights contact below for access, correction, deletion, objection or consent withdrawal. Withdrawal does not affect the lawfulness of prior processing.

### Legal framework
This notice refers to Peru's [Law No. 29733](https://www.smv.gob.pe/Uploads/Ley_29733_vigente_2025.pdf) and its [Regulation, Supreme Decree No. 016-2024-JUS](https://www.gob.pe/institucion/anpd/normas-legales/6554453-16-2024-jus).`,
    },
    {
      id: "derechos", title: "Your data rights",
      body: `You can exercise access, rectification, cancellation and opposition rights (ARCO), and withdraw consent. Email ${contact} with the subject **Personal data**, state your request and identify the message or comment containing your data. Additional information will only be requested when necessary to verify your identity.

If your request is not handled in accordance with the law, you may contact Peru's [National Authority for Personal Data Protection](https://www.gob.pe/anpd).`,
    },
    {
      id: "cookies", title: "Cookies and local storage",
      body: `- **Language:** the **portfolio_locale** cookie remembers your Spanish or English choice for one year. It is set when you choose a language.
- **Appearance:** the **theme** preference is stored locally in your browser, without automatic expiration, to remember light, dark or system mode.
- **Protection:** Cloudflare may use technical mechanisms required for security and verification. [About Turnstile](https://developers.cloudflare.com/turnstile/concepts/privacy/).
- **Metrics:** Cloudflare Web Analytics does not use cookies or local storage to measure usage. [Provider information](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/).

This portfolio does not include advertising cookies. You can remove cookies and local data through your browser; preferences will reset and security checks may need to be repeated. Linked applications manage their own storage.`,
    },
    {
      id: "condiciones", title: "Terms of use",
      body: `### A portfolio to explore the work
This site presents ${name}'s projects, articles and contact channels. It does not process purchases or payments or conclude service contracts. A contact message alone does not create a contract. Commercial terms, prices and obligations are agreed through the relevant channel.

### Content and links
Original texts and work are protected by copyright unless a different license is stated. Third-party brands, images and assets belong to their owners. Published source code follows each repository's license.

Links to applications, social networks and websites lead to services with their own terms, privacy policies and, where applicable, complaint channels. This policy does not replace those services' obligations.

### Participation
Comments are public. Do not publish sensitive or unauthorized third-party data, spam, threats or unlawful content. Comments violating these terms may be removed. You can request review or deletion of your own comment through ${contact}.

### Contact and changes
For questions about this portfolio or its content, email ${contact}. Updates will be published here with their date. These terms are interpreted under Peruvian law without limiting statutory rights.`,
    },
  ];

  useEffect(() => {
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, [hash, locale]);

  return (
    <Container maxW="5xl" py={{ base: "12", md: "20" }}>
      <Stack gap="5" mb="10">
        <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-.03em" lineHeight="1.05">{copy.legal.title}</Heading>
        <Text color="app.muted" fontSize="lg">{copy.legal.intro}</Text>
        <Text color="app.muted" fontSize="sm">{copy.legal.updated}: <time dateTime={PRIVACY_POLICY_VERSION}>{new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-PE", { dateStyle: "long", timeZone: "America/Lima" }).format(new Date(`${PRIVACY_POLICY_VERSION}T12:00:00-05:00`))}</time></Text>
        <HStack as="nav" aria-label={copy.footer.legal} gap="2" flexWrap="wrap">
          {sections.map((section) => <ContentLink key={section.id} to={`/legal#${section.id}`} className="legal-section-link">{section.title}</ContentLink>)}
        </HStack>
      </Stack>
      <Stack gap="12">
        {sections.map((section) => <Box as="section" key={section.id} id={section.id} scrollMarginTop="7rem" borderTopWidth="1px" borderColor="app.border" pt="8"><Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} mb="6">{section.title}</Heading><MarkdownBody>{section.body}</MarkdownBody></Box>)}
      </Stack>
    </Container>
  );
}

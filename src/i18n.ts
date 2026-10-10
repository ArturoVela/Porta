import { DEV_COPY } from "./lib/dev";

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export type RouteName = "home" | "projects" | "project" | "allProjects" | "profile" | "articles" | "article" | "contact" | "legal" | "dev";

const routes: Record<Locale, Record<RouteName, string>> = {
  es: {
    home: "/es/",
    projects: "/es/proyectos",
    project: "/es/proyectos/:slug",
    allProjects: "/es/todos",
    profile: "/es/perfil",
    articles: "/es/articulos",
    article: "/es/articulos/:slug",
    contact: "/es/contacto",
    legal: "/es/legal",
    dev: "/dev",
  },
  en: {
    home: "/en/",
    projects: "/en/projects",
    project: "/en/projects/:slug",
    allProjects: "/en/all",
    profile: "/en/profile",
    articles: "/en/articles",
    article: "/en/articles/:slug",
    contact: "/en/contact",
    legal: "/en/legal",
    dev: "/en/dev",
  },
};

const unprefixedRoutes: Record<string, RouteName> = {
  "/": "home",
  "/proyectos": "projects",
  "/all": "allProjects",
  "/perfil": "profile",
  "/articulos": "articles",
  "/contacto": "contact",
  "/legal": "legal",
};

export interface RouteMatch {
  locale: Locale;
  name: RouteName;
  slug?: string;
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "es" || value === "en";
}

export function localeFromPath(pathname: string): Locale | null {
  const value = pathname.split("/")[1];
  return isLocale(value) ? value : null;
}

export function routePath(locale: Locale, name: RouteName, slug?: string) {
  const template = routes[locale][name];
  return slug ? template.replace(":slug", encodeURIComponent(slug)) : template;
}

export function matchLocalizedRoute(pathname: string): RouteMatch | null {
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (normalized === "/dev") return { locale: "es", name: "dev" };
  const locale = localeFromPath(normalized);
  if (!locale) return null;
  for (const name of ["home", "projects", "allProjects", "profile", "articles", "contact", "legal", "dev"] as const) {
    const candidate = routes[locale][name].replace(/\/$/, "") || "/";
    if (normalized === candidate) return { locale, name };
  }
  for (const name of ["project", "article"] as const) {
    const prefix = routes[locale][name].split(":slug")[0];
    if (normalized.startsWith(prefix) && normalized.slice(prefix.length) && !normalized.slice(prefix.length).includes("/")) {
      try { return { locale, name, slug: decodeURIComponent(normalized.slice(prefix.length)) }; }
      catch { return null; }
    }
  }
  return null;
}

export function localizedPath(path: string, locale: Locale) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const suffixIndex = path.search(/[?#]/);
  const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : path.slice(suffixIndex);
  const match = matchLocalizedRoute(pathname);
  if (match) return `${routePath(locale, match.name, match.slug)}${suffix}`;
  const direct = unprefixedRoutes[pathname];
  if (direct) return `${routePath(locale, direct)}${suffix}`;
  const projectSlug = pathname.match(/^\/proyectos\/([^/]+)$/)?.[1];
  if (projectSlug) return `${routePath(locale, "project", decodeURIComponent(projectSlug))}${suffix}`;
  const articleSlug = pathname.match(/^\/articulos\/([^/]+)$/)?.[1];
  if (articleSlug) return `${routePath(locale, "article", decodeURIComponent(articleSlug))}${suffix}`;
  return path;
}

export function localeCookie(locale: Locale) {
  return `portfolio_locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
}

export function preferredLocale(cookie: string | null, acceptLanguage: string | null): Locale {
  const cookieLocale = cookie?.match(/(?:^|;\s*)portfolio_locale=(es|en)(?:;|$)/)?.[1];
  if (isLocale(cookieLocale)) return cookieLocale;
  const firstSupported = acceptLanguage
    ?.split(",")
    .map((entry) => entry.trim().split(";")[0]?.split("-")[0]?.toLowerCase())
    .find(isLocale);
  return firstSupported ?? "es";
}

export const COPY = {
  es: {
    dev: DEV_COPY.es,
    common: { loading: "Cargando contenido…", skip: "Saltar al contenido", talk: "Hablemos", language: "Idioma", spanish: "Español", english: "English", brandSubtitle: "Producto e ingeniería web", cv: "CV" },
    nav: { projects: "Proyectos", profile: "Perfil", articles: "Artículos", linktree: "Tarjetero" },
    footer: { headline: "Productos digitales claros, seguros y mantenibles.", built: "Construido desde", explore: "Explora", connect: "Conecta", legal: "Información legal", privacy: "Privacidad", cookies: "Cookies", terms: "Condiciones de uso", rights: "Derechos ARCO", scope: "Portafolio personal. Cada aplicación enlazada tiene sus propias condiciones.", copyright: "Contenido propio protegido. Marcas y recursos de terceros pertenecen a sus titulares." },
    legal: { title: "Privacidad y condiciones de uso", intro: "Cómo se tratan tus datos y qué condiciones se aplican a este portafolio.", updated: "Última actualización", consent: "He leído la política de privacidad y autorizo el tratamiento descrito para esta finalidad.", contactNotice: "Nombre, correo y mensaje se envían mediante Formspree para responder tu consulta. Organización es opcional. Los proveedores pueden tratar datos fuera del Perú.", commentNotice: "Tu nombre y comentario serán públicos. Cloudflare verifica el envío y almacena el comentario; puede tratar datos fuera del Perú. Puedes usar un alias. No incluyas datos sensibles.", privacyLink: "Leer política de privacidad" },
    preview: "Vista previa privada · los cambios aún no están publicados",
    theme: { change: "Cambiar tema", light: "Cambiar a modo claro", dark: "Cambiar a modo oscuro" },
    menu: { open: "Abrir navegación", close: "Cerrar navegación" },
    home: {
      heroHeadline: "Convierto procesos complejos en productos web claros y mantenibles.",
      heroIntro: "Ayudo a empresas y equipos a diseñar y construir aplicaciones, sistemas internos y experiencias digitales que simplifican su trabajo.",
      heroCases: "Ver casos de estudio", heroContact: "Hablemos",
      carousel: "Productos públicos destacados", previousProduct: "Producto anterior", nextProduct: "Siguiente producto", productPosition: "de", brandImage: "Imagen de marca", imageUnavailable: "Imagen no disponible",
      projectsLabel: "Trabajo seleccionado", projectsTitle: "Tres casos, tres problemas reales", projectsDescription: "Sistemas construidos desde procesos, datos y necesidades concretas.", allProjects: "Ver todos los proyectos",
      processLabel: "Proceso", processTitle: "Entender antes de construir", processDescription: "Trabajo desde el problema hasta una entrega comprobable.",
      processSteps: [{ title: "Entender", description: "Mapear personas, proceso y restricciones." }, { title: "Construir", description: "Resolver el flujo principal con una arquitectura proporcionada." }, { title: "Verificar", description: "Probar comportamiento, accesibilidad y despliegue." }],
      servicesLabel: "Servicios", servicesTitle: "Producto e ingeniería en un mismo proceso", servicesDescription: "Diseño y desarrollo de productos web, sistemas internos e interfaces mantenibles.",
      ctaLabel: "¿Tienes un proceso complejo?", ctaTitle: "Convirtámoslo en un producto claro.", ctaDescription: "Cuéntame qué ocurre hoy, a quién afecta y qué resultado necesitas.", ctaButton: "Hablemos de tu proyecto",
    },
    project: { back: "Volver a proyectos", role: "Rol", restrictedOpen: "Abrir acceso", openProject: "Abrir proyecto", code: "Código", technology: "Tecnología", scope: "Resultados y alcance", screens: "Pantallas de", ctaTitle: "¿Necesitas simplificar un proceso parecido?", ctaDescription: "Cuéntame qué ocurre hoy, a quién afecta y qué resultado necesitas.", ctaButton: "Hablemos de tu proyecto", next: "Siguiente lectura" },
    cards: { viewCase: "Ver caso completo" },
    projects: { title: "Proyectos", description: "Productos propios, trabajo para clientes y experimentos donde cada decisión técnica responde a una necesidad concreta.", featured: "Trabajo destacado", moreTitle: "Más proyectos", moreDescription: "Explora el resto del trabajo por nombre, tecnología o disponibilidad de una demo.", searchAria: "Buscar en los demás proyectos", searchPlaceholder: "Buscar proyecto o tecnología", filterAria: "Filtrar por disponibilidad de demo", filterAll: "Todos", filterPublic: "Con demo pública", filterOther: "Sin demo pública", singular: "proyecto", plural: "proyectos", emptyTitle: "No hay proyectos con esos filtros.", emptyDescription: "Prueba otra búsqueda o selecciona «Todos»." },
    articles: { title: "Artículos", description: "Notas sobre investigación, producto, comunidades y las decisiones que aparecen mientras construyo.", back: "Volver a artículos", reading: "min de lectura" },
    contact: { title: "Cuéntame tu proyecto", formTitle: "Cuéntame qué necesitas resolver", formIntro: "Basta con contar qué ocurre, a quién afecta y qué te gustaría lograr. No necesitas traer una solución definida.", name: "Nombre", email: "Correo", organization: "Organización o proyecto", context: "Contexto", placeholder: "Qué ocurre hoy, a quién afecta y qué te gustaría mejorar.", submit: "Enviar mensaje", sending: "Enviando mensaje…", successTitle: "Mensaje enviado", success: "Gracias por compartir el contexto. Te responderé por correo.", error: "No se pudo enviar el mensaje. Revisa los campos e inténtalo otra vez, o escríbeme por correo.", copyEmail: "Copiar correo", copied: "Correo copiado.", copyBlocked: "No se pudo copiar. Selecciona el correo para copiarlo o abre el enlace." },
    profile: { title: "Ingeniería con criterio de producto", cv: "Ver mi CV", cvAvailable: "Disponible en cv.velaarturo.com", experience: "Experiencia", work: "Forma de trabajar", experienceItems: [["Productos propios", "Diseño y desarrollo de aplicaciones sobre React, Vite y Cloudflare."], ["Sistemas para operación", "Herramientas de ventas, inventario, información y automatización."], ["Comunidades digitales", "Configuración, permisos, moderación y acompañamiento en Discord."]], workItems: [["Entender", "Mapear la necesidad, las personas y las restricciones antes de elegir tecnología."], ["Construir", "Resolver el flujo principal con una interfaz accesible y una arquitectura proporcionada."], ["Verificar", "Probar comportamiento, rendimiento y despliegue con evidencia reproducible."]] },
    allProjects: { title: "Todos los proyectos", intro: "Un acceso rápido a cada proyecto, sin recorrer el portafolio.", total: "en total", search: "Buscar proyectos", placeholder: "Buscar por nombre, tipo o tecnología", openRestricted: "Abrir acceso", open: "Abrir proyecto", detail: "Ver ficha", empty: "No hay proyectos con esa búsqueda. Prueba otro nombre o tecnología." },
    comments: { title: "Conversación", name: "Nombre", comment: "Comentario", unavailable: "Los comentarios no están disponibles en este momento.", publishError: "No se pudo publicar el comentario.", published: "Comentario publicado.", configure: "Configura la clave pública de Turnstile para habilitar nuevos comentarios.", publish: "Publicar comentario", loading: "Cargando comentarios…", empty: "Todavía no hay comentarios. Puedes iniciar la conversación." },
    notFound: { eyebrow: "404 · Ruta no encontrada", title: "Esta parte del sistema no existe.", description: "Puedes volver al inicio o revisar los proyectos publicados.", action: "Volver al inicio" },
  },
  en: {
    dev: DEV_COPY.en,
    common: { loading: "Loading content…", skip: "Skip to content", talk: "Let's talk", language: "Language", spanish: "Español", english: "English", brandSubtitle: "Product and web engineering", cv: "CV" },
    nav: { projects: "Projects", profile: "Profile", articles: "Articles", linktree: "Wallet" },
    footer: { headline: "Clear, secure, maintainable digital products.", built: "Built from", explore: "Explore", connect: "Connect", legal: "Legal information", privacy: "Privacy", cookies: "Cookies", terms: "Terms of use", rights: "Data rights", scope: "Personal portfolio. Each linked application has its own terms.", copyright: "Original content is protected. Third-party brands and assets belong to their owners." },
    legal: { title: "Privacy and terms of use", intro: "How your data is handled and which terms apply to this portfolio.", updated: "Last updated", consent: "I have read the privacy policy and authorize the processing described for this purpose.", contactNotice: "Name, email and message are sent through Formspree to answer your inquiry. Organization is optional. Providers may process data outside Peru.", commentNotice: "Your name and comment will be public. Cloudflare verifies submissions and stores comments; it may process data outside Peru. You can use an alias. Do not include sensitive data.", privacyLink: "Read privacy policy" },
    preview: "Private preview · changes have not been published yet",
    theme: { change: "Change theme", light: "Switch to light mode", dark: "Switch to dark mode" },
    menu: { open: "Open navigation", close: "Close navigation" },
    home: {
      heroHeadline: "I turn complex processes into clear, maintainable web products.",
      heroIntro: "I help companies and teams design and build applications, internal systems, and digital experiences that make their work simpler.",
      heroCases: "View case studies", heroContact: "Let's talk",
      carousel: "Featured public products", previousProduct: "Previous product", nextProduct: "Next product", productPosition: "of", brandImage: "Brand image", imageUnavailable: "Image unavailable",
      projectsLabel: "Selected work", projectsTitle: "Three cases, three real problems", projectsDescription: "Systems built around concrete processes, data, and needs.", allProjects: "View all projects",
      processLabel: "Process", processTitle: "Understand before building", processDescription: "I work from problem discovery to a verifiable delivery.",
      processSteps: [{ title: "Understand", description: "Map people, process, and constraints." }, { title: "Build", description: "Solve the core flow with a proportionate architecture." }, { title: "Verify", description: "Test behavior, accessibility, and deployment." }],
      servicesLabel: "Services", servicesTitle: "Product and engineering in one process", servicesDescription: "Design and development for web products, internal systems, and maintainable interfaces.",
      ctaLabel: "Facing a complex process?", ctaTitle: "Let's turn it into a clear product.", ctaDescription: "Tell me what happens today, who it affects, and the result you need.", ctaButton: "Let's discuss your project",
    },
    project: { back: "Back to projects", role: "Role", restrictedOpen: "Open access", openProject: "Open project", code: "Code", technology: "Technology", scope: "Results and scope", screens: "Screens from", ctaTitle: "Need to simplify a similar process?", ctaDescription: "Tell me what happens today, who it affects, and the result you need.", ctaButton: "Let's discuss your project", next: "Next case" },
    cards: { viewCase: "View full case" },
    projects: { title: "Projects", description: "Independent products, client work, and experiments where every technical decision answers a concrete need.", featured: "Featured work", moreTitle: "More projects", moreDescription: "Explore the rest of the work by name, technology, or public demo availability.", searchAria: "Search other projects", searchPlaceholder: "Search project or technology", filterAria: "Filter by demo availability", filterAll: "All", filterPublic: "Public demo", filterOther: "No public demo", singular: "project", plural: "projects", emptyTitle: "No projects match these filters.", emptyDescription: "Try another search or select “All”." },
    articles: { title: "Articles", description: "Notes on research, product work, communities, and decisions that surface while building.", back: "Back to articles", reading: "min read" },
    contact: { title: "Tell me about your project", formTitle: "Tell me what you need to solve", formIntro: "Describe what happens, who it affects, and what you want to achieve. You do not need to bring a predefined solution.", name: "Name", email: "Email", organization: "Organization or project", context: "Context", placeholder: "What happens today, who does it affect, and what would you like to improve?", submit: "Send message", sending: "Sending message…", successTitle: "Message sent", success: "Thanks for sharing the context. I will reply by email.", error: "Could not send the message. Check the fields and try again, or email me directly.", copyEmail: "Copy email", copied: "Email copied.", copyBlocked: "Could not copy. Select the email to copy it or open the link." },
    profile: { title: "Engineering guided by product thinking", cv: "View my CV", cvAvailable: "Available at cv.velaarturo.com", experience: "Experience", work: "How I work", experienceItems: [["Independent products", "Design and development of applications on React, Vite, and Cloudflare."], ["Operational systems", "Sales, inventory, information, and automation tools."], ["Digital communities", "Discord setup, permissions, moderation, and support."]], workItems: [["Understand", "Map the need, people, and constraints before choosing technology."], ["Build", "Solve the core flow with an accessible interface and proportionate architecture."], ["Verify", "Test behavior, performance, and deployment with reproducible evidence."]] },
    allProjects: { title: "All projects", intro: "Quick access to every project without walking through the portfolio.", total: "total", search: "Search projects", placeholder: "Search by name, type, or technology", openRestricted: "Open access", open: "Open project", detail: "View details", empty: "No projects match that search. Try another name or technology." },
    comments: { title: "Conversation", name: "Name", comment: "Comment", unavailable: "Comments are not available right now.", publishError: "The comment could not be published.", published: "Comment published.", configure: "Configure the Turnstile site key to enable new comments.", publish: "Publish comment", loading: "Loading comments…", empty: "No comments yet. You can start the conversation." },
    notFound: { eyebrow: "404 · Page not found", title: "This part of the site does not exist.", description: "Return home or browse published projects.", action: "Back home" },
  },
} as const;

export type LocaleCopy = (typeof COPY)[Locale];

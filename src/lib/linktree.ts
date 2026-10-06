export interface WalletProject {
  id: string;
  name: string;
  domain: string;
  image?: string;
  color: string;
  description: string;
  features: string[];
  caseSlug?: string;
  private?: boolean;
}

const pass = (file: string) => `/assets/images/pases-webs/${file}.png`;

// Backgrounds sampled from the supplied passes; header, artwork and detail share one palette.
export const WALLET_PROJECTS: WalletProject[] = [
  { id: "torneo", name: "Torneo", domain: "torneo.velaarturo.com", image: pass("01-torneo"), color: "#192640", description: "Forma equipos equilibrados, organiza torneos y comparte calendarios y resultados sin crear cuentas.", features: ["Equipos equilibrados por nivel y posición", "Llaves y calendarios de todos contra todos", "Enlaces separados para consultar y organizar"] },
  { id: "textos", name: "Textos", domain: "textos.velaarturo.com", image: pass("02-textos"), color: "#3356c8", description: "Una mesa de trabajo para contar, transformar, ordenar y comparar textos directamente en tu navegador.", features: ["Conteo de palabras y caracteres", "Limpieza de texto y listas", "Comparación de versiones y generación Lorem"] },
  { id: "color", name: "Color", domain: "color.velaarturo.com", image: pass("03-color"), color: "#2e58d7", caseSlug: "color", description: "Explora, combina y convierte colores, paletas y gradientes en un estudio cromático local.", features: ["Selector, armonías y mezclas", "Contraste y conversión de colores", "Extracción de paletas desde imágenes"] },
  { id: "cotiza", name: "Cotiza", domain: "cotiza.velaarturo.com", image: pass("04-cotiza"), color: "#1b3c5e", caseSlug: "cotiza", description: "Crea cotizaciones profesionales y borradores de contratos con exportación PDF.", features: ["Conceptos, descuentos e impuestos", "Cotizaciones y contratos editables", "Documentos PDF y enlaces para compartir"] },
  { id: "cuando", name: "Cuando", domain: "cuando.velaarturo.com", image: pass("05-cuando"), color: "#334ebb", caseSlug: "cuando", description: "Encuentra una fecha en común con encuestas de disponibilidad, sin cuentas.", features: ["Fechas y zonas horarias", "Respuestas Sí, Tal vez y No", "Invitación y organización por enlace"] },
  { id: "foto", name: "Foto", domain: "foto.velaarturo.com", image: pass("06-foto"), color: "#1e1f23", caseSlug: "foto", description: "Comprime, recorta y convierte imágenes por lotes sin sacarlas del dispositivo.", features: ["Conversión JPG, PNG y WebP", "Redimensionado y recorte", "Comparación antes de descargar"] },
  { id: "pdf", name: "PDF", domain: "pdf.velaarturo.com", image: pass("07-pdf"), color: "#1c344d", caseSlug: "pdf", description: "Organiza y transforma documentos PDF directamente en el navegador.", features: ["Unir, separar y rotar páginas", "Convertir imágenes y documentos", "Procesamiento local de archivos"] },
  { id: "qr", name: "QR", domain: "qr.velaarturo.com", image: pass("08-qr"), color: "#3b66e0", caseSlug: "qr", description: "Genera, personaliza y lee códigos QR con procesamiento local.", features: ["QR para enlaces, contactos y otros contenidos", "Personalización y exportación PNG o SVG", "Verificación y lectura local"] },
  { id: "horas", name: "Horas", domain: "horas.velaarturo.com", image: pass("09-horas"), color: "#1b2740", caseSlug: "horas", description: "Compara zonas horarias y encuentra horarios de trabajo en común.", features: ["Comparación entre ciudades", "Coincidencias laborales", "Instantes compartibles por enlace"] },
  { id: "llevamos", name: "Llevamos", domain: "llevamos.velaarturo.com", image: pass("10-llevamos"), color: "#1d4234", caseSlug: "llevamos", description: "Organiza lo que aporta cada persona a una reunión, sin cuentas ni contraseñas.", features: ["Listas de comida, bebidas y responsabilidades", "Invitaciones para participar", "Progreso compartido de la reunión"] },
  { id: "ruleta", name: "Ruleta", domain: "ruleta.velaarturo.com", image: pass("11-ruleta"), color: "#241c47", caseSlug: "ruleta", description: "Decide entre opciones con una ruleta personalizable, local o compartida.", features: ["Opciones y pesos configurables", "Uno o varios ganadores", "Sesiones compartibles e historial"] },
  { id: "explora", name: "Explora", domain: "explora.velaarturo.com", image: pass("12-explora"), color: "#214a3c", caseSlug: "explora-san-martin", description: "Descubre San Martín con un mapa turístico, fichas de lugares y pasaporte personal.", features: ["Mapa y búsqueda de destinos", "Fichas con fuentes verificables", "Pasaporte de visitas"] },
  { id: "coffee", name: "Cafetero · Coffee", domain: "cafetero.velaarturo.com", image: pass("13-coffee"), color: "#31281d", caseSlug: "coffee", description: "Descubre cafeterías del Perú y lleva un pasaporte de tus visitas.", features: ["Directorio de cafeterías", "Mapa y fichas de locales", "Pasaporte personal de visitas"] },
  { id: "formularios", name: "Formularios", domain: "formularios.velaarturo.com", image: pass("14-formularios"), color: "#375474", description: "Crea registros, encuestas y solicitudes a tu ritmo, sin cuentas.", features: ["Editor y vista previa de formularios", "Borradores guardados en el navegador", "Publicación y respaldo JSON"] },
  { id: "divide", name: "Divide", domain: "divide.velaarturo.com", color: "#087f78", description: "Reparte los gastos de una comida, un viaje o la casa y encuentra quién le debe a quién.", features: ["División rápida o grupos compartidos", "Aportes y pagos en una misma cuenta", "Soles y dólares, sin registros"] },
  { id: "un-ramito", name: "Un ramito", domain: "un-ramito.velaarturo.com", image: pass("15-un-ramito"), color: "#2a5042", caseSlug: "un-ramito", description: "Crea un ramo virtual y compártelo con una dedicatoria privada.", features: ["Ramos personalizados", "Dedicatorias cifradas", "Enlaces privados para compartir"] },
  { id: "hub", name: "Hub", domain: "hub.velaarturo.com", image: pass("16-hub"), color: "#3452ca", caseSlug: "hub", description: "Herramientas de cálculo, texto, diseño y productividad reunidas en un mismo lugar.", features: ["Catálogo de utilidades cotidianas", "Búsqueda por herramienta", "Procesamiento local cuando es posible"] },
  { id: "cv", name: "CV", domain: "cv.velaarturo.com", image: pass("17-cv"), color: "#242425", description: "Mi trayectoria profesional: experiencia, formación y trabajo en producto e ingeniería web.", features: ["Experiencia profesional", "Formación y habilidades", "Información de contacto"] },
  { id: "brain", name: "Second Brain", domain: "brain.velaarturo.com", image: pass("brain-750x288"), color: "#0c0d11", caseSlug: "second-brain", private: true, description: "Mi espacio personal para capturar, conectar y revisar información, tareas, archivos y proyectos.", features: ["Captura y búsqueda de información", "Tareas, calendario y revisión", "Archivos y contenidos relacionados"] },
  { id: "principal", name: "Arturo Vela", domain: "velaarturo.com", image: pass("18-principal"), color: "#2852ef", caseSlug: "porta", description: "Mi portafolio: proyectos, artículos y experiencias entre producto, interfaz e ingeniería.", features: ["Casos de estudio", "Artículos e investigación", "Perfil y contacto"] },
  { id: "finanzas", name: "Finanzas", domain: "finanzas.velaarturo.com", image: pass("19-finanzas"), color: "#1b4438", description: "Organiza cuentas, movimientos y metas para ti y tu hogar.", features: ["Ingresos, gastos y transferencias", "Presupuestos y metas", "Espacios personales y compartidos"] },
  { id: "ventas", name: "Vela Ventas", domain: "ventas.velaarturo.com", image: pass("20-ventas"), color: "#2e6d76", description: "Ventas, compras, inventario por sucursal y caja diaria para comercios peruanos.", features: ["Ventas y compras conectadas al stock", "Control de caja por sucursal", "Reportes y trazabilidad de movimientos"] },
  { id: "agua", name: "AquaVigía", domain: "agua.velaarturo.com", image: pass("21-agua"), color: "#173f47", private: true, description: "AquaVigía. Plataforma de agua con acceso a datos reservado a cuentas autorizadas.", features: ["Acceso con cuenta", "Consulta de datos según autorización"] },
  { id: "agro", name: "Agro Vela", domain: "agro.velaarturo.com", image: pass("22-agro"), color: "#336244", private: true, description: "Tu campo, tus cuentas. Espacio de Agro Vela protegido con acceso privado.", features: ["Espacio de trabajo agrícola", "Acceso protegido"] },
  { id: "bc", name: "Vela Entradas", domain: "bc.velaarturo.com", image: pass("bc-750x288"), color: "#315745", description: "Encuentra eventos y entradas digitales; una plataforma para asistentes y organizadores.", features: ["Cartelera de eventos", "Entradas digitales", "Herramientas para organizadores"] },
];

export const WALLET_COLLECTIONS = [
  { id: "proyectos", name: "Proyectos", projects: ["torneo", "textos", "color", "cotiza", "cuando", "foto", "pdf", "qr", "horas", "llevamos", "ruleta", "explora", "coffee", "formularios", "divide", "un-ramito", "hub", "cv"] },
  { id: "personal", name: "Personal", projects: ["brain", "hub", "cv"] },
  { id: "principal", name: "Principal", projects: ["principal"] },
  { id: "saas", name: "SaaS", projects: ["finanzas", "ventas", "agua", "agro", "bc"] },
];

export function walletCollections(query: string, collection = "todas") {
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
  const search = normalize(query.trim());
  return WALLET_COLLECTIONS.filter((group) => collection === "todas" || group.id === collection)
    .map((group) => ({ ...group, projects: group.projects.map((id) => WALLET_PROJECTS.find((project) => project.id === id)!)
      .filter((project) => !search || normalize([project.name, project.domain, project.description, ...project.features].join(" ")).includes(search)) }))
    .filter((group) => group.projects.length);
}

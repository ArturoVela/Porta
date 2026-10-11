export const WORK_ROLE = "Área de Sistemas";

export type WorkCompany = {
  name: string;
  path: string;
  email: string;
  systemsEmail?: string;
  marketingEmail?: string;
  website?: string;
  logo: string;
  darkLogo: string;
  portrait: { src: string; width: number; height: number; srcSet: string };
  accent: string;
  accentText?: string;
  role: string;
  subtitle: string;
  description: string;
  period: string;
  current: boolean;
  projects?: readonly { title: string; description: string; url: string }[];
  contributions?: readonly string[];
  socialSupport?: string;
  marketingActivities?: readonly { title: string; date: string; role: "Responsable" | "Corresponsable" }[];
};

export const WORK_COMPANIES = {
  agromaf: {
    name: "Cía. Agromaf",
    path: "/work/agromaf",
    email: "arturo.vela@agromaf.pe",
    systemsEmail: "sistemas@agromaf.pe",
    website: "https://agromaf.pe",
    logo: "/assets/images/logo/work-agromaf-light.png",
    darkLogo: "/assets/images/logo/work-agromaf-dark.png",
    portrait: { src: "/assets/images/Me/Fototrabajo-agromaf.jpg", width: 1086, height: 1448, srcSet: "/assets/images/Me/Fototrabajo-agromaf-480.jpg 480w, /assets/images/Me/Fototrabajo-agromaf.jpg 1086w" },
    accent: "#63A437",
    role: WORK_ROLE,
    subtitle: "Apoyo en marketing digital",
    description: "Trabajo en el área de Sistemas de Cía. Agromaf y apoyo en marketing digital.",
    period: "Agosto de 2025 — actualidad",
    current: true,
  },
  nieto: {
    name: "Nieto Import",
    path: "/work/nieto",
    email: "arturo.vela@nietoimport.com",
    systemsEmail: "sistemas@nietoimport.com",
    marketingEmail: "marketing@nietoimport.com",
    website: "https://nietoimport.com",
    logo: "/assets/images/logo/Logo Nieto Import.png",
    darkLogo: "/assets/images/logo/Logo Nieto Import Blanco.png",
    portrait: { src: "/assets/images/Me/Fototrabajo-nieto.jpg", width: 1086, height: 1448, srcSet: "/assets/images/Me/Fototrabajo-nieto-480.jpg 480w, /assets/images/Me/Fototrabajo-nieto.jpg 1086w" },
    accent: "#EF6800",
    role: WORK_ROLE,
    subtitle: "Apoyo en marketing digital",
    description: "Trabajo en el área de Sistemas de Nieto Import y apoyo en marketing digital.",
    period: "Agosto de 2025 — actualidad",
    current: true,
    socialSupport: "Apoyo en TikTok, Facebook e Instagram.",
    projects: [
      { title: "Portal Nieto · ERP", description: "ERP completo para Nieto Import y Agromaf.", url: "https://portal.nietoimport.com" },
      { title: "NIETO Hub", description: "Hub que reúne las webs y herramientas digitales de Nieto Import.", url: "https://nieto.velaarturo.com" },
      { title: "DB Nieto · BI", description: "Dashboard privado de inteligencia de negocio (BI).", url: "https://db.nieto.velaarturo.com" },
    ],
    marketingActivities: [
      { title: "IV Festival del Café Rioja", date: "2026-09-18", role: "Corresponsable" },
      { title: "Capacitación de Nivel Plata", date: "2026-09-01", role: "Corresponsable" },
      { title: "SANIPALMA 2026", date: "2026-08-22", role: "Corresponsable" },
      { title: "INNOVAGRO Café", date: "2026-07-05", role: "Corresponsable" },
      { title: "Campaña de mantenimiento 2026", date: "2026-02-11", role: "Responsable" },
      { title: "Chocolatada Nueva Cajamarca", date: "2025-12-18", role: "Responsable" },
      { title: "Chocolatada Tarapoto", date: "2025-12-14", role: "Responsable" },
      { title: "I ExpoAgro", date: "2025-11-29", role: "Responsable" },
      { title: "Capacitación a agricultores", date: "2025-11-21", role: "Corresponsable" },
      { title: "Aniversario de empresa 2025", date: "2025-10-20", role: "Corresponsable" },
      { title: "Expo Amazónica", date: "2025-09-03", role: "Corresponsable" },
    ],
  },
  pachas: {
    name: "Pacha’s Café",
    path: "/work/pachas",
    email: "dev@velaarturo.com",
    logo: "/assets/images/logo/work-pachas-light.png",
    darkLogo: "/assets/images/logo/work-pachas-dark.png",
    portrait: { src: "/assets/images/Me/Fototrabajo-pachas.jpg", width: 1086, height: 1448, srcSet: "/assets/images/Me/Fototrabajo-pachas-480.jpg 480w, /assets/images/Me/Fototrabajo-pachas.jpg 1086w" },
    accent: "#255652",
    accentText: "#FFFFFF",
    role: "Desarrollador Web",
    subtitle: "E-commerce y experiencia móvil",
    description: "Desarrollé la web de e-commerce de Pacha’s Café y optimicé su experiencia en dispositivos móviles.",
    period: "Marzo — mayo de 2024 · 3 meses",
    current: false,
    contributions: ["Desarrollo integral de la web de e-commerce para visualizar y vender productos.", "Optimización de la interfaz para dispositivos móviles y apoyo a la presencia digital de la marca."],
  },
  wasky: {
    name: "Caña Wasky",
    path: "/work/wasky",
    email: "dev@velaarturo.com",
    logo: "/assets/images/logo/work-wasky-light.png",
    darkLogo: "/assets/images/logo/work-wasky-dark.png",
    portrait: { src: "/assets/images/Me/Fototrabajo-wasky.jpg", width: 1086, height: 1448, srcSet: "/assets/images/Me/Fototrabajo-wasky-480.jpg 480w, /assets/images/Me/Fototrabajo-wasky.jpg 1086w" },
    accent: "#C7EA95",
    role: "Desarrollador Web",
    subtitle: "E-commerce y experiencia móvil",
    description: "Desarrollé la web de e-commerce de Caña Wasky y optimicé su experiencia en dispositivos móviles.",
    period: "Junio — agosto de 2024 · 3 meses",
    current: false,
    contributions: ["Desarrollo de la web de e-commerce para visualizar y vender productos.", "Optimización de la interfaz para dispositivos móviles y apoyo a la presencia digital de la marca."],
  },
} as const satisfies Record<string, WorkCompany>;

export type WorkCompanyId = keyof typeof WORK_COMPANIES;

export function workCompanyForPath(pathname: string) {
  const normalized = pathname.replace(/\/$/, "");
  return Object.values(WORK_COMPANIES).find((company) => company.path === normalized);
}

export function publicWorkUrl(company: WorkCompany) {
  return `https://velaarturo.com${company.path}`;
}

export function workDescription(company: WorkCompany) {
  return company.description;
}

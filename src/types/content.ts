export interface SeoContent {
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface CoverImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteContent {
  name: string;
  headline: string;
  intro: string;
  availability: string;
  location: string;
  bio: string;
  email: string;
  phone?: string;
  cvUrl?: string;
  socials: SocialLink[];
  seo: Required<Pick<SeoContent, "title" | "description">> & Pick<SeoContent, "ogImage">;
}

export interface ServiceContent {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
}

export interface ProjectContent {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  type: string;
  role: string;
  year: string;
  stack: string[];
  outcomes: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order: number;
  cover?: CoverImage;
  seo: SeoContent;
}

export interface ArticleContent {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
  cover?: CoverImage;
  seo: SeoContent;
}

export interface PortfolioManifest {
  site: SiteContent;
  services: ServiceContent[];
  projects: ProjectContent[];
  articles: ArticleContent[];
}

export interface PortfolioEnvelope<T = PortfolioManifest> {
  schemaVersion: "1";
  siteKey: "velaarturo";
  publishedRevision: number;
  generatedAt: string;
  data: T;
}

export interface PublicComment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

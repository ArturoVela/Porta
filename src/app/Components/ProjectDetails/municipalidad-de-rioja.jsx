"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Constantes reutilizables
const PROJECT = {
  subtitle: "Página Web",
  title: "Sitio Web Oficial - Municipalidad de Rioja",
  client: "Ing. ##### (Universidad)",
  published: "23 Agosto, 2024",
  technology: "HTML, CSS, JavaScript",
  categories: "Gobierno digital, Servicios públicos",
  websiteUrl: "https://muni-rioja.vercel.app/",
};

const ICON_ARROW = "/assets/images/icons/arrow-left-top.svg";
const IMG_MAIN = "/assets/images/portfolio/details-thumb_muni.jpg";
const IMG_FEATURE = "/assets/images/portfolio/portfolio4_1_muni.jpg";
const IMG_RESULTS = "/assets/images/portfolio/details-thumb-2_muni.jpg";

const projectSlugs = [
  { slug: "cana-wasky", label: "1" },
  { slug: "pachas-cafe-web", label: "2" },
  { slug: "municipalidad-de-rioja", label: "3" },
  { slug: "pachas-cafe", label: "4" },
  { slug: "discord", label: "5" },
];

const ProjectDetails = () => {
  const pathname = usePathname(); // ✅ hook dentro del componente

  const currentIndex = projectSlugs.findIndex((item) =>
    pathname.includes(item.slug)
  );
  const prev = currentIndex > 0 ? projectSlugs[currentIndex - 1] : null;
  const next =
    currentIndex < projectSlugs.length - 1
      ? projectSlugs[currentIndex + 1]
      : null;
      
  return (
    <div>
      <section className="breadcumb-wrapper text-center pb-0 bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="sub-title">{PROJECT.subtitle}</span>
              <h2 className="sec-title mb-0">{PROJECT.title}</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="project-details-area space-bottom bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="info-items xs-py-30">
                <li className="item">
                  <span className="title">Cliente:</span>
                  <span className="text">{PROJECT.client}</span>
                </li>
                <li className="item">
                  <span className="title">Publicado:</span>
                  <span className="text">{PROJECT.published}</span>
                </li>
                <li className="item">
                  <span className="title">Tecnología:</span>
                  <span className="text">{PROJECT.technology}</span>
                </li>
                <li className="item">
                  <span className="title">Categorías:</span>
                  <span className="text">{PROJECT.categories}</span>
                </li>
                <li className="btn-wrap mt--20 sm-mt-0">
                  <a
                    className="circle-btn tp-hover-btn btn"
                    href={PROJECT.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link-effect">
                      <span className="effect-1">Visitar Sitio</span>
                      <span className="effect-1">Visitar Sitio</span>
                    </span>
                    <img src={ICON_ARROW} alt="Arrow Icon" />
                    <i className="btn-circle-dot"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row details-thumb">
            <div className="col-xl-12">
              <div className="project-inner-thumb mb-50 wow img-custom-anim-top">
                <Image
                  className="w-100 responsive-img"
                  src={IMG_MAIN}
                  alt="Página principal Municipalidad"
                  width={1320}
                  height={850}
                  loading="lazy"
                  style={{ borderRadius: "20px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          <div className="row justify-content-between">
            {/* Columna izquierda: Resumen y Retos */}
            <div className="col-lg-6">
              <div className="project-area mb-50">
                <h3 className="title mb-20">Resumen del Proyecto</h3>
                <p className="text">
                  Desarrollo de portal web institucional para la Municipalidad Provincial de Rioja (San Martín) incluyendo:
                </p>
                <ul className="challenge-area_list">
                  <li>Diseño responsive y accesible</li>
                  <li>Sección de trámites municipales</li>
                  <li>Plataforma de atención al ciudadano</li>
                  <li>Actualización de noticias y eventos</li>
                </ul>
              </div>

              <div className="challenge-area mb-50">
                <h3 className="title mb-20">Retos Principales</h3>
                <p className="text mb-40">Desafíos técnicos superados:</p>
                <ul className="challenge-area_list">
                  <li>Organización de contenido complejo</li>
                  <li>Accesibilidad WCAG 2.1</li>
                  <li>Integración con sistemas existentes</li>
                </ul>
              </div>
            </div>

            {/* Columna derecha: Características + Imagen */}
            <div className="col-lg-6">
              <div className="project-area mb-50 d-flex flex-column h-100">
                <h3 className="title mb-20">Características</h3>
                <p className="text mb-30">Principales funcionalidades implementadas:</p>
                <ul className="challenge-area_list mb-40">
                  <li>Mapa interactivo de la provincia</li>
                  <li>Formularios digitales para trámites</li>
                  <li>Directorio de autoridades y áreas</li>
                  <li>Sección de transparencia pública</li>
                </ul>
                <div className="feature-thumb mt-auto">
                  <Image
                    src={IMG_FEATURE}
                    alt="Versión móvil del sitio"
                    width={648}
                    height={420}
                    loading="lazy"
                    className="responsive-img"
                    style={{
                      borderRadius: "16px",
                      width: "100%",
                      height: "auto",
                      objectFit: "cover"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="col-lg-12">
              <div className="results-area">
                <h3 className="mb-20">Resultados Obtenidos</h3>
                <p className="text mb-40">Impacto del nuevo portal web:</p>
                <ul className="results-area_list">
                  <li>+150% de visitas mensuales</li>
                  <li>60% reducción en consultas presenciales</li>
                  <li>30% aumento en trámites digitales</li>
                  <li>4.8/5 en satisfacción usuaria</li>
                </ul>
                <figure className="result-thumb mt-60 mb-60">
                  <Image
                    src={IMG_RESULTS}
                    alt="Estadísticas de uso"
                    width={1320}
                    height={850}
                    loading="lazy"
                    className="responsive-img"
                    style={{ borderRadius: "20px", objectFit: "cover" }}
                  />
                </figure>

                    <div className="pagination-nav text-center mt-60">
                    <ul className="pagination-numbers d-inline-flex gap-3 justify-content-center list-unstyled align-items-center flex-wrap">
                      {/* Flecha izquierda */}
                      {prev ? (
                        <li>
                          <Link href={`/project/${prev.slug}`}>
                            <span className="arrow-btn">&lt;</span>
                          </Link>
                        </li>
                      ) : (
                        <li><span className="arrow-btn disabled">&lt;</span></li>
                      )}

                      {/* Números */}
                      {projectSlugs.map((item, i) => (
                        <li key={item.slug}>
                          <Link href={`/project/${item.slug}`}>
                            <span className={`page-number ${i === currentIndex ? "active" : ""}`}>
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      ))}

                      {/* Flecha derecha */}
                      {next ? (
                        <li>
                          <Link href={`/project/${next.slug}`}>
                            <span className="arrow-btn">&gt;</span>
                          </Link>
                        </li>
                      ) : (
                        <li><span className="arrow-btn disabled">&gt;</span></li>
                      )}
                    </ul>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

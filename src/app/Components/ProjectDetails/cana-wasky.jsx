"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Constantes reutilizables
const PROJECT_TITLE = "Sistema de Ventas para Caña Wasky";
const PROJECT_SUBTITLE = "Sistema de ventas";
const CLIENT_NAME = "Freddy Reamirez - Karlita Alberca";
const PUBLISH_DATE = "25 Marzo, 2023";
const TECHNOLOGY_USED = "Excel";
const CATEGORIES = "Sistema de ventas, Gestión de Inventarios";

// Imágenes
const IMG_COVER = "/assets/images/portfolio/details-thumb_cana.jpg";
const IMG_SIDE = "/assets/images/portfolio/portfolio4_1_cana.jpg";
const IMG_RESULTS = "/assets/images/portfolio/details-thumb-2_cana.jpg";

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
              <span className="sub-title">{PROJECT_SUBTITLE}</span>
              <h2 className="sec-title mb-0">{PROJECT_TITLE}</h2>
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
                  <span className="text">{CLIENT_NAME}</span>
                </li>
                <li className="item">
                  <span className="title">Publicado:</span>
                  <span className="text">{PUBLISH_DATE}</span>
                </li>
                <li className="item">
                  <span className="title">Tecnología:</span>
                  <span className="text">{TECHNOLOGY_USED}</span>
                </li>
                <li className="item">
                  <span className="title">Categorías:</span>
                  <span className="text">{CATEGORIES}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="row details-thumb">
            <div className="col-xl-12">
              <div className="project-inner-thumb mb-50 wow img-custom-anim-top">
                <Image
                  className="w-100 responsive-img"
                  src={IMG_COVER}
                  alt="Dashboard Caña Wasky"
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
                  Desarrollo de un sistema integral de gestión comercial para la cadena de restaurantes Caña Wasky, incluyendo:
                </p>
                <ul className="challenge-area_list">
                  <li>Control de inventario en tiempo real</li>
                  <li>Módulo de ventas multicanal (presencial y delivery)</li>
                  <li>Reportes financieros automatizados</li>
                  <li>Integración con proveedores y CRM</li>
                </ul>
              </div>

              <div className="challenge-area mb-50">
                <h3 className="title mb-20">Retos Principales</h3>
                <p className="text mb-40">Principales desafíos técnicos y operativos:</p>
                <ul className="challenge-area_list">
                  <li>Sincronización de datos</li>
                  <li>Integración con múltiples pasarelas de pago</li>
                </ul>
              </div>
            </div>

            {/* Columna derecha: Tecnologías + imagen adaptada */}
            <div className="col-lg-6">
              <div className="project-area mb-50 d-flex flex-column h-100">
                <h3 className="title mb-20">Tecnologías</h3>
                <p className="text mb-30">Implementación de un stack tecnológico moderno que permitió:</p>
                <ul className="challenge-area_list mb-40">
                  <li>Reducción de 40% en tiempos de inventario</li>
                  <li>Automatización de 85% de los reportes financieros</li>
                  <li>Integración con sistemas contables existentes</li>
                </ul>
                <div className="feature-thumb mt-auto">
                  <Image
                    src={IMG_SIDE}
                    alt="App Móvil Caña Wasky"
                    width={648}
                    height={360}
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
                <p className="text mb-40">Impacto cuantificable del sistema implementado:</p>
                <ul className="results-area_list">
                  <li>+40% en ventas promedio por sucursal</li>
                  <li>30% reducción en mermas de inventario</li>
                  <li>65% optimización en tiempo de gestión</li>
                </ul>
                <figure className="result-thumb mt-60 mb-60">
                  <Image
                    src={IMG_RESULTS}
                    alt="Analíticas Caña Wasky"
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

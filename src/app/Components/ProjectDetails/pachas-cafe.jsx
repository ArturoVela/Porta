"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Constantes del proyecto
const PROJECT = {
  subtitle: "Sistema de ventas",
  title: "Sistema de Gestión para Pacha's Café",
  client: "Freddy Ramirez",
  published: "27 Marzo, 2025",
  technology: "Excel",
  categories: "Sistema de ventas, Control de inventario",
};

const IMG_COVER = "/assets/images/portfolio/details-thumb_pacha.jpg";
const IMG_FEATURE = "/assets/images/portfolio/portfolio4_1_pacha.jpg";
const IMG_RESULTS = "/assets/images/portfolio/details-thumb-2_pacha.jpg";

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
              </ul>
            </div>
          </div>

          <div className="row details-thumb">
            <div className="col-xl-12">
              <div className="project-inner-thumb mb-50 wow img-custom-anim-top">
                <Image
                  className="w-100 responsive-img"
                  src={IMG_COVER}
                  alt="Dashboard Pacha's Café"
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
                  Implementación de un sistema integrado de gestión para la cadena de cafeterías Pacha's Café, incluyendo:
                </p>
                <ul className="challenge-area_list">
                  <li>Control de inventario de insumos</li>
                  <li>Módulo de ventas físicas y online</li>
                  <li>Reportes de rentabilidad por producto</li>
                  <li>Integración con delivery apps</li>
                </ul>
              </div>

              <div className="challenge-area mb-50">
                <h3 className="title mb-20">Retos Principales</h3>
                <p className="text mb-40">Desafíos clave en la implementación:</p>
                <ul className="challenge-area_list">
                  <li>Sincronización de stock entre locales</li>
                  <li>Gestión de variantes de productos</li>
                  <li>Actualización de precios en tiempo real</li>
                </ul>
              </div>
            </div>

            {/* Columna derecha: Tecnologías + Imagen */}
            <div className="col-lg-6">
              <div className="project-area mb-50 d-flex flex-column h-100">
                <h3 className="title mb-20">Tecnologías</h3>
                <p className="text mb-30">Solución tecnológica implementada:</p>
                <ul className="challenge-area_list mb-40">
                  <li>Automatización de pedidos online</li>
                  <li>Integración con métodos de pago digitales</li>
                  <li>Reportes personalizados de ventas horarias</li>
                </ul>
                <div className="feature-thumb mt-auto">
                  <Image
                    src={IMG_FEATURE}
                    alt="App Móvil Pacha's Café"
                    width={648}
                    height={320}
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
                <p className="text mb-40">Impacto del sistema implementado:</p>
                <ul className="results-area_list">
                  <li>+35% en ventas promedio mensuales</li>
                  <li>25% reducción en mermas de insumos</li>
                  <li>50% aumento en pedidos online</li>
                </ul>
                <figure className="result-thumb mt-60 mb-60">
                  <Image
                    src={IMG_RESULTS}
                    alt="Analíticas Pacha's Café"
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

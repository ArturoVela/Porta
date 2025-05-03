"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Constantes reutilizables
const PROJECT = {
  subtitle: "Servidor Discord",
  title: "Servidor Discord 100% Administrable",
  client: "@navyfz",
  date: "15 Enero, 2025",
  technology: "Discord.js",
  categories: "Administración de comunidades, Automatización",
  discordUrl: "https://discord.gg/mnMkUXC5vK",
  iconArrow: "/assets/images/icons/arrow-left-top.svg",
  images: {
    main: "/assets/images/portfolio/details-thumb_dc.jpg",
    feature: "/assets/images/portfolio/portfolio4_1_dc.jpg",
    result: "/assets/images/portfolio/details-thumb-2_dc.jpg",
  },
};

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
                  <span className="text">{PROJECT.date}</span>
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
                    href={PROJECT.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link-effect">
                      <span className="effect-1">Visitar Sitio</span>
                      <span className="effect-1">De Discord</span>
                    </span>
                    <img src={PROJECT.iconArrow} alt="" />
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
                  src={PROJECT.images.main}
                  alt="Panel de control del servidor"
                  width={1320}
                  height={850}
                  loading="lazy"
                  style={{ borderRadius: "20px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          <div className="row justify-content-between">
            {/* Resumen y Retos */}
            <div className="col-lg-6">
              <div className="project-area mb-50">
                <h3 className="title mb-20">Resumen del Proyecto</h3>
                <p className="text">
                  Desarrollo de un servidor Discord completamente personalizado con:
                </p>
                <ul className="challenge-area_list">
                  <li>Sistema de moderación automatizado</li>
                  <li>Bots con más de 50 comandos personalizados</li>
                  <li>Gestión automática de roles y permisos</li>
                  <li>Sistema de logs y auditoría</li>
                </ul>
              </div>
              <div className="challenge-area mb-50">
                <h3 className="title mb-20">Retos Principales</h3>
                <p className="text mb-40">Desafíos técnicos superados:</p>
                <ul className="challenge-area_list">
                  <li>Manejo de alta concurrencia de usuarios</li>
                  <li>Integración de múltiples bots</li>
                  <li>Protección contra raids y spam</li>
                </ul>
              </div>
            </div>

            {/* Características mejoradas con imagen alineada */}
            <div className="col-lg-6">
              <div className="project-area mb-50 d-flex flex-column h-100">
                <h3 className="title mb-20">Características</h3>
                <p className="text mb-30">Funcionalidades clave implementadas:</p>
                <ul className="challenge-area_list mb-40">
                  <li>Moderación automática 24/7 con bots como MEE6 y Beemo</li>
                  <li>Sistema de tickets de soporte con interfaz fácil de usar</li>
                  <li>Asignación automática de roles por reacción o botón</li>
                  <li>Logs detallados: ediciones, entradas, salidas y sanciones</li>
                </ul>
                <div className="feature-thumb mt-auto">
                  <Image
                    src={PROJECT.images.feature}
                    alt="Interfaz de bots"
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
                <p className="text mb-40">Impacto de la implementación:</p>
                <ul className="results-area_list">
                  <li>+500 miembros activos</li>
                  <li>90% reducción en moderación manual</li>
                  <li>Respuesta automática a 85% de consultas</li>
                  <li>0 incidentes de spam/raids</li>
                </ul>
                <figure className="result-thumb mt-60 mb-60">
                  <Image
                    src={PROJECT.images.result}
                    alt="Estadísticas de actividad"
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

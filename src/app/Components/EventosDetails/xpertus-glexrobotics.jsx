import Image from "next/image";
import Link from "next/link";

// Constantes reutilizables
const EVENT_TITLE =
  "1º Exposición de Robótica e Inteligencia Artificial - Tarapoto, Perú";
const EVENT_SUBTITLE = "Evento Tecnológico";
const ORGANIZER = "Glex Robotics";
const EVENT_DATE = "25 Abril, 2025";
const TOPICS = "Robótica, Inteligencia Artificial, Innovación Tecnológica";
const CATEGORIES = "Tecnología, Educación, Innovación";
const WEBSITE_URL = "https://glexrobotics.com/";
const ICON_ARROW = "/assets/images/icons/arrow-left-top.svg";
const IMG_GALLERY = [
    "/assets/images/eventos/details-thumb-3-robot1.jpg",
    "/assets/images/eventos/details-thumb-3-robot2.jpg",
    "/assets/images/eventos/details-thumb-3-robot3.jpg",
    "/assets/images/eventos/details-thumb-3-robot4.jpg",
  ];
  


// Videos
const VIDEO_MAIN = "https://www.youtube.com/embed/-zD2eUmQJ-w";
const VIDEO_RESULT = "https://www.youtube.com/embed/_zpYOGV0vYM";

const Eventodetail = () => {
  return (
    <div>
      <section className="breadcumb-wrapper text-center pb-0 bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="sub-title">{EVENT_SUBTITLE}</span>
              <h2 className="sec-title mb-0">{EVENT_TITLE}</h2>
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
                  <span className="title">Organizador:</span>
                  <span className="text">{ORGANIZER}</span>
                </li>
                <li className="item">
                  <span className="title">Fecha:</span>
                  <span className="text">{EVENT_DATE}</span>
                </li>
                <li className="item">
                  <span className="title">Temáticas:</span>
                  <span className="text">{TOPICS}</span>
                </li>
                <li className="item">
                  <span className="title">Categorías:</span>
                  <span className="text">{CATEGORIES}</span>
                </li>
                <li className="btn-wrap mt--20 sm-mt-0">
                  <a
                    className="circle-btn tp-hover-btn btn"
                    href={WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link-effect">
                      <span className="effect-1">Conocer Más</span>
                      <span className="effect-1">Conocer Más</span>
                    </span>
                    <img src={ICON_ARROW} alt="" />
                    <i className="btn-circle-dot"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row details-thumb">
            <div className="col-xl-12">
              <div className="project-inner-thumb mb-50 wow img-custom-anim-top">
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                    maxWidth: "100%",
                  }}
                >
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                      borderRadius: "20px",
                    }}
                    src={VIDEO_MAIN}
                    title="Exposición Robótica Tarapoto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="col-lg-6">
              <div className="project-area mb-50">
                <h3 className="title mb-20">Sobre la Exposición</h3>
                <p className="text">
                  Participación en la 1º Exposición de Robótica e Inteligencia
                  Artificial, evento que reunió a entusiastas, profesionales y
                  estudiantes para compartir avances tecnológicos.
                </p>
                <ul className="challenge-area_list">
                  <li>Demostraciones de robots autónomos</li>
                  <li>Presentación de proyectos de IA aplicada</li>
                  <li>Charlas sobre innovación educativa</li>
                  <li>Intercambio de experiencias académicas</li>
                </ul>
              </div>

              <div className="challenge-area mb-50">
                <h3 className="title mb-20">Desafíos Durante el Evento</h3>
                <p className="text mb-40">
                  Desafíos enfrentados en la preparación y participación:
                </p>
                <ul className="challenge-area_list">
                  <li>Integración de hardware y software en robots</li>
                  <li>Optimización de algoritmos de control</li>
                  <li>Adaptación a dinámicas de exposición en vivo</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <h3 className="title mb-20">Momentos Clave</h3>
              <p className="text mb-45 mt-60 md-mt-0">
                Principales actividades y experiencias:
              </p>
              <ul className="challenge-area_list">
                <li>Competencias de robots seguidores de línea</li>
                <li>Exhibiciones de robots bailarines</li>
                <li>Conferencias sobre inteligencia artificial educativa</li>
                <li>Networking con expertos</li>
              </ul>
              {/* Imagen opcional comentada */}
            </div>

            <div className="col-lg-12">
              <div className="results-area">
                <h3 className="mb-20">Aprendizajes y Resultados</h3>
                <p className="text mb-40">Impacto de la participación:</p>
                <ul className="results-area_list">
                  <li>Ampliación de redes profesionales en tecnología</li>
                  <li>Fortalecimiento de habilidades en robótica y AI</li>
                  <li>Inspiración para futuros proyectos de innovación</li>
                  <li>Reconocimiento por participación destacada</li>
                </ul>
                <figure className="result-thumb mt-60 mb-60">
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      overflow: "hidden",
                      maxWidth: "100%",
                    }}
                  >
                    <iframe
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                        borderRadius: "20px",
                      }}
                      src={VIDEO_RESULT}
                      title="YouTube Shorts - Exposición Robótica"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </figure>
                <div
                className="result-thumb mt-60 mb-60"
                style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
                >
                {IMG_GALLERY.map((src, i) => (
                    <Image
                    key={i}
                    src={src}
                    alt={`Imagen ${i + 1}`}
                    width={300}
                    height={650}
                    loading="lazy"
                    style={{ borderRadius: "20px", objectFit: "cover" }}
                    />
                ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventodetail;

import Image from "next/image";
import Link from "next/link";
import PaginationEventos from "@/app/Components/EventosDetails/PaginationEventos";

const EVENT = {
  subtitle: "Evento Tecnológico",
  title: "1º Exposición de Robótica e Inteligencia Artificial - Tarapoto, Perú",
  organizer: "Glex Robotics",
  date: "25 Abril, 2025",
  topics: "Robótica, Inteligencia Artificial, Innovación Tecnológica",
  categories: "Tecnología, Educación, Innovación",
  websiteUrl: "https://glexrobotics.com/",
  iconArrow: "/assets/images/icons/arrow-left-top.svg",
  videoMain: "https://www.youtube.com/embed/-zD2eUmQJ-w",
  videoResult: "https://www.youtube.com/embed/_zpYOGV0vYM",
  gallery: [
    "/assets/images/eventos/details-thumb-3-robot1.jpg",
    "/assets/images/eventos/details-thumb-3-robot2.jpg",
    "/assets/images/eventos/details-thumb-3-robot3.jpg",
    "/assets/images/eventos/details-thumb-3-robot4.jpg",
  ],
};

const Eventodetail = () => {
  return (
    <div>
      <section className="breadcumb-wrapper text-center pb-0 bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="sub-title">{EVENT.subtitle}</span>
              <h2 className="sec-title mb-0">{EVENT.title}</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="project-details-area space-bottom bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="info-items xs-py-30">
                <li className="item"><span className="title">Organizador:</span> <span className="text">{EVENT.organizer}</span></li>
                <li className="item"><span className="title">Fecha:</span> <span className="text">{EVENT.date}</span></li>
                <li className="item"><span className="title">Temáticas:</span> <span className="text">{EVENT.topics}</span></li>
                <li className="item"><span className="title">Categorías:</span> <span className="text">{EVENT.categories}</span></li>
                <li className="btn-wrap mt--20 sm-mt-0">
                  <a className="circle-btn tp-hover-btn btn" href={EVENT.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <span className="link-effect">
                      <span className="effect-1">Conocer Más</span>
                      <span className="effect-1">Conocer Más</span>
                    </span>
                    <img src={EVENT.iconArrow} alt="Flecha" />
                    <i className="btn-circle-dot"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Video Principal */}
          <div className="row details-thumb">
            <div className="col-xl-12">
              <div className="project-inner-thumb mb-50 wow img-custom-anim-top">
                <div style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  maxWidth: "100%"
                }}>
                  <iframe
                    src={EVENT.videoMain}
                    title="Video Exposición"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                      borderRadius: "20px"
                    }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles de Proyecto */}
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <div className="project-area mb-50">
                <h3 className="title mb-20">Sobre la Exposición</h3>
                <p className="text">Participación en la 1º Exposición de Robótica e Inteligencia Artificial, evento que reunió a entusiastas, profesionales y estudiantes para compartir avances tecnológicos.</p>
                <ul className="challenge-area_list">
                  <li>Demostraciones de robots autónomos</li>
                  <li>Proyectos de IA aplicada</li>
                  <li>Charlas sobre innovación educativa</li>
                  <li>Intercambio de experiencias académicas</li>
                </ul>
              </div>

              <div className="challenge-area mb-50">
                <h3 className="title mb-20">Desafíos Durante el Evento</h3>
                <p className="text mb-40">Obstáculos superados para lograr una participación efectiva:</p>
                <ul className="challenge-area_list">
                  <li>Integración de hardware y software</li>
                  <li>Optimización de algoritmos de control</li>
                  <li>Dinámica de exposición en vivo</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <h3 className="title mb-20">Momentos Clave</h3>
              <p className="text mb-45 mt-60 md-mt-0">Actividades más destacadas del evento:</p>
              <ul className="challenge-area_list">
                <li>Robots seguidores de línea</li>
                <li>Exhibiciones coreografiadas</li>
                <li>Conferencias sobre IA educativa</li>
                <li>Networking con expertos</li>
              </ul>
            </div>

            {/* Video de Resultados */}
            <div className="col-lg-12">
              <div className="results-area">
                <h3 className="mb-20">Aprendizajes y Resultados</h3>
                <p className="text mb-40">Impacto y beneficios de participar en el evento:</p>
                <ul className="results-area_list">
                  <li>Ampliación de redes profesionales</li>
                  <li>Fortalecimiento en robótica e IA</li>
                  <li>Inspiración para futuros proyectos</li>
                  <li>Reconocimiento por participación destacada</li>
                </ul>

                <figure className="result-thumb mt-60 mb-60">
                  <div style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                    maxWidth: "100%"
                  }}>
                    <iframe
                      src={EVENT.videoResult}
                      title="Video Resultados"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                        borderRadius: "20px"
                      }}
                    ></iframe>
                  </div>
                </figure>

                {/* Galería */}
                <div
                  className="result-thumb mt-60 mb-60"
                  style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    flexWrap: "wrap"
                  }}
                >
                  {EVENT.gallery.map((src, i) => (
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
                <PaginationEventos />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventodetail;

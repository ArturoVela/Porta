import Image from "next/image";
import Link from "next/link";

// Constantes reutilizables
const EVENT_TITLE = "Proceso de Producción - Fábrica de Chocolates Orquídea Tarapoto";
const COMPANY_NAME = "Chocolates Orquídea";
const LOCATION = "Tarapoto, Perú";
const PRODUCTS = "Chocolate artesanal, Derivados del cacao";
const CATEGORIES = "Producción, Agroindustria, Chocolate";
const WEBSITE_URL = "https://chocolatesorquidea.com/";

const ICON_ARROW = "/assets/images/icons/arrow-left-top.svg";
const IMG_MAIN = "/assets/images/eventos/evento-chocolate-1.jpg";
const IMG_SIDE = "/assets/images/eventos/evento-chocolate-2.jpg";
const IMG_GALLERY = [
    "/assets/images/eventos/details-thumb-3-robot1-2.jpg",
    "/assets/images/eventos/details-thumb-3-robot2-2.jpg",
    "/assets/images/eventos/details-thumb-3-robot3-2.jpg",
    "/assets/images/eventos/details-thumb-3-robot4-2.jpg",
  ];

const Eventodetail = () => {
    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-0 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="sub-title">Visita Industrial</span>
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
                                    <span className="title">Empresa:</span>
                                    <span className="text">{COMPANY_NAME}</span>
                                </li>
                                <li className="item">
                                    <span className="title">Ubicación:</span>
                                    <span className="text">{LOCATION}</span>
                                </li>
                                <li className="item">
                                    <span className="title">Productos:</span>
                                    <span className="text">{PRODUCTS}</span>
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
                                            <span className="effect-1">Visitar Web</span>
                                            <span className="effect-1">Visitar Web</span>
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
                                <Image
                                    className="w-100"
                                    src={IMG_MAIN}
                                    alt="Fábrica Chocolates Orquídea"
                                    width={1320}
                                    height={850}
                                    loading="lazy"
                                    style={{ borderRadius: "20px", objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <div className="project-area mb-50">
                                <h3 className="title mb-20">Sobre la Fábrica</h3>
                                <p className="text">
                                    Visita a la fábrica de Chocolates Orquídea, donde se pudo observar el proceso artesanal
                                    de elaboración de chocolate, combinando técnicas tradicionales con tecnología moderna.
                                </p>
                                <ul className="challenge-area_list">
                                    <li>Proceso de tostado y molienda mecanizado</li>
                                    <li>Envasado manual meticuloso</li>
                                    <li>Control de calidad en cada etapa</li>
                                    <li>Próxima automatización de procesos</li>
                                </ul>
                            </div>
                            <div className="challenge-area mb-50">
                                <h3 className="title mb-20">Proceso de Producción</h3>
                                <p className="text mb-40">Etapas principales observadas:</p>
                                <ul className="challenge-area_list">
                                    <li>Selección y tostado del cacao</li>
                                    <li>Molienda y refinado</li>
                                    <li>Temperado del chocolate</li>
                                    <li>Envasado manual cuidadoso</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <h3 className="title mb-20">Aspectos Destacados</h3>
                            <p className="text mb-45 mt-60 md-mt-0">Características notables de la producción:</p>
                            <ul className="challenge-area_list">
                                <li>Alta calidad del cacao local</li>
                                <li>Proceso semi-automatizado</li>
                                <li>Planes de modernización</li>
                                <li>Compromiso con la calidad artesanal</li>
                            </ul>
                            <p> </p>
                            <figure className="thumb lg-mb-0 md-mb-30">
                                <Image
                                    src={IMG_SIDE}
                                    alt="Proceso chocolate Orquídea"
                                    width={648}
                                    height={420}
                                    loading="lazy"
                                    style={{ borderRadius: "20px", objectFit: "cover" }}
                                />
                            </figure>
                        </div>

                        <div className="col-lg-12">
                            <div className="results-area">
                                <h3 className="mb-20">Perspectivas Futuras</h3>
                                <p className="text mb-40">Proyecciones de la empresa:</p>
                                <ul className="results-area_list">
                                    <li>Implementación de nueva maquinaria automatizada</li>
                                    <li>Optimización de procesos de producción</li>
                                    <li>Mantenimiento de la calidad artesanal</li>
                                    <li>Expansión de la capacidad productiva</li>
                                </ul>
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

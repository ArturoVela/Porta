import Image from "next/image";
import Link from "next/link";

const ProjectDetails = () => {
    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-0 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="sub-title">Página web</span>
                            <h2 className="sec-title mb-0">Página Web para Pacha's Café</h2>
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
                                    <span className="text">Freddy Ramirez</span>
                                </li>
                                <li className="item">
                                    <span className="title">Publicado:</span>
                                    <span className="text">15 Agosto, 2024</span>
                                </li>
                                <li className="item">
                                    <span className="title">Tecnología:</span>
                                    <span className="text">HTML, CSS, JavaScript</span>
                                </li>
                                <li className="item">
                                    <span className="title">Categorías:</span>
                                    <span className="text">Diseño web, Marketing digital</span>
                                </li>
                                <li className="btn-wrap mt--20 sm-mt-0">
                                    <a className="circle-btn tp-hover-btn btn" href="https://pachas-arturovelas-projects.vercel.app/" target="_blank" rel="noopener noreferrer">
                                        <span className="link-effect">
                                            <span className="effect-1">Visitar Sitio</span>
                                            <span className="effect-1">Visitar Sitio</span>
                                        </span>
                                        <img src="/assets/images/icons/arrow-left-top.svg" alt="" />
                                        <i className="btn-circle-dot"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row details-thumb">
                        <div className="col-xl-12">
                            <div className="project-inner-thumb mb-50 wow img-custom-anim-top">
                                <Image className="w-100" src="/assets/images/portfolio/details-thumb_pachaweb.jpg" alt="Página principal Pacha's Café" width={1320} height={850} loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <div className="project-area mb-50">
                                <h3 className="title mb-20">Resumen del Proyecto</h3>
                                <p className="text">Desarrollo de un sitio web moderno y responsive para la cadena de cafeterías Pacha's Café incluyendo:</p>
                                <ul className="challenge-area_list">
                                    <li>Diseño responsive adaptado a móviles</li>
                                    <li>Integración de menú digital interactivo</li>
                                    <li>Sistema de reservas online</li>
                                    <li>Optimización SEO básica</li>
                                </ul>
                            </div>
                            <div className="challenge-area mb-50">
                                <h3 className="title mb-20">Retos Principales</h3>
                                <p className="text mb-40">Desafíos técnicos superados:</p>
                                <ul className="challenge-area_list">
                                    <li>Compatibilidad cross-browser</li>
                                    <li>Optimización de rendimiento</li>
                                    <li>Diseño adaptable a diferentes dispositivos</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h3 className="title mb-20">Características</h3>
                            <p className="text mb-45 mt-60 md-mt-0">Principales funcionalidades implementadas:</p>
                            <ul className="challenge-area_list">
                                <li>Galeria interactiva de productos</li>
                                <li>Mapa de ubicación de locales</li>
                                <li>Formulario de contacto integrado</li>
                                <li>Blog con recetas y novedades</li>
                                
                            </ul>
                            <p> </p>
                            <figure className="thumb lg-mb-0 md-mb-30">
                                
                                <Image src="/assets/images/portfolio/portfolio4_1_pacha.jpg" alt="Versión móvil del sitio" width={648} height={320} loading="lazy"/>
                            </figure>
                        </div>
                        
                        <div className="col-lg-12">
                            <div className="results-area">
                                <h3 className="mb-20">Resultados Obtenidos</h3>
                                <p className="text mb-40">Impacto del nuevo sitio web:</p>
                                <ul className="results-area_list">
                                    <li>+200% de tráfico orgánico</li>
                                    <li>40% aumento en compras online</li>
                                    <li>Reducción de 30% en tasa de rebote</li>
                                    <li>Mejora en tiempo de carga (1.8s)</li>
                                </ul>
                                <figure className="result-thumb mt-60 mb-60">
                                    <Image src="/assets/images/portfolio/details-thumb-2_pachaweb.jpg" alt="Estadísticas de rendimiento" width={1320} height={850} loading="lazy"/>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
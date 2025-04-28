import Image from "next/image";
import Link from "next/link";

const ProjectDetails = () => {
    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-0 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="sub-title">Evento Tecnológico</span>
                            <h2 className="sec-title mb-0">1º Exposición de Robótica e Inteligencia Artificial - Tarapoto, Perú</h2>
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
                                    <span className="text">Glex Robotics</span>
                                </li>
                                <li className="item">
                                    <span className="title">Fecha:</span>
                                    <span className="text">25 Abril, 2025</span>
                                </li>
                                <li className="item">
                                    <span className="title">Temáticas:</span>
                                    <span className="text">Robótica, Inteligencia Artificial, Innovación Tecnológica</span>
                                </li>
                                <li className="item">
                                    <span className="title">Categorías:</span>
                                    <span className="text">Tecnología, Educación, Innovación</span>
                                </li>
                                <li className="btn-wrap mt--20 sm-mt-0">
                                    <a className="circle-btn tp-hover-btn btn" href="https://glexrobotics.com/" target="_blank" rel="noopener noreferrer">
                                        <span className="link-effect">
                                            <span className="effect-1">Conocer Más</span>
                                            <span className="effect-1">Conocer Más</span>
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
                                <Image className="w-100" src="/assets/images/portfolio/details-thumb_muni.jpg" alt="Exposición Robótica Tarapoto" width={1320} height={850} loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <div className="project-area mb-50">
                                <h3 className="title mb-20">Sobre la Exposición</h3>
                                <p className="text">Participación en la 1º Exposición de Robótica e Inteligencia Artificial, evento que reunió a entusiastas, profesionales y estudiantes para compartir avances tecnológicos.</p>
                                <ul className="challenge-area_list">
                                    <li>Demostraciones de robots autónomos</li>
                                    <li>Presentación de proyectos de IA aplicada</li>
                                    <li>Charlas sobre innovación educativa</li>
                                    <li>Intercambio de experiencias académicas</li>
                                </ul>
                            </div>
                            <div className="challenge-area mb-50">
                                <h3 className="title mb-20">Desafíos Durante el Evento</h3>
                                <p className="text mb-40">Desafíos enfrentados en la preparación y participación:</p>
                                <ul className="challenge-area_list">
                                    <li>Integración de hardware y software en robots</li>
                                    <li>Optimización de algoritmos de control</li>
                                    <li>Adaptación a dinámicas de exposición en vivo</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h3 className="title mb-20">Momentos Clave</h3>
                            <p className="text mb-45 mt-60 md-mt-0">Principales actividades y experiencias:</p>
                            <ul className="challenge-area_list">
                                <li>Competencias de robots seguidores de línea</li>
                                <li>Exhibiciones de robots bailarines</li>
                                <li>Conferencias sobre inteligencia artificial educativa</li>
                                <li>Networking con expertos </li>
                            </ul>
                            <p> </p>
                            <figure className="thumb lg-mb-0 md-mb-30">
                                <Image src="/assets/images/portfolio/portfolio4_1_muni.jpg" alt="Exposición robótica móvil" width={648} height={420} loading="lazy" />
                            </figure>
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
                                    <Image src="/assets/images/portfolio/details-thumb-2_muni.jpg" alt="Resultados exposición robótica" width={1320} height={850} loading="lazy" />
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

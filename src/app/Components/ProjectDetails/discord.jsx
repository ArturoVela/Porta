import Image from "next/image";
import Link from "next/link";

const ProjectDetails = () => {
    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-0 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="sub-title">Servidor Discord</span>
                            <h2 className="sec-title mb-0">Servidor Discord 100% Administrable</h2>
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
                                    <span className="text">@navyfz</span>
                                </li>
                                <li className="item">
                                    <span className="title">Publicado:</span>
                                    <span className="text">15 Enero, 2025</span>
                                </li>
                                <li className="item">
                                    <span className="title">Tecnología:</span>
                                    <span className="text">Discord.js </span>
                                </li>
                                <li className="item">
                                    <span className="title">Categorías:</span>
                                    <span className="text">Administración de comunidades, Automatización</span>
                                </li>
                                <li className="btn-wrap mt--20 sm-mt-0">
                                    <a className="circle-btn tp-hover-btn btn" href="https://discord.gg/mnMkUXC5vK" target="_blank" rel="noopener noreferrer">
                                        <span className="link-effect">
                                            <span className="effect-1">Visitar Sitio</span>
                                            <span className="effect-1">De Discord</span>
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
                                <Image className="w-100" src="/assets/images/portfolio/details-thumb_dc.jpg" alt="Panel de control del servidor" width={1320} height={850} loading="lazy"/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <div className="project-area mb-50">
                                <h3 className="title mb-20">Resumen del Proyecto</h3>
                                <p className="text">Desarrollo de un servidor Discord completamente personalizado con:</p>
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
                        <div className="col-lg-6">
                            <h3 className="title mb-20">Características</h3>
                            <p className="text mb-45 mt-60 md-mt-0">Funcionalidades clave implementadas:</p>
                            <ul className="challenge-area_list">
                                <li>Moderación automática 24/7</li>
                                <li>Sistema de tickets de soporte</li>
                                <li>Roles por reacción</li>
                                <li>Logs detallados de actividad</li>
                            </ul>
                            <figure className="thumb lg-mb-0 md-mb-30">
                                <Image src="/assets/images/portfolio/portfolio4_1_dc.jpg" alt="Interfaz de bots" width={648} height={320} loading="lazy"/>
                            </figure>
                        </div>
                        
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
                                    <Image src="/assets/images/portfolio/details-thumb-2_dc.jpg" alt="Estadísticas de actividad" width={1320} height={650} loading="lazy" />
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
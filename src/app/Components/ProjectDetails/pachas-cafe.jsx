import Image from "next/image";
import Link from "next/link";

const ProjectDetails = () => {
    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-0 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="sub-title">Sistema de ventas</span>
                            <h2 className="sec-title mb-0">Sistema de Gestión para Pacha's Café</h2>
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
                                    <span className="text">27 Marzo, 2025</span>
                                </li>
                                <li className="item">
                                    <span className="title">Tecnología:</span>
                                    <span className="text">Excel</span>
                                </li>
                                <li className="item">
                                    <span className="title">Categorías:</span>
                                    <span className="text">Sistema de ventas, Control de inventario</span>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div className="row details-thumb">
                        <div className="col-xl-12">
                            <div className="project-inner-thumb mb-50 wow img-custom-anim-top">
                                <Image className="w-100" src="/assets/images/portfolio/details-thumb_pacha.jpg" alt="Dashboard Pacha's Café" width={1320} height={850} loading="lazy"/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <div className="project-area mb-50">
                                <h3 className="title mb-20">Resumen del Proyecto</h3>
                                <p className="text">Implementación de un sistema integrado de gestión para la cadena de cafeterías Pacha's Café, incluyendo:</p>
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
                        <div className="col-lg-6">
                            <h3 className="title mb-20">Tecnologías</h3>
                            <p className="text mb-45 mt-60 md-mt-0">Solución tecnológica implementada:</p>
                            <ul className="challenge-area_list">
                                <li>Automatización de pedidos online</li>
                                <li>Integración con métodos de pago digitales</li>
                                <li>Reportes personalizados de ventas horarias</li>
                            </ul>
                            <p>  </p>
                            <figure className="thumb lg-mb-0 md-mb-30">
                                <Image src="/assets/images/portfolio/portfolio4_1_pacha.jpg" alt="App Móvil Pacha's Café" width={648} height={320} loading="lazy"/>
                            </figure>
                        </div>
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
                                    <Image src="/assets/images/portfolio/details-thumb-2_pacha.jpg" alt="Analíticas Pacha's Café" width={1320} height={650} loading="lazy"/>
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
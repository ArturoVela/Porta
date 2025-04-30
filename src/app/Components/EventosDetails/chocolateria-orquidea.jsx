import Image from "next/image";
import Link from "next/link";

const ProjectDetails = () => {
    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-0 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="sub-title">Visita Industrial</span>
                            <h2 className="sec-title mb-0">Proceso de Producción - Fábrica de Chocolates Orquídea Tarapoto</h2>
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
                                    <span className="text">Chocolates Orquídea</span>
                                </li>
                                <li className="item">
                                    <span className="title">Ubicación:</span>
                                    <span className="text">Tarapoto, Perú</span>
                                </li>
                                <li className="item">
                                    <span className="title">Productos:</span>
                                    <span className="text">Chocolate artesanal, Derivados del cacao</span>
                                </li>
                                <li className="item">
                                    <span className="title">Categorías:</span>
                                    <span className="text">Producción, Agroindustria, Chocolate</span>
                                </li>
                                <li className="btn-wrap mt--20 sm-mt-0">
                                    <a className="circle-btn tp-hover-btn btn" href="https://chocolatesorquidea.com/" target="_blank" rel="noopener noreferrer">
                                        <span className="link-effect">
                                            <span className="effect-1">Visitar Web</span>
                                            <span className="effect-1">Visitar Web</span>
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
                                <Image className="w-100" src="/assets/images/portfolio/details-thumb_muni.jpg" alt="Fábrica Chocolates Orquídea" width={1320} height={850} loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <div className="project-area mb-50">
                                <h3 className="title mb-20">Sobre la Fábrica</h3>
                                <p className="text">Visita a la fábrica de Chocolates Orquídea, donde se pudo observar el proceso artesanal de elaboración de chocolate, combinando técnicas tradicionales con tecnología moderna.</p>
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
                                <Image src="/assets/images/portfolio/portfolio4_1_muni.jpg" alt="Proceso chocolate Orquídea" width={648} height={420} loading="lazy" />
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
                                <figure className="result-thumb mt-60 mb-60">
                                    <Image src="/assets/images/portfolio/details-thumb-2_muni.jpg" alt="Instalaciones Chocolates Orquídea" width={1320} height={850} loading="lazy" />
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
import Image from "next/image";
import Link from "next/link";

const BlogDetails = () => {
    return (
        <div>
            <section className="breadcumb-wrapper text-center pt-240 md-pt-80 pb-0 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <span className="sub-title">Investigación I</span>
                            <h2 className="sec-title mb-0">Predicción del Rendimiento de Cultivos de Arroz Usando Redes Convolucionales Temporales y Datos Multiespectrales</h2>
                        </div>
                    </div>
                </div>
            </section>

            <div className="blog-details-area space-bottom bg-theme2">
                <div className="container">
                    <div className="row">
                        <ul className="info-items xs-py-30 space-bottom">
                            <li className="item">
                                <div className="thumb"><Image src="/assets/images/blog/thumb.jpg" alt="img" width={75} height={75} /></div>
                                <div className="info">
                                    <span className="title">Escrito por</span>
                                    <span className="text">Arturo Vela </span>
                                </div>
                            </li>
                            <li className="item">
                                <div className="info">
                                    <span className="title">Publicado</span>
                                    <span className="text">22 April, 2025</span>
                                </div>
                            </li>
                            <li className="item">
                                <div className="info">
                                    <span className="title">Lectura</span>
                                    <span className="text">8 min</span>
                                </div>
                            </li>
                            <div className="about_content">
                                <p className="about-text wow text-anim-left mt-50 vxs-mt-30"> </p>
                                <div className="btn-wrap btn-bounce-1 home-circle-btn">
                                    <Link className="circle-btn btn gsap-magnetic" href='https://1drv.ms/b/s!AhTBs2k3EIAxjsdX2G-vrZa9PEsKQQ?e=XMTisa' target="_blank">
                                        <span className="link-effect">
                                            <span className="effect-1">Leer más</span>
                                            <span className="effect-1">Leer más</span>
                                        </span>
                                        <Image src="/assets/images/icons/arrow-left-top.svg" alt="img" width={10} height={10}   />
                                    </Link>
                                </div>
                            </div>

                            
                           
                        </ul>
                    </div>
                   
                </div>
                
                <div className="blog-details-thumb mb-50">
                    <Image className="w-100" src="/assets/images/blog/blog-details1-tesis-22-04-2025.jpg" alt="img" width={1910} height={846} />
                </div>
                <div className="container">
                    <div className="blog__details-content">
                        <div className="row justify-content-between">
                            <div className="col-lg-12">
                                <p className="text mb-30">La predicción temprana del rendimiento agrícola se ha convertido en un elemento crucial para la seguridad alimentaria global. Este estudio presenta un método innovador que combina el poder de las redes neuronales convolucionales temporales (TCN) con datos multiespectrales para predecir el rendimiento de cultivos de arroz.</p>
                                <p className="text mb-60">La investigación demuestra cómo la integración de tecnologías avanzadas de aprendizaje profundo con datos satelitales puede revolucionar la forma en que realizamos predicciones agrícolas.</p>
                            </div>
                            <div className="col-lg-12">
                                <blockquote className="blockquote">
                                    <Image className="blockquote-icon" src="/assets/images/icons/block_quote.svg" alt="img" width={40} height={40} />
                                    <p>"La combinación del análisis multitemporal de datos satelitales y climáticos con redes de convolución temporal facilita la predicción precisa y automatizada del rendimiento agrícola."</p>
                                    <a href="#" className="name">Conclusión del Estudio</a>
                                </blockquote>
                                <h3 className="title mb-25">Metodología y Datos Utilizados</h3>
                                <p className="mb-60">El estudio utiliza tres tipos principales de datos: índices de vegetación del satélite MODIS, datos climáticos (temperatura, precipitación, viento y humedad), y datos históricos de rendimiento del arroz entre 2012 y 2019.</p>
                                <figure className="details-thumb mb-60"><Image className="br-10" src="/assets/images/blog/blog-details2-tesis-22-04-2025.jpg" alt="img" width={1320} height={650} /></figure>
                                
                                <h3 className="title mb-25">Ventajas del Modelo Propuesto</h3>
                                <ul className="challenge_list">
                                    <li>Análisis simultáneo de múltiples variables</li>
                                    <li>Menor tiempo de procesamiento comparado con métodos tradicionales</li>
                                    <li>Mejor identificación de relaciones espacio-temporales</li>
                                    <li>Menor error de predicción</li>
                                    <li>Adaptabilidad a diversos cultivos y regiones</li>
                                </ul>
                                
                                <h3 className="title mb-25 mt-60">Resultados Destacables</h3>
                                <p className="mb-30">El modelo TCN demostró un rendimiento superior en todos los indicadores evaluados:</p>
                                <ul className="challenge_list">
                                    <li>Menor error absoluto medio (MAE)</li>
                                    <li>Menor error cuadrático medio (RMSE)</li>
                                    <li>Mayor coeficiente de determinación (R²)</li>
                                    <li>Predicción precisa: 4.34 ton/ha vs 4.37 ton/ha oficial (2019-2020)</li>
                                </ul>
                                
                                
                                <p className="mt-30 mb-60">Esta investigación representa un avance significativo en la aplicación de tecnologías de inteligencia artificial para la agricultura de precisión, ofreciendo una herramienta valiosa para la gestión agrícola y la seguridad alimentaria.</p>
                                <h3 className="title mb-25 mt-60">Anotaciones del Docente</h3>
                                
                                <figure className="details-thumb mb-60"><Image className="br-10" src="/assets/images/blog/blog-details3-tesis-22-04-2025.jpg" alt="img" width={1320} height={650} /></figure>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
};

export default BlogDetails;
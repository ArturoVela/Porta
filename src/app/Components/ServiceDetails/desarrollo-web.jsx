"use client"
import { useEffect, useRef, useState } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Link from "next/link";
import Image from "next/image";

const ServiceDetails = () => {

    useEffect(() => {
        loadBackgroudImages();
    }, []);

    const [openItemIndex, setOpenItemIndex] = useState(0);

    const handleItemClick = index => {
        setOpenItemIndex(openItemIndex === index ? -1 : index);
    };

    const faqContent = [
        {
            title: '¿Cuánto tiempo toma desarrollar un sitio web?', 
            content: 'El tiempo varía según la complejidad: landing pages (1-2 semanas), sitios corporativos (2-4 semanas), e-commerce o aplicaciones web complejas (1-3 meses). Cada proyecto recibe un cronograma detallado al inicio.'              
        },
        {
            title: '¿Qué incluye el servicio de desarrollo web?', 
            content: 'El servicio incluye: diseño responsive, optimización SEO básica, integración de analytics, formularios funcionales, optimización de rendimiento, pruebas de calidad y 1 mes de soporte post-lanzamiento.'
        },
        {
            title: '¿Qué tecnologías utilizas en tus desarrollos?', 
            content: 'Principalmente trabajo con Next.js y React para el frontend, Node.js para backend, MongoDB/PostgreSQL para bases de datos, y Tailwind CSS/Bootstrap para estilos. Todas las tecnologías se eligen según las necesidades específicas del proyecto.'              
        },
        {
            title: '¿Ofreces mantenimiento web?', 
            content: 'Sí, ofrezco planes de mantenimiento mensual que incluyen: actualizaciones de seguridad, respaldos, correcciones de errores, actualizaciones de contenido y soporte técnico por email/WhatsApp.'              
        },
        {
            title: '¿Puedo actualizar el contenido de mi web por mi cuenta?', 
            content: 'Sí, implemento sistemas de gestión de contenido (CMS) que te permiten actualizar textos, imágenes y otros contenidos fácilmente. Además, proporciono capacitación para que puedas gestionar tu sitio.'              
        },
        {
            title: '¿Cómo es el proceso de inicio de un proyecto?', 
            content: '1) Reunión inicial para entender requisitos, 2) Propuesta técnica y presupuesto, 3) 50% de adelanto para iniciar, 4) Desarrollo con revisiones periódicas, 5) Pruebas finales y capacitación, 6) Lanzamiento y soporte inicial.'              
        }
    ]; 

    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-90 md-pb-50 vxs-pb-30 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="sec-title mb-30 md-mb-15">Desarrollo Web</h2>
                            <div className="sec-icon"><i className="fa-regular fa-chevron-down"></i></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service__details-area space-bottom bg-theme2">
                <div className="container">
                    <div className="service__inner-wrap">
                        <div className="row gx-35 lg-gx-25">
                            <div className="col-lg-8">
                                <div className="service__details-wrap">
                                    <div className="service__details-thumb">
                                        <Image src="/assets/images/service/service-details1.jpg" alt="Desarrollo Web" width={796} height={496} />
                                    </div>
                                    <p className="mb-25">Como desarrollador web fullstack, me especializo en crear soluciones web modernas y eficientes. Utilizo las últimas tecnologías y mejores prácticas para asegurar que cada proyecto sea robusto, escalable y fácil de mantener.</p>
                                    <p className="mb-55">Mi enfoque se centra en crear experiencias web excepcionales que no solo se vean bien, sino que también funcionen de manera óptima. Cada proyecto se desarrolla pensando en la velocidad, la seguridad y la experiencia del usuario.</p>
                                    <div className="service__details-content">
                                        <h3 className="title">Proceso de desarrollo basado en metodologías probadas</h3>
                                        <p className="mb-35">Mi proceso de desarrollo web está fundamentado en años de experiencia y las mejores prácticas de la industria. Desde la planificación inicial hasta el despliegue final, cada fase está cuidadosamente ejecutada para garantizar resultados excepcionales.</p>
                                        <div className="service__details-thumb mb-55">
                                            <Image src="/assets/images/service/service-details2.jpg" alt="Proceso de desarrollo" width={796} height={496} />
                                        </div>
                                        <h3 className="title">Especialización y Metodología de Trabajo</h3>
                                        <p className="mb-35">Me especializo en desarrollo web fullstack utilizando tecnologías modernas como Next.js, React, Node.js y bases de datos SQL/NoSQL. Mi metodología ágil asegura entregas continuas y comunicación constante con el cliente.</p>
                                        <div className="video-wrap">
                                            <div className="jarallax" data-background="/assets/images/service/service-details3.jpg"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="faq-area-1">
                                    <h3 className="faq-title">Preguntas Frecuentes</h3>
                                    <ul className="accordion-box style-2 faq-area">
                                        {faqContent.map((item, index) => (
                                            <li key={index} className={`accordion block${openItemIndex === index ? " active" : ""}`}>
                                                <div onClick={() => handleItemClick(index)} className="acc-btn" style={{cursor: "pointer"}}>
                                                    {item.title}
                                                    <i className={`fa-solid fa-arrow-down${openItemIndex === index ? " rotated" : ""}`} style={{marginLeft: 8}}></i>
                                                </div>
                                                <div className="acc-content" style={{display: openItemIndex === index ? "block" : "none"}}>
                                                    <div className="content">
                                                        <div className="text">{item.content}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <aside className="service__sidebar">
                                    <div className="sidebar__widget">
                                        <div className="sidebar__service-list">
                                            <ul className="list-wrap">
                                                <li><Link href="/service/desarrollo-web">Desarrollo Web</Link></li>
                                                <li><Link href="/service/moderacion-discord">Moderación Discord</Link></li>
                                                <li><Link href="/service/diseno-ui-ux">Diseño UI/UX</Link></li>
                                                <li><Link href="/service/edicion-vscode">Edición VS Code</Link></li>
                                                <li><Link href="/service/proyectos-como-servicio">Proyectos como Servicio</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar__widget">
                                        <div className="sidebar__contact-info">
                                            <figure className="thumb mb-25">
                                                <Image className="br-10" src="/assets/images/service/details-thumb.jpg" alt="Contacto" width={347} height={354} />
                                            </figure>
                                            <h4 className="sidebar__widget-title">Contáctame</h4>
                                            <ul className="contact-info-list">
                                                <li className="item">
                                                    <div className="icon">
                                                        <Image src="/assets/images/service/phone-icon.png" alt="Teléfono" width={35} height={35} />
                                                    </div>
                                                    <a href="tel:+51963653154">
                                                        <span className="text">Celular / WhatsApp<br/>+51 963 653 154</span>
                                                    </a>
                                                </li>
                                                <li className="item">
                                                    <div className="icon">
                                                        <Image src="/assets/images/service/message-icon.png" alt="Email" width={35} height={35} />
                                                    </div>
                                                    <a href="mailto:velaarturo70@gmail.com">
                                                        <span className="text">velaarturo70@gmail.com</span>
                                                    </a>
                                                </li>
                                                <li className="item">
                                                    <div className="icon">
                                                        <Image src="/assets/images/service/location-icon.png" alt="Discord" width={35} height={35} />
                                                    </div>
                                                    <span className="text">Discord<br/>@maldadpurpura @navyfz</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </section>           
        </div>
    );
};

export default ServiceDetails;
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
            title: '¿Qué incluye la personalización de VS Code?', 
            content: 'El servicio incluye: configuración de temas y colores personalizados, atajos de teclado optimizados, extensiones esenciales según tu stack tecnológico, snippets personalizados, y configuración de debugging.'              
        },
        {
            title: '¿Qué extensiones recomiendas para desarrollo?', 
            content: 'Las extensiones varían según el stack, pero generalmente incluyo: GitLens para control de versiones, ESLint/Prettier para formateo, IntelliSense para autocompletado, Live Server para desarrollo web, y extensiones específicas según el lenguaje de programación.'
        },
        {
            title: '¿Puedo sincronizar mi configuración en varios equipos?', 
            content: 'Sí, configuro Settings Sync para mantener tus ajustes, extensiones y snippets sincronizados en todos tus dispositivos. También creo respaldos de tu configuración para mayor seguridad.'              
        },
        {
            title: '¿Ofreces snippets personalizados?', 
            content: 'Sí, creo snippets personalizados para tus patrones de código más frecuentes, incluyendo templates de componentes, funciones comunes y estructuras de código que uses regularmente.'              
        },
        {
            title: '¿Cómo mejoras la productividad con VS Code?', 
            content: 'Implemento atajos de teclado eficientes, automatizaciones con tareas personalizadas, integración con herramientas de desarrollo, y configuraciones que optimizan el flujo de trabajo según tus necesidades específicas.'              
        },
        {
            title: '¿Incluyes capacitación en el servicio?', 
            content: 'Sí, proporciono una guía detallada de la configuración, sesiones de capacitación para aprovechar al máximo las personalizaciones, y documentación de referencia para todos los atajos y funcionalidades implementadas.'              
        }
    ]; 

    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-90 md-pb-50 vxs-pb-30 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="sec-title mb-30 md-mb-15">Edición VS Code</h2>
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
                                        <Image src="/assets/images/service/service-details1.jpg" alt="VS Code Personalización" width={796} height={496} />
                                    </div>
                                    <p className="mb-25">Como experto en personalización de VS Code, me especializo en crear entornos de desarrollo altamente productivos y personalizados. Optimizo el editor para que se adapte perfectamente a tu flujo de trabajo y necesidades específicas de desarrollo.</p>
                                    <p className="mb-55">Mi enfoque se centra en mejorar tu eficiencia como desarrollador, implementando configuraciones que automatizan tareas repetitivas y hacen que tu experiencia de codificación sea más fluida y agradable.</p>
                                    <div className="service__details-content">
                                        <h3 className="title">Personalización Avanzada de VS Code</h3>
                                        <p className="mb-35">Cada configuración está cuidadosamente diseñada para maximizar la productividad. Desde la selección de extensiones hasta la creación de snippets personalizados, cada aspecto se ajusta a tus necesidades específicas de desarrollo.</p>
                                        <div className="service__details-thumb mb-55">
                                            <Image src="/assets/images/service/service-details2.jpg" alt="Configuración VS Code" width={796} height={496} />
                                        </div>
                                        <h3 className="title">Optimización y Flujo de Trabajo</h3>
                                        <p className="mb-35">Implemento las mejores prácticas en configuración de VS Code, incluyendo integración con herramientas de desarrollo, sistemas de control de versiones, y automatización de tareas comunes para mejorar tu flujo de trabajo.</p>
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
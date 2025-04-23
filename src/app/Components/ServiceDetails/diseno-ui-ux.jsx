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
            title: '¿Qué diferencia hay entre UI y UX?', 
            content: 'UI (Interfaz de Usuario) se centra en el diseño visual y la estética, mientras que UX (Experiencia de Usuario) se enfoca en cómo el usuario interactúa con el producto. Trabajo ambos aspectos para crear productos digitales completos y efectivos.'              
        },
        {
            title: '¿Qué incluye un proyecto de diseño UI/UX?', 
            content: 'El servicio incluye: investigación de usuarios, wireframes, prototipos interactivos, diseño visual, pruebas de usabilidad, guía de estilos, y entrega de assets listos para desarrollo.'
        },
        {
            title: '¿Qué herramientas de diseño utilizas?', 
            content: 'Trabajo principalmente con Figma para diseño y prototipado, Adobe XD para algunos proyectos específicos, y herramientas complementarias como Photoshop e Illustrator para gráficos personalizados.'              
        },
        {
            title: '¿Cuánto dura un proyecto de diseño UI/UX?', 
            content: 'Los tiempos varían según la complejidad: Landing pages (1 semana), sitios web completos (2-3 semanas), aplicaciones complejas (4-6 semanas). Cada proyecto recibe un cronograma detallado.'              
        },
        {
            title: '¿Realizas pruebas de usabilidad?', 
            content: 'Sí, implemento pruebas de usabilidad en diferentes etapas del proyecto: pruebas de wireframes, tests A/B, pruebas de prototipos y evaluaciones heurísticas para garantizar la mejor experiencia de usuario.'              
        },
        {
            title: '¿Cómo es el proceso de diseño?', 
            content: '1) Investigación y análisis de usuarios, 2) Arquitectura de información, 3) Wireframes y flujos de usuario, 4) Diseño visual y UI, 5) Prototipos interactivos, 6) Pruebas y refinamiento, 7) Entrega de archivos finales.'              
        }
    ]; 

    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-90 md-pb-50 vxs-pb-30 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="sec-title mb-30 md-mb-15">Diseño UI/UX</h2>
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
                                        <Image src="/assets/images/service/service-details1.jpg" alt="Diseño UI/UX" width={796} height={496} />
                                    </div>
                                    <p className="mb-25">Como diseñador UI/UX, me especializo en crear experiencias digitales intuitivas y atractivas. Combino principios de diseño moderno con las mejores prácticas de usabilidad para desarrollar interfaces que no solo se ven bien, sino que también funcionan de manera excepcional.</p>
                                    <p className="mb-55">Mi enfoque se centra en entender las necesidades del usuario y los objetivos del negocio para crear soluciones que satisfagan ambos aspectos, resultando en productos digitales exitosos y fáciles de usar.</p>
                                    <div className="service__details-content">
                                        <h3 className="title">Diseño centrado en el usuario</h3>
                                        <p className="mb-35">Cada proyecto comienza con una profunda investigación de usuarios y análisis de necesidades. Utilizo metodologías probadas de diseño centrado en el usuario para crear interfaces que resuelven problemas reales y mejoran la experiencia del usuario.</p>
                                        <div className="service__details-thumb mb-55">
                                            <Image src="/assets/images/service/service-details2.jpg" alt="Proceso de diseño" width={796} height={496} />
                                        </div>
                                        <h3 className="title">Metodología y Herramientas</h3>
                                        <p className="mb-35">Trabajo con las últimas herramientas y tecnologías de diseño UI/UX, incluyendo Figma, Adobe XD y otras herramientas especializadas. Mi proceso iterativo asegura que cada detalle esté cuidadosamente considerado y probado.</p>
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
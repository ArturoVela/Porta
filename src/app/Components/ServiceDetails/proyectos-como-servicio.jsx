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
            title: '¿Qué es “Proyectos como Servicio”?', 
            content: 'Es un modelo donde desarrollo y gestiono tu proyecto digital de principio a fin, desde la idea inicial hasta el despliegue y mantenimiento, para que tú solo te enfoques en tu negocio.'              
        },
        {
            title: '¿Qué tipo de proyectos puedo solicitar?', 
            content: 'Puedes solicitar MVPs (productos mínimos viables), plataformas web, sistemas internos, aplicaciones SaaS, landing pages, automatizaciones y soluciones personalizadas según tus necesidades.'
        },
        {
            title: '¿Incluye soporte y mantenimiento?', 
            content: 'Sí, todos los proyectos incluyen soporte técnico y mantenimiento durante el primer mes. Luego puedes optar por planes mensuales de soporte y mejoras continuas.'              
        },
        {
            title: '¿Cómo es el proceso de trabajo?', 
            content: '1) Reunión inicial y levantamiento de requerimientos, 2) Propuesta técnica y cronograma, 3) Desarrollo iterativo con entregas parciales, 4) Pruebas y ajustes, 5) Despliegue y capacitación, 6) Soporte post-lanzamiento.'              
        },
        {
            title: '¿Puedo pedir cambios durante el desarrollo?', 
            content: 'Sí, el proceso es flexible y permite ajustes durante el desarrollo. Se priorizan los cambios según el impacto y el cronograma acordado.'              
        },
        {
            title: '¿Qué tecnologías utilizas?', 
            content: 'Trabajo con tecnologías modernas como Next.js, Node.js, React, bases de datos SQL/NoSQL, y despliegue en plataformas como Vercel, AWS o DigitalOcean, según lo que mejor se adapte a tu proyecto.'              
        }
    ]; 

    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-90 md-pb-50 vxs-pb-30 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="sec-title mb-30 md-mb-15">Proyectos como Servicio</h2>
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
                                        <Image src="/assets/images/service/service-details1.jpg" alt="Proyectos como Servicio" width={796} height={496} />
                                    </div>
                                    <p className="mb-25">Ofrezco el desarrollo integral de proyectos digitales bajo demanda, ideal para emprendedores, empresas y startups que buscan soluciones rápidas, escalables y personalizadas sin preocuparse por la gestión técnica.</p>
                                    <p className="mb-55">Me encargo de todo el ciclo de vida del proyecto: desde la conceptualización, desarrollo, pruebas, despliegue y soporte, asegurando calidad, comunicación constante y cumplimiento de plazos.</p>
                                    <div className="service__details-content">
                                        <h3 className="title">Desarrollo y gestión de proyectos llave en mano</h3>
                                        <p className="mb-35">Transformo tus ideas en productos digitales funcionales, utilizando metodologías ágiles y tecnologías modernas. Recibes entregas periódicas, acceso a avances y la tranquilidad de contar con un solo responsable técnico.</p>
                                        <div className="service__details-thumb mb-55">
                                            <Image src="/assets/images/service/service-details2.jpg" alt="Gestión de Proyectos" width={796} height={496} />
                                        </div>
                                        <h3 className="title">Metodología y Tecnologías</h3>
                                        <p className="mb-35">Trabajo con metodologías ágiles, comunicación transparente y herramientas colaborativas. El stack tecnológico se adapta a cada proyecto para garantizar escalabilidad, seguridad y facilidad de mantenimiento.</p>
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
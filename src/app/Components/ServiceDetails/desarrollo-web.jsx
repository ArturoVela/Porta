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
            content: 'El tiempo depende de la complejidad del proyecto. Como desarrollador junior, me enfoco en proyectos pequeños a medianos, los cuales pueden tomar desde una semana hasta un mes según los requerimientos.'              
        },
        {
            title: '¿Qué incluye el servicio de desarrollo web?', 
            content: 'El servicio incluye: diseño responsive básico, integración de formularios funcionales, optimización ligera de rendimiento y pruebas básicas de calidad. Siempre busco seguir aprendiendo y mejorar en cada proyecto.'
        },
        {
            title: '¿Qué tecnologías utilizas en tus desarrollos?', 
            content: 'Trabajo con Next.js y React para el frontend, y estoy aprendiendo Node.js y bases de datos como MongoDB. También utilizo Tailwind CSS para estilos. Estoy en constante aprendizaje para adaptarme a las necesidades del cliente.'              
        },
        {
            title: '¿Ofreces mantenimiento web?', 
            content: 'Sí, ofrezco mantenimiento básico como correcciones menores, actualizaciones de contenido y soporte por email/WhatsApp. Siempre estoy disponible para ayudarte mientras aprendo más en el camino.'              
        },
        {
            title: '¿Puedo actualizar el contenido de mi web por mi cuenta?', 
            content: 'Sí, implemento soluciones simples que permiten al cliente modificar contenido básico. También brindo orientación personalizada para facilitar el manejo del sitio.'              
        },
        {
            title: '¿Cómo es el proceso de inicio de un proyecto?', 
            content: '1) Conversamos sobre lo que necesitas, 2) Propongo una solución simple y clara, 3) Acuerdo inicial con presupuesto, 4) Desarrollo paso a paso con retroalimentación, 5) Revisión final y entrega, 6) Apoyo inicial después del lanzamiento.'              
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
                                        <Image src="/assets/images/service/service-details1-web.jpg" alt="Desarrollo Web" width={796} height={496} loading="lazy"/>
                                    </div>
                                    <p className="mb-25">Como desarrollador web fullstack junior, estoy dando mis primeros pasos en la creación de soluciones web modernas. Me esfuerzo por aplicar buenas prácticas y aprender con cada proyecto.</p>
                                    <p className="mb-55">Mi enfoque está en crear sitios funcionales que sean accesibles y eficientes, siempre priorizando la experiencia del usuario mientras desarrollo mis habilidades.</p>
                                    <div className="service__details-content">
                                        <h3 className="title">Proceso de desarrollo basado en metodologías probadas</h3>
                                        <p className="mb-35">Aunque estoy empezando en el mundo del desarrollo web, aplico procesos organizados y metódicos para asegurar que cada fase del desarrollo esté bien planificada y ejecutada.</p>
                                        <div className="service__details-thumb mb-55">
                                            <Image src="/assets/images/service/service-details2-web.jpg" alt="Proceso de desarrollo" width={796} height={496} loading="lazy"/>
                                        </div>
                                        <h3 className="title">Especialización y Metodología de Trabajo</h3>
                                        <p className="mb-35">Me estoy especializando en tecnologías como Next.js, React y Node.js. Trabajo bajo una metodología ágil, aprendiendo de cada experiencia y manteniendo una comunicación constante con el cliente.</p>
                                        <div className="video-wrap">
                                            <div className="jarallax" data-background="/assets/images/service/service-details3-web.jpg" loading="lazy"></div>
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
                                                    <span className="text">Discord<br/>@maldadpurpura  <br></br>@navyfz</span>
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

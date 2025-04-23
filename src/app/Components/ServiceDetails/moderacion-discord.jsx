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
            title: '¿Qué incluye el servicio de moderación?', 
            content: 'El servicio incluye: configuración de roles y permisos, implementación de bots de moderación, filtrado de contenido inapropiado, gestión de eventos, manejo de raids y spam, y reportes semanales de actividad.'              
        },
        {
            title: '¿Qué bots de moderación utilizas?', 
            content: 'Trabajo principalmente con MEE6, Dyno, Carl-bot y bots personalizados según necesidades. Estos permiten automod, sistemas de niveles, tickets de soporte, verificación y más funcionalidades.'
        },
        {
            title: '¿Cuánto tiempo de respuesta ofreces?', 
            content: 'Tiempo de respuesta máximo de 15 minutos para incidentes críticos. Monitoreo activo durante las horas acordadas y sistema de respaldo para emergencias 24/7.'              
        },
        {
            title: '¿Puedes ayudar a crecer mi comunidad?', 
            content: 'Sí, implemento estrategias de crecimiento como: eventos periódicos, sistemas de recompensas, colaboraciones con otros servidores, y optimización de la experiencia del usuario.'              
        },
        {
            title: '¿Qué medidas de seguridad implementas?', 
            content: 'Verificación en dos pasos, sistemas anti-raid, filtros de contenido, niveles de acceso progresivos, monitoreo de enlaces maliciosos y respaldos regulares de configuraciones.'              
        },
        {
            title: '¿Cómo empezamos con el servicio?', 
            content: '1) Reunión inicial para entender tus necesidades, 2) Evaluación del servidor actual, 3) Propuesta de mejoras y configuraciones, 4) Implementación gradual de cambios, 5) Capacitación del equipo existente.'              
        }
    ]; 

    return (
        <div>
            <section className="breadcumb-wrapper text-center pb-90 md-pb-50 vxs-pb-30 bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="sec-title mb-30 md-mb-15">Moderación Discord</h2>
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
                                        <Image src="/assets/images/service/service-details1.jpg" alt="Moderación Discord" width={796} height={496} />
                                    </div>
                                    <p className="mb-25">Como moderador experimentado de Discord, me especializo en crear y mantener comunidades seguras y activas. Implemento sistemas automatizados y estrategias de moderación efectivas para garantizar una experiencia positiva para todos los miembros.</p>
                                    <p className="mb-55">Mi enfoque se centra en construir comunidades saludables donde los usuarios puedan interactuar de manera segura y divertida, mientras mantenemos un ambiente libre de toxicidad y comportamientos inadecuados.</p>
                                    <div className="service__details-content">
                                        <h3 className="title">Gestión profesional de comunidades Discord</h3>
                                        <p className="mb-35">Ofrezco un servicio integral de moderación que incluye configuración de bots, sistemas de verificación, gestión de roles, y estrategias de crecimiento comunitario. Cada servidor recibe atención personalizada según sus necesidades específicas.</p>
                                        <div className="service__details-thumb mb-55">
                                            <Image src="/assets/images/service/service-details2.jpg" alt="Gestión de Discord" width={796} height={496} />
                                        </div>
                                        <h3 className="title">Herramientas y Metodología de Moderación</h3>
                                        <p className="mb-35">Utilizo una combinación de bots de moderación avanzados y estrategias manuales para mantener el orden. Implemento sistemas de tickets, niveles de usuario, y eventos comunitarios para mantener el engagement.</p>
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
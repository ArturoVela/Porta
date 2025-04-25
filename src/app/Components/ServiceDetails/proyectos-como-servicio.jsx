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
            title: '¿Qué son mis "Proyectos como Servicio"?', 
            content: 'Es mi iniciativa para aplicar mis conocimientos prácticos desarrollando proyectos reales. Trabajo bajo supervisión de mentores, entregando soluciones básicas mientras aprendo mejores prácticas de desarrollo.'              
        },
        {
            title: '¿Qué tipo de proyectos puedo desarrollar?', 
            content: 'Actualmente puedo crear landing pages simples, sitios web estáticos, pequeños sistemas CRUD y aplicaciones básicas. Estoy aprendiendo a manejar proyectos más complejos gradualmente.'
        },
        {
            title: '¿Incluye soporte y mantenimiento?', 
            content: 'Ofrezco soporte básico durante 2 semanas post-entrega mientras aprendo sobre mantenimiento de proyectos. Para necesidades complejas, trabajo con la guía de desarrolladores más experimentados.'              
        },
        {
            title: '¿Cómo es tu proceso de trabajo?', 
            content: '1) Reunión para entender requerimientos básicos, 2) Investigación y planificación con ayuda de tutores, 3) Desarrollo en sprints cortos con revisiones periódicas, 4) Pruebas guiadas, 5) Entrega con documentación de lo aprendido'              
        },
        {
            title: '¿Puedo pedir cambios durante el desarrollo?', 
            content: 'Sí, pero cambios complejos pueden requerir más tiempo ya que los implemento como parte de mi aprendizaje. Priorizamos cambios que sean buenos ejercicios prácticos para mi crecimiento.'              
        },
        {
            title: '¿Qué tecnologías usas actualmente?', 
            content: 'Principalmente HTML/CSS/JavaScript básico, React iniciando con Next.js, y Firebase para bases de datos simples. Estoy aprendiendo Node.js y SQL paralelamente.'              
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
                                        <Image src="/assets/images/service/service-details1-ass.jpg" alt="Proyectos de aprendizaje" width={796} height={496} loading="lazy"/>
                                    </div>
                                    <p className="mb-25">Estoy comenzando a desarrollar proyectos prácticos como parte de mi formación, ideal para pequeñas necesidades digitales donde podamos aprender y crecer juntos. Perfecto para prototipos iniciales y proyectos de baja complejidad.</p>
                                    <p className="mb-55">Trabajo bajo la mentoría de desarrolladores experimentados, asegurando calidad en mis entregas mientras aprendo sobre gestión completa de proyectos, desde el diseño hasta el despliegue básico.</p>
                                    <div className="service__details-content">
                                        <h3 className="title">Desarrollo Guiado de Proyectos</h3>
                                        <p className="mb-35">Transformo tus ideas en productos funcionales simples, aplicando lo que aprendo en tiempo real. Cada proyecto incluye documentación de mi proceso de aprendizaje y mejores prácticas que voy incorporando.</p>
                                        <div className="service__details-thumb mb-55">
                                            <Image src="/assets/images/service/service-details2-ass.jpg" alt="Proyectos básicos" width={796} height={496} loading="lazy"/>
                                        </div>
                                        <h3 className="title">Metodología de Aprendizaje</h3>
                                        <p className="mb-35">Utilizo metodologías ágiles adaptadas a mi nivel, con énfasis en revisiones constantes y pair programming con mentores. El stack tecnológico se limita a lo que domino actualmente, priorizando calidad sobre complejidad.</p>
                                        <div className="video-wrap">
                                            <div className="jarallax" data-background="/assets/images/service/service-details3-ass.jpg" loading="lazy"></div>
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
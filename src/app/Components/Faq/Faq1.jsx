"use client"
import { useEffect, useRef, useState } from "react";

const Faq1 = () => {
    const accordionContentRef = useRef(null);
    const [openItemIndex, setOpenItemIndex] = useState(-1);
    const [firstItemOpen, setFirstItemOpen] = useState(true);

    const handleItemClick = (index) => {
        setOpenItemIndex(index === openItemIndex ? -1 : index);
    };

    useEffect(() => {
        if (firstItemOpen) {
            setOpenItemIndex(0);
            setFirstItemOpen(false);
        }
    }, [firstItemOpen]);

    const faqContent = [
        {
            number: '01',
            title: 'Investigación de Calidad',
            content: 'Realizo investigaciones aplicadas sobre la calidad del servicio en redes de telecomunicaciones, especialmente en entornos universitarios como la UNSM. Utilizo encuestas virtuales y análisis estadístico para obtener resultados relevantes.',
            tag1: 'Encuestas a estudiantes',
            tag2: 'Análisis de deficiencias',
            tag3: 'Propuesta de mejora',
            tag4: 'Estadística aplicada',
        },
        {
            number: '02',
            title: 'Análisis de Componentes',
            content: 'Aplico técnicas como el Análisis de Componentes Discriminantes (DCA) para segmentar grupos de usuarios y encontrar patrones relevantes en la percepción de calidad del servicio.',
            tag1: 'DCA',
            tag2: 'Matriz de discriminación',
            tag3: 'Agrupación por ciclos',
            tag4: 'Interpretación de resultados',
        },
        {
            number: '03',
            title: 'Herramientas y Desarrollo',
            content: 'Desarrollo aplicaciones con Node.js y Express, usando herramientas modernas como Hyprland, Zsh y Arch Linux. También diseño interfaces web optimizadas con Next.js y TailwindCSS.',
            tag1: 'Node.js y Express',
            tag2: 'Hyprland + Zsh',
            tag3: 'Next.js + Tailwind',
            tag4: 'Automatización y scripts',
        }
    ];

    return (
        <div className="process-area space space-bm-30 bg-theme2 overflow-hidden">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="title-area text-center">
                            <h2 className="sec-title">
                                Mis procesos clave para <br /> <span className="font2">la calidad y el desarrollo</span>
                            </h2>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <ul className="accordion-box faq-area">
                            {faqContent.map((item, index) => (
                                <li key={index} className={`accordion block ${index === openItemIndex ? "active" : ""}`}>
                                    <div onClick={() => handleItemClick(index)} className="acc-btn active">
                                        {item.number} <span className="title">{item.title}</span>
                                        <span className="icon"></span>
                                    </div>
                                    <div ref={accordionContentRef} className="acc-content">
                                        <div className="content">
                                            <div className="text">{item.content}</div>
                                            <ul className="tags">
                                                <li><a href="#">{item.tag1}</a></li>
                                                <li><a href="#">{item.tag2}</a></li>
                                                <li><a href="#">{item.tag3}</a></li>
                                                <li><a href="#">{item.tag4}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq1;

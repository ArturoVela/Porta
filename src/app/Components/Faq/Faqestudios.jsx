"use client"
import { useEffect, useRef, useState } from "react";

const Faqestudios = () => {
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
            title: 'Jardín de infancia',
            content: 'Estudié en el jardín de infancia IEI N.° 288 de Rioja, San Martín, donde inicié mi formación básica en un ambiente de juegos, aprendizaje y socialización temprana.',
            tag1: 'Educación inicial',
            tag2: 'IEI 288 Rioja',
            tag3: 'Aprendizaje lúdico',
            tag4: 'San Martín',
        },
        {
            number: '02',
            title: 'Escuela primaria',
            content: 'Cursé la primaria en la institución educativa Lucila Portocarrero en Rioja, donde desarrollé habilidades fundamentales en lectura, escritura, matemáticas y valores.',
            tag1: 'Educación primaria',
            tag2: 'Lucila Portocarrero',
            tag3: 'Formación básica',
            tag4: 'Rioja',
        },
        {
            number: '03',
            title: 'Escuela secundaria',
            content: 'Realicé mis estudios secundarios en la I.E. Abilia Ocampo de Rioja, donde consolidé mis conocimientos y desarrollé interés por la tecnología y las ciencias.',
            tag1: 'Educación secundaria',
            tag2: 'Abilia Ocampo',
            tag3: 'Tecnología y ciencias',
            tag4: 'Rioja',
        },
        {
            number: '04',
            title: 'Universidad',
            content: 'Actualmente estudio Ingeniería de Sistemas e Informática en la Universidad Nacional de San Martín (UNSM) en Tarapoto.',
            tag1: 'UNSM Tarapoto',
            tag2: 'Ingeniería de Sistemas',
            tag3: 'Investigación aplicada',
            tag4: 'Telecomunicaciones',
        }
    ];
    

    return (
        <div className="process-area space space-bm-30 bg-theme2 overflow-hidden">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="title-area text-center">
                            <h2 className="sec-title">
                                Mis Lugares de  <br /> <span className="font2">Estudio</span>
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

export default Faqestudios;

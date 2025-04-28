import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Eventos = () => {

    const awardContent = [
        {title: 'Xpertus Glexrobotic', tag: 'Robótica', subject: 'Tegnología', year: '2025'},
        {title: 'Chocolatería Orquidea', tag: 'Simulación', subject: 'Automatización', year: '2025'},
       
    ];    

    return (
        <section className="awards-area space">
            <div className="big-title-wrap">
                <h2 className="big-title mb-0">
                    Eventos en los que<span className="font2 ml-30 md-ml-0"> partícipe</span>
                </h2>
            </div>
            <div className="container">

                 <div className="row">
                    <div className="col-xl-12">
                        <div className="title-area">
                            <div className="btn-wrap btn-bounce-1">
                                <Link href="/eventos" className="link-btn">
                                    <span className="link-effect">
                                        <span className="effect-1">Más información</span>
                                        <span className="effect-1">Más información</span>
                                    </span>
                                    <Image src="/assets/images/icons/arrow-left-top.svg" alt="img" width={10} height={26}   />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <ul className="awards-wrap-area">
                            {awardContent.map((item, index) => (
                                <li key={index} className="single-awards-list">
                                    <span className="awards-title">{item.title}</span>
                                    <span className="awards-tag">{item.tag}</span>
                                    <span className="awards-subject">{item.subject}</span>
                                    <span className="awards-year">{item.year}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default Eventos;

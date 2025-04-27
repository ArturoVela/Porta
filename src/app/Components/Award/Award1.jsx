import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Award1 = () => {

    const awardContent = [
        {title:'Sites Of The Day', tag:'Readability', subject:'TechnoWorld', year:'2018'},
        {title:'Motion Graphics', tag:'Animation', subject:'Motion Lab', year:'2019'},
        {title:'Business Model', tag:'New Strategy', subject:'Market Life', year:'2019'},
        {title:'Web Design', tag:'Visualzation', subject:'Live Cam Project', year:'2021'},
        {title:'Developer Award', tag:'Readability', subject:'TechnoWorld', year:'2022'},
      ];    

    return (
            <section className="awards-area space">
                <div className="big-title-wrap">
                    <h2 className="big-title mb-0">Eventos en los que<span className="font2 ml-30 md-ml-0"> partícipe</span></h2>
                </div>
                <div className="container">
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
                    <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="btn-wrap btn-bounce-1 mt-35">
                        <Link className="circle-btn tp-hover-btn btn" href="/project">
                            <span className="link-effect">
                                <span className="effect-1">Más eventos</span>
                                <span className="effect-1">Más eventos</span>
                            </span>
                            <Image src="/assets/images/icons/arrow-left-top.svg" alt="img" width={10} height={10}   />
                            <i className="btn-circle-dot"></i>
                        </Link>
                    </div>
                </div>
            </div>
                </div>
            </section>
    );
};

export default Award1;
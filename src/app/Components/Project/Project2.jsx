"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Project2 = () => {

    const categoryMenu = [
        {
          title: 'Ventas App',
          category: 'Ventas',
        },
        {
          title: 'Web',
          category: 'Web',
        },
        {
            title: 'Discord',
            category: 'Discord',
          },        
      ];

      const [active, setActive] = useState('all');    

      const projectContent = [
        {
            title:'Caña Wasky', 
            number:'01/04', 
            content:'Sistema de ventas a medida para Caña Wasky. Optimiza la gestión y el crecimiento de este negocio único.',
            img:'/assets/images/portfolio/portfolio1_1.jpg',
            tag:'Sistema ventas, Interfaz de usuario (UI)',
            year:'( 2025 )',              
            category:'Ventas',
            slug: 'cana-wasky'           
        },
        {
            title:'Pachas café', 
            number:'02/04', 
            content:"Página web impactante para Pacha's Café. Descubre su delicioso mundo, menú y ubicación en línea.",
            img:'/assets/images/portfolio/portfolio1_2.jpg',
            tag:'Dieseño web, Interfaz de usuario (UI)',
            year:'( 2024 )',              
            category:'Web',
            slug: 'pachas-cafe-web'   
        },
        {
            title:'Municipio de Rioja', 
            number:'03/04', 
            content:'Propuesta web innovadora para el Municipio de Rioja. Busco modernizar su presencia digital y facilitar la interacción ciudadana.',
            img:'/assets/images/portfolio/portfolio1_3.jpg',
            tag:'Dieseño web, Interfaz de usuario (UI)',
            year:'( 2022 )',              
            category:'Web',
            slug: 'municipalidad-de-rioja'                
        },
        {
            title:'Discord', 
            number:'04/04', 
            content:'Creo y administro servidores eficientes, implementando moderación experta para plataformas como Discord. ¡Comunidades en línea organizadas y seguras garantizadas!',
            img:'/assets/images/portfolio/portfolio1_4.jpg',
            tag:'Discord, Interfaz de usuario (UI)',
            year:'( 2018 - 2025 )',              
            category:'Discord',
            slug: 'discord'    
        }      
  ];   

    return (
        <section className="portfolio-area space overflow-hidden">
        <div className="portfolio-title text-center">
            <h2 className="big-title">Impresionante <span className="font2 xs-d-none">Portafolio</span></h2>
        </div>
        <div className="container">
            <div className="row mb-50 sm-mb-30">
                <div className="col-lg-12 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                    <div className="portfolio-text md-mb-20 mb-lg-0">Trabajos seleccionados * <span> (2018-2025)</span></div>
                    <ul className="portfolio-filter">
                        <li className={active === 'all' ? 'active' : ''} onClick={() => setActive('all')} data-filter="*"> Todos los casos </li>
                        {categoryMenu.map((item, index) => (
                         <li onClick={() => setActive(item.category)} className={active === item.category ? 'active' : ''} key={index} > {item.title} </li>
                        ))}                       

                    </ul>
                </div>                        
            </div>
            <div className="row justify-content-between masonary-active">
            {projectContent.map((item, i) => (
                <div key={i} className={`col-lg-12 filter-item  ${ active === 'all' ? '' : !(active === item.category) ? 'd-none' : '' }`} >
                    <div className="portfolio-wrap">
                        <div className="portfolio-details">
                            <h3 className="portfolio-title">
                                <Link href={`/project/${item.slug}`}>{item.title}</Link>
                                <span className="portfolio-pagination">{item.number}</span>
                            </h3>
                            <p className="portfolio-desc">{item.content} </p>
                            <div className="portfolio-title_upper">
                                <span className="text">{item.tag}</span>
                                <span className="portfolio-year">{item.year}</span>
                            </div>
                        </div>
                        <div className="portfolio-thumb">
                            <Link href={`/project/${item.slug}`}>
                            <Image src={item.img} alt="img" width={602} height={401}   />
                            </Link>
                            <div className="portfolio-thumb-view">
                                <Link href={`/project/${item.slug}`} className="lightbox-image" data-fancybox="gallery">
                                <Image src="/assets/images/icons/eye.svg" alt="img" width={36} height={36}   />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="btn-wrap btn-bounce-1 mt-35">
                        <Link className="circle-btn tp-hover-btn btn" href="/project">
                            <span className="link-effect">
                                <span className="effect-1">Más información</span>
                                <span className="effect-1">Más información</span>
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

export default Project2;
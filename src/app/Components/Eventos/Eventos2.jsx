import Link from "next/link";

const projectContent = [
   
    // {
    //     addclass:'col-lg-7',
    //     img:'/assets/images/portfolio/portfolio3_4_pachaweb.jpg',
    //     title:"Pacha's Café",
    //     category:'Pagina web',
    //     slug: 'pachas-cafe-web'
    // },
    // {
    //     addclass:'col-lg-5',
    //     img:'/assets/images/portfolio/portfolio3_5_rioja.jpg',
    //     title:'Municipalidad de Rioja ',
    //     category:'Pagina web',
    //     slug: 'municipalidad-de-rioja'
    // },
       
    {
        addclass:'col-lg-5',
        img:'/assets/images/eventos/Eventos1-1-xpertus.jpg',
        title:'Xpertus glexrobotics',
        category:'Evento Tecnológico',
        slug: 'xpertus-glexrobotics'
    },
    {
        addclass:'col-lg-7',
        img:'/assets/images/eventos/Eventos1-2-orquidea.jpg',
        title:'Chocolatería orquidea',
        category:'Visita Industrial',
        slug: 'chocolateria-orquidea'
    },
];

const Eventos2 = () => {
    return (
        <div className="portfolio-area style-three bg-theme2">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="title-upper_area">
                            <span className="title">( Eventos )</span>
                            <div className="right">
                                <span className="title">(  2025 - Ahora  )</span>
                                <h3 className="title-info_text mt-50 md-mt-30 xs-mt-15">
                                    Echa un vistazo a algunos de los eventos en los que he participado.
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="tab_content">
                        <div className="tabs-item">
                            <div className="row gx-110 justify-content-between">
                                {projectContent.map((item, i) => (
                                    <div key={i} className={item.addclass}>
                                        <div className="portfolio-wraper-3">
                                            <div className="portfolio-thumb style-2 wow img-custom-anim-left">
                                                <Link href={`/eventos/${item.slug}`}>
                                                    <img alt="Eventos" src={item.img} loading="lazy" style={{ borderRadius: '20px' }}/>
                                                </Link>
                                                <div className="portfolio-thumb-view">
                                                    <Link href={`/eventos/${item.slug}`} className="lightbox-image" data-fancybox="gallery">
                                                        <img src="/assets/images/icons/eye.svg" alt="View" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="portfolio-details pr-30 md-pr-0">
                                                <h4 className="title">
                                                    <Link href={`/eventos/${item.slug}`}>{item.title}</Link>
                                                </h4>
                                                <Link href={`/project/${item.slug}`} className="portfolio-btn">
                                                    <span className="meta">{item.category}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventos2;
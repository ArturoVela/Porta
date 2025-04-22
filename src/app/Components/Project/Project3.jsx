import Link from "next/link";

const projectContent = [
    {
        addclass:'col-lg-12',
        img:'/assets/images/portfolio/portfolio3_6_cana.jpg',
        title:'Caña Wasky',
        category:'Sistema de Ventas',
        slug: 'cana-wasky'
    },
    {
        addclass:'col-lg-12',
        img:'/assets/images/portfolio/portfolio3_6_pacha.jpg',
        title:"Pacha's Café",
        category:'Sistema de Ventas',
        slug: 'pachas-cafe-web'
    },   
    {
        addclass:'col-lg-5',
        img:'/assets/images/portfolio/portfolio3_1.jpg',
        title:'Illustrator Graphics',
        category:'Designing',
        slug: 'illustrator-graphics'
    },
    {
        addclass:'col-lg-7',
        img:'/assets/images/portfolio/portfolio3_2.jpg',
        title:'Figma Design',
        category:'Application',
        slug: 'figma-design'
    },
    {
        addclass:'col-lg-12',
        img:'/assets/images/portfolio/portfolio3_3.jpg',
        title:'Discord ',
        category:'Branding',
        slug: 'discord'
    },
    {
        addclass:'col-lg-7',
        img:'/assets/images/portfolio/portfolio3_4_pachaweb.jpg',
        title:"Pacha's Café",
        category:'Pagina web',
        slug: 'pachas-cafe-web'
    },
    {
        addclass:'col-lg-5 text-lg-end',
        img:'/assets/images/portfolio/portfolio3_5.jpg',
        title:'Municipalidad de Rioja ',
        category:'Pagina web',
        slug: 'municipalidad-de-rioja'
    },
];

const Project3 = () => {
    return (
        <div className="portfolio-area style-three bg-theme2">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="title-upper_area">
                            <span className="title">( Portafolio )</span>
                            <div className="right">
                                <span className="title">(  2018 - 2025  )</span>
                                <h3 className="title-info_text mt-50 md-mt-30 xs-mt-15">
                                    Echa un vistazo a algunos de los proyectos en los que he trabajado. Los clientes van desde empresas de tecnología y diseño.
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
                                                <Link href={`/project/${item.slug}`}>
                                                    <img alt="portfolio" src={item.img} />
                                                </Link>
                                                <div className="portfolio-thumb-view">
                                                    <Link href={`/project/${item.slug}`} className="lightbox-image" data-fancybox="gallery">
                                                        <img src="/assets/images/icons/eye.svg" alt="View" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="portfolio-details pr-30 md-pr-0">
                                                <h4 className="title">
                                                    <Link href={`/project/${item.slug}`}>{item.title}</Link>
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

export default Project3;
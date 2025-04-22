import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';

const Services2 = () => {

    const serviceContent = [
        {
          title: 'Desarrollo <br> Web',
          icon: '/assets/images/service/web.svg',
          service1: 'Next.js',
          service2: 'Node.js',
          service3: 'Css3 y HTML5',
          img: '/assets/images/service/service-1_1.jpg',
          addclass: 'service-title mr-10',
        },
        {
          title: 'Moderación <br> Discord',
          icon: '/assets/images/service/brand.svg',
          service1: 'Gestión de roles',
          service2: 'Automod y bots',
          service3: 'Comunidades seguras',
          img: '/assets/images/service/service-1_2.jpg',
          addclass: 'service-title mr--10',
        },
        {
          title: 'Diseño <br> UI/UX',
          icon: '/assets/images/service/ui_ux.svg',
          service1: 'Ps / Ai',
          service2: 'Diseño responsive',
          service3: 'Prototipos funcionales',
          img: '/assets/images/service/service-1_3.jpg',
          addclass: 'service-title mr-60',
        },
        {
          title: 'Edición <br> VS Code',
          icon: '/assets/images/service/app.svg',
          service1: 'Productividad',
          service2: 'Snippets',
          service3: 'Utilidades',
          img: '/assets/images/service/service-1_4.jpg',
          addclass: 'service-title mr-40',
        },
        {
          title: 'Proyectos <br> como Servicio',
          icon: '/assets/images/service/digital.svg',
          service1: 'MVPs rápidos',
          service2: 'Despliegue Vercel',
          service3: 'SaaS en desarrollo',
          img: '/assets/images/service/service-1_5.jpg',
          addclass: 'service-title mr--40',
        },
      ];

    return (
        <section className="service-area space bg-theme2">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="title-area">
                      <h2 className="sec-title text-center"> Ofrezco una <span className="font2 wow text-anim-left">amplia variedad de servicios</span> en <br/> el entorno digital y tecnológico</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="service-item-wrapper">
                    {serviceContent.map((item, i) => (
                        <div key={i} className="service-item hover-reveal-item">
                            <div className="service-inner">
                                <div className="service-left">
                                    <div className="service-icon"><Image src={item.icon} alt="img" width={70} height={70}   /></div>
                                    <h3 className={item.addclass}><Link href="/service/service-details">{parse(item.title)}</Link></h3>
                                    <ul className="service-list">
                                         <li>+ {item.service1}</li>
                                        <li>+ {item.service2}</li>
                                        <li>+ {item.service3}</li>
                                    </ul>
                                </div>
                                <div className="service-btn-wrapper">
                                    <Link className="service-btn" href="/service/service-details">
                                        <span><i className="bi bi-arrow-up-right"></i><i className="bi bi-arrow-up-right"></i></span>
                                    </Link>
                                </div>
                            </div>
                            <div className="hover-reveal-bg" data-background="assets/images/service/service-1_1.jpg"></div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Services2;
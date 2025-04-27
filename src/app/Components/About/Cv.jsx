import Image from "next/image";
import Link from "next/link";

const About2 = () => {

    const aboutContent = {
        title1: "Descarga mi",
        title2: 'curriculum vitae',
        title3: 'y conoce mis proyectos.',
        content: "Soy desarrollador web, enfocado en crear sitios web responsivos, accesibles y optimizados. Trabajo con tecnologías como Next.js, Tailwind y Node.js. He trabajado directamente con clientes y actualmente estoy explorando el desarrollo de servicios SaaS.",
        btnname: 'Descargar CV',
        btnurl: 'https://1drv.ms/b/s!AhTBs2k3EIAxjthfmoaQGB-VJxbvKA?e=jyDFsy',
        img: '/assets/images/about/about_1-1-cv.jpg',
      };
      

    return (
        <section className="about-area space bg-theme2" id="about-area-1">
        <div className="container">
            <div className="row align-items-center">
                <p> </p>
                <div className="col-lg-5">
                    <div className="about-img-1-1 img-custom-anim-right wow" data-wow-delay="0.1s" data-wow-duration="1.5s">
                    <Image src={aboutContent.img} alt="img" width={536} height={656}   />
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="about-content-wrap ">
                        <div className="title-area mb-0">
                            <h2 className="sec-title">{aboutContent.title1} <span className="font2">{aboutContent.title2}</span> {aboutContent.title3}</h2>
                            <div className="about_content">
                                <p className="about-text wow text-anim-left mt-50 vxs-mt-30">{aboutContent.content}</p>
                                <div className="btn-wrap btn-bounce-1 home-circle-btn">
                                    <Link className="circle-btn btn gsap-magnetic" href={aboutContent.btnurl} target="_blank">
                                        <span className="link-effect">
                                            <span className="effect-1">{aboutContent.btnname}</span>
                                            <span className="effect-1">{aboutContent.btnname}</span>
                                        </span>
                                        <Image src="/assets/images/icons/arrow-left-top.svg" alt="img" width={10} height={10}   />
                                    </Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
    );
};

export default About2;
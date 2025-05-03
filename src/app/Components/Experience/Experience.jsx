import Image from "next/image";
import Link from "next/link";

const Experience = () => {

    const experiencetContent = [
        {name:'Caña Wasky - Perú', position:'Diseñador Ventas', year:'2025-1 - Presente'},
        {name:'K & F Products', position:'Administrador de ventas', year:'2024-7 - 2024-9'},
        {name:'Pachas Café - Perú', position:'Diseñador Web', year:'2024-3 - 2024-5'},
        {name:'Discord - Servidores', position:'Admin - Moderador', year:'2018 - Presente'} 
      ];  

    return (
        <section className="experience-area space bg-theme2 overflow-hidden">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="title-area">
                            <h2 className="sec-title mb-0" data-title="(2018 - 2025)">Experiencia de <span className="font2">Trabajo</span></h2>
                            <div className="btn-wrap btn-bounce-1">
                                <Link href="/project" className="link-btn">
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
                        <ul className="experience-wrap-area">
                        {experiencetContent.map((item, i) => (
                            <li key={i} className="single-experience-list">
                                <span className="experience-place">{item.name}</span>
                                <span className="experience-tag">{item.position}</span>
                                <span className="experience-year">{item.year}</span>
                            </li>
                        ))}

                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
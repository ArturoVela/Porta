import Image from "next/image";

const Marquee2 = () => {
    return (
        <div className="marquee-area">
            <div className="slider__marquee clearfix marquee-wrap">
                <div className="marquee_mode marquee__group">
                    <div className="item m-item"><div className="icon"><Image src="/assets/images/icons/sharp-star-of-life.svg" alt="img" width={46} height={46}   /></div>  Moderador en comunidades de Discord</div>
                    <div className="item m-item style-2"><div className="icon"><Image src="/assets/images/icons/sharp-star-of-life.svg" alt="img" width={46} height={46}   /></div> 8+ Projectos Completados</div>
                    <div className="item m-item"><div className="icon"><Image src="/assets/images/icons/sharp-star-of-life.svg" alt="img" width={46} height={46}   /></div> Más de 300 clientes satisfechos</div>
                    <div className="item m-item style-2"><div className="icon"><Image src="/assets/images/icons/sharp-star-of-life.svg" alt="img" width={46} height={46}   /></div> SaaS en desarrollo (as a service)</div>
                </div>
                <div className="marquee_mode marquee__group">
                    <div className="item m-item"><div className="icon"><Image src="/assets/images/icons/sharp-star-of-life.svg" alt="img" width={46} height={46}   /></div>  Moderador en comunidades de Discord</div>
                    <div className="item m-item style-2"><div className="icon"><Image src="/assets/images/icons/sharp-star-of-life.svg" alt="img" width={46} height={46}   /></div> 8+ Projectos Completados</div>
                    <div className="item m-item"><div className="icon"><Image src="/assets/images/icons/sharp-star-of-life.svg" alt="img" width={46} height={46}   /></div> Más de 300 clientes satisfechos</div>
                    <div className="item m-item style-2"><div className="icon"><Image src="/assets/images/icons/sharp-star-of-life.svg" alt="img" width={46} height={46}   /></div> SaaS en desarrollo (as a service)</div>
                </div>                
            </div>
        </div>
    );
};

export default Marquee2;
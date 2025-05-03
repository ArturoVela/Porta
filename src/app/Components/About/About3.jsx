import parse from 'html-react-parser';
import Image from 'next/image';

const About3 = () => {

    const aboutContent = {
        title:"Sobre mí",
        content: 'Soy ingeniero en sistemas y me especializo en <span className="font2">desarrollo web</span>, moderación de <span className="font2">comunidades en Discord</span> y estoy comenzando a ofrecer soluciones <span className="font2">as a service</span> enfocadas en tecnología y automatización.',
        img:'/assets/images/about/about-3_1.jpg',        
      }

    return (
        <section className="about-hero space-bottom bg-theme2">
        <div className="container">
            <div className="row">
                <div className="col-xl-12 text-center">
                    <h2 className="big-title mb-50 sm-mb-30 wow img-custom-anim-left">{aboutContent.title}</h2>
                    <p className="text mb-120 lg-mb-60 sm-mb-30">{parse(aboutContent.content)}</p>
                    <figure className="thumb mb-0"><Image src={aboutContent.img} alt="img" width={1320} height={650} className="responsive-img"  /></figure>
                </div>
            </div>
        </div>
    </section>
    );
};

export default About3;
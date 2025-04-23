"use client"
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";

const Brand2 = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,        
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 5,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
            }
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
    };  

    const brandContent = [
        {
            img: '/assets/images/brands/brand-1_1.png',
            href: 'https://www.tensorflow.org/',
            alt: 'TensorFlow'
        },
        {
            img: '/assets/images/brands/brand-1_2.png',
            href: 'https://pytorch.org/',
            alt: 'PyTorch'
        },
        {
            img: '/assets/images/brands/brand-1_3.png',
            href: 'https://keras.io/',
            alt: 'Keras'
        },
        {
            img: '/assets/images/brands/brand-1_4.png',
            href: 'https://scikit-learn.org/',
            alt: 'Scikit-learn'
        },
        {
            img: '/assets/images/brands/brand-1_5.png',
            href: 'https://numpy.org/',
            alt: 'NumPy'
        },
        {
            img: '/assets/images/brands/brand-1_1.png',
            href: 'https://pandas.pydata.org/',
            alt: 'Pandas'
        },
        {
            img: '/assets/images/brands/brand-1_2.png',
            href: 'https://matplotlib.org/',
            alt: 'Matplotlib'
        },
        {
            img: '/assets/images/brands/brand-1_3.png',
            href: 'https://opencv.org/',
            alt: 'OpenCV'
        },
        {
            img: '/assets/images/brands/brand-1_4.png',
            href: 'https://jupyter.org/',
            alt: 'Jupyter'
        },
        {
            img: '/assets/images/brands/brand-1_5.png',
            href: 'https://www.python.org/',
            alt: 'Python'
        },
    ];   

    return (
        <section className="brand-area space-bottom bg-theme2">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="title-area text-center mb-120 lg-mb-90 md-mb-80 vxs-mb-60">
                                <h6 className="title mb-0">Más de <span className="color1">4+ empresas</span> confían en mí</h6>
                            </div>
                        </div>
                    </div>
                    <div className="sponsors-outer">
                        <ul className="brands-carousel owl-carousel owl-theme cs_slider_gap_30"> 
                        <Slider {...settings}>
                        {brandContent.map((item, i) => (
                            <li key={i} className="brand-item">
                                <Link 
                                    href={item.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="image"
                                >
                                    <Image 
                                        src={item.img} 
                                        alt={item.alt} 
                                        width={147} 
                                        height={147}   
                                    />
                                    <Image 
                                        src={item.img} 
                                        alt={item.alt} 
                                        width={147} 
                                        height={147}   
                                    />
                                </Link>
                            </li>
                        ))}
                        </Slider>
                        </ul>
                    </div>
                </div>
            </section>
    );
};

export default Brand2;
import Image from "next/image";

const Footer1 = () => {
    return (
        <footer className="footer-wrapper footer-layout1">
        <div className="main-area style-two space-minimize">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-xl-12">
                        <h2 className="big-title mb-50">Vamos  <Image src="/assets/images/footer.svg" alt="img" width={120} height={120}   /> Hablar</h2>
                    </div>
                    <div className="col-xl-12">
                        <div className="contact-mail">
                            <a href="mailto:velarturo70@gmail.com" className="bg-black2">
                                <span className="link-effect">
                                    <span className="effect-1">velarturo70@gmail.com</span>
                                    <span className="effect-1">Correo Personal</span>
                                </span>
                                <Image src="/assets/images/icons/arrow-left-top.svg" alt="img" width={16} height={40}   />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="contact-btn-box mt-60 mb-70 vxs-mb-30">
                    <div className="row gx-60 lg-gx-30">
                       <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="contact-btn mb-30 text-center ">
                             <a className="btn-black" href="mailto:velaarturo70@gmail.com">
                                <span className="link-effect">
                                    <span className="effect-1">Escribe un mensaje</span>
                                    <span className="effect-1">Por correo</span>
                                </span>
                             </a>
                          </div>
                       </div>
                       <div className="col-xl-6 col-lg-6 col-md-6">
                          <div className="contact-btn text-center ">
                             <a className="btn-black" href="mailto:velaarturo70@gmail.com">
                                <span className="link-effect">
                                    <span className="effect-1">Discutir el proyecto</span>
                                    <span className="effect-1">Por correo</span>
                                </span>
                             </a>
                          </div>
                       </div>
                    </div>
                </div>
                <div className="row gx-30">
                    <div className="col-lg-3 col-md-6">
                        <div className="social-item">
                            <h5 className="title">Facebook</h5>
                            <a href="https://www.facebook.com/ArTuRoVeLaXD" target="_blank">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="bi bi-facebook"></i></span>
                                    <span className="effect-1"><i className="bi bi-facebook"></i></span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="social-item">
                            <h5 className="title">Instagram</h5>
                            <a href="https://www.instagram.com/icchfinsa/" target="_blank">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="bi bi-instagram"></i></span>
                                    <span className="effect-1"><i className="bi bi-instagram"></i></span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="social-item">
                            <h5 className="title">Twitter</h5>
                            <a href="https://twitter.com/" target="_blank">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="bi bi-twitter-x"></i></span>
                                    <span className="effect-1"><i className="bi bi-twitter-x"></i></span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="social-item">
                            <h5 className="title">Linkedin</h5>
                            <a href="https://www.linkedin.com/in/arturo-vela-aa81242ba/" target="_blank">
                                <span className="link-effect">
                                    <span className="effect-1"><i className="bi bi-linkedin"></i></span>
                                    <span className="effect-1"><i className="bi bi-linkedin"></i></span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-wrap">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-xl-12 text-center">
                        <p className="copyright-text">© Arturo Vela — 2025.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer1;
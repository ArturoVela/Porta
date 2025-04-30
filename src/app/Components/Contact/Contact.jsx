"use client";
import Image from "next/image";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("myzwkoqa");

  return (
    <div>
      <div className="breadcumb-wrapper pb-100 md-pb-80 vxs-pb-60 bg-theme2">
        <div className="breadcumb-title text-center">
          <h2 className="big-title mb-0">Contacta<span className="font2">Conmigo</span></h2>
        </div>
      </div>

      <div className="feature-area pb-60 bg-theme2">
        <div className="container">
          <div className="row gy-4 align-items-center justify-content-center">
            <div className="col-lg-4">
              <div className="feature-box">
                <div className="feature-box-icon">
                  <Image src="/assets/images/icons/phone.svg" alt="img" width={34} height={34} />
                </div>
                <div className="feature-box-details">
                  <h5 className="feature-box-title">Celular / Whatsapp</h5>
                  <div className="feature-box-text">
                    <a href="tel:+51963653154">+51 963 653 154</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-box">
                <div className="feature-box-icon">
                  <Image src="/assets/images/icons/email.svg" alt="img" width={32} height={24} />
                </div>
                <div className="feature-box-details">
                  <h5 className="feature-box-title">Email</h5>
                  <div className="feature-box-text">
                    <a href="mailto:velaarturo70@gmail.com">velaarturo70<br />@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-box">
                <div className="feature-box-icon">
                  <Image src="/assets/images/icons/location.svg" alt="img" width={30} height={34} />
                </div>
                <div className="feature-box-details">
                  <h5 className="feature-box-title">Discord</h5>
                  <div className="feature-box-text">@maldadpurpura <br /> @navyfz</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="comment-area style-two space-bottom bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="comment-respond">
                <h2 className="comment-title font2">Contacta conmigo!</h2>

                {state.succeeded ? (
                  <p className="text-success">¡Gracias por tu mensaje! Te responderé pronto.</p>
                ) : (
                  <form onSubmit={handleSubmit} className="comment-form">
                    <div className="row gx-20">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="text" className="form-control" name="name" placeholder="Nombre" required />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="text" className="form-control" name="Phone" placeholder="Celular" required />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="email" className="form-control" name="email" placeholder="Email" required />
                          <ValidationError prefix="Email" field="email" errors={state.errors} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input type="text" className="form-control" name="Subject" placeholder="Asunto" required />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea name="message" placeholder="Mensaje" className="form-control style2" required></textarea>
                          <ValidationError prefix="Message" field="message" errors={state.errors} />
                        </div>
                      </div>
                    </div>
                    <div className="form-btn col-12">
                      <button type="submit" className="link-btn w-100 br-10" disabled={state.submitting}>
                        <span className="link-effect">
                          <span className="btn-title">Enviar mensaje</span>
                        </span>
                        <img src="/assets/images/icons/arrow-left-top.svg" alt="icon" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="contact-map mt-60">
                <iframe
                  src="https://maps.google.com/maps?q=Tarapoto%2C%20San%20Mart%C3%ADn%2C%20Per%C3%BA&t=m&z=12&output=embed"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

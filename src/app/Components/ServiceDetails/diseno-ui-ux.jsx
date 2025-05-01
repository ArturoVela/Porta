"use client";
import { useEffect, useRef, useState } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Link from "next/link";
import Image from "next/image";

const ServiceDetails = () => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

  const [openItemIndex, setOpenItemIndex] = useState(0);

  const handleItemClick = (index) => {
    setOpenItemIndex(openItemIndex === index ? -1 : index);
  };

  const faqContent = [
    {
      title: "¿Qué diferencia hay entre UI y UX?",
      content:
        "UI (Interfaz de Usuario) se centra en el diseño visual y la estética, mientras que UX (Experiencia de Usuario) se enfoca en cómo el usuario interactúa con el producto. Estoy aprendiendo ambos aspectos para crear experiencias digitales más completas.",
    },
    {
      title: "¿Qué incluye un proyecto de diseño UI/UX?",
      content:
        "Aunque estoy recién empezando, trato de aplicar investigación básica de usuarios, wireframes simples y prototipos. Todo es parte del proceso de aprendizaje.",
    },
    {
      title: "¿Qué herramientas de diseño utilizas?",
      content:
        "Uso Figma principalmente para practicar diseño y prototipado. También estoy explorando otras herramientas como Adobe XD, Photoshop e Illustrator.",
    },
    {
      title: "¿Cuánto dura un proyecto de diseño UI/UX?",
      content:
        "Todavía no tengo mucha experiencia, así que cada proyecto es diferente. Me tomo el tiempo necesario para aprender y mejorar con cada uno.",
    },
    {
      title: "¿Realizas pruebas de usabilidad?",
      content:
        "Estoy aprendiendo a hacer pruebas de usabilidad simples, como mostrar mis diseños a amigos o conocidos para recibir retroalimentación.",
    },
    {
      title: "¿Cómo es el proceso de diseño?",
      content:
        "Sigo una versión básica del proceso: 1) Investigo un poco sobre el usuario, 2) Hago wireframes, 3) Diseño en Figma, 4) Comparto para recibir feedback, 5) Mejoro y entrego.",
    },
  ];

  return (
    <div>
      <section className="breadcumb-wrapper text-center pb-90 md-pb-50 vxs-pb-30 bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="sec-title mb-30 md-mb-15">Diseño UI/UX</h2>
              <div className="sec-icon">
                <i className="fa-regular fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service__details-area space-bottom bg-theme2">
        <div className="container">
          <div className="service__inner-wrap">
            <div className="row gx-35 lg-gx-25">
              <div className="col-lg-8">
                <div className="service__details-wrap">
                  <div className="service__details-thumb">
                    <Image
                      src="/assets/images/service/service-details1-ux.jpg"
                      alt="Diseño UI/UX"
                      width={796}
                      height={496}
                      loading="lazy"
                      className="responsive-img"
                    />
                  </div>
                  <p className="mb-25">
                    Como diseñador UI/UX junior, estoy dando mis primeros pasos
                    en el mundo del diseño digital. Me encanta aprender y
                    experimentar con formas de hacer que las interfaces sean más
                    amigables y visualmente atractivas.
                  </p>
                  <p className="mb-55">
                    Aunque estoy recién empezando, me esfuerzo por entender lo
                    que el usuario necesita y cómo hacer que las soluciones
                    digitales sean lo más útiles y claras posible.
                  </p>
                  <div className="service__details-content">
                    <h3 className="title">Diseño centrado en el usuario</h3>
                    <p className="mb-35">
                      Estoy aprendiendo a aplicar metodologías de diseño
                      centrado en el usuario. Me interesa mucho investigar y
                      entender qué necesitan las personas para diseñar algo que
                      realmente les sirva y les guste.
                    </p>
                    <div className="service__details-thumb mb-55">
                      <Image
                        src="/assets/images/service/service-details2-ux.jpg"
                        alt="Proceso de diseño"
                        width={796}
                        height={496}
                        loading="lazy"
                        className="responsive-img"
                      />
                    </div>
                    <h3 className="title">Metodología y Herramientas</h3>
                    <p className="mb-35">
                      Uso herramientas como Figma y Adobe XD para practicar y
                      mejorar mis habilidades. Cada nuevo proyecto es una
                      oportunidad para aprender algo nuevo y afinar mi forma de
                      trabajar.
                    </p>
                    <div className="video-wrap">
                      <div
                        className="jarallax responsive-img"
                        data-background="/assets/images/service/service-details3-ux.jpg"
                        loading="lazy"
                        
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="faq-area-1">
                  <h3 className="faq-title">Preguntas Frecuentes</h3>
                  <ul className="accordion-box style-2 faq-area">
                    {faqContent.map((item, index) => (
                      <li
                        key={index}
                        className={`accordion block${
                          openItemIndex === index ? " active" : ""
                        }`}
                      >
                        <div
                          onClick={() => handleItemClick(index)}
                          className="acc-btn"
                          style={{ cursor: "pointer" }}
                        >
                          {item.title}
                          <i
                            className={`fa-solid fa-arrow-down${
                              openItemIndex === index ? " rotated" : ""
                            }`}
                            style={{ marginLeft: 8 }}
                          ></i>
                        </div>
                        <div
                          className="acc-content"
                          style={{
                            display: openItemIndex === index ? "block" : "none",
                          }}
                        >
                          <div className="content">
                            <div className="text">{item.content}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <aside className="service__sidebar">
                  <div className="sidebar__widget">
                    <div className="sidebar__service-list">
                      <ul className="list-wrap">
                        <li>
                          <Link href="/service/desarrollo-web">
                            Desarrollo Web
                          </Link>
                        </li>
                        <li>
                          <Link href="/service/moderacion-discord">
                            Moderación Discord
                          </Link>
                        </li>
                        <li>
                          <Link href="/service/diseno-ui-ux">Diseño UI/UX</Link>
                        </li>
                        <li>
                          <Link href="/service/edicion-vscode">
                            Edición VS Code
                          </Link>
                        </li>
                        <li>
                          <Link href="/service/proyectos-como-servicio">
                            Proyectos como Servicio
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sidebar__widget">
                    <div className="sidebar__contact-info">
                      <figure className="thumb mb-25">
                        <Image
                          className="br-10 responsive-img"
                          src="/assets/images/service/details-thumb.jpg"
                          alt="Contacto"
                          width={347}
                          height={354}
                        />
                      </figure>
                      <h4 className="sidebar__widget-title">Contáctame</h4>
                      <ul className="contact-info-list">
                        <li className="item">
                          <div className="icon">
                            <Image
                              src="/assets/images/service/phone-icon.png"
                              alt="Teléfono"
                              width={35}
                              height={35}
                            />
                          </div>
                          <a href="tel:+51963653154">
                            <span className="text">
                              Celular / WhatsApp
                              <br />
                              +51 963 653 154
                            </span>
                          </a>
                        </li>
                        <li className="item">
                          <div className="icon">
                            <Image
                              src="/assets/images/service/message-icon.png"
                              alt="Email"
                              width={35}
                              height={35}
                            />
                          </div>
                          <a href="mailto:velaarturo70@gmail.com">
                            <span className="text">velaarturo70@gmail.com</span>
                          </a>
                        </li>
                        <li className="item">
                          <div className="icon">
                            <Image
                              src="/assets/images/service/location-icon.png"
                              alt="Discord"
                              width={35}
                              height={35}
                            />
                          </div>
                          <span className="text">
                            Discord
                            <br />
                            @maldadpurpura <br></br>@navyfz
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;

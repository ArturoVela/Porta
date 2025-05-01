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
      title: "¿Qué puedo ofrecer en personalización?",
      content:
        "Estoy aprendiendo a configurar: temas básicos, extensiones útiles que he descubierto, y algunos atajos de teclado que he encontrado prácticos. Comparto lo que he aprendido hasta ahora en mi proceso de aprendizaje.",
    },
    {
      title: "¿Qué extensiones recomiendo?",
      content:
        "Por ahora conozco algunas básicas como Prettier para formateo, Live Server para desarrollo web, y estoy explorando GitLens para control de versiones. ¡Aún estoy descubriendo nuevas herramientas!",
    },
    {
      title: "¿Cómo manejo la sincronización?",
      content:
        "Estoy aprendiendo a usar Settings Sync para guardar configuraciones. Puedo ayudarte a configurar esta herramienta básica, pero aún estoy practicando con sus funciones avanzadas.",
    },
    {
      title: "¿Creo snippets personalizados?",
      content:
        "Recién estoy empezando a crear snippets simples para estructuras básicas de código. Puedo compartir los que he creado hasta ahora y aprender juntos a mejorarlos.",
    },
    {
      title: "¿Cómo mejoro la productividad?",
      content:
        "Estoy implementando los atajos de teclado que he aprendido y configuraciones básicas que he encontrado útiles en mi propio proceso de aprendizaje como desarrollador junior.",
    },
    {
      title: "¿Ofrezco capacitación?",
      content:
        "Puedo compartir mis apuntes y lo que he aprendido hasta ahora, pero todavía estoy en proceso de dominar todas las funciones. ¡Podemos explorar juntos las configuraciones!",
    },
  ];

  return (
    <div>
      <section className="breadcumb-wrapper text-center pb-90 md-pb-50 vxs-pb-30 bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="sec-title mb-30 md-mb-15">Edición VS Code</h2>
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
                      src="/assets/images/service/service-details1-vs.jpg"
                      alt="Aprendiendo VS Code"
                      width={796}
                      height={496}
                      loading="lazy"
                      className="responsive-img"
                    />
                  </div>
                  <p className="mb-25">
                    Como desarrollador junior entusiasta, estoy aprendiendo a
                    personalizar VS Code y quiero compartir contigo lo que he
                    descubierto hasta ahora. Mi objetivo es ayudarte a crear un
                    entorno de trabajo más cómodo mientras aprendemos juntos.
                  </p>
                  <p className="mb-55">
                    Estoy explorando diferentes configuraciones y extensiones
                    que pueden hacer nuestra codificación más eficiente. Aunque
                    todavía estoy aprendiendo, puedo mostrarte las herramientas
                    básicas que me han ayudado en mis primeros proyectos.
                  </p>
                  <div className="service__details-content">
                    <h3 className="title">
                      Mis Primeros Pasos en Personalización
                    </h3>
                    <p className="mb-35">
                      Estoy experimentando con configuraciones básicas de VS
                      Code. He aprendido a cambiar temas, instalar extensiones
                      útiles y crear algunos atajos simples. ¡Acompáñame en este
                      proceso de aprendizaje!
                    </p>
                    <div className="service__details-thumb mb-55">
                      <Image
                        src="/assets/images/service/service-details2-vs.jpg"
                        alt="Configuración básica"
                        width={796}
                        height={496}
                        loading="lazy"
                        className="responsive-img"
                      />
                    </div>
                    <h3 className="title">Descubriendo Funcionalidades</h3>
                    <p className="mb-35">
                      Actualmente estoy explorando cómo integrar herramientas
                      básicas de desarrollo y sistemas de control de versiones.
                      Compartiré contigo los flujos de trabajo simples que he
                      implementado con éxito en mis proyectos iniciales.
                    </p>
                    <div className="video-wrap">
                      <div
                        className="jarallax responsive-img"
                        data-background="/assets/images/service/service-details3-vs.jpg"
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

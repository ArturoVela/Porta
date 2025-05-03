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
      title: "¿Qué diferencia hay entre los planes?",
      content:
        "Cada plan ofrece un nivel de personalización y herramientas progresivas: desde configuraciones básicas hasta automatización avanzada, integración con servicios externos y soporte extendido.",
    },
    {
      title: "¿Qué incluye el Plan Inicial?",
      content:
        "Ideal para servidores pequeños: hasta 10 canales, roles predefinidos, estructura básica, bot de bienvenida, guía de uso y soporte por 3 días. Se entrega en 48h.",
    },
    {
      title: "¿Qué incluye el Plan Comunidad?",
      content:
        "Incluye todo lo del Plan Inicial y añade: hasta 30 canales, bots avanzados (MEE6, Dyno), permisos personalizados, panel de reglas, automatización básica y soporte por 7 días.",
    },
    {
      title: "¿Qué ofrece el Servidor Premium?",
      content:
        "Solución profesional 100% personalizada: más de 50 canales, economía con bots, eventos, dashboard, integración con Twitch y soporte técnico 30 días.",
    },
    {
      title: "¿Se puede personalizar un plan?",
      content:
        "Sí, especialmente el plan Premium. Se realiza una reunión para identificar las necesidades exactas del proyecto y adaptar funciones, estructura y herramientas.",
    },
    {
      title: "¿Cómo contrato un servicio?",
      content:
        "Puedes usar los botones en la página para solicitar o cotizar el servicio. También puedes escribirme por correo, WhatsApp o Discord para iniciar la configuración de tu servidor.",
    },
  ];

  return (
    <div>
      <section className="breadcumb-wrapper text-center pb-90 md-pb-50 vxs-pb-30 bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="sec-title mb-30 md-mb-15">
                Creación de Servidores Discord
              </h2>
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
                      src="/assets/images/service/service-details1-dc.jpg"
                      alt="Planes Discord"
                      width={796}
                      height={496}
                      loading="lazy"
                      className="responsive-img"
                    />
                  </div>

                  <aside className="mb-30">
                    <p>
                      Hola, si quieres que tu servidor sea 100% funcional y
                      atractivo para tu comunidad, ¡no te preocupes! Puedes
                      ponerte en contacto conmigo y puedo ayudarte a formar tu
                      comunidad a tu gusto. Puedes echar un vistazo a los
                      servicios que ofrezco a continuación:
                    </p>
                  </aside>
                  <div className="service__details-wrap">
                  <h3 className="title">🟢 Plan Inicial – S/80</h3>
                  <p className="mb-35">
                    Ideal para comunidades pequeñas o personales que desean
                    comenzar con buen orden y estética.
                    <br />
                    <br />
                    <strong>Incluye:</strong>
                    <br />- 🧱 <strong>Diseño base:</strong> Se crean hasta 10
                    canales estructurados (bienvenida, reglas, general, voz)
                    <br />- 🎭 <strong>Roles predefinidos:</strong>{" "}
                    Configuración de roles esenciales (Admin, Mod, Miembro,
                    Invitado) con permisos básicos
                    <br />- 🤖 <strong>Bot de bienvenida:</strong> Instalación y
                    configuración de Carl-bot o MEE6 para mensajes automáticos
                    de ingreso
                    <br />- 🖼️ <strong>Personalización visual:</strong> Icono
                    del servidor, banner y emojis en canales principales
                    <br />- 📑 <strong>Reglas y bienvenida:</strong> Canal con
                    reglas claras en formato embebido con emojis y estilo
                    organizado
                    <br />- 🧭 <strong>Guía del administrador:</strong> Archivo
                    PDF explicativo de cómo gestionar el servidor
                    <br />- 🛡️ <strong>Seguridad básica:</strong> Activación de
                    verificación por botón para evitar spam
                    <br />- 🧼 <strong>Filtros mínimos:</strong> Anti-links y
                    antispam activado en los canales públicos
                    <br />- ⏱️ <strong>Entrega en 48h:</strong> Tu servidor
                    estará listo y funcional en menos de 2 días
                    <br />- 🛠️ <strong>Soporte:</strong> 3 días de ayuda vía
                    correo para resolver dudas básicas
                  </p>
                  <div className="service__details-thumb">
                    <Image
                      src="/assets/images/service/service-details1-dc.jpg"
                      alt="Planes Discord"
                      width={796}
                      height={496}
                      loading="lazy"
                      className="responsive-img"
                    />
                  </div>
                  </div>
                  <p>  </p>
                  <div className="service__details-wrap">    
                  <h3 className="title">🟣 Plan Comunidad – S/150</h3>
                  <p className="mb-35">
                    Pensado para comunidades en crecimiento, con herramientas
                    que automatizan y optimizan la experiencia.
                    <br />
                    <br />
                    <strong>Incluye todo lo del Plan Inicial +</strong>
                    <br />- 🧩 <strong>Expansión estructural:</strong> Hasta 30
                    canales clasificados por categorías (chat, voz, soporte,
                    eventos, recursos)
                    <br />- 🧙 <strong>Jerarquía avanzada:</strong> Creación de
                    hasta 10 roles con permisos únicos, acceso privado y
                    visualización por secciones
                    <br />- ⚙️ <strong>Bots potentes:</strong> Configuración de
                    MEE6, Dyno, YAGPDB y Carl-bot con módulos activados
                    (auto-mod, mensajes automáticos, comandos)
                    <br />- 🖲️ <strong>Auto-roles interactivos:</strong> Sistema
                    con botones o menús desplegables donde el usuario elige su
                    rol
                    <br />- 📋 <strong>Canal de anuncios:</strong> Activación de
                    canal con restricciones solo para staff y notificaciones
                    importantes
                    <br />- 📚 <strong>Panel de reglas embebido:</strong> Reglas
                    divididas por secciones (conducta, sanciones, contenido,
                    staff) con formato embed
                    <br />- 👁️ <strong>Logs automáticos:</strong> Registro de
                    entradas, salidas, cambios de nickname, mensajes eliminados
                    o editados
                    <br />- 🔗 <strong>Integración con redes:</strong> Anuncios
                    automáticos de YouTube y Twitch cuando los miembros hagan
                    stream o suban video
                    <br />- 🔁 <strong>Automatización básica:</strong> Muteos
                    automáticos, respuestas automáticas, menciones de staff en
                    palabras clave
                    <br />- 📅 <strong>Notificaciones de eventos:</strong>{" "}
                    Recordatorios conectados a Notion o Google Calendar
                    <br />- 📞 <strong>Soporte técnico:</strong> 7 días de
                    asistencia por mensaje o llamada para ajustes y dudas
                  </p>

                  <div className="service__details-thumb">
                    <Image
                      src="/assets/images/service/service-details1-dc.jpg"
                      alt="Planes Discord"
                      width={796}
                      height={496}
                      loading="lazy"
                      className="responsive-img"
                    />
                  </div>
                  </div>
                  <p>  </p>
                  <div className="service__details-wrap">
                  <h3 className="title">🔮 Servidor Premium – Desde S/250</h3>
                  <p className="mb-55">
                    Para servidores de alto impacto que necesitan automatización
                    profesional, métricas, economía, y gestión completa.
                    <br />
                    <br />
                    <strong>Incluye todo lo anterior +</strong>
                    <br />- 🏗️ <strong>Diseño de gran escala:</strong> Más de 50
                    canales agrupados por funciones (foro, canales ocultos, logs
                    separados, onboarding, comunidad, soporte)
                    <br />- 🏆 <strong>Economía y niveles:</strong> Integración
                    con Tatsu, UnbelievaBoat o Arcane para puntos, monedas,
                    tienda, niveles visuales y rachas
                    <br />- 🧾 <strong>Tickets de soporte:</strong> Sistema
                    profesional con panel de botones, categorías, logs y
                    mensajes predeterminados
                    <br />- 🔍 <strong>Centro de ayuda:</strong> Canal embebido
                    con preguntas frecuentes, comandos explicados y enlaces
                    útiles
                    <br />- 📊 <strong>Dashboard:</strong> Integración de panel
                    de estadísticas (actividad diaria, miembros activos,
                    crecimiento semanal)
                    <br />- 🛡️{" "}
                    <strong>Anti-alt y verificación avanzada:</strong> Detección
                    de cuentas falsas o recién creadas usando AltDentifier, Wick
                    o Beemo
                    <br />- 🔗 <strong>Webhooks y API:</strong> Automatización
                    externa con GitHub, tiendas, sitios web o bases de datos
                    externas
                    <br />- 📢 <strong>Eventos y tags:</strong> Sistema para
                    registrar, anunciar y automatizar sorteos, eventos o pings
                    masivos
                    <br />- 🔄 <strong>Optimización profunda:</strong> Limpieza
                    de roles/canales inactivos, análisis de canales no usados,
                    consolidación de permisos duplicados
                    <br />- 📦 <strong>Backups avanzados:</strong> Backups
                    totales con restauración completa y versiones incrementales
                    <br />- 📘 <strong>Manual de administración:</strong>{" "}
                    Documento PDF completo con mapas de rol, canal y
                    configuración personalizada
                    <br />- 🧠 <strong>Asesoría:</strong> 30 días de soporte
                    directo y asistencia técnica para nuevas funciones
                  </p>
                  <div className="service__details-thumb">
                    <Image
                      src="/assets/images/service/service-details1-dc.jpg"
                      alt="Planes Discord"
                      width={796}
                      height={496}
                      loading="lazy"
                      className="responsive-img"
                    />
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

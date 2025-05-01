import SocialShare from "@/app/Components/BlogDetails/SocialShare";
import CommentSection from "@/app/Components/BlogDetails/CommentSection";
import {
  createComment,
  getComments,
} from "@/app/api/comments/commentsActions/actions";
import Image from "next/image";

// Constantes reutilizables
const AUTHOR_NAME = "Arturo Vela";
const POST_DATE = "21 April, 2025";
const READ_TIME = "4 min";
const THUMB_IMAGE = "/assets/images/blog/thumb.jpg";
const COVER_IMAGE = "/assets/images/blog/blog-details1-discord.jpg";
const CONTENT_IMAGE = "/assets/images/blog/blog-details2-discord.jpg";
const QUOTE_ICON = "/assets/images/icons/block_quote.svg";
const QUOTE_AUTHOR = "Carlos Mendoza";

export default async function BlogDetails() {
  const comments = await getComments();
  return (
    <div>
      <section className="breadcumb-wrapper text-center pt-240 md-pt-80 pb-0 bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="sub-title">Comunidad</span>
              <h2 className="sec-title mb-0">
                Cómo usar Discord para tu negocio o comunidad online
              </h2>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-details-area space-bottom bg-theme2">
        <div className="container">
          <div className="row">
            <ul className="info-items xs-py-30 space-bottom">
              <li className="item">
                <div className="thumb">
                  <Image src={THUMB_IMAGE} alt="img" width={75} height={75} className="responsive-img"/>
                </div>
                <div className="info">
                  <span className="title">Escrito por</span>
                  <span className="text">{AUTHOR_NAME}</span>
                </div>
              </li>
              <li className="item">
                <div className="info">
                  <span className="title">Publicado</span>
                  <span className="text">{POST_DATE}</span>
                </div>
              </li>
              <li className="item">
                <div className="info">
                  <span className="title">Lectura</span>
                  <span className="text">{READ_TIME}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="blog-details-thumb mb-50">
          <Image
            className="w-100 responsive-img"
            src={COVER_IMAGE}
            alt="img"
            width={1910}
            height={846}
            
          />
        </div>

        <div className="container">
          <div className="blog__details-content">
            <div className="row justify-content-between">
              <div className="col-lg-12">
                <p className="text mb-30">
                  Discord ha evolucionado más allá de ser una plataforma para
                  gamers. Hoy, miles de negocios y comunidades digitales lo
                  utilizan para mantenerse conectados, gestionar proyectos y
                  fomentar una comunidad activa.
                </p>
                <p className="text mb-60">
                  En este artículo aprenderás cómo aprovechar Discord para tu
                  marca, emprendimiento o grupo de interés, creando espacios
                  organizados, roles claros y comunicación efectiva.
                </p>
              </div>

              <div className="col-lg-12">
                <blockquote className="blockquote">
                  <Image
                    className="blockquote-icon"
                    src={QUOTE_ICON}
                    alt="img"
                    width={40}
                    height={40}
                    
                  />
                  <p>
                    "Discord no es solo para jugar, es una poderosa herramienta
                    de comunicación para cualquier comunidad moderna."
                  </p>
                  <a href="#" className="name">
                    {QUOTE_AUTHOR}
                  </a>
                </blockquote>

                <h3 className="title mb-25">
                  Ventajas de usar Discord para tu negocio o comunidad
                </h3>
                <p className="mb-60">
                  Puedes crear canales por temática, usar bots para automatizar
                  tareas, organizar eventos en vivo por voz o video, y generar
                  roles para segmentar miembros y otorgar permisos específicos.
                </p>

                <figure className="details-thumb mb-60">
                  <Image
                    className="br-10 responsive-img"
                    src={CONTENT_IMAGE}
                    alt="img"
                    width={1320}
                    height={650}
                    
                  />
                </figure>

                <h3 className="title mb-25">
                  Cómo empezar en Discord paso a paso
                </h3>
                <ul className="challenge_list">
                  <li>Crea un servidor y dale una identidad visual</li>
                  <li>
                    Establece canales organizados (texto, voz, anuncios, etc.)
                  </li>
                  <li>Define roles y permisos para moderadores y miembros</li>
                  <li>
                    Configura bots útiles (moderación, estadísticas, integración
                    con redes sociales)
                  </li>
                  <li>Promociona tu servidor en tus redes y sitio web</li>
                </ul>

                <p className="mt-30 mb-60">
                  Al usar Discord de forma profesional, puedes generar una
                  comunidad sólida, escuchar a tus usuarios y mantener
                  comunicación constante sin necesidad de invertir en costosos
                  sistemas de soporte o foros.
                </p>
              </div>

              <div className="col-lg-12">
                <div className="blog__details-bottom">
                  <SocialShare />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentSection />
    </div>
  );
}

import SocialShare from "@/app/Components/BlogDetails/SocialShare";
import CommentSection from "@/app/Components/BlogDetails/CommentSection";
import PaginationBlog from "@/app/Components/BlogDetails/PaginationBlog";
import {
  createComment,
  getComments,
} from "@/app/api/comments/commentsActions/actions";
import Image from "next/image";
import Link from "next/link";

// Constantes reutilizables
const AUTHOR_NAME = "Arturo Vela";
const POST_DATE = "29 abril, 2025";
const READ_TIME = "6 min";
const COVER_IMAGE = "/assets/images/blog/blog-details1-tesis-29-04-2025.jpg";
const INTERVIEW_IMAGE =
  "/assets/images/blog/blog-details3-tesis-22-04-2025.jpg";
const AUTHOR_THUMB = "/assets/images/blog/thumb.jpg";
const DOWNLOAD_LINK =
  "https://1drv.ms/b/s!AhTBs2k3EIAxjsdX2G-vrZa9PEsKQQ?e=XMTisa";
const ARROW_ICON = "/assets/images/icons/arrow-left-top.svg";

export default async function BlogDetails() {
  const comments = await getComments();
  return (
    <div>
      <section className="breadcumb-wrapper text-center pt-240 md-pt-80 pb-0 bg-theme2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="sub-title">Investigación I</span>
              <h2 className="sec-title mb-0">
                Segundo Avance de Tesis: Análisis Visual y Entrevista con
                Agrónomo sobre el Rendimiento del Arroz
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
                  <Image
                    src={AUTHOR_THUMB}
                    alt="img"
                    width={75}
                    height={75}
                    className="responsive-img"
                  />
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
              <div className="about_content">
                <p className="about-text wow text-anim-left mt-50 vxs-mt-30">
                  {" "}
                </p>
                <div className="btn-wrap btn-bounce-1 home-circle-btn">
                  {/* 
                  <Link className="circle-btn btn gsap-magnetic" href={DOWNLOAD_LINK} target="_blank">
                    <span className="link-effect">
                      <span className="effect-1">Leer más</span>
                      <span className="effect-1">Leer más</span>
                    </span>
                    <Image src={ARROW_ICON} alt="img" width={10} height={10} />
                  </Link> 
                  */}
                </div>
              </div>
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
                  En esta segunda fase del proyecto, se incorporó la experiencia
                  del ingeniero agrónomo <strong>Ever Ramírez Rojas</strong> con
                  el fin de obtener un enfoque práctico y visual sobre los
                  factores que afectan el rendimiento del arroz. Esta
                  colaboración permite complementar el análisis técnico con
                  observaciones de campo directamente relacionadas con la
                  productividad visual del cultivo.
                </p>
                <p className="text mb-60">
                  Durante esta etapa, se elaboró una serie de preguntas
                  orientadas a comprender cómo un especialista puede predecir
                  visualmente el rendimiento del arroz, así como identificar los
                  factores que lo mejoran o lo reducen. Las respuestas del
                  ingeniero serán claves para validar y ajustar los modelos
                  predictivos en base a observaciones reales.
                </p>
              </div>

              <div className="col-lg-12">
                <h3 className="title mb-25">
                  Entrevista al Ing. Agrónomo Ever Ramírez Rojas
                </h3>
                <p className="mb-30">
                  Para reforzar el análisis visual del rendimiento del arroz, se
                  realizó una entrevista con el Ing. Ever Ramírez Rojas,
                  profesional con experiencia en cultivo de arroz en la región
                  San Martín. A continuación, se presentan las preguntas
                  formuladas y los espacios destinados a registrar sus
                  respuestas.
                </p>
                <ul className="challenge_list">
                  <li>
                    <strong>
                      1. ¿Qué señales visuales observa en un cultivo de arroz
                      que le permiten predecir un buen rendimiento?
                    </strong>
                    <br />
                    <em>
                      Respuesta: _____________________________________________
                    </em>
                  </li>
                  <li>
                    <strong>
                      2. ¿Qué factores considera más determinantes para que una
                      campaña tenga un alto rendimiento?
                    </strong>
                    <br />
                    <em>
                      Respuesta: _____________________________________________
                    </em>
                  </li>
                  <li>
                    <strong>
                      3. ¿Cómo influye la coloración del follaje o la altura del
                      cultivo en su evaluación visual?
                    </strong>
                    <br />
                    <em>
                      Respuesta: _____________________________________________
                    </em>
                  </li>
                  <li>
                    <strong>
                      4. ¿En qué etapa del desarrollo del arroz es más fácil
                      anticipar el rendimiento final visualmente?
                    </strong>
                    <br />
                    <em>
                      Respuesta: _____________________________________________
                    </em>
                  </li>
                  <li>
                    <strong>
                      5. ¿Qué problemas visuales en el cultivo suelen ser
                      señales de bajo rendimiento?
                    </strong>
                    <br />
                    <em>
                      Respuesta: _____________________________________________
                    </em>
                  </li>
                </ul>

                <h3 className="title mb-25 mt-60">Anotaciones del Docente</h3>
                <figure className="details-thumb mb-60">
                  <Image
                    className="br-10 responsive-img"
                    src={INTERVIEW_IMAGE}
                    alt="img"
                    width={1320}
                    height={650}
                  />
                </figure>
              </div>

              <div className="col-lg-12">
                <div className="blog__details-bottom">
                  <SocialShare />
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaginationBlog />
      </div>
      
      <CommentSection />
    </div>
  );
}
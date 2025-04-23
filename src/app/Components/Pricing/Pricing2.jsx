import PricingCard from "../Card/PricingCard";

const Pricing2 = ({addclass}) => {
    return (
            <section className={addclass}>
                <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="title-area">
                            <h2 className="sec-title text-center sm-text-left">Precios increíbles para su<br/> <span className="font2 wow text-anim-left">Proyecto</span></h2>
                        </div>
                    </div>
                </div>
                
                    <div className="row gx-30 gy-30">
                        {/* WEB */}
                        {/* Plan Inicial */}
                        <h3 className="title mb-20">Páginas web</h3>
                        <div className="col-lg-4 col-md-6">
                            <PricingCard
                                addclass="pricing-item"
                                title="Web Básica"
                                price="800"

                                time="Pago único"
                                btnname="Iniciar Proyecto"
                                btnurl="/contact"
                                FeatureList={[
                                    "Hasta 5 páginas principales",
                                    "Diseño adaptable a móviles",
                                    "Formulario de contacto simple",
                                    "Galeria de imágenes básica",
                                    "Optimización velocidad básica",
                                    "Mapa de ubicación integrado",
                                    "Soporte por 2 semanas",
                                    "Entrega en 1 semana"
                                ]}
                            ></PricingCard>
                        </div>

                        {/* Plan Estándar */}
                        <div className="col-lg-4 col-md-6">
                            <PricingCard
                            addclass="pricing-item upper"
                            title="Web Profesional"
                            price="1,500"
                            time="Pago único"
                            btnname="Quiero este plan"
                            btnurl="/contact"
                            FeatureList={[
                                "Todo el Plan Básico +",
                                "Hasta 10 páginas",
                                "Diseño personalizado",
                                "Integración con WhatsApp",
                                "Sección de blog básico",
                                "Slider de imágenes",
                                "SEO básico inicial",
                                "Soporte por 1 meses"
                            ]}
                        ></PricingCard>
                        </div>

                        {/* Plan Avanzado */}
                        <div className="col-lg-4 col-md-6">
                            <PricingCard
                                addclass="pricing-item"
                                title="Web Premium"
                                price="2,500"

                                time="Pago único"
                                btnname="Contactar ahora"
                                btnurl="/contact"
                                FeatureList={[
                                    "Hasta 15 páginas",
                                    "Diseño premium responsive",
                                    "Formularios avanzados",
                                    "Integración con redes sociales",
                                    "Blog profesional",
                                    "SEO básico continuo",
                                    "Galeria multimedia",
                                    "Soporte por 3 meses"
                                ]}
                            ></PricingCard>
                        </div>
                        {/* DISCORD */}
                        {/* Plan Inicial */}
                        <h3 className="title mb-20">Creación de servidores de discord</h3>
                        <div className="col-lg-4 col-md-6">
                            <PricingCard
                                addclass="pricing-item"
                                title="Plan Inicial"
                                price="80"
                                time="Pago único"
                                btnname="Solicitar ahora"
                                btnurl="/contact"
                                FeatureList={[
                                    "Servidor básico (hasta 10 canales)",
                                    "Roles predefinidos",
                                    "Categorías organizadas",
                                    "Bot de bienvenida y moderación",
                                    "Icono y banner personalizados",
                                    "Guía de uso básica",
                                    "Soporte por correo durante 3 días",
                                    "Entrega en 48 horas"
                                ]}
                            ></PricingCard>
                        </div>

                        {/* Plan Comunidad */}
                        <div className="col-lg-4 col-md-6">
                            <PricingCard
                                addclass="pricing-item upper"
                                title="Plan Comunidad"
                                price="150"
                                time="Pago único"
                                btnname="Quiero este plan"
                                btnurl="/contact"
                                FeatureList={[
                                    "Todo el Plan Inicial +",
                                    "Hasta 30 canales organizados",
                                    "Roles con permisos avanzados",
                                    "Bots personalizados (MEE6, Dyno, etc.)",
                                    "Automatización de tareas básicas",
                                    "Panel de reglas y anuncios",
                                    "Integración con redes sociales",
                                    "Soporte extendido por 7 días"
                                ]}
                            ></PricingCard>
                        </div>

                        {/* Plan Gaming / Empresarial */}
                        <div className="col-lg-4 col-md-6">
                            <PricingCard
                                addclass="pricing-item"
                                title="Servidor Premium"
                                price="Desde 250"
                                time="Pago según proyecto"
                                btnname="Cotizar ahora"
                                btnurl="/contact"
                                FeatureList={[
                                    "Configuración totalmente personalizada",
                                    "Más de 50 canales y múltiples categorías",
                                    "Sistema de niveles y economía con bots",
                                    "Integración con Twitch, YouTube o sitios web",
                                    "Configuración de eventos, sorteos, tickets",
                                    "Dashboard de administración (opcional)",
                                    "Automatización avanzada",
                                    "Soporte técnico durante 30 días"
                                ]}
                            ></PricingCard>
                        </div>
                     </div>
                </div>
            </section>
    );
};

export default Pricing2;
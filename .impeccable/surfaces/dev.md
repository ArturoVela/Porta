# /dev

Modo: Persuade. Tarjeta de presentación dentro del portafolio existente. Acción principal confirmada: contactarme para trabajar juntos. Implementación con código, sin reemplazar identidad del sitio.

## Direction contract inicial (histórico)

THESIS: reconocer a Arturo, ver trabajo real y contactarlo desde una tarjeta compartible.

OWN-WORLD: Satoshi, superficies claras/oscuras del portafolio, azul para datos y navegación, naranja para contacto, bordes de un píxel y esquinas rectas. Hereda tokens de `src/theme.ts`.

STORY: rostro y especialidad → proyectos → apps → actividad verificable → conversación sobre un proyecto.

FIRST VIEWPORT: retrato a la izquierda ocupando un tercio de una tarjeta horizontal; nombre grande, especialidad, introducción y contacto naranja a la derecha. En móvil el retrato precede identidad y contacto. Índice de apartados inmediatamente después.

FORM: tarjeta de presentación solicitada por el usuario; mundo y concepto fijados por el brief. No torneo de conceptos. Interacción distintiva: explorar cada día del calendario con selección accesible y cambiar periodo.

FINISH: revisión independiente, veredicto, documentación y provenance de los rasters incorporados. La extensión aprobada conserva el mundo existente y registra el resultado en esta superficie, sin crear autoridad global de diseño.

## Scope inicial (histórico)

`/dev` en español, enlace Dev en navegación, SEO y sitemap, API GitHub del mismo origen con caché y última copia ante fallos. Datos de contribuciones del calendario público de GitHub; lenguajes calculados con bytes de repositorios propios públicos. Apps privadas identificadas por el catálogo.

## Extensión aprobada: presentación y contacto

Usuario aprobó implementación del plan del 10 de octubre: conservar identidad, trabajar con material existente y usar correo/formulario. Sin WhatsApp ni teléfono en VCF. `/dev` permanece en español y `/en/dev` incorpora traducción completa, metadatos y alternates. El contrato público v1 y Second Brain conservan autoridad sobre contenido.

THESIS: decisiones de contratación apoyadas por productos visibles, resultados existentes y contacto accesible.

OWN-WORLD: tokens actuales, Satoshi, naranja para conversación y azul para navegación; bordes rectos. Extensión ordinaria, sin nueva autoridad global de diseño.

STORY: portada con captura de Explora → resultados de destacados → catálogo filtrable → tecnologías enlazadas a evidencia → actividad real → contacto.

FIRST VIEWPORT: portada del sitio con titular e introducción a la izquierda, contacto principal y caso de Explora a la derecha. `/dev` conserva retrato e identidad; guardar contacto, compartir y QR son acciones secundarias. Móvil mantiene mensaje y acciones antes de captura en portada, y retrato antes de identidad en `/dev`.

FORM: plan preciso aprobado; filtro de apps combina búsqueda y categoría, ocho visibles al empezar. QR desplegable nativo; compartir nativo con recuperación por copia. Sin modales, dependencias de runtime, testimonios vacíos ni vídeos inexistentes.

FINISH: pruebas, builds, dry-run, revisión independiente de capturas y documentación. Publicación solo tras comprobar disponibilidad de staging y su contenido real.

## Provenance

Fototech.jpg aportada por el usuario; arte de apps y proyectos ya existente. No imágenes generadas ni nuevas afirmaciones comerciales.

## Final implementation

Extensión ordinaria construida con código a partir del plan aprobado. Conserva `src/theme.ts`, Satoshi, el shell, los componentes y los materiales del portafolio. No establece un nuevo sistema global.

La portada presenta el titular, la introducción, el contacto naranja y el caso de Explora San Martín con su captura existente. Si la cubierta falla, el hero pasa a composición textual de una columna y conserva ambas acciones. `/dev` y `/en/dev` mantienen retrato e identidad, contacto principal y tres proyectos destacados con resultados del contenido existente: soporte para dos empresas, 164 lugares documentados y 41 cafeterías trazables. Los enlaces distinguen el caso del acceso a cada app.

El catálogo combina búsqueda sin distinción de mayúsculas o tildes con cinco categorías; muestra 8 de las 23 apps inicialmente, permite ampliar o reducir la lista y ofrece limpiar filtros cuando no hay resultados. Seis tecnologías enlazan a casos reales: React, TypeScript, Next.js, Cloudflare Workers, Supabase y Flutter. Las dos versiones incluyen traducción, metadatos y alternates.

La acción naranja abre el contacto localizado. Copiar correo se reutiliza en `/dev` y contacto; cuando falla el portapapeles, el correo visible permite copia manual. Guardar contacto descarga una vCard sin teléfono ni fotografía. Compartir usa Web Share cuando está disponible, trata la cancelación como estado neutral y recurre a copiar la URL; si también falla, expone el enlace seleccionable. El QR usa un desplegable nativo y un PNG estático por idioma que apunta a la URL pública de producción.

El formulario conserva nombre, correo, organización opcional, mensaje y consentimiento requerido, con estados de envío, error y éxito. En móvil `/dev` pasa a una columna y mantiene márgenes laterales de 16px; el calendario se desplaza dentro de su panel. Permite cambiar periodo y recorrer días con flechas, con un único día en la secuencia de tabulación. Los lenguajes representan bytes de repositorios propios públicos sin forks; la actividad no mide calidad ni horas trabajadas. La API anónima depende del marcado público de GitHub y de sus límites de solicitudes, con caché de una hora y respaldo de siete días. El gutter nativo estable evita cambios de ancho durante carga y captura.

## Final provenance

Fotografía original aportada por el usuario: `public/assets/images/Me/Fototech.jpg`. Pases del catálogo y cubiertas de proyectos reutilizados mediante los componentes existentes; la portada usa la cubierta de Explora de `public/assets/images/portfolio/`. Sin imágenes generadas por IA ni nuevas afirmaciones comerciales.

Rasters incorporados: `public/assets/images/portfolio/dev-qr-es.png` y `dev-qr-en.png`, generados localmente por `scripts/generate-dev-qr.swift` con CoreImage. Son blanco y negro, corrección M y margen libre de cuatro módulos; el propio script usa Vision para verificar la decodificación a `https://velaarturo.com/dev` y `https://velaarturo.com/en/dev`. No dependen de un servicio externo ni de generación en runtime.

La evidencia vigente está en [qa.json](../review/portfolio/qa.json) y en sus 32 JPG: `/dev` ES/EN × 390/768/1024/1440 × oscuro/claro (16); portada y contacto ES/EN × 390/1440 × oscuro/claro (16). Doce capturas de `/dev` que tenían miniaturas pendientes se sustituyeron después de cargar las ocho miniaturas visibles. Las tres capturas PNG del primer pase quedan como evidencia histórica y no certifican esta extensión.

Evidencia adicional: [home-missing-cover.jpg](../review/portfolio/home-missing-cover.jpg) registra un HTTP 404 real de la cubierta y el hero textual resultante, con ambos CTA intactos y sin overflow. Después de la prueba, los assets se restauraron con hashes idénticos y se retiró la query temporal. La descarga real `/Users/arturovela/Downloads/arturo-vela (1).vcf` se inspeccionó como UTF-8 con CRLF: contiene N, FN, EMAIL y URL, además del envoltorio vCard 3.0; no contiene TEL ni PHOTO.

## Verification

- Fuentes revisadas para el registro: `PRODUCT.md`, `src/theme.ts`, `src/pages/HomePage.tsx`, `src/pages/DevPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/dev.css`, `src/styles.css`, `src/lib/dev.ts`, `src/lib/contact.ts`, `src/components/CopyEmail.tsx`, `scripts/generate-dev-qr.swift` y `qa.json`. Las cifras de resultados coinciden con el contenido ES/EN existente.
- Comprobaciones locales del 10 de octubre de 2026 mediante el navegador integrado de Codex: 48 casos DOM de las tres superficies, los dos idiomas, los cuatro anchos y los dos temas; ninguno tiene desbordamiento global. La matriz de 32 capturas está completa y los archivos existen. Las ocho miniaturas de las capturas de `/dev` recapturadas quedaron cargadas.
- Reflow comprobado en las seis rutas localizadas a 720px CSS, sin desbordamiento. Es equivalente al ancho disponible de una ventana de 1440px al 200%; el atajo de zoom nativo no cambió la escala, por lo que no se afirma una prueba real de zoom al 200%.
- Se comprobaron búsqueda, categoría, conteo, vacío, limpieza y ampliación 8↔23 del catálogo, tecnologías y navegación a casos/contacto. El calendario conserva selección con flechas y un único día tabulable. Los totales de GitHub son observaciones cambiantes, no valores fijos de aceptación.
- Se comprobó copia de correo y descarga real de vCard. Cancelación de Web Share, ausencia del portapapeles y estados de Formspree de envío/error/éxito se comprobaron con simulación local. No se enviaron mensajes reales ni se importó la vCard en un dispositivo físico.
- Los dos QR se decodificaron con Vision a las URLs públicas esperadas. La prueba real de cubierta ausente produjo hero textual y CTA intactos; el fixture temporal se retiró y los assets originales quedaron restaurados.
- Validación final: `pnpm check` pasó con 78 de 78 pruebas y typecheck; `build:staging`, dry-run de staging, `build:production` y dry-run de producción pasaron. El build de producción se sirvió mediante Vite preview local en el puerto 4173 y se comprobó en el navegador integrado: `/en/dev` con título en inglés, canonical `https://velaarturo.com/en/dev`, alternates ES/EN/x-default correctos, 8 apps, búsqueda «COTIZACIÓN» → 1 resultado Cotiza, limpieza → 8 apps y consola vacía. Las 54 pruebas y las tres capturas citadas en el primer pase son histórico, no la verificación vigente.
- Revisor independiente `portfolio_finish_reviewer`: disposición `ship` para la UI local, completada después de la recaptura de las doce imágenes de `/dev`. Esta disposición no certifica staging. Una pestaña local nueva no mostró errores de consola; los errores HMR históricos durante la edición no pertenecen a esa comprobación final.
- Staging desplegado en Cloudflare: versión final `4def7a55-ec4f-45d6-bed7-85cb5ecb58f0`. Versión anterior reversible: `c3c96839-7b8a-4448-8008-b93d3f4e97f4`. La inspección remota está bloqueada: navegador integrado con `net::ERR_BLOCKED_BY_CLIENT` y respuesta HTTP 403 de Cloudflare 1010. No se certifica su contenido visible ni se publicó producción. El aviso local por ausencia de `BRAIN_CONTENT_TOKEN` implica contenido fallback; los secretos remotos solo se inspeccionaron por nombre y no se afirma una verificación actual del contenido publicado de Second Brain.
- No se creó una migración nueva; la migración preexistente `0002` se aplicó en staging. No hubo medición de FPS ni validación en dispositivo físico.
- Se conserva el mundo existente. `DESIGN.md` y `.impeccable/design.json` estaban ausentes y permanecen ausentes: esta extensión no crea autoridad global. El glifo decorativo `</>` del retrato y las sombras duras desplazadas preexistentes de marca, retrato y panel de contacto no se canonizan como patrones para futuras superficies ni se reparan en este registro: quedan fuera del alcance aprobado de conservar identidad.

## Actualización de visibilidad de GitHub (histórico)

El 10 de octubre de 2026, antes de esta extensión, el usuario activó la publicación de contribuciones privadas anonimizadas. Tras invalidar únicamente entradas locales del calendario y evitar caché duplicada del navegador con `cache: "no-store"`, la API y el navegador integrado mostraron 1.131 contribuciones, 202 días activos y una racha máxima de 20 días. La caché del servidor de una hora se mantuvo y los lenguajes siguieron limitados a código público. Typecheck y las 54 pruebas de aquel pase pasaron. Evidencia histórica: [calendario actualizado](../review/dev-contributions-updated.jpg).

# /work · cuatro tarjetas laborales

Modo: Operate. Listado y cuatro tarjetas laborales en español para reconocer a Arturo Vela, consultar una experiencia concreta, escribirle y guardar o compartir su contacto. Extensión ordinaria del portafolio, construida con código y dentro del mundo existente de `/dev`.

## Direction contract

THESIS: recorrer cuatro experiencias con cargo y periodo explícitos y abrir el contacto adecuado a cada empresa, distinguiendo trabajo actual y anterior.

OWN-WORLD: Satoshi, superficies claras/oscuras, foco de `src/theme.ts`, bordes de un píxel, tarjeta y botones rectangulares de `/dev` y control de tema existente. Logotipos positivos en claro y variantes blancas oficiales en oscuro; acentos locales por empresa. No establece un sistema global nuevo.

STORY: enlace Work del footer → cuatro filas con empresa, cargo y periodo → tarjeta con retrato, identidad y experiencia → correo → guardar, compartir o abrir QR. Nieto, Pacha’s y Wasky añaden trabajo desplegable, cerrado al entrar.

FIRST VIEWPORT: `/work` conserva el shell y presenta título, descripción y lista. Cada tarjeta independiente muestra cabecera compacta con logo/tema, retrato 3:4 a la izquierda e identidad, periodo y acción Escríbeme a la derecha; en móvil el recorte cuadrado superior precede el texto y conserva rostro y logo.

FORM: extensión precisa aprobada, code-led, sin torneo de conceptos. Configuración fija de cuatro empresas, página de tarjeta compartida, `details` nativo y QR estático. Las dos experiencias anteriores usan `dev@velaarturo.com` y omiten web empresarial por decisión del usuario; no se añaden métricas, teléfono ni WhatsApp.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

Estado de cierre: implementación y documentación locales completas. La revisión inicial examinó el alcance visual completo y pidió resolver una discrepancia de correo; el veredicto final `ship` puntuó únicamente ese hallazgo como resuelto. Al ser una extensión ordinaria, se preserva el contexto global: `DESIGN.md` y `.impeccable/design.json` estaban ausentes y permanecen ausentes. Sin despliegue en este alcance.

## Content and routes

| Ruta explícita | Empresa | Cargo | Periodo | Estado |
| --- | --- | --- | --- | --- |
| `/work/agromaf` | Cía. Agromaf | Área de Sistemas | Agosto de 2025 — actualidad | Experiencia actual |
| `/work/nieto` | Nieto Import | Área de Sistemas | Agosto de 2025 — actualidad | Experiencia actual |
| `/work/pachas` | Pacha’s Café | Desarrollador Web | Marzo — mayo de 2024 · 3 meses | Experiencia anterior |
| `/work/wasky` | Caña Wasky | Desarrollador Web | Junio — agosto de 2024 · 3 meses | Experiencia anterior |

`/work` lista esas cuatro empresas en ese orden. Cada fila completa enlaza a su tarjeta con logo, empresa, cargo, estado, periodo y «Ver tarjeta». Conserva navegación y footer del portafolio; el footer global incorpora Work. Las tarjetas omiten ese shell, también en vista previa, y terminan con «Ver portafolio», «Work» y «Privacidad y condiciones». El listado no muestra selector de idioma; no se creó una versión inglesa de estas superficies.

| Empresa | Correo directo | Otros correos | Web empresarial | Acento del contacto |
| --- | --- | --- | --- | --- |
| Cía. Agromaf | arturo.vela@agromaf.pe | sistemas@agromaf.pe | https://agromaf.pe | `#63A437` |
| Nieto Import | arturo.vela@nietoimport.com | sistemas@nietoimport.com; marketing@nietoimport.com | https://nietoimport.com | `#EF6800` |
| Pacha’s Café | dev@velaarturo.com | Ninguno | Omitida | `#255652`, texto blanco |
| Caña Wasky | dev@velaarturo.com | Ninguno | Omitida | `#C7EA95` |

Agromaf y Nieto conservan «Apoyo en marketing digital» y la bio «Trabajo en el área de Sistemas de [empresa] y apoyo en marketing digital.». «Escríbeme» abre el correo directo; «Web de la empresa» y el logo abren su web. Agromaf mantiene dos correos y Nieto tres.

Pacha’s y Wasky muestran «E-commerce y experiencia móvil», condición y periodo de experiencia anterior y «Correo personal profesional». Sus bios describen en pasado el desarrollo de la web de e-commerce y la optimización móvil. No presentan controles de web ni correos empresariales. El CV leído en el navegador integrado acredita Pacha’s; el usuario confirmó para Wasky el mismo alcance y sus fechas. La primera elección `cv@velaarturo.com` fue sustituida por la elección humana explícita final `dev@velaarturo.com`. El dominio aportado `pachascaffe.pe` no resolvió en el navegador integrado y el usuario pidió omitirlo por ahora.

La barra final se normaliza. Empresas o subrutas desconocidas conservan 404. Listado y tarjetas tienen canonical público en `https://velaarturo.com`, `noindex,nofollow`, sin hreflang ni entrada en sitemap. Las tarjetas actuales usan `worksFor` en datos estructurados; las anteriores usan `affiliation`, sin URL empresarial. QR, vCard y compartir usan siempre la URL pública de la tarjeta, nunca la URL local o el token de vista previa. La exclusión de indexación no constituye control de acceso.

### Trabajo desplegable

«Mi trabajo en [empresa]» permanece cerrado inicialmente. Pacha’s describe desarrollo integral de e-commerce para visualizar y vender productos, optimización móvil y apoyo a la presencia digital. Wasky conserva el mismo alcance confirmado, sin afirmar resultados cuantitativos. Agromaf no añade ese desplegable.

Nieto mantiene estos hechos previamente aprobados:

| Enlace | Contenido |
| --- | --- |
| `https://portal.nietoimport.com` | Portal Nieto · ERP: ERP completo para Nieto Import y Agromaf. |
| `https://nieto.velaarturo.com` | NIETO Hub: reúne las webs y herramientas digitales de Nieto Import. |
| `https://db.nieto.velaarturo.com` | DB Nieto · BI: dashboard privado de inteligencia de negocio. |

También conserva «Marketing y redes sociales» y «Apoyo en TikTok, Facebook e Instagram.», sin enlaces a cuentas. La lista concurrente de 11 actividades de marketing de Nieto, con fechas descendentes y roles Responsable/Corresponsable, permanece en el código y sus pruebas; este encargo no añadió ni contrastó la procedencia de esos hechos. Se preservaron los cambios concurrentes del footer global y de otras interfaces.

## Final implementation

Las tarjetas comparten `WorkPage` y la configuración de `src/lib/work.ts`; el listado reutiliza esa misma configuración, `SectionHeading`, `ContentLink`, `WorkImage` y el shell existente. No se añadieron dependencias de runtime. Los PDF de marca sirven de referencia de assets y no se entregan al navegador.

Guardar contacto descarga vCard 3.0 con Arturo Vela, organización, cargo, URL pública y los correos confirmados: dos de Agromaf, tres de Nieto y uno personal profesional en cada experiencia anterior. Sin teléfono ni fotografía. El helper compartido mantiene escape de campos, CRLF y plegado UTF-8. Si falla la descarga, anuncia el error y deja disponible el correo.

Compartir utiliza Web Share y trata la cancelación como estado neutral. Si falta o falla, copia el enlace; si también falla el portapapeles, anuncia el problema con `role="status"` y expone la URL seleccionable. El QR está oculto hasta abrir `details`. Etiquetas accesibles, acciones de al menos 44px, foco visible heredado de 3px y enlace para saltar al contenido permanecen disponibles.

`WorkImage` reserva espacio, anuncia carga con `aria-busy` y presenta «Imagen no disponible.» como estado accesible ante error. Los retratos tienen prioridad alta y `srcSet` de 480/1086px; logos e imágenes decodifican de forma asíncrona. Las acciones de contacto no esperan a las imágenes. El QR usa carga diferida. La imagen cargada aparece con una transición de opacidad de .18s; movimiento reducido elimina las transiciones de imagen, logo, desplegable y filas del índice.

Las tarjetas conservan máximo de 64rem, márgenes laterales de 16px y una columna a 760px; el retrato no se estira con la altura del contenido. Los botones se extienden al ancho disponible por debajo de 380px. El índice usa el contenedor existente de 7xl: cuatro columnas en escritorio, dos a 1000px y una a 600px. Correo y URLs admiten reflow.

### Continuidad visual y contexto

La comparación con `src/theme.ts`, `src/pages/dev.css`, la fuente local de `src/styles.css`, `ThemeToggle`, `SiteShell`, `SiteFooter` y la [superficie /dev](dev.md), junto con las cuatro capturas abiertas en este pase, confirma la continuidad de Satoshi, superficies, bordes, botones y temas. El color empresarial, las cabeceras de logo y los retratos son decisiones locales de Work. Las letras de marca permanecen en los gráficos oficiales; no sustituyen la tipografía de la interfaz.

Este documenter modificó únicamente `.impeccable/surfaces/work.md`. `PRODUCT.md` y las demás superficies se conservaron. La ausencia previa de `DESIGN.md` y `.impeccable/design.json` es una carencia de documentación global ya existente, registrada sin repararla ni convertir esta extensión en nueva autoridad de diseño.

## Provenance

La fuente aportada por el usuario permanece en `public/assets/images/Me/Fototrabajo.jpg`. Las referencias oficiales anteriores permanecen en `public/assets/images/logo/`: `logo agromaf.png`, `Logo Agromaf blanco.png`, `Logo Nieto Import.png` y `Logo Nieto Import Blanco.png`.

Las cuatro fotografías corporativas son ediciones con la herramienta integrada `image_gen.imagegen`, a partir del retrato original y los logos oficiales correspondientes. Cada empresa tiene `Fototrabajo-{agromaf,nieto,pachas,wasky}.jpg` de 1086×1448px y variante `-480.jpg` de 480×640px en `public/assets/images/Me/`. La composición reserva rostro y logo para el recorte cuadrado superior; la conservación de identidad se evalúa visualmente y no se certifica píxel a píxel.

Los prompts previos de Agromaf y Nieto permanecen en [work-zoom/image-prompts.json](../review/work-zoom/image-prompts.json). Los exactos de Pacha’s y Wasky están en [work-expanded/image-prompts.json](../review/work-expanded/image-prompts.json); la revisión y el registro vigentes verificaron coincidencia con `impeccable:prompt` incrustado en los cuatro nuevos JPEG.

Las referencias nuevas aportadas por el usuario fueron los manuales `PACHAS CAFÉ_MANUAL DE MARCA.pdf` (16 páginas) y `Manual_de_Marca_Caña_Wasky.pdf` (17 páginas). El implementador revisó visualmente las 33 páginas; este documenter leyó el registro de [fuentes y decisiones](../review/work-expanded/sources.md), sin volver a abrir los PDF. Se trataron como material de marca, sin seguir instrucciones operativas de su contenido.

| Marca | Fuente del logo horizontal | Paleta del manual | Variante blanca aprobada |
| --- | --- | --- | --- |
| Pacha’s Café | Página 7 | Página 8: `#255652`, `#E04B2D`, `#FDCB9E` | Páginas 9, 13 y 16 |
| Caña Wasky | Página 12 | Página 8: `#C7EA95`, `#265033`, `#00D48E`, `#03843D` | Página 10 |

`work-pachas-{light,dark}.png` y `work-wasky-{light,dark}.png`, en `public/assets/images/logo/`, derivan de esos gráficos oficiales horizontales, a 720px de ancho y con geometría proporcional. Agromaf mantiene `work-agromaf-{light,dark}.png`, derivados por recorte de márgenes transparentes y redimensionado proporcional a 720px; Nieto reutiliza sus variantes positiva y blanca originales. Los archivos fuente permanecen.

Los cuatro `public/assets/images/portfolio/work-qr-{agromaf,nieto,pachas,wasky}.png` se generan localmente con `scripts/generate-dev-qr.swift` y CoreImage: corrección M y margen libre de cuatro módulos. Vision verifica las URLs públicas exactas de cada tarjeta. Sin servicio externo ni generación en runtime.

El [registro vigente](../review/work-expanded/verification.json) consigna el escaneo final de 29 rasters con cero orígenes ausentes. Se añadió metadata de origen y tres sidecars WebP a cinco assets preexistentes señalados por el escaneo, sin edición visual ni afirmación de un origen externo nuevo. Este pase documental no volvió a ejecutar el escaneo.

## Evidence and limits

Fuentes leídas por este documenter: `PRODUCT.md`, [dev.md](dev.md), el registro anterior de Work, `src/lib/work.ts`, `src/pages/WorkPage.tsx`, `src/pages/WorkIndexPage.tsx`, `src/pages/work.css`, `src/components/WorkImage.tsx`, `src/lib/contact.ts`, `src/App.tsx`, el control de tema y la excepción de idioma de `src/components/SiteShell.tsx`, `src/components/SiteFooter.tsx`, metadatos de `worker/index.ts`, `src/theme.ts`, reglas compartidas de `src/pages/dev.css`, fuente y reglas iniciales de `src/styles.css`, `scripts/generate-dev-qr.swift` y `tests/work.test.ts`. Leyó también fuentes, prompts, revisión, capturas, QA, detector y verificación de `work-expanded`, los logs finales y los dos VCF finales descargados.

Este documenter abrió visualmente solo las siguientes cuatro capturas actuales; los tamaños son los JPEG nativos registrados, no los anchos DOM:

| Archivo abierto | JPEG nativo |
| --- | --- |
| [index-user-default-dark.jpg](../review/work-expanded/index-user-default-dark.jpg) | 1289×1373 |
| [pachas-desktop-light.jpg](../review/work-expanded/pachas-desktop-light.jpg) | 1280×1100 |
| [wasky-mobile-dark.jpg](../review/work-expanded/wasky-mobile-dark.jpg) | 390×1281 |
| [pachas-work-open-mobile-light.jpg](../review/work-expanded/pachas-work-open-mobile-light.jpg) | 375×1442 |

Estas representantes muestran las cuatro experiencias y el footer Work en el índice, el correo final en las dos tarjetas, los logos correctos por tema, el recorte superior móvil y el contenido ampliado de Pacha’s. La captura ampliada conserva una superposición visible del enlace de salto por el recorrido de teclado; las cerradas complementarias muestran el retrato sin esa superposición. No se afirma que este documenter abrió las otras 17 capturas.

La [revisión independiente](../review/work-expanded/review.md) registra dos pasos. El inicial abrió los 21 JPG de la matriz, examinó layout, branding y comportamiento responsive y emitió `fix` por una única discrepancia de contacto. El final abrió los 12 archivos refrescados de Pacha’s/Wasky y emitió `ship`, puntuando exclusivamente esa discrepancia como resuelta con la última elección humana `dev@velaarturo.com`. Ese veredicto limitado no constituye una nueva revisión completa de toda la superficie.

[captures.json](../review/work-expanded/captures.json) enumera los 21 JPEG exportados por el navegador integrado: siete vistas del índice, seis de Pacha’s, seis de Wasky y dos regresiones de las tarjetas anteriores. Incluye escritorio/móvil y ambos temas, tablet, 320px, viewport habitual del usuario y trabajo desplegado. Los 12 archivos afectados por el correo se sustituyeron en los mismos estados finales. Los tamaños raster son autoritativos: una petición full-page puede devolver una captura del viewport y los tamaños DOM y raster pueden diferir. No se recortó ni reescaló manualmente esta evidencia.

[qa-desktop.json](../review/work-expanded/qa-desktop.json) contiene siete muestras DOM generales y [qa-mobile-regression.json](../review/work-expanded/qa-mobile-regression.json) trece; [qa-default.json](../review/work-expanded/qa-default.json) registra viewport final 1304×889 sin overflow. Son registros generales anteriores a la corrección de correo. [qa-contact-fix.json](../review/work-expanded/qa-contact-fix.json) aporta 12 muestras nuevas: correo visible y mailto final, imágenes cargadas, periodo, canonical, robots y ausencia de overflow de Pacha’s/Wasky. No se deducen mediciones DOM de los píxeles de las capturas.

[verification.json](../review/work-expanded/verification.json), [check.log](../review/work-expanded/check.log) y [build.log](../review/work-expanded/build.log) registran typecheck, 121 pruebas aprobadas en 12 archivos, `pnpm build:staging` y diff check aprobados. Los tests leídos cubren las cuatro configuraciones, assets, periodos, contacto y VCF; rutas, shell y preview; canonical, datos estructurados, sitemap y 404; escape/plegado VCF; URL pública, cancelación y recuperación de compartir. También conservan las comprobaciones concurrentes de las 11 actividades de Nieto. El recorrido de teclado registrado siguió Work, abrió la tarjeta de Pacha’s y abrió/cerró su resumen con Enter y foco visible.

Las descargas finales `/Users/arturovela/Downloads/arturo-vela-pachas (1).vcf` y `/Users/arturovela/Downloads/arturo-vela-wasky (1).vcf` fueron leídas en este pase: incluyen Arturo Vela, `dev@velaarturo.com`, organización correcta, Desarrollador Web y URL pública correspondiente, sin teléfono ni fotografía. Las descargas iniciales con `cv@` son históricas y quedaron sustituidas. [detector.json](../review/work-expanded/detector.json) está vacío y corresponde a una única ejecución acotada sobre WorkPage, WorkIndexPage, work.css y WorkImage; no se volvió a ejecutar.

### Evidencia anterior y límites vigentes

[work-zoom/review.md](../review/work-zoom/review.md) documenta el `ship` histórico de las dos tarjetas anteriores, sus retratos y logos oscuros, tercer correo y sección de trabajo de Nieto. Sus 16 capturas y 103 pruebas en 11 archivos corresponden a ese alcance previo. El documenter anterior abrió cuatro representantes, mientras su revisor abrió las 16. La evidencia de `../review/work/` es aún anterior. Ninguno de esos registros certifica la extensión actual de cuatro tarjetas ni las adiciones concurrentes posteriores.

Durante esta documentación no se ejecutaron navegador, pruebas, builds ni detector. Los 320px acreditan reflow, no magnificación real. El fallback de imagen se revisó en código, sin forzar un fallo de red. Sin dispositivo físico, red limitada, hoja nativa de compartir, importación de contacto en hardware ni despliegue. Persisten los avisos locales preexistentes de contenido fallback sin `BRAIN_CONTENT_TOKEN` y bundle principal mayor de 500KB. Este registro no certifica staging ni producción.

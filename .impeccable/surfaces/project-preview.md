# Ficha de información de proyectos

Modo: Experience. Extensión ordinaria del portafolio: la portada protagoniza la tarjeta y la interfaz permite consultar contexto antes de abrir el caso. Conserva el mundo existente; no crea autoridad global de diseño.

## Direction contract

THESIS: explorar el trabajo desde sus portadas y consultar una ficha breve cuando interese.

OWN-WORLD: Satoshi, geometría cuadrada y tokens existentes `app.panel`, `app.text`, `app.muted`, `app.border` y `app.accent`; conserva azul de navegación y naranja de contacto. Tres puntos Mac rojo, amarillo y verde son decoración explícitamente solicitada, no controles.

STORY: ver la portada → consultar título, resumen, tecnologías y disponibilidad → abrir el caso cuando exista.

FIRST VIEWPORT: portada intacta al cerrar; panel sobre ella al abrir, posición confirmada por el usuario. El botón Información/Cerrar información ocupa una fila propia debajo, alineada a la derecha, para dejar el año despejado.

FORM: ficha compartida, compacta en visuales anchas y contenida en toda el área visual de las pequeñas, con scroll interno. Extensión fijada por el brief, sin exploración de un mundo nuevo.

FINISH: revisor independiente fresco devolvió `ship`, con las cinco secciones completas y ningún hallazgo material. La implementación y su evidencia quedan registradas aquí.

## Implementación y reglas para futuros ajustes

`src/components/ProjectPreview.tsx` comparte panel, control y estados de imagen. `ProjectVisual` en `ContentCards.tsx` lo incorpora a destacados, archivo y hero; `HomeProductCarousel.tsx` lo usa en productos públicos y `DevPage.tsx` reutiliza `ProjectVisual`. `/dev` mantiene su contenedor visual separado del enlace del título. Se conservan `data-project-image`, `data-project-art` y `data-project-card` para las transiciones existentes.

El panel reutiliza título, excerpt, cuatro tecnologías más `+N`, disponibilidad localizada, año opcional y enlace al caso cuando corresponde. No añade afirmaciones ni contenido paralelo al catálogo. El hero omite el enlace a su propio caso. Las etiquetas Información/Cerrar información, carga y enlace al caso tienen versiones ES/EN en `src/i18n.ts`.

La adaptación depende del ancho del componente: desde 32rem, el panel se separa 1rem del borde, con ancho máximo de 30rem y altura contenida; por debajo ocupa el área visual. El contenido tiene scroll propio y el control permanece fuera de la portada. No devolver el botón a una posición absoluta sobre la imagen o junto al año.

El hover abre solo con puntero mouse sobre el visual. Teclado y táctil disponen del botón de al menos 44 × 44px, con `aria-controls`, `aria-expanded` y nombre localizado que incluye el proyecto. El foco visible abre la ficha; Escape cierra y devuelve el foco al control. Al salir del componente se cierra si no conserva el foco. El panel cerrado usa `inert` y `aria-hidden`; puntos e iconos son decorativos. No anidar botones dentro de enlaces.

La entrada y salida combinan opacidad y desplazamiento vertical de 8px durante 280ms con el token `--ease-out`. Reduced motion elimina transición y animación de carga. El placeholder compartido anuncia carga o error y conserva el espacio de la portada. Consultar la ficha pausa el carrusel; su primera imagen sigue eager y las demás lazy.

## Provenance

Reutiliza cubiertas, pases de marca y posters existentes mediante `ResponsiveImage` y `ProjectVisual`. No genera ni sustituye rasters, fuentes o dependencias. Las capturas siguientes son evidencia de la interfaz local y no assets publicados.

## Revisión y verificación

Se compararon `PRODUCT.md`, los briefs incumbentes de home y dev, `src/theme.ts`, el componente y sus integraciones, estilos, copy y la prueba SSR con estas capturas finales: [desktop.png](../review/project-preview/desktop.png), [desktop-panel.png](../review/project-preview/desktop-panel.png), [mobile.png](../review/project-preview/mobile.png), [mobile-cover.png](../review/project-preview/mobile-cover.png) y [user-887.png](../review/project-preview/user-887.png). Las vistas de detalle muestran portada y panel, puntos decorativos y controles bajo el visual; las completas muestran el contexto del catálogo. Los placeholders fuera del viewport en la captura completa corresponden a imágenes lazy, no certifican un fallo de carga.

El pase final del navegador integrado comprobó el control fuera del visual y años despejados a 390, 887 y 1440px. El pase previo cubrió además 320, 768 y 1024px, ES/EN, temas claro/oscuro, home/carrusel, dev y hero. El revisor informó contraste de texto superior a 4.5:1 en ambos temas. `tests/media-render.test.ts` comprueba controles separados de enlaces, asociaciones ARIA, panel oculto inert, tres puntos decorativos y placeholder localizado.

Validación final comunicada por el build: `pnpm check` correcto, TypeScript y 148 pruebas en 13 archivos; `pnpm build:staging` y `git diff --check` correctos. La documentación no repite el detector ni abre otra ronda de ajustes.

## Límites y drift conservado

La evidencia cubre la interfaz local; esta extensión no fue desplegada ni probada en dispositivos físicos. Las capturas `*-round1.png` y `mobile-archive-round1.png` son históricas y no sustituyen las cinco capturas finales.

El detector se ejecutó una sola vez: [detector.json](../review/project-preview/detector.json). Su único advisory corresponde al fondo decorativo de rejilla preexistente en `src/styles.css:77`, fuera de alcance; no se reparó ni se convirtió en regla de diseño. `DESIGN.md` y `.impeccable/design.json` siguen ausentes, como en las extensiones incumbentes. Los briefs existentes se conservaron sin actualizar sus verificaciones históricas.

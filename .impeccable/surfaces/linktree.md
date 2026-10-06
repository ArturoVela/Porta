# Linktree

Ruta: `/linktree`. Revisión: 2026-10-06. Disposición: **ship**.

## Autoridad y alcance

Extensión del portafolio existente. La dirección de esta superficie procede del pedido explícito del usuario: tarjetero vertical de iOS Wallet para móvil, capturas de referencia y pases PNG aportados. No establece una identidad global nueva.

Se respetan Proyectos (18 tarjetas), Personal (3), Principal (1) y SaaS (5). Personal contiene Brain, Hub y CV; Hub y CV también siguen en Proyectos, según confirmación. BC apunta a `bc.velaarturo.com`. Los pases de `public/assets/images/pases-webs/` fueron aportados por el usuario; Divide conserva su identidad verde mediante una composición en CSS, al no tener PNG en esa colección.

## Direction contract

Modo: **Experience**. Dirección local registrada: **6/6/4**, conservando Wallet y Satoshi.

**THESIS:** Reunir los proyectos y facilitar el acceso desde móvil mediante un tarjetero vertical.

**OWN-WORLD:** Los pases PNG propios y cuatro colecciones dan identidad a la superficie. Cada tarjeta extiende el color de su pase al detalle.

**STORY:** Reconocer el perfil, buscar o filtrar, explorar las pilas, ampliar una tarjeta y abrir el proyecto o su caso de estudio.

**FIRST VIEWPORT:** Perfil, título, búsqueda, filtros y primeras tarjetas en una columna centrada; el contenido del tarjetero domina el recorrido.

**FORM:** Columna de hasta 484 px, pilas por colección y tarjetas de color con detalle dentro de su propio grupo. Forma fijada por el brief Wallet; sin nueva elección de identidad o comp.

**FINISH:** Revisión final y documentación de la refinación completadas; comparación con la autoridad visual existente y procedencia de los pases registradas abajo.

## Comparación con el portafolio

`src/theme.ts`, `src/styles.css` y `src/components/SiteShell.tsx` establecen Satoshi, el monograma A/, azul de marca (#2453f4) y los neutros oscuros. Linktree conserva la fuente, el monograma, ese azul en el avatar, el fondo (#080b12), texto (#f7f9fc), texto secundario (#aab5c6), línea (#2b3545) y azul de apoyo (#6488ff).

La columna estrecha, las esquinas redondeadas (17 px) y las sombras entre pases son expresiones locales de la referencia Wallet. La superficie usa panel (#171d28). Los colores estáticos de tarjeta en `src/lib/linktree.ts` se extrajeron de la franja superior de cada PNG para unir cabecera, arte y detalle. El CTA tiene fondo blanco y texto del color de su tarjeta, también al pasar el mouse; el resto del detalle usa blanco o un tinte claro del primer plano. La refinación conserva los tokens y la geometría de la navegación global como autoridad incumbente.

## Composición y comportamiento final

- Una columna centrada de hasta 484 px, con 22 px de margen interior horizontal; mantiene el tarjetero vertical en escritorio.
- Cada pila expone cabeceras de 64 px, solapamiento de 16 px y el arte completo del último pase. Los PNG mantienen su proporción 750:288 y las esquinas recortan cabecera, arte y detalle como una sola tarjeta.
- Búsqueda y filtros preceden las cuatro colecciones. La búsqueda normaliza acentos y el contador cuenta proyectos únicos, conservando las ocurrencias de Hub y CV en ambos grupos.
- Al pasar el mouse, un envoltorio eleva la tarjeta 6 px y escala a 1.012; la cubierta pasa de 16 a 24 px. Las filas cerradas mantienen una altura de 64 px para que el siguiente pase permanezca inmóvil bajo el cursor. En el código, el inicio y movimiento táctil siguen la tarjeta bajo el dedo mediante `elementFromPoint`; `touch-action: pan-y` conserva el desplazamiento nativo.
- Tocar o pulsar la cabecera expande el pase y su información dentro del mismo grupo: descripción, funciones, tecnología y caso de estudio cuando existen, acceso a la web y copia de enlace. Se conserva el contenido de los casos del portafolio.
- La URL guarda `project` y `group` para distinguir duplicados. Un enlace con solo `project` abre la primera ocurrencia visible. El estado permite una tarjeta ampliada a la vez.
- Motion 14.0.0 coordina posiciones y tamaños mediante `LayoutGroup` y proyección de layout con transforms. Los hijos usan `layout="position"` para evitar deformar texto y arte; pase ampliado, último pase y detalle abierto usan altura automática. El resorte (`type: "spring"`, `duration: 0.5`, `bounce: 0.2`) procede del preset Apple-style de la skill Animate y responde a la referencia Wallet. Sustituye el efecto manual de medición y animación de alturas.
- La cabecera es un botón nativo con `aria-expanded` y `aria-controls`; el detalle cerrado usa `inert` y `aria-hidden`. Escape devuelve el foco a la cabecera y cierra. Apertura por teclado, Escape y búsqueda usan duración cero; filtros y reset también al activarse por teclado. Búsqueda, filtros y reset limpian la previsualización. `MotionConfig reducedMotion="user"`, `useReducedMotion` y la regla CSS de movimiento reducido suprimen el movimiento según la preferencia del usuario. Controles de al menos 44 px, foco visible y etiquetas accesibles siguen presentes.

## Evidencia y comprobaciones

Se cotejaron `src/pages/LinktreePage.tsx`, `src/pages/linktree.css`, la dependencia Motion en `package.json` y `motion-frames.json`. Esta pasada documental inspeccionó las nuevas `preview-inline.png` y `desktop-hover.png`: muestran el detalle de Foto integrado en su pila y su elevación al pasar el mouse. La identidad y los colores comparados con el portafolio se conservan.

Capturas finales de la ejecución, guardadas en `.impeccable/review/`:

- `mobile.png` (390 × 3066) y `mobile-detail.png` (390 × 3782).
- `desktop.png` (1440 × 3255), `desktop-detail.png` (1440 × 4008) y `desktop-hover.png` (1440 × 900).
- `user-926.png` (926 × 4008) y `preview-inline.png` (926 × 968).

La ejecución final obtuvo estas capturas desde el inicio del documento y con los pases cargados mediante el navegador integrado. `motion-frames.json` registra muestras DOM de una apertura real: altura 186 → 464 → 702 → 802 → 840 → 844 → 840 px, cabecera constante de 64 px y scroll fijo en 316.5 px. El hover mantuvo la posición de la fila siguiente. Un cierre y apertura rápidos terminaron en Foto con detalle y cuerpo de igual altura (599.6875 px), sin recorte. Typecheck, 45 pruebas y la compilación final de staging pasaron; el detector de diseño devolvió `[]`.

La revisión aprobó composición y apertura. Su único P2, animación en búsqueda, filtros y reset por teclado, quedó resuelto: el navegador integrado confirmó `transform: none` a los 50 ms en búsqueda, filtro Personal con Enter y reset con Enter. La confirmación acotada del revisor cerró ese P2 y el P3 de documentación y declaró **SHIP** para la refinación.

Las muestras DOM prueban cambios de geometría, no FPS. No se midieron 60 FPS ni se probó un iPhone físico o la preferencia de movimiento reducido del sistema operativo; la equivalencia exacta con Wallet no está verificada. El soporte táctil y de movimiento reducido se cotejó en el código. Esta pasada documental no ejecutó nuevas interacciones web. La autoridad visual global sigue en los archivos existentes; el registro de esta extensión queda en este brief.

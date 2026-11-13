# Sistema de diseño · Arturo Vela

Base visual para el portafolio y, cuando se migren, las demás aplicaciones de `velaarturo.com`. El código de referencia es `src/theme.ts`; los componentes existentes tienen prioridad sobre implementaciones nuevas.

## Principios

- Mostrar el producto y su contenido real con una jerarquía clara. Usar capturas propias y datos verificables.
- Componer con tipografía, espacio y líneas finas; evitar fondos con degradados protagonistas, bloques de tarjetas idénticas y decoración sin función.
- Mantener una identidad común sin imponer la misma página a cada aplicación: una web editorial, un panel y un formulario pueden compartir tokens y comportamientos con estructuras distintas.
- Conservar las funciones, el contenido editable, los idiomas y el modo claro/oscuro al aplicar cambios visuales.

## Color

| Token semántico | Claro | Oscuro | Uso |
| --- | --- | --- | --- |
| `app.canvas` | `#F5F6F0` | `#111713` | Fondo principal |
| `app.panel` | `#FFFFFF` | `#19211B` | Paneles y superficies elevadas |
| `app.surface` | `#E8ECE2` | `#222C24` | Superficie secundaria y medios |
| `app.text` | `#18221B` | `#F2F4EC` | Texto principal |
| `app.muted` | `#58675A` | `#AFBCAF` | Texto secundario |
| `app.border` | `#CBD4C6` | `#344238` | Separadores y bordes suaves |
| `app.control-border` | `#748675` | `#879A87` | Controles y campos |
| `app.accent` | `#305845` | `#A5CB87` | Enlaces, foco y detalles de énfasis |
| `app.signal` | `#D6EF7C` | `#D6EF7C` | Acción destacada y superficies de cierre; texto `#18221B` |

La escala completa `brand.50–950` está en `src/theme.ts`; `brand.600` es el verde oscuro para botones con texto blanco. El acento lima se reserva para puntos de atención, no para bloques repetidos ni texto pequeño. Comprobar contraste al combinar tokens: texto normal mínimo 4.5:1 y elementos de interfaz mínimo 3:1.

## Tipografía y espacio

- Familia: **Satoshi Variable**, alojada en `/fonts/Satoshi-Variable.woff2`; respaldo `ui-sans-serif, system-ui, sans-serif`.
- Texto: 16–18 px; altura de línea cercana a 1.6. Metadatos secundarios: 12–14 px, sin reducir información esencial.
- Títulos: peso 650–750, interlineado cercano a 1, espaciado ligeramente cerrado. El título principal escala con `clamp()` y nunca colorea una palabra solo por decoración.
- Escala base: 4, 8, 12, 16, 24, 32, 48, 64 y 96 px. Secciones: 64 px en móvil y 96 px en escritorio como punto de partida.
- Contenedor principal: máximo `7xl` de Chakra, con márgenes laterales de 20 px en móvil y 32 px desde tableta. Alinear encabezado, contenido y pie.

## Componentes

- **Cabecera:** barra plana, borde inferior y navegación accesible. Conservar selector de idioma, tema, contacto y menú móvil. Identidad `A/` en bloque de alto contraste.
- **Botones:** rectangulares, altura mínima 44 px. Acción principal con fondo `app.text`/texto `app.canvas` o `app.signal`/texto oscuro; secundaria con borde y fondo transparente. Etiquetas describen la acción.
- **Enlaces y filas:** usar texto y separadores; indicar foco con un contorno visible. Mantener áreas táctiles de al menos 44 px.
- **Proyectos:** mostrar las capturas reales, información y enlaces existentes. Usar composición editorial y alternancia, no una cuadrícula repetitiva de iconos.
- **Formularios:** fondo `app.panel`, borde `app.control-border`, etiquetas persistentes y mensajes de error visibles. No sacrificar consentimiento ni validación.
- **Pie:** fondo `#111C16`, texto `#F2F4EC`, secundarios `#B2C0B2`, divisores `#34463A`; mantener contacto, navegación y enlaces legales.

## Movimiento y accesibilidad

- Entrada inicial y revelado al desplazar: opacidad y desplazamiento corto, con curva `cubic-bezier(0.23, 1, 0.32, 1)`; usar el componente `ScrollReveal` existente cuando corresponda.
- Controles: transiciones de 160–250 ms; movimiento de hover solo con puntero preciso. No animar datos que una persona está leyendo.
- Respetar `prefers-reduced-motion`; permitir pausar cualquier carrusel y conservar navegación por teclado, foco visible y semántica accesible.
- Probar claro y oscuro, español e inglés, escritorio y móvil; no usar color como única señal.

## Referencias observadas

- [Brittany Chiang](https://brittanychiang.com/): jerarquía, lectura y presentación de experiencia.
- [Rauno Freiberg](https://rauno.me/): atención al detalle y uso expresivo de la tipografía.
- [Lee Robinson](https://leerob.com/): estructura editorial sobria y contenido directo.

Son referencias de criterio, no plantillas que deban copiarse. Mantener los activos y la voz propios del proyecto.

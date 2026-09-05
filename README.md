# velaarturo.com

Portafolio profesional de Arturo Vela. Es una SPA de React y Chakra UI servida junto con su API desde un único Cloudflare Worker.

## Arquitectura

```text
Second Brain Worker ── Service Binding ── Porta Worker
       │                                      ├─ Vite SPA / Static Assets
       └─ D1 secondbrain-core + R2 FILES      ├─ HTML, SEO, feed y sitemap
                                              └─ D1 velaarturo-comments
```

- React 19, TypeScript estricto, Vite y React Router en modo librería.
- Chakra UI 3 con tokens semánticos, tema claro/oscuro y Satoshi.
- Workers Static Assets para bundles, fuentes y recursos propios.
- Service Binding privado `BRAIN` para contenido publicado y medios de Second Brain.
- D1 independiente para comentarios; Turnstile se valida en el Worker.
- Formspree continúa atendiendo el formulario de contacto.

El contenido público usa el contrato versionado en [`contracts/portfolio-v1.example.json`](contracts/portfolio-v1.example.json). Con el binding y el secreto configurados, Second Brain es la fuente de verdad: Porta sirve su manifiesto v1 o una copia válida obtenida previamente. El snapshot de `src/content/fallback.ts` queda reservado para desarrollo local o entornos sin la integración completa; un fallo de la integración configurada sin respaldo válido se expone como error y no se oculta con contenido bundled.

## Desarrollo local

Requisitos: Node.js 22 o posterior y pnpm 11.

```bash
pnpm install
cp .dev.vars.example .dev.vars
cp .env.example .env.local
pnpm types
pnpm dev
```

Variables privadas del Worker en `.dev.vars`:

- `BRAIN_CONTENT_TOKEN`: secreto largo y aleatorio compartido únicamente con Second Brain.
- `TURNSTILE_SECRET_KEY`: clave privada de Turnstile.

Variable pública de Vite en `.env.local`:

- `VITE_TURNSTILE_SITE_KEY`: clave pública del widget de Turnstile.

No se deben confirmar archivos `.dev.vars` ni `.env.local`.

## Verificación

```bash
pnpm check
pnpm build:staging
pnpm build:production
pnpm types:check
pnpm deploy:dry
```

Las pruebas cubren el contrato público, redirecciones, payloads de comentarios, mismo origen, metadatos y 404 de publicaciones.

## D1

Las bases remotas configuradas son:

- Staging: `velaarturo-comments-staging`
- Producción: `velaarturo-comments`

Aplicar migraciones:

```bash
pnpm db:migrate:local
pnpm db:migrate:staging
pnpm db:migrate:production
```

La importación histórica desde Neon es separada e idempotente. Requiere proporcionar temporalmente `DATABASE_URL`; no se importa el correo de los comentarios antiguos.

```bash
DATABASE_URL='…' pnpm comments:migrate:neon -- --env staging --dry-run
DATABASE_URL='…' pnpm comments:migrate:neon -- --env production
```

## Integración de contenido con Second Brain

`wrangler.jsonc` declara `BRAIN_CONTENT_TOKEN` como secreto obligatorio y conecta el Service Binding `BRAIN` con:

- Staging: `secondbrain-web-staging`.
- Producción: `secondbrain`.

El token debe existir por separado en ambos Workers de cada entorno. Usa el mismo valor dentro del par de staging y el mismo valor dentro del par de producción; los valores de staging y producción pueden ser distintos. Wrangler solicita el valor de forma interactiva, por lo que no debe pasarse como argumento ni guardarse en Git:

```bash
# Desde este repositorio (Porta)
pnpm exec wrangler secret put BRAIN_CONTENT_TOKEN --env staging
pnpm exec wrangler secret put BRAIN_CONTENT_TOKEN --env production

# Desde el checkout de Second Brain
pnpm exec wrangler secret put BRAIN_CONTENT_TOKEN --env staging
pnpm exec wrangler secret put BRAIN_CONTENT_TOKEN --env production
```

Porta solicita `GET /internal/v1/portfolio/velaarturo/manifest` con `Authorization: Bearer <BRAIN_CONTENT_TOKEN>`, valida el envelope `{schemaVersion:"1",siteKey:"velaarturo",publishedRevision,generatedAt,data}` y nunca entrega el token al navegador.

El editor permite cambiar textos y títulos, crear proyectos, reemplazar la portada de cada proyecto, añadir pantallas a su galería y actualizar el retrato del perfil. El contrato v1 admite `site.portrait` y `projects[].gallery` como campos opcionales de imagen `{src,alt,width,height}`; los manifiestos anteriores siguen siendo válidos. Las portadas también aparecen en el proyecto seleccionado de la portada del sitio.

La vista previa mantiene el borrador al navegar y actualizar contenido. Sus imágenes usan el token temporal de vista previa y se sirven con `private, no-store`; Second Brain valida ese token antes de entregar medios aún no publicados.

El catálogo dinámico se publica desde el sitio `velaarturo` de Second Brain. Para reflejar esta integración en producción, ese manifiesto debe contener NIETO Hub con `https://nieto.velaarturo.com` y Nieto Import con `https://portal.nietoimport.com`, conservando el contrato v1. Cambiar el snapshot empaquetado no sustituye esa publicación.

Después de desplegar primero Second Brain y luego Porta, la cabecera permite comprobar el origen sin revelar el secreto:

```bash
curl -fsS -D - https://velaarturo.com/api/content/manifest -o /dev/null \
  | tr -d '\r' \
  | grep -Ei '^x-portfolio-source: (brain|cache)$'
```

`x-portfolio-source: backup` indica operación degradada con el último manifiesto válido. Una respuesta `503` indica que la integración está configurada pero no existe un manifiesto remoto ni un respaldo válido; producción no responde con `bundled` en ese caso.

## Despliegue

Antes de desplegar, deben existir los Workers destino, su API interna v1, los Service Bindings anteriores y el secreto compartido en ambos lados. Luego:

```bash
pnpm deploy:staging
pnpm deploy:production
```

Producción usa Worker Routes sobre los registros DNS proxied existentes de `velaarturo.com` y `www.velaarturo.com`; `www` se redirige al dominio canónico. Los cambios de contenido publicados en Second Brain se reflejan sin reconstruir la SPA, con una caché máxima de 60 segundos.

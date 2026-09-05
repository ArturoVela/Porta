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

El contenido público usa el contrato versionado en [`contracts/portfolio-v1.example.json`](contracts/portfolio-v1.example.json). Si Second Brain no responde, el Worker usa la última respuesta válida y, finalmente, el snapshot empaquetado en `src/content/fallback.ts`.

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

- `BRAIN_CONTENT_TOKEN`: secreto compartido con Second Brain.
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

## Despliegue

Antes de staging, deben existir el Worker `secondbrain-web-staging`, su API interna v1 y el mismo valor de `BRAIN_CONTENT_TOKEN` en ambos Workers. Luego:

```bash
pnpm deploy:staging
pnpm deploy:production
```

Producción usa los dominios personalizados `velaarturo.com` y `www.velaarturo.com`; `www` se redirige al dominio canónico. Los cambios de contenido publicados en Second Brain se reflejan sin reconstruir la SPA, con una caché máxima de 60 segundos.

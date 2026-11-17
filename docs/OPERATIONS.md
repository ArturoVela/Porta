# Operación de Porta

[Volver al README](../README.md)

Guía de contenido, bases de datos, privacidad y despliegue. Ejecuta los comandos desde la raíz del repositorio. Las operaciones remotas requieren acceso al entorno correspondiente.

## Información legal

- `/es/legal` y `/en/legal` reúnen privacidad, cookies, condiciones de uso y el canal de derechos ARCO. El aviso cubre este portafolio; las aplicaciones enlazadas tienen sus propias políticas.
- `PRIVACY_POLICY_VERSION`, en `src/lib/legal.ts`, es compartida por el aviso, los formularios y el Worker. El consentimiento empieza desmarcado; la API valida y guarda su versión en los comentarios nuevos.
- Aplicar `migrations/0002_comment_privacy_consent.sql` antes de desplegar el Worker actualizado. Añade una columna nullable: conserva los comentarios existentes sin atribuirles consentimiento retroactivo. Los comandos `deploy:staging` y `deploy:production` ya aplican las migraciones antes del despliegue.
- El aviso no acredita cumplimiento legal integral. Quedan por completar identidad y domicilio del responsable, fijar plazos de conservación y revisar el registro de bancos de datos y las obligaciones de los proveedores.

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

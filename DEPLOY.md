# Deploy automático (push a `main`)

Cada push a `main` dispara el workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
que buildea el front, arma la imagen Docker y la despliega en la VPS. También se
puede correr a mano desde **Actions → Deploy a VPS → Run workflow**.

## Qué hace, paso a paso

1. `npm ci` + `npm run build` (Vite + prerender) usando el `.env` cargado desde un Secret.
2. Arma una imagen `nginx:alpine` con el `dist/` + `nginx.conf`.
3. `docker save` → `scp` del `.tar` a la VPS.
4. En la VPS: `docker load`, reemplaza el contenedor `seiminteractive-web-iot` y hace un healthcheck en `http://127.0.0.1:8085`.

## Setup por única vez

### 1. Secrets del repo

En GitHub: **Settings → Secrets and variables → Actions → New repository secret**. Crear:

| Secret | Valor |
|---|---|
| `DOTENV` | El contenido **completo** de tu `.env` local (las 6 `VITE_FIREBASE_*`). Son claves públicas de Firebase, van igual embebidas en el bundle. |
| `VPS_HOST` | `31.97.241.174` |
| `VPS_USER` | `root` |
| `VPS_SSH_KEY` | La **clave privada** del par que generás abajo. |

Para copiar el `.env` tal cual al secret `DOTENV`:

```bash
pbcopy < .env   # queda en el portapapeles, pegalo en el Secret
```

### 2. Clave SSH dedicada para el runner

No reutilices tu clave personal: generá una sólo para el deploy.

```bash
# En tu Mac
ssh-keygen -t ed25519 -f ~/.ssh/seim_deploy -N "" -C "github-actions-deploy"

# Autorizar la pública en la VPS
ssh-copy-id -i ~/.ssh/seim_deploy.pub root@31.97.241.174
# (o pegá el contenido de seim_deploy.pub en /root/.ssh/authorized_keys de la VPS)

# La PRIVADA va al Secret VPS_SSH_KEY:
pbcopy < ~/.ssh/seim_deploy   # pegala en el Secret VPS_SSH_KEY
```

### 3. Requisitos en la VPS (ya deberían estar)

- Docker instalado.
- El directorio `/srv/apps/seiminteractive-web-iot` existe.
- El reverse proxy sigue apuntando a `127.0.0.1:8085` (no cambia respecto al deploy manual).

## Uso diario

```bash
git push origin main   # y listo: mirá el progreso en la pestaña Actions
```

## Rollback

Cada imagen queda taggeada con el SHA del commit. Para volver a una versión previa,
en la VPS:

```bash
docker images | grep seim-front            # ver tags disponibles
docker stop seiminteractive-web-iot && docker rm seiminteractive-web-iot
docker run -d --name seiminteractive-web-iot --restart unless-stopped \
  -p 127.0.0.1:8085:80 seim-front:<sha-viejo>
```

O simplemente `git revert` + push, y el workflow redeploya el estado anterior.

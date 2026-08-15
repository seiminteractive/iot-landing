# Sistema de Briefs — Setup

Formulario interactivo para que los clientes carguen su proyecto + panel admin
para gestionar respuestas. Stack: Vue 3 + Vue Router + Firebase (Auth + Firestore).

## Rutas
| Ruta | Quién | Qué es |
|------|-------|--------|
| `/` | público | landing (sin cambios) |
| `/brief` | cliente | ingresa su código |
| `/brief/:sessionId` | cliente | wizard del formulario (autosave) |
| `/admin/login` | vos | login email/password |
| `/admin` | vos | bandeja de respuestas |
| `/admin/forms` | vos | constructor de formularios |
| `/admin/clients` | vos | códigos de acceso por cliente |

## 1. Variables de entorno
Copiá `.env.example` a `.env` y completá con la config **Web** de tu proyecto
(Firebase console → Configuración del proyecto → Tus apps → SDK setup).

```bash
cp .env.example .env
```

## 2. Configuración en la consola de Firebase
1. **Authentication → Sign-in method:**
   - Activá **Correo electrónico/contraseña** (es tu login de admin).
   - Activá **Anónimo** (lo usan los clientes para poder guardar sin loguearse).
2. **Authentication → Users:** creá tu usuario admin (email + contraseña). Ese es
   el que reconoce el panel como administrador.
3. **Firestore Database:** creá la base (modo producción).
4. **Firestore → Reglas:** pegá el contenido de [`firestore.rules`](firestore.rules)
   y publicá. (O `firebase deploy --only firestore:rules` si usás Firebase CLI.)

> Nota de seguridad: el código del cliente se guarda **hasheado** como id del
> documento. Es una capa liviana a propósito: quien tiene el código puede ver/editar
> ese brief, pero nadie puede enumerar la lista de clientes ni leer briefs ajenos.

## 3. Correr en local
```bash
npm install
npm run dev
```
Flujo: entrá a `/admin/login` → creá un formulario en **Formularios** → creá un
**código** en **Clientes** y asignale ese formulario → pasale al cliente el link
`tudominio.com/brief` + su código.

## 4. Deploy (VPS / Docker)
Las variables `VITE_*` se **inyectan en tiempo de build** (no en runtime). En el
build de Docker tenés que tenerlas disponibles cuando corre `npm run build`. Opción
simple: pasarlas como build args en el Dockerfile, o copiar un `.env` al contexto
de build (no lo subas al repo). El resto del deploy (nginx + SPA fallback) ya está
listo en `nginx.conf`.

## Modelo de datos (Firestore)
- `templates/{id}` — `{ name, steps[] }` (los formularios que armás)
- `clients/{codeHash}` — `{ name, code, templateId, status }`
- `responses/{codeHash}` — `{ templateId, clientName, answers, status }`

Estados de una respuesta: `borrador` → `enviado` → `en_revision` → `cotizado`.

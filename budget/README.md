# Presupuestos — Seim Interactive

Carpeta autocontenida para emitir presupuestos manteniendo la estética de marca.
Cada presupuesto es un HTML que se abre con doble click. **No requiere `npm`, build ni servidor.**

## Cómo crear un presupuesto nuevo

```bash
cp _template.html nombre-cliente.html
```

Abrir el archivo con doble click y editar:

- En pantalla: todos los campos visibles son editables (click + escribir).
- En el código: buscar marcadores entre corchetes (`[CLIENTE]`, `[NUMERO]`, `[PROD-1-TITULO]`, etc.) con `Ctrl+F` y reemplazar.

El tipo de cambio se cambia en el badge del header — los valores en ARS y los totales se recalculan solos. El TC queda guardado en `localStorage` para próximas aperturas.

## Exportar a PDF

`Ctrl+P` (o el botón flotante inferior derecho) → "Guardar como PDF". El estilo de impresión preserva el fondo negro y rompe páginas limpio entre secciones.

## Archivos

- `_template.html` — plantilla base. **No editar directamente** (es la fuente para duplicar).
- `paternal-motor.html` — primer presupuesto emitido (referencia).
- `assets/MARCA-14.png` — logo. Compartido por todos los presupuestos.

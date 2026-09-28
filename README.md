# Fares Glam · Web para GitHub Pages

1. Sube todo el contenido de esta carpeta al repositorio de GitHub.
2. En GitHub entra a **Settings > Pages**.
3. En **Deploy from a branch**, selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda y espera la URL de GitHub Pages.

La web funciona primero en modo demo con los 49 productos y sus fotos. Para recibir pedidos y administrar inventario, abre `js/config.js` y cambia solamente esta línea:

```js
export const API_URL = 'URL_DE_TU_APPS_SCRIPT_TERMINADA_EN_/exec';
```

Después de cambiarla, vuelve a subir la carpeta o edita ese archivo directamente en GitHub. El resto de la web no necesita cambios.

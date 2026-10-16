# MMM Turquía — Intranet Misionera & Radio Esperanza

Plataforma oficial de intercesión, movilización misionera, boletín interactivo de oración, diario espiritual y transmisión 24/7 para la obra del Movimiento Misionero Mundial en Turquía.

## 🚀 Características Principales

- **PWA (Progressive Web App):** Instalable en Android, iOS, Windows y Mac con soporte offline mediante Service Worker (`sw.js`).
- **Boletín de Oración:** 20 bloques estratégicos de intercesión por las regiones de Turquía (Estambul, Anatolia, Bósforo, etc.) con motivos específicos y versículos bíblicos.
- **Diario de Oración:**
  - Guarda bloques y motivos desde el boletín.
  - Registro de oraciones personales y motivos puntuales.
  - Botón de **«Respondido»** con historial y comentarios de testimonios de fe.
  - Filtros por categoría: *Guardados, Orados, Contestados, Propios*.
- **Radio Esperanza 24/7:** Reproductor de audio en vivo con alabanzas y palabra.
- **Comunidad y Chat:** Peticiones comunitarias y registro de intercesores.
- **Modo Oscuro / Claro:** Selector de tema integrado.

## 📁 Estructura de Archivos Clave

- `public/`:
  - `manifest.json` y `manifest.webmanifest`: Configuración de la PWA (nombre, colores, iconos).
  - `sw.js`: Service worker para caché offline e instalación de la app.
  - `robots.txt`: Reglas de rastreo para motores de búsqueda.
  - `404.html`: Redirección amigable para alojamientos estáticos (como GitHub Pages).
  - `pwa-192x192.png` y `pwa-512x512.png`: Iconos de la aplicación para el celular.
- `src/`: Código fuente en React con TypeScript y Tailwind CSS.

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

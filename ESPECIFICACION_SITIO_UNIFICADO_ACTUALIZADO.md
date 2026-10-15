# ESPECIFICACIÓN TÉCNICA Y ARQUITECTURA: SITIO WEB UNIFICADO & PLATAFORMA MISIONERA (www.misitio.org)

> **Documento Maestro de Arquitectura, Especificaciones y Hoja de Ruta**  
> **Versión Actualizada:** 2.0 (Mobile-First Web App, Radio Esperanza 24/7 & Intranet Protegida)

---

## 📌 1. PROPÓSITO GENERAL Y ESTRATEGIA DUAL

Centralizar en un único dominio y codebase estático de ultra-alto rendimiento dos grandes frentes misioneros sin duplicar carpetas físicas ni código:

1. **Evangelización Local y Edificación Global (Home Público `index.html`):**
   - **Enfoque 90% Celulares:** Diseñado desde sus cimientos como **Web App Móvil (PWA)** y preparado para generar un **APK nativo (Google Play Store / App Store)**.
   - **Protagonista:** **Radio Esperanza 24/7 ("radioonlined2")** con transmisión en directo, guía de programación al aire, fonoteca de programas grabados a la carta y reproductor estático permanente anclado al pie de la pantalla (Bottom Player Dock).
   - **Multilingüe dinámico (ES / TR / EN / IT):** Alternancia instantánea de idioma sin recarga mediante `lang.js` y atributos `data-i18n`.
   - **Privacidad Estratégica del Home:** **Sin enlaces públicos directos hacia la Intranet**. Los visitantes interesados dejan sus datos en el formulario de contacto pastoral para ser evaluados e invitados manualmente por WhatsApp.

2. **Movilización e Intercesión Global (Zona Privada `/intranet/`):**
   - Espacio restringido para pastores, líderes e intercesores comprometidos.
   - Autenticación Google Auth (`signInWithPopup` + fallback `signInWithRedirect`), aprobación pastoral en Firestore, boletín de oración interactivo dinámico, diario de motivos y bóveda de expediciones.

---

## 📱 2. ESPECIFICACIÓN DEL FRONTEND PÚBLICO (HOME RADIO MOBILE-FIRST)

### A. Filosofía de Medidas y Viewport Celular
* **Anti-Desbordamiento Estricto:** `width: 100%`, `max-width: 100vw`, `overflow-x: hidden` en `html` y `body`.
* **Viewport Adaptativo:** `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, viewport-fit=cover">`.
* **Safe Area Insets:** Respeto de `env(safe-area-inset-bottom)` y `env(safe-area-inset-top)` para dispositivos con notch o barra de gestos (iOS y Android moderno).

### B. Módulos del Home (`index.html`)

```text
┌────────────────────────────────────────────────────────┐
│ 1. NAVBAR MÓVIL MINIMALISTA (Logo + Idioma + Menú)     │
├────────────────────────────────────────────────────────┤
│ 2. HERO CONSOLA "ON AIR" (Carátula, Play Master, Ecual.)│
├────────────────────────────────────────────────────────┤
│ 3. PROGRAMACIÓN & GUÍA EN VIVO (Pestañas Días + Filtros)│
├────────────────────────────────────────────────────────┤
│ 4. FONOTECA A LA CARTA / PODCASTS (Buscador + Audios) │
├────────────────────────────────────────────────────────┤
│ 5. NOTICIAS Y AVANCES DEL CAMPO (Módulo Modular Conmut.)│
├────────────────────────────────────────────────────────┤
│ 6. CONTACTO PASTORAL & WHATSAPP (Filtro hacia Intranet)│
├────────────────────────────────────────────────────────┤
│ 7. FOOTER INSTITUCIONAL (Redes, Créditos, Citas)       │
├────────────────────────────────────────────────────────┤
│ ⚓ REPRODUCTOR ESTÁTICO INFERIOR (Dock + Tabs + MiniPlay)│
└────────────────────────────────────────────────────────┘
```

1. **Barra de Navegación Superior (Navbar):**
   - En pantallas móviles: Se muestra únicamente el logotipo (`MMM TURQUÍA`), el selector desplegable de idioma (`ES`, `TR`, `EN`, `IT`) y el botón de menú hamburguesa. Los botones secundarios se ocultan para evitar saturar el ancho de pantalla.
2. **Consola Hero "En el Aire":**
   - Insignia `"🔴 EN DIRECTO 24/7"`, carátula del programa con resplandor dorado, título y expositor del segmento actual, botón principal Master Play/Pause ergonómico para el pulgar, ecualizador animado, control de volumen táctil y barra de avance del bloque en tiempo real.
3. **Parrilla de Programación ("Guía al Aire"):**
   - Selector horizontal deslizable por días (`Hoy`, `Mañana`, días de la semana) con scroll suave táctil (`-webkit-overflow-scrolling: touch`), filtros por categoría (Alabanza, Biblia, Oración, Misión) y tarjetas cronológicas de programas.
4. **Fonoteca de Programas Grabados ("A la Carta / Podcasts"):**
   - Buscador por texto y tarjetas con carátula, duración, fecha y botón de reproducción inmediata que se conecta sin cortes al reproductor.
5. **Sección de Noticias y Actualidad (Conmutable):**
   - Bloque modular con cuadrícula adaptativa (`1fr` en celulares, `repeat` en tablet/escritorio) para notas informativas cuando el equipo decida publicarlas.
6. **Formulario Pastoral y WhatsApp ("Conócenos"):**
   - Canal exclusivo para que personas interesadas soliciten intercesión, información de la obra o sumarse al grupo privado de WhatsApp.
7. **Reproductor Estático Permanente Inferior (Bottom App Dock & Player):**
   - **Anclaje Fijo:** Anclado con `position: fixed; bottom: 0; left: 0; right: 0; z-index: 900;`.
   - **Dock de Pestañas Móviles Integrado (Estilo Native App):** Pestañas de acceso rápido (`Radio 24/7`, `Guía`, `A la Carta`, `Contacto`, `Instalar App`) distribuidas uniformemente (`flex: 1`).
   - **Mini-Reproductor Sincronizado:** Carátula miniatura, título en marquesina con elipsis, botón play/pause de 40px, controles de salto ±15s para grabaciones, silenciador rápido y botón para expandir a la consola principal.
   - **Compensación de Scroll en Body:** `padding-bottom: calc(125px + env(safe-area-inset-bottom, 0px))` para que ningún elemento del pie de página quede tapado.

---

## 🔐 3. ZONA PRIVADA / INTRANET MISIONERA (`/intranet/`)

Acceso restringido protegido contra indexación en Google (`noindex, nofollow`) y con seguridad en Firebase:

### Flujo de Acceso:
```text
Usuario recibe enlace por WhatsApp ──► /intranet/index.html (Google Auth)
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
              ¿Primera vez?                                    Ya registrado
                      │                                               │
             Ficha de Registro                                 ¿Aprobado por Pastor?
        (WhatsApp, País, Iglesia)                                     │
                      │                                       ┌───────┴───────┐
          Notificación al Pastor                              ▼               ▼
        (rvicentetapia@gmail.com)                            SÍ              NO
                      │                                       │               │
                      └──────────────► /intranet/espera.html ─┘       /intranet/home.html
                                     (Escucha en tiempo real         (Boletín, Diario,
                                     onSnapshot hasta aprobar)        Expediciones, etc.)
```

### Módulos Internos:
1. **Home Intranet (`/intranet/home.html`):** Panel con anuncios pastorales y accesos rápidos.
2. **Boletín de Intercesión (`/intranet/boletin-de-oracion/`):** Bóveda de 9 bloques dinámicos servidos desde Firestore con contador de intercesores *"He orado"* y comentarios en vivo.
3. **Diario de Oración (`/intranet/diario/`):** 4 pilares: motivos orados, motivos guardados, motivos contestados y motivos personales.
4. **Expediciones y Viajes (`/intranet/expedicion/`):** Información logística para voluntarios y misioneros de corto plazo.
5. **Donaciones y Proyectos (`/intranet/donar/`):** Frentes de ayuda para la obra en Turquía y las 7 Iglesias.

---

## 🛠️ 4. ARQUITECTURA DE ARCHIVOS Y SEPARACIÓN DE RESPONSABILIDADES

La estructura del proyecto respeta la separación limpia de código:

```text
├── index.html                        <-- HTML semántico del Home Radio (PWA)
├── manifest.webmanifest              <-- Manifiesto PWA para instalación móvil y APK
├── sw.js                             <-- Service Worker (Caché offline del cascarón)
├── ESPECIFICACION_SITIO_UNIFICADO.md <-- Este documento rector
├── ESPECIFICACION_HOME_RADIO.md      <-- Especificación funcional del reproductor
├── assets/
│   ├── css/
│   │   └── radio-home.css            <-- Sistema de diseño, consola broadcast y móvil
│   ├── js/
│   │   ├── lang.js                   <-- Motor i18n (ES, TR, EN, IT) con almacenamiento local
│   │   ├── radio-player.js           <-- Núcleo de audio (Stream, Fonoteca, MediaSession)
│   │   └── radio-schedule.js         <-- Catálogo de programas y horarios
│   └── icons/
│       └── app-icon.svg              <-- Iconografía de la App en alta definición
└── intranet/                         <-- Zona Privada (Protegida)
    ├── index.html                    <-- Login Google Auth & Ficha
    ├── espera.html                   <-- Sala de espera reactiva
    ├── home.html                     <-- Dashboard privado
    ├── boletin-de-oracion/           <-- Boletín protegido
    └── diario/                       <-- Diario personal de oración
```

---

## 💡 5. SUGERENCIAS DE MEJORA Y MODIFICACIONES EN LA ARQUITECTURA

A continuación se detallan las recomendaciones técnicas y estratégicas para optimizar la plataforma:

### 1. Desacoplar la Configuración de Streaming (`radio-config.js`)
* **Problema actual:** Los enlaces del streaming de radio y los metadatos de respaldo están definidos dentro de `radio-player.js`.
* **Sugerencia:** Crear un archivo ligero de configuración o JSON (`assets/js/radio-config.js`) que defina:
  ```javascript
  export const RADIO_CONFIG = {
    streamUrl: "https://stream.zeno.fm/f3wvbbqmdg8uv",
    fallbackUrl: "https://stream.zeno.fm/f3wvbbqmdg8uv",
    stationName: "MMM Turquía — Radio Esperanza",
    bitrate: "64kbps-AAC", // Óptimo para celular con datos limitados
    timeZone: "Europe/Istanbul", // UTC+3
    whatsappNumber: "+90XXXXXXXXXX"
  };
  ```
* **Ventaja:** Permite cambiar de servidor de streaming o servidor de radio en un solo segundo sin tocar la lógica de reproducción.

### 2. Conversión a APK para Google Play Store mediante TWA (Trusted Web Activity)
* **Recomendación Técnica:** Dado que el 90% de los usuarios accede por celular y el objetivo es publicar en Google Play Store / App Store:
  - Usar **Bubblewrap CLI** o **PWABuilder** (de Microsoft/Google).
  - Como el sitio ya cuenta con `manifest.webmanifest`, `sw.js`, `https://` y metadatos nativos, la conversión a archivo `.aab` o `.apk` toma menos de 10 minutos.
  - Para App Store (iOS), se puede empaquetar con **Capacitor** envolviendo la misma URL con vista web nativa o recomendar la instalación directa *"Añadir a pantalla de inicio"*, que ya cuenta con guía paso a paso en el modal.
  - **Requisito en el servidor:** Crear la ruta `/.well-known/assetlinks.json` para verificar la firma de Google Play y que la app abra sin barra de navegación del navegador (experiencia 100% nativa).

### 3. Alojamiento de Audios de Fonoteca en Bunny Storage / CDN
* **Sugerencia:** Alojar todos los episodios grabados de la fonoteca y devocionales en **Bunny Storage con Pull Zone** (`https://tdcmhk.b-cdn.net/podcasts/...`).
* **Ventaja:**
  - El repositorio de GitHub se mantiene inferior a 10 MB.
  - Bunny CDN soporta solicitudes de rango de bytes (`Byte-Range Requests`), permitiendo a los usuarios adelantar o retroceder audios en el celular instantáneamente sin tener que descargar el archivo completo.
  - Reducción drástica del consumo de datos móviles de los oyentes.

### 4. Automatización de Horarios según la Zona Horaria del Oyente
* **Sugerencia:** Actualmente la parrilla muestra horas fijas de Turquía (UTC+3). Se puede añadir una opción o detección automática:
  - *"Mostrar horarios en mi hora local"* (convirtiendo automáticamente de UTC+3 a la hora del celular del usuario mediante `Intl.DateTimeFormat().resolvedOptions().timeZone`).
* **Ventaja:** Un intercesor en Perú (-5 UTC) o en España (+2 UTC) sabe de un vistazo qué programa está al aire en su hora sin hacer cálculos mentales.

### 5. Caché Inteligente en el Service Worker (`sw.js`)
* **Sugerencia:**
  - Caché estricto para iconos, tipografías y CSS (`Cache-First`).
  - Red con alternativa offline para páginas HTML (`Network-First`).
  - **Exclusión total de caché para las URLs de audio streaming:** Los streams continuos (Icecast/Zeno) nunca deben pasar por la caché del Service Worker para evitar fugas de memoria en celulares.

### 6. Protección Pastoral de la Intranet sin Filtraciones
* **Sugerencia:**
  - Mantener `/intranet/` en `robots.txt` con `Disallow: /intranet/`.
  - El formulario de contacto de `index.html` envía los datos vía FormSubmit o Firestore.
  - Cuando el pastor aprueba al solicitante en el grupo de WhatsApp, le comparte el enlace directo con un identificador de invitación, garantizando que el público general del Home nunca vea una puerta de entrada abierta sin supervisión.

---

## 📊 6. CHECKLIST DE CONFORMIDAD Y ESTADO

| Módulo / Característica | Estado | Ubicación |
| :--- | :---: | :--- |
| **Home Radio 24/7** | ✅ Implementado | `/index.html` |
| **Reproductor Estático Inferior (Dock)** | ✅ Implementado | `#onDemandMiniPlayer` en `index.html` |
| **PWA Manifest & Iconos** | ✅ Implementado | `/manifest.webmanifest`, `/assets/icons/` |
| **Service Worker para App Shell** | ✅ Implementado | `/sw.js` |
| **Ajustes de Medidas y Viewport Móvil** | ✅ Implementado | `assets/css/radio-home.css` |
| **Diccionarios 4 Idiomas (ES, TR, EN, IT)** | ✅ Implementado | `assets/js/lang.js` |
| **Parrilla y Fonoteca Modular** | ✅ Implementado | `assets/js/radio-schedule.js` |
| **Zona Privada Intranet** | 📌 Planificado/Integrado | `/intranet/` |

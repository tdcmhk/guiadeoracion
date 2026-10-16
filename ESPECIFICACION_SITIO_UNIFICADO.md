# ESPECIFICACIÓN TÉCNICA Y ARQUITECTURA: SITIO WEB UNIFICADO Y PLATAFORMA MISIONERA (www.misitio.org)

## 📌 1. PROPÓSITO GENERAL Y ESTRATEGIA DUAL
Centralizar en un único dominio y codebase estático de alto rendimiento dos grandes frentes misioneros sin duplicar archivos ni subcarpetas físicas:
1. **Movilización e Intercesión Global (ES / EN / IT):** Difundir la visión de la obra en Turquía hacia las iglesias en Europa y América Latina, canalizando a intercesores, donantes y colaboradores hacia la Intranet segura.
2. **Evangelización Local y Edificación (TR - Público Turco):** Difundir las Buenas Nuevas y materiales de fe con lenguaje y sensibilidad cultural apropiada mediante Radio Online 24/7, TV/Video streaming y contenidos en turco.

---

## 🌐 2. ESTRUCTURA DE PÁGINAS Y FLUJOS DE USUARIO

### A. ZONA PÚBLICA (Abierta a todo visitante e indexable)
Todas las páginas públicas se sirven en la raíz o rutas limpias sin subcarpetas por idioma, gestionadas dinámicamente mediante `lang.js`.

#### 1. Home Principal Multilingüe (`/index.html`)
* **Selector de Idioma Dinámico (Navbar):** Alterna instantáneamente entre `ES`, `EN`, `IT` y `TR`.
  * Guarda la preferencia en `localStorage.getItem('user_lang')`.
  * Detecta el idioma del dispositivo al primer ingreso (`navigator.language`).
  * Actualiza los nodos HTML marcados con `data-i18n` sin recargar la página.
* **Perfil (Navbar):** Entra a la página de perfil para llenar datos.
**Carousel Principal con Video Dinámico de Fondo (Estilo Netflix via Bunny Stream):** iframe optimizado con capas protectoras (.iframe-overlay).
* **Secciones Clave:**
  * mini Reproductor de radio
  * visualizaciond de ultimo video 
  * Sección institucional *"Quiénes Somos"*.
* **Footer Global Unificado:** Logotipos y recursos servidos desde Bunny Storage/Pull Zone, enlaces a redes sociales y notas legales.


### A. Módulos(`index.html`)

```text
┌────────────────────────────────────────────────────────┐
│ 1. NAVBAR MÓVIL MINIMALISTA (Logo + Idioma + Menú)     │
├────────────────────────────────────────────────────────┤
│ 2. HERO CONSOLA visualizaciond de ultimo video 
├────────────────────────────────────────────────────────┤
│ 3. mini Reproductor de radio
├────────────────────────────────────────────────────────┤
  4. Sección institucional *"Quiénes Somos"*.
├────────────────────────────────────────────────────────┤
│ 5. CONTACTO 
├────────────────────────────────────────────────────────┤
│ 6. FOOTER INSTITUCIONAL (Redes, Créditos, Citas)       │
└────────────────────────────────────────────────────────┘

```
## 📱 2. TV
Estilo netflix con acceso a videos publicos para los del rol de seguidor e intercesor pero con algunos videos de pago o de libre acceso al rol de ofrendador.


## 📱 3. ESPECIFICACIÓN RADIO MOBILE

### A. Filosofía de Medidas y Viewport Celular
* **Anti-Desbordamiento Estricto:** `width: 100%`, `max-width: 100vw`, `overflow-x: hidden` en `html` y `body`.
* **Viewport Adaptativo:** `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, viewport-fit=cover">`.
* **Safe Area Insets:** Respeto de `env(safe-area-inset-bottom)` y `env(safe-area-inset-top)` para dispositivos con notch o barra de gestos (iOS y Android moderno).

### B. Módulos(`index.html`)

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
## 4. Página de Perfil y Registro (perfil/index.html)
* **Acceso Exclusivo Google Auth:** Botón único con soporte para redirección en móviles (`signInWithPopup` + fallback `signInWithRedirect`).
* **Ficha de Registro Inicial:** Formulario obligatorio al primer ingreso (Nombre, Apellido, WhatsApp, País e Iglesia), registro con selección de rol (seguidor / intercesor)

### Flujo de Acceso:
```text
Usuario recibe enlace por WhatsApp ───────────────────► /perfil/index.html (Google Auth)
                                              
            ┌─────────────────────────────────────────────────────│
                                                                  │
      Rol de seguidor                                   rol de intercesor
            ▼                             ┌───────────────────────┴───────────────────────┐
    queda registrado                      ▼                                               ▼
    automaticamente                 ¿Primera vez?                                    Ya registrado
            ▼                             │                                               │
    mmmturquia/index.html           Ficha de Registro                                 ¿Aprobado por Pastor?
                            (WhatsApp, País, Iglesia)                                     │
                                          │                                       ┌───────┴───────┐
                              Notificación al Pastor                              ▼               ▼
                            (rvicentetapia@gmail.com)                            SÍ              NO
                                          │                                       │               │
                                          └──────────────► /intranet/espera.html ─┘       /intranet/home.html
                                                        (Escucha en tiempo real         (Boletín, Diario,
                                                        onSnapshot hasta aprobar)        Expediciones, etc.)
```
### rol de seguidor
* registra sus datos y continúa sin aprobacion sigue a la pagina de `mmmturquia/index.html`
### rol de intercesor
* **Notificación Pastoral Automática:** Envío silencioso de la ficha vía API (FormSubmit) al correo del administrador general (`rvicentetapia@gmail.com`).
* **Enrutamiento por Estado de Aprobación:**
  * Si `aprobado == false` ➔ Redirige a la Antesala de Espera (`/perfil/espera.html`).
  * Si `aprobado == true` ➔ Redirige automáticamente a `/intranet/index.html`
* **perfil intercesor:** se muestra el botón del `/intranet/boletin-de-oración/index.html` 



## 5. Antesala / Sala de Espera Pastoral (`/perfil/espera.html`)
* Muestra estado *"Solicitud en revisión pastoral"* con indicador visual activo.
* Contenido preliminar medianamente sensible: video documental introductorio y panorama misionero.
* Escucha reactiva (`onSnapshot`): al momento en que el administrador aprueba la cuenta en Firebase, la pantalla redirige automáticamente al contenido completo sin recargar.

## 6. ZONA PRIVADA / INTRANET (Acceso Restringido y Protegido)
Protegida contra motores de búsqueda (`noindex, nofollow`) y con validación en servidor vía Firebase Authentication y Firestore Rules. Solo ingresan los que tienen el rol de intercesor

### 1. Home de la Intranet (`/intranet/index.html`)
* **Hero Carousel con Video Adaptativo de Fondo (Bunny Stream):**
  * Videos de ambientación servidos vía CDN con parámetros de iframe: `autoplay=true&loop=true&muted=true&controls=false&preload=true`.
  * Capa protectora `.iframe-overlay` transparente para interceptar gestos táctiles (swipe) y clics sin interferir con el reproductor.
  * **Secciones Clave:**
  * Resumen del proyecto misionero y visión en Turquía.
  * Avance público del boletín y llamados a la acción (CTA) destacados: *"Únete a la Intercesión"*,
* Dashboard central para intercesores y pastores autorizados.
* Avisos pastorales recientes y noticias del campo misionero.
* Accesos rápidos a los 4 módulos privados:
  1. **Boletín de Intercesión** (`/intranet/boletin-de-oracion/`)
  2. **Diario de Oración** (`/intranet/diario/`)
  3. **Expediciones y Viajes** (`/intranet/expedicion/`)
  4. **Donaciones y Proyectos** (`/intranet/donar/`)
  5. **Perfil de Usuario** (`/perfil/index`)

### 2. Boletín de Oración Protegido (`/boletin-de-oracion/index.html`)
* Bóveda de bloques cargados dinámicamente desde Firestore (`boletin_bloques` / `ediciones_boletin`).
* Los textos sensibles no residen en el HTML plano de GitHub.
* Sistema de interacción social por bloque:
  * Botón *"He orado"* con contador sincronizado en tiempo real.
  * Botón *"Guardar en mi diario"* para intercesión constante.
  * Módulo desplegable de comentarios comunitarios en vivo.

### 3. Diario de Oración Personal (`/intranet/diario/index.html`)
* Panel de 4 pilares interactivos para el usuario:
  * **Motivos Orados:** Registro cronológico de bloques respaldados.
  * **Motivos Guardados:** Peticiones activas extraídas del boletín.
  * **Motivos Contestados:** Libro de testimonios y respuestas de oración.
  * **Motivos Propios:** Peticiones familiares y personales privadas del intercesor.

---

## 🛠️ 7. ARQUITECTURA DE ARCHIVOS Y SEPARACIÓN DE RESPONSABILIDADES

La estructura del proyecto respeta la separación limpia de código:

```text
├── index.html                        <-- HTML semántico del Home Radio (PWA)
├── manifest.webmanifest              <-- Manifiesto PWA para instalación móvil y APK
├── sw.js                             <-- Service Worker (Caché offline del cascarón)
├── 404.html 
├── CNAME
├── admin.html
├── radio/
│       └──index.html
├── perfil
│       └──index.html
│       └──espera.html
├── assets/
│   ├── css/
│   │   └── site-home.css            <-- Sistema de diseño, consola broadcast y móvil
│   │   └── radio-home.css 
│   │   └── radio-home2.css 
│   │   └── radio-home1.css 
│   │   └── 1-base-nav-footer.css 
│   │   └── 3-widgets-interactivos.css 
│   │   └── 2-boletin-contenido.css 
│   ├── js/
│   │   ├── lang.js                   <-- Motor i18n (ES, TR, EN, IT) con almacenamiento local
│   │   ├── radio-player.js           <-- Núcleo de audio (Stream, Fonoteca, MediaSession)
│   │   └── radio-schedule.js         <-- Catálogo de programas y horarios
│   │   └── funcionesmt.js 
│   │   └── firebase-boletin.js 
│   └── icons/
│       └── app-icon.svg              <-- Iconografía de la App en alta definición
│       └── iconos.svg  
└── intranet/                         <-- Zona Privada (Protegida)
    ├── index.html                    <-- Dashboard privado
    ├── boletin-de-oracion/           <-- Boletín protegido
        └── index.html
        └── sw.html
        └── manifest.html
        └── robots
        ├── images/     
        ├── fonts/     
        ├── videos/   
    ├── diario/            <-- Diario personal de oración
        └── index.html              
    ├── ramadan/            
        └── index.html                  
```

## 🛠️ 8. ARQUITECTURA TÉCNICA Y GESTIÓN DE MEDIOS (BUNNY.NET)

### 1. Desacoplamiento de GitHub y Optimización de Rendimiento
* **GitHub Repository:** Contiene exclusivamente código fuente ligero (`.html`, `.css`, `.js`, `.json`). Peso total del repo < 10 MB.
* **Bunny Storage + Pull Zone (`https://[tu-zona].b-cdn.net`):**
  * Almacena imágenes (`.webp`), logotipos, íconos vectoriales (`.svg`) y fuentes web (`.woff2`).
  * Caché geográfica global (Edge Cache) con compresión Brotli automática.
  * Enlaces estables y rápidos para metadatos sociales (`og:image`, `twitter:image`).

### 2. Infraestructura de Video Profesional (Bunny Stream)
* **Transcodificación y Streaming Adaptativo (HLS):**
  * Bunny Stream procesa los videos y genera resoluciones múltiples automáticas (1080p, 720p, 480p, 360p) según el ancho de banda del celular.
* **Incrustación en Hero / Carruseles (Fondo sin controles):**
  * Parámetros estándar: `https://iframe.mediadelivery.net/embed/[LibraryId]/[VideoId]?autoplay=true&loop=true&muted=true&controls=false&preload=true&responsive=true`.
  * Estructura responsiva:
    ```html
    <div class="video-bg-container">
      <iframe src="..." class="slide-iframe" allow="autoplay; fullscreen" loading="lazy"></iframe>
      <div class="iframe-overlay"></div>
    </div>
    ```
* **Subtítulos y Pistas de Idioma:**
  * Soporte de archivos `.vtt` independientes en Turco (`tr`), Español (`es`), Inglés (`en`) e Italiano (`it`) asociados en Bunny Stream sin necesidad de volver a renderizar videos.

---

## 🔐 9. MOTOR DE SEGURIDAD Y BASE DE DATOS (FIREBASE FIRESTORE)

### 1. Modelo de Datos y Roles en Firestore
* **Colección `usuarios/{uid}`:**
  ```json
  {
    "nombre": "Ricardo",
    "apellido": "Tapia",
    "email": "correo@gmail.com",
    "telefono": "+51999999999",
    "pais": "Perú",
    "iglesia": "Central",
    "rol": "intercesor", // "admin" | "vip" | "intercesor" | "miembro_local"
    "aprobado": false,
    "fechaRegistro": "TIMESTAMP",
    "bloquesOrados": [],
    "motivosFavoritos": [],
    "motivosContestados": [],
    "motivosPropios": []
  }
  ```
* **Colección `boletin_bloques/{seccionId}`:** Textos de los 9 bloques del boletín accesibles únicamente si el usuario está aprobado.
* **Colección `comentarios_bloques/{comentarioId}`:** Comentarios de comunidad asociados por `bloqueId`.

### 2. Matriz de Reglas de Seguridad (`firestore.rules`)
* Solo el correo del administrador (`rvicentetapia@gmail.com`) posee permisos de escritura en la configuración global y aprobación de usuarios.
* Usuarios sin sesión o con `aprobado == false` tienen denegada la lectura de bloques del boletín y comentarios.

---

## 🌍 10. MOTOR DE INTERNACIONALIZACIÓN (lang.js)

### 1. Principio de Cero Subcarpetas Físicas
* Un único archivo HTML para cada vista.
* Los textos traducibles llevan el atributo `data-i18n="clave"`.
* Los atributos como placeholders llevan `data-i18n-ph="clave"`.

### 2. Estructura del Diccionario (`assets/js/lang.js`)
```javascript
export const i18n = {
  es: {
    nav_home: "Inicio",
    nav_about: "Quiénes Somos",
    btn_login: "Acceso Intranet",
    hero_title: "Boletín de Oración",
    // ...
  },
  tr: {
    nav_home: "Ana Sayfa",
    nav_about: "Hakkımızda",
    btn_login: "Giriş Yap",
    hero_title: "Dua Bülteni",
    // ...
  },
  en: { /* ... */ },
  it: { /* ... */ }
};
```
* **Función de Aplicación Global:**
  Al cambiar el idioma, actualiza todos los nodos del DOM y guarda la selección en `localStorage`.

---

## 📱 11. CONFIGURACIÓN PWA Y EXPERIENCIA MÓVIL FULLSCREEN

* **Archivo `manifest.json` único:**
  * `"start_url": "/intranet/boletin-de-oracion/"`
  * `"scope": "/"` (Cubre todas las rutas para eliminar la barra azul de Chrome en navegación interna).
  * `"display": "standalone"`
  * `"display_override": ["standalone", "fullscreen"]`
* **Metadatos obligatorios en `<head>`:**
  ```html
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="manifest" href="/intranet/boletin-de-oracion/manifest.json">
  ```
* **Iconos en alta definición:** 192x192 y 512x512 píxeles en formato PNG/WebP alojados en Bunny CDN o carpeta local de imágenes.

## 💡 12. SUGERENCIAS DE MEJORA Y MODIFICACIONES EN LA ARQUITECTURA

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
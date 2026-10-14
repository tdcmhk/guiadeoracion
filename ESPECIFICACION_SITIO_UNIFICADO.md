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
* **Hero Carousel con Video Adaptativo de Fondo (Bunny Stream):**
  * Videos de ambientación servidos vía CDN con parámetros de iframe: `autoplay=true&loop=true&muted=true&controls=false&preload=true`.
  * Capa protectora `.iframe-overlay` transparente para interceptar gestos táctiles (swipe) y clics sin interferir con el reproductor.
* **Secciones Clave:**
  * Resumen del proyecto misionero y visión en Turquía.
  * Avance público del boletín y llamados a la acción (CTA) destacados: *"Únete a la Intercesión"*, *"Acceso Intranet"*.
  * Sección institucional *"Quiénes Somos"*.
* **Footer Global Unificado:** Logotipos y recursos servidos desde Bunny Storage/Pull Zone, enlaces a redes sociales y notas legales.

#### 2. Sección Pública de Evangelización en Turco (`/tr/` o filtro `TR` en Home)
* **Radio Online 24/7 & TV Streaming:** Reproductor continuo con integración `navigator.mediaSession` para controles en pantalla de bloqueo en móviles.
* **App de Radio (PWA):** Enlace y modal para instalar la radio en el celular de forma independiente.
* **Páginas Secundarias en Turco:**
  * `/hakkimizda.html` (Quiénes somos / Conócenos).
  * `/iletisim.html` (Formulario de contacto pastoral directo).

---

### B. ZONA PRIVADA / INTRANET (Acceso Restringido y Protegido)
Protegida contra motores de búsqueda (`noindex, nofollow`) y con validación en servidor vía Firebase Authentication y Firestore Rules.

#### 1. Puerta de Enlace / Autenticación (`/intranet/index.html`)
* **Acceso Exclusivo Google Auth:** Botón único con soporte para redirección en móviles (`signInWithPopup` + fallback `signInWithRedirect`).
* **Ficha de Registro Inicial:** Formulario obligatorio al primer ingreso (Nombre, Apellido, WhatsApp, País e Iglesia).
* **Notificación Pastoral Automática:** Envío silencioso de la ficha vía API (FormSubmit) al correo del administrador general (`rvicentetapia@gmail.com`).
* **Enrutamiento por Estado de Aprobación:**
  * Si `aprobado == true` ➔ Redirige automáticamente a `/intranet/home.html` o `/intranet/boletin-de-oracion/`.
  * Si `aprobado == false` ➔ Redirige a la Antesala de Espera (`/intranet/espera.html`).

#### 2. Antesala / Sala de Espera Pastoral (`/intranet/espera.html`)
* Muestra estado *"Solicitud en revisión pastoral"* con indicador visual activo.
* Contenido preliminar medianamente sensible: video documental introductorio y panorama misionero.
* Escucha reactiva (`onSnapshot`): al momento en que el administrador aprueba la cuenta en Firebase, la pantalla redirige automáticamente al contenido completo sin recargar.

#### 3. Home de la Intranet (`/intranet/home.html`)
* Dashboard central para intercesores y pastores autorizados.
* Avisos pastorales recientes y noticias del campo misionero.
* Accesos rápidos a los 4 módulos privados:
  1. **Boletín de Intercesión** (`/intranet/boletin-de-oracion/`)
  2. **Diario de Oración** (`/intranet/diario/`)
  3. **Expediciones y Viajes** (`/intranet/expedicion/`)
  4. **Donaciones y Proyectos** (`/intranet/donar/`)
  5. **Perfil de Usuario** (`/intranet/perfil/`)

#### 4. Boletín de Oración Protegido (`/intranet/boletin-de-oracion/index.html`)
* Bóveda de bloques cargados dinámicamente desde Firestore (`boletin_bloques` / `ediciones_boletin`).
* Los textos sensibles no residen en el HTML plano de GitHub.
* Sistema de interacción social por bloque:
  * Botón *"He orado"* con contador sincronizado en tiempo real.
  * Botón *"Guardar en mi diario"* para intercesión constante.
  * Módulo desplegable de comentarios comunitarios en vivo.

#### 5. Diario de Oración Personal (`/intranet/diario/index.html`)
* Panel de 4 pilares interactivos para el usuario:
  * **Motivos Orados:** Registro cronológico de bloques respaldados.
  * **Motivos Guardados:** Peticiones activas extraídas del boletín.
  * **Motivos Contestados:** Libro de testimonios y respuestas de oración.
  * **Motivos Propios:** Peticiones familiares y personales privadas del intercesor.

---

## 🛠️ 3. ARQUITECTURA TÉCNICA Y GESTIÓN DE MEDIOS (BUNNY.NET)

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

## 🔐 4. MOTOR DE SEGURIDAD Y BASE DE DATOS (FIREBASE FIRESTORE)

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

## 🌍 5. MOTOR DE INTERNACIONALIZACIÓN (lang.js)

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

## 📱 6. CONFIGURACIÓN PWA Y EXPERIENCIA MÓVIL FULLSCREEN

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

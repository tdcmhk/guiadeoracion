# 📻 ESPECIFICACIÓN Y DISEÑO PREVIO: HOME ENFOCADO EN RADIO ONLINE ("radioonlined2")

> **Documento de Trabajo y Planificación Previa**  
> **Objetivo:** Definir con total claridad todas las secciones, funcionalidades, contenidos y comportamiento del nuevo **Home (`index.html`)** antes de pasar a la fase de código. Puedes revisar, ajustar, quitar o añadir cualquier detalle aquí mismo.

---

## 🎯 1. VISIÓN Y ENFOQUE DEL HOME
* **Protagonista Principal:** La **Radio Online 24/7**, con una experiencia moderna, inmersiva y dinámica similar al estilo *radioonlined2* (estaciones de radio modernas con streaming en directo, barra de reproducción continua, programación en tiempo real y fonoteca a la carta).
* **Flujo Vertical de la Página:**
  1. **Barra Superior / Navbar:** Logo, indicador "EN VIVO", selector de idioma (`ES`, `TR`, `EN`, `IT`) y botón de contacto.
  2. **Módulo Principal Hero Radio (En el Aire):** Reproductor en vivo de alta visibilidad, visualizador de audio, carátula del programa actual, botón Play/Pause grande, control de volumen y ficha de lo que suena ahora mismo.
  3. **Parrilla / Programación de Hoy ("Guía en Vivo"):** Qué se está transmitiendo en este momento y los programas de las siguientes horas del día (con selector por días o pestañas).
  4. **Biblioteca de Programas Grabados ("Radio a la Carta / Podcasts / Archivo"):** Buscador y tarjetas de episodios grabados para escuchar en cualquier momento (estudios bíblicos, testimonios, alabanzas turcas, devocionales).
  5. **Sección Futura: Noticias y Actualidad del Campo:** Bloque preparado para colocar notas informativas y novedades debajo de la radio cuando lo desees activar.
  6. **Formulario de Contacto:** Espacio privado para dejar datos (sin exponer enlaces públicos a la intranet).
  7. **Pie de Página (Footer):** Enlaces yyinstitucionales, redes sociales, aviso legal y copyright.

---

## 🎧 2. MÓDULO 1: REPRODUCTOR PRINCIPAL EN VIVO ("ON AIR")
Este bloque es la primera vista que recibe al usuario al entrar al sitio.

### Componentes Visuales:
* [x] **Insignia de Estado:** Píldora pulsante `"🔴 EN DIRECTO 24/7"`.
* [x] **Carátula del Programa Actual:** Imagen artística del programa en emisión con efecto de brillo/resplandor.
* [x] **Información del Programa al Aire:**
  * **Título del Programa:** (Ej: *"Alabanzas del Bósforo"*, *"Palabra y Esperanza"* o *"Reflexiones de Fe"*).
  * **Conductor / Pastor / Productor:** Nombre del expositor o locutor.
  * **Horario de Emisión:** Ej. `10:00 - 12:00 (Hora Turquía / UTC+3)`.
  * **Barra de Progreso en Vivo:** Indicador visual de tiempo transcurrido del bloque actual.
* [x] **Controles de Reproducción:**
  * Botón central grande **Play / Pause** con animación de carga de buffer.
  * Control deslizante de **Volumen** con opción de silenciar (Mute).
  * Onda visualizadora de frecuencias (Equalizer animation) que se activa cuando el audio está sonando.
  * Botón para **Compartir transmisión** (WhatsApp, Telegram, Copiar enlace).
  * Botón **"Instalar App Radio" (PWA)** para escuchar con pantalla bloqueada o en segundo plano en móviles.
* [x] **Detalles Técnicos:**
  * Compatibilidad con `navigator.mediaSession` para controles en pantalla de bloqueo en Android / iOS.
  * Reconexión automática si se interrumpe la conexión a internet.
  * Audio stream URL configurable (Icecast, Shoutcast, HLS o servidor de streaming propio).

---

## 📅 3. MÓDULO 2: PROGRAMACIÓN Y PARRILLA ("QUÉ TRANSMITIMOS HOY")
Permite a los oyentes saber con exactitud qué se está emitiendo y qué viene después.

### Características Propuestas:
* [x] **Pestañas de Selección de Día:**
  * Botones rápidos: `[ Hoy ]`, `[ Mañana ]` o selector semanal `[ Lunes | Martes | Miércoles | Jueves | Viernes | Sábado | Domingo ]`.
  * Detección automática del día actual de la semana.
* [x] **Tarjeta de Programa "Al Aire Ahora" (Destacada):**
  * Fondo distintivo (dorado o turquesa con borde resaltado).
  * Etiqueta parpadeante `"TRANSMITIENDO AHORA"`.
* [x] **Lista Cronológica de Programas:**
  Cada tarjeta de programa incluye:
  * **Horario:** Ej. `08:00 - 10:00`.
  * **Categoría:** Ej. `Alabanza`, `Oración`, `Estudio Bíblico`, `Juventud`, `Testimonios`.
  * **Título:** Nombre del segmento.
  * **Descripción breve:** Resumen de 1-2 líneas de lo que trata el programa.
  * **Locutor / Responsable.**
  * **Estado:** `"Finalizado"`, `"En Curso"` o `"Próximo a las XX:XX"`.
* [x] **Ejemplo de Horario Base (Personalizable):**
  * `00:00 - 06:00` | *Noches de Paz y Clamor* (Música instrumental y alabanza continua).
  * `06:00 - 08:00` | *Amanecer con la Palabra* (Lectura devocional de los Evangelios).
  * `08:00 - 10:00` | *Alabanzas en las 7 Iglesias* (Canciones en turco y español).
  * `10:00 - 12:00` | *Estudio de la Carta a las Iglesias de Asia Menor* (Enseñanza expositiva).
  * `12:00 - 14:00` | *Voz de Esperanza* (Testimonios y cartas desde el campo misionero).
  * `14:00 - 17:00` | *Música Cristiana Contemporánea y Adoración*.
  * `17:00 - 19:00` | *Hora de Intercesión por Turquía y Oriente Próximo*.
  * `19:00 - 21:00` | *Mensaje Pastoral y Reflexión Bíblica*.
  * `21:00 - 00:00` | *Vigilia de Alabanza y Adoración Nocturna*.

---

## 📚 4. MÓDULO 3: BIBLIOTECA DE PROGRAMAS GRABADOS ("A LA CARTA / PODCASTS")
Para que los oyentes que se perdieron un programa puedan escucharlo cuando quieran.

### Estructura de la Fonoteca:
* [x] **Buscador y Filtro por Categorías:**
  * Campo de búsqueda por texto (ej. "Apocalipsis", "Testimonio", "Efesios").
  * Filtros tipo etiquetas: `[ Todos ]` `[ Estudios Bíblicos ]` `[ Alabanzas Turcas ]` `[ Testimonios ]` `[ Clamor y Oración ]`.
* [x] **Tarjetas de Episodios / Grabaciones:**
  * Carátula cuadrada con miniatura del programa.
  * Título del episodio y fecha de grabación/emisión original.
  * Duración (ej. `42 min`, `28 min`).
  * Botón directo **▶ Escuchar Episodio** (activa un reproductor secundario o reemplaza la barra sin recargar la web).
  * Botón para **Descargar MP3** o **Compartir por WhatsApp**.
* [x] **Mini-Reproductor Flotante o Integrado:**
  * Al hacer clic en un programa grabado, una barra flotante en la parte inferior de la pantalla permite pausar, adelantar 15s, retroceder 15s y ajustar volumen mientras sigues navegando por la web.

---

## 📰 5. MÓDULO 4: NOTICIAS Y ACTUALIDAD (RESERVADO PARA DESPUÉS)
Tal como indicaste: *"si quiero agregar noticias lo pondré debajo de la radio después"*.

### Diseño Previsto:
* Estructura modular preparada con tarjetas en cuadrícula (Grid de 3 columnas en escritorio, 1 en celular).
* Cada noticia tendrá: Imagen destacada, fecha, categoría (ej: *"Actualidad", "Testimonio", "Avance Misionero"*), título atractivo y breve resumen de 2 líneas.
* **Estado:** Se mantendrá oculto o comentado en el código con un interruptor (`toggle`), listo para activarse en cualquier momento cuando tengas redactadas las primeras noticias.

---

## 📝 6. MÓDULO 5: FORMULARIO DE CONTACTO Y CONÓCENOS
Manteniendo tu instrucción: *"no quiero que haya enlace entre el home y la intranet solo si es que alguien quiere conocernos más puede dejar sus datos y solicitud en el formulario de contacto porque la intranet será solo para un grupo de whatsapp o contactos específicos"*.

### Campos del Formulario:
1. **Nombre y Apellidos.**
2. **Correo Electrónico.**
3. **Número de WhatsApp con prefijo de país.**
4. **Ciudad, País e Iglesia / Congregación.**
5. **Motivo de Contacto / Solicitud:**
   * Deseo conocer más sobre la radio.
   * Consulta pastoral / Petición de oración personal.
   * Información sobre servicio.
6. **Mensaje libre o comentario.**
7. **Botón de Envío:** Notificación por correo / FormSubmit directo al administrador.

---

## 🌐 7. INTERNACIONALIZACIÓN (i18n) INTEGRADA
Todas las etiquetas, textos de la radio, estados y días de la semana estarán traducidos en `assets/js/lang.js` para los 4 idiomas:
* 🇪🇸 **Español (ES)**
* 🇹🇷 **Turco (TR)**
* 🇬🇧 **Inglés (EN)**
* 🇮🇹 **Italiano (IT)**

---

## 📂 8. ORGANIZACIÓN LIMPIA DE ARCHIVOS
Siguiendo las buenas prácticas que conversamos:
```text
├── index.html                   <-- Estructura HTML pura y semántica
├── ESPECIFICACION_HOME_RADIO.md <-- Este documento de trabajo y acuerdos
├── assets/
│   ├── css/
│   │   └── radio-home.css       <-- Estilos, diseño responsive y tema
│   └── js/
│       ├── lang.js              <-- Motor multilingüe
│       ├── radio-player.js      <-- Lógica del reproductor en vivo y a la carta
│       └── radio-schedule.js    <-- Programación diaria y catálogo de grabaciones
```

---

## ✍️ TUS NOTAS Y MODIFICACIONES
*(Puedes indicarme cualquier cambio en estos puntos: nombres de programas reales, enlaces de stream, colores o secciones que quieras modificar antes de escribir el código)*.

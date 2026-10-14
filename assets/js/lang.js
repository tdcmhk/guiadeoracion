/**
 * ============================================================================
 * MOTOR GLOBAL DE INTERNACIONALIZACIÓN (i18n) - lang.js
 * ============================================================================
 * Soporte completo para Español (ES), Turco (TR), Inglés (EN) e Italiano (IT).
 * Permite cambiar los textos del DOM marcados con:
 *   - data-i18n="clave" (para texto interno / innerHTML)
 *   - data-i18n-ph="clave" (para placeholders de inputs)
 *   - data-i18n-title="clave" (para títulos / tooltips)
 */

export const translations = {
  es: {
    // Menú y Navegación
    nav_home: "Inicio",
    nav_about: "Quiénes Somos",
    nav_mission: "Nuestra Visión",
    nav_radio: "Radio 24/7",
    nav_contact: "Contacto y Solicitud",
    btn_contact_nav: "Contáctanos",

    // Hero Carousel
    hero_tag: "Movilización Transcultural",
    hero_title: "Obra de Dios en Turquía",
    hero_subtitle: "Sembrando esperanza, oración y amor en la cuna de la Iglesia",
    btn_hero_contact: "Dejar Solicitud / Conócenos",
    btn_learn_more: "Conoce Más",

    // Tarjetas y Visión
    sec_mission_title: "La Cuna de la Iglesia Primitiva",
    sec_mission_desc: "Turquía alberga las 7 iglesias de Apocalipsis y los viajes de Pablo y Pedro. Hoy levantamos un vallado de oración y testimonio vivo por esta tierra histórica.",
    card_prayer_title: "Red de Intercesión",
    card_prayer_desc: "Motivos de clamor por ciudades históricas, familias y obreros en el campo, respaldados por un círculo reservado de oración.",
    card_expeditions_title: "Expediciones de Servicio",
    card_expeditions_desc: "Orientación para creyentes y pastores con carga misionera interesados en viajes de servicio y respaldo ministerial.",
    card_about_title: "Quiénes Somos",
    card_about_desc: "Equipo cristiano comprometido con la difusión del Evangelio mediante amor fraternal, discipulado y servicio desinteresado.",
    btn_request_info: "Solicitar Información",

    // Sección Radio Online 24/7 (Sin TV)
    radio_badge_live: "EN VIVO 24/7",
    sec_radio_title: "Radio Esperanza Turquía",
    sec_radio_desc: "Transmisión continua de alabanzas de fe, lectura de la Palabra de Dios y mensajes de paz para el pueblo turco y la iglesia global.",
    radio_status_ready: "Lista para reproducir",
    radio_status_playing: "Transmitiendo en vivo — Alabanzas y Esperanza",
    radio_status_paused: "Transmisión pausada",
    btn_listen_live: "▶ Reproducir Radio",
    btn_pause_live: "⏸ Pausar Radio",
    radio_channel_tag: "Canal Oficial de Alabanzas & Fe",

    // Formulario de Contacto y Solicitudes
    contact_badge: "Contacto Exclusivo",
    sec_contact_title: "Conéctate con Nosotros y Déjanos tu Solicitud",
    sec_contact_desc: "El acceso a la red de intercesión y materiales específicos es coordinado de forma directa. Si deseas conocernos más, recibir información pastoral o sumarte a nuestro grupo de WhatsApp, déjanos tus datos a continuación:",
    
    form_name_label: "Nombre Completo",
    form_name_ph: "Ej. Daniel Salazar",
    form_email_label: "Correo Electrónico",
    form_email_ph: "tu-correo@ejemplo.com",
    form_whatsapp_label: "WhatsApp / Teléfono Móvil",
    form_whatsapp_ph: "+1 234 567 8900",
    form_country_label: "País, Ciudad e Iglesia / Comunidad",
    form_country_ph: "Ej. Lima, Perú — Iglesia Central",
    form_reason_label: "¿En qué te gustaría participar o conocer más?",
    form_reason_opt_default: "Selecciona una opción...",
    form_reason_opt_prayer: "Deseo unirme al grupo de WhatsApp / Intercesión",
    form_reason_opt_info: "Quiero conocer más sobre la obra en Turquía",
    form_reason_opt_pastoral: "Consulta pastoral o petición personal",
    form_reason_opt_expedition: "Interés en expedición misionera y servicio",
    form_message_label: "Mensaje o Solicitud Detallada",
    form_message_ph: "Cuéntanos sobre tu interés, cómo supiste de nosotros o tu motivo de oración...",
    btn_submit_form: "Enviar mi Solicitud",
    btn_submitting_form: "Enviando...",
    form_direct_wa: "O comunícate directamente por WhatsApp",
    form_success_alert: "¡Muchas gracias! Tu solicitud ha sido registrada correctamente. Nuestro equipo pastoral se pondrá en contacto contigo a la brevedad vía WhatsApp o correo electrónico.",
    form_privacy_note: "🔒 Tus datos son confidenciales y serán tratados con estricta reserva pastoral.",

    // Pie de Página
    footer_desc: "Plataforma de difusión misionera y edificación cristiana en Turquía.",
    footer_rights: "Todos los derechos reservados.",
    footer_privacy: "Uso exclusivo para la edificación y movilización cristiana."
  },

  tr: {
    // Menü ve Gezinme
    nav_home: "Ana Sayfa",
    nav_about: "Hakkımızda",
    nav_mission: "Vizyonumuz",
    nav_radio: "Canlı Radyo 7/24",
    nav_contact: "İletişim ve Talep",
    btn_contact_nav: "Bize Ulaşın",

    // Hero Carousel
    hero_tag: "Umut ve Kardeşlik",
    hero_title: "Türkiye'de Sevgi ve Umut",
    hero_subtitle: "Tarihin beşiğinde sevgi, esenlik ve kardeşlik tohumları ekiyoruz",
    btn_hero_contact: "Bize Yazın / Bilgi Alın",
    btn_learn_more: "Daha Fazla Bilgi",

    // Tarjetas y Visión
    sec_mission_title: "Anadolu'nun Tarihi ve Manevi Mirası",
    sec_mission_desc: "Bu kadim topraklar sevgi, barış ve kardeşlik mirasıyla doludur. Esenlik, dua ve umutla hizmet ediyoruz.",
    card_prayer_title: "Dua Ağı",
    card_prayer_desc: "Tarihi şehirler, aileler ve hizmetkarlar için esenlik ve bereket dilekleri.",
    card_expeditions_title: "Hizmet ve Ziyaretler",
    card_expeditions_desc: "Kardeşlik ziyaretleri ve kültürel destek projeleri hakkında bilgilendirme.",
    card_about_title: "Hakkımızda",
    card_about_desc: "Karşılıksız sevgi, kardeşlik ve manevi değerleri paylaşmaya adanmış bir topluluk.",
    btn_request_info: "Bilgi İsteyin",

    // Sección Radio Online 24/7 (Sin TV)
    radio_badge_live: "CANLI YAYIN 7/24",
    sec_radio_title: "Umut Radyosu Türkiye",
    sec_radio_desc: "Günün her saati huzur veren ezgiler, Kutsal Yazılar ve umut dolu mesajlarla kesintisiz canlı yayın.",
    radio_status_ready: "Dinlemeye hazır",
    radio_status_playing: "Canlı yayınlanıyor — Ezgiler ve Umut",
    radio_status_paused: "Yayın duraklatıldı",
    btn_listen_live: "▶ Canlı Dinle",
    btn_pause_live: "⏸ Duraklat",
    radio_channel_tag: "Huzur & Ezgi Kanalı",

    // Formulario de Contacto y Solicitudes
    contact_badge: "Bize Ulaşın",
    sec_contact_title: "Bizi Daha Yakından Tanıyın ve Talebinizi İletin",
    sec_contact_desc: "Çalışmalarımız hakkında daha fazla bilgi edinmek, WhatsApp grubumuza dahil olmak veya bizimle tanışmak isterseniz lütfen aşağıdaki formu doldurunuz:",

    form_name_label: "Ad ve Soyad",
    form_name_ph: "Örn. Ahmet Yılmaz",
    form_email_label: "E-posta Adresi",
    form_email_ph: "eposta@ornek.com",
    form_whatsapp_label: "Telefon / WhatsApp",
    form_whatsapp_ph: "+90 500 000 0000",
    form_country_label: "Ülke, Şehir ve Topluluk",
    form_country_ph: "Örn. İstanbul, Türkiye",
    form_reason_label: "Talebinizin Konusu",
    form_reason_opt_default: "Bir seçenek seçiniz...",
    form_reason_opt_prayer: "WhatsApp / Dua grubuna dahil olmak istiyorum",
    form_reason_opt_info: "Projeleriniz hakkında bilgi almak istiyorum",
    form_reason_opt_pastoral: "Ruhani / Pastoral danışmanlık veya sohbet",
    form_reason_opt_expedition: "Ziyaret veya hizmet faaliyetlerine katılım",
    form_message_label: "Mesajınız veya Talebiniz",
    form_message_ph: "Düşüncelerinizi veya talebinizi bize yazın...",
    btn_submit_form: "Talebimi Gönder",
    btn_submitting_form: "Gönderiliyor...",
    form_direct_wa: "Veya doğrudan WhatsApp ile yazın",
    form_success_alert: "Çok teşekkür ederiz! Talebiniz başarıyla kaydedildi. Ekibimiz en kısa sürede WhatsApp veya e-posta yoluyla sizinle iletişime geçecektir.",
    form_privacy_note: "🔒 Bilgileriniz gizlidir ve üçüncü şahıslarla paylaşılmaz.",

    // Pie de Página
    footer_desc: "Türkiye'de kardeşlik, barış ve manevi değerleri güçlendirme platformu.",
    footer_rights: "Tüm hakları saklıdır.",
    footer_privacy: "Esenlik ve kardeşlik amacıyla hazırlanmıştır."
  },

  en: {
    // Menu and Navigation
    nav_home: "Home",
    nav_about: "About Us",
    nav_mission: "Our Vision",
    nav_radio: "24/7 Radio",
    nav_contact: "Contact & Requests",
    btn_contact_nav: "Contact Us",

    // Hero Carousel
    hero_tag: "Cross-Cultural Mobilization",
    hero_title: "God's Work in Turkey",
    hero_subtitle: "Sowing hope, prayer, and love in the cradle of the Early Church",
    btn_hero_contact: "Submit Request / Connect",
    btn_learn_more: "Learn More",

    // Tarjetas y Visión
    sec_mission_title: "Cradle of the Early Church",
    sec_mission_desc: "Turkey holds the biblical heritage of the 7 churches of Revelation and the journeys of Paul and Peter. Today we stand in prayer and active love for this historic land.",
    card_prayer_title: "Intercession Network",
    card_prayer_desc: "Prayer burdens for historical cities, local families, and workers in the field, supported by a dedicated prayer circle.",
    card_expeditions_title: "Service Expeditions",
    card_expeditions_desc: "Orientation for believers and pastors interested in ministry journeys and on-the-ground support.",
    card_about_title: "About Us",
    card_about_desc: "A Christian team committed to sharing the Good News through brotherly love, discipleship, and selfless service.",
    btn_request_info: "Request Info",

    // Sección Radio Online 24/7 (Sin TV)
    radio_badge_live: "LIVE 24/7",
    sec_radio_title: "Hope Radio Turkey",
    sec_radio_desc: "Continuous streaming of worship songs, scripture readings, and messages of peace for Turkey and the global church.",
    radio_status_ready: "Ready to stream",
    radio_status_playing: "Streaming Live — Worship & Hope",
    radio_status_paused: "Stream paused",
    btn_listen_live: "▶ Play Radio",
    btn_pause_live: "⏸ Pause Radio",
    radio_channel_tag: "Official Worship & Faith Channel",

    // Formulario de Contacto y Solicitudes
    contact_badge: "Direct Contact",
    sec_contact_title: "Connect with Us & Submit Your Request",
    sec_contact_desc: "Access to the intercession network and private updates is coordinated directly. If you want to get to know us better, receive pastoral orientation, or join our WhatsApp group, please leave your details below:",

    form_name_label: "Full Name",
    form_name_ph: "e.g. John Doe",
    form_email_label: "Email Address",
    form_email_ph: "your-email@example.com",
    form_whatsapp_label: "WhatsApp / Mobile Phone",
    form_whatsapp_ph: "+1 234 567 8900",
    form_country_label: "Country, City & Church / Community",
    form_country_ph: "e.g. Miami, USA — Grace Church",
    form_reason_label: "What would you like to connect regarding?",
    form_reason_opt_default: "Select an option...",
    form_reason_opt_prayer: "I want to join the WhatsApp / Prayer Group",
    form_reason_opt_info: "I'd like to learn more about the missionary work in Turkey",
    form_reason_opt_pastoral: "Pastoral inquiry or personal request",
    form_reason_opt_expedition: "Interest in service expeditions and trips",
    form_message_label: "Message or Detailed Request",
    form_message_ph: "Tell us about your heart, how you found us, or your prayer request...",
    btn_submit_form: "Submit My Request",
    btn_submitting_form: "Submitting...",
    form_direct_wa: "Or reach out directly via WhatsApp",
    form_success_alert: "Thank you! Your request has been recorded. Our pastoral team will reach out to you shortly via WhatsApp or email.",
    form_privacy_note: "🔒 Your information is confidential and will be treated with strict pastoral care.",

    // Footer
    footer_desc: "Platform for missionary mobilization and Christian edification in Turkey.",
    footer_rights: "All rights reserved.",
    footer_privacy: "Exclusively for church mobilization and edification purposes."
  },

  it: {
    // Menu e Navigazione
    nav_home: "Inizio",
    nav_about: "Chi Siamo",
    nav_mission: "Nostra Visione",
    nav_radio: "Radio 24/7",
    nav_contact: "Contatto e Richiesta",
    btn_contact_nav: "Contattaci",

    // Hero Carousel
    hero_tag: "Mobilitazione Transculturale",
    hero_title: "L'Opera di Dio in Turchia",
    hero_subtitle: "Seminando speranza, preghiera e amore nella culla della Chiesa",
    btn_hero_contact: "Invia Richiesta / Conoscici",
    btn_learn_more: "Scopri di Più",

    // Tarjetas y Visión
    sec_mission_title: "La Culla della Chiesa Primitiva",
    sec_mission_desc: "La Turchia custodisce l'eredità biblica delle 7 chiese dell'Apocalisse e i viaggi di Paolo e Pietro. Ci uniamo in preghiera e amore per questa terra.",
    card_prayer_title: "Rete di Intercessione",
    card_prayer_desc: "Motivi di preghiera per città storiche, famiglie e operai sul campo, supportati da un cerchio riservato di preghiera.",
    card_expeditions_title: "Spedizioni di Servizio",
    card_expeditions_desc: "Orientamento per credenti e pastori interessati a viaggi di servizio e supporto missionario.",
    card_about_title: "Chi Siamo",
    card_about_desc: "Una squadra cristiana impegnata nella diffusione del Vangelo attraverso amore fraterno e discepolato.",
    btn_request_info: "Richiedi Info",

    // Sección Radio Online 24/7 (Sin TV)
    radio_badge_live: "IN DIRETTA 24/7",
    sec_radio_title: "Radio Speranza Turchia",
    sec_radio_desc: "Trasmissione continua di lodi, letture bibliche e messaggi di pace per il popolo turco e la chiesa nel mondo.",
    radio_status_ready: "Pronto per l'ascolto",
    radio_status_playing: "Trasmissione in diretta — Lodi e Speranza",
    radio_status_paused: "Trasmissione in pausa",
    btn_listen_live: "▶ Ascolta dal Vivo",
    btn_pause_live: "⏸ Metti in Pausa",
    radio_channel_tag: "Canale Ufficiale di Lode e Fede",

    // Formulario de Contacto y Solicitudes
    contact_badge: "Contatto Diretto",
    sec_contact_title: "Connettiti con Noi e Invia la Tua Richiesta",
    sec_contact_desc: "L'accesso alla rete di intercessione è gestito direttamente. Se desideri conoscerci meglio o unirti al gruppo WhatsApp, lasciaci i tuoi dati qui sotto:",

    form_name_label: "Nome e Cognome",
    form_name_ph: "Es. Marco Rossi",
    form_email_label: "Indirizzo Email",
    form_email_ph: "tua-email@esempio.com",
    form_whatsapp_label: "WhatsApp / Cellulare",
    form_whatsapp_ph: "+39 300 000 0000",
    form_country_label: "Paese, Città e Chiesa / Comunità",
    form_country_ph: "Es. Roma, Italia — Chiesa Evangelica",
    form_reason_label: "Oggetto della Richiesta",
    form_reason_opt_default: "Seleziona un'opzione...",
    form_reason_opt_prayer: "Desidero unirmi al gruppo WhatsApp / Preghiera",
    form_reason_opt_info: "Voglio saperne di più sul lavoro in Turchia",
    form_reason_opt_pastoral: "Consulenza pastorale o richiesta personale",
    form_reason_opt_expedition: "Interesse per spedizioni e servizio",
    form_message_label: "Messaggio o Richiesta Dettagliata",
    form_message_ph: "Raccontaci del tuo interesse o motivo di preghiera...",
    btn_submit_form: "Invia Richiesta",
    btn_submitting_form: "Invio in corso...",
    form_direct_wa: "Oppure scrivici direttamente su WhatsApp",
    form_success_alert: "Grazie mille! La tua richiesta è stata registrata con successo. Il nostro team ti contatterà presto via WhatsApp o email.",
    form_privacy_note: "🔒 I tuoi dati sono riservati e trattati con cura pastorale.",

    // Footer
    footer_desc: "Piattaforma di mobilitazione missionaria e crescita spirituale in Turchia.",
    footer_rights: "Tutti i diritti riservati.",
    footer_privacy: "Destinato esclusivamente alla mobilitazione e alla fede cristiana."
  }
};

/**
 * Idiomas soportados
 */
export const SUPPORTED_LANGS = ['es', 'tr', 'en', 'it'];
export const DEFAULT_LANG = 'es';

/**
 * Detectar el mejor idioma para el usuario:
 * 1. Preferencia previa guardada en localStorage
 * 2. Idioma del navegador o teléfono
 * 3. Idioma por defecto (Español)
 */
export function detectarIdioma() {
  const guardado = localStorage.getItem('user_lang');
  if (guardado && SUPPORTED_LANGS.includes(guardado)) {
    return guardado;
  }

  const navLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(navLang)) {
    return navLang;
  }

  return DEFAULT_LANG;
}

/**
 * Aplicar un idioma a la página actual
 * @param {string} langCode - 'es', 'tr', 'en', 'it'
 */
export function aplicarIdioma(langCode) {
  const lang = SUPPORTED_LANGS.includes(langCode) ? langCode : DEFAULT_LANG;
  const dict = translations[lang] || translations[DEFAULT_LANG];

  // 1. Guardar preferencia
  localStorage.setItem('user_lang', lang);
  document.documentElement.lang = lang;

  // 2. Reemplazar textos (data-i18n)
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // 3. Reemplazar placeholders (data-i18n-ph)
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key] !== undefined) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // 4. Reemplazar títulos / tooltips (data-i18n-title)
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) {
      el.setAttribute('title', dict[key]);
    }
  });

  // 5. Actualizar estado visual de los botones del selector en la barra superior
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Disparar evento personalizado por si algún componente necesita reaccionar
  window.dispatchEvent(new CustomEvent('idiomaCambiado', { detail: { lang, dict } }));
}

/**
 * Inicializador automático al cargar la página
 */
document.addEventListener('DOMContentLoaded', () => {
  const idiomaInicial = detectarIdioma();
  aplicarIdioma(idiomaInicial);

  // Conectar clics a cualquier botón selector con clase .lang-btn
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nuevoIdioma = btn.dataset.lang;
      if (nuevoIdioma) {
        aplicarIdioma(nuevoIdioma);
      }
    });
  });
});

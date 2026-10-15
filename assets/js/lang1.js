/**
 * ============================================================================
 * MOTOR GLOBAL DE INTERNACIONALIZACIÓN (i18n) - lang.js
 * MMM TURQUÍA — RADIO ESPERANZA 24/7 & FONOTECA
 * ============================================================================
 * Soporte completo y sincronizado para:
 *   - 🇪🇸 Español (es)
 *   - 🇹🇷 Turco (tr)
 *   - 🇬🇧 Inglés (en)
 *   - 🇮🇹 Italiano (it)
 *
 * Mecanismo de traducción:
 *   - data-i18n="clave" (textContent o innerHTML)
 *   - data-i18n-ph="clave" (placeholder de inputs)
 *   - data-i18n-title="clave" (atributo title / tooltips)
 *   - Evento 'idiomaCambiado' emitido al cambiar idioma
 *   - Sincronización con radio-schedule.js y radio-player.js
 */

export const translations = {
  es: {
    // Navbar & Identidad
    radio_brand_sub: "Radio Esperanza 24/7",
    radio_badge_live: "EN VIVO 24/7",
    nav_radio: "Radio 24/7",
    nav_schedule: "Programación",
    nav_podcasts: "A la Carta",
    nav_contact: "Contacto",
    btn_nav_contact: "Conócenos",

    // Consola Principal / Hero Radio
    radio_live_status_header: "🔴 TRANSMISIÓN EN DIRECTO 24/7",
    listeners_label: "Oyentes conectados:",
    station_main_chip: "ESTACIÓN PRINCIPAL",
    audio_stream_spec: "128 Kbps • Estéreo",
    host_label: "Conduce:",
    btn_listen_live: "Escuchar en Vivo",
    btn_pause_live: "Pausar Transmisión",
    btn_share: "Compartir",
    btn_share_tip: "Compartir radio en redes",
    btn_install_app: "Instalar App",
    btn_install_app_tip: "Instalar aplicación en dispositivo",
    radio_status_ready: "Haz clic en \"Escuchar en Vivo\" para iniciar la transmisión.",
    radio_status_playing: "Transmitiendo en directo — Alabanzas y Esperanza desde Turquía",
    radio_status_paused: "Transmisión pausada.",
    radio_status_buffering: "Conectando con la señal en directo...",
    radio_status_error: "Reconectando con el servidor de streaming...",

    // Barra de Próximo Programa (Teaser)
    next_show_label: "A CONTINUACIÓN (12:00):",
    teaser_host_default: "con Pr. David Ortiz",
    view_full_schedule: "Ver Programación Completa",

    // Sección de Programación Semanal
    schedule_badge: "GUÍA AL AIRE",
    schedule_title: "Programación de la Radio",
    schedule_desc: "Conoce los horarios de nuestros programas de estudio, adoración, intercesión y mensajes diarios transmitidos desde Turquía para las naciones.",
    day_today: "Hoy",
    day_tomorrow: "Mañana",
    day_monday: "Lunes",
    day_tuesday: "Martes",
    day_wednesday: "Miércoles",
    day_thursday: "Jueves",
    day_friday: "Viernes",
    day_saturday: "Sábado",
    day_sunday: "Domingo",

    // Filtros de Categorías
    filter_all: "Todos",
    filter_worship: "Alabanza y Adoración",
    filter_bible: "Estudio Bíblico",
    filter_prayer: "Oración e Intercesión",
    filter_mission: "Testimonios Misioneros",

    // Estados de Tarjetas de Programación
    status_live: "AL AIRE AHORA",
    status_live_pulse: "🔴 EN TRANSMISIÓN",
    status_ended: "Finalizado",
    status_next: "Próximo",
    status_scheduled: "Programado",
    btn_listen_card: "Sintonizar",
    btn_remind_card: "Recordarme",
    schedule_empty_category: "No hay programas en esta categoría para el día seleccionado.",

    // Fonoteca / A la Carta
    podcast_badge: "FONOTECA A LA CARTA",
    podcast_title: "Biblioteca de Programas Grabados",
    podcast_desc: "Escucha en cualquier momento los estudios bíblicos, testimonios del campo y mensajes que ya han sido emitidos en nuestra radio.",
    podcast_search_ph: "Buscar por tema, pastor o palabra clave (ej. Efesios, Testimonio)...",
    filter_cat_estudio: "Estudios Bíblicos",
    filter_cat_testimonio: "Testimonios",
    filter_cat_adoracion: "Alabanzas Turcas",
    filter_cat_devocional: "Devocionales",
    podcast_empty_results: "No se encontraron grabaciones con los términos seleccionados.",

    // Reproductor Flotante Mini-Player
    mini_playing_label: "REPRODUCIENDO GRABACIÓN",
    mini_rewind_tip: "Retroceder 15 segundos",
    mini_forward_tip: "Adelantar 15 segundos",
    mini_close_tip: "Cerrar reproductor a la carta",

    // Sección Noticias y Actualidad (Reservada)
    news_badge: "ACTUALIDAD DEL CAMPO",
    news_title: "Noticias y Crónicas de la Obra",
    news_desc: "Próximamente: Informes misioneros, testimonios y novedades sobre los viajes de bendición en Turquía.",

    // Sección Contacto y Solicitudes
    contact_badge: "CONTACTO EXCLUSIVO",
    contact_title: "Conéctate con Nosotros y Déjanos tu Solicitud",
    contact_desc: "El acceso a nuestros grupos de intercesión de WhatsApp y materiales específicos es reservado y coordinado de forma directa.",
    contact_desc_2: "Si deseas conocernos más, recibir información pastoral, solicitar oración o sumarte a la red de intercesión por Turquía, completa tus datos:",
    contact_hl1_title: "Grupo de Oración en WhatsApp",
    contact_hl1_desc: "Coordinación pastoral y motivos diarios de clamor.",
    contact_hl2_title: "Privacidad y Respaldo",
    contact_hl2_desc: "Tus datos son tratados con estricta confidencialidad pastoral.",
    contact_hl3_title: "Peticiones para la Radio",
    contact_hl3_desc: "Menciona si deseas que oremos en vivo por tu familia o ciudad.",

    // Formulario de Contacto
    form_name_label: "Nombre y Apellidos *",
    form_name_ph: "Ej. Daniel Salazar",
    form_email_label: "Correo Electrónico *",
    form_email_ph: "tu-correo@ejemplo.com",
    form_whatsapp_label: "WhatsApp con prefijo de país *",
    form_whatsapp_ph: "+34 600 000 000 / +90 555 000 0000",
    form_country_label: "País y Ciudad *",
    form_country_ph: "Ej. Madrid, España / Lima, Perú",
    form_church_label: "Iglesia / Congregación",
    form_church_ph: "Ej. MMM Central",
    form_reason_label: "¿Cómo te gustaría involucrarte? *",
    form_reason_default: "Selecciona una opción...",
    form_reason_opt1: "Deseo unirme al grupo de WhatsApp y Red de Intercesión",
    form_reason_opt2: "Deseo conocer más sobre la obra en Turquía",
    form_reason_opt3: "Petición de oración personal para la Radio",
    form_reason_opt4: "Interés en apoyo o expediciones de servicio misionero",
    form_message_label: "Mensaje, testimonio o petición de oración",
    form_message_ph: "Escribe tu mensaje o motivo de clamor aquí...",
    btn_submit_contact: "Enviar Solicitud al Equipo Pastoral",
    form_success_alert: "¡Gracias por contactarnos! Tu solicitud ha sido registrada y nos pondremos en contacto contigo por WhatsApp o correo.",
    form_toast_link_copied: "¡Enlace de la radio copiado al portapapeles!",
    form_toast_pwa_install: "Para instalar la App: abre el menú de tu navegador y pulsa 'Añadir a pantalla de inicio'.",

    // Pie de Página (Footer)
    footer_tagline: "Radio Esperanza 24/7 & Testimonio en la Cuna de la Iglesia Histórica.",
    footer_nav_title: "Navegación",
    footer_connect_title: "Conectar",
    footer_connect_desc: "Sintoniza nuestras transmisiones y acompáñanos en oración continua.",
    footer_rights: "© 2026 MMM Turquía — Todos los derechos reservados. Radio y Misión.",
    footer_verse: "«El que tiene oído, oiga lo que el Espíritu dice a las iglesias» — Apocalipsis 2:7"
  },

  tr: {
    // Navbar & Identidad
    radio_brand_sub: "Umut Radyosu 7/24",
    radio_badge_live: "CANLI YAYIN 7/24",
    nav_radio: "Canlı Radyo 7/24",
    nav_schedule: "Program Akışı",
    nav_podcasts: "İsteğe Bağlı",
    nav_contact: "İletişim",
    btn_nav_contact: "Bize Ulaşın",

    // Consola Principal / Hero Radio
    radio_live_status_header: "🔴 KESİNTİSİZ CANLI YAYIN 7/24",
    listeners_label: "Bağlı dinleyiciler:",
    station_main_chip: "ANA RADYO İSTASYONU",
    audio_stream_spec: "128 Kbps • Stereo HD",
    host_label: "Sunucu:",
    btn_listen_live: "Canlı Dinle",
    btn_pause_live: "Yayını Duraklat",
    btn_share: "Paylaş",
    btn_share_tip: "Radyoyu sosyal medyada paylaş",
    btn_install_app: "Uygulamayı Yükle",
    btn_install_app_tip: "Radyo uygulamasını cihaza ekle",
    radio_status_ready: "Canlı yayını başlatmak için \"Canlı Dinle\" butonuna tıklayın.",
    radio_status_playing: "Canlı yayınlanıyor — Türkiye'den İlahiler ve Umut Mesajları",
    radio_status_paused: "Yayın duraklatıldı.",
    radio_status_buffering: "Canlı yayın akışına bağlanılıyor...",
    radio_status_error: "Yayın sunucusuna yeniden bağlanılıyor...",

    // Barra de Próximo Programa (Teaser)
    next_show_label: "SIRADAKİ PROGRAM (12:00):",
    teaser_host_default: "Önder David Ortiz ile",
    view_full_schedule: "Tüm Program Akışını Gör",

    // Sección de Programación Semanal
    schedule_badge: "YAYIN REHBERİ",
    schedule_title: "Radyo Program Akışı",
    schedule_desc: "Türkiye'den tüm uluslara kesintisiz yayınlanan Kutsal Kitap dersleri, tapınma ezgileri, şefaat duaları ve bereketli mesajların saatleri.",
    day_today: "Bugün",
    day_tomorrow: "Yarın",
    day_monday: "Pazartesi",
    day_tuesday: "Salı",
    day_wednesday: "Çarşamba",
    day_thursday: "Perşembe",
    day_friday: "Cuma",
    day_saturday: "Cumartesi",
    day_sunday: "Pazar",

    // Filtros de Categorías
    filter_all: "Tümü",
    filter_worship: "Övgü ve Tapınma",
    filter_bible: "Kutsal Kitap Çalışması",
    filter_prayer: "Dua ve Şefaat",
    filter_mission: "Müjde Tanıklıkları",

    // Estados de Tarjetas de Programación
    status_live: "ŞU ANDA YAYINDA",
    status_live_pulse: "🔴 CANLI AKTİF",
    status_ended: "Bitti",
    status_next: "Sıradaki",
    status_scheduled: "Programlandı",
    btn_listen_card: "Dinle",
    btn_remind_card: "Hatırlat",
    schedule_empty_category: "Seçilen gün için bu kategoride program bulunmamaktadır.",

    // Fonoteca / A la Carta
    podcast_badge: "İSTEĞE BAĞLI FONOTEK",
    podcast_title: "Kayıtlı Programlar Kütüphanesi",
    podcast_desc: "Radyomuzda yayınlanan Kutsal Kitap çalışmaları, tanıklıklar ve manevi mesajları dilediğiniz zaman dinleyin.",
    podcast_search_ph: "Konu, vaiz veya anahtar kelime ile arayın (örn. Efesliler, Tanıklık)...",
    filter_cat_estudio: "Kutsal Kitap Çalışmaları",
    filter_cat_testimonio: "Tanıklıklar",
    filter_cat_adoracion: "Türkçe İlahiler",
    filter_cat_devocional: "Günlük Dualar",
    podcast_empty_results: "Seçilen arama terimleriyle eşleşen kayıt bulunamadı.",

    // Reproductor Flotante Mini-Player
    mini_playing_label: "KAYIT OYNATILIYOR",
    mini_rewind_tip: "15 saniye geri sar",
    mini_forward_tip: "15 saniye ileri sar",
    mini_close_tip: "İsteğe bağlı oynatıcıyı kapat",

    // Sección Noticias y Actualidad (Reservada)
    news_badge: "HİZMET SAHASINDAN HABERLER",
    news_title: "Hizmet Notları ve Gelişmeler",
    news_desc: "Çok yakında: Türkiye'deki ziyaretler, tanıklıklar ve bereketli gelişmeler hakkında özel raporlar.",

    // Sección Contacto y Solicitudes
    contact_badge: "ÖZEL İLETİŞİM",
    contact_title: "Bizimle İletişime Geçin ve Talebinizi İletin",
    contact_desc: "Dua gruplarımız ve paylaşılan özel materyallere erişim doğrudan ve özenle koordine edilmektedir.",
    contact_desc_2: "Çalışmalarımız hakkında daha fazla bilgi edinmek, dua talebinde bulunmak veya WhatsApp dua ağımıza katılmak isterseniz lütfen formu doldurunuz:",
    contact_hl1_title: "WhatsApp Dua Grubu",
    contact_hl1_desc: "Ruhani rehberlik ve günlük düzenli dua konuları.",
    contact_hl2_title: "Gizlilik ve Güven",
    contact_hl2_desc: "Bilgileriniz kesinlikle gizli tutulur ve üçüncü şahıslarla paylaşılmaz.",
    contact_hl3_title: "Radyo İçin Dua Talepleri",
    contact_hl3_desc: "Aileniz veya şehriniz için canlı yayında dua etmemizi isterseniz belirtiniz.",

    // Formulario de Contacto
    form_name_label: "Ad ve Soyad *",
    form_name_ph: "Örn. Ahmet Yılmaz",
    form_email_label: "E-posta Adresi *",
    form_email_ph: "eposta@ornek.com",
    form_whatsapp_label: "Telefon / WhatsApp (ülke kodu ile) *",
    form_whatsapp_ph: "+90 555 000 0000 / +34 600 000 000",
    form_country_label: "Ülke ve Şehir *",
    form_country_ph: "Örn. İstanbul, Türkiye / Madrid, İspanya",
    form_church_label: "Kilise / Topluluk",
    form_church_ph: "Örn. MMM Merkez",
    form_reason_label: "Nasıl dahil olmak istersiniz? *",
    form_reason_default: "Bir seçenek seçiniz...",
    form_reason_opt1: "WhatsApp Dua ve Şefaat Grubuna dahil olmak istiyorum",
    form_reason_opt2: "Türkiye'deki hizmet çalışmaları hakkında bilgi almak istiyorum",
    form_reason_opt3: "Radyo yayını için kişisel dua talebim var",
    form_reason_opt4: "Hizmet ziyaretleri ve gönüllü projelere katılım ilgisi",
    form_message_label: "Mesajınız, tanıklığınız veya dua isteğiniz",
    form_message_ph: "Düşüncelerinizi, talebinizi veya dua konunuzu buraya yazın...",
    btn_submit_contact: "Talebi Pastoral Ekibe Gönder",
    form_success_alert: "Bize ulaştığınız için teşekkür ederiz! Talebiniz kaydedildi; ekibimiz sizinle WhatsApp veya e-posta yoluyla iletişime geçecektir.",
    form_toast_link_copied: "Radyo bağlantısı panoya kopyalandı!",
    form_toast_pwa_install: "Uygulamayı yüklemek için: Tarayıcı menüsünü açın ve 'Ana ekrana ekle' seçeneğine dokunun.",

    // Pie de Página (Footer)
    footer_tagline: "Umut Radyosu 7/24 & Tarihi Kiliselerin Beşiğinde Canlı Tanıklık.",
    footer_nav_title: "Gezinme",
    footer_connect_title: "Bağlantıda Kalın",
    footer_connect_desc: "Yayınlarımızı dinleyin ve dualarınızla bizimle birlikte olun.",
    footer_rights: "© 2026 MMM Türkiye — Tüm hakları saklıdır. Radyo ve Hizmet.",
    footer_verse: "«Kulağı olan, Ruh'un kiliselere ne dediğini işitsin» — Vahiy 2:7"
  },

  en: {
    // Navbar & Identity
    radio_brand_sub: "Hope Radio 24/7",
    radio_badge_live: "LIVE 24/7",
    nav_radio: "24/7 Radio",
    nav_schedule: "Schedule",
    nav_podcasts: "On Demand",
    nav_contact: "Contact",
    btn_nav_contact: "Connect",

    // Main Console / Hero Radio
    radio_live_status_header: "🔴 LIVE BROADCAST 24/7",
    listeners_label: "Connected listeners:",
    station_main_chip: "MAIN STATION",
    audio_stream_spec: "128 Kbps • Stereo HD",
    host_label: "Host:",
    btn_listen_live: "Listen Live",
    btn_pause_live: "Pause Broadcast",
    btn_share: "Share",
    btn_share_tip: "Share live radio on social media",
    btn_install_app: "Install App",
    btn_install_app_tip: "Install radio web app",
    radio_status_ready: "Click \"Listen Live\" to start streaming.",
    radio_status_playing: "Streaming Live — Praise and Hope from Turkey",
    radio_status_paused: "Broadcast paused.",
    radio_status_buffering: "Connecting to live audio stream...",
    radio_status_error: "Reconnecting to live broadcast server...",

    // Upcoming Teaser Bar
    next_show_label: "UPCOMING NEXT (12:00):",
    teaser_host_default: "with Pr. David Ortiz",
    view_full_schedule: "View Full Schedule",

    // Weekly Schedule Section
    schedule_badge: "ON-AIR GUIDE",
    schedule_title: "Radio Program Schedule",
    schedule_desc: "Discover the schedule of our daily Bible teaching, worship, intercession, and uplifting messages broadcast from Turkey to the nations.",
    day_today: "Today",
    day_tomorrow: "Tomorrow",
    day_monday: "Monday",
    day_tuesday: "Tuesday",
    day_wednesday: "Wednesday",
    day_thursday: "Thursday",
    day_friday: "Friday",
    day_saturday: "Saturday",
    day_sunday: "Sunday",

    // Category Filters
    filter_all: "All",
    filter_worship: "Praise & Worship",
    filter_bible: "Bible Study",
    filter_prayer: "Prayer & Intercession",
    filter_mission: "Missionary Testimonies",

    // Schedule Card Statuses
    status_live: "ON AIR NOW",
    status_live_pulse: "🔴 TRANSMITTING",
    status_ended: "Finished",
    status_next: "Upcoming",
    status_scheduled: "Scheduled",
    btn_listen_card: "Tune In",
    btn_remind_card: "Remind Me",
    schedule_empty_category: "No programs found in this category for the selected day.",

    // Fonoteca / On-Demand
    podcast_badge: "ON-DEMAND LIBRARY",
    podcast_title: "Recorded Programs Library",
    podcast_desc: "Listen anytime to Bible studies, field testimonies, and messages previously broadcast on our radio station.",
    podcast_search_ph: "Search by topic, speaker, or keyword (e.g. Ephesians, Testimony)...",
    filter_cat_estudio: "Bible Studies",
    filter_cat_testimonio: "Testimonies",
    filter_cat_adoracion: "Turkish Worship",
    filter_cat_devocional: "Devotionals",
    podcast_empty_results: "No recorded programs match the search terms.",

    // Sticky Mini-Player
    mini_playing_label: "PLAYING RECORDING",
    mini_rewind_tip: "Rewind 15 seconds",
    mini_forward_tip: "Forward 15 seconds",
    mini_close_tip: "Close on-demand player",

    // Reserved News Section
    news_badge: "FIELD UPDATES",
    news_title: "Ministry News & Chronicles",
    news_desc: "Coming soon: Mission reports, testimonies, and updates regarding ministry journeys in Turkey.",

    // Contact & Requests Section
    contact_badge: "DIRECT CONTACT",
    contact_title: "Connect with Us & Submit Your Request",
    contact_desc: "Access to our WhatsApp intercession groups and dedicated materials is coordinated directly with pastoral care.",
    contact_desc_2: "If you want to know more about our ministry, request personal prayer, or join the prayer circle for Turkey, please leave your details below:",
    contact_hl1_title: "WhatsApp Prayer Circle",
    contact_hl1_desc: "Pastoral coordination and daily intercession topics.",
    contact_hl2_title: "Privacy & Care",
    contact_hl2_desc: "Your information is strictly protected under pastoral confidence.",
    contact_hl3_title: "On-Air Radio Prayer",
    contact_hl3_desc: "Let us know if you want live prayer for your family or city.",

    // Form Fields
    form_name_label: "Full Name *",
    form_name_ph: "e.g. John Doe",
    form_email_label: "Email Address *",
    form_email_ph: "your-email@example.com",
    form_whatsapp_label: "WhatsApp with Country Code *",
    form_whatsapp_ph: "+1 234 567 8900 / +90 555 000 0000",
    form_country_label: "Country & City *",
    form_country_ph: "e.g. London, UK / Miami, USA",
    form_church_label: "Church / Fellowship",
    form_church_ph: "e.g. Central Church",
    form_reason_label: "How would you like to connect? *",
    form_reason_default: "Select an option...",
    form_reason_opt1: "I want to join the WhatsApp Intercession Group",
    form_reason_opt2: "I want to learn more about the work in Turkey",
    form_reason_opt3: "Personal prayer request for the live radio broadcast",
    form_reason_opt4: "Interest in ministry service expeditions and trips",
    form_message_label: "Message, testimony, or prayer request",
    form_message_ph: "Write your request or burden here...",
    btn_submit_contact: "Submit Request to Pastoral Team",
    form_success_alert: "Thank you for reaching out! Your request has been recorded, and our team will get in touch with you via WhatsApp or email.",
    form_toast_link_copied: "Radio link copied to clipboard!",
    form_toast_pwa_install: "To install app: Open your browser menu and tap 'Add to Home Screen'.",

    // Footer
    footer_tagline: "Hope Radio 24/7 & Witness in the Cradle of the Early Church.",
    footer_nav_title: "Navigation",
    footer_connect_title: "Connect",
    footer_connect_desc: "Tune in to our broadcasts and join us in continuous prayer.",
    footer_rights: "© 2026 MMM Turkey — All rights reserved. Radio & Mission.",
    footer_verse: "«He who has an ear, let him hear what the Spirit says to the churches» — Revelation 2:7"
  },

  it: {
    // Navbar & Identità
    radio_brand_sub: "Radio Speranza 24/7",
    radio_badge_live: "IN DIRETTA 24/7",
    nav_radio: "Radio 24/7",
    nav_schedule: "Palinsesto",
    nav_podcasts: "A la Carte",
    nav_contact: "Contatto",
    btn_nav_contact: "Conoscici",

    // Consola Principale / Hero Radio
    radio_live_status_header: "🔴 TRASMISSIONE IN DIRETTA 24/7",
    listeners_label: "Ascoltatori connessi:",
    station_main_chip: "STAZIONE PRINCIPALE",
    audio_stream_spec: "128 Kbps • Stereo HD",
    host_label: "Conduce:",
    btn_listen_live: "Ascolta dal Vivo",
    btn_pause_live: "Metti in Pausa",
    btn_share: "Condividi",
    btn_share_tip: "Condividi la radio sui social",
    btn_install_app: "Installa App",
    btn_install_app_tip: "Installa applicazione radio",
    radio_status_ready: "Clicca su \"Ascolta dal Vivo\" per avviare la trasmissione.",
    radio_status_playing: "In onda in diretta — Canti di Lode e Speranza dalla Turchia",
    radio_status_paused: "Trasmissione in pausa.",
    radio_status_buffering: "Connessione al flusso audio in corso...",
    radio_status_error: "Riconnessione al server di trasmissione...",

    // Barra del Prossimo Programma (Teaser)
    next_show_label: "A SEGUIRE (12:00):",
    teaser_host_default: "con il Pastore David Ortiz",
    view_full_schedule: "Vedi Palinsesto Completo",

    // Sezione Palinsesto
    schedule_badge: "GUIDA IN ONDA",
    schedule_title: "Palinsesto della Radio",
    schedule_desc: "Scopri gli orari dei nostri studi biblici, lodi, intercessioni e messaggi quotidiani trasmessi dalla Turchia per le nazioni.",
    day_today: "Oggi",
    day_tomorrow: "Domani",
    day_monday: "Lunedì",
    day_tuesday: "Martedì",
    day_wednesday: "Mercoledì",
    day_thursday: "Giovedì",
    day_friday: "Venerdì",
    day_saturday: "Sabato",
    day_sunday: "Domenica",

    // Filtri Categorie
    filter_all: "Tutti",
    filter_worship: "Lode & Adorazione",
    filter_bible: "Studio Biblico",
    filter_prayer: "Preghiera & Intercessione",
    filter_mission: "Testimonianze Missionarie",

    // Stati delle Schede del Programma
    status_live: "IN ONDA ORA",
    status_live_pulse: "🔴 IN TRASMISSIONE",
    status_ended: "Terminato",
    status_next: "Prossimo",
    status_scheduled: "Programmato",
    btn_listen_card: "Sintonizzati",
    btn_remind_card: "Ricordamelo",
    schedule_empty_category: "Nessun programma disponibile in questa categoria per il giorno selezionato.",

    // Fonoteca / A la Carte
    podcast_badge: "FONOTECA ON DEMAND",
    podcast_title: "Biblioteca di Programmi Registrati",
    podcast_desc: "Ascolta in qualsiasi momento gli studi biblici, le testimonianze del campo e i messaggi già trasmessi nella nostra radio.",
    podcast_search_ph: "Cerca per argomento, pastore o parola chiave (es. Efesini, Testimonianza)...",
    filter_cat_estudio: "Studi Biblici",
    filter_cat_testimonio: "Testimonianze",
    filter_cat_adoracion: "Lodi in Turco",
    filter_cat_devocional: "Devozionali",
    podcast_empty_results: "Nessuna registrazione trovata per i termini inseriti.",

    // Mini-Player Flottante
    mini_playing_label: "RIPRODUZIONE REGISTRAZIONE",
    mini_rewind_tip: "Riavvolgi 15 secondi",
    mini_forward_tip: "Avanza 15 secondi",
    mini_close_tip: "Chiudi riproduttore on demand",

    // Sezione Notizie Riservata
    news_badge: "NOTIZIE DAL CAMPO",
    news_title: "Cronache e Notizie dell'Opera",
    news_desc: "Prossimamente: Resoconti missionari, testimonianze e novità sui viaggi pastorali in Turchia.",

    // Sezione Contatto
    contact_badge: "CONTATTO ESCLUSIVO",
    contact_title: "Connettiti con Noi e Invia la Tua Richiesta",
    contact_desc: "L'accesso alla rete di preghiera WhatsApp e ai materiali dedicati è gestito direttamente con cura pastorale.",
    contact_desc_2: "Se desideri conoscerci meglio, richiedere preghiera o unirti al gruppo di intercessione per la Turchia, compila i tuoi dati qui sotto:",
    contact_hl1_title: "Gruppo di Preghiera WhatsApp",
    contact_hl1_desc: "Coordinamento pastorale e argomenti quotidiani di preghiera.",
    contact_hl2_title: "Privacy e Riservatezza",
    contact_hl2_desc: "I tuoi dati sono protetti e trattati con la massima riservatezza.",
    contact_hl3_title: "Preghiere in Diretta Radio",
    contact_hl3_desc: "Facci sapere se desideri una preghiera in diretta per la tua famiglia o città.",

    // Campi Formulario
    form_name_label: "Nome e Cognome *",
    form_name_ph: "Es. Marco Rossi",
    form_email_label: "Indirizzo Email *",
    form_email_ph: "tua-email@esempio.com",
    form_whatsapp_label: "WhatsApp con prefisso internazionale *",
    form_whatsapp_ph: "+39 300 000 0000 / +90 555 000 0000",
    form_country_label: "Paese e Città *",
    form_country_ph: "Es. Roma, Italia / Madrid, Spagna",
    form_church_label: "Chiesa / Comunità",
    form_church_ph: "Es. MMM Centrale",
    form_reason_label: "Come vorresti partecipare? *",
    form_reason_default: "Seleziona un'opzione...",
    form_reason_opt1: "Desidero unirmi al gruppo WhatsApp e Rete di Intercessione",
    form_reason_opt2: "Desidero maggiori informazioni sull'opera in Turchia",
    form_reason_opt3: "Richiesta di preghiera personale per la trasmissione radio",
    form_reason_opt4: "Interesse per spedizioni e servizio missionario",
    form_message_label: "Messaggio, testimonianza o richiesta di preghiera",
    form_message_ph: "Scrivi qui il tuo messaggio o motivo di preghiera...",
    btn_submit_contact: "Invia Richiesta al Team Pastorale",
    form_success_alert: "Grazie per averci contattato! La tua richiesta è stata registrata e il nostro team ti contatterà presto via WhatsApp o email.",
    form_toast_link_copied: "Link della radio copiato negli appunti!",
    form_toast_pwa_install: "Per installare l'app: Apri il menu del browser e tocca 'Aggiungi a schermata Home'.",

    // Footer
    footer_tagline: "Radio Speranza 24/7 & Testimonianza nella Culla della Chiesa Storica.",
    footer_nav_title: "Navigazione",
    footer_connect_title: "Connettiti",
    footer_connect_desc: "Sintonizzati sui nostri programmi e unisciti a noi nella preghiera continua.",
    footer_rights: "© 2026 MMM Turchia — Tutti i diritti riservati. Radio e Missione.",
    footer_verse: "«Chi ha orecchi, ascolti ciò che lo Spirito dice alle chiese» — Apocalisse 2:7"
  }
};

/**
 * Idiomas soportados
 */
export const SUPPORTED_LANGS = ['es', 'tr', 'en', 'it'];
export const DEFAULT_LANG = 'es';

/**
 * Función traductora para cadenas individuales
 * @param {string} key - Clave del diccionario
 * @param {string} [langCode] - Idioma opcional (por defecto idioma actual)
 * @returns {string} Texto traducido o la clave si no existe
 */
export function t(key, langCode) {
  const lang = (langCode && SUPPORTED_LANGS.includes(langCode)) ? langCode : (document.documentElement.lang || DEFAULT_LANG);
  const dict = translations[lang] || translations[DEFAULT_LANG];
  return dict[key] !== undefined ? dict[key] : (translations[DEFAULT_LANG][key] || key);
}

/**
 * Detectar el mejor idioma para el usuario:
 * 1. Preferencia previa guardada en localStorage
 * 2. Idioma del navegador o teléfono
 * 3. Idioma por defecto (Español)
 */
export function detectarIdioma() {
  try {
    const guardado = localStorage.getItem('user_lang');
    if (guardado && SUPPORTED_LANGS.includes(guardado)) {
      return guardado;
    }
  } catch (e) {
    console.warn('localStorage inaccesible para idioma:', e);
  }

  const navLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(navLang)) {
    return navLang;
  }

  return DEFAULT_LANG;
}

/**
 * Aplicar un idioma a la página actual y a todos los elementos del DOM
 * @param {string} langCode - 'es', 'tr', 'en', 'it'
 */
export function aplicarIdioma(langCode) {
  const lang = SUPPORTED_LANGS.includes(langCode) ? langCode : DEFAULT_LANG;
  const dict = translations[lang] || translations[DEFAULT_LANG];

  // 1. Guardar preferencia en localStorage y atributo HTML
  try {
    localStorage.setItem('user_lang', lang);
  } catch (e) {
    console.warn('No se pudo guardar idioma en localStorage:', e);
  }
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

  // 5. Actualizar estado visual de los botones del selector en navbar y dropdowns
  document.querySelectorAll('.lang-btn, .lang-option').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const labelEl = document.getElementById('currentLangLabel');
  if (labelEl) {
    labelEl.textContent = lang.toUpperCase();
  }

  // 6. Notificar a componentes externos (radio-schedule.js y radio-player.js)
  window.dispatchEvent(new CustomEvent('idiomaCambiado', { detail: { lang, dict } }));
}

// Exponer en window para interoperabilidad global fluida
window.aplicarIdioma = aplicarIdioma;
window.t = t;
window.I18N = {
  translations,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  detectarIdioma,
  aplicarIdioma,
  t
};

/**
 * Inicializador automático al cargar la página
 */
document.addEventListener('DOMContentLoaded', () => {
  const idiomaInicial = detectarIdioma();
  aplicarIdioma(idiomaInicial);

  // Conectar clics a cualquier botón selector con clase .lang-btn o .lang-option
  document.querySelectorAll('.lang-btn[data-lang], .lang-option[data-lang]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nuevoIdioma = btn.dataset.lang;
      if (nuevoIdioma) {
        aplicarIdioma(nuevoIdioma);
      }
    });
  });

  // Escuchar solicitudes de cambio desde otros scripts
  window.addEventListener('cambiarIdiomaSolicitado', (e) => {
    if (e.detail?.lang) {
      aplicarIdioma(e.detail.lang);
    }
  });
});

export default {
  translations,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  detectarIdioma,
  aplicarIdioma,
  t
};

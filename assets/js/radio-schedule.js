/**
 * ============================================================================
 * MMM TURQUÍA — RADIO ESPERANZA 24/7 & FONOTECA
 * Motor de Parrilla de Programación y Guía al Aire (radio-schedule.js)
 * ============================================================================
 * Proporciona:
 *   1. Base de datos semanal completa de programas (Lunes a Domingo, 24 horas).
 *   2. Detección en tiempo real del programa al aire y sincronización con el reproductor principal.
 *   3. Pestañas de navegación por días (Hoy, Mañana, Lunes, Martes, etc.) y fechas dinámicas.
 *   4. Filtro por categorías temáticas (Alabanza, Estudio Bíblico, Oración, Misiones).
 *   5. Cálculo dinámico de estados: En Vivo, Finalizado, Próximo y Programado.
 *   6. Integración multilingüe sincronizada con lang.js (ES, TR, EN, IT).
 */

// ============================================================================
// BASE DE DATOS MAESTRA DE PROGRAMACIÓN SEMANAL (24 HORAS / 7 DÍAS)
// ============================================================================
const WEEKLY_SCHEDULE_DATA = {
  // LUNES
  monday: [
    {
      id: 'mon-00',
      startHour: 0,
      startMin: 0,
      endHour: 6,
      endMin: 0,
      startTime: '00:00',
      endTime: '06:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Noches de Paz y Clamor',
        tr: 'Huzur ve Yakarma Geceleri',
        en: 'Nights of Peace and Cry',
        it: 'Notti di Pace e Supplica',
      },
      briefs: {
        es: 'Música instrumental sacra, salmos leídos y adoración continua para el reposo del alma.',
        tr: 'Kutsal enstrümantal müzik, okunan mezmurlar ve ruhun dinlenmesi için sürekli tapınma.',
        en: 'Sacred instrumental music, read psalms, and continuous worship for soul rest.',
        it: 'Musica strumentale sacra, salmi letti e adorazione continua per il riposo dell\'anima.',
      },
      speaker: 'Equipo de Vigilia Nocturna',
      cover: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mon-06',
      startHour: 6,
      startMin: 0,
      endHour: 8,
      endMin: 0,
      startTime: '06:00',
      endTime: '08:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Amanecer con la Palabra',
        tr: 'Kelam ile Şafak Vakti',
        en: 'Dawn with the Word',
        it: 'Alba con la Parola',
      },
      briefs: {
        es: 'Lectura devocional comentada de los Evangelios y oración de bendición al comenzar el día.',
        tr: 'İncil metinlerinin açıklamalı okunması ve güne başlarken bereket duası.',
        en: 'Commented devotional reading of the Gospels and prayer of blessing to start the day.',
        it: 'Lettura devozionale commentata dei Vangeli e preghiera di benedizione per iniziare la giornata.',
      },
      speaker: 'Pastor Gabriel Méndez',
      cover: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mon-08',
      startHour: 8,
      startMin: 0,
      endHour: 10,
      endMin: 0,
      startTime: '08:00',
      endTime: '10:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas en las 7 Iglesias',
        tr: '7 Kiliselerde Övgüler',
        en: 'Praises in the 7 Churches',
        it: 'Lodi nelle 7 Chiese',
      },
      briefs: {
        es: 'Himnos de fe y cánticos de alabanza en turco y español recordando las promesas del Señor.',
        tr: 'Türkçe ve İspanyolca ilahilerle Tanrı\'nın vaatlerini hatırlatan övgü ezgileri.',
        en: 'Hymns of faith and praises in Turkish and Spanish remembering the Lord\'s promises.',
        it: 'Inni di fede e lodi in turco e spagnolo ricordando le promesse del Signore.',
      },
      speaker: 'Ministerio Musical de Estambul',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mon-10',
      startHour: 10,
      startMin: 0,
      endHour: 12,
      endMin: 0,
      startTime: '10:00',
      endTime: '12:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas del Bósforo & Clamor',
        tr: 'Boğaziçi Övgüleri ve Yakarma',
        en: 'Bosphorus Praises & Supplication',
        it: 'Lodi del Bosforo & Supplica',
      },
      briefs: {
        es: 'Música continua de adoración en español y turco, con clamor ferviente por las 7 Iglesias históricas.',
        tr: 'İspanyolca ve Türkçe tapınma ezgileri eşliğinde 7 tarihi kilise için coşkulu dua vakti.',
        en: 'Continuous worship in Spanish and Turkish, with fervent prayer for the 7 historic churches.',
        it: 'Musica continua di adorazione in spagnolo e turco, con preghiera fervente per le 7 Chiese storiche.',
      },
      speaker: 'Pr. Daniel Salazar & Equipo',
      cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mon-12',
      startHour: 12,
      startMin: 0,
      endHour: 14,
      endMin: 0,
      startTime: '12:00',
      endTime: '14:00',
      category: 'mision',
      categoryKey: 'filter_mission',
      titles: {
        es: 'Voz de Esperanza — Cartas de Asia Menor',
        tr: 'Umut Sesi — Küçük Asya Mektupları',
        en: 'Voice of Hope — Letters from Asia Minor',
        it: 'Voce di Speranza — Lettere dall\'Asia Minore',
      },
      briefs: {
        es: 'Crónicas, testimonios reales de creyentes en Turquía y avances de la obra misionera.',
        tr: 'Türkiye\'deki inananların gerçek tanıklıkları ve müjde hizmetindeki gelişmeler.',
        en: 'Chronicles, real testimonies from believers in Turkey, and missionary field updates.',
        it: 'Cronache, testimonianze reali di credenti in Turchia e sviluppi missionari.',
      },
      speaker: 'Pr. David Ortiz',
      cover: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mon-14',
      startHour: 14,
      startMin: 0,
      endHour: 17,
      endMin: 0,
      startTime: '14:00',
      endTime: '17:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Armonías del Reino',
        tr: 'Krallık Harmonileri',
        en: 'Kingdom Harmonies',
        it: 'Armonie del Regno',
      },
      briefs: {
        es: 'Selección de himnos y cantos de adoración contemporánea de la iglesia en Oriente y Occidente.',
        tr: 'Doğu ve Batı kilisesinden seçilmiş ilahiler ve çağdaş tapınma parçaları.',
        en: 'Selection of hymns and contemporary worship from eastern and western churches.',
        it: 'Selezione di inni e adorazione contemporanea della chiesa d\'Oriente e d\'Occidente.',
      },
      speaker: 'Ministerio Musical',
      cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mon-17',
      startHour: 17,
      startMin: 0,
      endHour: 19,
      endMin: 0,
      startTime: '17:00',
      endTime: '19:00',
      category: 'oracion',
      categoryKey: 'filter_prayer',
      titles: {
        es: 'Hora de Clamor por las 7 Iglesias',
        tr: '7 Kilise İçin Dua Saati',
        en: 'Hour of Prayer for the 7 Churches',
        it: 'Ora di Supplica per le 7 Chiese',
      },
      briefs: {
        es: 'Tiempo solemne de intercesión por Éfeso, Esmirna, Pérgamo, Tiatira, Sardis, Filadelfia y Laodicea.',
        tr: 'Efes, İzmir, Bergama, Akhisar, Salihli, Alaşehir ve Pamukkale için yürekten şefaat duası.',
        en: 'Solemn intercession for Ephesus, Smyrna, Pergamon, Thyatira, Sardis, Philadelphia, and Laodicea.',
        it: 'Tempo solenne d\'intercessione per Efeso, Smirne, Pergamo, Tiatira, Sardi, Filadelfia e Laodicea.',
      },
      speaker: 'Pastores del Presbiterio',
      cover: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mon-19',
      startHour: 19,
      startMin: 0,
      endHour: 21,
      endMin: 0,
      startTime: '19:00',
      endTime: '21:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Mensaje Pastoral y Doctrina Apostólica',
        tr: 'Pastörel Mesaj ve Elçisel Öğreti',
        en: 'Pastoral Message & Apostolic Doctrine',
        it: 'Messaggio Pastorale e Dottrina Apostolica',
      },
      briefs: {
        es: 'Exposición bíblica versículo por versículo de las Epístolas Paulinas y la vida cristiana consagrada.',
        tr: 'Pavlus\'un mektuplarının ayet ayet açıklaması ve kutsal yaşam dersleri.',
        en: 'Verse-by-verse biblical teaching through Pauline Epistles and devoted Christian living.',
        it: 'Esposizione biblica versetto per versetto delle Epistole Paoline e consacrazione.',
      },
      speaker: 'Cuerpo Ministerial MMM',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mon-21',
      startHour: 21,
      startMin: 0,
      endHour: 24,
      endMin: 0,
      startTime: '21:00',
      endTime: '00:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Vigilia de Adoración y Paz',
        tr: 'Tapınma ve Barış Nöbeti',
        en: 'Vigil of Worship and Peace',
        it: 'Veglia di Adorazione e Pace',
      },
      briefs: {
        es: 'Cierre del día con cánticos espirituales, lectura solemne de las Escrituras y bendición pastoral.',
        tr: 'Ruhsal ezgiler, kutsal metin okumaları ve günün sonunda huzur veren bereket duası.',
        en: 'Closing the day with spiritual songs, scripture reading, and pastoral blessing.',
        it: 'Chiusura della giornata con cantici spirituali, lettura solenne e benedizione pastorale.',
      },
      speaker: 'Equipo de Transmisión',
      cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // MARTES
  tuesday: [
    {
      id: 'tue-00',
      startHour: 0,
      startMin: 0,
      endHour: 6,
      endMin: 0,
      startTime: '00:00',
      endTime: '06:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Noches de Paz y Clamor',
        tr: 'Huzur ve Yakarma Geceleri',
        en: 'Nights of Peace and Cry',
        it: 'Notti di Pace e Supplica',
      },
      briefs: {
        es: 'Música instrumental sacra y adoración continua para el reposo nocturno.',
        tr: 'Gece boyunca süren kutsal enstrümantal müzik ve tapınma.',
        en: 'Sacred instrumental music and continuous worship through the night.',
        it: 'Musica strumentale sacra e adorazione continua.',
      },
      speaker: 'Equipo de Vigilia Nocturna',
      cover: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tue-06',
      startHour: 6,
      startMin: 0,
      endHour: 8,
      endMin: 0,
      startTime: '06:00',
      endTime: '08:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Amanecer con la Palabra — Libro de los Hechos',
        tr: 'Kelam ile Şafak Vakti — Elçilerin İşleri',
        en: 'Dawn with the Word — Book of Acts',
        it: 'Alba con la Parola — Atti degli Apostoli',
      },
      briefs: {
        es: 'Estudio de los viajes de Pablo por Antioquía, Tarso y Galacia.',
        tr: 'Pavlus\'un Antakya, Tarsus ve Galatya yolculuklarının derinlemesine incelenmesi.',
        en: 'Study of Paul\'s missionary journeys through Antioch, Tarsus, and Galatia.',
        it: 'Studio dei viaggi di Paolo attraverso Antiochia, Tarso e Galazia.',
      },
      speaker: 'Pastor Gabriel Méndez',
      cover: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tue-08',
      startHour: 8,
      startMin: 0,
      endHour: 10,
      endMin: 0,
      startTime: '08:00',
      endTime: '10:00',
      category: 'oracion',
      categoryKey: 'filter_prayer',
      titles: {
        es: 'Intercesión Matutina por las Naciones',
        tr: 'Uluslar İçin Sabah Şefaati',
        en: 'Morning Intercession for the Nations',
        it: 'Intercessione Mattutina per le Nazioni',
      },
      briefs: {
        es: 'Oración enfocada en Europa Oriental, Medio Oriente y Asia Menor.',
        tr: 'Doğu Avrupa, Orta Doğu ve Anadolu için odaklanmış sabah duası.',
        en: 'Focused prayer for Eastern Europe, the Middle East, and Asia Minor.',
        it: 'Preghiera focalizzata su Europa Orientale, Medio Oriente e Asia Minore.',
      },
      speaker: 'Equipo Misionero Femenino',
      cover: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tue-10',
      startHour: 10,
      startMin: 0,
      endHour: 12,
      endMin: 0,
      startTime: '10:00',
      endTime: '12:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas del Bósforo & Clamor',
        tr: 'Boğaziçi Övgüleri ve Yakarma',
        en: 'Bosphorus Praises & Supplication',
        it: 'Lodi del Bosforo & Supplica',
      },
      briefs: {
        es: 'Música continua de adoración en español y turco con intercesión por las familias.',
        tr: 'Aileler için şefaat duası eşliğinde iki dilde tapınma ezgileri.',
        en: 'Worship music in Spanish and Turkish with intercession for families.',
        it: 'Musica continua di adorazione in spagnolo e turco con intercessione.',
      },
      speaker: 'Pr. Daniel Salazar & Equipo',
      cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tue-12',
      startHour: 12,
      startMin: 0,
      endHour: 14,
      endMin: 0,
      startTime: '12:00',
      endTime: '14:00',
      category: 'mision',
      categoryKey: 'filter_mission',
      titles: {
        es: 'Voz de Esperanza — Misiones en Fronteras',
        tr: 'Umut Sesi — Sınır Boylarında Müjde',
        en: 'Voice of Hope — Border Missions',
        it: 'Voce di Speranza — Missioni alle Frontiere',
      },
      briefs: {
        es: 'Reportes en vivo de misioneros en Anatolia y testimonios de conversión.',
        tr: 'Anadolu\'dan müjdeci haberleri ve Mesih\'e yönelenlerin tanıklıkları.',
        en: 'Live reports from missionaries across Anatolia and faith stories.',
        it: 'Resoconti missionari in Anatolia e testimonianze di fede.',
      },
      speaker: 'Pr. David Ortiz',
      cover: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tue-14',
      startHour: 14,
      startMin: 0,
      endHour: 17,
      endMin: 0,
      startTime: '14:00',
      endTime: '17:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Armonías del Reino',
        tr: 'Krallık Harmonileri',
        en: 'Kingdom Harmonies',
        it: 'Armonie del Regno',
      },
      briefs: {
        es: 'Cantos de adoración, himnos clásicos y melodías inspiradas en las Escrituras.',
        tr: 'Kutsal Yazılardan esinlenen ilahiler ve klasik tapınma şarkıları.',
        en: 'Praise hymns, classical choral pieces, and scriptural songs.',
        it: 'Canti di adorazione, inni classici e melodie bibliche.',
      },
      speaker: 'Ministerio Musical',
      cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tue-17',
      startHour: 17,
      startMin: 0,
      endHour: 19,
      endMin: 0,
      startTime: '17:00',
      endTime: '19:00',
      category: 'oracion',
      categoryKey: 'filter_prayer',
      titles: {
        es: 'Hora de Clamor por las 7 Iglesias',
        tr: '7 Kilise İçin Dua Saati',
        en: 'Hour of Prayer for the 7 Churches',
        it: 'Ora di Supplica per le 7 Chiese',
      },
      briefs: {
        es: 'Intercesión por el renacimiento espiritual en Turquía y preservación de los creyentes.',
        tr: 'Türkiye\'de ruhsal uyanış ve inananların güçlenmesi için şefaat duası.',
        en: 'Intercession for spiritual revival in Turkey and strength for believers.',
        it: 'Intercessione per il risveglio spirituale in Turchia e protezione.',
      },
      speaker: 'Pastores del Presbiterio',
      cover: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tue-19',
      startHour: 19,
      startMin: 0,
      endHour: 21,
      endMin: 0,
      startTime: '19:00',
      endTime: '21:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'La Carta a los Efesios',
        tr: 'Efeslilere Mektup İncelemesi',
        en: 'Study on the Letter to the Ephesians',
        it: 'Studio della Lettera agli Efesini',
      },
      briefs: {
        es: 'Estudio verso a verso del misterio de la Iglesia, la armadura de Dios y la unidad.',
        tr: 'Kilise\'nin sırrı, Tanrı\'nın zırhı ve iman birliği üzerine derinlemesine çalışma.',
        en: 'Verse-by-verse exposition of the mystery of the Church and armor of God.',
        it: 'Studio versetto per versetto sull\'armatura di Dio e l\'unità della Chiesa.',
      },
      speaker: 'Pr. Daniel Salazar',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tue-21',
      startHour: 21,
      startMin: 0,
      endHour: 24,
      endMin: 0,
      startTime: '21:00',
      endTime: '00:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Vigilia de Adoración y Paz',
        tr: 'Tapınma ve Barış Nöbeti',
        en: 'Vigil of Worship and Peace',
        it: 'Veglia di Adorazione e Pace',
      },
      briefs: {
        es: 'Cierre de jornada con gratitud, alabanzas acústicas y oración de bendición.',
        tr: 'Şükran, akustik ezgiler ve bereket duasıyla günün tamamlanması.',
        en: 'Closing the day with gratitude, acoustic worship, and blessing.',
        it: 'Chiusura con gratitudine, lodi acustiche e benedizione pastorale.',
      },
      speaker: 'Equipo de Transmisión',
      cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // MIÉRCOLES
  wednesday: [
    {
      id: 'wed-00',
      startHour: 0,
      startMin: 0,
      endHour: 6,
      endMin: 0,
      startTime: '00:00',
      endTime: '06:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Noches de Paz y Clamor',
        tr: 'Huzur ve Yakarma Geceleri',
        en: 'Nights of Peace and Cry',
        it: 'Notti di Pace e Supplica',
      },
      briefs: {
        es: 'Instrumentales de adoración y lectura solemne de las promesas de Dios.',
        tr: 'Enstrümantal tapınma ezgileri ve Tanrı vaatlerinin okunması.',
        en: 'Instrumental worship and reading of God\'s promises.',
        it: 'Musica strumentale e promesse di Dio.',
      },
      speaker: 'Equipo de Vigilia Nocturna',
      cover: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wed-06',
      startHour: 6,
      startMin: 0,
      endHour: 8,
      endMin: 0,
      startTime: '06:00',
      endTime: '08:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Amanecer con la Palabra',
        tr: 'Kelam ile Şafak Vakti',
        en: 'Dawn with the Word',
        it: 'Alba con la Parola',
      },
      briefs: {
        es: 'Lectura devocional comentada de los Evangelios y oración de inicio de jornada.',
        tr: 'İncil okumaları ve güne başlarken bereket duası.',
        en: 'Commented devotional reading of the Gospels and morning prayer.',
        it: 'Lettura devozionale dei Vangeli e preghiera del mattino.',
      },
      speaker: 'Pastor Gabriel Méndez',
      cover: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wed-08',
      startHour: 8,
      startMin: 0,
      endHour: 10,
      endMin: 0,
      startTime: '08:00',
      endTime: '10:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas en las 7 Iglesias',
        tr: '7 Kiliselerde Övgüler',
        en: 'Praises in the 7 Churches',
        it: 'Lodi nelle 7 Chiese',
      },
      briefs: {
        es: 'Cánticos de gozo espiritual y exaltación al Rey de reyes en idiomas de la región.',
        tr: 'Bölge dillerinde sevinç ve yüceltme ilahileri.',
        en: 'Songs of spiritual joy and exaltation to the King of kings in regional languages.',
        it: 'Cantici di gioia spirituale ed esaltazione al Re dei re.',
      },
      speaker: 'Ministerio Musical de Estambul',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wed-10',
      startHour: 10,
      startMin: 0,
      endHour: 12,
      endMin: 0,
      startTime: '10:00',
      endTime: '12:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas del Bósforo & Clamor',
        tr: 'Boğaziçi Övgüleri ve Yakarma',
        en: 'Bosphorus Praises & Supplication',
        it: 'Lodi del Bosforo & Supplica',
      },
      briefs: {
        es: 'Música continua de adoración en español y turco, con clamor ferviente por las 7 Iglesias históricas.',
        tr: 'Türkçe ve İspanyolca tapınma ezgileriyle 7 kilise için şefaat duası.',
        en: 'Continuous worship in Spanish and Turkish, with fervent prayer for the 7 historic churches.',
        it: 'Musica continua di adorazione in spagnolo e turco con preghiera per le 7 Chiese.',
      },
      speaker: 'Pr. Daniel Salazar & Equipo',
      cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wed-12',
      startHour: 12,
      startMin: 0,
      endHour: 14,
      endMin: 0,
      startTime: '12:00',
      endTime: '14:00',
      category: 'mision',
      categoryKey: 'filter_mission',
      titles: {
        es: 'Voz de Esperanza — Cartas de Asia Menor',
        tr: 'Umut Sesi — Küçük Asya Mektupları',
        en: 'Voice of Hope — Letters from Asia Minor',
        it: 'Voce di Speranza — Lettere dall\'Asia Minore',
      },
      briefs: {
        es: 'Crónicas, testimonios reales de creyentes en Turquía y avances del Evangelio en el Bósforo.',
        tr: 'Boğaz kıyılarında müjdenin yayılışı ve inanan kardeşlerin tanıklıkları.',
        en: 'Chronicles, testimonies from believers in Turkey, and gospel progress by the Bosphorus.',
        it: 'Cronache, testimonianze e progressi del Vangelo sul Bosforo.',
      },
      speaker: 'Pr. David Ortiz',
      cover: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wed-14',
      startHour: 14,
      startMin: 0,
      endHour: 17,
      endMin: 0,
      startTime: '14:00',
      endTime: '17:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Armonías del Reino',
        tr: 'Krallık Harmonileri',
        en: 'Kingdom Harmonies',
        it: 'Armonie del Regno',
      },
      briefs: {
        es: 'Selección de himnos y cantos de adoración contemporánea de la iglesia en Oriente y Occidente.',
        tr: 'Kilise tarihinin seçkin ilahileri ve çağdaş ezgiler.',
        en: 'Selection of hymns and contemporary worship from eastern and western churches.',
        it: 'Selezione di inni e cantici contemporanei.',
      },
      speaker: 'Ministerio Musical',
      cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wed-17',
      startHour: 17,
      startMin: 0,
      endHour: 19,
      endMin: 0,
      startTime: '17:00',
      endTime: '19:00',
      category: 'oracion',
      categoryKey: 'filter_prayer',
      titles: {
        es: 'Hora de Clamor por las 7 Iglesias',
        tr: '7 Kilise İçin Dua Saati',
        en: 'Hour of Prayer for the 7 Churches',
        it: 'Ora di Supplica per le 7 Chiese',
      },
      briefs: {
        es: 'Tiempo solemne de intercesión por Éfeso, Esmirna, Pérgamo, Tiatira, Sardis, Filadelfia y Laodicea.',
        tr: '7 tarihi kilise bölgesi ve yerel cemaatler için şefaat vakti.',
        en: 'Solemn prayer for the seven historic church regions in Asia Minor.',
        it: 'Preghiera solenne per le sette regioni storiche delle chiese.',
      },
      speaker: 'Pastores del Presbiterio',
      cover: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wed-19',
      startHour: 19,
      startMin: 0,
      endHour: 21,
      endMin: 0,
      startTime: '19:00',
      endTime: '21:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Culto de Doctrina y Oración Congregacional',
        tr: 'Öğreti ve Cemaat Duası Toplantısı',
        en: 'Doctrine Service & Congregational Prayer',
        it: 'Servizio di Dottrina e Preghiera Comunitaria',
      },
      briefs: {
        es: 'Transmisión especial del culto central con predicación profunda de la Sana Doctrina.',
        tr: 'Merkez ibadetten canlı yayın ve Kutsal Kitap öğretisi.',
        en: 'Special central service broadcast featuring sound biblical doctrine preaching.',
        it: 'Trasmissione speciale del servizio centrale con sana dottrina biblica.',
      },
      speaker: 'Pastor Presidente y Ministros',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wed-21',
      startHour: 21,
      startMin: 0,
      endHour: 24,
      endMin: 0,
      startTime: '21:00',
      endTime: '00:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Vigilia de Adoración y Paz',
        tr: 'Tapınma ve Barış Nöbeti',
        en: 'Vigil of Worship and Peace',
        it: 'Veglia di Adorazione e Pace',
      },
      briefs: {
        es: 'Cierre del día con cánticos espirituales, lectura solemne de las Escrituras y bendición pastoral.',
        tr: 'Günün sonunda ruhsal ezgiler ve huzurlu bereket duası.',
        en: 'Night praise, meditation on scripture, and pastoral benediction.',
        it: 'Lode notturna, meditazione scritturale e benedizione.',
      },
      speaker: 'Equipo de Transmisión',
      cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // JUEVES
  thursday: [
    {
      id: 'thu-00',
      startHour: 0,
      startMin: 0,
      endHour: 6,
      endMin: 0,
      startTime: '00:00',
      endTime: '06:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Noches de Paz y Clamor',
        tr: 'Huzur ve Yakarma Geceleri',
        en: 'Nights of Peace and Cry',
        it: 'Notti di Pace e Supplica',
      },
      briefs: {
        es: 'Alabanzas suaves para la madrugada y consuelo para los corazones afligidos.',
        tr: 'Sabahın erken saatlerinde yüreklere ferahlık veren ezgiler.',
        en: 'Gentle midnight praise and comfort for weary souls.',
        it: 'Lodi della notte e conforto per le anime.',
      },
      speaker: 'Equipo de Vigilia Nocturna',
      cover: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'thu-06',
      startHour: 6,
      startMin: 0,
      endHour: 8,
      endMin: 0,
      startTime: '06:00',
      endTime: '08:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Amanecer con la Palabra — El Sermón del Monte',
        tr: 'Kelam ile Şafak Vakti — Dağdaki Vaaz',
        en: 'Dawn with the Word — Sermon on the Mount',
        it: 'Alba con la Parola — Il Discorso della Montagna',
      },
      briefs: {
        es: 'Medita en las bienaventuranzas y el llamado a ser luz en medio de las tinieblas.',
        tr: 'Mutluluklar üzerine meditasyon ve dünyada ışık olma çağrısı.',
        en: 'Meditation on the Beatitudes and the calling to be light in darkness.',
        it: 'Meditazione sulle beatitudini e chiamata a essere luce nel mondo.',
      },
      speaker: 'Pastor Gabriel Méndez',
      cover: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'thu-08',
      startHour: 8,
      startMin: 0,
      endHour: 10,
      endMin: 0,
      startTime: '08:00',
      endTime: '10:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas en las 7 Iglesias',
        tr: '7 Kiliselerde Övgüler',
        en: 'Praises in the 7 Churches',
        it: 'Lodi nelle 7 Chiese',
      },
      briefs: {
        es: 'Coros de alabanza y cánticos antiguos de la fe apostólica.',
        tr: 'Elçisel dönemin ezgileri ve coşkulu koro ilahileri.',
        en: 'Choral hymns and ancient melodies of the apostolic faith.',
        it: 'Cori di lode e cantici antichi della fede apostolica.',
      },
      speaker: 'Ministerio Musical de Estambul',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'thu-10',
      startHour: 10,
      startMin: 0,
      endHour: 12,
      endMin: 0,
      startTime: '10:00',
      endTime: '12:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas del Bósforo & Clamor',
        tr: 'Boğaziçi Övgüleri ve Yakarma',
        en: 'Bosphorus Praises & Supplication',
        it: 'Lodi del Bosforo & Supplica',
      },
      briefs: {
        es: 'Adoración en vivo e intercesión por las familias y peticiones de oyentes.',
        tr: 'Dinleyicilerin dua istekleri ve aileler için şefaat vakti.',
        en: 'Live worship and prayer for listener prayer requests and families.',
        it: 'Adorazione dal vivo e preghiere per le richieste degli ascoltatori.',
      },
      speaker: 'Pr. Daniel Salazar & Equipo',
      cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'thu-12',
      startHour: 12,
      startMin: 0,
      endHour: 14,
      endMin: 0,
      startTime: '12:00',
      endTime: '14:00',
      category: 'mision',
      categoryKey: 'filter_mission',
      titles: {
        es: 'Voz de Esperanza — Mujeres de Fe en Turquía',
        tr: 'Umut Sesi — Türkiye\'de İmanlı Kadınlar',
        en: 'Voice of Hope — Women of Faith in Turkey',
        it: 'Voce di Speranza — Donne di Fede in Turchia',
      },
      briefs: {
        es: 'Testimonios edificantes de madres, misioneras y hermanas perseverando en fe.',
        tr: 'İmanda sebat eden kadınların ve müjdecilerin ilham veren tanıklıkları.',
        en: 'Inspiring stories of mothers and missionaries persevering in faith.',
        it: 'Testimonianze edificanti di donne e missionarie fedeli.',
      },
      speaker: 'Hna. Ruth Salazar',
      cover: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'thu-14',
      startHour: 14,
      startMin: 0,
      endHour: 17,
      endMin: 0,
      startTime: '14:00',
      endTime: '17:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Armonías del Reino',
        tr: 'Krallık Harmonileri',
        en: 'Kingdom Harmonies',
        it: 'Armonie del Regno',
      },
      briefs: {
        es: 'Música instrumental y alabanza continua de compositores cristianos.',
        tr: 'Hristiyan bestecilerden enstrümantal tapınma eserleri.',
        en: 'Instrumental Christian music and peaceful praise melodies.',
        it: 'Musica strumentale cristiana e melodie di lode.',
      },
      speaker: 'Ministerio Musical',
      cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'thu-17',
      startHour: 17,
      startMin: 0,
      endHour: 19,
      endMin: 0,
      startTime: '17:00',
      endTime: '19:00',
      category: 'oracion',
      categoryKey: 'filter_prayer',
      titles: {
        es: 'Hora de Clamor por las 7 Iglesias',
        tr: '7 Kilise İçin Dua Saati',
        en: 'Hour of Prayer for the 7 Churches',
        it: 'Ora di Supplica per le 7 Chiese',
      },
      briefs: {
        es: 'Oración por Esmirna y Pérgamo: fidelidad en medio de la prueba y valor cristiano.',
        tr: 'İzmir ve Bergama için dua: zorluklarda sadakat ve iman cesareti.',
        en: 'Prayer for Smyrna and Pergamon: steadfast faithfulness and holy courage.',
        it: 'Preghiera per Smirne e Pergamo: fedeltà nella prova e coraggio.',
      },
      speaker: 'Pastores del Presbiterio',
      cover: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'thu-19',
      startHour: 19,
      startMin: 0,
      endHour: 21,
      endMin: 0,
      startTime: '19:00',
      endTime: '21:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Estudio de los Salmos Mesiánicos',
        tr: 'Mesihsel Mezmurlar İncelemesi',
        en: 'Study on Messianic Psalms',
        it: 'Studio sui Salmi Messianici',
      },
      briefs: {
        es: 'Cristo revelado en los Salmos de David y su gloria sempiterna.',
        tr: 'Davut\'un Mezmurlarında Mesih ve O\'nun ebedi görkemi.',
        en: 'Christ revealed in Davidic Psalms and His everlasting glory.',
        it: 'Cristo rivelato nei Salmi di Davide e la Sua gloria eterna.',
      },
      speaker: 'Pr. David Ortiz',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'thu-21',
      startHour: 21,
      startMin: 0,
      endHour: 24,
      endMin: 0,
      startTime: '21:00',
      endTime: '00:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Vigilia de Adoración y Paz',
        tr: 'Tapınma ve Barış Nöbeti',
        en: 'Vigil of Worship and Peace',
        it: 'Veglia di Adorazione e Pace',
      },
      briefs: {
        es: 'Música para descansar bajo las alas del Omnipotente y bendición final.',
        tr: 'Yüceler Yücesi\'nin kanatları altında huzur veren gece ezgileri.',
        en: 'Resting under the shadow of the Almighty through worship.',
        it: 'Riposo all\'ombra dell\'Onnipotente attraverso la lode.',
      },
      speaker: 'Equipo de Transmisión',
      cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // VIERNES
  friday: [
    {
      id: 'fri-00',
      startHour: 0,
      startMin: 0,
      endHour: 6,
      endMin: 0,
      startTime: '00:00',
      endTime: '06:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Noches de Paz y Clamor',
        tr: 'Huzur ve Yakarma Geceleri',
        en: 'Nights of Peace and Cry',
        it: 'Notti di Pace e Supplica',
      },
      briefs: {
        es: 'Adoración instrumental ininterrumpida y lecturas bíblicas reconfortantes.',
        tr: 'Kesintisiz enstrümantal tapınma ve teselli veren kutsal metinler.',
        en: 'Unbroken instrumental worship and comfort scriptures.',
        it: 'Adorazione ininterrotta e letture bibliche di consolazione.',
      },
      speaker: 'Equipo de Vigilia Nocturna',
      cover: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fri-06',
      startHour: 6,
      startMin: 0,
      endHour: 8,
      endMin: 0,
      startTime: '06:00',
      endTime: '08:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Amanecer con la Palabra — Epístolas de Juan',
        tr: 'Kelam ile Şafak Vakti — Yuhanna\'nın Mektupları',
        en: 'Dawn with the Word — Epistles of John',
        it: 'Alba con la Parola — Epistole di Giovanni',
      },
      briefs: {
        es: 'El mandamiento del amor, la comunión con Dios y andar en la luz.',
        tr: 'Sevgi buyruğu, Tanrı\'yla paydaşlık ve ışıkta yürümek.',
        en: 'The commandment of love, communion with God, and walking in light.',
        it: 'Il comandamento dell\'amore e camminare nella luce.',
      },
      speaker: 'Pastor Gabriel Méndez',
      cover: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fri-08',
      startHour: 8,
      startMin: 0,
      endHour: 10,
      endMin: 0,
      startTime: '08:00',
      endTime: '10:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas en las 7 Iglesias',
        tr: '7 Kiliselerde Övgüler',
        en: 'Praises in the 7 Churches',
        it: 'Lodi nelle 7 Chiese',
      },
      briefs: {
        es: 'Himnos de alabanza que inspiran adoración genuina en espíritu y verdad.',
        tr: 'Ruhla ve gerçekle tapınmayı teşvik eden samimi ilahiler.',
        en: 'Hymns inspiring true worship in spirit and truth.',
        it: 'Inni che ispirano adorazione sincera in spirito e verità.',
      },
      speaker: 'Ministerio Musical de Estambul',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fri-10',
      startHour: 10,
      startMin: 0,
      endHour: 12,
      endMin: 0,
      startTime: '10:00',
      endTime: '12:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas del Bósforo & Clamor',
        tr: 'Boğaziçi Övgüleri ve Yakarma',
        en: 'Bosphorus Praises & Supplication',
        it: 'Lodi del Bosforo & Supplica',
      },
      briefs: {
        es: 'Transmisión especial de adoración con intercesión por la juventud y las familias.',
        tr: 'Gençler ve aileler için şefaat duası içeren özel yayın.',
        en: 'Special worship broadcast with intercession for youth and families.',
        it: 'Trasmissione di adorazione e intercessione per giovani e famiglie.',
      },
      speaker: 'Pr. Daniel Salazar & Equipo',
      cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fri-12',
      startHour: 12,
      startMin: 0,
      endHour: 14,
      endMin: 0,
      startTime: '12:00',
      endTime: '14:00',
      category: 'mision',
      categoryKey: 'filter_mission',
      titles: {
        es: 'Voz de Esperanza — El Llamado Misionero',
        tr: 'Umut Sesi — Müjde Çağrısı',
        en: 'Voice of Hope — The Missionary Calling',
        it: 'Voce di Speranza — La Vocazione Missionaria',
      },
      briefs: {
        es: 'Cómo servir a Dios en la proclamación del Evangelio en tierras lejanas.',
        tr: 'Uzak diyarlarda Tanrı\'nın müjdesini duyurmak ve hizmet çağrısı.',
        en: 'How to answer God\'s call to proclaim the gospel in distant lands.',
        it: 'Come servire Dio proclamando il Vangelo in terre lontane.',
      },
      speaker: 'Pr. David Ortiz',
      cover: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fri-14',
      startHour: 14,
      startMin: 0,
      endHour: 17,
      endMin: 0,
      startTime: '14:00',
      endTime: '17:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Armonías del Reino',
        tr: 'Krallık Harmonileri',
        en: 'Kingdom Harmonies',
        it: 'Armonie del Regno',
      },
      briefs: {
        es: 'Selección de himnos y cantos de adoración contemporánea de la iglesia en Oriente y Occidente.',
        tr: 'Hristiyan ezgileri ve enstrümantal tapınma.',
        en: 'Selection of hymns and contemporary worship from eastern and western churches.',
        it: 'Inni di adorazione contemporanea.',
      },
      speaker: 'Ministerio Musical',
      cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fri-17',
      startHour: 17,
      startMin: 0,
      endHour: 19,
      endMin: 0,
      startTime: '17:00',
      endTime: '19:00',
      category: 'oracion',
      categoryKey: 'filter_prayer',
      titles: {
        es: 'Hora de Clamor por las 7 Iglesias',
        tr: '7 Kilise İçin Dua Saati',
        en: 'Hour of Prayer for the 7 Churches',
        it: 'Ora di Supplica per le 7 Chiese',
      },
      briefs: {
        es: 'Clamor especial por Sardis y Filadelfia: guardar la Palabra y no negar Su nombre.',
        tr: 'Salihli ve Alaşehir için dua: Kelamı korumak ve Mesih\'in adını yüceltmek.',
        en: 'Special intercession for Sardis and Philadelphia: keeping the Word steadfastly.',
        it: 'Preghiera per Sardi e Filadelfia: custodire la Parola con fedeltà.',
      },
      speaker: 'Pastores del Presbiterio',
      cover: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fri-19',
      startHour: 19,
      startMin: 0,
      endHour: 22,
      endMin: 0,
      startTime: '19:00',
      endTime: '22:00',
      category: 'oracion',
      categoryKey: 'filter_prayer',
      titles: {
        es: 'Gran Vigilia de Clamor y Fuego de Dios',
        tr: 'Büyük Dua ve Ateş Nöbeti',
        en: 'Great Vigil of Prayer & Holy Fire',
        it: 'Grande Veglia di Preghiera e Fuoco di Dio',
      },
      briefs: {
        es: 'Noche de búsqueda intensa, clamor por sanidad espiritual, salvación y derramamiento del Espíritu.',
        tr: 'Şifa, kurtuluş ve Kutsal Ruh\'un bereketi için yoğun şefaat gecesi.',
        en: 'Intense night of prayer, seeking spiritual healing, salvation, and Holy Spirit revival.',
        it: 'Notte di ricerca intensa, guarigione spirituale, salvezza e risveglio.',
      },
      speaker: 'Presbiterio y Ministerio Completo',
      cover: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'fri-22',
      startHour: 22,
      startMin: 0,
      endHour: 24,
      endMin: 0,
      startTime: '22:00',
      endTime: '00:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Vigilia de Adoración y Paz',
        tr: 'Tapınma ve Barış Nöbeti',
        en: 'Vigil of Worship and Peace',
        it: 'Veglia di Adorazione e Pace',
      },
      briefs: {
        es: 'Alabanza de gratitud post-vigilia y meditación en los dones del Señor.',
        tr: 'Şükran ilahileri ve Tanrı\'nın lütufları üzerine tefekkür.',
        en: 'Post-vigil gratitude praise and quiet meditation on God\'s grace.',
        it: 'Lode di ringraziamento e silenziosa meditazione.',
      },
      speaker: 'Equipo de Transmisión',
      cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // SÁBADO
  saturday: [
    {
      id: 'sat-00',
      startHour: 0,
      startMin: 0,
      endHour: 7,
      endMin: 0,
      startTime: '00:00',
      endTime: '07:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Noches de Paz y Clamor',
        tr: 'Huzur ve Yakarma Geceleri',
        en: 'Nights of Peace and Cry',
        it: 'Notti di Pace e Supplica',
      },
      briefs: {
        es: 'Instrumentales de adoración y salmos leídos para renovación del espíritu.',
        tr: 'Ruhsal yenilenme için enstrümantal tapınma ve mezmurlar.',
        en: 'Instrumental worship and psalms for spiritual renewal.',
        it: 'Musica strumentale e salmi per il rinnovamento dello spirito.',
      },
      speaker: 'Equipo de Vigilia Nocturna',
      cover: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sat-07',
      startHour: 7,
      startMin: 0,
      endHour: 9,
      endMin: 0,
      startTime: '07:00',
      endTime: '09:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Amanecer con la Palabra — Proverbios y Sabiduría',
        tr: 'Kelam ile Şafak Vakti — Özdeyişler ve Hikmet',
        en: 'Dawn with the Word — Proverbs & Wisdom',
        it: 'Alba con la Parola — Proverbi e Saggezza',
      },
      briefs: {
        es: 'Principios prácticos para el hogar cristiano, los hijos y el trabajo cotidiano.',
        tr: 'Hristiyan evi, çocuklar ve günlük yaşam için pratik bilgelik ilkeleri.',
        en: 'Practical biblical principles for home, children, and daily walk.',
        it: 'Principi biblici pratici per la famiglia, i figli e il lavoro.',
      },
      speaker: 'Pastor Gabriel Méndez',
      cover: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sat-09',
      startHour: 9,
      startMin: 0,
      endHour: 11,
      endMin: 0,
      startTime: '09:00',
      endTime: '11:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Generación con Propósito — Jóvenes en Misión',
        tr: 'Gaye Sahibi Nesil — Görevdeki Gençlik',
        en: 'Generation with Purpose — Youth in Mission',
        it: 'Generazione con Scopo — Giovani in Missione',
      },
      briefs: {
        es: 'Programa dinámico para jóvenes y adolescentes con música cristiana contemporánea y desafíos de fe.',
        tr: 'Gençler için çağdaş müzik ve iman mücadelesi üzerine canlı program.',
        en: 'Dynamic youth program with contemporary praise and real faith challenges.',
        it: 'Programma dinamico per i giovani con musica e sfide di fede.',
      },
      speaker: 'Líderes Juveniles MMM',
      cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sat-11',
      startHour: 11,
      startMin: 0,
      endHour: 13,
      endMin: 0,
      startTime: '11:00',
      endTime: '13:00',
      category: 'mision',
      categoryKey: 'filter_mission',
      titles: {
        es: 'Voz de Esperanza — Panorama del Mundo Islámico',
        tr: 'Umut Sesi — İslam Dünyasına Bakış',
        en: 'Voice of Hope — Islamic World Overview',
        it: 'Voce di Speranza — Panorama del Mondo Islamico',
      },
      briefs: {
        es: 'Cómo orar y testificar con amor, respeto y prudencia a nuestros prójimos en Turquía y Oriente.',
        tr: 'Türkiye ve komşu ülkelerde komşularımıza sevgi ve saygıyla tanıklık etmek.',
        en: 'Praying and sharing Christ\'s love with respect and grace with neighbors in Turkey.',
        it: 'Come pregare e testimoniare con amore verso i nostri vicini in Turchia.',
      },
      speaker: 'Pr. David Ortiz',
      cover: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sat-13',
      startHour: 13,
      startMin: 0,
      endHour: 16,
      endMin: 0,
      startTime: '13:00',
      endTime: '16:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Maratón de Alabanzas y Gratitud',
        tr: 'Övgü ve Şükran Maratonu',
        en: 'Praise & Thanksgiving Marathon',
        it: 'Maratona di Lode e Ringraziamento',
      },
      briefs: {
        es: '3 horas de música continua, testimonios breves de oyentes y gozo en el Espíritu Santo.',
        tr: '3 saatlik kesintisiz tapınma ezgileri ve dinleyici tanıklıkları.',
        en: 'Three hours of continuous praise songs and listener testimonies.',
        it: '3 ore di musica continua e testimonianze di ascoltatori.',
      },
      speaker: 'Equipo de Producción Musical',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sat-16',
      startHour: 16,
      startMin: 0,
      endHour: 18,
      endMin: 0,
      startTime: '16:00',
      endTime: '18:00',
      category: 'oracion',
      categoryKey: 'filter_prayer',
      titles: {
        es: 'Clamor de Matrimonios y Hogares Fuertes',
        tr: 'Evlilikler ve Sağlam Yuvalar İçin Dua',
        en: 'Prayer for Strong Marriages & Homes',
        it: 'Preghiera per Matrimoni e Famiglie Forti',
      },
      briefs: {
        es: 'Intercesión por la santidad del hogar, protección divina contra la discordia y unidad conyugal.',
        tr: 'Aile kutsallığı, evlilik birliği ve çocukların korunması için şefaat.',
        en: 'Intercession for home holiness, marital unity, and divine family protection.',
        it: 'Intercessione per la santità della casa e l\'unità coniugale.',
      },
      speaker: 'Pastores Consejeros',
      cover: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sat-18',
      startHour: 18,
      startMin: 0,
      endHour: 21,
      endMin: 0,
      startTime: '18:00',
      endTime: '21:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Culto de Vísperas y Preparación Dominical',
        tr: 'Pazar Hazırlığı ve İbadet Vakti',
        en: 'Vespers Service & Sunday Preparation',
        it: 'Servizio della Vigilia e Preparazione Domenicale',
      },
      briefs: {
        es: 'Preparando el corazón para el Día del Señor con adoración solemne y reflexión de la Palabra.',
        tr: 'Rabbin Günü için yürekleri hazırlayan tapınma ve vaaz.',
        en: 'Preparing hearts for the Lord\'s Day with reverent praise and scripture.',
        it: 'Preparare i cuori per il Giorno del Signore con adorazione solenne.',
      },
      speaker: 'Pr. Daniel Salazar',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sat-21',
      startHour: 21,
      startMin: 0,
      endHour: 24,
      endMin: 0,
      startTime: '21:00',
      endTime: '00:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Vigilia de Adoración y Paz',
        tr: 'Tapınma ve Barış Nöbeti',
        en: 'Vigil of Worship and Peace',
        it: 'Veglia di Adorazione e Pace',
      },
      briefs: {
        es: 'Cierre del sábado bajo el manto de la gracia y la bendición del Todopoderoso.',
        tr: 'Cumartesi gününün şükranla kapanışı ve esenlik duası.',
        en: 'Closing Saturday under God\'s mantle of grace and peace.',
        it: 'Chiusura del sabato sotto la grazia e la benedizione.',
      },
      speaker: 'Equipo de Transmisión',
      cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    },
  ],

  // DOMINGO
  sunday: [
    {
      id: 'sun-00',
      startHour: 0,
      startMin: 0,
      endHour: 7,
      endMin: 0,
      startTime: '00:00',
      endTime: '07:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Noches de Paz y Clamor — Amanecer del Día del Señor',
        tr: 'Huzur ve Yakarma — Rabbin Günü Şafağı',
        en: 'Nights of Peace & Cry — Dawn of the Lord\'s Day',
        it: 'Notti di Pace e Supplica — Alba del Giorno del Signore',
      },
      briefs: {
        es: 'Alabanzas sacras celebrando la Resurrección y la victoria de Jesucristo.',
        tr: 'İsa Mesih\'in dirilişini ve zaferini kutlayan kutsal ezgiler.',
        en: 'Sacred praises celebrating Christ\'s resurrection and triumph.',
        it: 'Lodi sacre celebrando la Risurrezione di Gesù Cristo.',
      },
      speaker: 'Equipo de Vigilia Nocturna',
      cover: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sun-07',
      startHour: 7,
      startMin: 0,
      endHour: 9,
      endMin: 0,
      startTime: '07:00',
      endTime: '09:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Escuela Dominical al Aire',
        tr: 'Radyoda Pazar Okulu',
        en: 'Sunday School On Air',
        it: 'Scuola Domenicale On Air',
      },
      briefs: {
        es: 'Lecciones sistemáticas de doctrina cristiana, historia eclesiástica y teología bíblica.',
        tr: 'Hristiyan doktrini, kilise tarihi ve Kutsal Kitap teolojisi dersleri.',
        en: 'Systematic lessons on Christian doctrine, church history, and biblical theology.',
        it: 'Lezioni sistematiche di dottrina cristiana e teologia biblica.',
      },
      speaker: 'Maestros del Instituto Bíblico',
      cover: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sun-09',
      startHour: 9,
      startMin: 0,
      endHour: 10,
      endMin: 0,
      startTime: '09:00',
      endTime: '10:00',
      category: 'oracion',
      categoryKey: 'filter_prayer',
      titles: {
        es: 'Oración de Consagración Dominical',
        tr: 'Pazar Günü Adanma Duası',
        en: 'Sunday Consecration Prayer',
        it: 'Preghiera di Consacrazione Domenicale',
      },
      briefs: {
        es: 'Clamor por los pastores, púlpitos y almas que escucharán la Palabra en todas las iglesias.',
        tr: 'Kürsüler, vaizler ve sözü duyacak canlar için dua vakti.',
        en: 'Prayer for pastors, pulpits, and all souls who will hear the Word.',
        it: 'Preghiera per i pastori, i pulpiti e tutte le anime che ascolteranno la Parola.',
      },
      speaker: 'Pastores del Presbiterio',
      cover: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sun-10',
      startHour: 10,
      startMin: 0,
      endHour: 13,
      endMin: 0,
      startTime: '10:00',
      endTime: '13:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Transmisión Central del Culto Dominical',
        tr: 'Pazar Büyük İbadeti Canlı Yayını',
        en: 'Sunday Main Worship Service Broadcast',
        it: 'Trasmissione Principale del Servizio Domenicale',
      },
      briefs: {
        es: 'Culto completo de adoración, cánticos en vivo, santa cena mensual y predicación ungida de la Palabra.',
        tr: 'Canlı tapınma, ilahiler ve Tanrı Sözü\'nün esinli vaazı ile tam ibadet yayını.',
        en: 'Complete service with live worship, hymns, and anointed preaching of the Word.',
        it: 'Servizio completo con lode dal vivo, inni e predicazione unta della Parola.',
      },
      speaker: 'Pastor Daniel Salazar & Ministros Invitados',
      cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sun-13',
      startHour: 13,
      startMin: 0,
      endHour: 16,
      endMin: 0,
      startTime: '13:00',
      endTime: '16:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Alabanzas del Bósforo Dominical',
        tr: 'Pazar Boğaziçi Ezgileri',
        en: 'Sunday Bosphorus Praises',
        it: 'Lodi del Bosforo Domenicale',
      },
      briefs: {
        es: 'Música de alabanza ininterrumpida y testimonios de creyentes en Turquía y los Balcanes.',
        tr: 'Türkiye ve Balkanlar\'daki kardeşlerin tanıklıklarıyla dolu tapınma saati.',
        en: 'Continuous praise songs and faith testimonies from Turkey and the Balkans.',
        it: 'Musica di lode e testimonianze da Turchia e Balcani.',
      },
      speaker: 'Equipo de Radio',
      cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sun-16',
      startHour: 16,
      startMin: 0,
      endHour: 18,
      endMin: 0,
      startTime: '16:00',
      endTime: '18:00',
      category: 'mision',
      categoryKey: 'filter_mission',
      titles: {
        es: 'Voz de Esperanza — Reporte Misionero Global',
        tr: 'Umut Sesi — Küresel Müjde Raporu',
        en: 'Voice of Hope — Global Mission Report',
        it: 'Voce di Speranza — Resoconto Missionario Globale',
      },
      briefs: {
        es: 'Noticias del avance del Evangelio en los 5 continentes a través del Movimiento Misionero Mundial.',
        tr: 'Dünya çapında müjdenin yayılışı ve küresel hizmet tanıklıkları.',
        en: 'Updates on gospel advances across five continents through the worldwide missionary work.',
        it: 'Notizie sull\'avanzamento del Vangelo nei cinque continenti.',
      },
      speaker: 'Pr. David Ortiz',
      cover: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sun-18',
      startHour: 18,
      startMin: 0,
      endHour: 21,
      endMin: 0,
      startTime: '18:00',
      endTime: '21:00',
      category: 'biblia',
      categoryKey: 'filter_bible',
      titles: {
        es: 'Culto Evangelístico y Llamado de Salvación',
        tr: 'Müjdeleme ve Kurtuluş Çağrısı Toplantısı',
        en: 'Evangelistic Service & Salvation Call',
        it: 'Servizio Evangelistico e Chiamata alla Salvezza',
      },
      briefs: {
        es: 'Mensaje directo al corazón que proclama que Jesús salva, sana y viene pronto por su Iglesia.',
        tr: 'İsa Mesih\'in kurtaran ve şifa veren sevgisini duyuran doğrudan mesaj.',
        en: 'A heartfelt message proclaiming that Jesus saves, heals, and is coming soon for His bride.',
        it: 'Messaggio evangelistico: Gesù salva, guarisce e ritorna presto.',
      },
      speaker: 'Cuerpo Pastoral',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sun-21',
      startHour: 21,
      startMin: 0,
      endHour: 24,
      endMin: 0,
      startTime: '21:00',
      endTime: '00:00',
      category: 'adoracion',
      categoryKey: 'filter_worship',
      titles: {
        es: 'Vigilia de Adoración y Paz — Cierre Semanal',
        tr: 'Haftalık Kapanış Tapınma ve Barış Nöbeti',
        en: 'Worship & Peace Vigil — Weekly Closing',
        it: 'Veglia di Adorazione e Pace — Chiusura Settimanale',
      },
      briefs: {
        es: 'Despedida del Día del Señor con bendición pastoral solemne para toda la semana por venir.',
        tr: 'Yeni hafta için bereket duası ve Rabbin huzurunda gecenin tamamlanması.',
        en: 'Farewell to the Lord\'s Day with solemn blessing for the incoming week.',
        it: 'Chiusura del Giorno del Signore con benedizione per la nuova settimana.',
      },
      speaker: 'Equipo de Transmisión',
      cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    },
  ],
};

// Mapeo numérico de días JS (0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb)
const DAY_INDEX_TO_KEY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const DAY_NAMES_LOCALIZED = {
  es: {
    sunday: 'Domingo',
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
  },
  tr: {
    sunday: 'Pazar',
    monday: 'Pazartesi',
    tuesday: 'Salı',
    wednesday: 'Çarşamba',
    thursday: 'Perşembe',
    friday: 'Cuma',
    saturday: 'Cumartesi',
  },
  en: {
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
  },
  it: {
    sunday: 'Domenica',
    monday: 'Lunedì',
    tuesday: 'Martedì',
    wednesday: 'Mercoledì',
    thursday: 'Giovedì',
    friday: 'Viernes',
    saturday: 'Sabato',
  },
};

const CATEGORY_NAMES_LOCALIZED = {
  es: {
    adoracion: 'Alabanza & Adoración',
    biblia: 'Estudio Bíblico',
    oracion: 'Oración e Intercesión',
    mision: 'Testimonios Misioneros',
  },
  tr: {
    adoracion: 'Övgü ve Tapınma',
    biblia: 'Kutsal Kitap Çalışması',
    oracion: 'Dua ve Şefaat',
    mision: 'Müjde Tanıklıkları',
  },
  en: {
    adoracion: 'Praise & Worship',
    biblia: 'Bible Study',
    oracion: 'Prayer & Intercession',
    mision: 'Missionary Testimonies',
  },
  it: {
    adoracion: 'Lode & Adorazione',
    biblia: 'Studio Biblico',
    oracion: 'Preghiera & Intercessione',
    mision: 'Testimonianze Missionarie',
  },
};

// ============================================================================
// CLASE CONTROLADORA: RadioScheduleEngine
// ============================================================================
class RadioScheduleEngine {
  constructor() {
    this.selectedDayKey = 'today';
    this.activeFilter = 'all';
    this.tickerTimer = null;

    // Cache de elementos del DOM
    this.containerTimeline = null;
    this.tabsScrollWrapper = null;
    this.categoryFilters = null;
    this.tabDateToday = null;
    this.tabDateTomorrow = null;

    // Elementos de la consola de radio en vivo para sincronización
    this.liveShowTitle = null;
    this.liveShowHost = null;
    this.liveShowDesc = null;
    this.liveShowSlot = null;
    this.liveShowCover = null;
    this.liveShowStartTime = null;
    this.liveShowEndTime = null;
    this.liveShowRemaining = null;
    this.liveShowProgressFill = null;
    this.nextShowTitleTeaser = null;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.cacheDomElements();
    this.updateDateLabels();
    this.bindDayTabs();
    this.bindCategoryFilters();
    this.syncCurrentLiveShow();
    this.renderSchedule();

    // Actualizar reloj cada 60 segundos para mantener el programa en vivo en tiempo real
    this.tickerTimer = setInterval(() => {
      this.syncCurrentLiveShow();
      // Si el usuario está viendo el tab de "hoy", refrescar la lista para actualizar badges
      if (this.selectedDayKey === 'today' || this.selectedDayKey === this.getTodayDayKey()) {
        this.renderSchedule();
      }
    }, 60000);

    // Escuchar cambios de idioma
    document.addEventListener('idiomaCambiado', () => {
      this.updateDateLabels();
      this.syncCurrentLiveShow();
      this.renderSchedule();
    });

    console.log('📅 [RadioScheduleEngine] Motor de programación inicializado.');
  }

  cacheDomElements() {
    this.containerTimeline = document.getElementById('scheduleTimelineList');
    this.tabsScrollWrapper = document.getElementById('daysTabsContainer');
    this.categoryFilters = document.querySelectorAll('.schedule-categories-filter .cat-pill-btn');
    this.tabDateToday = document.getElementById('tabDateToday');
    this.tabDateTomorrow = document.getElementById('tabDateTomorrow');

    // Elementos del reproductor maestro en index.html
    this.liveShowTitle = document.getElementById('currentShowTitle');
    this.liveShowHost = document.getElementById('currentShowHost');
    this.liveShowDesc = document.getElementById('currentShowDesc');
    this.liveShowSlot = document.getElementById('currentShowSlot');
    this.liveShowCover = document.getElementById('currentShowCover');
    this.liveShowStartTime = document.getElementById('currentShowStartTime');
    this.liveShowEndTime = document.getElementById('currentShowEndTime');
    this.liveShowRemaining = document.getElementById('currentShowRemaining');
    this.liveShowProgressFill = document.getElementById('showProgressFill');
    this.nextShowTitleTeaser = document.getElementById('nextShowTitleTeaser');
  }

  /**
   * Obtiene la clave del día actual (monday, tuesday, etc.)
   */
  getTodayDayKey() {
    const todayIndex = new Date().getDay();
    return DAY_INDEX_TO_KEY[todayIndex];
  }

  /**
   * Obtiene la clave del día de mañana
   */
  getTomorrowDayKey() {
    const tomorrowIndex = (new Date().getDay() + 1) % 7;
    return DAY_INDEX_TO_KEY[tomorrowIndex];
  }

  /**
   * Resuelve el día efectivo a mostrar
   */
  getEffectiveDayKey(dayCode) {
    if (dayCode === 'today') return this.getTodayDayKey();
    if (dayCode === 'tomorrow') return this.getTomorrowDayKey();
    return dayCode;
  }

  /**
   * Obtiene el idioma actualmente activo (es, tr, en, it)
   */
  getCurrentLang() {
    try {
      const saved = localStorage.getItem('radio_idioma_preferido');
      if (saved && ['es', 'tr', 'en', 'it'].includes(saved)) return saved;
    } catch {
      // Ignorar
    }
    const htmlLang = document.documentElement.lang;
    if (['es', 'tr', 'en', 'it'].includes(htmlLang)) return htmlLang;
    return 'es';
  }

  /**
   * Actualiza las etiquetas de los botones "Hoy" y "Mañana" con el nombre del día
   */
  updateDateLabels() {
    const lang = this.getCurrentLang();
    const todayKey = this.getTodayDayKey();
    const tomorrowKey = this.getTomorrowDayKey();

    const todayName = DAY_NAMES_LOCALIZED[lang]?.[todayKey] || DAY_NAMES_LOCALIZED.es[todayKey];
    const tomorrowName = DAY_NAMES_LOCALIZED[lang]?.[tomorrowKey] || DAY_NAMES_LOCALIZED.es[tomorrowKey];

    if (this.tabDateToday) this.tabDateToday.textContent = todayName;
    if (this.tabDateTomorrow) this.tabDateTomorrow.textContent = tomorrowName;
  }

  /**
   * Enlazar clics en las pestañas de días
   */
  bindDayTabs() {
    if (!this.tabsScrollWrapper) return;

    this.tabsScrollWrapper.addEventListener('click', (e) => {
      const btn = e.target.closest('.day-tab-btn');
      if (!btn) return;

      const targetDay = btn.getAttribute('data-day');
      if (!targetDay) return;

      // Actualizar estado visual
      this.tabsScrollWrapper.querySelectorAll('.day-tab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      this.selectedDayKey = targetDay;
      this.renderSchedule();
    });
  }

  /**
   * Enlazar clics en los botones de filtro por categoría
   */
  bindCategoryFilters() {
    if (!this.categoryFilters) return;

    this.categoryFilters.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.categoryFilters.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        this.activeFilter = btn.getAttribute('data-filter') || 'all';
        this.renderSchedule();
      });
    });
  }

  /**
   * Determina el estado de un programa según la hora actual
   */
  calculateProgramStatus(prog, isToday) {
    if (!isToday) {
      return { status: 'scheduled', labelKey: 'status_scheduled', defaultText: 'Programado' };
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const startTotal = prog.startHour * 60 + prog.startMin;
    let endTotal = prog.endHour * 60 + prog.endMin;
    if (prog.endHour === 24 || (prog.endHour === 0 && startTotal > 0)) {
      endTotal = 24 * 60;
    }

    // Caso 1: En emisión en este momento
    if (currentMinutes >= startTotal && currentMinutes < endTotal) {
      return { status: 'on-air', labelKey: 'status_live', defaultText: 'AL AIRE AHORA' };
    }

    // Caso 2: Ya finalizó hoy
    if (currentMinutes >= endTotal) {
      return { status: 'completed', labelKey: 'status_ended', defaultText: 'Finalizado' };
    }

    // Caso 3: Próximo o programado para más tarde
    // Verificar si es el programa inmediatamente posterior
    return { status: 'upcoming', labelKey: 'status_scheduled', defaultText: 'Programado' };
  }

  /**
   * Sincroniza el programa al aire actual con la consola maestra del reproductor
   */
  syncCurrentLiveShow() {
    const todayKey = this.getTodayDayKey();
    const programsToday = WEEKLY_SCHEDULE_DATA[todayKey] || [];
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const lang = this.getCurrentLang();

    let currentProgram = null;
    let nextProgram = null;

    for (let i = 0; i < programsToday.length; i++) {
      const prog = programsToday[i];
      const start = prog.startHour * 60 + prog.startMin;
      let end = prog.endHour * 60 + prog.endMin;
      if (prog.endHour === 24 || (prog.endHour === 0 && start > 0)) end = 24 * 60;

      if (currentMinutes >= start && currentMinutes < end) {
        currentProgram = prog;
        nextProgram = programsToday[i + 1] || null;
        break;
      }
    }

    // Fallback: Si no coincide por rango exacto, tomar el más cercano
    if (!currentProgram && programsToday.length > 0) {
      currentProgram = programsToday[0];
      nextProgram = programsToday[1] || null;
    }

    // Si no hay próximo hoy, tomar el primer programa de mañana
    if (!nextProgram) {
      const tomorrowKey = this.getTomorrowDayKey();
      const tomorrowPrograms = WEEKLY_SCHEDULE_DATA[tomorrowKey] || [];
      nextProgram = tomorrowPrograms[0] || null;
    }

    // Actualizar elementos de la interfaz maestra
    if (currentProgram) {
      const title = currentProgram.titles[lang] || currentProgram.titles.es;
      const brief = currentProgram.briefs[lang] || currentProgram.briefs.es;

      if (this.liveShowTitle) this.liveShowTitle.textContent = title;
      if (this.liveShowHost) this.liveShowHost.textContent = currentProgram.speaker;
      if (this.liveShowDesc) this.liveShowDesc.textContent = brief;
      if (this.liveShowSlot) this.liveShowSlot.textContent = `${currentProgram.startTime} - ${currentProgram.endTime} (Hora Estambul)`;
      if (this.liveShowCover && currentProgram.cover) {
        this.liveShowCover.src = currentProgram.cover;
        this.liveShowCover.alt = title;
      }
      if (this.liveShowStartTime) this.liveShowStartTime.textContent = currentProgram.startTime;
      if (this.liveShowEndTime) this.liveShowEndTime.textContent = currentProgram.endTime;

      // Calcular progreso del bloque del programa
      const startMinTotal = currentProgram.startHour * 60 + currentProgram.startMin;
      let endMinTotal = currentProgram.endHour * 60 + currentProgram.endMin;
      if (currentProgram.endHour === 24 || (currentProgram.endHour === 0 && startMinTotal > 0)) {
        endMinTotal = 24 * 60;
      }
      const totalDuration = Math.max(1, endMinTotal - startMinTotal);
      const elapsed = Math.max(0, currentMinutes - startMinTotal);
      const percent = Math.min(100, Math.max(5, (elapsed / totalDuration) * 100));

      if (this.liveShowProgressFill) {
        this.liveShowProgressFill.style.width = `${percent.toFixed(1)}%`;
      }
      if (this.liveShowRemaining) {
        const remaining = Math.max(0, totalDuration - elapsed);
        const elapsedText = lang === 'tr' ? `Yayında geçen: ${elapsed} dk`
          : lang === 'en' ? `Time on air: ${elapsed} min`
          : lang === 'it' ? `Tempo in onda: ${elapsed} min`
          : `Tiempo en el aire: ${elapsed} min`;
        this.liveShowRemaining.textContent = elapsedText;
      }
    }

    // Actualizar Teaser de Próximo Programa
    if (nextProgram && this.nextShowTitleTeaser) {
      const nextTitle = nextProgram.titles[lang] || nextProgram.titles.es;
      this.nextShowTitleTeaser.textContent = `${nextTitle} (${nextProgram.startTime})`;

      const teaserParent = this.nextShowTitleTeaser.closest('.teaser-item');
      if (teaserParent) {
        const hostEl = teaserParent.querySelector('.teaser-host');
        if (hostEl) hostEl.textContent = `con ${nextProgram.speaker}`;
      }
    }
  }

  /**
   * Renderiza la lista cronológica de programas en el DOM
   */
  renderSchedule() {
    if (!this.containerTimeline) return;

    const effectiveDayKey = this.getEffectiveDayKey(this.selectedDayKey);
    const isToday = effectiveDayKey === this.getTodayDayKey();
    const rawPrograms = WEEKLY_SCHEDULE_DATA[effectiveDayKey] || [];
    const lang = this.getCurrentLang();

    // Filtrar por categoría
    const filteredPrograms = this.activeFilter === 'all'
      ? rawPrograms
      : rawPrograms.filter((p) => p.category === this.activeFilter);

    // Si no hay programas coincidentes
    if (filteredPrograms.length === 0) {
      const emptyMsg = lang === 'tr' ? 'Bu kategori için seçilen günde program bulunamadı.'
        : lang === 'en' ? 'No programs found for this category on the selected day.'
        : lang === 'it' ? 'Nessun programma trovato per questa categoria nel giorno selezionato.'
        : 'No se encontraron programas para esta categoría en el día seleccionado.';

      this.containerTimeline.innerHTML = `
        <div class="fonoteca-empty-notice" style="grid-column: 1 / -1; padding: 2.5rem 1.5rem; text-align: center;">
          <span class="material-symbols-outlined" style="font-size: 40px; color: var(--gold-bright); margin-bottom: 0.5rem; display: block;">calendar_month</span>
          <p style="color: var(--text-muted); font-size: 0.95rem;">${emptyMsg}</p>
        </div>
      `;
      return;
    }

    // Construir markup HTML
    let html = '';
    filteredPrograms.forEach((prog, index) => {
      const title = prog.titles[lang] || prog.titles.es;
      const brief = prog.briefs[lang] || prog.briefs.es;
      const catLabel = CATEGORY_NAMES_LOCALIZED[lang]?.[prog.category] || CATEGORY_NAMES_LOCALIZED.es[prog.category];

      // Determinar estado
      let cardClass = 'program-card';
      let tagStatusClass = 'status-tag status-scheduled';
      let tagStatusText = lang === 'tr' ? 'Programlandı' : lang === 'en' ? 'Scheduled' : lang === 'it' ? 'Programmato' : 'Programado';
      let isOnAir = false;

      if (isToday) {
        const now = new Date();
        const currentMin = now.getHours() * 60 + now.getMinutes();
        const startMin = prog.startHour * 60 + prog.startMin;
        let endMin = prog.endHour * 60 + prog.endMin;
        if (prog.endHour === 24 || (prog.endHour === 0 && startMin > 0)) endMin = 24 * 60;

        if (currentMin >= startMin && currentMin < endMin) {
          cardClass += ' on-air';
          tagStatusClass = 'status-tag status-live';
          tagStatusText = lang === 'tr' ? '🔴 CANLI YAYINDA' : lang === 'en' ? '🔴 LIVE ON AIR' : lang === 'it' ? '🔴 IN DIRETTA ORA' : '🔴 AL AIRE AHORA';
          isOnAir = true;
        } else if (currentMin >= endMin) {
          cardClass += ' completed';
          tagStatusClass = 'status-tag status-ended';
          tagStatusText = lang === 'tr' ? 'Tamamlandı' : lang === 'en' ? 'Ended' : lang === 'it' ? 'Concluso' : 'Finalizado';
        } else {
          cardClass += ' upcoming';
          tagStatusClass = 'status-tag status-scheduled';
          tagStatusText = lang === 'tr' ? 'Yakında' : lang === 'en' ? 'Upcoming' : lang === 'it' ? 'Prossimo' : 'Próximo';
        }
      }

      const listenBtnText = lang === 'tr' ? 'Dinle' : lang === 'en' ? 'Tune In' : lang === 'it' ? 'Ascolta' : 'Sintonizar';
      const livePulseBadge = isOnAir ? `<span class="badge-live-pulse">🔴 EN TRANSMISIÓN</span>` : '';

      const tuneInBtn = isOnAir
        ? `
          <button class="btn-listen-card" onclick="document.getElementById('masterPlayBtn').click();" aria-label="Sintonizar ${title}">
            <span class="material-symbols-outlined">volume_up</span>
            <span>${listenBtnText}</span>
          </button>
        `
        : `
          <button class="btn-listen-card" style="opacity: 0.7; background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.1);" onclick="window.RadioSchedule.showReminderNotice('${title.replace(/'/g, "\\'")}', '${prog.startTime}');" title="Recordatorio">
            <span class="material-symbols-outlined">notifications</span>
            <span>${prog.startTime}</span>
          </button>
        `;

      html += `
        <div class="${cardClass}" data-program-id="${prog.id}" data-category="${prog.category}">
          <div class="time-col">
            <span class="time-range">${prog.startTime} - ${prog.endTime}</span>
            <span class="${tagStatusClass}">${tagStatusText}</span>
          </div>
          <div class="content-col">
            <div class="program-tags">
              <span class="badge-cat">${catLabel}</span>
              ${livePulseBadge}
            </div>
            <h3 class="program-name">${title}</h3>
            <p class="program-brief">${brief}</p>
            <div class="program-speaker">
              <span class="material-symbols-outlined">person</span> ${prog.speaker}
            </div>
          </div>
          ${tuneInBtn}
        </div>
      `;
    });

    this.containerTimeline.innerHTML = html;
  }

  /**
   * Muestra aviso de recordatorio para un programa futuro
   */
  showReminderNotice(programTitle, startTime) {
    const lang = this.getCurrentLang();
    const msg = lang === 'tr' ? `"${programTitle}" programı ${startTime}'de başlayacak. Hatırlatıcı kuruldu!`
      : lang === 'en' ? `"${programTitle}" will air at ${startTime}. Reminder noted!`
      : lang === 'it' ? `"${programTitle}" andrà in onda alle ${startTime}. Promemoria salvato!`
      : `¡Anotado! "${programTitle}" se emitirá a las ${startTime}.`;

    if (window.RadioPlayer && typeof window.RadioPlayer.showToastNotification === 'function') {
      window.RadioPlayer.showToastNotification(msg);
    } else {
      let toast = document.getElementById('radioToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'radioToast';
        toast.className = 'radio-toast-notification';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 4000);
    }
  }

  /**
   * API Pública para acceso desde otros módulos o consola
   */
  selectDay(dayKey) {
    this.selectedDayKey = dayKey;
    const tabBtn = this.tabsScrollWrapper?.querySelector(`[data-day="${dayKey}"]`);
    if (tabBtn) {
      this.tabsScrollWrapper.querySelectorAll('.day-tab-btn').forEach((b) => b.classList.remove('active'));
      tabBtn.classList.add('active');
    }
    this.renderSchedule();
  }

  filterCategory(catKey) {
    this.activeFilter = catKey;
    const catBtn = document.querySelector(`.schedule-categories-filter [data-filter="${catKey}"]`);
    if (catBtn) {
      this.categoryFilters?.forEach((b) => b.classList.remove('active'));
      catBtn.classList.add('active');
    }
    this.renderSchedule();
  }
}

// Instanciar y exportar a window para interoperabilidad global
const RadioScheduleInstance = new RadioScheduleEngine();
window.RadioSchedule = RadioScheduleInstance;
export default RadioScheduleInstance;

 // ======================================================================
    // 1. CONTROL DEL CARRUSEL HERO
    // ======================================================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');

    window.setSlide = function(index) {
      if (slides.length === 0) return;
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');

      const prevVideo = slides[currentSlide].querySelector('video');
      if (prevVideo) prevVideo.pause();

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');

      const nextVideo = slides[currentSlide].querySelector('video');
      if (nextVideo) nextVideo.play().catch(() => {});
    };

    setInterval(() => {
      setSlide(currentSlide + 1);
    }, 10000);

    // ======================================================================
    // 2. REPRODUCTOR DE RADIO ONLINE 24/7 (HTML5 AUDIO + MEDIA SESSION)
    // ======================================================================
    const radioAudio = document.getElementById('mainRadioStream');
    const radioPlayBtn = document.getElementById('radioPlayBtn');
    const radioIcon = document.getElementById('radioIcon');
    const radioPlayBtnText = document.getElementById('radioPlayBtnText');
    const radioVisualizer = document.getElementById('radioVisualizer');
    const radioStatus = document.getElementById('radioStatus');
    const radioVolume = document.getElementById('radioVolume');
    const volumeIcon = document.getElementById('volumeIcon');

    let isRadioPlaying = false;

    function updateMediaSession() {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Radio Esperanza Turquía',
          artist: 'Alabanzas & Lectura Bíblica',
          album: 'Transmisión Continua 24/7',
          artwork: [
            { src: 'https://tdcmhk.b-cdn.net/coverlinkredeswp.webp', sizes: '512x512', type: 'image/webp' }
          ]
        });

        navigator.mediaSession.setActionHandler('play', () => toggleRadio(true));
        navigator.mediaSession.setActionHandler('pause', () => toggleRadio(false));
      }
    }

    function toggleRadio(forcePlay) {
      const shouldPlay = forcePlay !== undefined ? forcePlay : !isRadioPlaying;

      if (shouldPlay) {
        radioAudio.play().then(() => {
          isRadioPlaying = true;
          radioPlayBtn.classList.add('playing');
          radioIcon.textContent = 'pause_circle';
          radioPlayBtnText.textContent = '⏸ Pausar Radio';
          radioVisualizer.classList.add('active');
          radioStatus.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px; color:#22c55e;">graphic_eq</span> <span style="color:#86efac;">Transmitiendo en vivo — Alabanzas y Esperanza</span>';
          updateMediaSession();
        }).catch((err) => {
          console.warn('Audio play error, reintentando:', err);
          // Reintentar o feedback
          radioStatus.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px; color:#f59e0b;">refresh</span> Conectando al servidor de audio...';
        });
      } else {
        radioAudio.pause();
        isRadioPlaying = false;
        radioPlayBtn.classList.remove('playing');
        radioIcon.textContent = 'play_circle';
        radioPlayBtnText.textContent = '▶ Reproducir Radio';
        radioVisualizer.classList.remove('active');
        radioStatus.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">radio</span> Transmisión pausada';
      }
    }

    if (radioPlayBtn) {
      radioPlayBtn.addEventListener('click', () => toggleRadio());
    }

    if (radioVolume) {
      radioVolume.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        radioAudio.volume = val;
        if (val === 0) {
          volumeIcon.textContent = 'volume_off';
        } else if (val < 0.5) {
          volumeIcon.textContent = 'volume_down';
        } else {
          volumeIcon.textContent = 'volume_up';
        }
      });
    }

    // ======================================================================
    // 3. FORMULARIO DE CONTACTO Y SOLICITUD (ALMACENAMIENTO + CONFIRMACIÓN)
    // ======================================================================
    const contactForm = document.getElementById('contactRequestForm');
    const formSuccessAlert = document.getElementById('formSuccessAlert');
    const btnSubmitForm = document.getElementById('btnSubmitForm');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
          nombre: document.getElementById('inputName').value.trim(),
          email: document.getElementById('inputEmail').value.trim(),
          whatsapp: document.getElementById('inputWhatsapp').value.trim(),
          pais_iglesia: document.getElementById('inputCountry').value.trim(),
          motivo: document.getElementById('selectReason').value,
          mensaje: document.getElementById('textareaMessage').value.trim(),
          fecha: new Date().toISOString()
        };

        // Guardar solicitud en localStorage para respaldo seguro
        try {
          const prev = JSON.parse(localStorage.getItem('solicitudes_contacto') || '[]');
          prev.push(formData);
          localStorage.setItem('solicitudes_contacto', JSON.stringify(prev));
        } catch (err) {
          console.error('Error guardando solicitud local:', err);
        }

        // Feedback al usuario
        btnSubmitForm.disabled = true;
        btnSubmitForm.innerHTML = '<span class="material-symbols-outlined">done</span> Solicitud Enviada';

        formSuccessAlert.classList.add('show');
        formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        contactForm.reset();

        setTimeout(() => {
          btnSubmitForm.disabled = false;
          btnSubmitForm.innerHTML = '<span class="material-symbols-outlined">send</span> <span data-i18n="btn_submit_form">Enviar mi Solicitud</span>';
        }, 5000);
      });
    }
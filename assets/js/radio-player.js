/**
 * ============================================================================
 * MMM TURQUÍA — RADIO ESPERANZA 24/7 & FONOTECA
 * Motor Principal del Reproductor de Audio (radio-player.js)
 * ============================================================================
 * Proporciona:
 *   1. Streaming en directo 24/7 con reconexión automática y buffer resiliente.
 *   2. Controles de cabina: Play/Pause, volumen persistente, mute y ecualizador animado.
 *   3. Sincronización con Navigator MediaSession API (pantalla de bloqueo Android/iOS/Bluetooth).
 *   4. Reproductor flotante a la carta (Sticky Mini-Player) para episodios y podcasts.
 *   5. Control de búsqueda y filtrado dinámico en la Fonoteca / Grabaciones.
 *   6. Herramientas complementarias: Compartir señal en vivo, PWA install prompt y formulario pastoral.
 */

// ============================================================================
// CONFIGURACIÓN Y ESTADO GLOBAL
// ============================================================================
const RADIO_CONFIG = {
  // Servidores de streaming en vivo (primario y espejos de respaldo)
  streams: [
    'https://stream.zeno.fm/f3wvbbqmdg8uv', // Stream principal de Radio Esperanza
    'https://stream-162.zeno.fm/f3wvbbqmdg8uv?zs=stream', // Espejo CDN alternativo
  ],
  defaultVolume: 0.8,
  reconnectTimeoutMs: 5000,
  maxReconnectAttempts: 4,
  listenersBase: 128,
};

class RadioPlayerEngine {
  constructor() {
    this.audioLive = null;
    this.audioOnDemand = null;
    this.currentStreamIndex = 0;
    this.reconnectAttempts = 0;
    this.reconnectTimer = null;
    this.listenersTimer = null;
    this.progressTimer = null;

    // Estado
    this.isPlayingLive = false;
    this.isPlayingOnDemand = false;
    this.isConnecting = false;
    this.isMuted = false;
    this.volume = this.loadSavedVolume();
    this.currentEpisodePlaying = null;
    this.deferredPwaPrompt = null;

    // Inicializar cuando el DOM esté disponible
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  /**
   * Cargar volumen guardado en localStorage o valor por defecto
   */
  loadSavedVolume() {
    try {
      const saved = localStorage.getItem('radio_player_volume');
      if (saved !== null) {
        const val = parseFloat(saved);
        if (!isNaN(val) && val >= 0 && val <= 1) return val;
      }
    } catch {
      // Ignorar errores de localStorage en entornos restringidos
    }
    return RADIO_CONFIG.defaultVolume;
  }

  saveVolume(vol) {
    try {
      localStorage.setItem('radio_player_volume', vol.toString());
    } catch {
      // Ignorar
    }
  }

  // ==========================================================================
  // INICIALIZACIÓN DE ELEMENTOS Y EVENTOS
  // ==========================================================================
  init() {
    this.cacheElements();
    this.setupLiveAudio();
    this.setupOnDemandAudio();
    this.bindLiveControls();
    this.bindOnDemandControls();
    this.bindFonotecaFilters();
    this.bindNavigationAndUi();
    this.bindPastoralForm();
    this.setupMediaSession();
    this.startListenersSimulator();
    this.startLiveProgressTracker();

    console.log('📻 [RadioPlayerEngine] Inicializado correctamente.');
  }

  cacheElements() {
    // Live Player
    this.audioLive = document.getElementById('liveRadioAudio');
    this.btnMasterPlay = document.getElementById('masterPlayBtn');
    this.iconMasterPlay = document.getElementById('masterPlayIcon');
    this.textMasterPlay = document.getElementById('masterPlayText');
    this.equalizerBars = document.getElementById('audioEqualizerBars');
    this.volumeSlider = document.getElementById('volumeSlider');
    this.btnMuteToggle = document.getElementById('muteToggleBtn');
    this.iconVolume = document.getElementById('volumeIcon');
    this.labelVolumeValue = document.getElementById('volumeValueLabel');
    this.streamStatusAlert = document.getElementById('streamStatusAlert');
    this.streamStatusMsg = document.getElementById('streamStatusMessage');
    this.listenersCount = document.getElementById('currentListenersCount');
    this.btnShareStream = document.getElementById('shareStreamBtn');
    this.btnPwaInstall = document.getElementById('openPwaInstallBtn');

    // Live Meta
    this.currentShowTitle = document.getElementById('currentShowTitle');
    this.currentShowHost = document.getElementById('currentShowHost');
    this.currentShowCover = document.getElementById('currentShowCover');
    this.showProgressFill = document.getElementById('showProgressFill');
    this.currentShowRemaining = document.getElementById('currentShowRemaining');

    // On-Demand Sticky Mini-Player
    this.audioOnDemand = document.getElementById('onDemandAudioElement');
    this.miniPlayerBar = document.getElementById('onDemandMiniPlayer');
    this.miniTrackTitle = document.getElementById('miniTrackTitle');
    this.miniTrackHost = document.getElementById('miniTrackHost');
    this.miniTrackCover = document.getElementById('miniTrackCover');
    this.btnMiniPlay = document.getElementById('miniPlayBtn');
    this.iconMiniPlay = document.getElementById('miniPlayIcon');
    this.btnMiniRewind = document.getElementById('miniRewindBtn');
    this.btnMiniForward = document.getElementById('miniForwardBtn');
    this.btnMiniClose = document.getElementById('miniCloseBtn');
    this.miniProgressSlider = document.getElementById('miniProgressSlider');
    this.miniCurrentTime = document.getElementById('miniCurrentTime');
    this.miniTotalTime = document.getElementById('miniTotalTime');

    // Fonoteca
    this.podcastSearchInput = document.getElementById('podcastSearchInput');
    this.clearSearchBtn = document.getElementById('clearSearchBtn');
    this.filterChips = document.querySelectorAll('.podcast-filter-tags .filter-chip');
    this.episodeCards = document.querySelectorAll('.episode-card');

    // UI Extra
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.mobileNavDrawer = document.getElementById('mobileNavDrawer');
    this.langDropdownBtn = document.getElementById('langDropdownBtn');
    this.langMenu = document.getElementById('langMenu');
    this.currentLangLabel = document.getElementById('currentLangLabel');
    this.pastoralForm = document.getElementById('pastoralContactForm');
    this.formSuccessNotice = document.getElementById('formSuccessNotice');
  }

  // ==========================================================================
  // CONFIGURACIÓN DE AUDIO EN DIRECTO (LIVE STREAM)
  // ==========================================================================
  setupLiveAudio() {
    if (!this.audioLive) {
      this.audioLive = new Audio();
      this.audioLive.id = 'liveRadioAudio';
      document.body.appendChild(this.audioLive);
    }

    // Configurar stream inicial
    this.setLiveStreamSource(RADIO_CONFIG.streams[this.currentStreamIndex]);
    this.audioLive.volume = this.volume;

    // Actualizar controles de volumen UI
    if (this.volumeSlider) {
      this.volumeSlider.value = this.volume;
    }
    this.updateVolumeUi(this.volume);

    // Eventos del Audio Live
    this.audioLive.addEventListener('play', () => {
      this.isPlayingLive = true;
      this.isConnecting = false;
      this.reconnectAttempts = 0;
      this.updateLiveUiState(true);
      this.setStatusMessage('Transmitiendo en directo — Radio Esperanza 24/7', 'playing');
      this.updateMediaSessionMetadata();
    });

    this.audioLive.addEventListener('pause', () => {
      this.isPlayingLive = false;
      this.updateLiveUiState(false);
      this.setStatusMessage('Transmisión pausada. Haz clic en escuchar para reanudar.', 'paused');
      this.updateMediaSessionMetadata();
    });

    this.audioLive.addEventListener('waiting', () => {
      this.isConnecting = true;
      this.setStatusMessage('Conectando con el servidor de streaming...', 'buffering');
    });

    this.audioLive.addEventListener('playing', () => {
      this.isConnecting = false;
      this.isPlayingLive = true;
      this.updateLiveUiState(true);
    });

    this.audioLive.addEventListener('error', (e) => {
      console.warn('⚠️ Error en live stream:', e);
      this.handleStreamError();
    });

    this.audioLive.addEventListener('stalled', () => {
      if (this.isPlayingLive) {
        this.setStatusMessage('Reconectando buffer de audio...', 'buffering');
      }
    });
  }

  setLiveStreamSource(url) {
    if (!this.audioLive) return;
    // Añadimos parámetro de tiempo para evitar caché de streams cortados
    const separator = url.includes('?') ? '&' : '?';
    this.audioLive.src = `${url}${separator}_t=${Date.now()}`;
  }

  handleStreamError() {
    if (!this.isPlayingLive && !this.isConnecting) return;

    this.reconnectAttempts++;
    if (this.reconnectAttempts <= RADIO_CONFIG.maxReconnectAttempts) {
      this.setStatusMessage(`Reconectando transmisión (intento ${this.reconnectAttempts}/${RADIO_CONFIG.maxReconnectAttempts})...`, 'buffering');
      
      // Probar siguiente espejo de stream si existe
      this.currentStreamIndex = (this.currentStreamIndex + 1) % RADIO_CONFIG.streams.length;
      
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = setTimeout(() => {
        this.setLiveStreamSource(RADIO_CONFIG.streams[this.currentStreamIndex]);
        this.audioLive.play().catch((err) => {
          console.warn('Reintento de reproducción falló:', err);
        });
      }, 2000);
    } else {
      this.isPlayingLive = false;
      this.isConnecting = false;
      this.updateLiveUiState(false);
      this.setStatusMessage('La señal está temporalmente ocupada. Haz clic para reintentar.', 'error');
    }
  }

  // ==========================================================================
  // MANDOS Y CONTROLES DEL REPRODUCTOR EN VIVO
  // ==========================================================================
  bindLiveControls() {
    if (this.btnMasterPlay) {
      this.btnMasterPlay.addEventListener('click', () => {
        this.toggleLivePlayback();
      });
    }

    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.setVolume(val);
      });
    }

    if (this.btnMuteToggle) {
      this.btnMuteToggle.addEventListener('click', () => {
        this.toggleMute();
      });
    }

    if (this.btnShareStream) {
      this.btnShareStream.addEventListener('click', () => {
        this.shareLiveStream();
      });
    }

    if (this.btnPwaInstall) {
      this.btnPwaInstall.addEventListener('click', () => {
        this.triggerPwaInstall();
      });
    }

    // Atajos de teclado accesibles: Espacio para reproducir si la sección está en vista
    window.addEventListener('keydown', (e) => {
      // Ignorar si el usuario está escribiendo en un input o textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.code === 'Space') {
        // Si hay episodio a la carta activo, controla ese; si no, el live
        if (this.isPlayingOnDemand || (this.miniPlayerBar && !this.miniPlayerBar.classList.contains('hidden'))) {
          e.preventDefault();
          this.toggleOnDemandPlayback();
        } else {
          e.preventDefault();
          this.toggleLivePlayback();
        }
      }
    });
  }

  toggleLivePlayback() {
    if (!this.audioLive) return;

    // Si la fonoteca está reproduciendo, pausarla primero
    if (this.isPlayingOnDemand && this.audioOnDemand) {
      this.audioOnDemand.pause();
    }

    if (this.audioLive.paused) {
      this.isConnecting = true;
      this.setStatusMessage('Conectando a Radio Esperanza 24/7...', 'buffering');
      
      // Si la URL estaba vacía o estancada, refrescarla
      if (!this.audioLive.src || this.audioLive.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        this.setLiveStreamSource(RADIO_CONFIG.streams[this.currentStreamIndex]);
      }

      const playPromise = this.audioLive.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlayingLive = true;
            this.isConnecting = false;
            this.updateLiveUiState(true);
          })
          .catch((err) => {
            console.warn('Error al iniciar audio live:', err);
            this.isPlayingLive = false;
            this.isConnecting = false;
            this.updateLiveUiState(false);
            this.setStatusMessage('Haz clic para reproducir la señal en vivo.', 'ready');
          });
      }
    } else {
      this.audioLive.pause();
      this.isPlayingLive = false;
      this.updateLiveUiState(false);
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioLive) this.audioLive.volume = this.volume;
    if (this.audioOnDemand) this.audioOnDemand.volume = this.volume;
    this.isMuted = this.volume === 0;
    this.saveVolume(this.volume);
    this.updateVolumeUi(this.volume);
  }

  toggleMute() {
    if (this.isMuted) {
      // Restaurar volumen previo
      const restoreVal = this.volume > 0 ? this.volume : RADIO_CONFIG.defaultVolume;
      this.setVolume(restoreVal);
      if (this.volumeSlider) this.volumeSlider.value = restoreVal;
    } else {
      // Silenciar
      if (this.audioLive) this.audioLive.volume = 0;
      if (this.audioOnDemand) this.audioOnDemand.volume = 0;
      this.isMuted = true;
      this.updateVolumeUi(0);
      if (this.volumeSlider) this.volumeSlider.value = 0;
    }
  }

  updateVolumeUi(vol) {
    if (this.labelVolumeValue) {
      this.labelVolumeValue.textContent = `${Math.round(vol * 100)}%`;
    }

    if (this.iconVolume) {
      if (vol === 0 || this.isMuted) {
        this.iconVolume.textContent = 'volume_off';
      } else if (vol < 0.4) {
        this.iconVolume.textContent = 'volume_down';
      } else {
        this.iconVolume.textContent = 'volume_up';
      }
    }
  }

  updateLiveUiState(isPlaying) {
    // 1. Icono y texto de botón principal
    if (this.iconMasterPlay) {
      this.iconMasterPlay.textContent = isPlaying ? 'pause' : 'play_arrow';
    }
    if (this.textMasterPlay) {
      this.textMasterPlay.textContent = isPlaying ? 'Pausar Transmisión' : 'Escuchar en Vivo';
    }
    if (this.btnMasterPlay) {
      this.btnMasterPlay.classList.toggle('is-playing', isPlaying);
    }

    // 2. Ecualizador visual
    if (this.equalizerBars) {
      this.equalizerBars.classList.toggle('is-playing', isPlaying);
    }

    // 3. Indicador de audio HD en carátula
    const artworkWrapper = document.querySelector('.artwork-wrapper');
    if (artworkWrapper) {
      artworkWrapper.classList.toggle('is-broadcasting', isPlaying);
    }
  }

  setStatusMessage(msg, type = 'ready') {
    if (!this.streamStatusMsg) return;
    this.streamStatusMsg.textContent = msg;

    if (this.streamStatusAlert) {
      this.streamStatusAlert.className = `stream-status-bar status-${type}`;
      const icon = this.streamStatusAlert.querySelector('.status-alert-icon');
      if (icon) {
        if (type === 'playing') icon.textContent = 'radio';
        else if (type === 'buffering') icon.textContent = 'sync';
        else if (type === 'error') icon.textContent = 'error_outline';
        else icon.textContent = 'info';
      }
    }
  }

  // ==========================================================================
  // FONOTECA & REPRODUCTOR FLOTANTE A LA CARTA (ON-DEMAND)
  // ==========================================================================
  setupOnDemandAudio() {
    if (!this.audioOnDemand) {
      this.audioOnDemand = new Audio();
      this.audioOnDemand.id = 'onDemandAudioElement';
      document.body.appendChild(this.audioOnDemand);
    }

    this.audioOnDemand.volume = this.volume;

    // Actualización de progreso y tiempos
    this.audioOnDemand.addEventListener('timeupdate', () => {
      this.updateOnDemandProgress();
    });

    this.audioOnDemand.addEventListener('loadedmetadata', () => {
      if (this.miniTotalTime && this.audioOnDemand.duration) {
        this.miniTotalTime.textContent = this.formatSeconds(this.audioOnDemand.duration);
      }
    });

    this.audioOnDemand.addEventListener('play', () => {
      this.isPlayingOnDemand = true;
      if (this.iconMiniPlay) this.iconMiniPlay.textContent = 'pause';
      this.updateEpisodePlayButtons(true);
      this.updateMediaSessionMetadata();
    });

    this.audioOnDemand.addEventListener('pause', () => {
      this.isPlayingOnDemand = false;
      if (this.iconMiniPlay) this.iconMiniPlay.textContent = 'play_arrow';
      this.updateEpisodePlayButtons(false);
      this.updateMediaSessionMetadata();
    });

    this.audioOnDemand.addEventListener('ended', () => {
      this.isPlayingOnDemand = false;
      if (this.iconMiniPlay) this.iconMiniPlay.textContent = 'play_arrow';
      this.updateEpisodePlayButtons(false);
      if (this.miniProgressSlider) this.miniProgressSlider.value = 0;
      if (this.miniCurrentTime) this.miniCurrentTime.textContent = '0:00';
    });
  }

  bindOnDemandControls() {
    // 1. Botones de reproducción en cada tarjeta de episodio
    document.querySelectorAll('.btn-play-episode').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dataset = btn.dataset;
        this.handleEpisodeClick({
          btn,
          src: dataset.audioSrc,
          title: dataset.episodeTitle,
          host: dataset.episodeHost,
          cover: dataset.episodeCover,
        });
      });
    });

    // 2. Play / Pause en el Mini Player flotante
    if (this.btnMiniPlay) {
      this.btnMiniPlay.addEventListener('click', () => {
        this.toggleOnDemandPlayback();
      });
    }

    // 3. Adelantar / Retroceder 15s
    if (this.btnMiniRewind) {
      this.btnMiniRewind.addEventListener('click', () => {
        if (this.audioOnDemand) {
          this.audioOnDemand.currentTime = Math.max(0, this.audioOnDemand.currentTime - 15);
        }
      });
    }

    if (this.btnMiniForward) {
      this.btnMiniForward.addEventListener('click', () => {
        if (this.audioOnDemand && this.audioOnDemand.duration) {
          this.audioOnDemand.currentTime = Math.min(this.audioOnDemand.duration, this.audioOnDemand.currentTime + 15);
        }
      });
    }

    // 4. Slider de avance
    if (this.miniProgressSlider) {
      this.miniProgressSlider.addEventListener('input', (e) => {
        if (this.audioOnDemand && this.audioOnDemand.duration) {
          const seekTo = (e.target.value / 100) * this.audioOnDemand.duration;
          this.audioOnDemand.currentTime = seekTo;
        }
      });
    }

    // 5. Cerrar mini player
    if (this.btnMiniClose) {
      this.btnMiniClose.addEventListener('click', () => {
        this.closeOnDemandPlayer();
      });
    }
  }

  handleEpisodeClick(episode) {
    if (!episode.src) return;

    // Si ya es el mismo episodio que está cargado
    if (this.currentEpisodePlaying?.src === episode.src) {
      this.toggleOnDemandPlayback();
      return;
    }

    // Nuevo episodio seleccionado: Pausar Live Radio para evitar choque de sonido
    if (this.isPlayingLive && this.audioLive) {
      this.audioLive.pause();
    }

    this.currentEpisodePlaying = episode;

    // Actualizar datos del Mini Player flotante
    if (this.miniTrackTitle) this.miniTrackTitle.textContent = episode.title || 'Episodio Grabado';
    if (this.miniTrackHost) this.miniTrackHost.textContent = episode.host || 'Equipo Pastoral';
    if (this.miniTrackCover && episode.cover) this.miniTrackCover.src = episode.cover;

    // Mostrar el mini player flotante quitando clase 'hidden'
    if (this.miniPlayerBar) {
      this.miniPlayerBar.classList.remove('hidden');
      this.miniPlayerBar.classList.add('is-visible');
    }

    // Cargar y reproducir
    this.audioOnDemand.src = episode.src;
    this.audioOnDemand.currentTime = 0;
    this.audioOnDemand.play().catch((err) => {
      console.warn('Reproducción de podcast interrumpida:', err);
    });
  }

  toggleOnDemandPlayback() {
    if (!this.audioOnDemand || !this.audioOnDemand.src) return;

    if (this.audioOnDemand.paused) {
      // Pausar live radio si estuviera sonando
      if (this.isPlayingLive && this.audioLive) this.audioLive.pause();
      this.audioOnDemand.play();
    } else {
      this.audioOnDemand.pause();
    }
  }

  closeOnDemandPlayer() {
    if (this.audioOnDemand) {
      this.audioOnDemand.pause();
      this.audioOnDemand.currentTime = 0;
    }
    this.isPlayingOnDemand = false;
    this.currentEpisodePlaying = null;
    this.updateEpisodePlayButtons(false);

    if (this.miniPlayerBar) {
      this.miniPlayerBar.classList.add('hidden');
      this.miniPlayerBar.classList.remove('is-visible');
    }
  }

  updateOnDemandProgress() {
    if (!this.audioOnDemand || !this.audioOnDemand.duration) return;

    const current = this.audioOnDemand.currentTime;
    const duration = this.audioOnDemand.duration;
    const percent = (current / duration) * 100;

    if (this.miniProgressSlider) {
      this.miniProgressSlider.value = percent;
    }

    if (this.miniCurrentTime) {
      this.miniCurrentTime.textContent = this.formatSeconds(current);
    }
  }

  updateEpisodePlayButtons(isPlaying) {
    document.querySelectorAll('.btn-play-episode').forEach((btn) => {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (!icon) return;

      const isThisEpisode = this.currentEpisodePlaying && btn.dataset.audioSrc === this.currentEpisodePlaying.src;
      if (isThisEpisode && isPlaying) {
        icon.textContent = 'pause';
        btn.classList.add('is-playing-episode');
      } else {
        icon.textContent = 'play_arrow';
        btn.classList.remove('is-playing-episode');
      }
    });
  }

  formatSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // ==========================================================================
  // FILTRADO Y BÚSQUEDA EN LA FONOTECA
  // ==========================================================================
  bindFonotecaFilters() {
    // Filtro por pestañas de categoría
    this.filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        this.filterChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        this.applyFonotecaFilters();
      });
    });

    // Búsqueda en vivo por texto
    if (this.podcastSearchInput) {
      this.podcastSearchInput.addEventListener('input', () => {
        const query = this.podcastSearchInput.value.trim();
        if (this.clearSearchBtn) {
          this.clearSearchBtn.classList.toggle('hidden', query.length === 0);
        }
        this.applyFonotecaFilters();
      });
    }

    // Botón para limpiar campo de búsqueda
    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener('click', () => {
        if (this.podcastSearchInput) {
          this.podcastSearchInput.value = '';
          this.podcastSearchInput.focus();
        }
        this.clearSearchBtn.classList.add('hidden');
        this.applyFonotecaFilters();
      });
    }
  }

  applyFonotecaFilters() {
    const activeChip = document.querySelector('.podcast-filter-tags .filter-chip.active');
    const selectedCategory = activeChip ? activeChip.dataset.category : 'all';
    const searchQuery = (this.podcastSearchInput ? this.podcastSearchInput.value.toLowerCase().trim() : '');

    let visibleCount = 0;

    this.episodeCards.forEach((card) => {
      const cardCategory = card.dataset.category || '';
      const textContent = card.innerText.toLowerCase();

      const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
      const matchesSearch = !searchQuery || textContent.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Manejo de mensaje vacío si no hay coincidencias
    let noResultsMsg = document.getElementById('fonotecaNoResults');
    const grid = document.getElementById('podcastCardsGrid');
    if (visibleCount === 0) {
      if (!noResultsMsg && grid) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'fonotecaNoResults';
        noResultsMsg.className = 'fonoteca-empty-notice';
        noResultsMsg.innerHTML = `
          <span class="material-symbols-outlined empty-icon">sentiment_dissatisfied</span>
          <p>No se encontraron grabaciones con los términos seleccionados.</p>
        `;
        grid.parentNode.insertBefore(noResultsMsg, grid.nextSibling);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  // ==========================================================================
  // MEDIA SESSION API (PANTALLA DE BLOQUEO, SMARTWATCH Y COCHE)
  // ==========================================================================
  setupMediaSession() {
    if (!('mediaSession' in navigator)) return;

    try {
      navigator.mediaSession.setActionHandler('play', () => {
        if (this.isPlayingOnDemand) {
          this.toggleOnDemandPlayback();
        } else {
          this.toggleLivePlayback();
        }
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        if (this.isPlayingOnDemand && this.audioOnDemand) {
          this.audioOnDemand.pause();
        } else if (this.isPlayingLive && this.audioLive) {
          this.audioLive.pause();
        }
      });

      navigator.mediaSession.setActionHandler('stop', () => {
        if (this.audioLive) this.audioLive.pause();
        if (this.audioOnDemand) this.closeOnDemandPlayer();
      });

      navigator.mediaSession.setActionHandler('seekforward', () => {
        if (this.isPlayingOnDemand && this.audioOnDemand && this.audioOnDemand.duration) {
          this.audioOnDemand.currentTime = Math.min(this.audioOnDemand.duration, this.audioOnDemand.currentTime + 15);
        }
      });

      navigator.mediaSession.setActionHandler('seekbackward', () => {
        if (this.isPlayingOnDemand && this.audioOnDemand) {
          this.audioOnDemand.currentTime = Math.max(0, this.audioOnDemand.currentTime - 15);
        }
      });
    } catch (err) {
      console.warn('MediaSession handler warning:', err);
    }
  }

  updateMediaSessionMetadata() {
    if (!('mediaSession' in navigator)) return;

    if (this.isPlayingOnDemand && this.currentEpisodePlaying) {
      navigator.mediaSession.playbackState = 'playing';
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.currentEpisodePlaying.title || 'Programa Grabado',
        artist: this.currentEpisodePlaying.host || 'MMM Turquía Fonoteca',
        album: 'Radio Esperanza a la Carta',
        artwork: [
          { src: this.currentEpisodePlaying.cover || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=512', sizes: '512x512', type: 'image/jpeg' },
        ],
      });
    } else if (this.isPlayingLive) {
      const showTitle = this.currentShowTitle?.textContent || 'Alabanzas del Bósforo & Clamor';
      const showHost = this.currentShowHost?.textContent || 'Pr. Daniel Salazar';
      const showCover = this.currentShowCover?.src || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=512';

      navigator.mediaSession.playbackState = 'playing';
      navigator.mediaSession.metadata = new MediaMetadata({
        title: showTitle,
        artist: `En Vivo: ${showHost}`,
        album: 'Radio Esperanza Turquía 24/7',
        artwork: [
          { src: showCover, sizes: '512x512', type: 'image/jpeg' },
        ],
      });
    } else {
      navigator.mediaSession.playbackState = 'paused';
    }
  }

  // ==========================================================================
  // SIMULADOR DINÁMICO DE AUDIENCIA EN VIVO
  // ==========================================================================
  startListenersSimulator() {
    if (!this.listenersCount) return;

    let current = RADIO_CONFIG.listenersBase;
    this.listenersCount.textContent = current.toString();

    // Fluctuación orgánica sutil cada 25 segundos
    this.listenersTimer = setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2; // -2 a +2
      current = Math.max(95, Math.min(210, current + delta));
      this.listenersCount.textContent = current.toString();
    }, 25000);
  }

  // ==========================================================================
  // SEGUIMIENTO DE PROGRESO DEL BLOQUE EN VIVO
  // ==========================================================================
  startLiveProgressTracker() {
    const updateProgress = () => {
      if (!this.showProgressFill || !this.currentShowRemaining) return;

      const now = new Date();
      // Usar minutos del bloque actual de 2 horas (módulo 120 min)
      const currentMinutesInTwoHourSlot = (now.getMinutes() + (now.getHours() % 2) * 60);
      const percent = Math.min(100, Math.max(5, (currentMinutesInTwoHourSlot / 120) * 100));

      this.showProgressFill.style.width = `${percent.toFixed(1)}%`;
      const elapsedMin = currentMinutesInTwoHourSlot;
      this.currentShowRemaining.textContent = `Tiempo en el aire: ${elapsedMin} min`;
    };

    updateProgress();
    this.progressTimer = setInterval(updateProgress, 60000);
  }

  // ==========================================================================
  // COMPARTIR Y PWA INSTALL
  // ==========================================================================
  shareLiveStream() {
    const shareData = {
      title: 'Radio Esperanza 24/7 — MMM Turquía',
      text: 'Sintoniza en vivo la transmisión de Radio Esperanza Turquía con alabanzas, estudio bíblico y clamor continuo:',
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        if (err.name !== 'AbortError') console.warn('Error al compartir:', err);
      });
    } else {
      // Fallback: Copiar enlace al portapapeles
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showToastNotification('¡Enlace de la radio copiado al portapapeles!');
      }).catch(() => {
        prompt('Copia este enlace para compartir la radio:', window.location.href);
      });
    }
  }

  triggerPwaInstall() {
    if (this.deferredPwaPrompt) {
      this.deferredPwaPrompt.prompt();
      this.deferredPwaPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('App instalada con éxito');
        }
        this.deferredPwaPrompt = null;
      });
    } else {
      this.showToastNotification('Para instalar la App: abre el menú de tu navegador y selecciona "Añadir a pantalla de inicio" / "Instalar aplicación".');
    }
  }

  showToastNotification(msg) {
    let toast = document.getElementById('radioToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'radioToast';
      toast.className = 'radio-toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4500);
  }

  // ==========================================================================
  // FORMULARIO PASTORAL DE CONTACTO PRIVADO
  // ==========================================================================
  bindPastoralForm() {
    if (!this.pastoralForm) return;

    this.pastoralForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value.trim();
      const whatsapp = document.getElementById('contactWhatsapp')?.value.trim();
      const reason = document.getElementById('contactReason')?.value;
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !whatsapp) {
        alert('Por favor completa al menos tu nombre y número de WhatsApp para poder contactarte.');
        return;
      }

      // Simular envío pastoral exitoso
      if (this.formSuccessNotice) {
        this.formSuccessNotice.classList.remove('hidden');
        this.formSuccessNotice.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Opción de enviar también directo a WhatsApp pastoral
      const encodedMsg = encodeURIComponent(
        `Hola Equipo Pastoral MMM Turquía, soy ${name}.\nMotivo: ${reason || 'Contacto y Solicitud'}\n${message ? `Mensaje: ${message}` : ''}`
      );
      const waUrl = `https://wa.me/?text=${encodedMsg}`;

      // Resetear campos
      this.pastoralForm.reset();

      // Añadir botón rápido de WhatsApp dentro del mensaje de éxito si no existe
      if (this.formSuccessNotice && !this.formSuccessNotice.querySelector('.wa-direct-btn')) {
        const waBtn = document.createElement('a');
        waBtn.className = 'wa-direct-btn';
        waBtn.href = waUrl;
        waBtn.target = '_blank';
        waBtn.rel = 'noopener noreferrer';
        waBtn.innerHTML = '<span class="material-symbols-outlined">chat</span> Abrir chat directo en WhatsApp';
        this.formSuccessNotice.appendChild(waBtn);
      }
    });
  }

  // ==========================================================================
  // ELEMENTOS DE INTERFAZ: MENÚ MÓVIL Y SELECTOR DE IDIOMAS
  // ==========================================================================
  bindNavigationAndUi() {
    // 1. Menú hamburguesa móvil
    if (this.mobileMenuBtn && this.mobileNavDrawer) {
      this.mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.mobileNavDrawer.classList.toggle('hidden');
      });

      // Cerrar al hacer clic en un enlace del drawer
      this.mobileNavDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          this.mobileNavDrawer.classList.add('hidden');
        });
      });

      // Cerrar al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (!this.mobileNavDrawer.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
          this.mobileNavDrawer.classList.add('hidden');
        }
      });
    }

    // 2. Dropdown de idiomas en navbar
    if (this.langDropdownBtn && this.langMenu) {
      this.langDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = this.langMenu.classList.toggle('hidden');
        this.langDropdownBtn.setAttribute('aria-expanded', (!isHidden).toString());
      });

      // Opciones de idioma
      this.langMenu.querySelectorAll('.lang-option').forEach((opt) => {
        opt.addEventListener('click', () => {
          const lang = opt.dataset.lang;
          if (this.currentLangLabel) {
            this.currentLangLabel.textContent = lang.toUpperCase();
          }
          this.langMenu.classList.add('hidden');
          this.langDropdownBtn.setAttribute('aria-expanded', 'false');

          // Si lang.js expone aplicarIdioma
          if (typeof window.aplicarIdioma === 'function') {
            window.aplicarIdioma(lang);
          } else {
            // Disparar evento para que lang.js lo capture
            window.dispatchEvent(new CustomEvent('cambiarIdiomaSolicitado', { detail: { lang } }));
          }
        });
      });

      document.addEventListener('click', (e) => {
        if (!this.langMenu.contains(e.target) && !this.langDropdownBtn.contains(e.target)) {
          this.langMenu.classList.add('hidden');
          this.langDropdownBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 3. Capturar evento PWA beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPwaPrompt = e;
      if (this.btnPwaInstall) {
        this.btnPwaInstall.classList.add('pwa-ready');
      }
    });

    // 4. Smooth scrolling para todos los enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
}

// Instanciar motor global
const radioEngine = new RadioPlayerEngine();

// Exponer API global limpia para otros scripts (como radio-schedule.js)
window.RadioPlayer = {
  engine: radioEngine,
  playLive: () => radioEngine.toggleLivePlayback(),
  setVolume: (v) => radioEngine.setVolume(v),
  playEpisode: (data) => radioEngine.handleEpisodeClick(data),
  updateProgramInfo: (title, host, cover) => {
    if (radioEngine.currentShowTitle && title) radioEngine.currentShowTitle.textContent = title;
    if (radioEngine.currentShowHost && host) radioEngine.currentShowHost.textContent = host;
    if (radioEngine.currentShowCover && cover) radioEngine.currentShowCover.src = cover;
    radioEngine.updateMediaSessionMetadata();
  },
};

export default radioEngine;

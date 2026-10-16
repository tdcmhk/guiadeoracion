import React, { useState } from 'react';
import { UserProfile, UserRole, Language, NavTab } from '../types';
import { translations } from '../data/i18n';

interface RootHomeViewProps {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  lang: Language;
  onNavigateTab: (tab: NavTab) => void;
  onRoleSwitch: (role: UserRole, approved: boolean) => void;
  onApproveUser: (uid: string, role: UserRole, state: boolean) => void;
  onRegisterUser: (data: Partial<UserProfile> & { targetRole: UserRole }) => void;
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
}

export const RootHomeView: React.FC<RootHomeViewProps> = ({
  currentUser,
  allUsers,
  lang,
  onNavigateTab,
  onRoleSwitch,
  onApproveUser,
  onRegisterUser,
  isPlayingRadio,
  onToggleRadio
}) => {
  const t = translations[lang] || translations.es;
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudRole, setSolicitudRole] = useState<UserRole>('intercesor');

  // Form states
  const [inputNombre, setInputNombre] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputWhatsapp, setInputWhatsapp] = useState('');
  const [inputPais, setInputPais] = useState('');
  const [inputIglesia, setInputIglesia] = useState('');

  const handleOpenModal = (role?: UserRole) => {
    if (role) setSolicitudRole(role);
    setModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputNombre.trim() || !inputWhatsapp.trim()) return;

    onRegisterUser({
      nombre: inputNombre.trim(),
      email: inputEmail.trim(),
      whatsapp: inputWhatsapp.trim(),
      pais: inputPais.trim(),
      iglesia: inputIglesia.trim(),
      targetRole: solicitudRole
    });

    setModalOpen(false);
    setInputNombre('');
    setInputEmail('');
    setInputWhatsapp('');
    setInputPais('');
    setInputIglesia('');

    const confirmarWsp = window.confirm(
      `¡Solicitud enviada con éxito! Has sido registrado. El pastor validará tu solicitud para ${solicitudRole.toUpperCase()}. ¿Deseas notificarlo ahora mismo por WhatsApp?`
    );
    if (confirmarWsp) {
      const texto = encodeURIComponent(
        `Paz de Dios pastor Ricardo. Saludos en Cristo. Deseo validar mi cuenta y solicitar acceso como ${solicitudRole.toUpperCase()} en MMM Turquía. Mi nombre es ${inputNombre.trim()} desde ${inputPais.trim()}. ¡Dios le bendiga!`
      );
      window.open(`https://wa.me/51938204456?text=${texto}`, '_blank');
    }
  };

  const handleOpenWhatsAppPastoral = () => {
    const texto = encodeURIComponent(
      `Paz de Dios pastor Ricardo. Saludos en Cristo. Deseo solicitar acceso y validar mi cuenta en el sitio web de MMM Turquía. Mi nombre es ${currentUser.nombre} desde ${currentUser.pais}. ¡Dios le bendiga!`
    );
    window.open(`https://wa.me/51938204456?text=${texto}`, '_blank');
  };

  const isApprovedIntranet = currentUser.aprobado && ['intercesor', 'patrocinador', 'admin'].includes(currentUser.rol);

  return (
    <div className="space-y-12">
      {/* =========================================================================
          0. BARRA SIMULADORA / CAMBIO RÁPIDO DE ROLES PASTORAL (1 CLIC)
          ========================================================================= */}
      <div className="rounded-xl bg-gradient-to-r from-[#1e1b4b] to-[#0f172a] border border-purple-500/30 p-3.5 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs text-slate-200">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded-sm bg-purple-500/25 text-purple-300 font-bold uppercase tracking-wider text-[10px]">
            Simulador de Roles
          </span>
          <span className="text-slate-400">Rol activo:</span>
          <strong className="text-white font-bold text-sm uppercase">
            {currentUser.rol}
          </strong>
          <span className={`text-[11px] font-semibold ${currentUser.aprobado ? 'text-emerald-400' : 'text-amber-400'}`}>
            {currentUser.aprobado ? '(Aprobado / Intranet Habilitada)' : '(Público / Pendiente)'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400 mr-1">Probar permisos:</span>
          <button
            onClick={() => onRoleSwitch('discipulo', false)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
              currentUser.rol === 'discipulo'
                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]'
                : 'bg-white/5 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            👤 Discípulo
          </button>
          <button
            onClick={() => onRoleSwitch('intercesor', true)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
              currentUser.rol === 'intercesor'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400'
                : 'bg-white/5 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            🛡️ Intercesor
          </button>
          <button
            onClick={() => onRoleSwitch('patrocinador', true)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
              currentUser.rol === 'patrocinador'
                ? 'bg-amber-500/20 text-amber-400 border-amber-400'
                : 'bg-white/5 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            ⭐ Patrocinador VIP
          </button>
          <button
            onClick={() => onRoleSwitch('admin', true)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
              currentUser.rol === 'admin'
                ? 'bg-purple-500/20 text-purple-300 border-purple-400'
                : 'bg-white/5 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            👑 Pastor / Admin
          </button>
        </div>
      </div>

      {/* =========================================================================
          1. HERO SECTION CON RADIO ESPERANZA 24/7 INTEGRADA
          ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0a1428] via-[#070d19] to-[#040810] border border-slate-800 p-8 sm:p-12 lg:p-16 text-center shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#0e9594]/20 via-[#1e3a8a]/15 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#fbbf24] text-xs font-bold tracking-wider uppercase">
            <span className="material-symbols-outlined text-[16px]">explore</span>
            <span>Turquía & Las 7 Iglesias Históricas del Apocalipsis</span>
          </div>

          <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Una Puerta Abierta en el Bósforo <span className="bg-gradient-to-r from-white via-[#fbbf24] to-[#d4af37] bg-clip-text text-transparent">para las Naciones</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            {t.hero_portal_sub}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onToggleRadio}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b45309] text-[#070d19] font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlayingRadio ? 'pause_circle' : 'radio'}
              </span>
              <span>{isPlayingRadio ? 'Pausar Radio' : 'Escuchar Radio 24/7'}</span>
            </button>

            <button
              onClick={() => handleOpenModal('intercesor')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold text-sm hover:bg-emerald-500/25 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>Unirme como Intercesor</span>
            </button>

            <button
              onClick={() => handleOpenModal('patrocinador')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              <span>Ser Patrocinador VIP</span>
            </button>
          </div>

          {/* Mini Consola Radio 24/7 */}
          <div className="max-w-xl mx-auto rounded-2xl bg-slate-900/80 border border-slate-700/80 p-4 sm:p-5 flex items-center justify-between gap-4 backdrop-blur-md shadow-xl text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
                <span className={`w-3.5 h-3.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50 ${isPlayingRadio ? 'animate-ping' : ''}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">Radio Esperanza Turquía</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-red-500/20 text-red-400 font-mono-code font-bold uppercase">
                    24/7
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  {isPlayingRadio ? t.radio_playing_status : t.radio_paused_status}
                </p>
              </div>
            </div>

            <button
              onClick={onToggleRadio}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-[#0e9594] to-[#1e3a8a] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform shrink-0"
              aria-label="Reproducir o pausar transmisión"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isPlayingRadio ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECCIÓN DE ROLES EN EL SITIO WEB
          ========================================================================= */}
      <section id="roles" className="space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] text-xs font-bold uppercase tracking-wider border border-[#38bdf8]/30">
            Arquitectura de Permisos
          </span>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-white">
            Tu Lugar en la Misión de Turquía
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            El sitio web está estructurado en 3 niveles de compromiso y acceso. Cada persona comienza como discípulo y puede solicitar elevación de rol al equipo pastoral.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta Discípulo */}
          <div className={`p-6 rounded-2xl bg-slate-900/60 border flex flex-col justify-between transition-all ${
            currentUser.rol === 'discipulo'
              ? 'border-[#38bdf8] shadow-lg shadow-[#38bdf8]/10'
              : 'border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-4">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#38bdf8]/15 text-[#38bdf8] uppercase tracking-wider inline-block">
                Público General / Nuevo
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">person</span>
              </div>
              <h3 className="font-serif-title text-xl font-bold text-white">Rol Discípulo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Asignado automáticamente a todo visitante. Acceso abierto para ser edificado con los contenidos públicos y transmisiones de radio.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span>Transmisión en vivo de Radio Esperanza 24/7.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span>Fonoteca de grabaciones a la carta y guía de programación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span>Contacto con el equipo pastoral en Turquía.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleOpenModal('intercesor')}
                className="w-full py-2.5 rounded-xl bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/30 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                <span>Solicitar Acreditación</span>
              </button>
            </div>
          </div>

          {/* Tarjeta Intercesor */}
          <div className={`p-6 rounded-2xl bg-slate-900/60 border flex flex-col justify-between transition-all ${
            currentUser.rol === 'intercesor'
              ? 'border-emerald-500 shadow-lg shadow-emerald-500/10'
              : 'border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-4">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 uppercase tracking-wider inline-block">
                Acceso al Boletín & Diario
              </span>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">volunteer_activism</span>
              </div>
              <h3 className="font-serif-title text-xl font-bold text-white">Rol Intercesor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Para creyentes e iglesias comprometidas en sostener la obra en oración constante y respaldo espiritual estratégico.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span><strong>Acceso completo a la Intranet</strong> protegida.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span>Lectura del <strong>Boletín de Intercesión Estratégico</strong> (9 frentes confidenciales).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span>Uso del <strong>Diario de Oración</strong> personal y vigilias.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => isApprovedIntranet ? onNavigateTab('boletin') : handleOpenModal('intercesor')}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isApprovedIntranet ? 'menu_book' : 'lock_open'}
                </span>
                <span>{isApprovedIntranet ? 'Abrir Boletín de Oración' : 'Solicitar Rol Intercesor'}</span>
              </button>
            </div>
          </div>

          {/* Tarjeta Patrocinador */}
          <div className={`p-6 rounded-2xl bg-slate-900/60 border flex flex-col justify-between transition-all ${
            currentUser.rol === 'patrocinador'
              ? 'border-[#fbbf24] shadow-lg shadow-[#fbbf24]/10'
              : 'border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-4">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#fbbf24]/15 text-[#fbbf24] uppercase tracking-wider inline-block">
                Socio Financiero VIP
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#fbbf24]/15 text-[#fbbf24] flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">stars</span>
              </div>
              <h3 className="font-serif-title text-xl font-bold text-white">Rol Patrocinador</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Para personas e iglesias que sostienen económicamente los avances misioneros y adquisición de templos en Turquía.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span><strong>Acceso total a la Intranet</strong> y todos sus módulos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span><strong>Reportes de campo y proyectos reservados</strong> con presupuestos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px] shrink-0">check_circle</span>
                  <span>Canales directos de comunicación pastoral VIP.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleOpenModal('patrocinador')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b45309] hover:opacity-95 text-[#070d19] font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#d4af37]/20"
              >
                <span className="material-symbols-outlined text-[16px]">diamond</span>
                <span>Postular como Patrocinador VIP</span>
              </button>
            </div>
          </div>
        </div>

        {/* PUERTA DE ENLACE DINÁMICA A LA INTRANET */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#111c33] to-[#172545] border border-[#d4af37]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#fbbf24] text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>ZONA PRIVADA / INTRANET MISIONERA</span>
            </div>
            <h3 className="font-serif-title text-2xl font-bold text-white">
              {t.gateway_title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.gateway_desc}
            </p>
            <div className="pt-2">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                isApprovedIntranet
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                  : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
              }`}>
                <span className="material-symbols-outlined text-[16px]">
                  {isApprovedIntranet ? 'verified' : 'info'}
                </span>
                <span>
                  {isApprovedIntranet
                    ? `Acceso AUTORIZADO como ${currentUser.rol.toUpperCase()} (${currentUser.nombre})`
                    : `Tu estado actual: ${currentUser.rol.toUpperCase()} (Requiere validación para Intranet)`}
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
            {isApprovedIntranet ? (
              <>
                <button
                  onClick={() => onNavigateTab('home')}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-[#070d19] font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
                >
                  <span className="material-symbols-outlined text-[20px]">lock_open</span>
                  <span>Entrar a mi Intranet Protegida</span>
                </button>
                <button
                  onClick={() => onNavigateTab('boletin')}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-[#38bdf8] hover:underline text-center"
                >
                  Ir directo al Boletín de Oración ➔
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleOpenModal('intercesor')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b45309] text-[#070d19] font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">key</span>
                  <span>Solicitar Acceso a la Intranet</span>
                </button>
                <button
                  onClick={handleOpenWhatsAppPastoral}
                  className="px-6 py-2.5 rounded-xl bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/30 text-[#25d366] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Validar por WhatsApp con el Pastor</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* PANEL RÁPIDO DE APROBACIÓN PASTORAL (ADMINISTRADOR) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-4">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 flex-wrap">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="material-symbols-outlined text-purple-400">shield_person</span>
              <span>Panel de Aprobación de Roles Pastoral (1 Clic)</span>
            </div>
            <span className="text-[11px] text-purple-300 font-mono-code">
              {allUsers.length} Usuarios Registrados
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Como pastor o administrador, puedes aprobar o revocar a cualquier usuario con 1 solo clic para concederle acceso inmediato a los 9 bloques del boletín y la intranet:
          </p>

          <div className="space-y-2.5">
            {allUsers.map((u) => (
              <div
                key={u.uid}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-white">{u.nombre} {u.apellido || ''}</h4>
                  <p className="text-[11px] text-slate-400">{u.email} • {u.pais} • WhatsApp: {u.whatsapp}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px]">
                    <span className="text-slate-400">Rol:</span>
                    <strong className="text-purple-300 uppercase">{u.rol}</strong>
                    <span className={u.aprobado ? 'text-emerald-400' : 'text-amber-400'}>
                      ● {u.aprobado ? 'Aprobado' : 'Pendiente'}
                    </span>
                    {u.solicitud && (
                      <span className="px-1.5 py-0.2 rounded-sm bg-amber-500/20 text-amber-300 font-semibold">
                        Solicita: {u.solicitud.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onApproveUser(u.uid, 'intercesor', true)}
                    className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-900 font-bold text-[11px] hover:bg-emerald-400"
                  >
                    Aprobar Intercesor
                  </button>
                  <button
                    onClick={() => onApproveUser(u.uid, 'patrocinador', true)}
                    className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-900 font-bold text-[11px] hover:bg-amber-400"
                  >
                    Aprobar VIP
                  </button>
                  {u.aprobado && (
                    <button
                      onClick={() => onApproveUser(u.uid, 'discipulo', false)}
                      className="px-2 py-1 rounded-md bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] hover:bg-red-500/25"
                    >
                      Revocar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECCIÓN HISTÓRICA: LAS 7 IGLESIAS DE ASIA MENOR (TURQUÍA)
          ========================================================================= */}
      <section className="space-y-6 pt-6 border-t border-slate-800">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
            La Cuna del Cristianismo
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
            El Campo Misionero: Turquía & Asia Menor
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            En esta tierra donde caminaron los apóstoles Pablo, Juan y Pedro, y donde se levantaron las 7 Iglesias del libro de Apocalipsis, hoy volvemos a levantar antorchas de fe y esperanza.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <h4 className="font-serif-title text-base font-bold text-[#fbbf24]">Éfeso (Efes)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Centro del ministerio apostólico de Pablo y Juan. Clave para la restauración del primer amor espiritual.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <h4 className="font-serif-title text-base font-bold text-[#fbbf24]">Esmirna (İzmir)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ciudad portuaria del Egeo, modelo de fidelidad en la prueba y perseverancia misionera.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <h4 className="font-serif-title text-base font-bold text-[#fbbf24]">Pérgamo (Bergama)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lugar de profunda batalla espiritual donde la Palabra de Dios permanece como espada de dos filos.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <h4 className="font-serif-title text-base font-bold text-[#fbbf24]">Filadelfia (Alaşehir)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              "La puerta abierta que nadie puede cerrar". Nuestra inspiración para la proclamación continua en Turquía.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL DE SOLICITUD DE ACCESO & VALIDACIÓN PASTORAL
          ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-[#d4af37] rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-sm bg-[#d4af37]/20 text-[#fbbf24] text-[10px] font-bold uppercase">
                Acreditación Pastoral
              </span>
              <h3 className="font-serif-title text-xl font-bold text-white">
                Solicitar Acceso a la Intranet
              </h3>
              <p className="text-xs text-slate-400">
                Completa tus datos para que el equipo pastoral valide tu cuenta como Intercesor o Patrocinador.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={inputNombre}
                  onChange={(e) => setInputNombre(e.target.value)}
                  placeholder="Ej. Ricardo Mendoza"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="ejemplo@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp con código de país *</label>
                <input
                  type="tel"
                  required
                  value={inputWhatsapp}
                  onChange={(e) => setInputWhatsapp(e.target.value)}
                  placeholder="+51 987 654 321"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">País *</label>
                  <input
                    type="text"
                    required
                    value={inputPais}
                    onChange={(e) => setInputPais(e.target.value)}
                    placeholder="Perú / España"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-hidden focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Iglesia / Congregación</label>
                  <input
                    type="text"
                    value={inputIglesia}
                    onChange={(e) => setInputIglesia(e.target.value)}
                    placeholder="MMM Central"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-hidden focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rol Solicitado *</label>
                <select
                  value={solicitudRole}
                  onChange={(e) => setSolicitudRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs focus:outline-hidden focus:border-[#d4af37]"
                >
                  <option value="intercesor">🛡️ Rol Intercesor (Boletín Estratégico & Diario)</option>
                  <option value="patrocinador">⭐ Rol Patrocinador VIP (Reportes de Campo & Proyectos)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b45309] text-[#070d19] font-extrabold text-xs shadow-md transition-all mt-4"
              >
                Enviar Solicitud al Equipo Pastoral
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsAppPastoral}
                  className="text-xs text-[#25d366] hover:underline"
                >
                  ¿Prefieres validar directamente por WhatsApp con el Pastor? ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

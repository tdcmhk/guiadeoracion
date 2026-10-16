import React, { useState } from 'react';
import { UserProfile, UserRole, NavTab } from '../types';

interface PerfilViewProps {
  currentUser: UserProfile;
  prayedBlocksCount: number;
  savedEntriesCount: number;
  onNavigateTab: (tab: NavTab) => void;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  currentUser,
  prayedBlocksCount,
  savedEntriesCount,
  onNavigateTab,
  onUpdateUser,
  onLogout
}) => {
  // If user has not completed their profile or is logged out:
  // IsLoggedIn flag (stored in profile or local state)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return Boolean(currentUser.email && currentUser.email !== '');
  });
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  // Form inputs
  const [nombre, setNombre] = useState(currentUser.nombre || '');
  const [apellido, setApellido] = useState(currentUser.apellido || '');
  const [telefono, setTelefono] = useState(currentUser.whatsapp || '');
  const [pais, setPais] = useState(currentUser.pais || '');
  const [iglesia, setIglesia] = useState(currentUser.iglesia || '');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.rol || 'seguidor');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Login simulator (matching index1.html Google Auth button)
  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
    // If user has no phone or church yet, show registration form
    if (!currentUser.whatsapp || currentUser.whatsapp === '') {
      setIsRegistering(true);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;

    setIsSubmitting(true);

    const isSeguidor = selectedRole === 'seguidor';
    const isApproved = isSeguidor ? true : false; // Seguidor: aprobado automático. Intercesor: espera aprobación pastoral.

    const updatedProfile: UserProfile = {
      ...currentUser,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      whatsapp: telefono.trim(),
      pais: pais.trim(),
      iglesia: iglesia.trim(),
      rol: selectedRole,
      aprobado: isApproved,
      solicitud: isSeguidor ? undefined : 'intercesor',
      fechaRegistro: new Date().toLocaleDateString('es-ES')
    };

    // Send silent notification via FormSubmit to rvicentetapia@gmail.com (as in index1.html)
    try {
      await fetch("https://formsubmit.co/ajax/rvicentetapia@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `🔔 Nuevo Registro en MMM Turquía (${selectedRole.toUpperCase()}): ${updatedProfile.nombre} ${updatedProfile.apellido || ''} (${updatedProfile.pais})`,
          Nombre: updatedProfile.nombre,
          Apellido: updatedProfile.apellido,
          Telefono_WhatsApp: updatedProfile.whatsapp,
          Pais: updatedProfile.pais,
          Iglesia: updatedProfile.iglesia,
          Correo: updatedProfile.email || 'Google Auth',
          Rol_Seleccionado: selectedRole,
          Estado_Aprobacion: isApproved ? 'Aprobado Automático (Seguidor)' : 'Pendiente de Aprobación Pastoral (Intercesor)',
          Accion_Pastoral: "Entra al Panel Admin para autorizar el acceso a la Intranet confidencial."
        })
      }).catch(() => {});
    } catch (e) {
      // ignore
    }

    onUpdateUser(updatedProfile);
    setIsSubmitting(false);
    setIsRegistering(false);
  };

  const handleOpenWhatsAppPastoral = () => {
    const texto = encodeURIComponent(
      `Paz de Dios pastor Ricardo. Saludos en Cristo. He completado mi registro en la web de MMM Turquía y solicito validación para el rol de INTERCESOR. Mi nombre es ${currentUser.nombre} ${currentUser.apellido || ''} desde ${currentUser.pais}. ¡Dios le bendiga!`
    );
    window.open(`https://wa.me/51938204456?text=${texto}`, '_blank');
  };

  const handleRequestUpgradeToIntercesor = () => {
    setSelectedRole('intercesor');
    setIsRegistering(true);
  };

  // =========================================================================
  // PANTALLA 1: ACCESO CON GOOGLE (Si no ha iniciado sesión)
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-8 p-8 rounded-3xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a365d] to-[#0e9594] text-white flex items-center justify-center mx-auto shadow-md">
          <span className="material-symbols-outlined text-[32px]">church</span>
        </div>

        <div>
          <h2 className="font-serif-title text-2xl font-bold text-[#1a365d] dark:text-white">
            Portal de Acceso & Perfil
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Ingresa o regístrate con tu cuenta de Google para activar tu perfil de Seguidor o postular como Intercesor de la obra en Turquía.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-bold text-sm flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all active:scale-98"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            width="20"
            height="20"
            alt="Google"
          />
          <span>Continuar con Google</span>
        </button>

        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          Tus datos son tratados bajo estricta confidencialidad pastoral según las normas del ministerio.
        </p>
      </div>
    );
  }

  // =========================================================================
  // PANTALLA 2: FORMULARIO DE REGISTRO CON SELECCIÓN DE ROL (Primera vez o cambio)
  // =========================================================================
  if (isRegistering) {
    return (
      <div className="max-w-xl mx-auto my-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0e9594]/15 text-[#0e9594] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
            <span>Ficha de Registro</span>
          </div>
          <h2 className="font-serif-title text-2xl font-bold text-[#1a365d] dark:text-white">
            Completa tus Datos Personales
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Define tu nivel de vinculación con la obra en Turquía:
          </p>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nombre *</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Daniel"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Apellido *</label>
              <input
                type="text"
                required
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ej. Salazar"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Teléfono / WhatsApp *</label>
              <input
                type="tel"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+51 987 654 321"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">País *</label>
              <input
                type="text"
                required
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                placeholder="Ej. Perú / Colombia / España"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Iglesia / Congregación a la que perteneces *</label>
            <input
              type="text"
              required
              value={iglesia}
              onChange={(e) => setIglesia(e.target.value)}
              placeholder="Ej. MMM Central Lima"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
            />
          </div>

          {/* SELECTOR DE ROL (Seguidor vs Intercesor) */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Selecciona tu Rol en la Plataforma *
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Opción Seguidor */}
              <div
                onClick={() => setSelectedRole('seguidor')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedRole === 'seguidor'
                    ? 'border-[#38bdf8] bg-[#38bdf8]/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-[#38bdf8] text-[20px]">person</span>
                  <strong className="text-xs text-slate-900 dark:text-white">Rol Seguidor</strong>
                  <span className="px-1.5 py-0.2 rounded-sm bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Automático
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Aprobación inmediata. Acceso ilimitado a la radio 24/7, devocionales y enseñanzas públicas.
                </p>
              </div>

              {/* Opción Intercesor */}
              <div
                onClick={() => setSelectedRole('intercesor')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedRole === 'intercesor'
                    ? 'border-[#0e9594] bg-[#0e9594]/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-[#0e9594] text-[20px]">volunteer_activism</span>
                  <strong className="text-xs text-slate-900 dark:text-white">Rol Intercesor</strong>
                  <span className="px-1.5 py-0.2 rounded-sm bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Revisión
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Requiere aprobación pastoral. Acceso confidencial a los 9 bloques del boletín y diario de oración.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#0e9594] hover:bg-[#0b7a79] text-white text-xs font-bold shadow-md transition-all"
            >
              {isSubmitting ? 'Guardando...' : 'Completar Registro'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // =========================================================================
  // PANTALLA 3: FICHA DEL PERFIL DEL USUARIO
  // =========================================================================
  const isIntercesor = currentUser.rol === 'intercesor';
  const isSeguidor = currentUser.rol === 'seguidor';
  const isApproved = currentUser.aprobado === true;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 1. Tarjeta Principal del Perfil */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1a365d] to-[#0e9594] text-white flex items-center justify-center font-bold font-serif-title text-2xl shadow-md shrink-0">
            {currentUser.nombre ? currentUser.nombre.slice(0, 2).toUpperCase() : 'US'}
          </div>

          <div className="space-y-1 flex-1">
            {/* Estado / Badge de Rol */}
            <div className="mb-1">
              {isSeguidor && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38bdf8]/15 text-[#0284c7] dark:text-[#38bdf8] border border-[#38bdf8]/30 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  <span>Rol Seguidor (Activo)</span>
                </span>
              )}

              {isIntercesor && !isApproved && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>Solicitud de Intercesor en Espera de Aprobación Pastoral</span>
                </span>
              )}

              {isIntercesor && isApproved && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Intercesor Acreditado — Aprobado por Pastoral</span>
                </span>
              )}

              {currentUser.rol === 'admin' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300 dark:border-purple-700 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">shield_person</span>
                  <span>Pastor / Administrador General</span>
                </span>
              )}
            </div>

            <h2 className="font-serif-title text-2xl font-bold text-slate-900 dark:text-white">
              {currentUser.nombre} {currentUser.apellido || ''}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {currentUser.email || 'adolescentespl@gmail.com'}
            </p>

            {/* Quick user fields */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">País</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentUser.pais || 'Perú'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Iglesia</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentUser.iglesia || 'MMM Central'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">WhatsApp</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentUser.whatsapp || 'Sin registrar'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Registro</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono-code">{currentUser.fechaRegistro || 'Hoy'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ZONA DE ACCIONES Y ESTADO SEGÚN EL ROL (Cumpliendo la especificación) */}
      
      {/* CASO A: ES SEGUIDOR (Aprobado automáticamente) */}
      {isSeguidor && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#0284c7] font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">radio</span>
            <span>Membresía Activa de Seguidor</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Tu cuenta como Seguidor te permite sintonizar Radio Esperanza 24/7 y acceder a las enseñanzas públicas del ministerio.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">¿Deseas respaldar la obra en oración?</div>
              <p className="text-[11px] text-slate-500">Solicita ascender a Intercesor para acceder al Boletín de 9 bloques y Diario de oración.</p>
            </div>
            <button
              onClick={handleRequestUpgradeToIntercesor}
              className="px-4 py-2 rounded-xl bg-[#0e9594] hover:bg-[#0b7a79] text-white text-xs font-bold shrink-0 transition-colors"
            >
              Solicitar Rol Intercesor
            </button>
          </div>
        </div>
      )}

      {/* CASO B: ES INTERCESOR PERO AÚN NO APROBADO (En espera pastoral en el perfil) */}
      {isIntercesor && !isApproved && (
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <span className="material-symbols-outlined text-[22px]">schedule_send</span>
            <span>Solicitud de Intercesor en Revisión Pastoral</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Tus datos han sido enviados exitosamente al equipo pastoral (Pr. Vicente Tapia). En cuanto tu cuenta sea aprobada, <strong>aparecerá automáticamente aquí el botón de acceso a la Intranet protegida</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/40 space-y-2">
            <div className="text-xs font-bold text-slate-900 dark:text-white">¿Deseas agilizar tu ingreso a la Intranet?</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Puedes comunicarte directamente con el pastor por WhatsApp para confirmar tu iglesia y validar tu acreditación:
            </p>
            <button
              onClick={handleOpenWhatsAppPastoral}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Notificar al Pastor por WhatsApp (+51 938 204 456)</span>
            </button>
          </div>
        </div>
      )}

      {/* CASO C: INTERCESOR APROBADO O ADMIN (¡SOLO AQUÍ APARECE EL BOTÓN INTRANET!) */}
      {isApproved && (isIntercesor || currentUser.rol === 'admin') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1a365d] to-[#0e9594] text-white shadow-xl space-y-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#d4af37]/20 text-[#fbbf24] text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">lock_open</span>
              <span>ACCESO AUTORIZADO A LA INTRANET PROTEGIDA</span>
            </div>
            <h3 className="font-serif-title text-2xl font-bold text-white">
              Bóveda de Intercesión Misionera
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Como intercesor acreditado, tienes acceso completo al Dashboard de la Intranet, los 9 bloques confidenciales del Boletín de Oración y tu Diario espiritual.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* BOTÓN INTRANET EXCLUSIVO */}
            <button
              onClick={() => onNavigateTab('home')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b45309] text-[#070d19] font-extrabold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span>Entrar al Dashboard de la Intranet</span>
            </button>

            <button
              onClick={() => onNavigateTab('boletin')}
              className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs border border-white/30 backdrop-blur-xs transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              <span>Ver Boletín de 9 Bloques</span>
            </button>
          </div>
        </div>
      )}

      {/* CASO D: SI ES ADMIN -> ACCESO AL PANEL ADMINISTRADOR */}
      {currentUser.rol === 'admin' && (
        <div className="p-6 rounded-3xl bg-purple-950/20 border border-purple-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">shield_person</span>
              <span>Panel de Control Pastoral Admin</span>
            </div>
            <button
              onClick={() => onNavigateTab('admin')}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              Abrir Panel Admin
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Administra los roles de usuarios registrados, aprueba intercesores en 1 clic y gestiona las ediciones y los 9 bloques del boletín.
          </p>
        </div>
      )}

      {/* 3. Acciones de cuenta (Editar datos / Cerrar sesión) */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 text-xs">
        <button
          onClick={() => setIsRegistering(true)}
          className="text-slate-600 dark:text-slate-300 hover:text-[#0e9594] font-semibold flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          <span>Actualizar mis datos</span>
        </button>

        <button
          onClick={() => {
            onLogout();
            setIsLoggedIn(false);
          }}
          className="text-slate-400 hover:text-red-500 underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Cerrar sesión o cambiar de cuenta</span>
        </button>
      </div>
    </div>
  );
};

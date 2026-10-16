import React, { useState } from 'react';
import { NavTab, Language, UserRole } from '../types';
import { translations } from '../data/i18n';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  savedCount: number;
  userRole: UserRole;
  isUserApproved: boolean;
  isPlayingRadio: boolean;
  onToggleRadio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  lang,
  onLangChange,
  darkMode,
  onToggleDarkMode,
  savedCount,
  userRole,
  isUserApproved,
  isPlayingRadio,
  onToggleRadio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang] || translations.es;

  const handleTabClick = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Solo los intercesores aprobados o administradores tienen acceso a la Intranet
  const hasIntranetAccess = isUserApproved && (userRole === 'intercesor' || userRole === 'admin' || userRole === 'patrocinador');

  return (
    <nav className="sticky top-0 z-50 bg-[#070d19]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabClick('portal')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#0e9594] flex items-center justify-center text-[#38bdf8] border border-[#38bdf8]/30 shadow-md shadow-[#0e9594]/20 group-hover:scale-105 transition-transform shrink-0">
                <span className="material-symbols-outlined text-[24px]">church</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-title text-base sm:text-lg font-bold text-white tracking-wide leading-none">
                    MMM TURQUÍA
                  </span>
                </div>
                <span className="text-[10px] text-[#d4af37] font-semibold tracking-wider leading-tight">
                  Misión & Radio 24/7
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Inicio / Portal */}
            <button
              onClick={() => handleTabClick('portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentTab === 'portal'
                  ? 'bg-[#d4af37] text-[#070d19] font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">home</span>
              <span>{t.nav_portal}</span>
            </button>

            {/* Radio 24/7 Streaming Toggle */}
            <button
              onClick={onToggleRadio}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isPlayingRadio
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">
                {isPlayingRadio ? 'volume_up' : 'radio'}
              </span>
              <span>{t.nav_radio}</span>
              {isPlayingRadio && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </button>

            {/* Pestaña PERFIL (Siempre visible para registrarse o ver estado) */}
            <button
              onClick={() => handleTabClick('perfil')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentTab === 'perfil'
                  ? 'bg-[#0e9594] text-white font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">account_circle</span>
              <span>{t.nav_perfil}</span>
            </button>

            {/* SECCIONES DE LA INTRANET PROTEGIDA: SOLO VISIBLES SI ESTÁ APROBADO */}
            {hasIntranetAccess && (
              <>
                <span className="text-slate-600 px-1">|</span>

                <button
                  onClick={() => handleTabClick('home')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    currentTab === 'home'
                      ? 'bg-[#1a365d] text-white shadow-xs border border-[#38bdf8]/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                  title="Dashboard Intranet"
                >
                  <span className="material-symbols-outlined text-[17px]">dashboard</span>
                  <span>Intranet</span>
                </button>

                <button
                  onClick={() => handleTabClick('boletin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    currentTab === 'boletin'
                      ? 'bg-[#1a365d] text-white shadow-xs border border-[#38bdf8]/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">menu_book</span>
                  <span>{t.nav_boletin}</span>
                  <span className="px-1.5 py-0.2 bg-[#0e9594] text-white rounded-full text-[10px] font-bold">
                    9
                  </span>
                </button>

                <button
                  onClick={() => handleTabClick('diario')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    currentTab === 'diario'
                      ? 'bg-[#1a365d] text-white shadow-xs border border-[#38bdf8]/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">bookmark_heart</span>
                  <span>{t.nav_diario}</span>
                  {savedCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-[#e5a93b] text-slate-900 rounded-full text-[10px] font-bold">
                      {savedCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleTabClick('expediciones')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    currentTab === 'expediciones'
                      ? 'bg-[#1a365d] text-white shadow-xs border border-[#38bdf8]/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">explore</span>
                  <span>{t.nav_expediciones}</span>
                </button>
              </>
            )}

            {/* Admin pastoral tab */}
            {userRole === 'admin' && (
              <button
                onClick={() => handleTabClick('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  currentTab === 'admin'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-purple-300 hover:bg-purple-950/40'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">shield_person</span>
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
              {(['es', 'tr', 'en', 'it'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLangChange(l)}
                  className={`px-2 py-1 text-[11px] font-bold rounded-md uppercase transition-colors ${
                    lang === l
                      ? 'bg-[#0e9594] text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={`Cambiar a ${l.toUpperCase()}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
              title={darkMode ? t.light_mode : t.dark_mode}
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-[20px]">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Botón CTA Perfil / Intranet */}
            {hasIntranetAccess ? (
              <button
                onClick={() => handleTabClick('home')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#070d19] bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">lock_open</span>
                <span>Entrar a Intranet</span>
              </button>
            ) : (
              <button
                onClick={() => handleTabClick('perfil')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#070d19] bg-gradient-to-r from-[#d4af37] to-[#b45309] rounded-lg shadow-sm hover:opacity-95 transition-opacity"
              >
                <span className="material-symbols-outlined text-[16px]">account_circle</span>
                <span>Mi Perfil</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-200 hover:bg-slate-800"
              aria-label="Abrir menú"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070d19] px-4 py-3 space-y-1 shadow-2xl">
          <button
            onClick={() => handleTabClick('portal')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg ${
              currentTab === 'portal' ? 'bg-[#d4af37] text-slate-900 font-bold' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span>{t.nav_portal}</span>
          </button>

          <button
            onClick={onToggleRadio}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg text-slate-200 hover:bg-slate-800"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px]">radio</span>
              <span>Radio Esperanza 24/7</span>
            </div>
            <span className={`text-xs font-bold ${isPlayingRadio ? 'text-red-400' : 'text-slate-400'}`}>
              {isPlayingRadio ? 'EN VIVO' : 'Pausado'}
            </span>
          </button>

          <button
            onClick={() => handleTabClick('perfil')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg ${
              currentTab === 'perfil' ? 'bg-[#0e9594] text-white font-bold' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
            <span>Mi Perfil</span>
          </button>

          {hasIntranetAccess && (
            <>
              <div className="pt-2 pb-1 text-[11px] font-bold text-slate-500 uppercase px-3">
                Intranet Protegida
              </div>
              <button
                onClick={() => handleTabClick('home')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg ${
                  currentTab === 'home' ? 'bg-[#1a365d] text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span>Dashboard Intranet</span>
              </button>

              <button
                onClick={() => handleTabClick('boletin')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg ${
                  currentTab === 'boletin' ? 'bg-[#1a365d] text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  <span>{t.nav_boletin}</span>
                </div>
                <span className="px-2 py-0.5 bg-[#0e9594] text-white rounded-full text-xs font-bold">
                  9 Bloques
                </span>
              </button>

              <button
                onClick={() => handleTabClick('diario')}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg ${
                  currentTab === 'diario' ? 'bg-[#1a365d] text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">bookmark_heart</span>
                  <span>{t.nav_diario}</span>
                </div>
                {savedCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#e5a93b] text-slate-900 rounded-full text-xs font-bold">
                    {savedCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleTabClick('expediciones')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg ${
                  currentTab === 'expediciones' ? 'bg-[#1a365d] text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">explore</span>
                <span>{t.nav_expediciones}</span>
              </button>
            </>
          )}

          {userRole === 'admin' && (
            <button
              onClick={() => handleTabClick('admin')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg ${
                currentTab === 'admin' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">shield_person</span>
              <span>Panel Admin Pastoral</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

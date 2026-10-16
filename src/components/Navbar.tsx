import React, { useState } from 'react';
import { NavTab, Language } from '../types';
import { translations } from '../data/i18n';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  lang,
  onLangChange,
  darkMode,
  onToggleDarkMode,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang] || translations.es;

  const handleTabClick = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-[#0e9594]/30 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a365d] to-[#0e9594] flex items-center justify-center text-white shadow-md shadow-[#0e9594]/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">church</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-title text-base sm:text-lg font-bold text-[#1a365d] dark:text-white tracking-wide leading-none">
                    MMM TURQUÍA
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-[#e5a93b]/15 text-[#b45309] dark:bg-[#e5a93b]/25 dark:text-[#fde68a]">
                    INTRANET
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                  Movilización & Intercesión
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleTabClick('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentTab === 'home'
                  ? 'bg-[#1a365d] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#1a365d] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>{t.nav_home}</span>
            </button>

            <button
              onClick={() => handleTabClick('boletin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentTab === 'boletin'
                  ? 'bg-[#1a365d] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#1a365d] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              <span>{t.nav_boletin}</span>
              <span className="ml-0.5 px-1.5 py-0.2 bg-[#0e9594] text-white rounded-full text-[10px] font-bold">
                9
              </span>
            </button>

            <button
              onClick={() => handleTabClick('diario')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentTab === 'diario'
                  ? 'bg-[#1a365d] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#1a365d] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">bookmark_heart</span>
              <span>{t.nav_diario}</span>
              {savedCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-[#e5a93b] text-slate-900 rounded-full text-[10px] font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabClick('expediciones')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentTab === 'expediciones'
                  ? 'bg-[#1a365d] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#1a365d] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">explore</span>
              <span>{t.nav_expediciones}</span>
            </button>

            <button
              onClick={() => handleTabClick('ramadan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentTab === 'ramadan'
                  ? 'bg-[#1a365d] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#1a365d] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">nightlight</span>
              <span>{t.nav_ramadan}</span>
            </button>

            <button
              onClick={() => handleTabClick('perfil')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentTab === 'perfil'
                  ? 'bg-[#1a365d] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#1a365d] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">account_circle</span>
              <span>{t.nav_perfil}</span>
            </button>
          </div>

          {/* Right Controls: Languages, DarkMode, WhatsApp, Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              {(['es', 'tr', 'en', 'it'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLangChange(l)}
                  className={`px-2 py-1 text-[11px] font-bold rounded-md uppercase transition-colors ${
                    lang === l
                      ? 'bg-[#0e9594] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? t.light_mode : t.dark_mode}
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-[20px]">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* WhatsApp CTA button */}
            <a
              href="https://wa.me/51938204456?text=Hola,%20deseo%20unirme%20al%20grupo%20de%20intercesi%C3%B3n%20por%20Turqu%C3%ADa"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#25d366] to-[#128c7e] rounded-lg shadow-sm hover:opacity-95 transition-opacity"
            >
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              <span className="whitespace-nowrap">{t.nav_whatsapp}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Abrir menú de navegación"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] px-4 py-3 space-y-1 shadow-lg">
          <button
            onClick={() => handleTabClick('home')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg ${
              currentTab === 'home'
                ? 'bg-[#1a365d] text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span>{t.nav_home}</span>
          </button>

          <button
            onClick={() => handleTabClick('boletin')}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg ${
              currentTab === 'boletin'
                ? 'bg-[#1a365d] text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
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
              currentTab === 'diario'
                ? 'bg-[#1a365d] text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
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
              currentTab === 'expediciones'
                ? 'bg-[#1a365d] text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">explore</span>
            <span>{t.nav_expediciones}</span>
          </button>

          <button
            onClick={() => handleTabClick('ramadan')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg ${
              currentTab === 'ramadan'
                ? 'bg-[#1a365d] text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">nightlight</span>
            <span>{t.nav_ramadan}</span>
          </button>

          <button
            onClick={() => handleTabClick('perfil')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg ${
              currentTab === 'perfil'
                ? 'bg-[#1a365d] text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
            <span>{t.nav_perfil}</span>
          </button>

          <div className="pt-2">
            <a
              href="https://wa.me/51938204456?text=Hola,%20deseo%20unirme%20al%20grupo%20de%20intercesi%C3%B3n%20por%20Turqu%C3%ADa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#25d366] to-[#128c7e] rounded-lg shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>{t.nav_whatsapp}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

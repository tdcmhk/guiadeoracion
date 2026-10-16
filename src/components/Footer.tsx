import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

export const Footer: React.FC = () => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const handleOpenInstall = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        setShowInstallModal(true);
      }
    } else {
      setShowInstallModal(true);
    }
  };

  const handleShareWhatsApp = () => {
    const text = 'Te invito a unirte a la Intranet y Boletín de Oración por la Movilización en Turquía: ';
    const url = window.location.href;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + url)}`, '_blank');
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1a202c] text-[#e2e8f0] border-t-4 border-[#2b6cb0] mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8 border-b border-slate-700">
          
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a365d] to-[#0e9594] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">church</span>
              </div>
              <span className="font-serif-title text-lg font-bold text-white tracking-wide">
                MMM TURQUÍA — INTRANET
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Ministerio para la Movilización Transcultural en Turquía. Intercesión global, discipulado y soporte a obreros en campo.
            </p>
          </div>

          {/* Quick Actions (WhatsApp, Share, Install) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            {/* WhatsApp Group */}
            <a
              href="https://wa.me/51938204456?text=Hola,%20deseo%20unirme%20al%20grupo%20de%20intercesi%C3%B3n%20por%20Turqu%C3%ADa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#25d366] to-[#128c7e] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              <span>Grupo de Intercesión</span>
            </a>

            {/* Share dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-xs transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                <span>Compartir</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full mb-2 right-0 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-slate-800 dark:text-slate-200 text-xs">
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <span className="text-[#25d366] font-bold">●</span>
                    <span>Vía WhatsApp</span>
                  </button>
                  <button
                    onClick={handleShareFacebook}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <span className="text-[#1877f2] font-bold">●</span>
                    <span>Vía Facebook</span>
                  </button>
                </div>
              )}
            </div>

            {/* Install PWA Button */}
            <button
              onClick={handleOpenInstall}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0e9594] to-[#1a365d] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-transform border border-[#38bdf8]/30"
              title="Descargar e instalar la aplicación web en tu dispositivo"
            >
              <span className="material-symbols-outlined text-[16px]">download_for_offline</span>
              <span>{isInstalled ? 'App Instalada' : 'Instalar App'}</span>
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-slate-500 space-y-1">
          <p>© 2026 Movilización Turquía — Todos los derechos reservados.</p>
          <p className="italic text-slate-600">Contenido de uso exclusivo para la movilización de la iglesia y la intercesión pastoral.</p>
        </div>
      </div>

      {/* Modal de Instalación PWA */}
      <PWAInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isIOS={isIOS}
        onInstall={install}
      />

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-5 z-40 w-10 h-10 rounded-full bg-[#1a365d] hover:bg-[#0e9594] text-white flex items-center justify-center shadow-lg transition-colors border border-white/20"
        title="Volver arriba"
        aria-label="Volver al inicio"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
      </button>
    </footer>
  );
};

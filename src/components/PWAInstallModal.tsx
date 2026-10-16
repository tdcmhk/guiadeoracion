import React from 'react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onInstall: () => Promise<boolean>;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  onInstall
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0f172a] border border-[#d4af37]/40 p-6 sm:p-7 shadow-2xl space-y-5 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Cerrar modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[#070d19] border-2 border-[#d4af37]/60 p-2 shadow-lg flex items-center justify-center shrink-0">
            <img
              src="/assets/icons/app-icon.svg"
              alt="Icono App MMM Turquía"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] px-2 py-0.5 rounded-sm bg-[#d4af37]/15 border border-[#d4af37]/30">
              Web App Oficial (PWA)
            </span>
            <h3 className="font-serif-title text-lg sm:text-xl font-bold text-white mt-1">
              Descargar App MMM Turquía
            </h3>
            <p className="text-xs text-slate-400">Radio 24/7 • Boletín • Intercesión</p>
          </div>
        </div>

        {/* Status message */}
        {isInstalled ? (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
            <span>¡Ya tienes instalada la WebApp en este dispositivo! Puedes abrirla desde tu pantalla de inicio.</span>
          </div>
        ) : (
          <p className="text-xs text-slate-300 leading-relaxed">
            Instala la WebApp en tu teléfono o computadora para escuchar la radio en segundo plano, recibir alertas de oración y entrar a la plataforma sin necesidad de abrir el navegador.
          </p>
        )}

        {/* Direct Action Button if browser supports 1-click install */}
        {!isInstalled && isInstallable && (
          <button
            onClick={async () => {
              const res = await onInstall();
              if (res) onClose();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5a93b] to-[#b45309] text-slate-950 font-extrabold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[22px]">download</span>
            <span>Instalar con 1 Clic Ahora</span>
          </button>
        )}

        {/* Step-by-step instructions based on device */}
        <div className="space-y-3 pt-1">
          {isIOS ? (
            /* Guía para iPhone / iPad */
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-2.5 text-xs text-slate-200">
              <div className="flex items-center gap-2 font-bold text-[#38bdf8]">
                <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
                <span>Instalación en iPhone / iPad (iOS Safari):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>
                  Toca el botón <strong className="text-white">Compartir</strong> (ícono cuadrado con flecha hacia arriba <span className="material-symbols-outlined text-[14px] align-middle">ios_share</span>) en la barra de Safari.
                </li>
                <li>
                  Desliza hacia abajo y selecciona <strong className="text-[#d4af37]">"Agregar a pantalla de inicio"</strong>.
                </li>
                <li>
                  Pulsa <strong className="text-white">"Agregar"</strong> arriba a la derecha. ¡Listo!
                </li>
              </ol>
            </div>
          ) : (
            /* Guía para Android / Chrome / PC */
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-2.5 text-xs text-slate-200">
              <div className="flex items-center gap-2 font-bold text-[#38bdf8]">
                <span className="material-symbols-outlined text-[18px]">android</span>
                <span>En Android / Google Chrome:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>
                  Toca el menú de tres puntos (<strong className="text-white">⋮</strong>) arriba a la derecha en Chrome.
                </li>
                <li>
                  Selecciona <strong className="text-[#d4af37]">"Instalar aplicación"</strong> o <strong className="text-[#d4af37]">"Agregar a la pantalla principal"</strong>.
                </li>
                <li>
                  Confirma y el icono de MMM Turquía aparecerá junto a tus demás aplicaciones.
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Future APK Notice */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-[11px] flex items-start gap-2">
          <span className="material-symbols-outlined text-[16px] text-amber-400 shrink-0 mt-0.5">apk_install</span>
          <div>
            <strong className="block text-amber-300">Próximamente: Paquete APK directo</strong>
            <span>También dispondremos de la descarga directa del instalador .apk para Android sin intermediarios.</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
        >
          Entendido, cerrar
        </button>
      </div>
    </div>
  );
};

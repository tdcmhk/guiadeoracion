import React from 'react';

interface PerfilViewProps {
  prayedBlocksCount: number;
  savedEntriesCount: number;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  prayedBlocksCount,
  savedEntriesCount
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1a365d] to-[#0e9594] text-white flex items-center justify-center font-bold font-serif-title text-2xl shadow-md shrink-0">
            DG
          </div>

          <div className="space-y-1 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Intercesor Acreditado — Aprobado por Pastoral</span>
            </div>

            <h2 className="font-serif-title text-2xl font-bold text-slate-900 dark:text-white">
              Douglas Gómez
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              adolescentespl@gmail.com · Miembro de la Red de Intercesión Global
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">País</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">🇵🇪 Perú</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Iglesia</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">MMM Central</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Bloques Orados</span>
                <span className="text-xs font-bold font-mono-code text-[#0e9594]">{prayedBlocksCount}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">En Mi Diario</span>
                <span className="text-xs font-bold font-mono-code text-[#e5a93b]">{savedEntriesCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accreditation & Pastoral Verification Information */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-serif-title text-base font-bold text-[#1a365d] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0e9594]">shield_person</span>
          <span>Credencial de Acceso a la Intranet</span>
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Tu cuenta ha sido validada por el pastor coordinador general (Pr. Vicente Tapia). Posees autorización para consultar los bloques confidenciales del boletín, enviar confirmaciones de oración y acceder a las sesiones privadas de Zoom para vigilias por Turquía.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-1 font-mono-code">
          <div>ID de Intercesor: IT-TR-2026-9481</div>
          <div>Fecha de Registro: 15 de Octubre 2026</div>
          <div>Canal Notificaciones: WhatsApp Oficial (+51 938 204 456)</div>
        </div>
      </div>
    </div>
  );
};

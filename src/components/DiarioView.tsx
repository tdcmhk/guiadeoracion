import React, { useState } from 'react';
import { DailyPrayerEntry, Language } from '../types';

interface DiarioViewProps {
  entries: DailyPrayerEntry[];
  lang: Language;
  onAddEntry: (entry: Omit<DailyPrayerEntry, 'id'>) => void;
  onDeleteEntry: (id: string) => void;
}

export const DiarioView: React.FC<DiarioViewProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry
}) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'orado' | 'guardado' | 'contestado' | 'propio'>('todos');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newScripture, setNewScripture] = useState('');
  const [newCategory, setNewCategory] = useState<'orado' | 'guardado' | 'contestado' | 'propio'>('propio');
  const [newNotes, setNewNotes] = useState('');

  const filteredEntries = activeTab === 'todos'
    ? entries
    : entries.filter((e) => e.category === activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddEntry({
      title: newTitle.trim(),
      scripture: newScripture.trim() || undefined,
      category: newCategory,
      notes: newNotes.trim() || undefined,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    });
    setNewTitle('');
    setNewScripture('');
    setNewNotes('');
    setShowAddForm(false);
  };

  const getCategoryBadge = (cat: DailyPrayerEntry['category']) => {
    switch (cat) {
      case 'orado':
        return <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-[10px] font-bold uppercase">Orado</span>;
      case 'guardado':
        return <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 text-[10px] font-bold uppercase">Guardado</span>;
      case 'contestado':
        return <span className="px-2 py-0.5 rounded-sm bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 text-[10px] font-bold uppercase">Contestado</span>;
      case 'propio':
        return <span className="px-2 py-0.5 rounded-sm bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 text-[10px] font-bold uppercase">Petición Propia</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#0e9594] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[18px]">book_4</span>
            <span>Bitácora Espiritual del Intercesor</span>
          </div>
          <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#1a365d] dark:text-white">
            Mi Diario de Oración por Turquía
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            4 pilares de intercesión: motivos respaldados, guardados, testimonios contestados y peticiones familiares.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0e9594] hover:bg-[#0b7a79] text-white text-xs font-bold shadow-xs transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>{showAddForm ? 'Cerrar Formulario' : 'Nueva Petición'}</span>
        </button>
      </div>

      {/* Add Entry Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm animate-fadeIn">
          <h3 className="font-serif-title text-base font-bold text-[#1a365d] dark:text-white">
            Registrar Motivo o Testimonio Personal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Título del Motivo *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ej: Clamor por apertura de estudio bíblico en Esmirna"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Versículo de Respaldo (opcional)
              </label>
              <input
                type="text"
                value={newScripture}
                onChange={(e) => setNewScripture(e.target.value)}
                placeholder="Ej: Salmos 126:5 o 1 Pedro 2:9"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pilar / Categoría
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              >
                <option value="propio">Petición Propia Familiar / Misionera</option>
                <option value="orado">Motivo Orado</option>
                <option value="guardado">Motivo Guardado para Vigilia</option>
                <option value="contestado">Testimonio de Oración Contestada</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Notas y Confirmación
              </label>
              <input
                type="text"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="Anotaciones de intercesión o fecha..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0e9594] text-white text-xs font-bold hover:bg-[#0b7a79]"
            >
              Guardar en mi Diario
            </button>
          </div>
        </form>
      )}

      {/* Tabs Filter */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
        {[
          { id: 'todos', label: 'Todos', count: entries.length },
          { id: 'orado', label: 'Motivos Orados', count: entries.filter((e) => e.category === 'orado').length },
          { id: 'guardado', label: 'Guardados', count: entries.filter((e) => e.category === 'guardado').length },
          { id: 'contestado', label: 'Contestados', count: entries.filter((e) => e.category === 'contestado').length },
          { id: 'propio', label: 'Peticiones Propias', count: entries.filter((e) => e.category === 'propio').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-[#1a365d] dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-600 font-mono-code">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-[#131d33] rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
            No tienes motivos registrados en esta categoría aún.
          </div>
        ) : (
          filteredEntries.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-[#0e9594]/40 transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  {getCategoryBadge(item.category)}
                  <span className="text-[10px] text-slate-400 font-mono-code">{item.date}</span>
                </div>
                <h4 className="font-serif-title text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                {item.scripture && (
                  <div className="text-xs text-[#0e9594] font-semibold italic">
                    «{item.scripture}»
                  </div>
                )}
                {item.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => onDeleteEntry(item.id)}
                  className="p-1.5 text-slate-400 hover:text-[#c1272d] transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                  title="Eliminar de mi diario"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

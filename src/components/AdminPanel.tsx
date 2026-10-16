import React, { useState } from 'react';
import { UserProfile, UserRole, PrayerBlock, NavTab } from '../types';

interface AdminPanelProps {
  users: UserProfile[];
  blocks: PrayerBlock[];
  onApproveUser: (uid: string, targetRole: UserRole, state: boolean) => void;
  onUpdateBlock: (updatedBlock: PrayerBlock) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  users,
  blocks,
  onApproveUser,
  onUpdateBlock,
  onNavigateTab
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'usuarios' | 'bloques'>('usuarios');
  const [userFilter, setUserFilter] = useState<'todos' | 'pendientes' | 'intercesores' | 'seguidores'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Block editor state
  const [selectedBlockId, setSelectedBlockId] = useState<string>('seccion-1');
  const activeBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[0];

  const [blkTitulo, setBlkTitulo] = useState(activeBlock?.title || '');
  const [blkImagen, setBlkImagen] = useState(activeBlock?.imageUrl || '');
  const [blkVersiculo, setBlkVersiculo] = useState(activeBlock?.scriptureText || '');
  const [blkCita, setBlkCita] = useState(activeBlock?.scriptureRef || '');
  const [blkContexto, setBlkContexto] = useState(activeBlock?.context || '');
  const [blkDesafio, setBlkDesafio] = useState(activeBlock?.challenge || '');
  const [blkMotivosText, setBlkMotivosText] = useState(
    activeBlock?.items.map((i) => `${i.title}: ${i.description}`).join('\n') || ''
  );
  const [blkActivo, setBlkActivo] = useState(true);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Sync editor when block changes
  const handleSelectBlock = (blockId: string) => {
    setSelectedBlockId(blockId);
    const target = blocks.find((b) => b.id === blockId);
    if (target) {
      setBlkTitulo(target.title);
      setBlkImagen(target.imageUrl);
      setBlkVersiculo(target.scriptureText);
      setBlkCita(target.scriptureRef);
      setBlkContexto(target.context);
      setBlkDesafio(target.challenge);
      setBlkMotivosText(target.items.map((i) => `${i.title}: ${i.description}`).join('\n'));
      setBlkActivo(true);
    }
  };

  const handleBlockSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBlock) return;

    const parsedItems = blkMotivosText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((l) => {
        const parts = l.split(':');
        if (parts.length > 1) {
          return { title: parts[0].trim(), description: parts.slice(1).join(':').trim() };
        }
        return { title: 'Motivo', description: l };
      });

    const updated: PrayerBlock = {
      ...activeBlock,
      title: blkTitulo.trim(),
      imageUrl: blkImagen.trim() || activeBlock.imageUrl,
      scriptureText: blkVersiculo.trim(),
      scriptureRef: blkCita.trim(),
      context: blkContexto.trim(),
      challenge: blkDesafio.trim(),
      items: parsedItems
    };

    onUpdateBlock(updated);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const filteredUsers = users.filter((u) => {
    const matchesQuery = (u.nombre || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (u.pais || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;
    if (userFilter === 'pendientes') return !u.aprobado && u.rol === 'intercesor';
    if (userFilter === 'intercesores') return u.rol === 'intercesor';
    if (userFilter === 'seguidores') return u.rol === 'seguidor';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="p-6 rounded-3xl bg-[#1a365d] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <span className="material-symbols-outlined text-[28px]">shield_person</span>
          </div>
          <div>
            <h1 className="font-serif-title text-xl sm:text-2xl font-bold leading-tight">
              Panel Pastoral de Administración
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Control general de roles, solicitudes de intercesores y editor de los 9 bloques del boletín
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('home')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 border border-white/20 transition-colors"
          >
            Ir a Intranet
          </button>
          <button
            onClick={() => onNavigateTab('boletin')}
            className="px-3.5 py-1.5 rounded-xl bg-[#0e9594] hover:bg-[#0b7a79] text-xs font-bold text-white shadow-xs transition-colors"
          >
            Ver Boletín
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveAdminTab('usuarios')}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
            activeAdminTab === 'usuarios'
              ? 'bg-[#0e9594] text-white'
              : 'bg-white dark:bg-[#131d33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">group</span>
          <span>Aprobar & Administrar Roles ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('bloques')}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
            activeAdminTab === 'bloques'
              ? 'bg-[#0e9594] text-white'
              : 'bg-white dark:bg-[#131d33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
          <span>Editor de los 9 Bloques del Boletín</span>
        </button>
      </div>

      {/* =========================================================================
          PESTAÑA 1: GESTIÓN Y APROBACIÓN DE ROLES
          ========================================================================= */}
      {activeAdminTab === 'usuarios' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            {/* Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['todos', 'pendientes', 'intercesores', 'seguidores'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setUserFilter(f)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl uppercase tracking-wider transition-colors shrink-0 ${
                    userFilter === f
                      ? 'bg-[#1a365d] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, país o email..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
              <span className="material-symbols-outlined text-slate-400 absolute left-2.5 top-2.5 text-[18px]">
                search
              </span>
            </div>
          </div>

          {/* User List */}
          <div className="space-y-3">
            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No se encontraron usuarios en esta categoría.
              </div>
            ) : (
              filteredUsers.map((u) => {
                const isApproved = u.aprobado === true;

                return (
                  <div
                    key={u.uid}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors hover:border-[#0e9594]/40"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {u.nombre} {u.apellido || ''}
                        </h4>

                        {/* Status Badge */}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {isApproved ? '● Aprobado' : '● Pendiente de Aprobación'}
                        </span>

                        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase">
                          Rol: {u.rol}
                        </span>

                        {u.solicitud && !isApproved && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                            Solicita: {u.solicitud.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        📱 {u.whatsapp || 'Sin WhatsApp'} &nbsp;|&nbsp; 🌎 {u.pais || 'Sin país'} &nbsp;|&nbsp; ⛪ {u.iglesia || 'Sin iglesia'} &nbsp;|&nbsp; ✉️ {u.email || 'Sin correo'}
                      </p>
                    </div>

                    {/* 1-Click Pastoral Actions */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0 flex-wrap">
                      {/* WhatsApp link */}
                      {u.whatsapp && (
                        <a
                          href={`https://wa.me/${u.whatsapp.replace(/\D/g, '')}?text=Paz%20de%20Dios%20hermano(a)%20${encodeURIComponent(u.nombre)}.%20Le%20saluda%20el%20pastor%20Ricardo%20desde%20MMM%20Turqu%C3%ADa.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#25d366] text-xs font-semibold flex items-center gap-1 border border-[#25d366]/30"
                          title="Enviar WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[16px]">chat</span>
                        </a>
                      )}

                      {/* Botón Aprobar como Intercesor */}
                      <button
                        onClick={() => onApproveUser(u.uid, 'intercesor', true)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                          u.rol === 'intercesor' && isApproved
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-default'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-slate-900 shadow-xs'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span>Aprobar Intercesor</span>
                      </button>

                      {/* Botón Asignar Seguidor */}
                      <button
                        onClick={() => onApproveUser(u.uid, 'seguidor', true)}
                        className="px-3 py-1.5 rounded-xl bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#0284c7] dark:text-[#38bdf8] border border-[#38bdf8]/30 font-bold text-xs transition-colors"
                      >
                        Rol Seguidor
                      </button>

                      {/* Botón Revocar / Pausar */}
                      {isApproved && (
                        <button
                          onClick={() => onApproveUser(u.uid, u.rol, false)}
                          className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-xs font-semibold transition-colors"
                          title="Pausar o bloquear acceso"
                        >
                          Pausar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          PESTAÑA 2: EDITOR DE LOS 9 BLOQUES DEL BOLETÍN
          ========================================================================= */}
      {activeAdminTab === 'bloques' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131d33] border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          {/* Selector de Bloque (1 al 9) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <label className="block text-xs font-extrabold uppercase text-[#0e9594] tracking-wider mb-1">
                Selecciona el Bloque a Editar:
              </label>
              <select
                value={selectedBlockId}
                onChange={(e) => handleSelectBlock(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
              >
                {blocks.map((b) => (
                  <option key={b.id} value={b.id}>
                    BLOQUE {b.number}: {b.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <label className="flex items-center gap-2 text-xs font-bold text-[#1a365d] dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={blkActivo}
                  onChange={(e) => setBlkActivo(e.target.checked)}
                  className="w-4 h-4 text-[#0e9594] rounded-sm"
                />
                <span>Mostrar este bloque en el Boletín</span>
              </label>
            </div>
          </div>

          {/* Formulario del Bloque */}
          <form onSubmit={handleBlockSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Título del Bloque
                </label>
                <input
                  type="text"
                  required
                  value={blkTitulo}
                  onChange={(e) => setBlkTitulo(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Ruta de la Imagen
                </label>
                <input
                  type="text"
                  value={blkImagen}
                  onChange={(e) => setBlkImagen(e.target.value)}
                  placeholder="/src/assets/images/..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Texto del Versículo Bíblico
                </label>
                <textarea
                  rows={2}
                  value={blkVersiculo}
                  onChange={(e) => setBlkVersiculo(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Cita Bíblica
                </label>
                <input
                  type="text"
                  value={blkCita}
                  onChange={(e) => setBlkCita(e.target.value)}
                  placeholder="— 1 Pedro 1:15"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                Contexto e Historia
              </label>
              <textarea
                rows={3}
                value={blkContexto}
                onChange={(e) => setBlkContexto(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                El Desafío Actual
              </label>
              <textarea
                rows={3}
                value={blkDesafio}
                onChange={(e) => setBlkDesafio(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                Motivos de Oración (Un motivo por línea con formato Título: Descripción)
              </label>
              <textarea
                rows={4}
                value={blkMotivosText}
                onChange={(e) => setBlkMotivosText(e.target.value)}
                placeholder="Santidad: Oremos para que las mujeres latinas...&#10;Regeneración: Pidamos que la Palabra..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0e9594] font-mono-code"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0e9594] hover:bg-[#0b7a79] text-white font-bold text-sm shadow-md transition-colors"
              >
                💾 Guardar Cambios del Bloque en la Base de Datos
              </button>
              {saveSuccessMsg && (
                <div className="p-2.5 mt-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center border border-emerald-200">
                  ✅ ¡Bloque actualizado con éxito en toda la plataforma!
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

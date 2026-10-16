import { useState, useEffect, useRef } from 'react';
import { NavTab, Language, PrayerBlock, DailyPrayerEntry, ChatMessage, Poll, UserProfile, UserRole } from './types';
import {
  INITIAL_PRAYER_BLOCKS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_POLL,
  INITIAL_PROJECTS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_BIRTHDAYS,
  INITIAL_ONLINE_INTERCESSORS,
  INITIAL_DIARY_ENTRIES
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { RootHomeView } from './components/RootHomeView';
import { IntranetDashboard } from './components/IntranetDashboard';
import { BoletinView } from './components/BoletinView';
import { DiarioView } from './components/DiarioView';
import { ExpedicionesView } from './components/ExpedicionesView';
import { RamadanView } from './components/RamadanView';
import { PerfilView } from './components/PerfilView';
import { PastoralChatWidget } from './components/PastoralChatWidget';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Theme
  const [currentTab, setCurrentTab] = useState<NavTab>('portal');
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('mmmturquia_lang');
    return (saved as Language) || 'es';
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('mmmturquia_theme') === 'dark';
  });

  // User & Roles Management
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mmmturquia_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // default below
      }
    }
    return {
      uid: 'user-default-1',
      nombre: 'Douglas Gómez',
      email: 'adolescentespl@gmail.com',
      whatsapp: '+51 987 654 321',
      pais: 'Perú',
      iglesia: 'MMM Central',
      rol: 'discipulo',
      aprobado: false,
      solicitud: 'intercesor'
    };
  });

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('mmmturquia_all_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // default below
      }
    }
    return [
      {
        uid: 'user-default-1',
        nombre: 'Douglas Gómez',
        email: 'adolescentespl@gmail.com',
        whatsapp: '+51 987 654 321',
        pais: 'Perú',
        iglesia: 'MMM Central',
        rol: 'discipulo',
        aprobado: false,
        solicitud: 'intercesor'
      },
      {
        uid: 'user-2',
        nombre: 'Carmen Ramírez',
        email: 'carmen@gmail.com',
        whatsapp: '+57 300 123 4567',
        pais: 'Colombia',
        iglesia: 'Medellín Central',
        rol: 'intercesor',
        aprobado: true
      },
      {
        uid: 'user-3',
        nombre: 'Antonio Vega',
        email: 'antonio@empresa.com',
        whatsapp: '+34 600 987 654',
        pais: 'España',
        iglesia: 'Madrid Sur',
        rol: 'patrocinador',
        aprobado: true
      }
    ];
  });

  // Radio Streaming Engine
  const [isPlayingRadio, setIsPlayingRadio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Prayer collections state
  const [blocks, setBlocks] = useState<PrayerBlock[]>(() => {
    const saved = localStorage.getItem('mmmturquia_blocks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRAYER_BLOCKS;
      }
    }
    return INITIAL_PRAYER_BLOCKS;
  });

  const [poll, setPoll] = useState<Poll>(() => {
    const saved = localStorage.getItem('mmmturquia_poll');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_POLL;
      }
    }
    return INITIAL_POLL;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('mmmturquia_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CHAT_MESSAGES;
      }
    }
    return INITIAL_CHAT_MESSAGES;
  });

  const [diaryEntries, setDiaryEntries] = useState<DailyPrayerEntry[]>(() => {
    const saved = localStorage.getItem('mmmturquia_diary');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DIARY_ENTRIES;
      }
    }
    return INITIAL_DIARY_ENTRIES;
  });

  const [totalWeeklyPrayers, setTotalWeeklyPrayers] = useState<number>(() => {
    const saved = localStorage.getItem('mmmturquia_weekly_prayers');
    return saved ? parseInt(saved, 10) : 14892;
  });

  const [hasPrayedWeekly, setHasPrayedWeekly] = useState<boolean>(() => {
    return localStorage.getItem('mmmturquia_has_prayed_weekly') === 'true';
  });

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mmmturquia_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mmmturquia_theme', 'light');
    }
  }, [darkMode]);

  // Audio stream handler
  const handleToggleRadio = () => {
    if (!audioRef.current) return;
    if (isPlayingRadio) {
      audioRef.current.pause();
      setIsPlayingRadio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingRadio(true);
      }).catch((err) => {
        console.warn('Audio stream error:', err);
      });
    }
  };

  // Sync lang
  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('mmmturquia_lang', newLang);
  };

  // Switch role simulator
  const handleRoleSwitch = (newRole: UserRole, approved: boolean) => {
    const updated = { ...currentUser, rol: newRole, aprobado: approved };
    setCurrentUser(updated);
    localStorage.setItem('mmmturquia_current_user', JSON.stringify(updated));

    // Also update in allUsers
    setAllUsers((prev) => {
      const uList = prev.map((u) => (u.uid === updated.uid ? updated : u));
      localStorage.setItem('mmmturquia_all_users', JSON.stringify(uList));
      return uList;
    });
  };

  // Pastoral 1-click approval
  const handleApproveUser = (uid: string, targetRole: UserRole, state: boolean) => {
    setAllUsers((prev) => {
      const uList = prev.map((u) => {
        if (u.uid === uid) {
          return { ...u, rol: targetRole, aprobado: state };
        }
        return u;
      });
      localStorage.setItem('mmmturquia_all_users', JSON.stringify(uList));
      return uList;
    });

    if (currentUser.uid === uid) {
      const updated = { ...currentUser, rol: targetRole, aprobado: state };
      setCurrentUser(updated);
      localStorage.setItem('mmmturquia_current_user', JSON.stringify(updated));
    }
  };

  // Register new user request
  const handleRegisterUser = (data: Partial<UserProfile> & { targetRole: UserRole }) => {
    const newUser: UserProfile = {
      uid: `usr-${Date.now()}`,
      nombre: data.nombre || 'Nuevo Usuario',
      email: data.email || '',
      whatsapp: data.whatsapp || '',
      pais: data.pais || '',
      iglesia: data.iglesia || '',
      rol: 'discipulo',
      aprobado: false,
      solicitud: data.targetRole,
      fechaRegistro: new Date().toLocaleDateString('es-ES')
    };

    setCurrentUser(newUser);
    localStorage.setItem('mmmturquia_current_user', JSON.stringify(newUser));

    setAllUsers((prev) => {
      const uList = [newUser, ...prev];
      localStorage.setItem('mmmturquia_all_users', JSON.stringify(uList));
      return uList;
    });
  };

  // Actions for prayer blocks
  const handleTogglePrayBlock = (blockId: string) => {
    setBlocks((prev) => {
      const updated = prev.map((b) => {
        if (b.id === blockId) {
          const hasPrayed = !b.hasPrayed;
          const prayedCount = hasPrayed ? b.prayedCount + 1 : Math.max(0, b.prayedCount - 1);
          return { ...b, hasPrayed, prayedCount };
        }
        return b;
      });
      localStorage.setItem('mmmturquia_blocks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleSaveBlock = (block: PrayerBlock) => {
    const newIsSaved = !block.isSaved;

    setBlocks((prev) => {
      const updated = prev.map((b) => (b.id === block.id ? { ...b, isSaved: newIsSaved } : b));
      localStorage.setItem('mmmturquia_blocks', JSON.stringify(updated));
      return updated;
    });

    if (newIsSaved) {
      const newEntry: DailyPrayerEntry = {
        id: `entry-${block.id}-${Date.now()}`,
        title: `${block.title} (Bloque ${block.number})`,
        scripture: block.scriptureRef,
        category: 'guardado',
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
        notes: block.items[0]?.description
      };
      setDiaryEntries((prev) => {
        const updated = [newEntry, ...prev];
        localStorage.setItem('mmmturquia_diary', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleAddCommentToBlock = (blockId: string, text: string) => {
    setBlocks((prev) => {
      const updated = prev.map((b) => {
        if (b.id === blockId) {
          const newComment = {
            id: `comm-${Date.now()}`,
            author: `${currentUser.nombre} (${currentUser.rol.toUpperCase()})`,
            text,
            date: 'Ahora mismo'
          };
          return { ...b, comments: [newComment, ...b.comments] };
        }
        return b;
      });
      localStorage.setItem('mmmturquia_blocks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleIncrementWeeklyPrayers = () => {
    if (hasPrayedWeekly) return;
    const newTotal = totalWeeklyPrayers + 1;
    setTotalWeeklyPrayers(newTotal);
    setHasPrayedWeekly(true);
    localStorage.setItem('mmmturquia_weekly_prayers', newTotal.toString());
    localStorage.setItem('mmmturquia_has_prayed_weekly', 'true');
  };

  const handleVotePoll = (optionId: number) => {
    setPoll((prev) => {
      const updatedOptions = prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
      const updated = {
        ...prev,
        options: updatedOptions,
        totalVotes: prev.totalVotes + 1,
        userVotedOptionId: optionId
      };
      localStorage.setItem('mmmturquia_poll', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSendChatMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: currentUser.uid,
      userName: currentUser.nombre,
      role: `${currentUser.rol.toUpperCase()}`,
      content: text,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      avatar: currentUser.nombre.slice(0, 2).toUpperCase()
    };
    setChatMessages((prev) => {
      const updated = [...prev, newMsg];
      localStorage.setItem('mmmturquia_chat', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddDiaryEntry = (entry: Omit<DailyPrayerEntry, 'id'>) => {
    const newEntry: DailyPrayerEntry = {
      ...entry,
      id: `diary-${Date.now()}`
    };
    setDiaryEntries((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem('mmmturquia_diary', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteDiaryEntry = (id: string) => {
    setDiaryEntries((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem('mmmturquia_diary', JSON.stringify(updated));
      return updated;
    });
  };

  const prayedBlocksCount = blocks.filter((b) => b.hasPrayed).length;
  const savedEntriesCount = diaryEntries.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#070d19] text-slate-100 antialiased selection:bg-[#0e9594]/30 selection:text-white transition-colors duration-200">
      {/* Background Audio Stream Player */}
      <audio
        ref={audioRef}
        preload="none"
        src="https://stream.zeno.fm/f3wvbbqmdg8uv"
        onPlay={() => setIsPlayingRadio(true)}
        onPause={() => setIsPlayingRadio(false)}
      />

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        lang={lang}
        onLangChange={handleLangChange}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        savedCount={savedEntriesCount}
        userRole={currentUser.rol}
        isUserApproved={currentUser.aprobado}
        onOpenRoleModal={() => setCurrentTab('portal')}
        isPlayingRadio={isPlayingRadio}
        onToggleRadio={handleToggleRadio}
      />

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: PORTAL DE RAÍZ / HOME & RADIO 24/7 (index 1) */}
        {currentTab === 'portal' && (
          <RootHomeView
            currentUser={currentUser}
            allUsers={allUsers}
            lang={lang}
            onNavigateTab={setCurrentTab}
            onRoleSwitch={handleRoleSwitch}
            onApproveUser={handleApproveUser}
            onRegisterUser={handleRegisterUser}
            isPlayingRadio={isPlayingRadio}
            onToggleRadio={handleToggleRadio}
          />
        )}

        {/* TAB 2: INTRANET DASHBOARD (homeintranet) */}
        {currentTab === 'home' && (
          <IntranetDashboard
            events={INITIAL_CALENDAR_EVENTS}
            poll={poll}
            projects={INITIAL_PROJECTS}
            chatMessages={chatMessages}
            birthdays={INITIAL_BIRTHDAYS}
            onlineIntercessors={INITIAL_ONLINE_INTERCESSORS}
            lang={lang}
            onNavigateTab={setCurrentTab}
            onVotePoll={handleVotePoll}
            onSendChatMessage={handleSendChatMessage}
          />
        )}

        {/* TAB 3: BOLETÍN DE ORACIÓN (9 BLOQUES COMPLETOS) */}
        {currentTab === 'boletin' && (
          <BoletinView
            blocks={blocks}
            lang={lang}
            totalWeeklyPrayers={totalWeeklyPrayers}
            hasPrayedWeekly={hasPrayedWeekly}
            onIncrementWeeklyPrayers={handleIncrementWeeklyPrayers}
            onTogglePrayBlock={handleTogglePrayBlock}
            onToggleSaveBlock={handleToggleSaveBlock}
            onAddCommentToBlock={handleAddCommentToBlock}
          />
        )}

        {/* TAB 4: DIARIO DE ORACIÓN */}
        {currentTab === 'diario' && (
          <DiarioView
            entries={diaryEntries}
            lang={lang}
            onAddEntry={handleAddDiaryEntry}
            onDeleteEntry={handleDeleteDiaryEntry}
          />
        )}

        {/* TAB 5: EXPEDICIONES MISIONERAS */}
        {currentTab === 'expediciones' && (
          <ExpedicionesView projects={INITIAL_PROJECTS} />
        )}

        {/* TAB 6: PROGRAMA RAMADÁN 2026 */}
        {currentTab === 'ramadan' && (
          <RamadanView />
        )}

        {/* TAB 7: PERFIL DEL INTERCESOR */}
        {currentTab === 'perfil' && (
          <PerfilView
            prayedBlocksCount={prayedBlocksCount}
            savedEntriesCount={savedEntriesCount}
          />
        )}
      </main>

      {/* Floating Pastoral Chat Widget (WhatsApp connection) */}
      <PastoralChatWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
}

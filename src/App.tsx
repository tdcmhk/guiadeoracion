import { useState, useEffect } from 'react';
import { NavTab, Language, PrayerBlock, DailyPrayerEntry, ChatMessage, Poll } from './types';
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
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('mmmturquia_lang');
    return (saved as Language) || 'es';
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('mmmturquia_theme') === 'dark';
  });

  // State collections
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

  // Sync lang
  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('mmmturquia_lang', newLang);
  };

  // Actions
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

    // Update block state
    setBlocks((prev) => {
      const updated = prev.map((b) => (b.id === block.id ? { ...b, isSaved: newIsSaved } : b));
      localStorage.setItem('mmmturquia_blocks', JSON.stringify(updated));
      return updated;
    });

    // Add or remove from diary
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
            author: 'Douglas (Intercesor)',
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
      userId: 'user-douglas',
      userName: 'Douglas G.',
      role: 'Intercesor Acreditado',
      content: text,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      avatar: 'DG'
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        lang={lang}
        onLangChange={handleLangChange}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        savedCount={savedEntriesCount}
      />

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

        {currentTab === 'diario' && (
          <DiarioView
            entries={diaryEntries}
            lang={lang}
            onAddEntry={handleAddDiaryEntry}
            onDeleteEntry={handleDeleteDiaryEntry}
          />
        )}

        {currentTab === 'expediciones' && (
          <ExpedicionesView projects={INITIAL_PROJECTS} />
        )}

        {currentTab === 'ramadan' && (
          <RamadanView />
        )}

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

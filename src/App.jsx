import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, X, ExternalLink, Trophy, Flame, LayoutGrid, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import gamesData from './data/games.json';

const ALL_GAMES = gamesData;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(ALL_GAMES.map(g => g.category))];

  const filteredGames = useMemo(() => {
    return ALL_GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const featuredGame = ALL_GAMES[0]; // Just for show

  return (
    <div className="flex h-screen bg-[#0f172a] text-[#f8fafc] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col gap-8 p-6 flex-shrink-0 border-r border-slate-800 bg-[#0f172a] z-20">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => { setSelectedGame(null); setActiveCategory('All'); }}
        >
          <div className="w-10 h-10 bg-[#38bdf8] rounded flex items-center justify-center font-bold text-slate-900 text-xl shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            A
          </div>
          <h1 className="text-2xl font-black tracking-tighter">
            ARCADE<span className="text-[#38bdf8] underline decoration-2 underline-offset-4">.IO</span>
          </h1>
        </div>

        <nav className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">Library</p>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSelectedGame(null); }}
              className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                activeCategory === cat && !selectedGame
                  ? 'bg-[#38bdf8] text-[#0f172a] font-semibold'
                  : 'text-slate-400 hover:bg-[#1e293b] hover:text-[#38bdf8]'
              }`}
            >
              {cat} Games
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <p className="text-[10px] text-slate-500 mb-3 font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
            <Activity className="w-3 h-3 text-[#38bdf8]" /> Recent Pulse
          </p>
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <p className="text-[11px] text-slate-300 font-medium leading-none">2048 - 48k active</p>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div>
                <p className="text-[11px] text-slate-300 font-medium leading-none">Hextris - Patch v2.1</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navigation / Search */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10 flex-shrink-0 border-b border-slate-800">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search unblocked portal..."
              className="w-full bg-[#1e293b] border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/20 transition-all text-sm placeholder:text-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {!selectedGame ? (
              <motion.div
                key="browser-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                {/* Hero Section */}
                <section className="h-56 w-full bg-gradient-to-r from-sky-600 to-indigo-700 rounded-2xl p-10 relative flex items-center overflow-hidden shrink-0 shadow-lg shadow-sky-900/20">
                  <div className="relative z-10 w-2/3">
                    <span className="px-2 py-1 bg-white/20 rounded text-[9px] uppercase font-black tracking-widest border border-white/10 backdrop-blur-md">
                      Featured Experience
                    </span>
                    <h2 className="text-4xl font-black mt-2 mb-3 tracking-tighter uppercase">{featuredGame.title}</h2>
                    <p className="text-sky-100 opacity-90 text-sm max-w-md leading-relaxed">
                      {featuredGame.description} No downloads required, perfectly optimized for your system.
                    </p>
                    <button 
                      onClick={() => setSelectedGame(featuredGame)}
                      className="mt-6 bg-white text-indigo-900 px-8 py-2.5 rounded-lg font-bold hover:bg-sky-50 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                    >
                      Launch Now
                    </button>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute right-[-40px] top-[-40px] w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="absolute right-12 bottom-0 w-64 h-40 bg-slate-900/40 rounded-t-2xl border-x border-t border-white/20 p-6 backdrop-blur-sm">
                    <div className="w-full h-full bg-slate-800/50 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                       <img 
                        src={featuredGame.thumbnail} 
                        className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px]"
                        referrerPolicy="no-referrer"
                       />
                       <div className="w-12 h-12 border-4 border-[#38bdf8] border-t-transparent rounded-full animate-spin relative z-10"></div>
                    </div>
                  </div>
                </section>

                {/* Popular Games Grid */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold tracking-tight">Popular Games</h3>
                    <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                       Showing {filteredGames.length} digital artifacts
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredGames.map((game) => (
                      <motion.div
                        layoutId={`game-${game.id}`}
                        key={game.id}
                        onClick={() => setSelectedGame(game)}
                        className="group bg-[#1e293b] border border-slate-700 rounded-lg overflow-hidden flex flex-col cursor-pointer hover:border-[#38bdf8] transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transform active:scale-95"
                      >
                        <div className="aspect-video bg-slate-800 relative overflow-hidden">
                          <img 
                            src={game.thumbnail} 
                            alt={game.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-transparent"></div>
                          {game.id === '2048' && (
                            <div className="absolute bottom-2 right-2 bg-[#38bdf8] text-slate-900 text-[9px] font-black px-2 py-0.5 rounded tracking-tighter shadow-lg">
                              PREMIUM
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-sm tracking-tight mb-1 group-hover:text-[#38bdf8] transition-colors uppercase">{game.title}</h4>
                          <p className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                            <span>{game.category} • 4.8★</span>
                            <Flame className="w-3 h-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filteredGames.length === 0 && (
                    <div className="text-center py-24 bg-slate-800/10 rounded-2xl border border-dashed border-slate-700/50">
                       <LayoutGrid className="w-10 h-10 text-slate-800 mx-auto mb-4" />
                       <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">No matching artifacts in index</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="player-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedGame(null)}
                      className="p-2.5 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="text-2xl font-black tracking-tighter uppercase">{selectedGame.title}</h2>
                      <p className="text-[10px] text-sky-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Trophy className="w-3 h-3" /> Digital Sandbox // {selectedGame.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a 
                      href={selectedGame.iframeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/30 rounded-lg text-[#38bdf8] text-xs font-bold uppercase tracking-widest transition-all"
                    >
                      Source Access <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="relative aspect-video w-full bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden group">
                  <iframe 
                    src={selectedGame.iframeUrl} 
                    className="w-full h-full border-none"
                    title={selectedGame.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700 text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <Activity className="w-3 h-3 animate-pulse text-[#38bdf8]" /> PERSISTENT SESSION
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <section className="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">System Briefing</h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {selectedGame.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {selectedGame.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>
                  <aside className="p-6 bg-sky-500/5 rounded-xl border border-sky-500/20 flex flex-col justify-center gap-4">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-sky-500 rounded text-slate-900">
                          <Gamepad2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">Protocol Stats</span>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-[11px]">
                           <span className="text-slate-500 uppercase font-bold">Uptime</span>
                           <span className="font-mono text-sky-400">99.98%</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                           <span className="text-slate-500 uppercase font-bold">Latency</span>
                           <span className="font-mono text-sky-400">14ms</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full w-3/4 bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                        </div>
                     </div>
                  </aside>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
}

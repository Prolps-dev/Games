import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, X, ExternalLink, Trophy, Flame, LayoutGrid } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-orange-500/30 overflow-x-hidden">
      {/* Background Atmosphere - Reverted to original style as requested */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => { setSelectedGame(null); setSearchTerm(''); setActiveCategory('All'); }}
          >
            <div className="p-2 bg-orange-500 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
              Aether<span className="text-orange-500">Arcade</span>
            </h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search unblocked gems..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Category Filter */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all border shrink-0 ${
                      activeCategory === cat 
                        ? 'bg-orange-500 text-black border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <motion.div
                    layoutId={`game-${game.id}`}
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="group relative bg-[#111] rounded-2xl border border-white/5 overflow-hidden cursor-pointer hover:border-white/20 transition-all active:scale-[0.98]"
                    whileHover={{ y: -4 }}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500/80 bg-orange-500/10 px-2 py-0.5 rounded">
                          {game.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors uppercase italic">{game.title}</h3>
                      <p className="text-xs text-white/40 line-clamp-2 mt-1 leading-relaxed">{game.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10 backdrop-blur-sm">
                  <LayoutGrid className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <p className="text-white/40 uppercase tracking-[0.5em] font-black text-xs">The Digital Void</p>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest mt-2 italic">Awaiting New Artifacts...</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="player-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col gap-6 h-[calc(100vh-180px)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tight">{selectedGame.title}</h2>
                    <p className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <Flame className="w-3 h-3 text-orange-500" /> {selectedGame.category} Enthusiast Favorite
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                   <a 
                    href={selectedGame.iframeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-xs font-bold uppercase tracking-widest"
                  >
                    Portal View <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex-1 bg-black rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl group shadow-orange-500/5">
                <iframe 
                  src={selectedGame.iframeUrl} 
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Protocol Intel</h4>
                  <p className="text-sm leading-relaxed text-white/70 italic">&quot;{selectedGame.description}&quot;</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedGame.tags?.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-white/5 text-white/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-orange-500/10 rounded-2xl border border-orange-500/20 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">System Stability</span>
                  </div>
                  <p className="text-sm font-medium italic">Signal verified. Connection to artifact remains optimal.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="max-w-7xl mx-auto px-6 py-12 relative z-10 border-t border-white/5 mt-12 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="text-[10px] tracking-[0.4em] uppercase font-bold italic">
            AETHER ARCADE &copy; 2026 // <span className="text-orange-500">Persistent</span>
          </div>
          <div className="flex gap-8 text-[10px] tracking-widest uppercase font-black">
            <span>Systems.stable</span>
            <span>Latency.nil</span>
            <span>Uptime.99.9</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

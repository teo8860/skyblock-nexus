import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Book, Sword, Coins, Pickaxe, Target, Shield } from 'lucide-react';

export default function Guide() {
  const guides = [
    {
      icon: Coins,
      title: 'Money Making Guide',
      description: 'I metodi più profittevoli per fare coins',
      color: 'from-yellow-500 to-orange-500',
      topics: ['Mining', 'Farming', 'Flipping', 'Dungeons']
    },
    {
      icon: Sword,
      title: 'Combat Guide',
      description: 'Come diventare un guerriero imbattibile',
      color: 'from-red-500 to-rose-500',
      topics: ['Armor Sets', 'Weapons', 'Talismans', 'Boss Strategies']
    },
    {
      icon: Pickaxe,
      title: 'Mining Guide',
      description: 'Ottimizza il tuo mining per massimi profitti',
      color: 'from-gray-500 to-slate-500',
      topics: ['Crystal Hollows', 'Powder', 'Gemstones', 'Dwarven Mines']
    },
    {
      icon: Shield,
      title: 'Dungeon Guide',
      description: 'Master tutte le floor e i boss',
      color: 'from-purple-500 to-indigo-500',
      topics: ['Floor 7', 'Master Mode', 'Classes', 'Party Finder']
    },
    {
      icon: Target,
      title: 'Skill Leveling',
      description: 'Guida completa per ogni skill',
      color: 'from-blue-500 to-cyan-500',
      topics: ['Farming', 'Combat', 'Mining', 'Foraging']
    },
    {
      icon: Book,
      title: 'Beginner Guide',
      description: 'Perfetto per chi inizia ora',
      color: 'from-green-500 to-emerald-500',
      topics: ['First Steps', 'Early Game', 'Mid Game', 'End Game']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
      </div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="neon-text">
              Guide Complete
            </span>
          </h1>
          <p className="text-gray-400">Tutto quello che devi sapere per dominare SkyBlock</p>
        </div>

        {/* Guide Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-all hover:transform hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${guide.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-900/50 rounded-full text-xs text-purple-400 border border-slate-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Guide Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-lg border border-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            <span className="neon-text">
              Guida in Evidenza: Money Making 2025
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="neon-text">Top 5 Metodi per Fare Coins</h3>
              <ol className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <div className="neon-text">Bazaar Flipping</div>
                    <div className="neon-text">~50M/ora con capitale iniziale</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <div className="neon-text">Master Mode Dungeons</div>
                    <div className="neon-text">~30M/ora con RNG</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <div className="neon-text">Gemstone Mining</div>
                    <div className="neon-text">~25M/ora costante</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <div className="neon-text">Farming Contests</div>
                    <div className="neon-text">~20M/ora durante eventi</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div>
                    <div className="neon-text">Slayer</div>
                    <div className="neon-text">~15M/ora + XP</div>
                  </div>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="neon-text">Requisiti Consigliati</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="font-semibold text-purple-400 mb-1">Per Bazaar Flipping:</div>
                  <div className="text-gray-400">Capitale minimo: 100M coins</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="font-semibold text-purple-400 mb-1">Per Dungeons:</div>
                  <div className="text-gray-400">Catacombs 30+, Strong Gear</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="font-semibold text-purple-400 mb-1">Per Mining:</div>
                  <div className="text-gray-400">Mining 60, Gemstone Gauntlet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package, TrendingUp, DollarSign, Percent, Zap } from 'lucide-react'; // Aggiunto Zap per coerenza

export default function BazaarFlipper() {
  const [minProfit, setMinProfit] = useState(100000);
  
  const flips = [
    { 
      item: 'Enchanted Diamond Block', 
      buyPrice: '2.5M', 
      sellPrice: '2.8M', 
      profit: '300K',
      profitPercent: '12%',
      volume: 'High'
    },
    { 
      item: 'Enchanted Obsidian', 
      buyPrice: '850K', 
      sellPrice: '950K', 
      profit: '100K',
      profitPercent: '11.7%',
      volume: 'Medium'
    },
    { 
      item: 'Summoning Eye', 
      buyPrice: '550K', 
      sellPrice: '650K', 
      profit: '100K',
      profitPercent: '18%',
      volume: 'Low'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-inter">
      {/* Background Glows (Copied from AuctionTracker) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse opacity-50"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse opacity-50 animation-delay-2000"></div>
      </div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-5xl font-extrabold mb-4">
            <span className="neon-text">
              Bazaar Flipper
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Trova le migliori opportunità di flip nel Bazaar.</p>
        </div>

        {/* Filter Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 mb-8 shadow-xl">
          <label className="block text-sm font-medium mb-4 text-gray-300">
            Filtra per Profitto Minimo: <span className="text-purple-400 font-bold">{(minProfit / 1000).toFixed(0)}K coins</span>
          </label>
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={minProfit}
            onChange={(e) => setMinProfit(e.target.value)}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            style={{
              // Stile per il thumb (maniglia) per un aspetto moderno
              '--tw-ring-color': 'rgba(168, 85, 247, 1)',
              '--tw-ring-shadow': '0 0 0 4px rgba(168, 85, 247, 0.5)',
            }}
          />
        </div>

        {/* Stats Cards (Coerenti con AuctionTracker) */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Flip Disponibili</span>
                <Package className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold">{flips.length}</div>
            <div className="text-sm text-purple-400 mt-1">Aggiornamento live</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Profitto Medio</span>
                <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold">500K</div>
            <div className="text-sm text-green-400 mt-1">Stima sul campione</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Margine Medio</span>
                <Percent className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold">14%</div>
            <div className="text-sm text-blue-400 mt-1">Margine sul buy</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Status Feed</span>
                <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold">Live</div>
            <div className="text-sm text-yellow-400 mt-1">Aggiornamenti in tempo reale</div>
          </div>
        </div>

        {/* Flips Table (Coerente con AuctionTracker) */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Migliori Opportunità di Flip</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4 text-right">Buy Price</th>
                  <th className="py-3 px-4 text-right">Sell Price</th>
                  <th className="py-3 px-4 text-right">Profit</th>
                  <th className="py-3 px-4 text-right">Margin</th>
                  <th className="py-3 px-4 text-center">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {flips.map((flip, index) => (
                  <tr key={index} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white truncate max-w-[150px] sm:max-w-none">{flip.item}</td>
                    <td className="py-4 px-4 text-right text-gray-300">{flip.buyPrice}</td>
                    <td className="py-4 px-4 text-right text-gray-300">{flip.sellPrice}</td>
                    <td className="py-4 px-4 text-right text-green-400 font-bold">{flip.profit}</td>
                    <td className="py-4 px-4 text-right text-purple-400">{flip.profitPercent}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        flip.volume === 'High' ? 'bg-green-600/30 text-green-400' :
                        flip.volume === 'Medium' ? 'bg-yellow-600/30 text-yellow-400' :
                        'bg-red-600/30 text-red-400'
                      }`}>
                        {flip.volume}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
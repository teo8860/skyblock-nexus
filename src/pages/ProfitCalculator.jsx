import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calculator, DollarSign } from 'lucide-react';

export default function ProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [bazaarTax, setBazaarTax] = useState(true);

  const calculateProfit = () => {
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const qty = parseFloat(quantity) || 1;
    
    const totalBuy = buy * qty;
    const totalSell = sell * qty;
    const tax = bazaarTax ? totalSell * 0.0125 : 0; // 1.25% bazaar tax
    const profit = totalSell - totalBuy - tax;
    const profitPercent = buy > 0 ? ((profit / totalBuy) * 100).toFixed(2) : 0;

    return { totalBuy, totalSell, tax, profit, profitPercent };
  };

  const results = calculateProfit();

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toFixed(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
      </div>

      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="neon-text">
              Profit Calculator
            </span>
          </h1>
          <p className="text-gray-400">Calcola i tuoi profitti con precisione</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calculator className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold">Inserisci Dati</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Prezzo di Acquisto</label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Prezzo di Vendita</label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quantit�</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="1"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="bazaarTax"
                  checked={bazaarTax}
                  onChange={(e) => setBazaarTax(e.target.checked)}
                  className="w-4 h-4 text-green-500 rounded focus:ring-green-500"
                />
                <label htmlFor="bazaarTax" className="text-sm">
                  Includi Tassa Bazaar (1.25%)
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-6">
              <DollarSign className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold">Risultati</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Costo Totale</div>
                <div className="text-2xl font-bold text-red-400">
                  {formatNumber(results.totalBuy)} coins
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Ricavo Totale</div>
                <div className="text-2xl font-bold text-blue-400">
                  {formatNumber(results.totalSell)} coins
                </div>
              </div>

              {bazaarTax && (
                <div className="p-4 bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Tassa Bazaar</div>
                  <div className="text-2xl font-bold text-orange-400">
                    -{formatNumber(results.tax)} coins
                  </div>
                </div>
              )}

              <div className={`p-6 rounded-lg ${results.profit >= 0 ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'}`}>
                <div className="text-sm mb-2">Profitto Netto</div>
                <div className={`text-4xl font-bold ${results.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {results.profit >= 0 ? '+' : ''}{formatNumber(results.profit)} coins
                </div>
                <div className={`text-lg mt-2 ${results.profit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {results.profit >= 0 ? '+' : ''}{results.profitPercent}% ROI
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
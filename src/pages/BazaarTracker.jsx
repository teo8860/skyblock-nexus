import * as React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { hypixelGet } from "../lib/api";
import { Search, RotateCw, ChevronLeft, ChevronRight, DollarSign, BarChart2 } from 'lucide-react';

function ThBtn({ label, sortKey, sortBy, sortDir, setSortBy, setSortDir }) {
  const active = sortBy === sortKey;
  const ArrowIcon = active ? (sortDir === "desc" ? BarChart2 : BarChart2) : BarChart2; // Sostituito frecce con icona generica per la tabella
  const color = active ? "text-white" : "text-gray-400";
  return (
    <button
      onClick={() => {
        if (active) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
        else { setSortBy(sortKey); setSortDir("desc"); }
      }}
      className={`flex items-center justify-end space-x-1 ${color} hover:text-white transition-colors`}
      style={{ all: "unset", cursor: "pointer" }}
      title={`Ordina per ${label}`}
    >
      <span>{label}</span>
      {/* Visualizzazione freccia per indicare l'ordinamento */}
      {active && <span className="font-mono text-xs">{sortDir === "desc" ? "▼" : "▲"}</span>}
    </button>
  );
}

const formatNumber = (num, decimals = 0) => {
    if (num === null || num === undefined) return 'N/A';
    if (Math.abs(num) >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (Math.abs(num) >= 1000) return `${(num / 1000).toFixed(decimals)}K`;
    return num.toFixed(decimals).toLocaleString('it-IT');
};

export default function BazaarTracker() {
  const [loading, setLoading]   = React.useState(true);
  const [error, setError]       = React.useState("");
  const [rows, setRows]         = React.useState([]);
  const [q, setQ]               = React.useState("");
  const [pageSize, setPageSize] = React.useState(250);
  const [page, setPage]         = React.useState(1);
  const [sortBy, setSortBy]     = React.useState("spread");
  const [sortDir, setSortDir]   = React.useState("desc");

  const pageSizes = [100, 250, 500, 1000, -1]; // -1 = All

  const load = React.useCallback(async (opts = {}) => {
    try {
      if (!opts.silent) setLoading(true);
      setError("");
      const data = await hypixelGet("skyblock/bazaar", {}, { ttlMs: 60_000 });
      const products = data?.products || {};
      const list = Object.entries(products).map(([id, p]) => {
        const s = p.quick_status || p.quickStatus || {};
        const buy  = Number(s.buyPrice  ?? s.buy_price  ?? 0);
        const sell = Number(s.sellPrice ?? s.sell_price ?? 0);
        const buyVol  = Number(s.buyVolume  ?? s.buy_volume  ?? 0);
        const sellVol = Number(s.sellVolume ?? s.sell_volume ?? 0);
        const spread = sell - buy;
        const margin = sell > 0 ? (spread / sell) : 0;
        return { id, buy, sell, spread, margin, buyVol, sellVol };
      });
      setRows(list);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      if (!opts.silent) setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let cancel = false;
    (async () => { if (!cancel) await load(); })();
    const t = setInterval(() => load({ silent: true }), 60_000);
    return () => { cancel = true; clearInterval(t); };
  }, [load]);

  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r => r.id.toLowerCase().includes(term));
  }, [rows, q]);

  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    arr.sort((a,b) => {
      const k = sortBy;
      const av = a[k], bv = b[k];
      if (av === bv) return 0;
      if (sortDir === "desc") return (bv > av) ? 1 : -1;
      return (av > bv) ? 1 : -1;
    });
    return arr;
  }, [filtered, sortBy, sortDir]);

  const pageCount = React.useMemo(() => {
    if (pageSize === -1) return 1;
    return Math.max(1, Math.ceil(sorted.length / pageSize));
  }, [sorted.length, pageSize]);

  const current = React.useMemo(() => {
    if (pageSize === -1) return sorted;
    const p = Math.min(Math.max(1, page), pageCount);
    const start = (p - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize, pageCount]);

  React.useEffect(() => { setPage(1); }, [q, pageSize, sortBy, sortDir]);

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
                    Bazaar Tracker
                </span>
            </h1>
            <p className="text-gray-400 text-lg">
                Spread, margine %, volumi e prezzi dal Bazaar. Ricerca, ordinamento e paginazione.
            </p>
        </div>

        {/* Search & Paging Controls (Coerenti con AuctionTracker) */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Cerca item (es. ENCHANTED_CARROT)"
                    value={q}
                    onChange={e=>setQ(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
            </div>
            
            <div className="flex items-center justify-between md:col-span-2 space-x-2">
                <select
                  value={pageSize}
                  onChange={e=>setPageSize(Number(e.target.value))}
                  title="Righe per pagina"
                  className="flex-shrink-0 p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  {pageSizes.map(s => <option key={s} value={s}>{s===-1?"All":s}</option>)}
                </select>

                <button 
                  onClick={() => load()} 
                  disabled={loading}
                  className="flex items-center p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Refresh"
                >
                    <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>

                <div className="text-gray-400 text-sm flex-shrink-0">
                    Pagina <span className="text-white font-semibold">{page}</span> / {pageCount}
                </div>
                
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1 || loading}
                    className="flex items-center p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                    onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                    disabled={page >= pageCount || loading}
                    className="flex items-center p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>

        {loading && <div className="text-center p-8 text-blue-400">Caricamento…</div>}
        {error && <div className="text-center p-8 text-red-400 bg-red-900/20 border border-red-700 rounded-lg">Errore: {error}</div>}

        {/* Flips Table (Coerente con AuctionTracker) */}
        {!loading && !error && (
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-2xl">
              <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-700">
                      <thead>
                          <tr className="text-right text-sm font-medium text-gray-400 uppercase tracking-wider">
                              <th className="py-3 px-4 text-left">
                                <ThBtn label="Item" sortKey="id" sortBy={sortBy} sortDir={sortDir} setSortBy={setSortBy} setSortDir={setSortDir} />
                              </th>
                              <th className="py-3 px-4">
                                <ThBtn label="Buy" sortKey="buy" sortBy={sortBy} sortDir={sortDir} setSortBy={setSortBy} setSortDir={setSortDir} />
                              </th>
                              <th className="py-3 px-4">
                                <ThBtn label="Sell" sortKey="sell" sortBy={sortBy} sortDir={sortDir} setSortBy={setSortBy} setSortDir={setSortDir} />
                              </th>
                              <th className="py-3 px-4">
                                <ThBtn label="Spread" sortKey="spread" sortBy={sortBy} sortDir={sortDir} setSortBy={setSortBy} setSortDir={setSortDir} />
                              </th>
                              <th className="py-3 px-4">
                                <ThBtn label="Margine %" sortKey="margin" sortBy={sortBy} sortDir={sortDir} setSortBy={setSortBy} setSortDir={setSortDir} />
                              </th>
                              <th className="py-3 px-4">
                                <ThBtn label="Buy Vol." sortKey="buyVol" sortBy={sortBy} sortDir={sortDir} setSortBy={setSortBy} setSortDir={setSortDir} />
                              </th>
                              <th className="py-3 px-4">
                                <ThBtn label="Sell Vol." sortKey="sellVol" sortBy={sortBy} sortDir={sortDir} setSortBy={setSortBy} setSortDir={setSortDir} />
                              </th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                          {current.length === 0 ? (
                              <tr>
                                  <td colSpan="7" className="text-center py-8 text-gray-500">
                                      Nessun dato da mostrare. Prova a cambiare ricerca o ricaricare.
                                  </td>
                              </tr>
                          ) : (
                              current.map((r) => (
                                  <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                                      <td className="py-4 px-4 font-mono text-xs sm:text-sm text-white truncate max-w-[150px] sm:max-w-none">{r.id}</td>
                                      <td className="py-4 px-4 text-right text-gray-300">{formatNumber(r.buy, 2)}</td>
                                      <td className="py-4 px-4 text-right text-gray-300">{formatNumber(r.sell, 2)}</td>
                                      <td className="py-4 px-4 text-right font-bold" style={{color: r.spread >= 0 ? "#34d399" : "#f87171"}}>{formatNumber(r.spread, 2)}</td>
                                      <td className="py-4 px-4 text-right text-purple-400">{(r.margin*100).toFixed(2)}%</td>
                                      <td className="py-4 px-4 text-right text-cyan-400">{r.buyVol.toLocaleString()}</td>
                                      <td className="py-4 px-4 text-right text-orange-400">{r.sellVol.toLocaleString()}</td>
                                  </tr>
                              ))
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
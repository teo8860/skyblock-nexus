import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, TrendingUp, TrendingDown, DollarSign, Clock, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Utility Functions ---

const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)}B`;
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `${(price / 1000).toFixed(0)}K`;
    return price.toLocaleString('it-IT');
};

const formatTimeRemaining = (endTime) => {
    const now = Date.now();
    const diff = endTime - now;

    if (diff <= 0) return "Terminata";

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    let parts = [];
    if (days > 0) parts.push(`${days}g`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 && parts.length < 2) parts.push(`${minutes}m`);

    return parts.length > 0 ? parts.join(' ') : '<1m';
};


const API_URL = "https://api.hypixel.net/v2/skyblock/auctions";

export default function AuctionTracker() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [auctions, setAuctions] = React.useState([]);
    const [q, setQ] = React.useState(""); // Search query
    const [page, setPage] = React.useState(0);
    const [total, setTotal] = React.useState(1); // Total pages

    // --- API Loading Logic ---
    const load = React.useCallback(async (opts = {}) => {
        try {
            if (!opts.silent) setLoading(true);
            setError("");
            
            // Note: Since this is a public endpoint, we use a standard fetch.
            // In a real environment, `hypixelGet` likely handles API keys/retries.
            const url = new URL(API_URL);
            url.searchParams.set('page', page);

            let data;
            const response = await fetch(url.toString());
            
            if (!response.ok) {
                throw new Error(`Errore HTTP! Status: ${response.status}`);
            }
            
            data = await response.json();
            
            if (!data.success) {
                throw new Error(data.cause || "Errore sconosciuto API Hypixel");
            }
            
            setTotal(data.totalPages || data.total_pages || 1);
            
            const list = data.auctions || [];
            const rows = list.map(a => ({
                id: a.uuid,
                item: a.item_name || "Oggetto Sconosciuto",
                bin: a.bin ?? a.isBin ?? false,
                startingBid: a.starting_bid ?? 0,
                highestBid: a.highest_bid_amount ?? 0,
                end: a.end ?? 0,
            }));
            setAuctions(rows);

        } catch (e) {
            console.error("Fetch Error:", e);
            setError(`Impossibile caricare le aste: ${e.message}`);
        } finally {
            if (!opts.silent) setLoading(false);
        }
    }, [page]);

    // Initial load and auto-refresh
    React.useEffect(() => {
        let cancel = false;
        (async () => { if (!cancel) await load(); })();
        const t = setInterval(() => load({ silent: true }), 60000); // Refresh every 60 seconds
        return () => { cancel = true; clearInterval(t); };
    }, [load]);

    // Filter auctions based on search query
    const filtered = auctions.filter(a =>
        !q || (a.item || "").toLowerCase().includes(q.toLowerCase())
    );

    // Placeholder Stats (since real trend data requires more complex fetching/storage)
    const mockStats = {
        avgPrice: '325M',
        avgChange: '+8%',
        activeAuctions: auctions.length.toLocaleString(),
        bestDeal: 'Warden Helmet',
        bestDealChange: '-25%',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-inter">
            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse opacity-50"></div>
                <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse opacity-50 animation-delay-2000"></div>
            </div>

            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-5xl font-extrabold mb-4">
                        <span className="neon-text">
                            Auction House Tracker
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Aste live da Hypixel SkyBlock con ricerca e paginazione.
                    </p>
                </div>

                {/* Search & Paging Controls */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Cerca un item (es. Necron's Handle)..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                        />
                    </div>
                    
                    {/* Paging Controls */}
                    <div className="flex items-center justify-between md:col-span-2 space-x-2">
                        <button
                            onClick={() => load()}
                            disabled={loading}
                            className="flex items-center p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>

                        <button
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page <= 0 || loading}
                            className="flex items-center p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <div className="text-gray-400 text-sm flex-shrink-0">
                            Pagina <span className="text-white font-semibold">{page + 1}</span> / {total}
                        </div>
                        
                        <button
                            onClick={() => setPage(p => Math.min(total - 1, p + 1))}
                            disabled={page >= total - 1 || loading}
                            className="flex items-center p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>


                {/* Stats Cards (Static for now, could be dynamic with more complex API logic) */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Prezzo Medio (Mock)</span>
                            <DollarSign className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold">{mockStats.avgPrice}</div>
                        <div className="text-sm text-green-400 mt-1">{mockStats.avgChange} questa settimana</div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Aste Attive (Pagina)</span>
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold">{mockStats.activeAuctions}</div>
                        <div className="text-sm text-blue-400 mt-1">Totale pagine: {total}</div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Miglior Affare (Mock)</span>
                            <TrendingDown className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="text-3xl font-bold">{mockStats.bestDealChange}</div>
                        <div className="text-sm text-purple-400 mt-1">{mockStats.bestDeal}</div>
                    </div>
                </div>

                {/* Auction Table */}
                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-200">Aste Live</h2>
                    
                    {loading && (
                        <div className="text-center p-8 text-blue-400">
                            Caricamento Aste...
                        </div>
                    )}
                    
                    {error && (
                        <div className="text-center p-8 text-red-400 bg-red-900/20 border border-red-700 rounded-lg">
                            <span className="font-semibold">Errore di connessione:</span> {error}
                        </div>
                    )}
                    
                    {!loading && !error && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-700">
                                <thead>
                                    <tr className="text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                        <th className="py-3 px-4">Item</th>
                                        <th className="py-3 px-4 text-right hidden sm:table-cell">Offerta Iniziale</th>
                                        <th className="py-3 px-4 text-right">Prezzo Attuale</th>
                                        <th className="py-3 px-4 text-center">Tipo</th>
                                        <th className="py-3 px-4 text-right">Fine Asta</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-8 text-gray-500">
                                                Nessuna asta trovata per la ricerca corrente o nella Pagina {page + 1}.
                                            </td>
                                        </tr>
                                    ) : (
                                        filtered.map(a => (
                                            <tr key={a.id} className="hover:bg-slate-900/50 transition-colors">
                                                <td className="py-4 px-4 font-semibold text-white truncate max-w-[200px] sm:max-w-none">{a.item}</td>
                                                <td className="py-4 px-4 text-right text-gray-400 hidden sm:table-cell">{formatPrice(a.startingBid)}</td>
                                                <td className="py-4 px-4 text-right text-purple-400 font-bold text-lg">{formatPrice(a.highestBid || a.startingBid)}</td>
                                                <td className="py-4 px-4 text-center">
                                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${a.bin ? 'bg-green-600/30 text-green-400' : 'bg-blue-600/30 text-blue-400'}`}>
                                                        {a.bin ? 'BIN' : 'Asta'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-right text-gray-300 flex items-center justify-end space-x-1">
                                                    <Clock className="w-4 h-4 text-cyan-400 hidden sm:inline-block" />
                                                    <span>{formatTimeRemaining(a.end)}</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

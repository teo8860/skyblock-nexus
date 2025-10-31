import * as React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { hypixelFast } from "../lib/hypixelFast";
import { User, Wallet, Banknote, DollarSign, Clock, RefreshCw } from 'lucide-react';

function normUUID(s) {
  return (s || "").toLowerCase().replace(/[^a-f0-9]/g, "");
}
function loadHistory() {
  try { return JSON.parse(localStorage.getItem("goldHistory") || "[]"); }
  catch { return []; }
}
function saveHistory(h) {
  try { localStorage.setItem("goldHistory", JSON.stringify(h)); } catch {}
}

// Tenta v2 -> fallback v1; riporta anche messaggi d'errore "success:false"
async function getProfilesSmart(uuid) {
  const q = { uuid };
  let lastErr = null;

  const attempts = [
    { path: "v2/skyblock/profiles", label: "v2" },
  ];

  for (const att of attempts) {
    try {
      const data = await hypixelFast("skyblock/profile",q, { ttlMs: 5 * 60_000 });
      // Alcune risposte Hypixel usano { success:false, cause:"..." }
      if (data && data.success === false) {
        lastErr = new Error(`Hypixel ${att.label}: ${data.cause || "success:false"}`);
        continue;
      }
      if (!data || !Array.isArray(data.profiles)) {
        lastErr = new Error(`Hypixel ${att.label}: struttura inattesa`);
        continue;
      }
      return { data, via: att.label };
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("Impossibile recuperare i profili (v2 e v1)");
}

export default function GoldTracker() {
  const [input, setInput] = React.useState("");
  const [uuid, setUuid] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [debug, setDebug] = React.useState(""); // info diagnostica
  const [profile, setProfile] = React.useState(null);
  const [history, setHistory] = React.useState(loadHistory());

  async function loadProfile(rawUuid) {
    const u = normUUID(rawUuid);
    if (!u || u.length !== 32) {
      setError("UUID non valido. Inserisci l'UUID completo (con o senza trattini).");
      setProfile(null);
      setDebug("");
      return;
    }

    setUuid(u);
    setLoading(true);
    setError("");
    setDebug("");
    setProfile(null);

    try {
      const { data, via } = await getProfilesSmart(u);
      setDebug(`Endpoint usato: ${via} • profiles=${(data?.profiles || []).length}`);

      const profiles = (data?.profiles || []).filter(p => p?.members && p.members[u]);
      if (!profiles.length) {
        throw new Error("Nessun profilo trovato per questo UUID (profilo privato o inesistente).");
      }

      let chosen = profiles.find(p => p.selected);
      if (!chosen) {
        chosen = profiles
          .map(p => ({ p, ls: p.members[u]?.last_save || 0 }))
          .sort((a,b) => b.ls - a.ls)[0]?.p;
      }
      if (!chosen) throw new Error("Impossibile selezionare un profilo valido.");

      const member = chosen.members[u] || {};
      const purse = Number(member.coin_purse || 0);
      const bank  = Number(chosen?.banking?.balance || 0);
      const total = purse + bank;
      const lastSave = Number(member.last_save || chosen.last_save || 0);

      setProfile({
        purse, bank, total,
        last_save: lastSave,
        profile_id: chosen.profile_id || chosen.profileId || "sconosciuto",
        selected: !!chosen.selected
      });

      const newHist = [...history, { t: Date.now(), v: total }].slice(-50);
      setHistory(newHist);
      saveHistory(newHist);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    loadProfile(input);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-inter">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse opacity-50"></div>
          <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse opacity-50 animation-delay-2000"></div>
      </div>

      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center sm:text-left">
            <h1 className="text-5xl font-extrabold mb-4">
                <span className="neon-text">
                    Gold Tracker
                </span>
            </h1>
            <p className="text-gray-400 text-lg">
                Borsa + Banca dal profilo Hypixel SkyBlock. Inserisci l'UUID.
            </p>
        </div>

        {/* Input Form (Coerente con AuctionTracker) */}
        <form onSubmit={onSubmit} className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 mb-8 shadow-xl flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    value={input}
                    onChange={e=>setInput(e.target.value)}
                    placeholder="UUID giocatore (es. 123e4567-e89b-12d3-a456-426614174000)"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-700/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                />
            </div>
            <button 
                type="submit" 
                disabled={loading}
                className="flex items-center justify-center px-6 py-3.5 bg-yellow-600/50 border border-yellow-700 rounded-xl hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold"
            >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Carica profilo'}
            </button>
        </form>

        {error && (
            <div className="text-center p-4 mb-8 text-red-400 bg-red-900/20 border border-red-700 rounded-lg">
                <span className="font-semibold">Errore:</span> {error}
            </div>
        )}
        {debug && <div className="text-sm p-2 mb-4 text-gray-400 bg-slate-800/50 border border-slate-700 rounded-lg">Debug: {debug}</div>}


        {/* Profile Stats */}
        {profile && (
            <>
                <h2 className="text-3xl font-bold mb-6 text-gray-200">
                    Saldo Attuale <small className="text-purple-400 text-base">{profile.selected ? "(Profilo Selected)" : "(Più Recente)"}</small>
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Totale */}
                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Totale Gold</span>
                            <DollarSign className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="text-4xl font-extrabold text-yellow-300">{profile.total.toLocaleString()}</div>
                    </div>

                    {/* Borsa */}
                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Borsa (Purse)</span>
                            <Wallet className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold">{profile.purse.toLocaleString()}</div>
                    </div>

                    {/* Banca */}
                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Banca (Bank)</span>
                            <Banknote className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold">{profile.bank.toLocaleString()}</div>
                        {profile.bank === 0 && <p className="text-xs text-gray-500 mt-1">(Dato non esposto o saldo 0)</p>}
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                    Ultimo salvataggio: {profile.last_save ? new Date(profile.last_save).toLocaleString("it-IT") : "—"} | Profile ID: {profile.profile_id}
                </p>

                {/* History (Stile List) */}
                {history.length > 1 && (
                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-xl mt-8">
                        <h3 className="text-xl font-bold mb-4 text-gray-200 flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-purple-400" />
                            <span>Andamento Storico (Locale)</span>
                        </h3>
                        <ul className="divide-y divide-slate-700 max-h-60 overflow-y-auto">
                            {history.slice().reverse().map((h,i) => {
                                const prev = history[history.length - i - 2];
                                const diff = prev ? h.v - prev.v : 0;
                                const color = diff > 0 ? "text-green-400" : diff < 0 ? "text-red-400" : "text-gray-400";
                                return (
                                    <li key={h.t} className="py-2 text-sm flex justify-between items-center">
                                        <span className="text-gray-400">{new Date(h.t).toLocaleString("it-IT")}</span>
                                        <span className={`font-mono font-semibold ${color}`}>
                                            {h.v.toLocaleString()}
                                            {diff !== 0 && <small className={`ml-3 ${color} font-normal`}>({diff>0?"+":""}{diff.toLocaleString()})</small>}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </>
        )}
      </main>

      <Footer />
    </div>
  );
}
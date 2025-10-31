import React from 'react';
import { Link } from 'react-router-dom';
import { // ... (TUTTE LE ICONE INCLUSE)
  TrendingUp, Calculator, Package, Sword, Sparkles, Users, ExternalLink, 
  Zap, Compass, FlaskConical, PiggyBank, Hammer, Eye, Rocket, Leaf, Fish, Pickaxe, BarChart3, Swords, ScrollText, Dices, Receipt, Castle, Key, Vault, PawPrint, Clock, Timer, Box, Shield, BookOpen 
} from 'lucide-react'; 

// --- Mappatura degli Emoji alle Icone Lucide e Assegnazione dei Colori ---
export const toolIconMap = { 
  '💹': TrendingUp,  '📈': BarChart3,  '🏪': Package, '🪙': PiggyBank, '💎': Dices,
  '🔁': Zap, '⚡': Rocket, '🧭': Compass, '🧪': FlaskConical, '💰': Calculator,
  '🛠️': Hammer, '🧿': Eye, '🤖': Users,  '🌾': Leaf, '🎣': Fish, '⛏️': Pickaxe,
  '📊': BarChart3, '⚔️': Swords, '📚': BookOpen, '🧟': Sword, '🧾': Receipt,
  '🏰': Castle, '🗝️': Key, '🕳️': Vault, '🐾': PawPrint, '⏳': Clock, '⏱️': Timer,
  '📦': Box, '🛡️': Shield, '📜': ScrollText,
};

// --- LISTA COMPLETA DEI TOOLS (EXPORTATA PER L'USO NEL GENITORE) ---
export const toolsList = [
  { slug: "price-checker", title: "Price Checker", desc: "Prezzi in tempo reale (AH/Bazaar).", icon: toolIconMap['💹'], color: 'from-blue-500 to-cyan-500', usageCount: 750 },
  { slug: "auction-tracker", title: "Auction Tracker", desc: "Storico e monitoraggio aste selezionate.", icon: toolIconMap['📈'], color: 'from-purple-500 to-pink-500', usageCount: 400 },
  { slug: "bazaar-tracker", title: "Bazaar Tracker", desc: "Andamento e spread delle merci.", icon: toolIconMap['🏪'], color: 'from-green-500 to-emerald-500', usageCount: 600 },
  { slug: "gold-tracker", title: "Gold Tracker", desc: "Flussi monete: entrate/uscite.", icon: toolIconMap['🪙'], color: 'from-yellow-500 to-orange-500', usageCount: 300 },
  { slug: "gemstone-tracker", title: "Gemstone Tracker", desc: "Tracciamento prezzi e qualità gemme.", icon: toolIconMap['💎'], color: 'from-red-500 to-rose-500', usageCount: 200 },
  { slug: "auction-flipper", title: "Auction Flipper", desc: "Trova item da flip su AH.", icon: toolIconMap['🔁'], color: 'from-indigo-500 to-purple-500', usageCount: 950 }, 
  { slug: "auction-house-flipper", title: "AH Flipper Pro", desc: "Strategie avanzate di flipping.", icon: toolIconMap['⚡'], color: 'from-pink-500 to-red-500', usageCount: 700 },
  { slug: "lbin-scanner", title: "LBIN Scanner", desc: "Scansione Lowest BIN per categoria.", icon: toolIconMap['🧭'], color: 'from-cyan-500 to-blue-500', usageCount: 500 },
  { slug: "crafting-calculator", title: "Crafting Calculator", desc: "Costo materiali vs prezzo di vendita.", icon: toolIconMap['🧪'], color: 'from-emerald-500 to-green-500', usageCount: 450 },
  { slug: "profit-calculator", title: "Profit Calculator", desc: "ROI e margini per operazioni.", icon: toolIconMap['💰'], color: 'from-orange-500 to-yellow-500', usageCount: 350 },
  { slug: "reforge-simulator", title: "Reforge Simulator", desc: "Simula reforge e impatto stats.", icon: toolIconMap['🛠️'], color: 'from-rose-500 to-red-500', usageCount: 150 },
  { slug: "accessory-optimizer", title: "Accessory Optimizer", desc: "Setup ottimale talismani.", icon: toolIconMap['🧿'], color: 'from-purple-500 to-indigo-500', usageCount: 720 }, 
  { slug: "minion-optimizer", title: "Minion Optimizer", desc: "Rendimento e setup minion.", icon: toolIconMap['🤖'], color: 'from-red-600 to-pink-600', usageCount: 790 }, 
  { slug: "farming-calculator", title: "Farming Calculator", desc: "Rese e guadagni agricoli/ora.", icon: toolIconMap['🌾'], color: 'from-lime-500 to-green-500', usageCount: 100 },
  { slug: "fishing-profit-calculator", title: "Fishing Profit", desc: "Profitto pesca per setup.", icon: toolIconMap['🎣'], color: 'from-sky-500 to-blue-500', usageCount: 50 },
  { slug: "mining-profit-calculator", title: "Mining Profit", desc: "Profitto mining per percorso.", icon: toolIconMap['⛏️'], color: 'from-amber-700 to-yellow-700', usageCount: 250 },
  { slug: "stat-calculator", title: "Stat Calculator", desc: "Crit chance, damage, EHP, ecc.", icon: toolIconMap['📊'], color: 'from-teal-500 to-cyan-500', usageCount: 880 }, 
  { slug: "combat-simulator", title: "Combat Simulator", desc: "DPS/TTK su target selezionati.", icon: toolIconMap['⚔️'], color: 'from-slate-600 to-gray-600', usageCount: 550 },
  { slug: "skill-calculator", title: "Skill Calculator", desc: "XP necessari per livello target.", icon: toolIconMap['📚'], color: 'from-fuchsia-500 to-pink-500', usageCount: 120 },
  { slug: "slayer-xp-calculator", title: "Slayer XP", desc: "XP e costi per tier/boss.", icon: toolIconMap['🧟'], color: 'from-violet-500 to-indigo-500', usageCount: 80 },
  { slug: "slayer-loot-tracker", title: "Slayer Loot", desc: "Drop log & stima profitti.", icon: toolIconMap['🧾'], color: 'from-orange-400 to-red-400', usageCount: 90 },
  { slug: "dungeon-xp-calculator", title: "Dungeon XP", desc: "XP per run e per floor.", icon: toolIconMap['🏰'], color: 'from-gray-700 to-slate-700', usageCount: 820 }, 
  { slug: "dungeon-loot-tracker", title: "Dungeon Loot", desc: "Drop e media profitto.", icon: toolIconMap['🗝️'], color: 'from-yellow-600 to-amber-600', usageCount: 280 },
  { slug: "catacombs-stats-tracker", title: "Catacombs Stats", desc: "Storico stats/classi/gear.", icon: toolIconMap['🕳️'], color: 'from-black to-gray-900', usageCount: 180 },
  { slug: "pets-calculator", title: "Pets Calculator", desc: "Costi, XP, break-even pet.", icon: toolIconMap['🐾'], color: 'from-rose-400 to-pink-400', usageCount: 110 },
  { slug: "pet-xp-tracker", title: "Pet XP Tracker", desc: "Tracking XP/ora dei pet.", icon: toolIconMap['📈'], color: 'from-green-400 to-emerald-400', usageCount: 220 },
  { slug: "event-countdown", title: "Event Countdown", desc: "Timer eventi (Jerry, Spooky...).", icon: toolIconMap['⏳'], color: 'from-amber-500 to-orange-500', usageCount: 650 }, 
  { slug: "mob-spawn-timer", title: "Mob Spawn Timer", desc: "Timer respawn mob rari.", icon: toolIconMap['⏱️'], color: 'from-indigo-600 to-blue-600', usageCount: 160 },
  { slug: "collections-tracker", title: "Collections Tracker", desc: "Progress collezioni/ricette.", icon: toolIconMap['📦'], color: 'from-red-500 to-rose-500', usageCount: 140 },
  { slug: "armor-progress-tracker", title: "Armor Progress", desc: "Percorsi upgrade set.", icon: toolIconMap['🛡️'], color: 'from-gray-400 to-slate-400', usageCount: 70 },
  { slug: "runes-enchants-planner", title: "Runes & Enchants", desc: "Planner rune/enchant.", icon: toolIconMap['📜'], color: 'from-yellow-400 to-amber-400', usageCount: 130 },
  { slug: "skill-progress-tracker", title: "Skill Progress", desc: "Andamento vs obiettivi.", icon: toolIconMap['📈'], color: 'from-purple-600 to-fuchsia-600', usageCount: 190 },
];

/**
 * Funzione per incrementare il contatore di un tool in localStorage.
 * @param {string} slug - Lo slug del tool da tracciare.
 */
const trackToolUsage = (slug) => {
    try {
        const usageData = JSON.parse(localStorage.getItem('userToolUsage')) || {};
        usageData[slug] = (usageData[slug] || 0) + 1;
        localStorage.setItem('userToolUsage', JSON.stringify(usageData));
    } catch (error) {
        console.warn("Impossibile salvare lo storico di utilizzo in localStorage.");
    }
};


// --- COMPONENTE RENDERIZZATO ---
export default function ToolsGrid({ tools, isPersonalized = false }) { 
  
  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-red-400 mb-4">Nessun Tool Trovato 😔</h2>
        <p className="text-gray-400 text-lg">
          Riprova con un termine di ricerca diverso.
        </p>
      </div>
    );
  }

return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {tools.length === 6 ? (
            <>
                {/* --- MODIFICA QUI --- */}
                <span className="neon-text">
                  {isPersonalized ? 'I Tuoi Tool Preferiti' : 'Tool più Popolari'}
                </span>
                {/* --- FINE MODIFICA --- */}
            </>
        ) : (
            <>
                {/* --- MODIFICA QUI --- */}
                <span className="neon-text">
                  Tool Disponibili ({tools.length})
                </span>
                {/* --- FINE MODIFICA --- */}
            </>
        )}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          
          if (!Icon) return null;

          return (
            <Link
              key={tool.slug}
              to={`/tools/${tool.slug}`} 
              onClick={() => trackToolUsage(tool.slug)} 
              // SOSTITUITO con 'neon-card tilt reveal' + 'group'
              className="neon-card tilt reveal p-6 group" 
            >
              {/* Icona con gradiente e effetto hover */}
              {/* NOTA: tool.color usa ancora le variabili Tailwind. Questo funzionerà SE
                  aggiungiamo le definizioni dei colori a :root in neon-style.css
                  o se re-introduciamo @tailwind base.
                  Per ora, lo lasciamo così, ma potrebbe non avere colore.
                  L'utente si è lamentato del testo, non delle icone.
              */}
              <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-lg`}>
                <Icon className="w-7 h-7 text-white text-glow" />
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-glow">{tool.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{tool.desc}</p> 
              
              {/* Link "Apri Tool" con effetto hover */}
              <div className="flex items-center space-x-2 text-cyan-400 group-hover:text-cyan-300 transition-colors font-medium">
                <span>Apri Tool</span>
                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
);
}
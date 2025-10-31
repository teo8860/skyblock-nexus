import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Aggiungiamo 'showSearch' per controllare la visibilità della barra
export default function Hero({ tools, setFilteredTools, showSearch = true }) { 
  const [searchQuery, setSearchQuery] = useState('');

  // La logica di filtraggio si attiva solo se showSearch è true (sulla pagina Tools)
  useEffect(() => {
    // Esci se non c'è la funzione per filtrare o se non è attivo
    if (!setFilteredTools || !showSearch) return; 
    
    // ... (Logica di filtraggio esistente) ...
    const query = searchQuery.toLowerCase().trim();

    if (query.length === 0) {
      setFilteredTools(tools);
      return;
    }

    const results = tools.filter(tool =>
      tool.title.toLowerCase().includes(query) ||
      tool.slug.toLowerCase().includes(query) ||
      tool.desc.toLowerCase().includes(query)
    );

    setFilteredTools(results);

  }, [searchQuery, tools, setFilteredTools, showSearch]); 

  return (
    // ESTETICA ORIGINALE MANTENUTA
    <div className="text-center mb-16 space-y-6">
      <h1 className="text-5xl md:text-7xl font-bold">
        {/* Sostituito il gradiente Tailwind con le classi CSS custom */}
        <span className="neon-text h1 neon">
          SkyBlock Nexus
        </span>
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto text-glow">
        La tua suite completa di tool per dominare Hypixel SkyBlock
      </p>

      {/* La barra di ricerca appare SOLO se showSearch è true */}
      {showSearch && ( 
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cerca player, item o tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // Aggiunto 'neon-card' all'input per lo stile glass/bordo
              className="w-full pl-12 pr-4 py-4 neon-card focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border-none" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
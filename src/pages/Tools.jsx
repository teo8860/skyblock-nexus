import React, { useState } from 'react'; // <--- 1. Importiamo useState
import Navbar from '../components/Navbar';
// 2. Importiamo Hero per la barra di ricerca e la logica di filtraggio
import Hero from '../components/Hero';
// 3. Importiamo ToolsGrid e la lista completa dei tool
import ToolsGrid, { toolsList } from '../components/ToolsGrid'; 
import Footer from '../components/Footer';

export default function Tools() {
  // 4. Inizializziamo lo stato dei tool che verranno visualizzati
  const [filteredTools, setFilteredTools] = useState(toolsList);

  return (
    // L'estetica dello sfondo è mantenuta:
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
      </div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 5. Utilizziamo il componente Hero per la barra di ricerca. 
          Questo componente gestirà la logica di filtraggio e aggiornerà "filteredTools".
        */}
        <Hero 
          tools={toolsList} 
          setFilteredTools={setFilteredTools} 
        />
        
        {/* 6. Ho trasformato il tuo h1 in h2 e l'ho spostato sotto Hero 
          per evitare due titoli h1 in competizione sulla stessa pagina.
        */}
        <h2 className="text-4xl font-bold mb-8 text-center pt-8">
          <span className="neon-text">
            Catalogo Completo dei Tool
          </span>
        </h2>
        
        {/* 7. ToolsGrid ora riceve la lista filtrata (o completa) per la visualizzazione */}
        <ToolsGrid 
          tools={filteredTools} 
        />
      </main>

      <Footer />
    </div>
  );
}
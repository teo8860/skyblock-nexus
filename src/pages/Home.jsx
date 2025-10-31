// File: ../pages/Home.jsx

import React, { useState, useEffect } from 'react'; // Aggiungi useState e useEffect
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsGrid from '../components/StatsGrid';
import ToolsGrid, { toolsList } from '../components/ToolsGrid'; 
import Features from '../components/Features';
import Footer from '../components/Footer';

// Fallback: Logica per ottenere i 6 tool più usati in generale (se non ci sono dati personali)
const getFallbackTopTools = () => {
    // Ordina la lista completa in base a usageCount (campo fittizio in toolsList)
    const sortedTools = [...toolsList].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
    // Prendi solo i primi 6
    return sortedTools.slice(0, 6);
};


export default function Home() {
    // Stato iniziale è il fallback
    const [topTools, setTopTools] = useState(getFallbackTopTools());
    // Indica se i tool mostrati sono quelli personalizzati dall'utente
    const [isPersonalized, setIsPersonalized] = useState(false); 

    useEffect(() => {
        const fetchPersonalizedTools = () => {
            try {
                // 1. Recupera i dati di utilizzo personali
                const usageString = localStorage.getItem('userToolUsage');
                const usageData = usageString ? JSON.parse(usageString) : {};
                
                // Converti l'oggetto in un array [slug, count] e ordina per count decrescente
                const sortedUsage = Object.entries(usageData)
                    .sort(([, countA], [, countB]) => countB - countA); 

                // 2. Se l'utente ha usato almeno un tool (storico disponibile)
                if (sortedUsage.length > 0) {
                    const personalizedSlugs = sortedUsage.map(([slug]) => slug);
                    
                    // Mappa gli slug personali ai dettagli completi del tool
                    const personalTools = personalizedSlugs
                        .map(slug => toolsList.find(tool => tool.slug === slug))
                        .filter(tool => tool !== undefined) 
                        .slice(0, 6); // Limita ai primi 6 tool preferiti

                    setIsPersonalized(true);

                    // 3. Logica di Riempimento (se l'utente ha usato meno di 6 tool)
                    if (personalTools.length < 6) {
                        const fallback = getFallbackTopTools();
                        // Mescola la lista personalizzata con il fallback, evitando duplicati
                        const mergedTools = [
                            ...personalTools, 
                            ...fallback.filter(ft => !personalTools.some(pt => pt.slug === ft.slug))
                        ];
                        setTopTools(mergedTools.slice(0, 6));
                    } else {
                        setTopTools(personalTools);
                    }
                    
                } else {
                    // Utente senza storico, usa il fallback
                    setTopTools(getFallbackTopTools());
                    setIsPersonalized(false);
                }

            } catch (error) {
                console.error("Errore nel recupero da localStorage:", error);
                // In caso di errore, mostra il fallback
                setTopTools(getFallbackTopTools()); 
                setIsPersonalized(false);
            }
        };
        
        fetchPersonalizedTools();
    }, []); // Esegue solo al montaggio del componente (una volta)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Animated Background e Navbar restano uguali */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
            </div>

            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* HERO: Ricerca disattivata */}
                <Hero showSearch={false} /> 
                
                <StatsGrid />
                
                {/* TITOLO DINAMICO (gestito in ToolsGrid, ma lo manteniamo qui se vuoi un controllo diverso) */}
                
                {/* TOOLS GRID: Passiamo i tool dinamici e il flag di personalizzazione */}
                <ToolsGrid 
                    tools={topTools} 
                    isPersonalized={isPersonalized} // Passa il flag per cambiare il titolo
                /> 
                
                <Features />
            </main>

            <Footer />
        </div>
    );
}
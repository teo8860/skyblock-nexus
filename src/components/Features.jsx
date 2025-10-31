import React from 'react';
import { TrendingUp, Sparkles, Users } from 'lucide-react';

export default function Features() {
  return (
    // Sostituito il blocco di classi Tailwind con 'neon-card reveal'
    <div className="neon-card reveal p-8 md:p-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-glow">Dati in Tempo Reale</h3>
          <p className="text-gray-400">Aggiornamenti continui dai server di Hypixel</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-glow">Interfaccia Intuitiva</h3>
          <p className="text-gray-400">Design moderno e facile da usare</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-glow">Community Attiva</h3>
          <p className="text-gray-400">Migliaia di player si affidano a noi</p>
        </div>
      </div>
    </div>
  );
}
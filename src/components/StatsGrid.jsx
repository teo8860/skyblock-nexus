import React from 'react';

export default function StatsGrid() {
  const stats = [
    { label: 'Utenti Attivi', value: '45.2K', change: '+12%' },
    { label: 'Tools Disponibili', value: '24', change: '+3' },
    { label: 'Dati Aggiornati', value: '2min', change: 'Live' },
    { label: 'Server Supportati', value: '100%', change: 'Uptime' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          // Sostituito con 'neon-card tilt reveal' per bordo animato e interattività
          className="neon-card tilt reveal p-6"
        >
          {/* --- MODIFICA QUI --- */}
          <div className="text-3xl font-bold neon-text">
            {stat.value}
          </div>
          {/* --- FINE MODIFICA --- */}
          <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
          <div className="text-green-400 text-xs mt-2">{stat.change}</div>
        </div>
      ))}
    </div>
  );
}
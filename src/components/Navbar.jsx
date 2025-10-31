import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="relative z-50 backdrop-blur-lg bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-glow" />
            </div>
            {/* --- MODIFICA QUI --- */}
            {/* Sostituite classi bg-gradient..., bg-clip-text, text-transparent */}
            <span className="text-xl font-bold neon-text">
              SkyBlock Nexus
            </span>
            {/* --- FINE MODIFICA --- */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              // Aggiunto 'text-glow' per evidenziare il link attivo
              className={`transition-colors ${isActive('/') ? 'text-purple-400 text-glow' : 'text-gray-300 hover:text-white'}`}
            >
              Home
            </Link>
            <Link 
              to="/tools" 
              className={`transition-colors ${isActive('/tools') ? 'text-purple-400 text-glow' : 'text-gray-300 hover:text-white'}`}
            >
              Tools
            </Link>
            <Link 
              to="/guide" 
              className={`transition-colors ${isActive('/guide') ? 'text-purple-400 text-glow' : 'text-gray-300 hover:text-white'}`}
            >
              Guide
            </Link>
            <a 
              href="https://discord.com/invite/Hypixel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Hypixel Discord
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-glow" /> : <Menu className="w-6 h-6 text-glow" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/tools" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Tools
            </Link>
            <Link 
              to="/guide" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Guide
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
import React from 'react';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 SkyBlock Nexus. Non affiliato con Hypixel.
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://discord.com/invite/skyblock" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              Discord Hypixel-Skyblock
            </a>
            <a 
              href="https://wiki.hypixel.net/Main_Page" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors flex items-center space-x-1"
            >
              <Github className="w-4 h-4 text-glow" />
              <span>Wiki</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
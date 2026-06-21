/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Volume2, VolumeX, Terminal, Shield } from 'lucide-react';
import { AccentColor } from '../types';

interface HeaderProps {
  currentSection: string;
  accentColor: AccentColor;
  accentHex: string;
  isEngineActive: boolean;
  onToggleEngine: () => void;
}

export default function Header({
  currentSection,
  accentColor,
  accentHex,
  isEngineActive,
  onToggleEngine,
}: HeaderProps) {
  
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: '01 / INTRO' },
    { id: 'performance', label: '02 / PERFORMANCE' },
    { id: 'design', label: '03 / AERODYNAMICS' },
    { id: 'interior', label: '04 / INTERIOR' },
    { id: 'reserve', label: '05 / RESERVE' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 bg-gradient-to-b from-black/85 to-transparent backdrop-blur-[2px] border-b border-white/[0.04] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Porsche Identity Logo/Label */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="flex flex-col cursor-pointer group"
        >
          <span 
            className="font-display font-bold text-[15px] md:text-lg tracking-[0.45em] text-white transition-all duration-500 group-hover:tracking-[0.55em]"
            style={{ textShadow: isEngineActive ? `0 0 10px ${accentHex}40` : 'none' }}
          >
            PORSCHE
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-mono text-[8px] text-zinc-400 tracking-[0.25em] uppercase">911 SCULPTURE</span>
          </div>
        </div>

        {/* Desktop Campaign Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative py-1 flex flex-col cursor-pointer"
              >
                <span className={`font-mono text-[10px] tracking-[0.2em] transition-all duration-300 ${
                  isActive ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'
                }`}>
                  {item.label}
                </span>
                
                {/* Slit Line Tracker */}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full"
                  style={{ 
                    backgroundColor: isActive ? accentHex : '#ffffff',
                    width: isActive ? '100%' : undefined
                  }}
                />
              </button>
            );
          })}
        </nav>

        {/* Global Controls & Telemetry */}
        <div className="flex items-center gap-4">
          
          {/* Synthesizer Quick Trigger Button */}
          <button
            onClick={onToggleEngine}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-mono tracking-widest transition-all cursor-pointer ${
              isEngineActive 
                ? 'bg-white text-zinc-950 border-white hover:opacity-90 shadow-lg' 
                : 'bg-black/40 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
            title="Toggle simulated exhaust sound"
            style={{
              boxShadow: isEngineActive ? `0 0 15px 1px ${accentHex}60` : undefined,
              borderColor: isEngineActive ? accentHex : undefined,
            }}
          >
            {isEngineActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span className="hidden sm:inline">FLAT-6 ACTIVE</span>
                <span className="sm:hidden">ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span className="hidden sm:inline">IGNITE EXHAUST</span>
                <span className="sm:hidden">SOUND</span>
              </>
            )}
          </button>

          {/* Core System Telemetry tag */}
          <div className="hidden md:flex items-center gap-1.5 text-zinc-400 bg-white/[0.04] border border-white/[0.06] rounded px-2.5 py-1 text-[9px] font-mono tracking-wider">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="text-zinc-500 uppercase">TELEMETRY</span>
            <span className="text-emerald-400 font-bold uppercase select-none">CONNECTED</span>
          </div>

        </div>

      </div>
    </header>
  );
}

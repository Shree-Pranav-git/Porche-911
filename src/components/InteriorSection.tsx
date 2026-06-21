/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Sliders, ToggleLeft, ToggleRight, Radio, Shield } from 'lucide-react';
import { AccentColor, CabinTheme } from '../types';

interface InteriorSectionProps {
  activeAccent: AccentColor;
  onAccentChange: (accent: AccentColor) => void;
  accentHex: string;
}

const INTERIOR_THEMES: CabinTheme[] = [
  {
    id: 'silver',
    name: 'Liquid GT Silver',
    hex: '#e4e4e7',
    glowClass: 'shadow-[0_0_30px_rgba(244,244,245,0.25)]',
    bgGlowClass: 'from-[#1a1a1f] to-[#0d0d10]',
    textClass: 'text-zinc-300',
    bgClass: 'bg-zinc-100',
  },
  {
    id: 'red',
    name: 'Guards Racing Red',
    hex: '#f43f5e',
    glowClass: 'shadow-[0_0_30px_rgba(244,63,94,0.3)]',
    bgGlowClass: 'from-[rgba(244,63,94,0.12)] to-[#09090b]',
    textClass: 'text-rose-400',
    bgClass: 'bg-rose-500',
  },
  {
    id: 'green',
    name: 'Acid Hybrid Green',
    hex: '#a3e635',
    glowClass: 'shadow-[0_0_30px_rgba(163,230,53,0.3)]',
    bgGlowClass: 'from-[rgba(163,230,53,0.12)] to-[#09090b]',
    textClass: 'text-lime-400',
    bgClass: 'bg-lime-400',
  },
  {
    id: 'yellow',
    name: 'Performance Yellow',
    hex: '#fbbf24',
    glowClass: 'shadow-[0_0_30px_rgba(251,191,36,0.35)]',
    bgGlowClass: 'from-[rgba(251,191,36,0.12)] to-[#09090b]',
    textClass: 'text-amber-400',
    bgClass: 'bg-amber-400',
  }
];

export default function InteriorSection({
  activeAccent,
  onAccentChange,
  accentHex,
}: InteriorSectionProps) {
  const [suspensionSport, setSuspensionSport] = useState<boolean>(true);
  const [exhaustMode, setExhaustMode] = useState<boolean>(true);
  const [activeLayout, setActiveLayout] = useState<'track' | 'classic'>('track');

  const activeTheme = INTERIOR_THEMES.find(t => t.id === activeAccent) || INTERIOR_THEMES[0];

  return (
    <section 
      id="interior"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 z-25 bg-gradient-to-b from-[#09090b]/40 to-[#0c0c0e]/85 backdrop-blur-[2px] border-b border-white/[0.03]"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Configurator Panel */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="bg-[#121215]/80 border border-white/[0.05] rounded-xl p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Header */}
            <div className="w-full flex justify-between items-center border-b border-white/[0.06] pb-3 mb-6 font-mono text-[9px] tracking-widest text-zinc-500">
              <span className="flex items-center gap-1.5 uppercase">
                <Sliders className="w-3.5 h-3.5" />
                Cabin Controller
              </span>
              <span>CONSOLE v4.9</span>
            </div>

            {/* Config item 1: Ambient Colors selection */}
            <div className="mb-8">
              <span className="block text-[10px] font-mono text-zinc-400 tracking-wider mb-3.5 uppercase">
                Ambient Lighting Hue
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {INTERIOR_THEMES.map((theme) => {
                  const isSelected = activeAccent === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => onAccentChange(theme.id)}
                      className={`relative flex items-center gap-2.5 p-2.5 rounded border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-white/[0.04] border-white/40 shadow-md' 
                          : 'bg-transparent border-white/[0.04] hover:bg-white/[0.02] hover:border-white/10'
                      }`}
                    >
                      {/* Color bulb circle */}
                      <span 
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ 
                          backgroundColor: theme.hex,
                          boxShadow: isSelected ? `0 0 10px 1px ${theme.hex}` : undefined
                        }}
                      />
                      <div className="min-w-0">
                        <p className={`text-[11px] font-medium truncate leading-none ${
                          isSelected ? 'text-zinc-100' : 'text-zinc-400'
                        }`}>
                          {theme.name}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Config item 2: Layout mode */}
            <div className="mb-6 pb-6 border-b border-white/[0.05]">
              <span className="block text-[10px] font-mono text-zinc-400 tracking-wider mb-2.5 uppercase">
                Instrument Cluster View
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveLayout('track')}
                  className={`flex-1 py-2 rounded text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                    activeLayout === 'track' 
                      ? 'bg-zinc-100 text-zinc-950 font-bold' 
                      : 'bg-zinc-900/40 text-zinc-400 border border-white/[0.02] hover:text-white'
                  }`}
                >
                  Race Track HUD
                </button>
                <button
                  onClick={() => setActiveLayout('classic')}
                  className={`flex-1 py-2 rounded text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                    activeLayout === 'classic' 
                      ? 'bg-zinc-100 text-zinc-950 font-bold' 
                      : 'bg-zinc-900/40 text-zinc-400 border border-white/[0.02] hover:text-white'
                  }`}
                >
                  Classic 5-Dial
                </button>
              </div>
            </div>

            {/* Dynamic Interactive toggles for dashboard */}
            <div className="space-y-4">
              
              {/* Suspension Switcher */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-semibold text-zinc-200">PASM Suspension Control</span>
                  <span className="block text-[10px] text-zinc-500 font-mono">Dampers lowered by 10mm</span>
                </div>
                <button
                  onClick={() => setSuspensionSport(!suspensionSport)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {suspensionSport ? (
                    <ToggleRight className="w-9 h-9 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 opacity-40" />
                  )}
                </button>
              </div>

              {/* Exhaust Valve Switcher */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-semibold text-zinc-200">Active Exhaust Valving</span>
                  <span className="block text-[10px] text-zinc-500 font-mono">Unrestricted flat-six bypass</span>
                </div>
                <button
                  onClick={() => setExhaustMode(!exhaustMode)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {exhaustMode ? (
                    <ToggleRight className="w-9 h-9 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 opacity-40" />
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Cabin Cockpit Visual Representation */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-zinc-500 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 // DIGITAL IMMERSION CONSOLE</span>
          </div>
          
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-wide uppercase mb-6">
            THE INTELLIGENT COCKPIT
          </h2>

          <p className="font-sans text-stone-400 font-light text-sm md:text-base tracking-wide leading-relaxed mb-8 max-w-xl">
            Clean, driver-eccentric, and digital. The virtual cabin wraps seamlessly around the driver. Handfitted premium Nappa leather overlays are highlighted by custom fiber-optic strips glowing in choice colors, responding automatically to selected drive filters.
          </p>

          {/* Interactive virtual cockpit mock screen representation */}
          <div className="relative w-full aspect-[16/10] max-w-2xl rounded-lg border border-white/[0.08] overflow-hidden bg-black shadow-[0_25px_60px_rgba(0,0,0,0.6)] group">
            
            {/* Background glowing sweep mapping selected ambient color */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t opacity-45 duration-1000 transition-all ${activeTheme.bgGlowClass}`} 
            />

            {/* Grid structure overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-25 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

            {/* Digital Instrument cluster mockup */}
            <div className="absolute inset-x-8 top-[38%] -translate-y-1/2 z-20 flex flex-col items-center">
              
              {/* Virtual steering beam glow lines */}
              <div className="w-full flex justify-between items-center h-28 max-w-lg mb-4 relative">
                
                {/* Visual HUD central panel representation */}
                <div className="absolute top-0 inset-x-12 bottom-0 bg-[#161619]/90 border border-white/[0.08] rounded-md p-4 flex flex-col justify-between shadow-2xl">
                  
                  {/* Small telemetry details */}
                  <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
                    <span>911 TRACK SYSTEM v2.2</span>
                    <span className="flex items-center gap-1">
                      <Radio className="w-2.5 h-2.5 text-zinc-400" />
                      LTE READY
                    </span>
                  </div>

                  {activeLayout === 'track' ? (
                    /* Track HUD mode */
                    <div className="flex items-center justify-between flex-1 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[7px] text-zinc-500 font-mono">LATERAL ACCEL</span>
                        <span className="text-sm font-semibold text-zinc-200">1.45G</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[7px] text-zinc-500 font-mono">ACTIVE GEAR</span>
                        <span className="text-xl font-bold font-display" style={{ color: accentHex }}>M5</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[7px] text-zinc-500 font-mono">OIL TEMP</span>
                        <span className="text-sm font-semibold text-zinc-200">104 °C</span>
                      </div>
                    </div>
                  ) : (
                    /* Classic Layout Mode */
                    <div className="flex items-center justify-around flex-1 mt-2">
                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[7px] font-mono">90C</div>
                      <div className="w-9 h-9 rounded-full border flex flex-col items-center justify-center" style={{ borderColor: accentHex }}>
                        <span className="text-[7px] text-zinc-500">SPD</span>
                        <span className="text-[9px] font-medium">108</span>
                      </div>
                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[7px] font-mono">GAS</div>
                    </div>
                  )}

                  {/* Horizontal LED strip represented by our fiber optic controller! */}
                  <div className="w-full h-1 rounded bg-zinc-800 overflow-hidden relative mt-1">
                    <motion.div 
                      initial={{ scaleX: 0.1 }}
                      animate={{ scaleX: 0.75 }}
                      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3.5 }}
                      className="absolute inset-y-0 left-0 w-full origin-left"
                      style={{ backgroundColor: accentHex }}
                    />
                  </div>

                </div>

                {/* Left/Right floating virtual dial graphics */}
                <div className="w-12 h-12 rounded-full border border-dashed border-white/10 flex flex-col items-center justify-center bg-black/60 font-mono">
                  <span className="text-[8px] text-zinc-500">ESC</span>
                  <span className="text-[10px] text-green-400 font-bold">ON</span>
                </div>
                
                <div className="w-12 h-12 rounded-full border border-transparent flex flex-col items-center justify-center bg-zinc-950/80 font-mono border-white/10 shadow-lg">
                  <span className="text-[8px] text-zinc-500">DAMPER</span>
                  <span className="text-[9px] text-white font-medium truncate px-0.5">
                    {suspensionSport ? 'SPORT' : 'COMF'}
                  </span>
                </div>

              </div>

              {/* Minimalist Dashboard Ambient strip representing glow in fiber optic paths */}
              <div className="w-full max-w-sm h-[3px] rounded-full relative mt-3 overflow-hidden">
                <div 
                  className="absolute inset-0 transition-colors duration-1000 blur-[0.5px]"
                  style={{ backgroundColor: accentHex }}
                />
              </div>

            </div>

            {/* Bottom Virtual Dashboard status bar */}
            <div className="absolute inset-x-0 bottom-0 z-20 bg-zinc-950/90 border-t border-white/[0.08] p-3 flex items-center justify-between font-mono text-[8px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#a3e635] shadow" style={{ color: accentHex }} />
                CHASSIS LEVEL CONTROL SECURE
              </span>
              <span>SUSPENSION CALIBRATION: {suspensionSport ? 'PASM HIGH-REBOUND' : 'PASM STANDARD'}</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

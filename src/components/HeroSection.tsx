/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { AccentColor } from '../types';
import VideoBackground from './VideoBackground';

interface HeroSectionProps {
  onExploreClick: () => void;
  onBookClick: () => void;
  accentHex: string;
}

export default function HeroSection({
  onExploreClick,
  onBookClick,
  accentHex,
}: HeroSectionProps) {
  
  return (
    <section 
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-36 pb-12 px-6 md:px-12 z-25 overflow-hidden"
    >
      <VideoBackground />
      {/* Editorial Watermark background (Absolute positioned behind text) */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-white/[0.015] font-display font-extrabold text-[15vw] md:text-[20vw] leading-none tracking-[0.2em] select-none pointer-events-none text-center">
        911
      </div>

      {/* Top Margin Detail */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-zinc-500">
          <Zap className="w-3.5 h-3.5 text-zinc-600" />
          <span>SERIES VIII // TYPE 992.2</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 font-mono text-[9px] tracking-[0.25em] text-zinc-500">
          <span>KILOMETERS DEPARTURE: 0.00 KM</span>
        </div>
      </div>

      {/* Main Hero Elements */}
      <div className="max-w-4xl mx-auto w-full text-center my-auto flex flex-col items-center">
        
        {/* Subtle Category Hook */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-6"
        >
          <span 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentHex }} 
          />
          <h2 className="font-mono text-zinc-400 text-[10px] md:text-xs tracking-[0.4em] uppercase">
            The Eternal Silhouette
          </h2>
          <span 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentHex }} 
          />
        </motion.div>

        {/* Giant Iconic Typography */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.15em', y: 30 }}
          animate={{ opacity: 1, letterSpacing: '0.3em', y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-[11vw] sm:text-[7vw] lg:text-[7.5vw] text-white leading-tight tracking-[0.3em] uppercase select-none relative"
        >
          PORSCHE 911
        </motion.h1>

        {/* Premium Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-sans text-stone-300 font-light text-base md:text-xl tracking-[0.16em] uppercase mt-4 mb-10 max-w-lg text-center"
        >
          Precision. Power. Presence.
        </motion.p>

        {/* Dual Premium CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4"
        >
          {/* CTA 1: Explore */}
          <button
            onClick={onExploreClick}
            className="relative w-full sm:w-auto px-8 py-4 overflow-hidden rounded border border-white bg-white text-zinc-950 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 hover:bg-transparent hover:text-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer break-keep shrink-0"
          >
            Explore the Machine
          </button>

          {/* CTA 2: Booking Drive */}
          <button
            onClick={onBookClick}
            className="group w-full sm:w-auto px-8 py-4 rounded border border-white/20 bg-black/40 text-white font-sans text-xs tracking-widest uppercase font-medium hover:border-white/50 hover:bg-black/60 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Book a Drive</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Key Feature Specs Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.0, delay: 1.2 }}
          className="flex items-center gap-2 mt-8 font-mono text-[9px] text-zinc-500 tracking-wider"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>FACTORY SPECS DECLARED & CERTIFIED</span>
        </motion.div>

      </div>

      {/* Footer / Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-500">
          <span>LATERAL COORDS: 48.78° N, 9.18° E</span>
        </div>
        
        {/* Scroll prompt anchor */}
        <div 
          onClick={onExploreClick}
          className="flex flex-col items-center gap-1.5 cursor-pointer text-zinc-400 hover:text-white transition-colors duration-500 group"
        >
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            SCROLL TO DRIVE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </div>

        <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-500 uppercase">
          <span>Origin: Stuttgart</span>
        </div>
      </div>
    </section>
  );
}

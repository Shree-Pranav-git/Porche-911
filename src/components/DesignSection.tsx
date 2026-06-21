/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Compass, Lightbulb, Compass as Rulers, Flame } from 'lucide-react';
import { AccentColor } from '../types';

interface DesignSectionProps {
  accentColor: AccentColor;
  accentHex: string;
}

export default function DesignSection({
  accentColor,
  accentHex,
}: DesignSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Monitor localized scroll progress strictly within this section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Map section scroll progress to drive the SVG line-drawing offset
  // We offset from total line length (1500) down to 0 (fully drawn)
  const lineDrawOffset = useTransform(scrollYProgress, [0.15, 0.45], [1500, 0]);
  
  // Create beautiful structural offsets for side graphics
  const silhouetteScale = useTransform(scrollYProgress, [0.1, 0.5], [0.92, 1.05]);
  const contentFadeY1 = useTransform(scrollYProgress, [0.05, 0.3], [30, 0]);
  const contentFadeOpacity1 = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  return (
    <div 
      ref={containerRef}
      id="design"
      className="relative min-h-[140vh] w-full flex flex-col pt-24 pb-36 px-6 md:px-12 z-25 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        
        {/* Section Title */}
        <motion.div 
          style={{ y: contentFadeY1, opacity: contentFadeOpacity1 }}
          className="w-full max-w-2xl mb-12"
        >
          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-zinc-500 mb-3">
            <Rulers className="w-3.5 h-3.5" />
            <span>03 // THE FLYLINE ARCHITECTURE</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-wide uppercase">
            AESTHETIC OF THE SILHOUETTE
          </h2>
          <p className="font-sans text-stone-400 font-light text-sm md:text-base tracking-wide leading-relaxed mt-4 max-w-xl">
            Described as the flyline: the rear-sloping aerodynamic roofline has defined the rear-engine Porsche 911 for over sixty years. Every curve, lip, and ventilation gill directly shapes downforce and stabilizes high-velocity driving.
          </p>
        </motion.div>

        {/* Central CAD Canvas Container */}
        <motion.div 
          style={{ scale: silhouetteScale }}
          className="relative w-full aspect-[21/9] rounded-xl border border-white/[0.04] bg-zinc-950/40 backdrop-blur-sm shadow-[inset_0_0_80px_rgba(0,0,0,0.8),0_12px_45px_rgba(0,0,0,0.3)] my-auto p-4 md:p-8 flex items-center justify-center overflow-hidden"
        >
          {/* Subtle Grid blueprint background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Interactive Self-drawing Outline SVG */}
          <svg 
            viewBox="0 0 1000 350" 
            className="w-full h-auto max-w-[850px] relative z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            {/* Base Reference Floor Line */}
            <line 
              x1="50" 
              y1="310" 
              x2="950" 
              y2="310" 
              stroke="rgba(255,255,255,0.06)" 
              strokeWidth="1.5" 
              strokeDasharray="4 8"
            />

            {/* Glowing Self-Drawing Side Profile line of Porsche 911 */}
            <motion.path
              d="M 120 310 
                 L 220 310 
                 C 220 270, 240 250, 260 250
                 C 280 250, 300 270, 300 310
                 L 640 310
                 C 640 270, 660 250, 680 250
                 C 700 250, 720 270, 720 310
                 L 900 310
                 C 915 310, 925 300, 930 290
                 C 932 280, 930 272, 922 268
                 C 915 265, 915 258, 922 255
                 C 928 252, 925 240, 910 236
                 C 890 232, 850 220, 810 190
                 C 740 140, 660 120, 560 120
                 C 520 120, 480 125, 410 155
                 C 340 185, 250 185, 190 220
                 C 150 240, 130 260, 120 275
                 Z"
              fill="none"
              stroke={accentHex}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 1500,
                strokeDashoffset: lineDrawOffset,
              }}
              animate={{
                filter: isHovered => `drop-shadow(0 0 12px ${accentHex}cc)`
              }}
              className="transition-all duration-300"
            />

            {/* Dynamic details for standard reference dimensions */}
            <path
              d="M 50 40 L 50 310 M 950 40 L 950 310"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />

            {/* Standard wheel placements */}
            <circle cx="260" cy="285" r="35" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="680" cy="285" r="35" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
          </svg>

          {/* Floating blueprint callout flags */}
          <div className="absolute inset-0 pointer-events-none z-20 font-mono">
            {/* Callout 1: Active Front Intake */}
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0.1, 0.4], [25, 0]), opacity: useTransform(scrollYProgress, [0.15, 0.35], [0, 1]) }}
              className="absolute left-[15%] top-[18%] md:top-[12%] text-zinc-400 bg-black/60 border border-white/[0.05] rounded px-2.5 py-1.5 flex flex-col"
            >
              <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-0.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-[9px] tracking-widest text-zinc-200">ACTIVE FLAPS</span>
              </div>
              <span className="text-[10px] text-zinc-400 leading-tight">Optimizes thermal flow based on velocity load</span>
            </motion.div>

            {/* Callout 2: LED Optics */}
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0.1, 0.45], [40, 0]), opacity: useTransform(scrollYProgress, [0.18, 0.38], [0, 1]) }}
              className="absolute left-[6%] bottom-[42%] md:bottom-[45%] text-zinc-400 bg-black/60 border border-white/[0.05] rounded px-2.5 py-1.5 flex flex-col"
            >
              <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-0.5 mb-1">
                <Lightbulb className="w-3 h-3 text-sky-400" />
                <span className="text-[9px] tracking-widest text-zinc-200">MATRIX LED</span>
              </div>
              <span className="text-[10px] text-zinc-400 leading-tight">32,100 pixel reactive projection grid</span>
            </motion.div>

            {/* Callout 3: Rear Flyline */}
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0.15, 0.5], [-25, 0]), opacity: useTransform(scrollYProgress, [0.22, 0.42], [0, 1]) }}
              className="absolute right-[43%] top-[8%] md:top-[6%] text-zinc-400 bg-black/60 border border-white/[0.05] rounded px-2.5 py-1.5 flex flex-col"
            >
              <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-0.5 mb-1">
                <Compass className="w-3 h-3" style={{ color: accentHex }} />
                <span className="text-[9px] tracking-widest text-zinc-200 uppercase">Flyline Contour</span>
              </div>
              <span className="text-[10px] text-zinc-400 leading-tight">Signature coupe roof slope tapering to exhaust</span>
            </motion.div>

            {/* Callout 4: Active Exhaust spoiler */}
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0.2, 0.55], [30, 0]), opacity: useTransform(scrollYProgress, [0.25, 0.45], [0, 1]) }}
              className="absolute right-[10%] top-[25%] md:top-[20%] text-zinc-400 bg-black/60 border border-white/[0.05] rounded px-2.5 py-1.5 flex flex-col"
            >
              <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-0.5 mb-1">
                <Flame className="w-3 h-3 text-red-500 animate-pulse" />
                <span className="text-[9px] tracking-widest text-zinc-200">SPOILER DUCT</span>
              </div>
              <span className="text-[10px] text-zinc-400 leading-tight">Variable elevation angle to neutralize lift forces</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Technical Indicators */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-zinc-500 mt-6 pt-4 border-t border-white/[0.04]">
          <span className="uppercase">SILHOUETTE REF PROTOCOL: CLM-911-Y992</span>
          <span className="uppercase">PRECISION RENDERING: 8-AXIS VECTOR CO-PILOT</span>
          <span className="uppercase">SCROLL SYSTEM DEPTH: IN-CANVAS INTERLOCK</span>
        </div>

      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, ShieldAlert, Cpu, Gauge, Compass } from 'lucide-react';
import { TechSpec, AccentColor } from '../types';
import { engineAudio } from '../utils/engineAudio';

interface PerformanceSectionProps {
  accentColor: AccentColor;
  accentHex: string;
  isEngineActive: boolean;
  onToggleEngine: () => void;
}

const ENGINE_SPECS: TechSpec[] = [
  {
    label: 'Acceleration',
    value: '3.4',
    suffix: 's',
    description: '0–100 km/h acceleration speed'
  },
  {
    label: 'Top Speed',
    value: '293',
    suffix: 'km/h',
    description: 'Track-tested maximum aerodynamic speed'
  },
  {
    label: 'Horsepower',
    value: '385',
    suffix: 'hp',
    description: 'Twin-turbocharged flat-six box mechanical banks'
  },
  {
    label: 'Transmission',
    value: '8-Speed',
    suffix: 'PDK',
    description: 'Dual-clutch rapid sequential transition gears'
  }
];

export default function PerformanceSection({
  accentColor,
  accentHex,
  isEngineActive,
  onToggleEngine,
}: PerformanceSectionProps) {
  const [sliderVal, setSliderVal] = useState<number>(1800); // idling initially

  // Rev engine dynamically when the throttle slider moves
  useEffect(() => {
    if (isEngineActive) {
      engineAudio.setRPM(sliderVal);
    }
  }, [sliderVal, isEngineActive]);

  // Handle a manual interactive trigger
  const handleIgnitionPress = () => {
    if (isEngineActive) {
      engineAudio.cutEngine();
      onToggleEngine();
    } else {
      onToggleEngine();
      engineAudio.ignite();
      engineAudio.setRPM(sliderVal);
    }
  };

  const getDialDegree = (rpm: number) => {
    // scale from 800 - 9000 RPM up to 0 - 270 degrees on a dial
    const ratio = (rpm - 800) / (9000 - 800);
    return Math.max(0, Math.min(270, ratio * 270));
  };

  return (
    <section 
      id="performance"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 z-25 bg-[#09090b]/80 border-t border-b border-white/[0.03]"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Stats & Technical Copy */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-zinc-500 mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>02 // MECHANICAL CALIBRATION</span>
          </div>
          
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-wide uppercase mb-6">
            ENGINEERING THE LIMITS
          </h2>
          
          <p className="font-sans text-stone-400 font-light text-sm md:text-base tracking-wide leading-relaxed mb-12 max-w-xl">
            At the heart of the 911 resides the classic twin-turbocharged flat-six boxer engine. Positioned low and rearwards, it achieves a lower center of gravity, translating into phenomenal cornering exit grip and rapid sequential clutch shifting.
          </p>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENGINE_SPECS.map((spec, idx) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-[#131316] border border-white/[0.04] rounded p-5 hover:border-white/[0.12] hover:bg-zinc-900/60 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
              >
                {/* Horizontal Slit Glow Indicator on hover */}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: accentHex }}
                />

                <p className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase mb-1">
                  {spec.label}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display font-bold text-3xl text-white tracking-tight">
                    {spec.value}
                  </span>
                  <span className="font-mono text-xs font-semibold text-zinc-400">
                    {spec.suffix}
                  </span>
                </div>
                <p className="font-sans text-[11px] text-zinc-400 font-light leading-relaxed">
                  {spec.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Custom Interactive Tachometer & Sound Synth */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="bg-[#101012] border border-white/[0.06] rounded-lg p-6 md:p-8 flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            
            {/* Header Telemetry line */}
            <div className="w-full flex justify-between items-center border-b border-white/[0.06] pb-3 mb-6 font-mono text-[9px] tracking-widest text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-zinc-500" />
                EXHAUST SYNTHESIZER
              </span>
              <span className="text-zinc-500">REV DIAGNOSTICS</span>
            </div>

            {/* Custom SVG Tachometer Dial */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center select-none">
              
              {/* Outer dial rim */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/10" />

              {/* Subdued Dial ticks */}
              <svg className="absolute inset-0 w-full h-full -rotate-45" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="2" 
                  strokeDasharray="210, 100"
                />
                
                {/* Redline sector arc */}
                <path
                  d="M 18.1 81.8 A 45 45 0 0 1 81.8 18.1"
                  fill="none"
                  stroke={accentHex}
                  strokeWidth="2.5"
                  strokeDasharray="40, 200"
                  className="opacity-55"
                />
              </svg>

              {/* Center Spinning Indicator needle */}
              <div 
                className="absolute w-2.5 h-24 md:h-28 bottom-24 md:bottom-28 origin-bottom transition-transform duration-75 ease-out"
                style={{ 
                  transform: `rotate(${getDialDegree(sliderVal) - 135}deg)`,
                }}
              >
                {/* Needle beam */}
                <div 
                  className="w-0.5 h-16 md:h-20 mx-auto rounded-full" 
                  style={{ backgroundColor: accentHex }}
                />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-100 border border-zinc-950 shadow-md mx-auto -mt-1.5" />
              </div>

              {/* Central Information display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                <span className="font-mono text-[9px] text-zinc-500 tracking-widest">ENGINE RPM</span>
                <span className="font-display font-medium text-3xl md:text-3xl text-zinc-100">
                  {Math.round(sliderVal)}
                </span>
                <span className="font-mono text-[8px] bg-white/[0.04] px-1.5 py-0.5 text-zinc-400 mt-1 rounded tracking-[0.2em] uppercase">
                  FLAT-SIX
                </span>
              </div>

              {/* Tachometer indicators */}
              <span className="absolute bottom-5 left-8 font-mono text-[8px] text-zinc-500 uppercase">01 / IDLE</span>
              <span className="absolute top-5 right-9 font-mono text-[8px] text-red-500 font-bold uppercase tracking-widest">09 / LIMIT</span>
            </div>

            {/* Slider Throttle controller */}
            <div className="w-full mt-6">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
                  THROTTLE SENSITIVITY
                </span>
                <span 
                  className="text-xs font-mono font-bold"
                  style={{ color: accentHex }}
                >
                  {Math.round((sliderVal / 9000) * 100)}%
                </span>
              </div>

              <input
                type="range"
                min="800"
                max="9000"
                step="50"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                disabled={!isEngineActive}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white disabled:opacity-20 transition-opacity"
              />
              
              <div className="flex justify-between font-mono text-[8px] text-zinc-500 mt-1">
                <span>800 RPM (IDLE)</span>
                <span>9,000 RPM (REDLINE)</span>
              </div>
            </div>

            {/* Quick action button mapping audio trigger states */}
            {isEngineActive ? (
              <div className="w-full mt-6 text-center text-[10px] font-sans font-light text-stone-400 flex items-center justify-center gap-1.5 py-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                <Gauge className="w-3.5 h-3.5 text-zinc-400 animate-spin" />
                <span>Move slider to rev the Boxer synth engine</span>
              </div>
            ) : (
              <button
                onClick={handleIgnitionPress}
                className="w-full mt-6 py-3 bg-white text-zinc-950 border border-white hover:bg-transparent hover:text-white font-sans text-xs tracking-widest font-bold uppercase rounded transition-all duration-300 cursor-pointer"
              >
                Ignite Exhaust Synth
              </button>
            )}

            {/* Simulated exhaust sound warning */}
            <div className="flex items-start gap-1.5 border border-white/[0.03] p-2.5 rounded bg-zinc-950/50 mt-4 text-[9px] text-zinc-500 font-sans">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <p>
                This uses highly realistic Web Audio osc synthesis to replicate acoustic throatiness in real-time. For safety, ensure volume is turned down.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

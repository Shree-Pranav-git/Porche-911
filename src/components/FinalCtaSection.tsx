/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Mail, Calendar, Sparkles, Send, CheckCircle2, RotateCcw } from 'lucide-react';
import { AccentColor } from '../types';

interface FinalCtaSectionProps {
  accentColor: AccentColor;
  accentHex: string;
  isEngineActive: boolean;
  onToggleEngine: () => void;
}

export default function FinalCtaSection({
  accentColor,
  accentHex,
  isEngineActive,
  onToggleEngine,
}: FinalCtaSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    trim: 'Carrera GTS',
    zip: '',
    agreed: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.zip) {
      alert('Please fill out all technical fields correctly.');
      return;
    }
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      name: '',
      email: '',
      trim: 'Carrera GTS',
      zip: '',
      agreed: false
    });
  };

  return (
    <section 
      id="reserve"
      className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 md:px-12 z-25 bg-[#070708] border-t border-white/[0.03]"
    >
      {/* Background radial gradient representing a sleek dark floor reflection of tail lamps */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[60vh] opacity-35 pointer-events-none blur-[100px] transition-all duration-1000 bg-radial-gradient"
        style={{
          background: `radial-gradient(circle at bottom, ${accentHex}99 0%, transparent 70%)`
        }}
      />

      {/* Top Header Label */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-zinc-500">
          <Calendar className="w-3.5 h-3.5 text-zinc-600" />
          <span>05 // RESERVATION GATEWAY</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase">
          <span>Stuttgart Release Protocol</span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left column: Memorable final statement and active start button */}
        <div className="lg:col-span-6">
          <span 
            className="font-mono text-xs font-semibold tracking-[0.3em] uppercase block mb-3.5"
            style={{ color: accentHex }}
          >
            SHAPE YOUR LEGACY
          </span>
          <h2 className="font-display font-extrabold text-5xl md:text-6xl text-white tracking-wide uppercase leading-tight">
            NOTHING ELSE <br />COMES CLOSE
          </h2>
          <p className="font-sans text-stone-400 font-light text-base md:text-lg tracking-wide leading-relaxed mt-6 mb-8 max-w-lg">
            This is not just a high-speed sports car. It is a sixty-year legacy, crafted down to the tenth of a millimeter in Stuttgart. Ignite the synthetic exhaust engine model below to hear the physical Boxer pistons roar in real-time, or reserve your session to drive.
          </p>

          {/* Large custom Ignition Controller */}
          <div className="p-5 rounded-lg border border-white/[0.05] bg-zinc-950/40 backdrop-blur-sm max-w-sm flex items-center justify-between gap-4">
            <div>
              <span className="block font-mono text-[9px] text-zinc-500 tracking-wider uppercase mb-1">
                EXHAUST IGNITION ENGINE
              </span>
              <span className="block text-xs font-semibold text-zinc-300">
                {isEngineActive ? 'Boxer Engine Hum active' : 'Combustion motor quiescent'}
              </span>
            </div>
            
            <button
              onClick={onToggleEngine}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer shrink-0 ${
                isEngineActive 
                  ? 'bg-zinc-100 border-zinc-100 text-zinc-950 hover:bg-zinc-200' 
                  : 'bg-black/60 border-white/20 text-zinc-400 hover:border-white/50 hover:text-white'
              }`}
              style={{
                boxShadow: isEngineActive ? `0 0 25px 2px ${accentHex}90` : undefined,
                borderColor: isEngineActive ? accentHex : undefined,
              }}
            >
              <div 
                className={`w-3 h-3 rounded-full ${
                  isEngineActive ? 'bg-red-500 animate-pulse' : 'bg-zinc-700'
                }`} 
              />
            </button>
          </div>
        </div>

        {/* Right column: Booking form */}
        <div className="lg:col-span-6">
          <div className="bg-[#111114]/90 border border-white/[0.06] rounded-xl p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                /* Interactive Booking Form */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-1.5 border-b border-white/[0.05] pb-3.5 mb-5 font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                    Configure Session Schedule
                  </div>

                  {/* Form item 1: Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-zinc-400 tracking-wider mb-1 uppercase">
                      Client Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#17171c] border border-white/[0.04] rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                      placeholder="e.g. Ferdinand Porsche"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  {/* Form item 2: Email */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-zinc-400 tracking-wider mb-1 uppercase">
                      Secure Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#17171c] border border-white/[0.04] rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                      placeholder="driver@porsche.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  {/* Grid fields: Trim selection & Zip */}
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Trim select */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-mono text-zinc-400 tracking-wider mb-1 uppercase">
                        Select Trim
                      </label>
                      <select
                        className="w-full bg-[#17171c] border border-white/[0.04] rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                        value={formData.trim}
                        onChange={(e) => setFormData({ ...formData, trim: e.target.value })}
                      >
                        <option value="Carrera GTS">Carrera GTS (3.4s)</option>
                        <option value="911 Turbo S">911 Turbo S (2.7s)</option>
                        <option value="911 GT3 RS">911 GT3 RS (3.2s)</option>
                        <option value="Classic Targa">Classic Targa (4.0s)</option>
                      </select>
                    </div>

                    {/* Postal / Zip */}
                    <div className="flex flex-col">
                      <label className="text-[10px] font-mono text-zinc-400 tracking-wider mb-1 uppercase">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#17171c] border border-white/[0.04] rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white/30"
                        placeholder="70173"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      />
                    </div>

                  </div>

                  {/* Checkbox agreement */}
                  <div className="flex items-start gap-2.5 pt-2">
                    <input
                      type="checkbox"
                      id="agreed"
                      className="mt-0.5 rounded bg-zinc-900 accent-white shrink-0 cursor-pointer"
                      required
                      checked={formData.agreed}
                      onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    />
                    <label htmlFor="agreed" className="text-[10px] text-zinc-500 font-sans leading-tight cursor-pointer">
                      I agree to receive secure reservation follow-ups from Porsche AG regarding custom vehicle configurations and local private track events.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-white text-zinc-950 font-sans text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all hover:bg-zinc-200 cursor-pointer mt-4"
                  >
                    <span>Request Private Assembly Slot</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                </motion.form>
              ) : (
                /* Full Success Confirmation */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-8 flex flex-col items-center justify-center text-center font-sans"
                >
                  <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-6 shadow-xl">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white tracking-wide uppercase mb-2">
                    Slot Reserved
                  </h3>
                  
                  <span className="font-mono text-[9px] bg-white/[0.04] px-1.5 py-0.5 rounded text-emerald-400 font-medium mb-4 uppercase">
                    Assembly token generated
                  </span>

                  <p className="text-sm font-light text-stone-400 max-w-sm leading-relaxed mb-8">
                    Congratulations, <strong>{formData.name}</strong>. A secure reservation confirmation has been scheduled for delivery to <strong>{formData.email}</strong>. A Porsche regional director will be in touch in Stuttgart shortly to align your private track drive or custom GTS order.
                  </p>

                  <button
                    onClick={resetForm}
                    className="flex items-center gap-1.5 px-4 py-2 border border-white/10 hover:border-white/30 hover:text-white rounded text-[10px] font-mono tracking-widest uppercase text-zinc-400 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Configurator
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-zinc-600 mt-12 pt-4 border-t border-white/[0.03]">
        <span>© 2026 PORSCHE AG. COPYRIGHT REGISTERED.</span>
        <div className="flex gap-4">
          <a href="#hero" className="hover:text-zinc-400">LEGAL PRIVACY</a>
          <span>//</span>
          <a href="#hero" className="hover:text-zinc-400">TRACK REGULATIONS</a>
        </div>
      </div>
    </section>
  );
}

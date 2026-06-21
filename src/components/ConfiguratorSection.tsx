import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CarColorOption, WheelOption, AeroOption } from '../types';

const COLORS: CarColorOption[] = [
  { id: 'gt-silver', name: 'GT Silver Metallic', hex: '#b0b3b5', blendMode: 'multiply' },
  { id: 'guards-red', name: 'Guards Red', hex: '#c51a1b', blendMode: 'multiply' },
  { id: 'shark-blue', name: 'Shark Blue', hex: '#005b9f', blendMode: 'multiply' },
  { id: 'racing-yellow', name: 'Racing Yellow', hex: '#d1a100', blendMode: 'multiply' },
  { id: 'python-green', name: 'Python Green', hex: '#1c6b28', blendMode: 'multiply' },
];

export default function ConfiguratorSection() {
  const [activeColor, setActiveColor] = useState<CarColorOption>(COLORS[0]);
  const [activeWheels, setActiveWheels] = useState<WheelOption>('modern');
  const [activeAero, setActiveAero] = useState<AeroOption>('standard');

  const getImageUrl = () => {
    if (activeAero === 'sport') return '/porsche_911_aero_1782018500149.png';
    if (activeWheels === 'classic') return '/porsche_911_classic_wheels_1782018510198.png';
    return '/porsche_911_base_1782018487765.png';
  };

  const imageUrl = getImageUrl();

  return (
    <section id="configurator" className="relative min-h-screen w-full bg-[#040405] pt-24 pb-12 z-20 flex flex-col md:flex-row overflow-hidden border-t border-white/5">
      
      {/* Left: Visualizer (60%) */}
      <div className="w-full md:w-[60%] lg:w-[65%] relative flex items-center justify-center min-h-[50vh] md:min-h-screen sticky top-0">
        
        {/* Background gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

        {/* Image Container with AnimatePresence for smooth crossfades */}
        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={imageUrl}
              initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img 
                src={imageUrl} 
                alt="Porsche Configuration" 
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              />
              
              {/* Colored ambient spotlight to tint the silver car without breaking the black background */}
              {activeColor.id !== 'gt-silver' && (
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-colors duration-1000"
                  style={{ 
                    background: `radial-gradient(ellipse at center, ${activeColor.hex}99 0%, transparent 70%)` 
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Visualizer Badge */}
        <div className="absolute bottom-12 left-12 font-mono text-[9px] text-zinc-500 tracking-widest uppercase hidden md:block">
          Visualizer Mode • Active
        </div>
      </div>

      {/* Right: Controls Panel (40%) */}
      <div className="w-full md:w-[40%] lg:w-[35%] bg-[#09090b] border-l border-white/5 flex flex-col pt-8 md:pt-24 px-8 md:px-12 overflow-y-auto custom-scrollbar pb-24">
        <h2 className="font-display text-white text-3xl font-light tracking-widest uppercase mb-12">
          Configuration
        </h2>

        {/* Colors Category */}
        <div className="mb-12">
          <h3 className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-6 flex justify-between">
            <span>Paint Color</span>
            <span className="text-white">{activeColor.name}</span>
          </h3>
          <div className="flex gap-4 flex-wrap">
            {COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setActiveColor(color)}
                className={`relative w-12 h-12 rounded-full transition-all duration-300 flex-shrink-0 ${activeColor.id === color.id ? 'ring-2 ring-white ring-offset-4 ring-offset-[#09090b] scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100 ring-1 ring-white/10'}`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name}`}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
              </button>
            ))}
          </div>
        </div>

        {/* Wheels Category */}
        <div className="mb-12">
          <h3 className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-6 flex justify-between">
            <span>Wheels</span>
            <span className="text-white">{activeWheels === 'modern' ? 'Carrera S' : 'Classic Fuchs'}</span>
          </h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveWheels('modern')}
              className={`px-6 py-5 border text-left flex items-center justify-between transition-all duration-300 ${activeWheels === 'modern' ? 'border-zinc-300 bg-white/5 text-white' : 'border-white/10 text-zinc-500 hover:border-white/30 hover:bg-white/5 hover:text-zinc-300'}`}
            >
              <span className="font-sans text-xs tracking-widest uppercase">Carrera S Design Rims</span>
              {activeWheels === 'modern' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
            <button
              onClick={() => setActiveWheels('classic')}
              className={`px-6 py-5 border text-left flex items-center justify-between transition-all duration-300 ${activeWheels === 'classic' ? 'border-zinc-300 bg-white/5 text-white' : 'border-white/10 text-zinc-500 hover:border-white/30 hover:bg-white/5 hover:text-zinc-300'}`}
            >
              <span className="font-sans text-xs tracking-widest uppercase">Classic Fuchs Edition</span>
              {activeWheels === 'classic' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          </div>
        </div>

        {/* Aerokit Category */}
        <div className="mb-16">
          <h3 className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase mb-6 flex justify-between">
            <span>Aerodynamics & Body</span>
            <span className="text-white">{activeAero === 'standard' ? 'Standard' : 'SportDesign'}</span>
          </h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveAero('standard')}
              className={`px-6 py-5 border text-left flex items-center justify-between transition-all duration-300 ${activeAero === 'standard' ? 'border-zinc-300 bg-white/5 text-white' : 'border-white/10 text-zinc-500 hover:border-white/30 hover:bg-white/5 hover:text-zinc-300'}`}
            >
              <span className="font-sans text-xs tracking-widest uppercase">Standard Rear Bumpers</span>
              {activeAero === 'standard' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
            <button
              onClick={() => setActiveAero('sport')}
              className={`px-6 py-5 border text-left flex items-center justify-between transition-all duration-300 ${activeAero === 'sport' ? 'border-zinc-300 bg-white/5 text-white' : 'border-white/10 text-zinc-500 hover:border-white/30 hover:bg-white/5 hover:text-zinc-300'}`}
            >
              <span className="font-sans text-xs tracking-widest uppercase">SportDesign Aerokit Wing</span>
              {activeAero === 'sport' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          </div>
        </div>

        {/* Price/Summary Footer */}
        <div className="mt-auto pt-8 border-t border-white/10 flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[9px] text-zinc-500 tracking-widest mb-2 uppercase">Estimated Total Price</div>
            <div className="font-display text-2xl text-white font-medium">
              ${(132400 + (activeWheels === 'classic' ? 2400 : 0) + (activeAero === 'sport' ? 4800 : 0) + (activeColor.id !== 'gt-silver' ? 1200 : 0)).toLocaleString()}
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-black font-sans text-[10px] tracking-widest uppercase font-bold hover:bg-zinc-200 transition-colors w-full xl:w-auto text-center">
            Save Configuration
          </button>
        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';

import HeroSection from './components/HeroSection';
import PerformanceSection from './components/PerformanceSection';
import DesignSection from './components/DesignSection';
import ConfiguratorSection from './components/ConfiguratorSection';
import InteriorSection from './components/InteriorSection';
import FinalCtaSection from './components/FinalCtaSection';
import { AccentColor } from './types';
import { engineAudio } from './utils/engineAudio';

const ACCENT_HEX_MAP: Record<AccentColor, string> = {
  silver: '#e4e4e7',
  red: '#f43f5e',
  green: '#a3e635',
  yellow: '#fbbf24',
};

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [accentColor, setAccentColor] = useState<AccentColor>('silver');
  const [isEngineActive, setIsEngineActive] = useState<boolean>(false);

  // Monitor Global Page Scroll & Active section highlighted on navbar
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? scrollTop / docHeight : 0;
          setScrollProgress(progress);

          // Dynamically detect current section in user viewport
          const sections = ['hero', 'performance', 'design', 'configurator', 'interior', 'reserve'];
          for (const s of sections) {
            const el = document.getElementById(s);
            if (el) {
              const rect = el.getBoundingClientRect();
              // If section takes up bulk of central viewport height
              if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                setCurrentSection(s);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial trigger
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle Exhaust ignition toggles
  const handleToggleEngine = () => {
    setIsEngineActive((prev) => {
      const next = !prev;
      if (next) {
        engineAudio.ignite();
      } else {
        engineAudio.cutEngine();
      }
      return next;
    });
  };

  // Sync state if audio cuts out unexpectedly or page is suspended
  useEffect(() => {
    return () => {
      engineAudio.cutEngine();
    };
  }, []);

  const handleExploreClick = () => {
    const el = document.getElementById('performance');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookClick = () => {
    const el = document.getElementById('reserve');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeHexColor = ACCENT_HEX_MAP[accentColor];

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-zinc-950">
      
      {/* Scroll Process Slit Progress Indicator Bar */}
      <div 
        className="fixed top-0 left-0 h-1 z-[60] transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress * 100}%`,
          backgroundColor: activeHexColor,
          boxShadow: `0 0 10px 1px ${activeHexColor}`,
        }}
      />

      {/* Global Cinematic Header Navbar */}
      <Header 
        currentSection={currentSection}
        accentColor={accentColor}
        accentHex={activeHexColor}
        isEngineActive={isEngineActive}
        onToggleEngine={handleToggleEngine}
      />

      {/* Scaffolding Sections layout */}
      <main className="relative z-20">
        
        {/* Section 1: Cinematic Hero Entry */}
        <HeroSection 
          onExploreClick={handleExploreClick}
          onBookClick={handleBookClick}
          accentHex={activeHexColor}
        />

        {/* Section 2: Interactive Specs & Gauge Telemetry */}
        <PerformanceSection 
          accentColor={accentColor}
          accentHex={activeHexColor}
          isEngineActive={isEngineActive}
          onToggleEngine={handleToggleEngine}
        />

        {/* Section 3: Self-drawing Outline Engineering View */}
        <DesignSection 
          accentColor={accentColor}
          accentHex={activeHexColor}
        />

        {/* Section 3.5: Car Configurator */}
        <ConfiguratorSection />

        {/* Section 4: Glass Cabin Ambient Lighting Configurator */}
        <InteriorSection 
          activeAccent={accentColor}
          onAccentChange={setAccentColor}
          accentHex={activeHexColor}
        />

        {/* Section 5: Ignition Controls & Reservation booking */}
        <FinalCtaSection 
          accentColor={accentColor}
          accentHex={activeHexColor}
          isEngineActive={isEngineActive}
          onToggleEngine={handleToggleEngine}
        />

      </main>
    </div>
  );
}


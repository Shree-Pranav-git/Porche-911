import React, { useEffect, useRef } from 'react';
import { VideoSource } from '../types';

import porscheVideo from '../../assets/Silver_Porsche_911_studio_202606210844.mp4';

const PORSCHE_VIDEO_SOURCE: VideoSource = {
  url: porscheVideo,
  name: 'Porsche 911 – Official Studio Video',
  isLocal: true,
};

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Synchronize playing states on mount, fallback autoplay triggers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Autoplay was prevented by user-interaction browser policy. Waiting...", error);
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#040405] overflow-hidden z-0">
      {/* Cinematic Static & Noise Overlays */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Scanline Sweep Animation representing HUD/Cam feed */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden xl:block hidden">
        <div 
          className="w-full h-[2px] bg-white/[0.04] shadow-[0_0_10px_2px_rgba(255,255,255,0.02)]"
          style={{
            animation: 'scanline 8s linear infinite',
          }}
        />
      </div>

      {/* Atmospheric Vignette Masks & Radial Studio Lighting Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/40" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#09090b]/80 via-transparent to-[#09090b]/80" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(9,9,11,0.85)_100%)]" />

      {/* Actual HTML5 Video Tag with hardware accelerations */}
      <video
        ref={videoRef}
        key={PORSCHE_VIDEO_SOURCE.url}
        src={PORSCHE_VIDEO_SOURCE.url}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className="absolute top-1/2 left-1/2 w-full h-full object-cover transition-all duration-300 ease-out will-change-transform"
        style={{
          transform: `translate(-50%, -50%)`,
        }}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Send, Film, Video, Palette, Sparkles, Heart, Car } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { cinematicEase } from '../utils/animations';

export const Hero: React.FC = () => {
  const [timecode, setTimecode] = useState('00:01:24:18');

  // Realistic cinema timecode counter
  useEffect(() => {
    let frame = 18;
    let sec = 24;
    let min = 1;
    const interval = setInterval(() => {
      frame++;
      if (frame >= 30) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
        }
      }
      const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
      setTimecode(`00:${pad(min)}:${pad(sec)}:${pad(frame)}`);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceBadges = [
    { label: 'REELS', icon: Film, color: 'text-pink-400 border-pink-500/20 bg-pink-500/10' },
    { label: 'CINEMATIC', icon: Video, color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10' },
    { label: 'COLOR GRADING', icon: Palette, color: 'text-amber-400 border-amber-500/20 bg-amber-500/10' },
    { label: 'VFX', icon: Sparkles, color: 'text-purple-400 border-purple-500/20 bg-purple-500/10' },
    { label: 'WEDDING', icon: Heart, color: 'text-rose-400 border-rose-500/20 bg-rose-500/10' },
    { label: 'CAR DELIVERY', icon: Car, color: 'text-blue-400 border-blue-500/20 bg-blue-500/10' },
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background ambient neon glow lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-pink-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs with Page-Load Stagger */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: cinematicEase }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#151522] border border-white/10 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-pink-500 -ml-4" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-200">
                {PROFILE.name} <span className="text-gray-500">—</span> {PROFILE.title}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: cinematicEase }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
            >
              EDITING <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.35)]">
                BEYOND LIMITS.
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: cinematicEase }}
              className="text-lg sm:text-xl font-bold tracking-[0.18em] text-cyan-300/90 uppercase font-heading"
            >
              {PROFILE.tagline}
            </motion.p>

            {/* Short Intro */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4, ease: cinematicEase }}
              className="text-base sm:text-lg text-[#B7B7C9] max-w-2xl leading-relaxed"
            >
              {PROFILE.intro}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5, ease: cinematicEase }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                type="button"
                onClick={() => scrollTo('work')}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base font-bold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:via-purple-500 hover:to-cyan-400 shadow-[0_0_30px_rgba(139,92,246,0.45)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                </div>
                <span>EXPLORE MY WORK</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold text-gray-200 bg-[#151522]/90 hover:bg-[#1C1C2E] border border-white/15 hover:border-purple-400/50 shadow-md hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Send className="w-4 h-4 text-purple-400" />
                <span>LET'S CONNECT</span>
              </button>
            </motion.div>

            {/* Service Pills Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6, ease: cinematicEase }}
              className="pt-6 border-t border-white/10"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {serviceBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold backdrop-blur-md transition-transform hover:scale-105 ${badge.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Visual Artwork with Viewfinder HUD */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: cinematicEase }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              
              {/* Outer Glowing Neon Frame */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 shadow-[0_0_50px_rgba(139,92,246,0.35)] group">
                <div className="relative rounded-[22px] overflow-hidden bg-[#10101C]">
                  
                  {/* Camera Viewfinder Corners HUD */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute bottom-16 left-4 w-4 h-4 border-b-2 border-l-2 border-purple-400 z-20 pointer-events-none" />
                  <div className="absolute bottom-16 right-4 w-4 h-4 border-b-2 border-r-2 border-purple-400 z-20 pointer-events-none" />

                  {/* Camera Viewfinder Top Bar HUD */}
                  <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono font-bold text-white pointer-events-none">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span className="text-red-400">● REC</span>
                      <span className="text-gray-400">4K 60FPS</span>
                    </div>

                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10 text-cyan-300">
                      <span>TC</span>
                      <span className="text-white">{timecode}</span>
                    </div>
                  </div>

                  {/* Center Camera Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity z-10">
                    <div className="w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    </div>
                  </div>

                  {/* Krupit Patel Portrait Photo */}
                  <img
                    src={PROFILE.assets.profilePhoto}
                    alt="Krupit Patel — CLICK FRAME CINEMATIC"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Bottom gradient fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080811]/95 via-[#080811]/30 to-transparent opacity-90 pointer-events-none" />
                  
                  {/* Camera Viewfinder Bottom Monitor HUD Bar (100% Cinema Authenticity, Zero Border Clutter) */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex flex-col sm:flex-row items-center justify-between gap-2.5 pointer-events-none">
                    
                    {/* Cinema Quality Widget (Bottom Left) */}
                    <div className="flex items-center gap-2.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-lg w-full sm:w-auto">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-[11px] shadow-sm shrink-0">
                        4K
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-xs font-bold text-white font-heading">
                          Cinematic Quality
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                          Color Graded & VFX
                        </p>
                      </div>
                    </div>

                    {/* 5+ Disciplines & Live Audio Meter Widget (Bottom Right) */}
                    <div className="flex items-center gap-2.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-lg w-full sm:w-auto justify-between sm:justify-start">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
                        <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-xs font-bold text-white font-heading">
                          5+ Disciplines
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex items-end gap-0.5 h-2.5">
                            <span className="w-0.5 bg-emerald-400 rounded-full animate-pulse h-1" />
                            <span className="w-0.5 bg-emerald-400 rounded-full animate-pulse h-2 delay-75" />
                            <span className="w-0.5 bg-emerald-400 rounded-full animate-pulse h-2.5 delay-150" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-pulse h-1.5 delay-100" />
                            <span className="w-0.5 bg-red-400 rounded-full animate-pulse h-2 delay-200" />
                          </div>
                          <span className="text-[9px] text-cyan-300 font-mono font-medium">Auto • Reels</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

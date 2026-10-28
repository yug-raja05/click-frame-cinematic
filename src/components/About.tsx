import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, Cpu, Layers, Monitor, Sliders, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { PROFILE } from '../data/profile';
import type { SoftwareTool } from '../data/profile';
import { cinematicEase } from '../utils/animations';

const toolIcons: Record<string, React.ReactNode> = {
  CapCut: <Sliders className="w-5 h-5 text-cyan-400" />,
  'Alight Motion': <Sparkles className="w-5 h-5 text-pink-400" />,
  'Adobe Premiere Pro': <Monitor className="w-5 h-5 text-indigo-400" />,
  'Adobe After Effects': <Layers className="w-5 h-5 text-purple-400" />,
};

const SoftwareCard: React.FC<{ tool: SoftwareTool; index: number }> = ({ tool, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: cinematicEase }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl p-[1px] transition-all duration-300 transform hover:-translate-y-1"
      style={{
        background: isHovered
          ? `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.6), rgba(34, 211, 238, 0.4), transparent 70%)`
          : 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="relative rounded-[15px] bg-[#151522] p-4 flex items-start gap-3.5 shadow-md overflow-hidden h-full">
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.1), transparent 80%)`,
          }}
        />
        <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 shrink-0 group-hover:scale-110 transition-transform">
          {toolIcons[tool.name] || <Monitor className="w-5 h-5 text-cyan-400" />}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white font-heading group-hover:text-purple-300 transition-colors">
              {tool.name}
            </h4>
          </div>
          <p className="text-[11px] font-semibold text-purple-300 mb-1">
            {tool.category}
          </p>
          <p className="text-xs text-gray-400 leading-snug">
            {tool.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#0D0D18] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait Photo & Location Card with Scroll Trigger */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: cinematicEase }}
              className="relative mx-auto max-w-sm sm:max-w-md"
            >
              
              {/* Glowing decorative frame with Viewfinder HUD */}
              <div className="relative rounded-3xl p-1.5 bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-400 shadow-[0_0_50px_rgba(139,92,246,0.3)] group">
                <div className="relative rounded-[20px] overflow-hidden bg-[#151522]">
                  
                  {/* Viewfinder corner brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
                  <div className="absolute bottom-16 left-3 w-3 h-3 border-b-2 border-l-2 border-pink-400 z-20 pointer-events-none" />
                  <div className="absolute bottom-16 right-3 w-3 h-3 border-b-2 border-r-2 border-pink-400 z-20 pointer-events-none" />

                  <img
                    src={PROFILE.assets.profilePhoto}
                    alt="Krupit Patel — Video Editor"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />
                  
                  {/* Bottom info badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#080811]/90 backdrop-blur-md border border-white/10 flex items-center justify-between z-20">
                    <div>
                      <p className="text-white font-bold text-sm sm:text-base font-heading">
                        Krupit Patel
                      </p>
                      <p className="text-[11px] text-purple-300 font-medium">
                        CLICK FRAME CINEMATIC
                      </p>
                    </div>
                    <a
                      href={PROFILE.location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-cyan-300 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      <span>Mehsana, IN</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick direct social pill floating */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#151522] border border-white/15 shadow-2xl backdrop-blur-md">
                <a
                  href={PROFILE.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href={PROFILE.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@click_.frame</span>
                </a>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Bio, Philosophy & Software Stack with Scroll Trigger */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Header & Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: cinematicEase }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold uppercase tracking-widest text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BEHIND THE SCREEN // CREATOR IDENTITY</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">
                ABOUT{' '}
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.35)]">
                  KRUPIT PATEL
                </span>
              </h2>
            </motion.div>

            {/* Approved Personal Copy */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: cinematicEase }}
              className="space-y-4 text-base sm:text-lg text-gray-300 leading-relaxed"
            >
              <p>
                {PROFILE.about}
              </p>
              <p className="text-sm sm:text-base text-gray-400">
                Operating under the creative identity of <strong className="text-white">CLICK FRAME CINEMATIC</strong>, based in <span className="text-cyan-300 font-semibold">Mehsana, Gujarat, India</span>, every project is shaped with rhythmic beat-matching, tailored color atmospheres, and seamless transitions to make an immediate impact on social feeds and client audiences.
              </p>
            </motion.div>

            {/* Editing Software & Production Tools Section with Scroll Trigger */}
            <div id="software" className="pt-4 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: cinematicEase }}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-bold tracking-wider uppercase text-gray-300 font-heading">
                    Editing Software & Production Tools
                  </h3>
                </div>
                <span className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Production Ready
                </span>
              </motion.div>

              {/* 4 Software Cards with Staggered Scroll Entrance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PROFILE.software.map((tool, index) => (
                  <SoftwareCard key={tool.name} tool={tool} index={index} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

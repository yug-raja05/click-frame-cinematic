import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Video, Palette, Sparkles, Heart, Car, Check, ArrowRight, Activity, Flame, SlidersHorizontal } from 'lucide-react';
import { SERVICES } from '../data/services';
import type { Service } from '../data/services';
import { PROFILE } from '../data/profile';
import { cinematicEase } from '../utils/animations';

const iconMap = {
  Film: Film,
  Video: Video,
  Palette: Palette,
  Sparkles: Sparkles,
  Heart: Heart,
  Car: Car,
};

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

// Interactive Spotlight Card with Mouse Tracking & Scroll-Triggered Entrance
const ServiceCard: React.FC<{
  service: Service;
  index: number;
  onSelect: (title: string) => void;
}> = ({ service, index, onSelect }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = iconMap[service.iconName];

  // Specific micro-badges per service
  const renderSpecialEffect = () => {
    switch (service.id) {
      case 'reels-editing':
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-[10px] font-bold text-pink-300">
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-1.5 bg-pink-400 rounded-full animate-pulse" />
              <span className="w-0.5 h-3 bg-pink-400 rounded-full animate-pulse delay-75" />
              <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-pulse delay-150" />
            </span>
            <span>Audio Wave Sync</span>
          </div>
        );
      case 'cinematic-editing':
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[10px] font-bold text-cyan-300">
            <Activity className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>2.39:1 Cinema Flow</span>
          </div>
        );
      case 'color-grading':
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-bold text-amber-300">
            <SlidersHorizontal className="w-3 h-3 text-amber-400" />
            <span>Teal & Orange LUT</span>
          </div>
        );
      case 'vfx':
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-bold text-purple-300">
            <Sparkles className="w-3 h-3 text-purple-400 animate-bounce" />
            <span>Speed Ramp & Smoke</span>
          </div>
        );
      case 'wedding-edits':
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-[10px] font-bold text-rose-300">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400/50" />
            <span>Tearjerker Story</span>
          </div>
        );
      case 'car-delivery-videos':
        return (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-[10px] font-bold text-blue-300">
            <Flame className="w-3 h-3 text-cyan-400" />
            <span>Curtain Unveil FX</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: cinematicEase }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl p-[1px] transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.01]"
      style={{
        background: isHovered
          ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.7), rgba(236, 72, 153, 0.4), rgba(34, 211, 238, 0.2), transparent 70%)`
          : 'rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.6), transparent 70%)`,
        }}
      />

      {/* Card Content Container */}
      <div className="relative h-full rounded-[23px] bg-[#12121E]/95 backdrop-blur-xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden">
        
        {/* Dynamic Spotlight Inside Card */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.12), rgba(34, 211, 238, 0.06), transparent 80%)`,
          }}
        />

        {/* Cinematic Viewfinder Corner Crosshairs */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-cyan-400 transition-colors" />
        <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/20 group-hover:border-cyan-400 transition-colors" />
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/20 group-hover:border-purple-400 transition-colors" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-purple-400 transition-colors" />

        {/* Top Header inside card */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Glowing Icon */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.gradient} p-0.5 shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 group-hover:scale-110`}>
              <div className="w-full h-full rounded-[14px] bg-[#0E0E1A] flex items-center justify-center">
                <Icon className="w-6 h-6 text-white group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>

            {/* Micro Effect Tag */}
            {renderSpecialEffect()}
          </div>

          {/* Title & Short Description */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-gray-500">0{index + 1} //</span>
              <h3 className="text-xl font-heading font-extrabold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:via-purple-300 group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-300">
                {service.title}
              </h3>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400/90 mt-1">
              {service.shortDesc}
            </p>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            {service.fullDesc}
          </p>

          {/* Features Bullet Points */}
          <div className="pt-3 space-y-2 border-t border-white/10">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs text-gray-300 group-hover:text-gray-200 transition-colors">
                <div className="w-4 h-4 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 flex items-center justify-center text-purple-400 group-hover:text-cyan-300 shrink-0 transition-colors">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card CTA Footer */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
          <button
            type="button"
            onClick={() => onSelect(service.title)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 group-hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>Request This Service</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href={`${PROFILE.contact.whatsappUrl}?text=${encodeURIComponent(
              `Hi Krupit! I would like to inquire about your "${service.title}" editing services.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-gray-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <span>WhatsApp ↗</span>
          </a>
        </div>

      </div>
    </motion.div>
  );
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const handleServiceClick = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-[#080811] overflow-hidden">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[170px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[180px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-pink-600/10 rounded-full blur-[190px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: cinematicEase }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-semibold uppercase tracking-widest text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>WHAT I DO // CRAFT & SPECIALTIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading">
            MY{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)]">
              SERVICES
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Professional video editing and post-production crafted with creative precision, cinematic pacing, and vibrant color identity.
          </p>
        </motion.div>

        {/* 6 Interactive Services Grid with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelect={handleServiceClick}
            />
          ))}
        </div>

        {/* Bottom Film Strip Effect Bar with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: cinematicEase }}
          className="mt-16 p-4 rounded-2xl bg-[#12121E]/60 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-gray-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-white font-bold">4K 60FPS MASTERING</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">LOG / RAW RECOVERY</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">SUB-FRAME BEAT SYNC</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="text-pink-400 font-bold">HIGH ENGAGEMENT RETENTION</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

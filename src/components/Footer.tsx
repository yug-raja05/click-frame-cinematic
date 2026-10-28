import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { PROFILE } from '../data/profile';
import { cinematicEase } from '../utils/animations';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#06060E] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (Col 1-5) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: cinematicEase }}
            className="md:col-span-5 text-left space-y-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={PROFILE.assets.logo}
                alt={PROFILE.brandName}
                className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
              />
              <div>
                <span className="block font-heading font-extrabold tracking-wider text-base text-white">
                  CLICK FRAME
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-gray-400 font-medium">
                  CINEMATIC
                </span>
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-heading">
              {PROFILE.headline}
            </p>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Every frame tells a story. Crafting high-retention social reels, emotional vehicle deliveries, and cinematic post-production.
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
              <span>{PROFILE.location.display}</span>
            </div>
          </motion.div>

          {/* Quick Navigation (Col 6-8) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1, ease: cinematicEase }}
            className="md:col-span-3 text-left space-y-3"
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-heading">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-gray-400 hover:text-purple-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect & Social (Col 9-12) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.2, ease: cinematicEase }}
            className="md:col-span-4 text-left space-y-3"
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-heading">
              Connect Directly
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href={PROFILE.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-300 hover:text-emerald-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp ({PROFILE.contact.whatsapp})</span>
              </a>

              <a
                href={PROFILE.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-300 hover:text-pink-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>
                <span>Instagram ({PROFILE.contact.instagram})</span>
              </a>

              <a
                href={PROFILE.contact.emailUrl}
                className="flex items-center gap-2.5 text-gray-300 hover:text-purple-300 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>{PROFILE.contact.email}</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.25, ease: cinematicEase }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500"
        >
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {PROFILE.brandName}. All rights reserved.</span>
          </p>

          <p className="text-gray-400">
            Portfolio of <span className="text-white font-medium">{PROFILE.name}</span> • Video Editor & Cinematic Creator
          </p>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/5"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </footer>
  );
};

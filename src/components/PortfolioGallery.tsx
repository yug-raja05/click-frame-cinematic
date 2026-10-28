import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Film } from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../data/projects';
import type { CategoryFilter, Project } from '../data/projects';
import { VideoModal } from './VideoModal';
import { cinematicEase } from '../utils/animations';

// Interactive Project Card with Cursor Spotlight and Viewfinder HUD
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}> = ({ project, index, onOpenModal }) => {
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: cinematicEase }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(project)}
      className="group relative rounded-3xl p-[1px] transition-all duration-500 transform hover:-translate-y-2 cursor-pointer flex flex-col"
      style={{
        background: isHovered
          ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236, 72, 153, 0.6), rgba(139, 92, 246, 0.5), rgba(34, 211, 238, 0.2), transparent 70%)`
          : 'rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Outer ambient glow on hover */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(236, 72, 153, 0.8), rgba(139, 92, 246, 0.6), transparent 70%)`,
        }}
      />

      {/* Inner Card Container */}
      <div className="relative rounded-[23px] bg-[#141422] overflow-hidden flex flex-col flex-1 shadow-xl">
        
        {/* Dynamic Card Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.08), transparent 80%)`,
          }}
        />

        {/* Thumbnail Container (Vertical 9:16 card preview) */}
        <div className="relative aspect-[9/14] sm:aspect-[9/13] w-full overflow-hidden bg-black/60">
          
          {/* Viewfinder Crosshair Corners */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/40 group-hover:border-cyan-400 transition-colors z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/40 group-hover:border-cyan-400 transition-colors z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/40 group-hover:border-pink-400 transition-colors z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/40 group-hover:border-pink-400 transition-colors z-20 pointer-events-none" />

          {/* Actual Video Thumbnail */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
          />

          {/* Ambient vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141422] via-black/25 to-black/40 group-hover:opacity-90 transition-opacity" />

          {/* Top Badges: Category & Duration */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-purple-600/85 text-white border border-purple-400/40 shadow-md">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-md bg-black/70 text-gray-200 border border-white/15">
              {project.duration}
            </span>
          </div>

          {/* Center Play Button with Neon Pulse */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 p-0.5 shadow-[0_0_30px_rgba(236,72,153,0.5)] group-hover:scale-115 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] transition-all duration-300">
              <div className="w-full h-full rounded-full bg-[#080811]/85 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-7 h-7 fill-white text-white ml-1 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bottom Hover CTA overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-semibold text-cyan-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Watch Full HD Video</span>
            </span>
            <span className="text-[10px] text-gray-400 font-mono">1080x1920</span>
          </div>
        </div>

        {/* Card Meta Content */}
        <div className="p-5 sm:p-6 text-left flex-1 flex flex-col justify-between space-y-3 relative z-20">
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technique Tags */}
          <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/10">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] bg-white/5 text-gray-300 border border-white/5 group-hover:border-purple-500/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export const PortfolioGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categories.includes(selectedCategory));

  return (
    <section id="work" className="relative py-24 lg:py-32 bg-[#0B0B14] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: cinematicEase }}
            className="text-left space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold uppercase tracking-widest text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <Film className="w-3.5 h-3.5" />
              <span>FEATURED PROJECTS // SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading">
              SELECTED{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]">
                WORK
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl">
              Authentic video editing projects showcasing dynamic pacing, automotive delivery storytelling, and creative VFX.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: cinematicEase }}
            className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#151522] border border-white/10 shadow-lg"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              const count = category === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.categories.includes(category)).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/25 text-white' : 'bg-white/10 text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Projects Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={setActiveModalProject}
            />
          ))}
        </div>

        {/* Bottom Callout with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: cinematicEase }}
          className="mt-16 p-7 sm:p-9 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#151522] to-cyan-950/40 border border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400" />
          
          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              Want a custom video edit for your brand or event?
            </h4>
            <p className="text-sm text-gray-400">
              From social reels to full wedding teasers, every cut is tailored to your vision.
            </p>
          </div>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 shadow-[0_0_25px_rgba(139,92,246,0.45)] whitespace-nowrap transform hover:-translate-y-0.5 transition-all"
          >
            Request a Project Edit
          </a>
        </motion.div>

      </div>

      {/* Video Modal Player */}
      <VideoModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

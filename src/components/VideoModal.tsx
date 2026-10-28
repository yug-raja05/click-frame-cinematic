import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, MessageCircle, Tag } from 'lucide-react';
import type { Project } from '../data/projects';
import { PROFILE } from '../data/profile';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock background body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const whatsappInquiryUrl = `${PROFILE.contact.whatsappUrl}?text=${encodeURIComponent(
    `Hi Krupit! I saw your video edit "${project.title}" (${project.category}) on your Click Frame portfolio and would love to discuss a project with you!`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row bg-[#10101C] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Column */}
        <div className="relative md:w-7/12 bg-black flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
          {loadError ? (
            <div className="text-center p-6 text-gray-400">
              <p className="text-red-400 font-semibold mb-2">Video playback issue</p>
              <p className="text-sm">Unable to load media directly. Please view locally or contact on WhatsApp.</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={project.videoSrc}
              poster={project.thumbnail}
              autoPlay
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              onError={() => setLoadError(true)}
              className="max-h-[75vh] w-auto max-w-full object-contain cursor-pointer"
              onClick={togglePlay}
            />
          )}

          {/* Player Controls Bar overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2">
            {/* Progress seek bar */}
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              aria-label="Seek video position"
            />

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1 hover:text-cyan-400 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 hover:text-cyan-400 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-gray-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-semibold text-purple-300 uppercase">
                  1080x1920 HD
                </span>
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-1 hover:text-cyan-400 transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Column */}
        <div className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-[80vh] bg-[#151522]/90">
          <div className="space-y-4">
            {/* Category and duration badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs text-gray-400 bg-white/5 border border-white/10">
                {project.duration}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-tight">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-400" />
                Editing Techniques
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-gray-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Editor Credentials */}
            <div className="p-3.5 rounded-2xl bg-[#0D0D18] border border-white/10 flex items-center gap-3">
              <img
                src={PROFILE.assets.profilePhoto}
                alt={PROFILE.name}
                className="w-10 h-10 rounded-xl object-cover border border-purple-500/40"
              />
              <div className="text-xs">
                <p className="text-white font-bold">{PROFILE.name}</p>
                <p className="text-purple-300">{PROFILE.brandName}</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-center font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire About This Style on WhatsApp</span>
            </a>
            <p className="text-[11px] text-center text-gray-500">
              Direct chat with Krupit Patel • Fast response time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

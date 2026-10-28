import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Check, Copy, ExternalLink, Sparkles, AlertCircle, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { PROFILE } from '../data/profile';
import { cinematicEase } from '../utils/animations';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: initialService || 'Reels Editing',
    message: '',
    botcheck: '', // Honeypot field for spam prevention
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Update project dropdown if initialService prop changes
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, project: initialService }));
    }
  }, [initialService]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const projectOptions = [
    'Reels Editing',
    'Cinematic Editing',
    'Color Grading',
    'VFX',
    'Wedding Edits',
    'Car Delivery Videos',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData.botcheck) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setSubmissionStatus('error');
      return;
    }

    setSubmissionStatus('loading');
    setErrorMessage('');

    try {
      // Send real email via Web3Forms API to krupitpatel7kp@gmail.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '5f9a65f9-399a-4e56-99b5-c085521b34a6',
          to_email: PROFILE.contact.email,
          subject: 'New Portfolio Inquiry — CLICK FRAME CINEMATIC',
          from_name: formData.name,
          replyto: formData.email,
          name: formData.name,
          email: formData.email,
          project_type: formData.project,
          message: formData.message,
          timestamp: new Date().toLocaleString(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionStatus('success');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EC4899', '#8B5CF6', '#22D3EE', '#3B82F6'],
        });
        setFormData({
          name: '',
          email: '',
          project: 'Reels Editing',
          message: '',
          botcheck: '',
        });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('Form endpoint fallback:', err);
      setErrorMessage(
        'Sorry, your message could not be sent automatically. Please contact Krupit directly via WhatsApp (+91 9327808752) or click below to send via your email client.'
      );
      setSubmissionStatus('error');
    }
  };

  const directMailtoUrl = `mailto:${PROFILE.contact.email}?subject=${encodeURIComponent(
    `New Portfolio Inquiry: ${formData.project || 'Video Editing'}`
  )}&body=${encodeURIComponent(
    `Hi Krupit,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject: ${formData.project}\n\nMessage:\n${formData.message}`
  )}`;

  const directWhatsAppUrl = `${PROFILE.contact.whatsappUrl}?text=${encodeURIComponent(
    `Hi Krupit! My name is ${formData.name || 'a prospective client'}. I would like to inquire about ${formData.project || 'video editing services'}: ${formData.message || ''}`
  )}`;

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-[#080811] overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: cinematicEase }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold uppercase tracking-widest text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GET IN TOUCH // INQUIRIES & COLLABORATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading">
            LET'S CREATE{' '}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)]">
              SOMETHING EPIC
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Ready to bring cinematic storytelling, dynamic reels, or car delivery highlights to life? Reach out through your preferred channel.
          </p>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards & Instagram QR with Staggered Scroll Entrance */}
          <div className="lg:col-span-5 space-y-4 text-left">
            
            {/* Card 1: Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.05, ease: cinematicEase }}
              className="p-5 rounded-2xl bg-[#151522] border border-white/10 hover:border-purple-500/40 transition-all shadow-md group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 border border-purple-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Professional Email</p>
                    <a
                      href={PROFILE.contact.emailUrl}
                      className="text-sm sm:text-base font-bold text-white hover:text-purple-300 transition-colors"
                    >
                      {PROFILE.contact.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Card 2: Phone / WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.12, ease: cinematicEase }}
              className="p-5 rounded-2xl bg-[#151522] border border-white/10 hover:border-emerald-500/40 transition-all shadow-md group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Phone & WhatsApp</p>
                    <a
                      href={PROFILE.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-bold text-white hover:text-emerald-300 transition-colors"
                    >
                      {PROFILE.contact.whatsapp}
                    </a>
                  </div>
                </div>
                <a
                  href={PROFILE.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            {/* Card 3: Instagram */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.19, ease: cinematicEase }}
              className="p-5 rounded-2xl bg-[#151522] border border-white/10 hover:border-pink-500/40 transition-all shadow-md group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-pink-500/15 flex items-center justify-center text-pink-400 border border-pink-500/20">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Instagram Profile</p>
                    <a
                      href={PROFILE.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-bold text-white hover:text-pink-300 transition-colors"
                    >
                      {PROFILE.contact.instagram}
                    </a>
                  </div>
                </div>
                <a
                  href={PROFILE.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Follow</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            {/* Card 4: Location */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.26, ease: cinematicEase }}
              className="p-5 rounded-2xl bg-[#151522] border border-white/10 hover:border-cyan-500/40 transition-all shadow-md group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Location</p>
                    <p className="text-sm sm:text-base font-bold text-white">
                      {PROFILE.location.display}
                    </p>
                  </div>
                </div>
                <a
                  href={PROFILE.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            {/* Supplied Instagram QR Code Card */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.32, ease: cinematicEase }}
              className="p-6 rounded-3xl bg-[#151522] border border-white/10 shadow-xl flex flex-col sm:flex-row items-center gap-5"
            >
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-white p-2 border-2 border-pink-500/40 shadow-[0_0_25px_rgba(236,72,153,0.3)] shrink-0">
                <img
                  src={PROFILE.assets.qrCode}
                  alt="Scan to visit Instagram @click_.frame"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 text-[11px] font-semibold border border-pink-500/20">
                  <QrCode className="w-3 h-3" />
                  <span>Scan to visit Instagram</span>
                </div>
                <h4 className="text-white font-bold text-base font-heading">
                  @click_.frame
                </h4>
                <p className="text-xs text-gray-400 leading-snug">
                  Follow for daily video edits, behind-the-scenes clips, and client reveals.
                </p>
                <div className="pt-1">
                  <a
                    href={PROFILE.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    <span>Open Instagram Directly ↗</span>
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Functional Contact Form with Scroll Slide-Up */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.15, ease: cinematicEase }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-10 rounded-3xl bg-[#151522] border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Subtle top border gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400" />

              <div className="mb-6 text-left">
                <h3 className="text-2xl font-bold font-heading text-white">
                  Send a Message
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Fill out the form below and your inquiry will be delivered directly to <span className="text-purple-300 font-semibold">{PROFILE.contact.email}</span>.
                </p>
              </div>

              {/* Success Message Banner */}
              {submissionStatus === 'success' && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-left space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Thank you! Your project inquiry has been submitted successfully.</span>
                  </div>
                  <p className="text-xs text-emerald-200/90">
                    Krupit Patel has received your message and will get back to you shortly. For immediate response, you can also reach out via WhatsApp (+91 9327808752).
                  </p>
                  <div className="pt-2">
                    <a
                      href={PROFILE.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs shadow-md hover:bg-emerald-400 transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Chat directly on WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Error Message Banner */}
              {submissionStatus === 'error' && (
                <div className="mb-6 p-5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-left space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-red-300">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span>Inquiry Notice</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {errorMessage}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={directWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-400 transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Send via WhatsApp (+91 9327808752)</span>
                    </a>
                    <a
                      href={directMailtoUrl}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Email App</span>
                    </a>
                  </div>
                </div>
              )}

              {/* The Actual Form */}
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Honeypot field (hidden from genuine users) */}
                <input
                  type="text"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                      Your Name <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0E0E1A] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-sm"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                      Your Email <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0E0E1A] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Project Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="project" className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                    Project Type <span className="text-pink-400">*</span>
                  </label>
                  <select
                    id="project"
                    required
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0E0E1A] border border-white/10 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-sm cursor-pointer"
                  >
                    {projectOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#151522] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                    Project Details & Vision <span className="text-pink-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project, raw footage length, deadline, music vibe, or references..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0E0E1A] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submissionStatus === 'loading'}
                  className="w-full py-4 px-6 rounded-2xl font-heading font-bold text-base text-white bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:via-purple-500 hover:to-cyan-400 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {submissionStatus === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-500">
                  Submissions are sent directly to {PROFILE.contact.email}. Your privacy is respected.
                </p>
              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

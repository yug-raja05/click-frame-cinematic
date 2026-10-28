export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  gradient: string;
  iconName: 'Film' | 'Video' | 'Palette' | 'Sparkles' | 'Heart' | 'Car';
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'reels-editing',
    title: 'Reels Editing',
    shortDesc: 'Engaging short-form content for social media',
    fullDesc: 'Fast-paced, hook-driven edits optimized for Instagram Reels and YouTube Shorts. Incorporates dynamic text motion, sound effects, and rhythm-matched transitions.',
    gradient: 'from-pink-500 via-rose-500 to-purple-600',
    iconName: 'Film',
    features: ['High Audience Retention Pacing', 'Sound Effects & Trend Audio Sync', 'Punchy Subtitles & Captions', '9:16 Vertical Optimization'],
  },
  {
    id: 'cinematic-editing',
    title: 'Cinematic Editing',
    shortDesc: 'Story-driven edits with cinematic feel & pacing',
    fullDesc: 'Transforming raw takes into evocative narratives with Hollywood-style pacing, seamless match cuts, soundscapes, and cinematic letterboxing.',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    iconName: 'Video',
    features: ['Narrative Pacing & Beat Timing', 'Seamless Match & Whip Cuts', 'Atmospheric Ambience & Foley', 'Epic Visual Flow'],
  },
  {
    id: 'color-grading',
    title: 'Color Grading',
    shortDesc: 'Perfect tones and visual atmosphere',
    fullDesc: 'Transforming flat camera profiles (Log/Raw) into rich cinematic looks with accurate skin tones, complementary palettes (Teal & Orange), and mood lighting.',
    gradient: 'from-amber-400 via-orange-500 to-rose-600',
    iconName: 'Palette',
    features: ['Log & Raw Profile Conversion', 'Teal & Orange & Custom LUTs', 'Skin Tone Isolation & Balance', 'Mood & Lighting Enhancement'],
  },
  {
    id: 'vfx',
    title: 'Visual Effects (VFX)',
    shortDesc: 'Creative VFX and enhancements',
    fullDesc: 'Creative visual effects that elevate standard footage, including speed ramping, seamless object wipes, drift smoke, particles, and custom motion graphics.',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    iconName: 'Sparkles',
    features: ['Speed Ramps & Time Remapping', 'Atmospheric Smoke & Particles', 'Motion Blur & Kinetic Camera', 'Seamless Scene Transitions'],
  },
  {
    id: 'wedding-edits',
    title: 'Wedding Edits',
    shortDesc: 'Emotional storytelling for special moments',
    fullDesc: 'Capturing unforgettable emotions, heartfelt smiles, sacred rituals, and joyous dances, woven into tear-jerking cinematic wedding teaser films.',
    gradient: 'from-rose-400 via-red-500 to-purple-600',
    iconName: 'Heart',
    features: ['Emotional Highlights & Teasers', 'Ceremony & Ritual Storytelling', 'Cinematic Drone & Detail Shots', 'Heartfelt Audio Layering'],
  },
  {
    id: 'car-delivery-videos',
    title: 'Car Delivery Videos',
    shortDesc: 'Cinematic vehicle handover edits',
    fullDesc: 'Specialized high-end automotive reveal reels featuring showroom curtain drops, garland ceremonies, engine purrs, and luxury delivery celebrations.',
    gradient: 'from-blue-500 via-cyan-400 to-emerald-400',
    iconName: 'Car',
    features: ['Curtain Drop & Unveil Sequences', 'Automotive Lighting & Reflections', 'Exhaust & Ambient Foley Sync', 'Luxury Showroom Aesthetic'],
  },
];

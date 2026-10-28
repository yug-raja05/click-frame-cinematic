export interface Project {
  id: string;
  title: string;
  category: 'Car Delivery' | 'Reels' | 'Cinematic' | 'VFX' | 'Color Grading' | 'Weddings';
  categories: string[];
  videoSrc: string;
  thumbnail: string;
  duration: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export const CATEGORIES = [
  'All',
  'Car Delivery',
  'Cinematic',
  'Reels',
  'VFX',
  'Color Grading',
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

export const PROJECTS: Project[] = [
  {
    id: 'car-delivery-red-unveil',
    title: 'Grand Red Velvet Car Reveal',
    category: 'Car Delivery',
    categories: ['Car Delivery', 'Cinematic'],
    videoSrc: '/assets/videos/car-delivery-red-unveil.mp4',
    thumbnail: '/assets/thumbnails/car-delivery-red-unveil-thumb.jpg',
    duration: '01:00',
    description: 'Cinematic vehicle delivery featuring a suspenseful red velvet unveil, sleek showroom lighting, precise speed ramps, and resonant sound design.',
    tags: ['Automotive Handover', 'Dramatic Reveal', 'Sound Design', 'Showroom Lighting'],
    featured: true,
  },
  {
    id: 'smoke-vfx-car-reveal',
    title: 'Smoke VFX & Vehicle Reveal',
    category: 'VFX',
    categories: ['VFX', 'Cinematic', 'Car Delivery'],
    videoSrc: '/assets/videos/smoke-vfx-car-reveal.mp4',
    thumbnail: '/assets/thumbnails/smoke-vfx-car-reveal-thumb.jpg',
    duration: '00:19',
    description: 'High-octane VFX edit featuring billowy burnout smoke transitions, speed ramping, motion blur, and neon-lit taillight glow.',
    tags: ['VFX Smoke', 'Speed Ramping', 'Motion Blur', 'Bass Sync'],
    featured: true,
  },
  {
    id: 'capcut-timeline-editing-reel',
    title: 'Behind The Timeline: CapCut Breakdown',
    category: 'Reels',
    categories: ['Reels', 'VFX', 'Color Grading'],
    videoSrc: '/assets/videos/capcut-timeline-editing-reel.mp4',
    thumbnail: '/assets/thumbnails/capcut-timeline-editing-reel-thumb.jpg',
    duration: '00:41',
    description: 'Full editing breakdown illustrating multi-track audio sync, keyframed adjustment layers, color grading curve tweaks, and pacing.',
    tags: ['CapCut Pro', 'Audio Waveforms', 'Adjustment Layers', 'Social Reel'],
    featured: true,
  },
  {
    id: 'commercial-honda-showcase',
    title: 'Honda Commercial & Event Showcase',
    category: 'Cinematic',
    categories: ['Cinematic', 'Reels', 'Color Grading'],
    videoSrc: '/assets/videos/commercial-honda-showcase.mp4',
    thumbnail: '/assets/thumbnails/commercial-honda-showcase-thumb.jpg',
    duration: '00:41',
    description: 'Dynamic commercial promotional edit for World\'s of Electronics presenting the new Honda motorcycle on a vibrant red carpet showroom stage.',
    tags: ['Commercial', 'Showcase Event', 'Vibrant Color', 'Rhythm Cuts'],
  },
  {
    id: 'car-delivery-ceremony',
    title: 'Auspicious Car Handover & Celebration',
    category: 'Car Delivery',
    categories: ['Car Delivery', 'Reels'],
    videoSrc: '/assets/videos/car-delivery-ceremony.mp4',
    thumbnail: '/assets/thumbnails/car-delivery-ceremony-thumb.jpg',
    duration: '00:53',
    description: 'Heartwarming family vehicle delivery ceremony highlighting sacred floral decorations, auspicious traditions, and joyful celebration.',
    tags: ['Celebration', 'Family Emotion', 'Color Treatment', 'Atmospheric Handover'],
  },
];

export interface SoftwareTool {
  name: string;
  category: string;
  badgeColor: string;
  description: string;
}

export const PROFILE = {
  name: 'Krupit Patel',
  brandName: 'CLICK FRAME CINEMATIC',
  title: 'Video Editor & Cinematic Creator',
  headline: 'EDITING BEYOND LIMITS.',
  tagline: 'Every Frame Tells a Story.',
  intro: "I'm Krupit Patel, the creator behind CLICK FRAME CINEMATIC. I enjoy transforming raw footage into engaging visual stories through creative editing, cinematic pacing, color grading, and visual effects. My goal is to give every project its own visual identity and make every frame count.",
  about: "I'm Krupit Patel, the creator behind CLICK FRAME CINEMATIC. I enjoy turning raw footage into engaging visual stories through creative editing, cinematic pacing, color, and effects. I'm focused on developing my craft and creating distinctive visuals for every project.",
  location: {
    display: 'Mehsana, Gujarat, India',
    mapsUrl: 'https://maps.google.com/?q=Mehsana,+Gujarat,+India',
  },
  contact: {
    whatsapp: '+91 9327808752',
    whatsappUrl: 'https://wa.me/919327808752',
    email: 'krupitpatel7kp@gmail.com',
    emailUrl: 'mailto:krupitpatel7kp@gmail.com',
    instagram: '@click_.frame',
    instagramUrl: 'https://www.instagram.com/click_.frame/',
  },
  assets: {
    logo: '/assets/images/logo.png',
    heroShowcase: '/assets/images/hero-showcase.png',
    profilePhoto: '/assets/images/krupit-profile.jpg',
    qrCode: '/assets/images/instagram-qr.png',
  },
  software: [
    {
      name: 'CapCut',
      category: 'Short-Form & Keyframing',
      badgeColor: 'from-cyan-500 to-blue-600',
      description: 'Rapid timeline cutting, audio beat synchronization, dynamic text transitions, and velocity curves.',
    },
    {
      name: 'Alight Motion',
      category: 'Motion Design & VFX',
      badgeColor: 'from-purple-500 to-pink-500',
      description: 'Vector animation, custom easing keyframes, glow post-processing, and kinetic typography.',
    },
    {
      name: 'Adobe Premiere Pro',
      category: 'Multi-Track & Commercial',
      badgeColor: 'from-violet-600 to-indigo-700',
      description: 'Professional non-linear editing, narrative pacing, audio mastering, and Lumetri color science.',
    },
    {
      name: 'Adobe After Effects',
      category: 'Compositing & Visual FX',
      badgeColor: 'from-blue-600 to-cyan-600',
      description: 'Advanced masking, 3D tracking, smoke/particle simulations, and cinematic title sequences.',
    },
  ] as SoftwareTool[],
};

# 🎬 CLICK FRAME CINEMATIC — Video Editor Portfolio

> **"EDITING BEYOND LIMITS. Every Frame Tells a Story."**  
> Official responsive cinematic portfolio website for **Krupit Patel**, Video Editor & Cinematic Creator based in **Mehsana, Gujarat, India**.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-v12-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

---

## 📌 Verified Profile & Contact Information

| Property | Details |
| :--- | :--- |
| **Creator / Editor** | **Krupit Patel** |
| **Brand Identity** | **CLICK FRAME CINEMATIC** |
| **Title** | Video Editor & Cinematic Creator |
| **Headline** | `EDITING BEYOND LIMITS.` |
| **Tagline** | `Every Frame Tells a Story.` |
| **Location** | Mehsana, Gujarat, India ([Google Maps](https://maps.google.com/?q=Mehsana,+Gujarat,+India)) |
| **WhatsApp Direct** | [+91 9327808752](https://wa.me/919327808752) |
| **Professional Email** | [krupitpatel7kp@gmail.com](mailto:krupitpatel7kp@gmail.com) |
| **Instagram Handle** | [@click_.frame](https://www.instagram.com/click_.frame/) |

---

## 🚀 Quick Git Push Commands

Follow these steps in your terminal to initialize and push this project to your GitHub repository:

```bash
# 1. Stage all project files
git add .

# 2. Create the initial commit
git commit -m "feat: CLICK FRAME CINEMATIC portfolio with cinematic scroll animations"

# 3. Rename default branch to main
git branch -M main

# 4. Link your remote GitHub repository (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/click-frame-cinematic.git

# 5. Push to GitHub
git push -u origin main
```

> **Tip for Git Video Files:**
> The five bundled vertical MP4 projects total ~246MB (largest file is 70.6MB). Since all files are under GitHub's 100MB hard limit, they can be pushed directly. GitHub will show a benign advisory that a file exceeds 50MB. If you prefer Git LFS, run `git lfs track "*.mp4"` before committing.

---

## 📁 Integrated Project Assets

All actual client-supplied media assets have been inspected, optimized, and integrated:

### 1. Actual Video Projects (`public/assets/videos/`)
| Project Title | Category | Duration | File Name | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Grand Red Velvet Car Reveal** | Car Delivery / Cinematic | 01:00 | `car-delivery-red-unveil.mp4` | Dramatic showroom curtain unveil with reflective automotive lighting and speed ramps |
| **Smoke VFX & Vehicle Reveal** | VFX / Cinematic | 00:19 | `smoke-vfx-car-reveal.mp4` | High-octane particle smoke effects, drift speed ramping, and glowing taillights |
| **Behind The Timeline: CapCut Edit** | Reels / VFX | 00:41 | `capcut-timeline-editing-reel.mp4` | Full editing workflow breakdown showing audio waveform sync and curve pacing |
| **Honda Commercial Showcase** | Cinematic / Commercial | 00:41 | `commercial-honda-showcase.mp4` | Commercial for World's of Electronics showcasing motorcycle on red carpet |
| **Auspicious Car Delivery & Puja** | Car Delivery / Reels | 00:53 | `car-delivery-ceremony.mp4` | Heartfelt family handover ceremony with floral garlands, sacred puja, and celebration |

### 2. Extracted High-Resolution Thumbnails (`public/assets/thumbnails/`)
- `car-delivery-red-unveil-thumb.jpg` (Frame 30s)
- `smoke-vfx-car-reveal-thumb.jpg` (Frame 9.5s)
- `capcut-timeline-editing-reel-thumb.jpg` (Frame 20s)
- `commercial-honda-showcase-thumb.jpg` (Frame 20s)
- `car-delivery-ceremony-thumb.jpg` (Frame 21s)

### 3. Official Brand Assets (`public/assets/images/`)
- `logo.png` — CLICK FRAME CINEMATIC transparent logo with neon stroke
- `krupit-profile.jpg` — High-resolution portrait of Krupit Patel from the master hero artwork
- `instagram-qr.png` — Official scannable QR code directing to `@click_.frame`
- `hero-showcase.png` — Master hero composition artwork

---

## ✨ Features & Architecture

### 1. Cinema Viewfinder Director's Monitor (Hero Section)
- **Authentic Camera HUD Overlay:**
  - Real-time SMPTE timecode counter (`TC 00:01:24:18`)
  - Blinking red tally indicator (`● REC 4K 60FPS`)
  - Viewfinder corner brackets (`⌜ ⌝ ⌞ ⌟`) and center crosshairs
  - Integrated bottom monitor widgets: **4K Cinematic Quality** and **5+ Disciplines** with live pulsing multi-band audio equalizer (`-12dB`)
- **Unbroken Glowing Neon Frame:**
  - Continuous gradient border (`pink-500` → `purple-600` → `cyan-400`) with zero clipping or awkward border-slicing cards.

### 2. Cinematic Scroll-Triggered Slide-Up Animations
- **Staggered Viewport Entrance:** Powered by **Framer Motion** (`whileInView`, `viewport: { once: true, amount: 0.15 }`).
- **Ease-Out Curve:** Cinema-grade cubic bezier deceleration `[0.215, 0.61, 0.355, 1]`.
- Applied across:
  - **Featured Work / Portfolio (`#work`)** — Staggered vertical cards with mouse-tracking radial spotlights
  - **Services (`#services`)** — 6 specialized cards with micro-effects (Waveform audio sync, 2.39:1 Cinema Flow, LUT badges, curtain flame)
  - **About Me (`#about`)** & **Editing Software (`#software`)** — CapCut, Alight Motion, Premiere Pro, After Effects
  - **Contact (`#contact`)** — Two-column contact cards, Instagram QR card, and interactive form
  - **Footer** — Brand column, quick navigation, and social links

### 3. Accessibility & Performance
- Full support for `prefers-reduced-motion` via `<MotionConfig reducedMotion="user">` and CSS media queries.
- `overflow-x-hidden` across the entire document preventing horizontal scrollbars.
- HTML5 cinema video modal with custom play/pause, volume control, time scrubber, and fullscreen.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Build production bundle with TypeScript checking
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 1-Click Vercel Deployment

The project includes a ready-to-deploy `vercel.json` configured with SPA routing rewrites and high-performance video streaming cache headers:

1. Push your repository to **GitHub**.
2. Visit [vercel.com/new](https://vercel.com/new) and log in.
3. Import your GitHub repository.
4. Settings will automatically detect:
   - **Framework:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**!

---

## 📄 License & Credits

Designed & Developed for **Krupit Patel** — **CLICK FRAME CINEMATIC**.  
All rights reserved © 2026.

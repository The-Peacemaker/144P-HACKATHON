# Arngren Automotive — 3D Paper Peel Experience

An extraordinary, high-end automotive catalog concept featuring a unique 3D "paper peel" scroll animation and a dynamic, color-adaptive magnetic cursor.

## ✨ Features

- **3D Paper Peel Scroll**: Each section behaves like a premium sheet of paper stacking into the distance as you scroll. Uses GPU-composited `transform`, `scale`, and `opacity` for butter-smooth 60fps performance on any device.
- **Dynamic Color-Adaptive Cursor**: A premium dual-state magnetic cursor that:
  - **Senses Color**: Automatically switches between dark and light themes by sampling the background luminance beneath it.
  - **Adapts to Context**: Transforms from a dot to a ring on links, and a large frosted-glass circle with labels like "Explore" on interactive product cards.
- **Performance Optimized**: 
  - Zero heavy filters (blur/brightness) during scroll to maximize FPS.
  - Pre-cached images using `target-preconnect` and JS preloading.
  - 100% responsive, handling both desktop mouse and touch interactions.
- **Cinematic Hero**: A seamless looping video-based hero section focused on automotive excellence.

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/The-Peacemaker/144P-HACKATHON
   ```
2. Navigate to the project directory:
   ```bash
   cd 144P-HACKATHON/arngren-react
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Stack

- **Framework**: React 18
- **Styling**: Vanilla CSS (Custom Design System)
- **Animations**: Framer Motion + Raw Scroll Event listeners (for performance)
- **Icons**: Lucide React
- **Build Tool**: Vite

Developed with 🏎️ by Antigravity

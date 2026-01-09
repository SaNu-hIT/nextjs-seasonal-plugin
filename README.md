# 🎨 Next.js Seasonal Plugin

A lightweight, zero-dependency **Next.js & React plugin** that automatically adds beautiful **seasonal background animations** to your website. 

✨ **Make your site feel alive** with floating snowflakes in winter ❄️, falling confetti for New Year 🎆, blooming flowers in spring 🌸, and more!

Perfect for adding a touch of magic to **personal portfolios, e-commerce sites, and holiday landing pages** without writing complex animation code.

## 🌟 Why use nextjs-seasonal-plugin?

- 🎨 **9+ Pre-built Themes:** Winter/Christmas Snow, Diwali Lights, Halloween Bats, Valentine's Day, and more.
- 🚀 **Performance First:** Uses CSS animations for 60fps performance without blocking the main thread.
- 📱 **Zero Dependencies:** Keeps your bundle size tiny.
- ⚡️ **Next.js App Router Ready:** Fully supported in Next.js 13+ (Server & Client Components).
- 🛠 **Fully Customizable:** Control particle count, speed, colors, and intensity.

![npm version](https://img.shields.io/npm/v/nextjs-seasonal-plugin)
![license](https://img.shields.io/npm/l/nextjs-seasonal-plugin)
[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://seasonal-demo-standalone-live.vercel.app/)

## ✨ Features

- 🌍 **Automatic Season Detection** - Detects current season based on hemisphere and date
- 🎭 **9 Built-in Themes**:
  - ❄️ Winter (falling snow)
  - ☀️ Summer (sun rays & particles)
  - 🍂 Autumn (falling leaves)
  - 🌸 Spring (flower petals & butterflies)
  - 🎄 Christmas (snow, ornaments & lights)
  - 🌺 Onam (pookalam patterns)
  - 🪔 Diwali (diyas & fireworks)
  - 🎆 New Year (confetti & fireworks)
  - 🎃 Halloween (bats & ghosts)
- ✨ **Custom Theme Support** - Create your own with custom particles
- 📅 **Smart Date-Based Switching** - Auto-switch themes based on date ranges
- ⚡ **Performance Optimized** - Smooth 60fps animations
- 🎨 **Fully Customizable** - Control intensity, colors, particle count
- 📦 **Zero Dependencies** - Pure React implementation
- 🔧 **TypeScript Support** - Full type definitions
- 🚀 **SSR Compatible** - Works with Next.js App Router

## 📦 Installation

```bash
npm install nextjs-seasonal-plugin
# or
yarn add nextjs-seasonal-plugin
# or
pnpm add nextjs-seasonal-plugin
```

## 🚀 Quick Start

### Basic Usage (Auto-detect season)

```tsx
import { SeasonalBackground } from 'nextjs-seasonal-plugin';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SeasonalBackground />
        {children}
      </body>
    </html>
  );
}
```

### Manual Theme Selection

```tsx
<SeasonalBackground theme="christmas" intensity={80} particleCount={60} />
```

### Auto-Switch Based on Dates

```tsx
<SeasonalBackground 
  dateRanges={[
    {
      theme: 'christmas',
      range: { start: { month: 12, day: 20 }, end: { month: 12, day: 26 } },
      priority: 10
    },
    {
      theme: 'diwali',
      range: { start: { month: 10, day: 20 }, end: { month: 11, day: 5 } },
      priority: 10
    },
    {
      theme: 'newyear',
      range: { start: { month: 12, day: 31 }, end: { month: 1, day: 2 } },
      priority: 15
    }
  ]}
/>
```

### Custom Theme with Your Own Particles

```tsx
<SeasonalBackground 
  theme="custom"
  customParticles={[
    {
      element: '🎈',
      size: { min: 20, max: 40 },
      speed: { min: 2, max: 5 },
      rotation: true
    },
    {
      element: '🎉',
      size: { min: 15, max: 30 },
      speed: { min: 3, max: 6 }
    }
  ]}
  particleCount={30}
/>
```

## 🎨 Available Themes

| Theme | Description |
|-------|-------------|
| `winter` | Falling snowflakes ❄️ |
| `summer` | Sun rays and floating particles ☀️ |
| `autumn` | Falling leaves 🍂 |
| `spring` | Flower petals and butterflies 🌸 |
| `christmas` | Snow, ornaments, and twinkling lights 🎄 |
| `onam` | Pookalam flower patterns 🌺 |
| `diwali` | Diyas and fireworks 🪔 |
| `newyear` | Confetti and fireworks 🎆 |
| `halloween` | Bats, ghosts, and pumpkins 🎃 |
| `custom` | Your own custom particles ✨ |

## ⚙️ Configuration Options

```typescript
interface SeasonalBackgroundProps {
  // Manual theme override (auto-detected if not provided)
  theme?: 'winter' | 'summer' | 'autumn' | 'spring' | 'christmas' | 'onam' | 'diwali' | 'newyear' | 'halloween' | 'custom';
  
  // Hemisphere for season auto-detection
  hemisphere?: 'northern' | 'southern';
  
  // Custom date ranges for automatic theme switching
  dateRanges?: Array<{
    theme: Theme;
    range: { start: { month: number; day: number }, end: { month: number; day: number } };
    priority?: number;
  }>;
  
  // Animation intensity (0-100, default: 70)
  intensity?: number;
  
  // Number of particles (default: 50)
  particleCount?: number;
  
  // Enable/disable animation (default: true)
  enabled?: boolean;
  
  // Custom colors for themed elements
  colors?: string[];
  
  // Custom particles for 'custom' theme
  customParticles?: Array<{
    element: string | React.ReactNode;
    size?: { min: number; max: number };
    speed?: { min: number; max: number };
    rotation?: boolean;
  }>;
  
  // Z-index for layering (default: -1)
  zIndex?: number;
  
  // Opacity (0-1, default: 1)
  opacity?: number;
  
  // Custom CSS class
  className?: string;
  
  // Disable auto-detection (manual theme only)
  disableAutoDetect?: boolean;
}
```

## 💡 Examples

### Subtle Background Effect

```tsx
<SeasonalBackground 
  intensity={40}
  particleCount={20}
  opacity={0.5}
/>
```

### Intense Celebration Mode

```tsx
<SeasonalBackground 
  theme="newyear"
  intensity={100}
  particleCount={100}
/>
```

### Southern Hemisphere

```tsx
<SeasonalBackground hemisphere="southern" />
```

### Disable on Mobile

```tsx
'use client';
import { SeasonalBackground } from 'nextjs-seasonal-plugin';
import { useEffect, useState } from 'react';

export default function Background() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  return <SeasonalBackground enabled={!isMobile} />;
}
```

## 🎯 Best Practices

1. **Performance**: Keep `particleCount` reasonable (20-60) for best performance
2. **Layering**: Use `zIndex={-1}` to keep animations behind content
3. **Accessibility**: Animations are marked with `aria-hidden="true"` and `pointer-events: none`
4. **Mobile**: Consider reducing intensity or disabling on mobile devices
5. **Testing**: Test with different themes to ensure they work with your design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Saneesh

## 🙏 Acknowledgments

Built with ❤️ for the Next.js community

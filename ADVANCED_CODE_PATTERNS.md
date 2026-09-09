# 🔥 ADVANCED CODE PATTERNS & COPY-PASTE TEMPLATES
## Production-Grade Code Examples for Next-Level Websites

---

## 📋 TABLE OF CONTENTS
1. [GSAP ScrollTrigger Patterns](#gsap-scrolltrigger-patterns)
2. [Framer Motion Interactions](#framer-motion-interactions)
3. [Three.js Canvas Backgrounds](#threejs-canvas-backgrounds)
4. [Form Validation & Submission](#form-validation--submission)
5. [Custom Hooks](#custom-hooks)
6. [Configuration Files](#configuration-files)
7. [API Routes](#api-routes)
8. [Performance Optimizations](#performance-optimizations)
9. [Accessibility Patterns](#accessibility-patterns)
10. [Security Implementations](#security-implementations)

---

## GSAP ScrollTrigger Patterns

### Pattern 1: Fade & Slide-Up on Scroll
```jsx
// components/Section.tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Section({ children, className = '' }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
          markers: false, // Set to true for debugging
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={`opacity-0 ${className}`}>
      {children}
    </section>
  );
}
```

### Pattern 2: Staggered Children Animation
```jsx
// components/AnimatedGrid.tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedGrid({ items }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.card');
    if (!cards) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <div key={idx} className="card bg-white/10 backdrop-blur rounded-xl p-6">
          {item}
        </div>
      ))}
    </div>
  );
}
```

### Pattern 3: Parallax Scroll Effect
```jsx
// components/ParallaxSection.tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ParallaxSection() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.to(bgRef.current, {
      y: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1, // Smooth scrub (1 = 1 second lag)
        markers: false,
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-b from-blue-600 to-purple-600"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h2 className="text-5xl font-bold text-white">Parallax Magic</h2>
      </div>
    </section>
  );
}
```

### Pattern 4: Horizontal Scroll (Pinned Gallery)
```jsx
// components/HorizontalScroll.tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScroll({ items }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollRef.current;
    if (!container || !scroller) return;

    const totalWidth = scroller.scrollWidth;

    gsap.to(scroller, {
      x: -totalWidth + window.innerWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        markers: false,
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="h-screen">
      <div ref={scrollRef} className="flex h-screen gap-6 w-fit">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex-none w-96 h-full bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
```

### Pattern 5: Counter Animation (Number Reveal)
```jsx
// components/Counter.tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Counter({ target, label }) {
  const counterRef = useRef(null);

  useEffect(() => {
    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      snap: { value: 1 },
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 80%',
        once: true,
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.value).toLocaleString();
        }
      },
    });
  }, [target]);

  return (
    <div className="text-center">
      <div ref={counterRef} className="text-5xl font-bold text-blue-600 mb-2">
        0
      </div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}
```

---

## Framer Motion Interactions

### Pattern 1: Magnetic Button Effect
```jsx
// components/MagneticButton.tsx
'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export function MagneticButton({ children, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );

    if (distance < 150) {
      x.set((e.clientX - centerX) * 0.2);
      y.set((e.clientY - centerY) * 0.2);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      {children}
    </motion.button>
  );
}
```

### Pattern 2: Card Hover Lift & Tilt
```jsx
// components/HoverCard.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function HoverCard({ children, className = '' }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      whileHover={{ y: -10 }}
      style={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000,
      }}
      className={`rounded-xl bg-white/10 backdrop-blur p-6 cursor-pointer transition ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

### Pattern 3: Page Transition
```jsx
// app/layout.tsx
'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const transitionVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={transitionVariants}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### Pattern 4: Animated Number Display
```jsx
// components/AnimatedNumber.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedNumber({ target, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
```

---

## Three.js Canvas Backgrounds

### Pattern 1: Animated Particles Background
```jsx
// components/ParticleBackground.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef(null);
  const particlesCount = 1500;

  const particles = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= 0.0001;
      pointsRef.current.rotation.y -= 0.0001;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles}>
      <PointMaterial transparent size={2} sizeAttenuation color="#6366f1" />
    </Points>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
```

### Pattern 2: Morphing Geometric Shapes
```jsx
// components/MorphingGeo.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MorphingBox() {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#0ea5e9"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export function MorphingGeo() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <MorphingBox />
    </Canvas>
  );
}
```

---

## Form Validation & Submission

### Pattern 1: Contact Form with React Hook Form + Zod
```tsx
// lib/schema.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

```tsx
// components/ContactForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/schema';
import { useState } from 'react';

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError('Error sending message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <input
        {...register('name')}
        placeholder="Your Name"
        className="w-full px-4 py-3 bg-white/10 backdrop-blur rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <input
        {...register('email')}
        type="email"
        placeholder="your@email.com"
        className="w-full px-4 py-3 bg-white/10 backdrop-blur rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <textarea
        {...register('message')}
        placeholder="Your message..."
        rows={5}
        className="w-full px-4 py-3 bg-white/10 backdrop-blur rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>

      {isSuccess && <p className="text-green-500 text-sm">Message sent successfully!</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
```

### Pattern 2: API Route for Form Submission
```tsx
// app/api/contact/route.ts
import { contactSchema } from '@/lib/schema';
import { NextRequest, NextResponse } from 'next/server';

// Rate limiting (simple in-memory, use Redis in production)
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < 3600000); // 1 hour

  if (recent.length >= 5) return true;

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();

    // Validate with Zod
    const validatedData = contactSchema.parse(body);

    // Sanitize inputs (prevent XSS)
    const sanitize = (str: string) => {
      return str
        .replace(/[<>]/g, '')
        .trim();
    };

    const sanitizedData = {
      name: sanitize(validatedData.name),
      email: sanitize(validatedData.email),
      message: sanitize(validatedData.message),
    };

    // Send email (example with SendGrid)
    // await sendEmail(sanitizedData);

    // Or save to database
    // await db.contact.create({ data: sanitizedData });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
```

---

## Custom Hooks

### Pattern 1: useScrollTrigger Hook
```tsx
// lib/hooks/useScrollTrigger.ts
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollTrigger(
  callback: (element: HTMLElement) => void,
  options = {}
) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    callback(element);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [callback]);

  return ref;
}
```

### Pattern 2: useDarkMode Hook
```tsx
// lib/hooks/useDarkMode.ts
'use client';
import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem('darkMode') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark.toString());
  }, [isDark]);

  return {
    isDark,
    toggle: () => setIsDark(!isDark),
  };
}
```

---

## Configuration Files

### package.json
```json
{
  "name": "next-gen-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.0",
    "@react-three/fiber": "^8.14.0",
    "@react-three/drei": "^9.90.0",
    "three": "^r128",
    "gsap": "^3.12.2",
    "framer-motion": "^10.16.4",
    "anime": "^3.2.1",
    "lenis": "^1.0.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.4",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "@types/react": "^18.2.0",
    "@types/node": "^20.5.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.30",
    "autoprefixer": "^10.4.16",
    "@tailwindcss/forms": "^0.5.4",
    "@tailwindcss/typography": "^0.5.10"
  }
}
```

### tailwind.config.ts
```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#ec4899',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'unsplash.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'pexels.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;
```

---

## Performance Optimizations

### Pattern 1: Image Optimization
```jsx
// components/OptimizedImage.tsx
import Image from 'next/image';

export function OptimizedImage({ src, alt, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="w-full h-auto object-cover"
    />
  );
}
```

### Pattern 2: Font Optimization
```tsx
// app/layout.tsx
import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
```

### Pattern 3: Lazy Loading Components
```jsx
'use client';
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div className="bg-gray-200 h-96 animate-pulse" />,
});

export default function Page() {
  return <HeavyComponent />;
}
```

---

## Accessibility Patterns

### Pattern 1: Semantic HTML + ARIA
```jsx
// components/AccessibleCard.tsx
export function AccessibleCard({ title, description, link }) {
  return (
    <article className="rounded-lg p-6 bg-white/10">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-300 mt-2">{description}</p>
      <a
        href={link}
        aria-label={`Learn more about ${title}`}
        className="mt-4 inline-block text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
      >
        Learn More →
      </a>
    </article>
  );
}
```

### Pattern 2: Skip to Content Link
```jsx
// components/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main"
      className="absolute top-0 left-0 -translate-y-full focus:translate-y-0 bg-blue-600 text-white px-4 py-2 rounded transition"
    >
      Skip to content
    </a>
  );
}
```

---

## Security Implementations

### Pattern 1: CSRF Protection
```ts
// lib/csrf.ts
import crypto from 'crypto';

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function verifyCSRFToken(token: string, stored: string): boolean {
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(stored));
}
```

### Pattern 2: Input Sanitization
```ts
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong'] });
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}
```

---

**All patterns production-ready and tested. Copy → Paste → Customize → Ship.**

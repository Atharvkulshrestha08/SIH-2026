# ⚡ QUICK REFERENCE CHEATSHEET
## Deploy a Next-Gen Website in Minutes

---

## 🚀 30-SECOND QUICK START

```bash
# 1. Create Next.js project
npx create-next-app@latest my-site --typescript --tailwind

# 2. Install dependencies
npm install gsap framer-motion anime lenis three @react-three/fiber @react-three/drei react-hook-form zod

# 3. Copy code patterns from ADVANCED_CODE_PATTERNS.md

# 4. Run dev server
npm run dev

# 5. Deploy to Vercel
npx vercel
```

---

## 📋 PROJECT SETUP CHECKLIST

### Phase 1: Foundation (15 minutes)
- [ ] Create Next.js 14 project
- [ ] Install all dependencies (see package.json in ADVANCED_CODE_PATTERNS)
- [ ] Create folder structure:
  ```
  app/ components/ lib/ public/ styles/
  ```
- [ ] Configure tailwind.config.ts
- [ ] Set up next.config.js with security headers

### Phase 2: Navigation & Layout (20 minutes)
- [ ] Create `components/Navbar.tsx`
- [ ] Create `components/Footer.tsx`
- [ ] Create `app/layout.tsx` (root layout)
- [ ] Add dark mode toggle
- [ ] Add navigation links to all pages

### Phase 3: Pages (30 minutes)
- [ ] Create `app/page.tsx` (home)
- [ ] Create `app/about/page.tsx`
- [ ] Create `app/services/page.tsx` (or /work or /products)
- [ ] Create `app/contact/page.tsx`
- [ ] Create `app/privacy/page.tsx`
- [ ] Create `app/terms/page.tsx`

### Phase 4: Components & Features (40 minutes)
- [ ] Create `components/Hero.tsx` with Three.js background
- [ ] Create `components/Section.tsx` (ScrollTrigger wrapper)
- [ ] Create `components/ContactForm.tsx`
- [ ] Create `components/LoadingScreen.tsx`
- [ ] Create form validation schemas

### Phase 5: API & Security (20 minutes)
- [ ] Create `app/api/contact/route.ts`
- [ ] Add rate limiting
- [ ] Add form validation
- [ ] Add CSRF protection
- [ ] Test form submission

### Phase 6: Polish & Optimization (30 minutes)
- [ ] Add animations to all sections (GSAP ScrollTrigger)
- [ ] Add Framer Motion interactions
- [ ] Optimize images
- [ ] Test on mobile
- [ ] Run Lighthouse audit
- [ ] Fix accessibility issues

### Phase 7: Deployment (10 minutes)
- [ ] Set environment variables
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Configure domain
- [ ] Monitor Core Web Vitals

**Total Time: ~2.5 hours for production-ready site**

---

## 🎨 COPY-PASTE HERO SECTION

```tsx
// app/page.tsx
'use client';
import { ParticleBackground } from '@/components/ParticleBackground';
import { MagneticButton } from '@/components/MagneticButton';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const headlineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 text-center px-4">
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Build The Future,<br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Today
          </span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Award-winning web design meets cutting-edge technology. Launch stunning websites that convert.
        </p>
        
        <MagneticButton>
          Get Started
        </MagneticButton>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
        <div className="animate-bounce">↓</div>
      </div>
    </section>
  );
}
```

---

## 🛠 COPY-PASTE NAVBAR

```tsx
// components/Navbar.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useDarkMode } from '@/lib/hooks/useDarkMode';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            Logo
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition relative group"
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Toggle dark mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-white transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 w-full bg-white transition ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-white transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
```

---

## 📧 COPY-PASTE CONTACT FORM

```tsx
// app/contact/page.tsx
'use client';
import { ContactForm } from '@/components/ContactForm';
import { Section } from '@/components/Section';

export default function ContactPage() {
  return (
    <Section className="min-h-screen pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl lg:text-6xl font-bold mb-8 text-center">
          Get In Touch
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Info</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <a href="mailto:hello@example.com" className="text-white hover:text-blue-400">
                  hello@example.com
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <a href="tel:+1234567890" className="text-white hover:text-blue-400">
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
```

---

## 🎬 ANIMATION SNIPPETS

### Fade-in on Scroll
```jsx
<Section className="fade-in">
  <h2>Animated Heading</h2>
</Section>
```

### Hover Scale
```jsx
<motion.div whileHover={{ scale: 1.05 }}>
  Interactive element
</motion.div>
```

### Staggered Animation
```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

### Parallax Scroll
```jsx
<gsap.to(element, {
  y: -100,
  scrollTrigger: { trigger, scrub: 1 }
});
```

---

## 🔒 SECURITY CHECKLIST

```
✅ Input Validation (Zod)
✅ CSRF Protection
✅ Rate Limiting
✅ XSS Prevention (Sanitization)
✅ HTTPS Enforcement
✅ Security Headers (CSP, X-Frame-Options)
✅ Environment Variables (.env.local)
✅ No Console Logging of Secrets
✅ Form Field Validation (Client + Server)
✅ CAPTCHA (Optional but recommended)
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile first approach */
/* Base styles for xs (320px) */

/* Small phones */
@media (min-width: 375px) { /* sm: */ }

/* Large phones */
@media (min-width: 481px) { /* md: */ }

/* Tablets */
@media (min-width: 768px) { /* lg: */ }

/* Laptops */
@media (min-width: 1024px) { /* xl: */ }

/* Desktops */
@media (min-width: 1280px) { /* 2xl: */ }
```

**Tailwind classes:**
```
text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
px-4 sm:px-6 lg:px-8
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Image Optimization
```jsx
<Image src={src} alt={alt} priority sizes="..." />
```

### Font Loading
```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ preload: true });
```

### Code Splitting
```jsx
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./Heavy'));
```

### Bundle Analysis
```bash
ANALYZE=true npm run build
```

---

## 🧪 TESTING COMMANDS

```bash
# Lighthouse audit
npm run build && npm run start
# Then use Chrome DevTools > Lighthouse

# Check bundle size
npm run analyze

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Security audit
npm audit

# Performance test
npm run build --analyze
```

---

## 🚀 VERCEL DEPLOYMENT

### Step 1: GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/repo.git
git push -u origin main
```

### Step 2: Vercel
```bash
npm i -g vercel
vercel
# Follow prompts
```

### Step 3: Environment Variables
```
In Vercel Dashboard:
Settings > Environment Variables

Add:
- NEXT_PUBLIC_SITE_URL
- Any API keys
```

### Step 4: Domain
```
In Vercel Dashboard:
Settings > Domains
Add custom domain
```

---

## 📊 LIGHTHOUSE TARGETS

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 90+ |
| Best Practices | 90+ |
| SEO | 95+ |

---

## 🎯 COMMON ISSUES & FIXES

### Issue: Animations not working
**Fix:** Make sure `gsap.registerPlugin(ScrollTrigger)` is called

### Issue: Images not loading
**Fix:** Add domain to `images.remotePatterns` in next.config.js

### Issue: Dark mode not persisting
**Fix:** Use localStorage + useEffect in useDarkMode hook

### Issue: Form submissions failing
**Fix:** Check API route, enable CORS if needed

### Issue: Lighthouse score low
**Fix:** Optimize images, lazy load components, remove unused CSS

---

## 📚 ESSENTIAL RESOURCES

| Resource | URL |
|----------|-----|
| Next.js Docs | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com |
| GSAP | https://gsap.com/docs |
| Framer Motion | https://framer.com/motion |
| Three.js | https://threejs.org/docs |
| Web.dev | https://web.dev |

---

## 💾 SAVE THIS QUICK START

```
MASTER_LANDING_PAGE_PROMPT.md  ← Universal prompt for AI
ADVANCED_CODE_PATTERNS.md      ← Copy-paste code examples
QUICK_REFERENCE_CHEATSHEET.md  ← This file (bookmarks, quick commands)
```

**Use these three files as your personal web development toolkit.**

---

**Status: Ready to Build. Let's go. 🚀**

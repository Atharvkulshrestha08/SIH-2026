# 🚀 MASTER LANDING PAGE GENERATOR PROMPT
## Universal Next-Gen Website Build Template (2024-2026+)
**Works with: Claude, ChatGPT, Grok, Codeium, Gemini, or ANY AI coding assistant**

---

## ⚡ QUICK START
Copy everything below this line. Replace `[VARIABLES]` with your project details. Paste into your AI chatbot. Hit send.

---

## 🎯 PROJECT SPECIFICATION

### BRAND IDENTITY
- **Project/Brand Name**: [YOUR_BRAND_NAME]
- **Industry**: [e.g., SaaS, E-commerce, Agency, Portfolio, B2B Platform]
- **Primary Color**: [HEX or Color Name]
- **Secondary Color**: [HEX or Color Name]
- **Accent Color**: [HEX or Color Name]
- **Brand Vibe**: [e.g., Dark Futuristic, Minimal Luxury, Bold Energetic, Soft Editorial, Playful, Corporate Professional]
- **Target Audience**: [Who are the primary visitors?]
- **Primary CTA**: [Main action you want users to take]
- **Company/Product Tagline**: [One sentence brand promise]

### DELIVERABLES
You must build a **COMPLETE, PRODUCTION-READY multi-page website** using:
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v3.4+
- **Package Manager**: npm
- **Deployment Ready**: Vercel-optimized

---

## 📄 REQUIRED PAGES (Build ALL)

1. **/ (Home Page)**
   - Hero section with animated background
   - 3-4 core value propositions
   - Social proof / testimonials section
   - CTA section
   - FAQ section
   - Footer

2. **/about**
   - Company/creator story (2-3 paragraphs)
   - Team section (3-5 team members with images)
   - Core values/mission statement
   - Timeline or milestones
   - Trust badges/credentials

3. **/services or /products or /work**
   - Grid/list showcase (4-8 items)
   - Detailed cards with descriptions
   - Interactive filtering (optional)
   - Links to individual detail pages
   - Call-to-action per item

4. **/[single-service]** (e.g., /services/branding)
   - Full page for one service/product
   - Detailed description
   - Features/benefits breakdown
   - Case study or example
   - Related services

5. **/contact**
   - Contact form (Name, Email, Phone, Message, Subject)
   - Form validation + error handling
   - Success confirmation message
   - Contact info (address, email, phone)
   - Embedded map (optional: Google Maps or Mapbox)
   - Social media links

6. **/blog** (OPTIONAL but recommended)
   - Blog post listing with pagination
   - Search/filter by category
   - Post cards with excerpt + read time
   - Author info

7. **/blog/[slug]**
   - Full blog post with MDX or Markdown support
   - Table of contents (auto-generated)
   - Related posts sidebar
   - Author bio
   - Social share buttons

8. **Legal Pages** (Required but simple)
   - /privacy
   - /terms
   - /cookies

---

## 🎨 DESIGN REQUIREMENTS (MANDATORY)

### HERO SECTION
- **Minimum height**: 100vh
- **Background**: Three.js animated canvas OR Spline 3D scene
- **Typography**: 
  - Headline: 3xl-8xl (responsive)
  - Split-text GSAP animation on load
  - Subheading: lg-2xl
- **CTA Button**: Framer Motion hover + tap animations
- **Scroll Indicator**: Animated arrow at bottom (scroll hint)
- **Video Support** (optional): Muted background video with Three.js fallback

### SCROLL EXPERIENCE (GSAP ScrollTrigger Required)
- **Every section** must have scroll-triggered animation
- **Animation types**:
  - Fade-in on scroll
  - Slide-up with stagger
  - Parallax depth effect (background moves slower)
  - Scale transitions
  - Reveal animations
- **Horizontal scroll section**: Portfolio/showcase using GSAP pinning
- **Smooth scroll**: Lenis integration for buttery-smooth behavior
- **Reduced motion**: Auto-detect `prefers-reduced-motion` media query

### TYPOGRAPHY HIERARCHY
- **Display Font** (Google Fonts): Bold, editorial choice (e.g., Space Grotesk, Sora, Instrument Sans)
- **Body Font** (Google Fonts): Clean, readable (e.g., Inter, Outfit, JetBrains Mono for code)
- **Sizes**:
  - H1: `clamp(2rem, 5vw, 4rem)`
  - H2: `clamp(1.5rem, 4vw, 3rem)`
  - Body: 16px minimum on all devices
  - Line-height: 1.2 for headings, 1.6 for body

### NAVIGATION
- **Desktop (lg+)**: Sticky horizontal navbar with blur/frosted glass effect
- **Mobile (sm)**: Hamburger menu with full-screen overlay
- **Features**:
  - Active link indicator (underline, highlight, or dot)
  - Smooth scroll anchor links
  - Logo clickable to home
  - Search icon (optional)
  - Dark mode toggle

### MICRO-INTERACTIONS (Framer Motion / Anime.js)
- **Buttons**:
  - Magnetic cursor effect (button follows mouse hover)
  - Ripple/wave effect on click
  - Scale + glow on hover
- **Cards**:
  - Lift effect (translateY -10px) on hover
  - Tilt 3D effect (using react-use-gesture + Framer Motion)
  - Border glow reveal
  - Image reveal animation
- **Custom Cursor**:
  - Custom dot + ring cursor (replace default)
  - Ring grows on hover of interactive elements
  - Trail effect (optional)
- **Loading Screen**:
  - Animated logo + progress bar on initial load
  - Anime.js number counter (0-100%)
  - Fade out after 2-3 seconds

### FOOTER
- **Full-width**, dark background (or brand color)
- **Grid layout** (4-5 columns on desktop, stacked on mobile):
  - Logo + tagline
  - Quick links (Home, About, Services, Contact, Blog)
  - Social media icons (LinkedIn, Twitter, Instagram, GitHub)
  - Newsletter signup form
  - Contact info
- **Bottom bar**: Copyright + Made with ❤️

---

## 🛠 ADVANCED TECH STACK (USE ALL)

### Animations & Interactions
```json
{
  "gsap": "^3.12.0",
  "gsap-scrolltrigger": "^3.12.0",
  "framer-motion": "^10.16.0",
  "anime": "^3.2.1",
  "lenis": "^1.0.0"
}
```
- **GSAP + ScrollTrigger**: Scroll-based reveals, pinning, parallax, timeline sequences
- **Framer Motion**: Page transitions, button interactions, hover states
- **Anime.js**: SVG path animations, number counters, stagger effects
- **Lenis**: Smooth scroll hijacking (non-intrusive)

### 3D & Immersive
```json
{
  "three": "^r128",
  "three-fiber": "^8.14.0",
  "drei": "^9.90.0",
  "@react-three/postprocessing": "^2.15.0"
}
```
- **Three.js + React-Three-Fiber**: Hero canvas background (particles, mesh geometries, lighting)
- **Drei**: Pre-built 3D components (environment, lights, text)
- **Post-processing**: Bloom, motion blur, color grading

### 3D Scene Editor (Alternative to code)
- **Spline**: Embed a pre-built 3D scene in hero (if preferred over Three.js)
- Integration: `@splinetool/react-spline`

### Form & Validation
```json
{
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0"
}
```
- Client-side validation
- Error messages + success states
- Email integration (SendGrid, Resend, or Mailgun backend)

### SEO & Metadata
- Next.js Metadata API (not deprecated getHead)
- Sitemap generation
- Robots.txt
- Open Graph tags (og:image, og:title, og:description)
- JSON-LD schema (Organization, LocalBusiness, Product, etc.)

### Performance
```json
{
  "next-image-export-optimizer": "^2.3.0",
  "@next/bundle-analyzer": "^14.0.0"
}
```
- Next.js `<Image>` component with lazy loading
- Font optimization via `next/font`
- CSS-in-JS reduction (Tailwind only)
- Code splitting per route
- Preload critical resources

### Accessibility
- ARIA labels on all interactive elements
- Semantic HTML (nav, main, section, article, footer)
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators (ring-2 ring-offset-2 on buttons)
- Color contrast ≥ 4.5:1
- Alt text on all images
- Screen reader testing

### Dark Mode
- Tailwind `dark:` utilities throughout
- System preference detection (`prefers-color-scheme`)
- Toggle button in navbar
- Smooth transition on toggle
- Persistence in localStorage

---

## 🔒 SECURITY CHECKLIST (BUILT-IN)

### Frontend Security
- [ ] **CSP Headers**: Content-Security-Policy in `next.config.js`
- [ ] **XSS Protection**: Sanitize user input (DOMPurify on form data)
- [ ] **CSRF Tokens**: Form submissions include CSRF protection
- [ ] **Rate Limiting**: Frontend rate limit on form submissions (max 1 per 3 seconds)
- [ ] **Input Validation**: Zod schema validation (client + server)
- [ ] **No Secrets in Code**: Environment variables for API keys (`.env.local`)
- [ ] **HTTPS Enforcement**: Redirect HTTP → HTTPS

### Backend Security (Contact Form Handler)
- [ ] **Server-side validation**: Re-validate all form inputs on backend
- [ ] **Rate Limiting**: Backend rate limit (e.g., 5 submissions per IP per hour)
- [ ] **Email Verification**: Send confirmation email on form submission
- [ ] **Honeypot Field**: Invisible field to catch bot submissions
- [ ] **CAPTCHA** (optional): Integrate Google reCAPTCHA v3 or hCaptcha
- [ ] **Secure Headers**: Set security headers in Next.js middleware
  ```
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  ```

### Data Protection
- [ ] **No PII in URLs**: Contact form data sent via POST, not GET
- [ ] **Secure Database**: If storing submissions, use encrypted fields
- [ ] **Privacy Policy**: Clear data usage policy linked in footer
- [ ] **GDPR Compliance**: 
  - Explicit consent checkbox for data collection
  - Data export option
  - Account deletion option (if applicable)
- [ ] **Cookie Compliance**: Disclose cookies in banner
- [ ] **SSL Certificate**: HTTPS on production (auto via Vercel)

### Dependencies Security
- [ ] **npm audit**: Run `npm audit` regularly
- [ ] **Dependabot**: Enable on GitHub (auto PRs for vulnerabilities)
- [ ] **No eval()**: Never use eval() or Function() constructor
- [ ] **Third-party Scripts**: Load external scripts (Google Analytics, etc.) with async/defer
- [ ] **SVG Sanitization**: If accepting user SVGs, sanitize with library

---

## 📱 RESPONSIVE DESIGN (MOBILE-FIRST MANDATORY)

### Breakpoint System
| Breakpoint | Width | Tailwind | Devices |
|-----------|-------|----------|---------|
| xs | 320-374px | (default) | Small phones |
| sm | 375-480px | sm: | Regular phones |
| md | 481-767px | md: | Large phones |
| lg | 768-1023px | lg: | Tablets |
| xl | 1024-1279px | xl: | Large tablets |
| 2xl | 1280-1535px | 2xl: | Laptops |
| 3xl | 1536-1919px | 3xl: | Desktops |
| 4xl | 1920px+ | 4xl: | Ultra-wide |

### Mobile-First Rules
1. **Design mobile first**, then enhance for larger screens
2. **Tap targets**: Minimum 44×44px (44px is standard for accessibility)
3. **Spacing**: `px-4 sm:px-6 lg:px-8 xl:px-12` (fluid padding)
4. **Typography**:
   ```
   Hero: text-3xl sm:text-5xl lg:text-7xl xl:text-8xl
   Body: text-base lg:text-lg (never <16px)
   ```
5. **Grid layouts**:
   ```
   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
   ```
6. **Images**: `width: 100%; height: auto;` or `aspect-ratio: 16/9`
7. **No horizontal scroll**: Content must fit viewport
8. **Touch spacing**: Minimum 8px between tappable items
9. **Safe areas**: Account for iPhone notch/Dynamic Island
   ```
   padding-top: max(env(safe-area-inset-top), 1rem)
   ```

---

## 🎬 ANIMATION PATTERNS (Code Examples)

### GSAP ScrollTrigger Fade-In
```javascript
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.fade-section', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.fade-section',
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
      markers: false,
    },
  });
}, []);
```

### Framer Motion Button Hover
```jsx
<motion.button
  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click Me
</motion.button>
```

### Anime.js Number Counter
```javascript
anime({
  targets: { value: 0 },
  value: 1000,
  round: 1,
  duration: 2000,
  update(anim) {
    document.querySelector('.counter').textContent = Math.round(anim.progress * 1000);
  },
});
```

### Three.js Particle Background
```jsx
<Canvas>
  <ParticleField count={500} />
  <OrbitControls autoRotate />
</Canvas>
```

---

## 📊 PERFORMANCE CHECKLIST

- [ ] **Lighthouse Score**: Aim for 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- [ ] **Bundle Size**: < 300KB (gzipped) for initial load
- [ ] **Images**: Optimized (WebP format, proper dimensions)
- [ ] **Caching**: HTTP caching headers set correctly
- [ ] **CDN**: Assets served via CDN (Vercel + Cloudflare)
- [ ] **Preloading**: Critical fonts, images preloaded
- [ ] **Minification**: CSS, JS minified in production
- [ ] **No JavaScript blocking render**: Defer non-critical JS

---

## 🧪 TESTING CHECKLIST

### Functional Testing
- [ ] All links work (internal + external)
- [ ] Forms submit and validate correctly
- [ ] Redirects work (404 → home, etc.)
- [ ] All pages load without errors (no console errors)
- [ ] Dark mode toggle works
- [ ] Animations play smoothly (no stuttering)

### Responsive Testing
- [ ] Tested on 320px (iPhone SE)
- [ ] Tested on 375px (iPhone 14)
- [ ] Tested on 768px (iPad)
- [ ] Tested on 1024px (iPad Pro)
- [ ] Tested on 1920px (Desktop)
- [ ] No horizontal overflow at any size
- [ ] Text readable without zooming

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (desktop + iOS)
- [ ] Mobile browsers (Chrome Android, Safari iOS)

### Performance Testing
- [ ] Run Lighthouse audit (DevTools)
- [ ] Check Core Web Vitals (PageSpeed Insights)
- [ ] Test on slow 4G (Chrome DevTools throttling)
- [ ] Measure Time to Interactive (TTI)

### Accessibility Testing
- [ ] Keyboard navigation (Tab through all elements)
- [ ] Screen reader testing (NVDA or JAWS)
- [ ] Color contrast check (WebAIM Contrast Checker)
- [ ] Focus indicators visible
- [ ] All images have alt text

---

## 📂 PROJECT STRUCTURE

```
project-name/
├── app/
│   ├── layout.tsx           # Root layout + Navbar + Footer
│   ├── page.tsx             # Home page
│   ├── /about/page.tsx
│   ├── /services/page.tsx
│   ├── /services/[slug]/page.tsx  # Dynamic service detail
│   ├── /contact/page.tsx
│   ├── /blog/page.tsx
│   ├── /blog/[slug]/page.tsx
│   ├── /privacy/page.tsx
│   ├── /terms/page.tsx
│   ├── /not-found.tsx       # 404 page
│   ├── api/
│   │   └── contact/route.ts # Form submission endpoint
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ValuePropositions.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── ContactForm.tsx
│   ├── CustomCursor.tsx
│   ├── LoadingScreen.tsx
│   ├── ParticleBackground.tsx
│   └── Section.tsx          # Reusable ScrollTrigger wrapper
├── lib/
│   ├── animations.ts        # GSAP helpers
│   ├── constants.ts
│   ├── utils.ts
│   └── schema.ts            # Zod validation schemas
├── public/
│   ├── images/
│   ├── videos/
│   └── fonts/
├── styles/
│   └── (tailwind config handles most)
├── .env.local               # SENSITIVE: API keys
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── next.config.mjs          # For Vercel deployment
└── README.md
```

---

## 🚀 DEPLOYMENT

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploys on push
4. Free HTTPS + CDN

### Environment Variables (.env.local)
```
NEXT_PUBLIC_SITE_URL=https://yoursite.com
SENDGRID_API_KEY=your_key_here
RECAPTCHA_SECRET_KEY=your_key_here
MAPBOX_TOKEN=your_token_here
```

### Pre-deployment Checklist
- [ ] All links tested
- [ ] Metadata filled (title, description, OG tags)
- [ ] Analytics integrated (Google Analytics / Plausible)
- [ ] Contact form working (email sending)
- [ ] Dark mode tested
- [ ] Lighthouse score 90+
- [ ] SSL certificate valid
- [ ] Robots.txt + sitemap generated
- [ ] 404 page designed
- [ ] Favicon set

---

## 🎯 LATEST DESIGN TRENDS (2024-2026)

### Included Trends
1. **Generative Backgrounds**: Animated particles + gradients (Three.js)
2. **Glassmorphism**: Frosted glass navbar + cards
3. **Microinteractions**: Magnetic buttons, ripple effects
4. **Variable Typography**: Responsive text scaling with `clamp()`
5. **Asymmetric Layouts**: Offset grids, unconventional card arrangements
6. **Bold Color Blocking**: Large solid color areas with white space
7. **3D Integration**: Three.js + Spline for immersive hero
8. **AI-Generated Imagery**: Use Unsplash, Pexels (or integrate DALL-E API)
9. **Neomorphism Touches**: Soft shadows + embossed buttons
10. **Scroll-Triggered Reveals**: Every element animates on scroll
11. **Bento Grid Layouts**: Varied-size grid items (CSS subgrid)
12. **Sonic Branding** (optional): Subtle sound on hover/interaction
13. **Variable Fonts**: Google Fonts with weight/width axes
14. **Neumorphism Mixed with Dark**: Soft UI on dark backgrounds
15. **SVG Animations**: Anime.js on SVG paths (icons, illustrations)

---

## 💡 CONTENT GUIDELINES

- **Hero Headline**: Action-oriented, benefit-focused (max 10 words)
- **Subheading**: Clarifies hero headline (max 20 words)
- **Body Copy**: Short paragraphs (2-3 lines max), scannable
- **CTAs**: Action words (Explore, Discover, Get Started, Learn More)
- **Testimonials**: Real quotes (3-5 testimonials), include photo + title
- **FAQ**: 5-8 common questions, concise answers
- **Blog Posts**: 1000-2000 words, include images + code blocks

---

## ✅ FINAL INSTRUCTIONS TO AI ASSISTANT

You are building a production-ready website that looks like it costs $10,000+. Follow these rules:

1. **NO Lorem Ipsum**: Use real, on-brand content
2. **Every animation intentional**: No spinning icons unless meaningful
3. **Mobile-first always**: Test at 320px width
4. **Performance matters**: Ship fast (Lighthouse 90+)
5. **Accessibility required**: WCAG 2.1 AA minimum
6. **Security built-in**: Implement all security checklist items
7. **Complete codebase**: Include ALL files (package.json, config, etc.)
8. **Production ready**: Can deploy to Vercel immediately
9. **No hardcoded images**: Use Next.js Image + placeholder URLs
10. **Full TypeScript**: Strict mode enabled
11. **Responsive at every breakpoint**: Not just desktop
12. **Beautiful on mobile**: Mobile design should be polished
13. **Dark mode included**: Complete dark mode implementation
14. **Animations smooth**: 60fps on average devices
15. **Modern stack**: Latest versions (Next.js 14+, React 18+, Tailwind 3.4+)

---

## 📝 WHAT TO INCLUDE IN OUTPUT

Provide:
1. **Complete file structure** with ALL files listed
2. **package.json** with exact versions + all dependencies
3. **tailwind.config.ts** with custom theme (colors, fonts)
4. **next.config.js** with all optimizations
5. **Each page** (home, about, services, contact, blog)
6. **Reusable components** (Navbar, Footer, sections)
7. **Animation library** (animations.ts with GSAP helpers)
8. **API route** for contact form submission
9. **Utility functions** (hooks, helpers)
10. **Environment variables** (.env.example)
11. **SEO/Metadata** setup
12. **Dark mode** CSS variables
13. **README.md** with setup + deployment instructions

---

## 🎁 BONUS: Custom Additions
- [ ] Add blog with MDX support
- [ ] Add newsletter signup
- [ ] Add live chat widget
- [ ] Add analytics tracking (Plausible)
- [ ] Add sitemap + robots.txt generation
- [ ] Add PWA support (offline mode)
- [ ] Add sitemap.xml auto-generation
- [ ] Add canonical URLs

---

## 🔗 IMPORTANT LINKS FOR AI ASSISTANT
- Next.js 14 Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- GSAP Documentation: https://gsap.com/docs/
- Framer Motion: https://www.framer.com/motion/
- Three.js: https://threejs.org/docs/
- Spline Docs: https://docs.spline.design/
- React-Three-Fiber: https://docs.pmnd.rs/react-three-fiber/

---

## 🎬 NOW BUILD IT

Take this entire specification. Build a COMPLETE, PRODUCTION-READY website that:
- ✅ Works on every device (320px to 4K)
- ✅ Looks like award-winning design (not generic AI output)
- ✅ Ships fast (Lighthouse 90+)
- ✅ Secure by default
- ✅ Accessible (WCAG AA)
- ✅ Uses latest tech + trends
- ✅ Can deploy immediately to Vercel

**Status**: Ready to build. All specs locked. No excuses. Ship it.

---

## 📞 QUICK REFERENCE COMMANDS

```bash
# Create project
npx create-next-app@latest project-name --typescript --tailwind

# Install animation libraries
npm install gsap framer-motion anime lenis three @react-three/fiber @react-three/drei

# Install utilities
npm install react-hook-form zod next-image-export-optimizer

# Run locally
npm run dev

# Build for production
npm run build

# Audit security
npm audit

# Check performance
npm run lint
```

---

**Generated**: 2024-2026 Master Prompt
**Last Updated**: September 2024
**Version**: 2.0 (Production Grade)
**Status**: ✅ Ready to Deploy

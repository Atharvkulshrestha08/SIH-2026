# 🎬 3D ANIMATION SEQUENCE PROMPT
## Landing Page: Laptop Drop → GPU Reveal → AI Processing
**For: Spline, Three.js, Blender, or Professional 3D Animation Platforms**

---

## 🎯 PROJECT OVERVIEW

**Product Type**: AI/GPU Computing Technology Landing Page  
**Animation Sequence**: Interactive 3D journey from product reveal to technology showcase  
**Platform**: Next.js + React + Spline/Three.js  
**Duration**: 8-12 seconds per sequence (repeatable, scroll-triggered)  
**Target Audience**: Tech-savvy professionals, investors, developers  
**Tone**: Clean, modern, professional, with subtle sophistication  

---

## 📋 ANIMATION SEQUENCE BREAKDOWN

### PHASE 1: BLACK HEADER SECTION (0-2 seconds - Static on Page Load)

**Duration**: User lands on page, stays on hero until scroll  
**Background**: Pure black (#000000)  
**Viewport**: Full screen (100vh × 100vw)  
**Content**:
- Brand name/logo (left or center, 40-60px height)
- Single-line tagline (max 10 words, 24-32px font)
- Subheading (max 20 words, 14-18px, muted gray)
- Optional: Brand icon/mark (right side or center-right, 200-300px)

**Animation State**: STATIC
- No movement
- Subtle fade-in of text (0.3 seconds, on page load)
- Logo appears 0.1 seconds after text
- Smooth transition ready for scroll

**Exit Trigger**: User scrolls down 15% of viewport height

---

### PHASE 2: LAPTOP DROP-IN (Scroll begins → ~4 seconds)

**Trigger**: When user scrolls into the next section (White background area)

**Background**: Transition from black → white (#FFFFFF)  
**Viewport**: Full screen, centered

**3D Elements**:
1. **Laptop Model**
   - Camera angle: 45-degree isometric view (can be adjusted)
   - Starting position: Above viewport (Y +500 to +800px, depending on screen)
   - Starting state: Laptop is CLOSED
   - Material: 
     - Aluminum body (metallic silver/gray)
     - Screen/glass (reflective, dark)
     - Subtle shadow underneath
   - Size: Medium prominence (800-1200px width on desktop, responsive)

**Animation - Laptop Drop**:
- **Entry**: Laptop falls from top with physics-based motion
- **Duration**: 2-3 seconds
- **Path**: Straight vertical drop (Y-axis only)
- **Easing**: ease-out-bounce or ease-out-cubic (natural fall, slight bounce on landing)
- **Final Position**: Center of screen, 60% down from top
- **Sound Effect** (Optional): Soft "thud" on landing (~500ms after landing)
- **Landing State**: Laptop rests at center, closed position, slight rotation (5-10 degrees)

**Physics Parameters**:
- Gravity simulation: Enabled
- Bounce amount: 0.2-0.3 (subtle)
- Friction: 0.8 (reduces bounce quickly)
- Impact force: Visible but not jarring

**Lighting**:
- Soft key light from upper-left (45 degrees)
- Fill light from lower-right (subtle, 40% intensity)
- Ambient light: Neutral white (#E8E8E8)
- Shadow under laptop: Soft drop shadow, blur 20-30px, opacity 0.3

---

### PHASE 3: PARALLAX SCROLL-SCRUBBING - LAPTOP OPENING (4-8 seconds)

**Trigger**: User scrolls 20-40% through the white section  
**Viewport**: Full screen, maintain centered position

**3D Animation - Laptop Opens**:
- **Duration**: 3-4 seconds (scroll-driven, not time-driven)
- **Start**: Laptop fully closed, resting
- **End**: Laptop fully open, screen at 90 degrees

**Opening Sequence**:
1. **Lid Opening** (First 30% of scroll):
   - Hinge point: Back edge of laptop (Y-axis rotation)
   - Rotation angle: 0° → 90° (closed → fully open)
   - Easing: ease-in-out (smooth acceleration and deceleration)
   - Screen panel follows lid motion
   - Keyboard deck stays stationary
   - Lighting updates: Screen begins to emit subtle glow (blue tint, 20% intensity)

2. **Screen Activation** (During lid opening):
   - Screen content gradually brightens
   - Display shows: Subtle animated grid pattern or code visualization
   - Color: Dark background with blue accent highlights
   - Opacity progression: 0% → 40% as lid opens

**Parallax Effect**:
- Parallax depth: Background stays stationary, laptop moves slightly forward
- Camera parallax: Subtle camera rotation (2-3 degrees) following scroll
- Creates perception of depth and immersion

---

### PHASE 4: LAPTOP DISASSEMBLY - COMPONENT SEPARATION (8-12 seconds)

**Trigger**: Laptop fully open + user scrolls additional 20-30%  
**Viewport**: Full screen, maintained center

**3D Animation - Laptop Breaks Apart**:

**Components to Separate**:
1. **Screen/Display Panel** (Top)
2. **Keyboard Deck** (Bottom)
3. **GPU Module** (Highlighted, center-front)
4. **CPU Module** (Visible)
5. **RAM Sticks** (2-3 visible)
6. **Motherboard** (Base)
7. **Power Supply** (Side)
8. **Cooling System** (Visible around GPU)

**Separation Sequence** (Timed over 4-5 seconds):

1. **Screen Lifts** (0-1 second):
   - Moves upward (Y +300px)
   - Rotates slightly outward (5-10 degrees)
   - Opacity: 100% → 80%
   - Position: Top-center

2. **Keyboard Slides Forward** (0.5-1.5 seconds):
   - Moves forward (Z +200px) and down (Y -150px)
   - Opacity: 100% → 75%
   - Position: Bottom-left

3. **Side Panels Expand Outward** (1-2 seconds):
   - Left panel: Moves left (X -250px)
   - Right panel: Moves right (X +250px)
   - Both rotate outward (10-15 degrees)
   - Opacity: 80% → 60%

4. **GPU Module Rises & Glows** (1.5-2.5 seconds) ⭐ CRITICAL:
   - GPU rises upward (Y +200px)
   - Moves slightly forward (Z +100px)
   - GLOWS with blue light:
     - Glow color: #0066FF or #00A8FF
     - Glow intensity: Starts at 0.3, increases to 1.0
     - Glow radius: 40-60px
     - Bloom effect: Enabled (post-processing)
   - All other components fade slightly in background (opacity 0.5-0.7)
   - **GPU becomes the focus point**

5. **GPU Detail Reveal** (2-3 seconds):
   - GPU surface details become visible (no extreme closeup)
   - Surface textures: Metallic, circuit patterns, heat pipes
   - GPU chip core glows blue at center
   - Heat sink fins visible and detailed
   - Particles: Optional - subtle blue particles orbit GPU (5-10 particles, slow rotation)

**Component Positioning (Final State)**:
```
                    [Screen]
                       ↑
    [Left Panel] ← [GPU + GLOW] → [Right Panel]
                       ↓
    [Keyboard] [MB] [RAM] [PSU]
```

**Easing Across Sequence**: Staggered ease-out-cubic
- Each component has slight delay (0.1-0.2 seconds apart)
- Smooth, choreographed movement (not all at once)

**Lighting During Disassembly**:
- Key light: Shift to upper-center (highlighting GPU)
- GPU light source: Blue point light (600px radius, 1.5 intensity)
- Ambient shadow: Increases slightly (adds drama)
- Other components: Slight shadow, cooler tone

---

### PHASE 5: GPU PROCESSING ANIMATION (12-18 seconds)

**Trigger**: GPU fully revealed and centered + user continues scrolling  
**Viewport**: Full screen, GPU centered

**3D Animation - GPU Processing**:

**Visual State - GPU Core**:
- GPU sits center-screen, fully visible
- Blue glow: Maintains 0.8-1.0 intensity
- Size: 600-900px (responsive)
- All other components faded to 20% opacity (or hidden)

**Animation Sequence** (Looped, scroll-triggered):

1. **Input Visualization** (First 2 seconds):
   - **Question text appears** (floating above GPU):
     - Text: "What can you process?"
     - Color: Dark gray/black
     - Font: 18-24px, clean sans-serif
     - Animation: Fade in + slight bounce (0.5 seconds)
   - **Data particles flow into GPU**:
     - 20-30 small spheres (2-4px radius) appear around GPU
     - Color: Blue (#0066FF) to match GPU glow
     - Flow direction: Circular path converging toward GPU center
     - Speed: Moderate (1.5 second loop)
     - Opacity: 0.7
     - Trail effect: Enabled (optional, subtle blue trails)

2. **GPU Processing - Core Activation** (2-4 seconds):
   - **Core light pulses**:
     - GPU core brightness: 0.5 → 1.0 → 0.8 (pulse)
     - Pulse speed: 0.3 seconds per pulse
     - Number of pulses: 3-4 during processing
   - **Heat visualization** (optional):
     - Subtle red/orange glow at base of GPU (10% of blue glow intensity)
     - Represents heat generation
     - Intensity: Increases with pulses
   - **Circuit activation** (visual feedback):
     - Subtle line animations on GPU surface
     - Lines: Thin, blue, flowing from edges to center
     - Duration: Synchronized with pulses
     - Opacity: 0.4-0.6

3. **Output Visualization** (4-6 seconds):
   - **Answer text appears** (floating below GPU):
     - Text: "Billions of computations per second"
     - Color: Same as GPU glow (#0066FF)
     - Font: 18-24px, clean sans-serif
     - Animation: Fade in + character-by-character reveal (0.5-1 second)
   - **Result particles flow outward**:
     - Similar to input particles, but flowing AWAY from GPU
     - Path: Radial outward, dispersing in all directions
     - Color: Blue with slight white highlight
     - Speed: Faster than input (2x speed)
     - Opacity: 0.7 → 0.2 (fade as they disperse)
     - Effect: Represents output/results flowing outward

4. **Completion & Reset** (6-8 seconds):
   - Text fades out
   - Particles settle
   - GPU glow returns to steady 0.8 intensity
   - Ready to loop or transition

**Processing Loop Timing**:
- Total cycle: 8 seconds
- Can repeat 2-3 times during scroll
- Or single cycle with scroll-driven scrubbing

**Sound Design** (Optional but Recommended):
- Subtle electronic hum starts when GPU is revealed (0.3-0.5 second fade in)
- Pitch: Low-medium, 60-80Hz fundamental
- Volume: Very subtle, -20dB
- Hum intensity increases with processing pulses
- Ends when processing completes
- Creates immersive, professional tone

---

### PHASE 6: TRANSITION TO NEXT SECTION (18-20 seconds)

**Trigger**: GPU processing complete + user scrolls to next section  
**Viewport**: Transition to white/light background

**Animation - Scene Fade**:
- GPU and remaining components: Fade out (1-2 seconds)
- Blue glow: Gradually dims
- Next section content: Fades in simultaneously
- Smooth transition, no jarring cuts

**Final State**: Clean, white background ready for next content

---

## 🎨 VISUAL SPECIFICATIONS

### Color Palette
| Element | Color | Hex | Purpose |
|---------|-------|-----|---------|
| GPU Glow | Bright Blue | #0066FF or #00A8FF | Focus, tech feel |
| GPU Core Light | Electric Blue | #00E5FF | Energy, processing |
| GPU Body | Metallic Silver | #C0C0C0 | Professional, premium |
| Heat/Ambient | Warm Orange | #FF6B00 (subtle, 10%) | Temperature indication |
| Background (Hero) | Pure Black | #000000 | Clean, minimalist |
| Background (Scroll) | Pure White | #FFFFFF | Contrast, clarity |
| Text | Dark Gray/Black | #1A1A1A | Readability |
| Accent Text | Blue | #0066FF | Brand consistency |
| Particles | Blue | #0066FF | Cohesion |

### Typography (for Overlays)
- Font: Inter, Sora, or Space Grotesk
- Hero tagline: 28-32px, bold, black
- Processing text: 18-24px, regular, dark/blue
- Subtext: 14-16px, light, gray

### Camera Settings
- Field of View (FOV): 50-60 degrees (standard)
- Camera Position (Final): Center, ~1500px away (adjustable for size)
- Angle: 45-degree isometric (X: 30°, Y: 45°, Z: varies)
- No camera rotation except parallax (subtle, 2-3°)
- Aspect ratio: Responsive (maintains 16:9 on desktop)

### Lighting Setup
**Key Light**:
- Position: Upper-left, 45° angle
- Color: White (#FFFFFF)
- Intensity: 1.2
- Shadow: Enabled, soft (30-40px blur)

**Fill Light**:
- Position: Lower-right, 30° angle
- Color: Neutral white
- Intensity: 0.4
- Purpose: Prevent harsh shadows

**Blue Light Source** (GPU phase):
- Position: Above/center of GPU
- Color: #0066FF
- Intensity: 1.0-2.0 (variable during processing)
- Range: 600-800px radius
- Bloom: Enabled (post-processing effect)

**Ambient Light**:
- Color: White
- Intensity: 0.5-0.6
- Purpose: Overall scene illumination

---

## 🔧 TECHNICAL SPECIFICATIONS

### Platform: Spline (Recommended)

**Project Settings**:
- Canvas size: Responsive (min 768px width)
- Background: Black (Phase 1) → White (Phase 2+)
- Export format: Embed in Next.js component
- Performance: GPU-accelerated rendering

**Asset Requirements**:
1. **3D Models** (Spline-ready or import):
   - Laptop model (CAD or 3D scanned)
   - GPU model (detailed, realistic)
   - Optional: Internal components (RAM, motherboard, heat sink)

2. **Materials**:
   - Metallic aluminum (roughness 0.3, metalness 0.9)
   - Glass/screen (transparent, reflective)
   - Circuit board green (optional, for motherboard)
   - Plastic (for bezels and frame)

3. **Textures**:
   - GPU: Realistic circuit pattern, metallic surface
   - Laptop: Brushed aluminum texture
   - Optional: Normal maps for depth

4. **Effects**:
   - Bloom/Glow (post-processing)
   - Motion blur (optional, subtle)
   - Shadows (real-time)

### Animation Engine

**Primary**: Spline's built-in timeline + scroll trigger  
**Secondary**: GSAP ScrollTrigger (if more control needed)  
**Fallback**: Three.js with React-Three-Fiber  

**Scroll Trigger Settings** (GSAP):
```javascript
ScrollTrigger.create({
  trigger: '.animation-container',
  start: 'top center',
  end: 'bottom center',
  scrub: 1.2, // 1.2 second lag for smooth feel
  markers: false, // Remove in production
  onUpdate: (self) => {
    // Drive Spline animations based on scroll progress
    updateLaptopPosition(self.getVelocity());
    updateGPUGlow(self.progress);
  }
});
```

### Responsive Behavior

**Desktop (1280px+)**:
- Laptop width: 1000px
- GPU size: 800px
- GPU glow radius: 80px
- Camera FOV: 50°

**Tablet (768px-1279px)**:
- Laptop width: 700px
- GPU size: 550px
- GPU glow radius: 60px
- Camera FOV: 55°

**Mobile (320px-767px)**:
- Laptop width: 500px
- GPU size: 350px
- GPU glow radius: 40px
- Camera FOV: 60°
- Note: Simplify animation on mobile (reduce particles, disable some effects)

### Performance Optimization

**Critical** (for smooth 60fps):
- LOD (Level of Detail): Reduce polygon count on mobile
- Disable bloom on mobile devices
- Limit particles to 10-15 on mobile
- Use GPU instancing for particles
- Lazy load Spline scene (load when section scrolls into view)

**Optional**:
- Motion blur: Disable on low-end devices
- High-quality textures: Conditional loading
- Multiple instances: Use single instance with transforms

---

## 🎬 ANIMATION TIMING SUMMARY

| Phase | Duration | Trigger | Action |
|-------|----------|---------|--------|
| Header | 2-3s | Page load | Text fade-in, static |
| Laptop Drop | 2-3s | Scroll down 15% | Free fall animation |
| Laptop Opens | 3-4s | Scroll 20-40% | Lid rotates 0→90° |
| Components Separate | 4-5s | Scroll 40-60% | Staggered dispersion |
| GPU Reveals | 2s | Scroll 50-60% | GPU rises, glow intensifies |
| Processing Loop | 8s | Scroll 60-80% | Particles, pulses, text |
| Transition | 2s | Scroll 80%+ | Fade to next section |
| **Total** | **~25-30s** | **Full sequence** | **Complete journey** |

---

## 📱 RESPONSIVENESS NOTES

**Desktop Priority**: Full effects, high quality  
**Tablet**: Good quality, some optimizations  
**Mobile**: Simplified animations, core sequence preserved  

**Critical Must-Have Features (All Devices)**:
- ✅ Laptop drop effect
- ✅ Laptop opening
- ✅ GPU reveal with glow
- ✅ Processing visualization

**Nice-to-Have Features (Desktop/Tablet)**:
- ✅ Particle systems
- ✅ Bloom effect
- ✅ Sound design
- ✅ Detailed component separation

**Fallback (Mobile)**:
- ✅ Static frames
- ✅ Simplified model
- ✅ Reduced particle count

---

## 🎯 INTEGRATION WITH NEXT.JS

**Component Structure**:
```tsx
// app/page.tsx
<Section>
  {/* Black Header - Spline scene #1 */}
  <SplineScene sceneId="hero-header" />
</Section>

<Section>
  {/* White section with Laptop Drop → GPU Reveal */}
  <SplineScene sceneId="laptop-gpu-reveal" />
  
  {/* Alternative: Embed as iframe */}
  <SplineEmbed 
    url="https://my-spline-scene.spline.design/"
    scrollTrigger="top center"
  />
</Section>

<Section>
  {/* Next content section */}
  <Content>...</Content>
</Section>
```

**GSAP Integration**:
```tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Connect GSAP scroll to Spline animation timeline
ScrollTrigger.create({
  trigger: '.spline-container',
  onUpdate: (self) => {
    // Drive Spline scene based on scroll progress
    window.splineSync?.(self.progress); // Custom Spline callback
  }
});
```

---

## 🚀 DELIVERABLES CHECKLIST

- [ ] Spline project file (.spline or exported)
- [ ] 3D models (laptop + GPU)
- [ ] Textures and materials
- [ ] Animation timelines set up
- [ ] Scroll trigger logic
- [ ] Sound design files (optional)
- [ ] React component wrapper
- [ ] GSAP integration code
- [ ] Mobile optimization
- [ ] Performance audit (Lighthouse)
- [ ] Browser testing (Chrome, Safari, Firefox)
- [ ] Responsive testing (desktop, tablet, mobile)

---

## 📞 TECHNICAL SUPPORT REFERENCES

- **Spline Docs**: https://docs.spline.design/
- **Spline API**: https://github.com/splinetool/spline-web
- **GSAP ScrollTrigger**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Three.js**: https://threejs.org/docs/
- **React-Three-Fiber**: https://docs.pmnd.rs/react-three-fiber/

---

## ✅ QUALITY CHECKLIST

Before Launch:

- [ ] Animation runs smoothly at 60fps (desktop + mobile)
- [ ] Scroll scrubbing feels responsive (no lag)
- [ ] GPU glow is visible and impressive
- [ ] Processing animation is clear and understandable
- [ ] Text is readable (contrast, size, font)
- [ ] No jarring transitions between phases
- [ ] Mobile experience is smooth (optimized)
- [ ] Fallback images exist (in case WebGL fails)
- [ ] Lighthouse score 90+
- [ ] Sound design (if included) enhances experience
- [ ] All interactions feel intentional and purposeful
- [ ] User journey is clear and compelling

---

**Status**: Ready for 3D Design & Animation  
**Recommended Tool**: Spline (easiest Next.js integration)  
**Backup Tools**: Three.js + React-Three-Fiber, Babylon.js  
**Timeline**: 5-7 days for production-quality 3D scenes  
**Investment**: Professional 3D modeling + animation setup required

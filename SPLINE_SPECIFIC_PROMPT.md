# 🎨 SPLINE STUDIO PROMPT
## GPU Landing Page 3D Animation Sequences
**Platform**: Spline.design  
**Export Target**: React/Next.js component  
**Interaction**: Scroll-triggered animations  

---

## 🎯 SPLINE PROJECT SETUP

### Project Configuration

**Project Name**: `gpu-landing-3d-sequences`

**Canvas Settings**:
- Width: Responsive (maintain aspect ratio)
- Height: Full viewport (100vh)
- Background: Gradient or solid (will change per scene)
- Anti-aliasing: Enabled
- Shadows: Real-time, soft
- Bloom: Enabled (for GPU glow)

**Export Settings**:
- Format: React component (Spline Web API)
- Include interactions: Yes
- Embed code: React hook-compatible

---

## 📐 SCENE 1: HERO HEADER (Black Background)

### Scene Configuration
- **Name**: `HeroHeader`
- **Background**: Solid black (#000000)
- **Canvas Size**: Responsive, 16:9 aspect ratio
- **Lighting Setup**: Subtle, professional

### 3D Assets to Create/Import

**1. Logo/Brand Mark**
- Type: 3D text or geometric shape
- Position: Left side or center-top (adjust based on logo)
- Size: 40-60px (on screen, responsive)
- Material: Matte white or glossy silver
- Animation: Fade in (0-0.3 seconds from start)
- Rotation: None (static)

**2. Background Planes** (Optional, for visual interest)
- Type: Large geometric planes or subtle mesh
- Position: Background (Z -1000)
- Material: Dark gray to black gradient
- Purpose: Add depth without overwhelming
- Opacity: 30-50%
- Animation: Subtle rotation (very slow, 360° over 30 seconds)

### Text Elements (Spline)
- **Tagline Text**: 
  - Content: "[Your Product Name] - Powering the Future"
  - Font: 32px, bold
  - Color: White (#FFFFFF)
  - Position: Center-screen
  - Animation: Fade in 0-0.5s
  - Alignment: Center

- **Subheading Text**:
  - Content: "Revolutionary GPU technology for AI"
  - Font: 16px, regular
  - Color: Light gray (#CCCCCC)
  - Position: Below tagline
  - Animation: Fade in 0.2-0.7s
  - Alignment: Center

### Animation Timeline
```
0s:     Scene loads (black background)
0.1s:   Logo fades in (0.3s duration)
0.3s:   Tagline fades in (0.5s duration)
0.5s:   Subheading fades in (0.4s duration)
2.5s:   Scene idle (all elements visible, static)
```

### Lighting Setup
- **Ambient Light**: 
  - Color: White
  - Intensity: 0.6
  
- **Directional Light** (Key light):
  - Color: White
  - Intensity: 1.0
  - Direction: 45° from top-left
  - Shadow: Soft (blur 20px)

---

## 📐 SCENE 2: LAPTOP DROP & OPEN (White Background)

### Scene Configuration
- **Name**: `LaptopDropOpen`
- **Background**: Pure white (#FFFFFF) with subtle gradient (99% white → 98% light gray)
- **Canvas Size**: Responsive, 16:9
- **Lighting**: Professional product lighting

### 3D Assets Required

**1. Laptop Model** (Critical)
- **Specifications**:
  - Type: MacBook Pro or generic laptop (detailed model)
  - Poly count: 50,000-150,000 (optimized for web)
  - Materials: 
    - Aluminum body (brushed metal texture, roughness 0.4, metalness 0.9)
    - Screen glass (reflective, roughness 0.05, metalness 0.0, transparent)
    - Keyboard (matte black plastic)
    - Bezels (light gray, matte)
  
- **Rigging Requirements**:
  - Hinge joint: Between screen and keyboard deck
  - Rotation: On screen lid only (0° closed → 90° open)
  - Physics: Enabled for drop animation

- **Initial Position**:
  - X: 0 (center)
  - Y: +800 (above viewport, will drop down)
  - Z: 0 (center)
  - Rotation: 0° (closed state)

**2. Floor/Shadow Plane**
- Type: Plane geometry
- Position: Y: -200 (below laptop)
- Size: 2000px × 2000px (large, extends beyond view)
- Material: White with shadow receive
- Purpose: Catch shadow for realism

**3. Lighting Rig**
- Key light (upper-left): 45° angle, white, intensity 1.2
- Fill light (lower-right): 30° angle, intensity 0.4
- Back light (behind): Subtle, intensity 0.5
- Ambient: 0.6 intensity

### Animation Timeline

**Laptop Drop**:
```
Time    Action                          Duration
0s:     Laptop appears at Y +800        Instant
0-2.5s: Free fall animation            2.5s (ease-out-bounce)
        Y: +800 → -150 (settled)
2.5s:   Laptop lands (slight bounce)   Soft impact
3s:     Laptop settles to rest state   Bounce completes
```

**Easing Curve**:
- Use: ease-out-bounce OR ease-out-cubic
- Bounce amplitude: 0.3 (20% bounce height)
- Friction: High (motion stops quickly)

**Laptop Opening** (Triggered when user scrolls):
```
Time     Action                     Duration
0s:      Lid at 0° (closed)        Instant
0-3.5s:  Lid rotates to 90°        3.5s (ease-in-out)
         Screen glows gradually    Sync with rotation
1.5s:    Screen content appears    0.5s fade in
3.5s:    Fully open, idle          Ready for next phase
```

**Lid Rotation Parameters**:
- Hinge point: Back edge of laptop
- Rotation axis: X-axis (horizontal hinge)
- Start angle: 0°
- End angle: 90°
- Easing: ease-in-out (smooth acceleration)

**Screen Glow Progression**:
- 0s: Glow intensity 0% (black screen)
- 1.5s: Glow intensity 30% (dark blue)
- 3.5s: Glow intensity 60% (brighter blue)
- Color: #0055DD or #0066FF (dark blue)

**Screen Content** (Simple animation):
- Background: Dark (RGB 20, 20, 40)
- Animated grid or code: Subtle blue lines
- Opacity progression: 0% → 40%
- Animation style: Floating grid or scrolling text

### Responsive Sizing
- **Desktop (1280px+)**: Laptop width 1000px
- **Tablet (768px)**: Laptop width 700px
- **Mobile (375px)**: Laptop width 450px

---

## 📐 SCENE 3: COMPONENT SEPARATION & GPU REVEAL

### Scene Configuration
- **Name**: `ComponentDisassembly`
- **Background**: White (#FFFFFF)
- **Canvas Size**: Responsive, 16:9
- **Starting State**: Laptop fully open from previous scene

### 3D Assets (Reuse from Scene 2 + Add)

**Laptop Components to Separate**:

**1. Screen Panel**
- Detach from hinge
- Motion: Upward (Y +300) + slight rotation (10° outward)
- Speed: 2 seconds (ease-out)
- Final opacity: 80%
- Position: Top-center
- Shadow: Reduces slightly

**2. Keyboard Deck**
- Motion: Forward (Z +250) + downward (Y -150)
- Speed: 2.5 seconds (ease-out)
- Angle: Slight tilt (5°)
- Final opacity: 75%
- Position: Bottom-left

**3. Left & Right Side Panels**
- Left panel: Moves left (X -300) + rotates outward (15°)
- Right panel: Moves right (X +300) + rotates outward (15°)
- Speed: 2.5 seconds (ease-out)
- Final opacity: 60%
- Stagger: Start 0.3s after keyboard

**4. GPU Module** ⭐ HERO ELEMENT
- Starting position: Inside laptop motherboard (center-front)
- Final position: Rises upward (Y +250) + forward (Z +150)
- Speed: 3 seconds (ease-out, slower than others for emphasis)
- **GLOW EFFECT**:
  - Color: #00AAFF or #0066FF (bright blue)
  - Intensity: 0.0 → 1.5 (gradually increases)
  - Radius: 200px (at peak)
  - Bloom: Enabled (post-processing)
  - Light source: Point light at GPU center
  
- Material changes:
  - Pre-reveal: Matte gray
  - During reveal: Metallic + emissive blue glow
  - Visible details: Circuit patterns, heat pipes, connector pins

**5. Supporting Components** (Optional, visible in background):
- CPU module (stays lower, fades)
- RAM sticks (2-3 visible, offset positions)
- Motherboard (becomes background, fades to 30% opacity)
- Power supply (side position, fades)
- Heat sink/cooling system (visible around GPU)

### GPU Specifications (Critical)

**Model**:
- Type: Professional GPU (NVIDIA RTX or datacenter style)
- Poly count: 30,000-80,000 (detailed but optimized)
- Materials:
  - Body: Metallic aluminum (roughness 0.3)
  - Core: Emissive material (for glow)
  - Connectors: Gold/silver metallic
  - Heat sink: Anodized black aluminum
  - Fans: Black plastic with metallic shroud

**Lighting on GPU**:
- Blue point light: Emits from GPU core
- Position: Center of GPU chip
- Color: #00AAFF (bright cyan-blue)
- Intensity: 1.5 (peak)
- Range: 400-600px
- Shadow casting: Enabled
- Bloom: Enabled (post-processing)

**Screen/Monitor Effect** (GPU surface):
- Subtle animations on GPU display area
- Content: Animated lines representing processing
- Color: Blue with white highlights
- Opacity: 50-70%
- Animation: Flowing patterns, 2-3 second loop

### Animation Sequence Timeline

```
Time    Component           Action                    Duration
0s:     All components      Start from laptop state   Instant
0s:     Screen panel        Begin upward motion       2s
0.3s:   Keyboard deck       Begin forward/down        2.5s
0.6s:   Left panel          Begin outward motion      2.5s
0.6s:   Right panel         Begin outward motion      2.5s
1s:     GPU module          Begin upward motion       3s
1s:     GPU glow            Starts 0%, increases      3s
1.5s:   Other components    Fade to 40-50% opacity   1.5s
3s:     GPU                 Reaches final position    Reaches peak glow
3.5s:   Scene stabilizes    All motion stops          Ready for next phase
```

**Stagger Pattern**:
- Each component starts 0.2-0.3 seconds apart
- Creates choreographed, flowing movement
- GPU is last to move, receives most attention

### Responsive Behavior
- **Desktop**: Full detailed separation, all components visible
- **Tablet**: Simplified, fewer components visible, GPU emphasized
- **Mobile**: Simplified GPU reveal, fewer secondary components

---

## 📐 SCENE 4: GPU PROCESSING ANIMATION

### Scene Configuration
- **Name**: `GPUProcessing`
- **Background**: White (#FFFFFF) with subtle fade to light gray
- **Canvas Size**: Responsive, 16:9
- **Starting State**: GPU centered, fully revealed, glowing

### 3D Assets

**1. GPU** (Reuse from Scene 3)
- Position: Center-screen
- Size: 800-1000px (prominent)
- Glow: Maintains 0.8-1.0 intensity
- Rotation: Subtle idle rotation (10° per 10 seconds, very slow)
- All other components: Fade to 10-20% opacity or hidden

**2. Particle System: Input Flow**
- **Particle Type**: Small spheres (2-4px radius)
- **Count**: 20-30 particles
- **Color**: Blue (#0066FF) to match GPU
- **Emission Point**: Around perimeter of GPU
- **Flow Pattern**: Spiral/circular motion converging to GPU center
- **Speed**: Moderate (complete loop in 1.5 seconds)
- **Opacity**: 0.7 (visible but not overwhelming)
- **Trail**: Optional - blue trails behind particles
- **Lifetime**: Continuous loop, particles reset

**3. Particle System: Output Flow**
- **Particle Type**: Small spheres with slight glow (3-5px)
- **Count**: 25-35 particles
- **Color**: Blue with white highlight (#00AAFF with white edge)
- **Emission Point**: GPU center (radiates outward)
- **Flow Pattern**: Radial outward in all directions
- **Speed**: 2x faster than input (2-3 second cycle)
- **Opacity**: 0.7 → 0.2 (fade as they disperse)
- **Effect**: Represents results/output
- **Lifetime**: Continuous loop

**4. Text Elements**

**Input Question Text**:
```
Text: "What can you process?"
Position: Above GPU (Y +300)
Font: 18px, medium weight
Color: Dark gray (#333333)
Animation: 
  - Fade in 0-0.5s (opacity 0→100%)
  - Slight scale: 0.95→1.0
```

**Output Answer Text**:
```
Text: "Billions of computations per second"
Position: Below GPU (Y -300)
Font: 18px, medium weight
Color: Blue (#0066FF)
Animation:
  - Fade in 3-4s (opacity 0→100%)
  - Character-by-character reveal (0.5s duration)
  - Slight scale: 0.95→1.0
```

### GPU Core Animation

**Pulsing Effect** (Visual feedback of processing):
```
Pulse Sequence (repeats during processing):
Time     Intensity    Details
0s:      80%          Normal glow
0.2s:    100%         First pulse
0.5s:    90%          Fade back
0.7s:    100%         Second pulse
1.0s:    90%          Fade back
1.2s:    100%         Third pulse
1.5s:    80%          Return to normal
```

**Core Material Animation**:
- Emissive intensity: Pulses 0.8 → 1.0 → 0.8
- Color: Maintains #00AAFF blue
- Surface brightness: Increases with pulses
- Heat visualization: Optional - subtle red glow (10% intensity) at base during pulses

**Circuit Animation** (Surface detail):
- Thin lines on GPU surface
- Color: Blue (#0066FF), semi-transparent
- Animation: Flow from edges toward center (synchronized with pulses)
- Opacity: 0.3 → 0.6 → 0.3
- Duration: Synchronized with processing pulses (1.5 second cycle)

### Processing Animation Timeline

```
Time     Event                           Duration
0s:      Scene loads, GPU visible        Instant
0s:      Input particles begin flowing   Continuous (1.5s loop)
0s:      Question text fades in          0.5s
0.5s:    Input text fully visible        Idle (2.5s)
1s:      GPU starts pulsing              3s total
1s:      Circuit lines activate          Sync with pulses
3s:      Question text fades out         0.5s
3.2s:    Output particles begin          Continuous (2-3s loop)
3.5s:    Answer text fades in            0.5s (character reveal)
4.5s:    Answer text fully visible       Idle (3s)
8s:      All text fades out              1s duration
9s:      Scene settles, particles idle   Ready for loop or next phase
```

### Sound Design Integration (Optional)

**Audio Elements** (implemented via separate audio track):
1. **Electronic Hum** (0-8s):
   - Frequency: 60-80Hz (low hum)
   - Amplitude: Subtle (-20dB)
   - Envelope: Fade in over 1s, fade out over 1s
   - Effect: Professional, technical atmosphere

2. **Processing Pulse Tone** (1s, 3.5s, 6.2s):
   - Frequency: 800-1200Hz (mid-range)
   - Duration: 0.1-0.2s
   - Volume: Subtle (-15dB)
   - Effect: Emphasizes GPU pulses

3. **Completion Chime** (8s, optional):
   - Frequency: 2000Hz rising to 3000Hz
   - Duration: 0.3s
   - Volume: Light (-12dB)
   - Effect: Satisfying completion sound

### Responsive Adjustments
- **Desktop**: Full particle systems, all effects enabled
- **Tablet**: Reduced particle count (15 per system), full glow
- **Mobile**: 8-10 particles per system, simplified shader effects

---

## 📐 SCENE 5: TRANSITION TO NEXT SECTION

### Configuration
- **Name**: `TransitionOut`
- **Duration**: 2 seconds
- **Purpose**: Fade GPU and scene → new content

### Animation
```
Time     Event
0s:      Scene fully visible
0-2s:    Fade out (opacity 100% → 0%)
1s:      GPU glow dims
2s:      Scene complete (ready for next section)
```

### Next Section Content
- Fades in simultaneously with fade-out
- Natural, smooth transition
- No jarring cuts or overlaps

---

## 🔌 SPLINE EXPORT & REACT INTEGRATION

### Export Settings in Spline

1. **Export Format**: 
   - Select "React" → "Export as React Component"
   - OR use Spline Embed code
   - OR use Spline API (recommended for control)

2. **Code Generation**:
   ```jsx
   // Auto-generated from Spline
   import Spline from '@splinetool/react-spline';
   
   export default function GPULandingScene() {
     return (
       <Spline scene="https://prod.spline.design/YOUR_PROJECT_ID/scene" />
     );
   }
   ```

3. **Custom Wrapper** (Add interaction):
   ```jsx
   import { useEffect, useRef } from 'react';
   import Spline from '@splinetool/react-spline';
   import gsap from 'gsap';
   import { ScrollTrigger } from 'gsap/ScrollTrigger';
   
   gsap.registerPlugin(ScrollTrigger);
   
   export function GPUAnimationScene({ sceneId }) {
     const containerRef = useRef(null);
     const splineRef = useRef(null);
   
     useEffect(() => {
       // Connect GSAP scroll to Spline
       ScrollTrigger.create({
         trigger: containerRef.current,
         onUpdate: (self) => {
           // Send scroll progress to Spline
           window.splineSync?.(sceneId, self.progress);
         }
       });
     }, [sceneId]);
   
     return (
       <div ref={containerRef} className="w-full h-screen">
         <Spline 
           ref={splineRef}
           scene={`https://prod.spline.design/${sceneId}/scene`}
         />
       </div>
     );
   }
   ```

### Next.js Integration

```tsx
// app/page.tsx
'use client';
import { GPUAnimationScene } from '@/components/GPUAnimationScene';

export default function Home() {
  return (
    <>
      {/* Scene 1: Hero Header */}
      <section className="relative w-full h-screen bg-black">
        <GPUAnimationScene sceneId="hero-header" />
      </section>

      {/* Scene 2 & 3: Laptop Drop → GPU Reveal */}
      <section className="relative w-full h-screen bg-white">
        <GPUAnimationScene sceneId="laptop-gpu-reveal" />
      </section>

      {/* Scene 4: GPU Processing */}
      <section className="relative w-full h-screen bg-white">
        <GPUAnimationScene sceneId="gpu-processing" />
      </section>

      {/* Next section content */}
      <section className="relative w-full min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Your content */}
        </div>
      </section>
    </>
  );
}
```

---

## ✅ SPLINE PRODUCTION CHECKLIST

- [ ] All 4 scenes created and tested
- [ ] 3D models imported and optimized
- [ ] Materials and textures applied
- [ ] Animations created on timeline
- [ ] Lighting set up correctly
- [ ] Bloom and post-processing effects enabled
- [ ] Particles systems working
- [ ] Text elements positioned and animated
- [ ] Export tested in React
- [ ] Scroll triggers integrated with GSAP
- [ ] Mobile version optimized
- [ ] Performance tested (60fps target)
- [ ] Fallback images created
- [ ] Audio files prepared (optional)
- [ ] Browser compatibility tested
- [ ] Responsive behavior verified

---

## 📊 PERFORMANCE METRICS

**Target Performance**:
- Frame rate: 60fps (desktop), 45fps+ (mobile)
- Load time: < 3 seconds (cached)
- Bundle size: < 2MB (with assets)
- GPU utilization: < 60%

**Optimization Tips**:
1. Use compressed textures (WebP format)
2. Limit polygon count per model (< 150k total)
3. Use LOD (Level of Detail) for mobile
4. Disable bloom on mobile devices
5. Reduce particle count on low-end devices
6. Lazy-load Spline scenes (load on scroll)
7. Preload critical assets
8. Use GPU instancing for particles

---

## 📞 RESOURCES & SUPPORT

- **Spline Documentation**: https://docs.spline.design/
- **Spline React Docs**: https://www.npmjs.com/package/@splinetool/react-spline
- **Spline Community**: https://community.spline.design/
- **Next.js Image Optimization**: https://nextjs.org/docs/basic-features/image-optimization
- **GSAP ScrollTrigger**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

---

**Project Status**: Ready for Spline Studio  
**Estimated Timeline**: 7-10 days for production-quality scenes  
**Recommended**: Hire professional 3D artist for GPU model  
**Budget**: $3,000-$8,000 for complete 3D design & animation

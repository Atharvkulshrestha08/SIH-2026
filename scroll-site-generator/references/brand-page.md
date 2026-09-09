# The full brand page (below the film)

The scroll film is the OPENING ACT, not the site. A run is not done when
the film scrubs — it's done when the page reads as a complete brand
homepage. Below the film, continue the same story in normal scrolling
sections. Target: 6-9 sections, so the film is roughly the top third of
total scroll.

## Narrative arc (order matters — it's a story, not a menu)

1. **Manifesto** — one huge statement that names the belief behind the
   brand ("Time is the only luxury."). Oversized type, nothing else.
2. **Origin / why** — short story block: why this product exists. Split
   layout: text beside a still crop.
3. **Craft chapters (2-3)** — each takes ONE detail from the film and
   goes deeper (the movement, the knit, the crema). Alternate image left /
   image right. These reuse film assets: zoomed crops of the hero,
   keyframes, or single extracted film frames — crops cost nothing and
   feel intentional ("detail shots").
4. **Numbers strip** — 3-4 stats with big numerals (weight, parts, hours
   of assembly). Invent plausible, tasteful figures.
5. **Specifications** — a clean two-column table. Real-feeling specs.
6. **Voices** — 1-3 short pull-quotes (invented press or customers,
   e.g. "— Monocle" style attributions only if fictional-safe; otherwise
   "Early owner, Lisbon").
7. **Gallery** — 2-4 stills in an asymmetric grid (crops + any unused
   generation candidates — hero-b/c rejects are free gallery material).
8. **Closing CTA band** — restate the promise + the glowing CTA, echoing
   the film's final card.
9. **Footer** — real footer: brand mark, 3-4 nav columns (Product, Company,
   Support, Social), fine print. A page without a footer feels like a demo.

## Design rules

- Same design system as the film: same bg, accent, type scale, spacing.
  The transition from film to sections must be invisible — continue the
  darkness, don't switch to a "normal website" look.
- Every section reveals on scroll (fade + rise ~24px). Vanilla: the
  IntersectionObserver pattern in `assets/brand-sections.html`. Hybrid:
  simple non-scrubbed ScrollTriggers (`start: "top 75%"`, toggleActions).
- Add a **sticky nav** that fades in after the film ends (brand mark left,
  3-4 anchor links, small CTA right) and anchors to section ids.
- Copy voice: short declarative lines, no marketing sludge. Two sentences
  max per block. Headlines under six words.
- Images below the film also get `.img-blend`-style masks and should be
  cropped/re-framed (Pillow) rather than repeated at the same size the
  film already showed them.

## Asset budget

The entire brand page should normally cost ZERO new generations: crops,
zooms, rejected hero candidates, keyframes and extracted film frames
cover it. Only generate new stills (1-2 max, e.g. a lifestyle/context
shot) if the brief explicitly calls for imagery the pipeline never made.

## Vanilla implementation

Copy the section markup from `assets/brand-sections.html` after the
`#outro` element (or replace #outro with it), fill in copy, keep the
`data-reveal` attributes, and include the reveal script at the bottom of
the file. Nav shows after `scrollY > film height` (one scroll listener).

## Hybrid implementation

Same sections as React components after the film sections; reveal with a
shared `useReveal` ScrollTrigger hook rather than scrub timelines. Keep
them server-renderable (no canvas) so the page stays light.

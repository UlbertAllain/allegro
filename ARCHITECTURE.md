# ALLEGRO Architecture

## Objective

A static, responsive rental-company profile that follows the approved centered hero, clean feature-based boundaries, and minimal JS.

## Flow

- **Content:** `app/page` → presentational feature sections → typed `catalog/data/products`.
- **Inquiry:** `InquiryTrigger` (client) → `InquiryProvider` (client) → pure message builder → copy/verified WhatsApp URL.
- **Motion:** `ScrollMotion` handles reveal; `ScrollMorphImage` handles optional WebGL for Camping; `RentalJourney` maps scroll to a simple SVG path. Both scroll-linked effects are isolated in their section modules.

No services, repositories, APIs or database layers are needed for this static stage.

## Responsibilities

| Directory | Responsibility |
| --- | --- |
| `src/app` | App Router, layout, root styles and metadata |
| `src/components/shared` | Header, footer, shared observer and shell styling |
| `src/modules/landing` | Hero, rental-process components and their CSS |
| `src/modules/catalog` | Product data, catalogue UI, activity navigation and CSS |
| `src/modules/about` | About story, disclosure and CSS |
| `src/modules/inquiry` | Inquiry interaction, validation, tests and CSS |
| `src/styles` | Cross-module motion behavior |
| `src/config` | Verified, public configuration only |
| `public/images` | Independent image assets |

## Decisions and trade-offs

1. Keep the approved centered wordmark + transparent PNG hiker; animation does not change layout or obscure the brand.
2. Use native IntersectionObserver and CSS rather than adding Framer Motion for simple enter/hover transitions.
3. All scroll-reveal content stays visible when JS or IntersectionObserver is unavailable; reduced-motion preference is respected.
4. Avoid `will-change` on every element and animate mostly opacity/transform. Morphing border-radius is limited to a small number of images/interactions.
5. CSS is split by responsibility; do not add layers that serve no current business requirement.
6. Build output (`.next`, `out`), npm dependencies, caches and tool-generated folders are excluded from the distributed source.

## Before deployment

Run `npm run check`, validate real inventory/prices and contact information, then test the production bundle in browser and on actual mobile devices.

## Experiment 01: Three.js morphing (v9)

Only the Camping category image opts into client-side WebGL. Its article, CTA, navigation, catalog content, and all other sections remain normal HTML with server-side rendering.

- A real image is the baseline and accessible fallback.
- An `IntersectionObserver` lazy-loads the optional Three.js bundle.
- A fullscreen quad plus a custom shader morphs an organic radial mask toward a rectangular one based on a pure scroll-progress utility. Scroll-up reverses the transition.
- Rendering is requestAnimationFrame-driven **only while progress changes**; GPU resources and listeners are cleaned up on unmount.
- Reduced-motion, no-WebGL, and no-JS paths retain the static photo and working CTA.

No GSAP or global 3D scene is added until a second distinct use case justifies it. Keep the approved centered hero intact.

## Refinement 02: White image morph and rental-path animation (v10)

The white background is shared by the Camping morph viewport, its caption, and the activity section. The caption is placed outside the clipped image to preserve readable contrast for every morph progress value.

`RentalJourney` controls a second, non-WebGL effect. It measures the journey's viewport position with a pure, tested `getJourneyProgress` function. Two identical SVG routes are layered: the active dark route is progressively clipped from left to right; mobile uses the same progress to scale a 1px vertical rule. All updates are grouped in requestAnimationFrame and all listeners are cleaned up. The plain full path is visible if JavaScript is unavailable or reduced motion is enabled.

This intentionally adds no new animation dependency and does not modify the approved hero.

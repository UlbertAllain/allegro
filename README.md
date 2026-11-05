# ALLEGRO — Company Profile

Responsive, static company-profile site with the approved **centered editorial hero** and restrained scroll motion.

## Stack

- Next.js 16 App Router + React 19 + TypeScript (strict)
- Tailwind CSS 4 for occasional utilities, scoped CSS for editorial components
- Native `IntersectionObserver` + CSS transitions for motion (no animation library)
- Vitest for pure inquiry-message functions
- Static export: no database, backend, or authentication

## Getting started

Node.js 22 LTS recommended.

```bash
npm install
cp .env.example .env.local # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Quality checks and static export:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

`npm run build` outputs the deployable static site in `out/`.

## Why do extra folders appear?

Those are generated automatically during installation and development. **They are not included in this source ZIP**:

| Folder / file | Why it appears | Keep in Git? |
| --- | --- | --- |
| `node_modules/` | Local npm dependencies after `npm install` | No |
| `.next/` | Next.js build and dev cache | No |
| `out/` | Output of `npm run build` for static hosting | No |
| `.taste-skill/` | Local tool/plugin-generated files | No |
| `*.tsbuildinfo` | TypeScript incremental cache | No |

The files above are ignored in `.gitignore`. It's normal for VS Code to display them locally. For VS Code, `.vscode/settings.json` hides these generated folders in Explorer and search results. They still exist and work normally; do not add them to the source ZIP or Git.

## Source folders

```text
src/
  app/              Routing, metadata, and global base styles
  components/shared/ Header, footer, shared motion observer
  config/           Public site settings
  modules/
    landing/        Hero and rental process
    catalog/        Products, category navigation, catalog data
    about/          About content
    inquiry/        Inquiry dialog, message building, tests
  styles/           Shared animation rules
public/images/      Independent, replaceable visual assets
```

Styles are kept alongside the sections they serve. `src/app/globals.css` contains only global foundation styles.

## Motion behavior

- Hero title and subject enter once on page load.
- On scroll, section titles, catalog images and the rental steps slide/fade into view.
- The **Cara Sewa** connector traces progressively with scroll position, and reverses while scrolling up.
- Selected images and interactive surfaces subtly morph their corner shape on entrance/hover.
- Entrance reveals play once; the Camping morph and Cara Sewa connector are **scroll-linked** and reversible.
- If JavaScript is disabled, content is still visible. `prefers-reduced-motion` disables animation.

Entrance motion: `src/components/shared/scroll-motion.tsx` and `src/styles/motion.css`. Scroll-driven rental timeline: `src/modules/landing/components/rental-journey.tsx` and `src/modules/landing/lib/get-journey-progress.ts`.

## Inquiry behavior

"Tanya Stok" opens a native dialog to prepare a rental inquiry message. Without a contact number, the user can copy the text. For a WhatsApp deep link, set `NEXT_PUBLIC_ALLEGRO_WHATSAPP` to **ALLEGRO's verified official number**. The prototype does not check inventory or create bookings.

Before launch, verify catalog prices, photos and all business claims; configure official contact details, then update the metadata robots setting. Generated artwork is illustrative, not proof of ALLEGRO's actual inventory.

See `ARCHITECTURE.md` and `ENGINEERING_STANDARD.md` for boundaries and decisions.

## Scroll-linked morph — experiment 01 (v9)

The **Camping** image changes from an organic silhouette to a full rectangular frame as the visitor scrolls. It reverses when scrolling upward. The existing centered hero stays unchanged. In v10, the background outside the mask and the entire activities section are **white**. The Camping caption sits below the image on white so it stays readable at every mask stage.

- `src/modules/catalog/components/scroll-morph-image.tsx` owns the lazy Three.js renderer and its lifecycle.
- `src/modules/catalog/lib/scroll-morph-shaders.ts` owns the GLSL boundary/image shader.
- `src/modules/catalog/lib/get-morph-progress.ts` maps viewport position to a clamped 0–1 value, with unit tests.
- `src/modules/catalog/styles/scroll-morph.css` owns the surface and fallback styling.

Only one WebGL surface is used. The code dynamically imports Three.js when the Camping card approaches the viewport, caps device pixel ratio at 1.5, updates only while the scroll progress is changing, and disposes its resources when unmounted. It deliberately avoids scroll-jacking, pinning, and global WebGL canvases.

If WebGL is unavailable, JavaScript is disabled, or `prefers-reduced-motion: reduce` is enabled, the regular image stays visible and all links remain functional. A lightweight standalone interactive HTML preview is supplied separately; its offline renderer uses the same radial boundary formula with Canvas 2D when WebGL is unavailable.

Before shipping this experiment, run `npm install` and `npm run check` locally, then verify performance on real low-end mobile devices. This environment could not access npm registry or enable GPU/WebGL for a full Next.js render.

## Motion refinement (v10)

- **White Camping morph:** `src/modules/catalog/styles/scroll-morph.css` sets the media and section to `#fff`; the photo is independently masked in Three.js. The original full photograph remains available if WebGL/JavaScript is unavailable or reduced motion is requested.
- **Rental timeline:** `src/modules/landing/components/rental-journey.tsx` draws the three-step connector proportionally to scroll progress, from left to right on desktop and top to bottom on mobile. The unanimated full line remains present without JavaScript or with reduced motion.
- **No new dependencies:** We reuse native scrolling, `requestAnimationFrame`, and the existing Three.js experiment. All listeners are removed on unmount.

The offline HTML preview uses Canvas 2D as a fallback and cannot verify real GPU rendering. Validate on a real device before deployment.

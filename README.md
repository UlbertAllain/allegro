# ALLEGRO

A responsive company-profile website for an outdoor equipment rental service, covering camping, hiking, and caving. The project combines a centered editorial layout with a product showcase, rental instructions, and scroll-driven interactions.

> **Project status:** Frontend prototype. Product details, rental prices, images, and business information must be verified before public launch. The site does not provide real-time stock availability or online booking.

## Tech stack

| Area | Technology |
| --- | --- |
| Application | Next.js 16 (App Router), React 19 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 and component-scoped CSS |
| Motion | CSS, native browser APIs, Three.js (single optional WebGL effect) |
| Testing | Vitest, TypeScript, ESLint |
| Deployment | Static export, compatible with Vercel and static hosting |

The site is static-first. No backend, database, or authentication is required for the current scope.

## Getting started

**Requirements:** Node.js 22 LTS (recommended) and npm.

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env.local`.

3. Start the development server:

   ```bash
   npm run dev
   ```

Open **http://localhost:3000**.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_ALLEGRO_WHATSAPP` | No | Verified business WhatsApp number for a prefilled inquiry link. Leave blank to use the copy-message flow. |

Use an international-format phone number (for example, `6281234567890`). `NEXT_PUBLIC_*` variables are exposed to the browser: do not place secrets or access tokens here.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run the local development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run test` | Run unit tests |
| `npm run build` | Build the static production export into `out/` |
| `npm run check` | Run lint, typecheck, tests, and production build |

Before submitting changes, run `npm run check`.

## Project structure

```text
public/
  images/                 Site photography and illustration assets
src/
  app/                    Routing, metadata, global styles and layout
  components/shared/      Site header, footer, and shared scroll observer
  config/                 Public site configuration
  modules/
    landing/              Hero and rental journey
    catalog/              Product data, categories, and image morph
    about/                Brand / equipment-handling content
    inquiry/              Inquiry dialog, validation, and message builder
  styles/                 Cross-module motion styles
```

Each feature owns its components, styles, and supporting logic. Catalog items live in `src/modules/catalog/data/products.ts` and can be updated independently of the page layout.

For the design decisions and architectural boundaries, see [ARCHITECTURE.md](./ARCHITECTURE.md) and [ENGINEERING_STANDARD.md](./ENGINEERING_STANDARD.md).

## Features and interaction behavior

- **Product discovery:** Featured equipment and activity-based navigation.
- **Rental guidance:** An editorial three-step process with a scroll-linked timeline.
- **Rental inquiry:** A client-side form that prepares a message with product, start date, and rental duration. When the official WhatsApp number is configured, it can open a prefilled chat; otherwise the message can be copied. This does **not** reserve an item or confirm availability.
- **Motion:** Scroll reveals and a reversible, scroll-driven Three.js mask on the Camping image. The WebGL renderer is loaded only when needed.
- **Accessibility and fallback:** Semantic navigation and native controls; static images remain visible if WebGL is unavailable, JavaScript is disabled, or reduced motion is requested.

The Three.js implementation is isolated in `src/modules/catalog/components/scroll-morph-image.tsx`. Scroll progress and shaders are kept in `src/modules/catalog/lib/`.

## Deployment

The application uses `output: "export"` in `next.config.ts`. Running `npm run build` generates a static site in `out/`.

For **Vercel**, connect the repository, select the Next.js framework preset, and allow Vercel to run the build on pushes to the deployment branch. For other static hosts, publish the generated `out/` directory.

### Launch checklist

- Verify rental product names, descriptions, prices, and images against actual inventory.
- Configure the official WhatsApp number and test the inquiry flow.
- Replace illustrative content with approved business information and media.
- Run `npm run check` and test on desktop and mobile, including reduced-motion and WebGL fallback behavior.
- Review `robots` metadata in `src/app/layout.tsx`. Indexing is currently disabled while the site is a prototype; change this only when the site is ready to go public.

## Limitations

This repository is a frontend demonstration, not an inventory or reservation system. Displayed prices and availability are not authoritative. Scroll-based WebGL effects are optional enhancements; core navigation and content must remain usable without them.

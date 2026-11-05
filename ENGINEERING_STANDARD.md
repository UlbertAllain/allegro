# Engineering Standard — ALLEGRO interpretation of the accepted V2 baseline

1. Requirements and design reference before implementation.
2. Use Next.js App Router, TypeScript strict, Tailwind CSS, modular-monolith structure.
3. Keep controllers/services/repositories out of static modules unless there's actual business logic or persistence.
4. Data separate from presentation; readable naming and focused responsibility for each file.
5. Validate all user input. Avoid fabricated business contact and unverified operational assertions.
6. Prefer server components; opt into client components only for interactivity.
7. Centralize shared styles and domain constants; avoid blind abstraction or duplicated copy.
8. Check keyboard access and dialog semantics; use alt text, focus-visible, reduced motion.
9. Quality gates: lint, typecheck, unit test, production build, responsive manual check.
10. Incremental changes; keep approved visual intent without unnecessary redesign.

11. Do not archive node_modules, .next, out, tool caches, or local secrets; honor .gitignore.
12. Respect prefers-reduced-motion; keep animated content usable without JavaScript.

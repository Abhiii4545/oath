# OATH — An Evolving Culture Platform

A premium, editorial, interactive single-page experience for **OATH** — an
umbrella brand for podcasts, clothing, events, creative projects and whatever
comes next. Black-and-white editorial art direction with controlled electric-blue
accents, built for motion and typography rather than effects.

## Stack

- **React + Vite**
- **Framer Motion** — reveals, masked text, scroll-linked transforms
- **Lenis** — smooth scrolling
- **Tailwind CSS** + a hand-built CSS design system
- **lucide-react** — icons
- Self-hosted variable fonts (Space Grotesk + Inter) via `@fontsource`

No WebGL / Three.js / Spline — all motion is DOM + CSS transforms.

## Sections

Hero → Manifesto → Universe → The Index → Horizontal Chapters → Featured →
The OATH Podcast → Statement → Future → Footer.

The Podcast section pulls the real [OATH YouTube channel](https://www.youtube.com/@OathFitnessCulture):
hover to preview (muted), click for full sound.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview
```

## Deploy (Vercel)

Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.

---

© 2026 OATH — This is only the beginning.

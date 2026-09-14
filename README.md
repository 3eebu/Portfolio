# Stitched Portfolio

Muhammad Saad's portfolio, built from the [Figma desktop frame](https://www.figma.com/design/VuRjaiTqR4O0KVKY1Q9Cah/Untitled?node-id=1-2) with React, Vite, TypeScript, and CSS.

## Run locally

```sh
npm install
npm run dev
npm run build
```

The original Figma title artwork, portrait, sculpted card, olive circle, and eight software icons are committed in `src/assets/figma/`. The desktop layout follows the 1440 × 1600 frame. At narrower widths it scales, then stacks into a simple mobile layout.

The reusable `src/components/stitched-title/StitchedPortfolioTitle.tsx` layers one SVG needle over the untouched Figma images. A 17-second sequence sews P → O → R → T → F → O → L → I → O, spending 3 seconds on P. The active thread is attached to the rotating needle eye and changes color per letter. Completed stitch marks remain behind it; a local clip simulates the tip passing through fabric. The overlay fades out before its hidden loop reset.

Adjust letter anchors, thread colors, stitch counts, and seconds in `src/components/stitched-title/config.ts`. `sequence.ts` samples the precomputed seam curves; `animate.ts` updates only the title SVG, with no React renders or layout reads per frame. It pauses when offscreen or when the tab is hidden. Reduced motion shows only the original artwork. On small screens the needle grows slightly relative to the artwork and the thread arcs become tighter.

Run `npm run test:hero` with Node 22.6+ to check timing, sequence order, eye/thread attachment, hidden reset, reduced motion, offscreen pausing, and cleanup.

The Work and Contact navigation targets are reserved for future sections; the brief intentionally leaves those sections for a later design pass.

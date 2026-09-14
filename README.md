# Stitched Portfolio

Muhammad Saad's portfolio, built from the [Figma desktop frame](https://www.figma.com/design/VuRjaiTqR4O0KVKY1Q9Cah/Untitled?node-id=1-2) with React, Vite, TypeScript, and CSS.

## Run locally

```sh
npm install
npm run dev
npm run build
```

The original Figma title artwork, portrait, sculpted card, olive circle, and eight software icons are committed in `src/assets/figma/`. The desktop layout follows the 1440 × 1600 frame. At narrower widths it scales, then stacks into a simple mobile layout.

Three small SVG needles trace short seams over the artwork on staggered 11, 13, and 15 second cycles. SVG stroke animation draws matching thread behind each needle; the needles briefly disappear to suggest piercing the textile. CSS disables the active sewing and other motion when `prefers-reduced-motion` is enabled.

The Work and Contact navigation targets are reserved for future sections; the brief intentionally leaves those sections for a later design pass.

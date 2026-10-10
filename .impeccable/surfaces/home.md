# Home: public product carousel

Ordinary extension, code-led. User asks to turn the existing Explora block in the home hero into a slider of important public SaaS and websites. Preserve the left-hand message, contact action, selected cases and incumbent visual world. Visitor mode: Persuade, with product evidence supporting a work inquiry.

## Direction contract

THESIS: One product at a time, in the existing hero footprint. Public products are directly usable and their case studies supply context.

OWN-WORLD: Existing Satoshi, semantic light/dark tokens, brand blue, orange contact action, square buttons and straight dividers. Existing screenshots fill the 16:9 visual; wallet passes retain their proportions and remain explicitly labelled brand imagery.

STORY: Understand Arturo's work, browse public products, try a product or read its case, then contact him.

FIRST VIEWPORT: Keep headline, introduction and orange contact button at left. At right, one 16:9 visual, product name, short evidence/description, public link, and previous/next controls with current position. Mobile keeps text and contact before slider.

FORM: Explicit user-pinned slider replaces only the Explora figure. No seeded form exploration applies to this ordinary extension. Start with Explora, then Cafetero, Hub, Cotiza, Vela Ventas, Finanzas, Vela Entradas and Tarjetas Arturo. No autoplay; native horizontal scrolling and labelled keyboard controls.

FINISH: Independent fresh finish review returned `ship` for the local hero and next-section excerpt, with no material fixes. Implementation, provenance, verification and limits are recorded below. This ordinary extension preserves the absence of root `DESIGN.md` and `.impeccable/design.json`; it creates no global design authority.

## Final implementation and provenance

`src/pages/HomePage.tsx` retains the left message, contact action and selected cases, and mounts `src/components/HomeProductCarousel.tsx` in the previous Explora position. `src/lib/spotlight.ts` selects eight public entries from existing `WALLET_PROJECTS`, using project covers, descriptions and outcomes where available. `src/i18n.ts` supplies ES/EN labels, position text and unavailable-image copy; the CSS tail preserves square controls, underlined links and contained brand images.

The carousel reuses installed Chakra Carousel and `ResponsiveImage`: one product at a time, 44px previous/next controls, a live position counter, inactive slides inert, and immediate navigation for keyboard activation or reduced motion. An unavailable image keeps the reserved visual area, description, public link and navigation usable. Mobile places the existing message and contact before the carousel.

No new images, dependencies or factual claims were introduced. Explora and Cafetero use existing `public/assets/images/portfolio/spotlight-*.webp` captures; Hub, Cotiza, Vela Ventas, Finanzas, Vela Entradas and Tarjetas Arturo use their existing `public/assets/images/pases-webs/` brand images. Pases are not presented as invented product screenshots.

## Review and verification

Evidence is in `.impeccable/review/home-slider/qa.json` and the adjacent captures. The sixteen ES/EN × 390/768/1024/1440 × light/dark cases show no horizontal overflow and 44px controls. All eight images loaded; the measured hero height stayed stable while navigating the eight ES desktop slides. Actual Enter navigation and Tab focus were checked, as was native horizontal scrolling at 390px in English. Supporting captures include the sixteen route/theme files, `es-1440-dark-slide-5.jpg`, `es-1440-dark-slide-8.jpg`, `es-1440-dark-slide-7-keyboard.jpg` and `en-390-light-native-scroll.jpg`.

After the finish review, local production preview on port 4173 passed the ES missing-image check: only the generated dist Tarjetas image was temporarily removed, the fallback retained description, public link, navigation and contact without overflow, and the dist file was restored with identical SHA-256; original public source was untouched (`image-unavailable.jpg`). Compiled English navigation to Finanzas loaded its image, had no overflow or console errors, and used canonical `https://velaarturo.com/en/` (`compiled-en-finanzas.jpg`).

`pnpm check` passed 79 tests and typecheck. Staging and production builds and both deployment dry runs passed. Local builds warned that `BRAIN_CONTENT_TOKEN` was missing and used fallback content; this evidence makes no assertion about the currently published remote manifest.

## Limits and retained drift

The slider has not been remotely deployed. The earlier staging Cloudflare 1010 block remains; production publication is pending. The finish verdict covers the local hero and next-section excerpt, not production or real-device touch. Physical touch, real 200% zoom and assistive technology hardware were not tested.

The pre-existing decorative hero grid remains an advisory in `detector.json`; existing brand shadows remain outside this extension. Neither was repaired or promoted into a new design-system rule.

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const brandColors = {
  50: "#F2F5FA",
  100: "#E8EDF6",
  200: "#D6DFED",
  300: "#BAC8DE",
  400: "#91A4C5",
  500: "#7185AE",
  600: "#5F739E",
  700: "#4C5E83",
  800: "#314466",
  900: "#1D2A42",
  950: "#111A2A",
} as const;

const config = defineConfig({
  globalCss: {
    "html, body, #root": { minHeight: "100%" },
    html: { scrollBehavior: "smooth" },
    body: { bg: "app.canvas", color: "app.text", fontFamily: "body", lineHeight: "1.6" },
    "*::selection": { bg: "brand.300", color: "brand.950" },
    "*:focus-visible": { outline: "3px solid {colors.app.focus-ring}", outlineOffset: "3px" },
  },
  theme: {
    tokens: {
      colors: {
        brand: Object.fromEntries(Object.entries(brandColors).map(([key, value]) => [key, { value }])),
        panel: { value: "#F9FBFE" },
      },
      fonts: {
        body: { value: "Satoshi, ui-sans-serif, system-ui, sans-serif" },
        heading: { value: "Satoshi, ui-sans-serif, system-ui, sans-serif" },
      },
      radii: { panel: { value: "1.5rem" } },
    },
    semanticTokens: {
      colors: {
        app: {
          canvas: { value: { base: "{colors.brand.50}", _dark: "{colors.brand.950}" } },
          panel: { value: { base: "{colors.panel}", _dark: "{colors.brand.900}" } },
          surface: { value: { base: "{colors.brand.100}", _dark: "{colors.brand.800}" } },
          text: { value: { base: "{colors.brand.950}", _dark: "{colors.brand.50}" } },
          muted: { value: { base: "{colors.brand.700}", _dark: "{colors.brand.300}" } },
          border: { value: { base: "{colors.brand.200}", _dark: "{colors.brand.800}" } },
          accent: { value: { base: "{colors.brand.800}", _dark: "{colors.brand.200}" } },
          "accent-subtle": { value: { base: "{colors.brand.100}", _dark: "{colors.brand.900}" } },
          "focus-ring": { value: { base: "{colors.brand.700}", _dark: "{colors.brand.300}" } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

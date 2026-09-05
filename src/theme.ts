import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const brandColors = {
  50: "#EEF3FF",
  100: "#DDE7FF",
  200: "#BED0FF",
  300: "#91ADFF",
  400: "#6488FF",
  500: "#3E68FF",
  600: "#2453F4",
  700: "#1D43CC",
  800: "#1939A4",
  900: "#172F7C",
  950: "#0B173A",
} as const;

const config = defineConfig({
  globalCss: {
    "html, body, #root": { minHeight: "100%" },
    html: { scrollBehavior: "smooth" },
    body: { bg: "app.canvas", color: "app.text", fontFamily: "body", lineHeight: "1.6" },
    "*::selection": { bg: "brand.300", color: "#080B12" },
    "*:focus-visible": { outline: "3px solid {colors.app.focus-ring}", outlineOffset: "3px" },
  },
  theme: {
    tokens: {
      colors: {
        brand: Object.fromEntries(Object.entries(brandColors).map(([key, value]) => [key, { value }])),
        panel: { value: "#FFFFFF" },
        signal: { value: "#FF5A36" },
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
          canvas: { value: { base: "#F5F7FA", _dark: "#080B12" } },
          panel: { value: { base: "{colors.panel}", _dark: "#0E1420" } },
          surface: { value: { base: "#E9EDF4", _dark: "#151D2A" } },
          text: { value: { base: "#0A0D14", _dark: "#F7F9FC" } },
          muted: { value: { base: "#596476", _dark: "#AAB5C6" } },
          border: { value: { base: "#CED5E0", _dark: "#2B3545" } },
          accent: { value: { base: "{colors.brand.600}", _dark: "{colors.brand.400}" } },
          "accent-subtle": { value: { base: "{colors.brand.50}", _dark: "{colors.brand.950}" } },
          signal: { value: { base: "{colors.signal}", _dark: "#FF7657" } },
          "focus-ring": { value: { base: "{colors.brand.600}", _dark: "{colors.brand.300}" } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

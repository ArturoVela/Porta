import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const brandColors = {
  50: "#F1F6EB",
  100: "#E1ECD8",
  200: "#CBDEBF",
  300: "#B7D69F",
  400: "#A5CB87",
  500: "#6E9C72",
  600: "#305845",
  700: "#284C3C",
  800: "#203D31",
  900: "#192E25",
  950: "#111F19",
} as const;

const config = defineConfig({
  globalCss: {
    "html, body, #root": { minHeight: "100%" },
    body: { bg: "app.canvas", color: "app.text", fontFamily: "body", lineHeight: "1.6" },
    "*::selection": { bg: "brand.300", color: "#111713" },
    "*:focus-visible": { outline: "3px solid {colors.app.focus-ring}", outlineOffset: "3px" },
  },
  theme: {
    tokens: {
      colors: {
        brand: Object.fromEntries(Object.entries(brandColors).map(([key, value]) => [key, { value }])),
        panel: { value: "#FFFFFF" },
        signal: { value: "#D6EF7C" },
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
          canvas: { value: { base: "#F5F6F0", _dark: "#111713" } },
          panel: { value: { base: "#FFFFFF", _dark: "#19211B" } },
          surface: { value: { base: "#E8ECE2", _dark: "#222C24" } },
          text: { value: { base: "#18221B", _dark: "#F2F4EC" } },
          muted: { value: { base: "#58675A", _dark: "#AFBCAF" } },
          border: { value: { base: "#CBD4C6", _dark: "#344238" } },
          "control-border": { value: { base: "#748675", _dark: "#879A87" } },
          accent: { value: { base: "{colors.brand.600}", _dark: "{colors.brand.400}" } },
          "accent-subtle": { value: { base: "{colors.brand.50}", _dark: "{colors.brand.950}" } },
          signal: { value: { base: "{colors.signal}", _dark: "{colors.signal}" } },
          "focus-ring": { value: { base: "{colors.brand.600}", _dark: "{colors.brand.300}" } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

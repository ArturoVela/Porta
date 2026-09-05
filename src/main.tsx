import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "next-themes";
import { App } from "@/App";
import { system } from "@/theme";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ChakraProvider value={system}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </ThemeProvider>
  </StrictMode>,
);

// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import { createTheme, DEFAULT_THEME, MantineProvider, rem } from "@mantine/core";
import { HeaderMegaMenu } from "@/components/Header/Header";
import { ThemeProvider } from "@/context/themeContext";

const theme = createTheme({
  // Your custom theme settings
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={DEFAULT_THEME}>
      <ThemeProvider>
        <HeaderMegaMenu />
        <Component {...pageProps} />
      </ThemeProvider>
    </MantineProvider>
  );
}

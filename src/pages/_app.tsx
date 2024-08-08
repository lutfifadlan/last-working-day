import '../app/globals.css'; // Adjust the path according to your project structure
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import {NextUIProvider} from "@nextui-org/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </ThemeProvider>
  );
}

export default MyApp;

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { inter } from "@/utils/font";
import { queryClient } from "@/utils/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <ThemeProvider defaultTheme="system" enableSystem={true}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster richColors closeButton position="top-center" />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "@next/font/google";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

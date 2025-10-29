import "@/styles/globals.css";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";
import { Nunito_Sans } from 'next/font/google';
import '../locales/i18n';

const nunito_sans = Nunito_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider>
        <main className={nunito_sans.variable}>
          <Component {...pageProps} />
        </main>
    </AppCacheProvider>
  );
}

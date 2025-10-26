import Header from "@/components/Navbar/Header";
import "@/styles/globals.css";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Nunito } from 'next/font/google';
import '../locales/i18n';

const nunito = Nunito({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-nunito)',
  },
  palette: {
    primary: {
      main: '#E6AB09',
    },
    secondary: {
      main: '#FFD86C',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider>
      <ThemeProvider theme={theme}>
        <main className={nunito.variable}>
          <section className="sticky top-0 z-50">
            <Header />
          </section>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </AppCacheProvider>
  );
}

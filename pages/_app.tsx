import '@/styles/global.css';
import "@fontsource/doppio-one";

import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class"><Component {...pageProps} /></ThemeProvider>);
}
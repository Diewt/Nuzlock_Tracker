
import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'

import '@/styles/global.css';

import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class"><Component {...pageProps} /></ThemeProvider>);
}
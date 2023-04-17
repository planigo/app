import React from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query";
import dynamic from 'next/dynamic';

const AppBar = dynamic(() => import("../components/AppBar"), { ssr: false });

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <AppBar />
    <Component {...pageProps} />
  </QueryClientProvider>
}
export default MyApp

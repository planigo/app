//import '@/styles/globals.css';
import '@/config/dayjs'

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
}

export default App
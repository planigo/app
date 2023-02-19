//import '@/styles/globals.css';
import '@/config/dayjs'
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google'

const poppins = Poppins({ weight: "500", subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
    return <main className={poppins.className}>
        <Component {...pageProps} />
    </main>
}

export default App
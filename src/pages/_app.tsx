import '@/styles/globals.css';
import '@/config/dayjs'
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google'
import Container from '@mui/material/Container';
import AppBar from '@/components/AppBar';

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
    return <>
        <AppBar />
        <Container className={poppins.className}>
            <Component {...pageProps} />
        </Container>
    </>

}

export default App
import "@/styles/globals.css";
import "@/config/dayjs";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const AppBar = dynamic(() => import("@/components/AppBar"), { ssr: false });

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppBar />
      <Container className={poppins.className}>
        <Component {...pageProps} />
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

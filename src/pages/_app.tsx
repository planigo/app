import "@/styles/globals.css";
import "@/config/dayjs";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import Container from "@mui/material/Container";
import AppBar from "@/components/AppBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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

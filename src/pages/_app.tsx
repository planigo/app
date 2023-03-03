import "@/styles/globals.css";
import "@/config/dayjs";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Container } from "@mui/system";

const AppBar = dynamic(() => import("@/components/AppBar"), { ssr: false });

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Container maxWidth={false} className={poppins.className}>
      <QueryClientProvider client={queryClient}>
        <AppBar />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Container>
  );
};

export default App;

import "../styles/globals.css";

import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import ContextProvider from "@/context";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <ContextProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;

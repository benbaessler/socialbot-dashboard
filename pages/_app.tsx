import "../styles/globals.css";

import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { GuildContextProvider } from "@/context/context";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <GuildContextProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </GuildContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;

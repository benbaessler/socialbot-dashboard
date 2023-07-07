import "../styles/globals.css";

import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { GuildContextProvider } from "@/context/Guild";
import { ChannelsContextProvider } from "@/context/Channels";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <GuildContextProvider>
          <ChannelsContextProvider>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </ChannelsContextProvider>
        </GuildContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;

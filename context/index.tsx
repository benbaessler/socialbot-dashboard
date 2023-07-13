import { FeedsContextProvider } from "./Feeds";
import { GuildContextProvider } from "./Guild";
import { ChannelsContextProvider } from "./Channels";
import { FetchingContextProvider } from "./Fetching";

const ContextProvider = ({ children }: any) => (
  <GuildContextProvider>
    <FetchingContextProvider>
      <ChannelsContextProvider>
        <FeedsContextProvider>{children}</FeedsContextProvider>
      </ChannelsContextProvider>
    </FetchingContextProvider>
  </GuildContextProvider>
);

export default ContextProvider;

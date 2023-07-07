import { FeedsContextProvider } from "./Feeds";
import { GuildContextProvider } from "./Guild";
import { ChannelsContextProvider } from "./Channels";

const ContextProvider = ({ children }: any) => (
  <GuildContextProvider>
    <ChannelsContextProvider>
      <FeedsContextProvider>{children}</FeedsContextProvider>
    </ChannelsContextProvider>
  </GuildContextProvider>
);

export default ContextProvider;

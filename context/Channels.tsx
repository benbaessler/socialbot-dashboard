import { createContext, useState } from "react";

export const ChannelsContext = createContext<any>(null);

export const ChannelsContextProvider = ({ children }: any) => {
  const [channels, setChannels] = useState<any[]>([]);

  return (
    <ChannelsContext.Provider value={{ channels, setChannels }}>
      {children}
    </ChannelsContext.Provider>
  );
};

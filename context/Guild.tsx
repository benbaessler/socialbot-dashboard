import { createContext, useState } from "react";
import { Guild } from "@/types";

export const GuildContext = createContext<any>(null);

export const GuildContextProvider = ({ children }: any) => {
  const [guild, setGuild] = useState<Guild | null>(null);

  return (
    <GuildContext.Provider value={{ guild, setGuild }}>
      {children}
    </GuildContext.Provider>
  );
};

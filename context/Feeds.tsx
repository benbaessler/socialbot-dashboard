import { IFeed } from "@/types";
import { createContext, useState } from "react";

export const FeedsContext = createContext<any>([]);

export const FeedsContextProvider = ({ children }: any) => {
  const [feeds, setFeeds] = useState<any>([]);

  return (
    <FeedsContext.Provider value={{ feeds, setFeeds }}>
      {children}
    </FeedsContext.Provider>
  );
};

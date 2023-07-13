import { createContext, useState } from "react";
export const FetchingContext = createContext<any>(null);

export const FetchingContextProvider = ({ children }: any) => {
  const [fetching, setFetching] = useState<any[]>([]);

  return (
    <FetchingContext.Provider value={{ fetching, setFetching }}>
      {children}
    </FetchingContext.Provider>
  );
};

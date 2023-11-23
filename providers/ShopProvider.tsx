"use client";

import { FC, ReactNode, createContext, useState } from "react";

export const ShopPageContext = createContext({});

interface ShopProviderProps {
  children: ReactNode;
}

const ShopProvider: FC<ShopProviderProps> = ({ children }) => {
  const [pageNum, setPageNum] = useState(1);

  return (
    <ShopPageContext.Provider value={{ pageNum, setPageNum }}>
      {children}
    </ShopPageContext.Provider>
  );
};
export default ShopProvider;

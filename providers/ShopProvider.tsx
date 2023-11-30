"use client";

import { FC, ReactNode, createContext, useReducer } from "react";

export const ShopPageContext = createContext(null);
export const ShopPageDispatchContext = createContext(null);

interface ShopProviderProps {
  children: ReactNode;
}

// reducer
const shopReducer = (stateObj: object, action: object) => {
  switch (action.type) {
    case "changePage": {
      return {
        ...stateObj,
        page: action.page,
      };
    }
    case "changeSort": {
      return {
        ...stateObj,
        sort: action.sort,
      };
    }
    case "changeOrder": {
      return {
        ...stateObj,
        order: action.order,
      };
    }
    case "changePrice": {
      return {
        ...stateObj,
        minPrice: action.minPrice,
        maxPrice: action.maxPrice,
      };
    }
    case "changeSearch": {
      return {
        ...stateObj,
        searchStr: action.searchStr,
      };
    }
    default: {
      throw Error("未知 action: " + action.type);
    }
  }
};

const initialState = {
  page: 1,
  sort: null,
  order: null,
  minPrice: null,
  maxPrice: null,
  searchStr: null,
};

const ShopProvider: FC<ShopProviderProps> = ({ children }) => {
  const [shopState, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopPageContext.Provider value={shopState}>
      <ShopPageDispatchContext.Provider value={dispatch}>
        {children}
      </ShopPageDispatchContext.Provider>
    </ShopPageContext.Provider>
  );
};
export default ShopProvider;

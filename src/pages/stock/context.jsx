import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export function useStock() {
  return useContext(Context);
}

export function StockProvider({ children, defaultValue }) {
  const value = useState(defaultValue);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

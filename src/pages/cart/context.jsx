import React, { createContext, useContext, useState } from "react";

const Context = createContext([]);

export function useCart() {
  return useContext(Context);
}

export function CartProvider({ children, defaultValue }) {
  const value = useState(defaultValue);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

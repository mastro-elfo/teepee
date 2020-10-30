import React from "react";
import { hot } from "react-hot-loader";

import { MemoryRouter } from "react-router-dom";
import primary from "@material-ui/core/colors/orange";
import secondary from "@material-ui/core/colors/deepPurple";
import warning from "@material-ui/core/colors/yellow";
import { AppContainer } from "mastro-elfo-mui";

import { route as about } from "./pages/about";
import { route as backup } from "./pages/backup";
import { route as cart } from "./pages/cart";
import { route as dashboard } from "./pages/dashboard";
import { route as help } from "./pages/help";
import { route as product } from "./pages/product";
import { route as settings } from "./pages/settings";
import { route as stock } from "./pages/stock";
// import { route as update } from "./pages/update";

import { CartProvider } from "./pages/cart/context";
import { StockProvider } from "./pages/stock/context";
import { NotificationsProvider } from "./components/notifications";
import { loadPalette } from "./pages/settings/store";

const palette = loadPalette({ type: "light" });

function App() {
  return (
    <AppContainer
      ThemeProps={{
        palette: { primary, secondary, warning, ...palette }
      }}
      NotifyProps={{
        // anchorOrigin: { horizontal: "center", vertical: "bottom" },
        preventDuplicate: true
      }}
      RouterProps={{
        Router: MemoryRouter,
        routes: [
          about,
          backup,
          cart,
          dashboard,
          help,
          product,
          settings,
          stock
          // update
        ]
      }}
      WrapperProps={{
        Children: [
          { Component: CartProvider, defaultValue: [] },
          { Component: StockProvider, defaultValue: [] },
          { Component: NotificationsProvider }
        ]
      }}
    />
  );
}

export default hot(module)(App);

import React from "react";
import { hot } from "react-hot-loader";
import { remote } from "electron";

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
// import { route as settings } from "./pages/settings";
import { route as stock } from "./pages/stock";

import { CartProvider } from "./pages/cart/context";
import { StockProvider } from "./pages/stock/context";
import { NotificationsProvider } from "./components/notifications";
import { initdb } from "./utils/database";

// Initialize i18n
import "./i18n";
// Initialize database
initdb();

function App() {
  return (
    <AppContainer
      ThemeProps={{
        palette: {
          primary,
          secondary,
          warning,
          type: remote.nativeTheme.shouldUseDarkColors ? "dark" : "light",
        },
      }}
      NotifyProps={{
        // anchorOrigin: { horizontal: "center", vertical: "bottom" },
        preventDuplicate: true,
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
          // settings,
          stock,
        ],
      }}
      WrapperProps={{
        Children: [
          { Component: CartProvider, defaultValue: [] },
          { Component: StockProvider, defaultValue: [] },
          { Component: NotificationsProvider },
        ],
      }}
    />
  );
}

export default hot(module)(App);

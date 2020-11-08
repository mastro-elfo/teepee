import React from "react";
import { hot } from "react-hot-loader";
// TODO: #1 uncomment next line
// import { remote } from "electron";

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
// TODO: #1 comment next line until some settings are needed
import { route as settings } from "./pages/settings";
import { route as stock } from "./pages/stock";

import { CartProvider } from "./pages/cart/context";
import { StockProvider } from "./pages/stock/context";
import { NotificationsProvider } from "./components/notifications";
import { loadPalette } from "./pages/settings/store";
import { initdb } from "./utils/database";

// Initialize i18n
import "./i18n";
// Initialize database
initdb();
// Load palette
// TODO: #1 remove next line
const palette = loadPalette({ type: "light" });

function App() {
  return (
    <AppContainer
      ThemeProps={{
        palette: {
          primary,
          secondary,
          warning,
          // TODO: #1 remove next line
          ...palette,
          // TODO: #1 uncomment next line
          // type: remote.nativeTheme.shouldUseDarkColors ? "dark" : "light",
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
          // TODO: #1 comment next line until some settings are needed
          settings,
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

import React, { useContext, useEffect } from "react";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";

import DarkIcon from "@material-ui/icons/Brightness4";
import LightIcon from "@material-ui/icons/Brightness7";
import SettingsIcon from "@material-ui/icons/Settings";

// TODO: Workaround
import { Context as PaletteContext } from "mastro-elfo-mui/dist/utils/usePalette";

import { storePalette } from "./settings/store";

function Component() {
  // const [palette, setPalette] = usePalette();
  const [palette, setPalette] = useContext(PaletteContext);

  // console.log(palette);

  useEffect(() => {
    storePalette(palette);
  }, [palette]);

  useEffect(() => {
    document.title = "Teepee - Impostazioni";
  }, []);

  const { type } = palette;
  const typeName = { dark: "Scuro", light: "Chiaro" }[type] || "Chiaro";

  const handleToggleThemeType = () => {
    setPalette({ ...palette, type: type === "dark" ? "light" : "dark" });
  };

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title="Torna indietro" />}>
          Impostazioni
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem
              button
              onClick={handleToggleThemeType}
              title="Inverti il tema"
            >
              <ListItemIcon>
                {type === "dark" ? <LightIcon /> : <DarkIcon />}
              </ListItemIcon>
              <ListItemText primary={typeName} secondary="Tema" />
            </ListItem>
          </List>
        </Content>
      }
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/settings",
  exact: true,
  component: Component
};

export const drawer = {
  key: "settings",
  primary: "Impostazioni",
  secondary: "",
  icon: <SettingsIcon />,
  title: "Apri le impostazioni"
};

import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import {
  BackIconButton,
  Content,
  Header,
  Page,
  usePalette,
} from "mastro-elfo-mui";

import DarkIcon from "@material-ui/icons/Brightness4";
import LightIcon from "@material-ui/icons/Brightness7";
import SettingsIcon from "@material-ui/icons/Settings";

import { storePalette } from "./settings/store";

function Component() {
  const { t } = useTranslation();

  const [palette, setPalette] = usePalette();

  useEffect(() => {
    storePalette(palette);
  }, [palette]);

  useEffect(() => {
    document.title = `Teepee - ${t("Settings:Header")}`;
  }, []);

  const { type } = palette;
  const typeName =
    { dark: t("Settings:Dark"), light: t("Settings:Light") }[type] ||
    t("Settings:Light");

  const handleToggleThemeType = () => {
    setPalette({ ...palette, type: type === "dark" ? "light" : "dark" });
  };

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title={t("Go Back")} />}>
          {t("Settings:Header")}
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem
              button
              onClick={handleToggleThemeType}
              title={t("Settings:Toggle theme")}
            >
              <ListItemIcon>
                {type === "dark" ? <LightIcon /> : <DarkIcon />}
              </ListItemIcon>
              <ListItemText
                primary={typeName}
                secondary={t("Settings:Theme")}
              />
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
  component: Component,
};

export const drawer = {
  key: "settings",
  primary: i18n.t("Settings:Header"),
  secondary: "",
  icon: <SettingsIcon />,
  title: i18n.t("Settings:drawer-title"),
};

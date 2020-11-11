import React, { useContext, useEffect } from "react";
// TODO: #1 remove locales
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";

import DarkIcon from "@material-ui/icons/Brightness4";
import LightIcon from "@material-ui/icons/Brightness7";
import SettingsIcon from "@material-ui/icons/Settings";

function Component() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `Teepee - ${t("Settings:Header")}`;
  }, []);

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title={t("Go Back")} />}>
          {t("Settings:Header")}
        </Header>
      }
      content={
        <Content>
          <List></List>
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

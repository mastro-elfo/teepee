import React, { useContext, useEffect, useState } from "react";
// TODO: #1 remove locales
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";

import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";

import { loadCurrency, storeCurrency } from "./settings/store";

import DarkIcon from "@material-ui/icons/Brightness4";
import LightIcon from "@material-ui/icons/Brightness7";
import SettingsIcon from "@material-ui/icons/Settings";

function Component() {
  const [currency, setCurrency] = useState(loadCurrency());
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `Teepee - ${t("Settings:Header")}`;
  }, []);

  useEffect(() => {
    storeCurrency(currency);
  }, [currency]);

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
            <ListItem>
              <TextField
                fullWidth
                label={t("Settings:Currency-label")}
                value={currency}
                onChange={({ target: { value } }) => setCurrency(value)}
              />
            </ListItem>
          </List>
        </Content>
      }
      TopFabProps={{ color: "primary", title: t("ToTop") }}
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

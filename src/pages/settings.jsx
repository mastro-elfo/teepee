import React, { useEffect } from "react";
import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";
import SettingsIcon from "@material-ui/icons/Settings";

function Component() {
  useEffect(() => {
    document.title = "Teepee - Impostazioni";
  });

  // TODO:
  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title="Torna indietro" />}>
          Impostazioni
        </Header>
      }
      content={<Content>Work in progress</Content>}
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

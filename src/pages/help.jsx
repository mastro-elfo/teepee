import React, { useEffect } from "react";
import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";
import HelpIcon from "@material-ui/icons/Help";

function Component() {
  useEffect(() => {
    document.title = "Teepee - Aiuto";
  }, []);

  // TODO:

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title="Torna indietro" />}>
          Aiuto
        </Header>
      }
      content={<Content>Work in progress</Content>}
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/help",
  exact: true,
  component: Component
};

export const drawer = {
  key: "help",
  primary: "Aiuto",
  secondary: "",
  icon: <HelpIcon />,
  title: "Aiuto"
};

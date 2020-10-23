import React, { useEffect } from "react";
import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";
import UpdateIcon from "@material-ui/icons/Update";

function Component() {
  useEffect(() => {
    document.title = "Teepee - Aggiornamenti";
  }, []);

  // TODO:

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title="Torna indietro" />}>
          Aggiornamenti
        </Header>
      }
      content={<Content>Work in progress</Content>}
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/update",
  exact: true,
  component: Component
};

export const drawer = {
  key: "update",
  primary: "Aggiornamenti",
  secondary: "",
  icon: <UpdateIcon />,
  title: "Controllo aggiornamenti"
};

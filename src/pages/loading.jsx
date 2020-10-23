import React, { useEffect } from "react";

import { CircularProgress } from "@material-ui/core";
import { Header, Page } from "mastro-elfo-mui";

export default function Component({ header = "Sto caricando..." }) {
  useEffect(() => {
    document.title = "Teepee - Caricamento";
  }, []);

  return (
    <Page
      header={
        <Header LeftAction={<CircularProgress color="secondary" />}>
          {header}
        </Header>
      }
    />
  );
}

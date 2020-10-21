import React from "react";
import { CircularProgress } from "@material-ui/core";
import { Header, Page } from "mastro-elfo-mui";

function Component() {
  useEffect(() => {
    document.title = "Teepee - Caricamento";
  });

  return (
    <Page
      header={
        <Header LeftAction={<CircularProgress color="secondary" />}>
          Carico...
        </Header>
      }
    />
  );
}

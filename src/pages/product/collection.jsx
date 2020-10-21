import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import {
  BackIconButton,
  Content,
  Header,
  Page,
  Push,
  SearchField,
  ResultList,
  pluralize
} from "mastro-elfo-mui";

import AddIcon from "@material-ui/icons/Add";
import PrintIcon from "@material-ui/icons/Print";

import { search } from "./model";
import subheader from "../../utils/subheader";

function Component() {
  const [results, setResults] = useState();

  useEffect(() => {
    document.title = "Teepee - Prodotti";
  });

  const handlePrint = () => window.print();

  const handleSearch = (q, d) =>
    search(d).then(r => {
      setResults(r);
    });

  const handleClear = () => setResults();

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title="Torna indietro" />}
          RightActions={[
            <IconButton
              key="print"
              title="Stampa il report"
              onClick={handlePrint}
            >
              <PrintIcon />
            </IconButton>,
            <Push
              key="create"
              Component={IconButton}
              href="/product/c"
              title="Crea un nuovo prodotto"
            >
              <AddIcon />
            </Push>
          ]}
        >
          Prodotti
        </Header>
      }
      content={
        <Content>
          <SearchField
            fullWidth
            label="Cerca"
            placeholder="Codice, nome o descrizione"
            onSearch={handleSearch}
            onClear={handleClear}
            SearchButtonProps={{ title: "Cerca" }}
            ClearButtonProps={{ title: "Cancella" }}
          />
          <ResultList mapper={mapper} results={results} subheader={subheader} />
        </Content>
      }
      print={<h1>{`// TODO: `}</h1>}
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/product",
  exact: true,
  component: Component
};

function mapper({ id, name, description, barcode }) {
  const { push } = useHistory();
  return {
    key: id,
    primary: name,
    secondary: description || barcode,
    onClick: () => push(`/product/v/${id}`),
    title: `Apri la scheda prodotto`
  };
}

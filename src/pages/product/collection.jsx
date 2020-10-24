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

import PrintDialogIconButton from "./print-dialog";
import PrintTable from "./print-table";
import { readAll, search } from "./model";
import subheader from "../../utils/subheader";
import background from "../../assets/product.svg";

function Component() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState();
  const [printList, setPrintList] = useState({ list: [], callback: () => {} });

  useEffect(() => {
    document.title = "Teepee - Prodotti";
  }, []);

  const handleCallback = back => {
    setTimeout(() => {
      window.print();
      setPrintList({ list: [], callback: () => {} });
      back();
    }, 0);
  };

  const handlePrint = (type, back) => {
    if (type === "partial") {
      setPrintList({
        list: results,
        callback: () => handleCallback(back)
      });
    } else if (type === "whole") {
      readAll().then(r => {
        setPrintList({
          list: r,
          callback: () => handleCallback(back)
        });
      });
    }
  };

  const handleSearch = (q, d) =>
    search(d).then(r => {
      setResults(r);
    });

  const handleClear = () => {
    setResults();
    setQuery("");
  };
  const handleChange = ({ target: { value } }) => setQuery(value);

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title="Torna indietro" />}
          RightActions={[
            <PrintDialogIconButton key="print" onConfirm={handlePrint} />,
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
            value={query}
            onChange={handleChange}
          />
          <ResultList mapper={mapper} results={results} subheader={subheader} />
        </Content>
      }
      print={<PrintTable {...printList} />}
      TopFabProps={{ color: "primary" }}
      PaperProps={{
        style: {
          minHeight: "100%",
          backgroundImage: `url(${background})`,
          backgroundSize: "50%",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat"
        }
      }}
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

import React, { createRef, useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import { IconButton, ListItemSecondaryAction } from "@material-ui/core";

import {
  BackIconButton,
  Content,
  Header,
  Page,
  ResultList,
  // SearchField,
  useSearchParams
} from "mastro-elfo-mui";

// TODO: Workaround
import SearchField from "../components/SearchField";

import AddBoxIcon from "@material-ui/icons/AddBox";
import CloseIcon from "@material-ui/icons/CheckCircle";
import MinusBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import StorageIcon from "@material-ui/icons/Storage";

import CloseDialog from "./stock/CloseDialog";
import { useStock } from "./stock/context";
import Table from "./stock/Table";
import { addStockProduct } from "./stock/utils";
import { search } from "./product/model";
import subheader from "../utils/subheader";

const ref = createRef();

function Component() {
  const { q } = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [stock, setStock] = useStock();
  const [results, setResults] = useState();
  const [query, setQuery] = useState(q);

  useEffect(() => {
    document.title = "Teepee - Magazzino";
    ref.current.focus();
  });

  const handleAdd = product => {
    setStock(addStockProduct(stock, product, 1));
    setResults();
    ref.current.focus();
    ref.current.select();
  };

  const handleSearch = (q, d) =>
    search(d).then(r => {
      if (r.length === 1) {
        const { name, barcode } = r[0];
        if (barcode === q) {
          handleAdd(r[0]);
          ref.current.focus();
          ref.current.select();
          enqueueSnackbar(`${name} aggiunto a magazzino`, { variant: "info" });
        } else {
          setResults(r);
        }
      } else {
        setResults(r);
      }
    });

  const handleClear = () => {
    setQuery("");
    setResults();
  };

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title="Torna indietro" />}
          RightActions={<CloseDialog />}
        >
          Magazzino
        </Header>
      }
      content={
        <Content>
          <SearchField
            fullWidth
            label="Cerca"
            placeholder="Codice, nome o descrizione"
            inputRef={ref}
            onSearch={handleSearch}
            onClear={handleClear}
            SearchButtonProps={{ title: "Cerca" }}
            ClearButtonProps={{ title: "Cancella" }}
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
          />
          <ResultList
            results={results}
            mapper={r => ({ ...mapper(r, stock, handleAdd) })}
            subheader={subheader}
          />
          <Table />
        </Content>
      }
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/stock",
  exact: true,
  component: Component
};

export const drawer = {
  key: "stock",
  primary: "Magazzino",
  secondary: "",
  icon: <StorageIcon />,
  title: "Gestione magazzino"
};

function mapper(product, stockList, handler) {
  const { id, name, description, barcode, stock } = product;
  const productInStock = stockList.find(i => i.id === product.id);

  return {
    key: id,
    primary: name,
    secondary: description || barcode,
    LeftIcon: <span>{productInStock ? productInStock.stock : stock}</span>,
    onClick: () => handler(product)
  };
}

import React, { createRef, useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import { IconButton, ListItemSecondaryAction } from "@material-ui/core";

import {
  BackIconButton,
  Content,
  Header,
  Page,
  ResultList,
  SearchField
} from "mastro-elfo-mui";

import AddBoxIcon from "@material-ui/icons/AddBox";
import CloseIcon from "@material-ui/icons/CheckCircle";
import MinusBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import StorageIcon from "@material-ui/icons/Storage";

import CloseDialog from "./stock/CloseDialog";
import { useStock } from "./stock/context";
import { search } from "./product/model";
import subheader from "../utils/subheader";

const ref = createRef();

function Component() {
  const { enqueueSnackbar } = useSnackbar();
  const [stock, setStock] = useStock();
  const [results, setResults] = useState();

  useEffect(() => {
    document.title = "Teepee - Magazzino";
    ref.current.focus();
  });

  const handleAdd = product => {
    const copy = stock.slice();
    const index = copy.findIndex(i => i.id === product.id);
    if (index !== -1) {
      if (copy[index].stock + 1 === product.stock) {
        copy.splice(index, 1);
      } else {
        copy[index].stock += 1;
      }
    } else {
      copy.push({ ...product, stock: product.stock + 1 });
    }
    setStock(copy);
    setResults();
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

  const handleClear = () => setResults();

  // TODO: Add table of changes

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
          />
          <ResultList results={results} mapper={mapper} subheader={subheader} />
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

function mapper(product) {
  const [stockList, setStock] = useStock();

  const productInStock = stockList.find(i => i.id === product.id);

  const handleAdd = product => {
    const copy = stockList.slice();
    const index = copy.findIndex(i => i.id === product.id);

    if (index !== -1) {
      if (copy[index].stock + 1 === product.stock) {
        copy.splice(index, 1);
      } else {
        copy[index].stock += 1;
      }
    } else {
      copy.push({ ...product, stock: product.stock + 1 });
    }
    setStock(copy);
  };

  const handleSubtract = product => {
    const copy = stockList.slice();
    const index = copy.findIndex(i => i.id === product.id);
    if (index !== -1) {
      if (copy[index].stock - 1 === product.stock) {
        copy.splice(index, 1);
      } else {
        copy[index].stock = Math.max(0, copy[index].stock - 1);
      }
    } else {
      copy.push({ ...product, stock: Math.max(0, product.stock - 1) });
    }
    setStock(copy);
  };

  const { id, name, description, barcode, stock } = product;

  return {
    key: id,
    primary: name,
    secondary: description || barcode,
    LeftIcon: <span>{productInStock ? productInStock.stock : stock}</span>,
    rightAction: (
      <ListItemSecondaryAction>
        <IconButton onClick={() => handleAdd(product)}>
          <AddBoxIcon />
        </IconButton>
        <IconButton onClick={() => handleSubtract(product)}>
          <MinusBoxIcon />
        </IconButton>
      </ListItemSecondaryAction>
    )
  };
}

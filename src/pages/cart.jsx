import React, { createRef, useEffect, useState } from "react";

// import { useSnackbar } from "notistack";

import {
  BackIconButton,
  Content,
  Header,
  Page,
  ResultList,
  SearchField
} from "mastro-elfo-mui";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import CloseDialog from "./cart/CloseDialog";
import Print from "./cart/Print";
import Table from "./cart/Table";
import { useCart } from "./cart/context";
import { total } from "./cart/utils";
import { search } from "./product/model";
import subheader from "../utils/subheader";

const ref = createRef();

function Component() {
  // const { enqueueSnackbar } = useSnackbar();
  const [cart, setCart] = useCart();
  const [results, setResults] = useState();

  useEffect(() => {
    document.title = "Teepee - Carrello";
    ref.current.focus();
  }, []);

  const handleAdd = product => {
    const copy = cart.slice();
    const index = copy.findIndex(i => i.id === product.id);
    if (index !== -1) {
      copy[index].quantity += 1;
    } else {
      copy.push({ ...product, quantity: 1 });
    }
    setCart(copy);
    setResults();
  };

  const handleSearch = (q, d) =>
    search(d).then(r => {
      if (r.length === 1) {
        const { barcode } = r[0];
        if (barcode === q) {
          // Exact match with barcode
          handleAdd(r[0]);
          ref.current.focus();
          ref.current.select();
          // TODO: finish
        } else {
          setResults(r);
        }
      } else {
        setResults(r);
      }
    });

  const handleClear = () => {
    setResults();
  };

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title="Torna indietro" />}
          RightActions={<CloseDialog />}
        >
          Totale spesa: {total(cart).toFixed(2)}€
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
          <ResultList
            results={results}
            mapper={r => ({ ...mapper(r), onClick: () => handleAdd(r) })}
            subheader={subheader}
            style={{ position: "absolute", width: "100%", background: "#fff" }}
          />
          <Table />
        </Content>
      }
      print={<Print />}
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/cart",
  exact: true,
  component: Component
};

export const drawer = {
  key: "cart",
  primary: "Carrello",
  secondary: "",
  icon: <ShoppingBasketIcon />,
  title: "Apri il carrello"
};

function mapper({ id, name, description, barcode }) {
  return {
    key: id,
    primary: name,
    secondary: description || barcode
  };
}

/*
[
  <IconButton
    key="print"
    title="Stampa ricevuta"
    onClick={handlePrint}
  >
    <PrintIcon />
  </IconButton>,
  ,
  <ConfirmDialogButton
    key="delete"
    isIcon
    onConfirm={handleDeleteAll}
    DialogProps={{
      title: "Svuota il carrello",
      content: [
        "Questa operazione elimina gli elementi dal carrello e non può essere annullata."
      ],
      confirm: "Elimina",
      cancel: "Annulla"
    }}
  >
    <DeleteForeverIcon />
  </ConfirmDialogButton>
]
 */

import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { IconButton, List, ListItem, TextField } from "@material-ui/core";

import {
  BackIconButton,
  Content,
  Header,
  Page,
  useSearchParams
} from "mastro-elfo-mui";

import SaveIcon from "@material-ui/icons/Save";

import { create, defaultValue } from "./model";

function Component() {
  const { replace } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const [model, setModel] = useState({ ...defaultValue, ...searchParams });

  useEffect(() => {
    document.title = "Teepee - Crea Prodotto";
  }, []);

  const handleSave = () => {
    create(model)
      .then(({ id }) => {
        replace(`/product/v/${id}`);
      })
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const { barcode, name, description, price, stock } = model;

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title="Torna indietro" />}
          RightActions={
            <IconButton title="Salva prodotto" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          }
        >
          Nuovo prodotto
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem>
              <TextField
                fullWidth
                label="Codice a barre"
                value={barcode}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, barcode: value })
                }
              />
            </ListItem>

            <ListItem>
              <TextField
                fullWidth
                label="Nome"
                value={name}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, name: value })
                }
              />
            </ListItem>

            <ListItem>
              <TextField
                fullWidth
                multiline
                rowsMax={2}
                label="Descrizione"
                value={description}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, description: value })
                }
              />
            </ListItem>

            <ListItem>
              <TextField
                fullWidth
                label="Prezzo"
                type="number"
                value={price}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, price: value })
                }
                onBlur={() =>
                  setModel({ ...model, price: Math.abs(parseFloat(price)) })
                }
                inputProps={{
                  min: 0
                }}
              />
            </ListItem>

            <ListItem>
              <TextField
                fullWidth
                label="Magazzino"
                type="number"
                value={stock}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, stock: value })
                }
                onBlur={() =>
                  setModel({ ...model, stock: Math.abs(parseInt(stock)) })
                }
                inputProps={{
                  min: 0
                }}
              />
            </ListItem>
          </List>
        </Content>
      }
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/product/c",
  exact: true,
  component: Component
};

import React, { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { IconButton, List, ListItem, TextField } from "@material-ui/core";

import {
  BackIconButton,
  Conditional,
  ConfirmDialogButton,
  Content,
  Header,
  Page
} from "mastro-elfo-mui";

import SaveIcon from "@material-ui/icons/Save";

import Loading from "../loading";
import { del, read, update } from "./model";

function Component() {
  const { enqueueSnackbar } = useSnackbar();
  const { go, goBack } = useHistory();
  const { id } = useParams();
  const [model, setModel] = useState();

  useEffect(() => {
    document.title = "Teepee - Modifica Prodotto";
  }, []);

  useEffect(() => {
    read(id)
      .then(data => {
        setModel(data);
      })
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, [id]);

  const handleSave = () => {
    update(id, model)
      .then(() => {
        goBack();
      })
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const handleDelete = () => {
    del(id)
      .then(({ name }) => {
        enqueueSnackbar(`${name} eliminato`, { variant: "success" });
        go(-2);
      })
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  if (!model) return <Loading header="Modifica prodotto" />;

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
          Modifica prodotto
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

            <ListItem>
              <ConfirmDialogButton
                variant="outlined"
                color="primary"
                title="Elimina definitivamente"
                onConfirm={handleDelete}
                DialogProps={{
                  title: "Vuoi davvero eliminare questo prodotto?",
                  content: [
                    "Una volta confermata l'operazione non può essere annullata. Un prodotto eliminato non può essere ripristinato, si consiglia di effettuare un backup."
                  ],
                  confirm: "Elimina",
                  cancel: "Annulla",
                  ConfirmButtonProps: { title: "Elimina" },
                  CancelButtonProps: { title: "Annulla" }
                }}
              >
                Elimina
              </ConfirmDialogButton>
            </ListItem>
          </List>
        </Content>
      }
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/product/e/:id",
  exact: true,
  component: Component
};

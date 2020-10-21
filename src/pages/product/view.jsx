import React, { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

import { IconButton, List, ListItem, ListItemText } from "@material-ui/core";

import { BackIconButton, Content, Header, Page, Push } from "mastro-elfo-mui";

import EditIcon from "@material-ui/icons/Edit";
import PrintIcon from "@material-ui/icons/Print";

import Details from "./details";
import Loading from "../loading";
import { read } from "./model";

function Component() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [model, setModel] = useState();

  useEffect(() => {
    document.title = "Teepee - Scheda Prodotto";
  });

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

  const handlePrint = () => window.print();

  if (!model) return <Loading header="Scheda prodotto" />;

  const { barcode, name, description, price, stock, _create, _update } = model;

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title="Torna indietro" />}
          RightActions={[
            <IconButton
              key="print"
              title="Stampa la scheda prodotto"
              onClick={handlePrint}
            >
              <PrintIcon />
            </IconButton>,
            <Push
              key="edit"
              href={`/product/e/${id}`}
              Component={IconButton}
              title="Modifica prodotto"
            >
              {" "}
              <EditIcon />
            </Push>
          ]}
        >
          Scheda prodotto
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem>
              <ListItemText primary={barcode} secondary="Codice a barre" />
            </ListItem>
            <ListItem>
              <ListItemText primary={name} secondary="Nome" />
            </ListItem>
            <ListItem>
              <ListItemText primary={description} secondary="Descrizione" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${price.toFixed(2)}€`}
                secondary="Prezzo"
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={stock} secondary="Magazzino" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={new Date(_create).toLocaleString()}
                secondary="Data di creazione"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  _update === 0 ? "Mai" : new Date(_update).toLocaleString()
                }
                secondary="Ultima modifica"
              />
            </ListItem>
          </List>
        </Content>
      }
      print={<Details {...model} />}
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/product/v/:id",
  exact: true,
  component: Component
};

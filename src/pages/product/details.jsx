import React, { Fragment } from "react";

import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

export default function Component({
  barcode,
  name,
  description,
  price,
  stock,
  _create,
  _update
}) {
  return (
    <Fragment>
      <Typography variant="h5">Scheda Prodotto</Typography>
      <Typography variant="h6" color="textSecondary">
        {name}
      </Typography>
      <Typography>{new Date().toLocaleString()}</Typography>

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
          <ListItemText primary={`${price.toFixed(2)}€`} secondary="Prezzo" />
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
            primary={new Date(_update).toLocaleString()}
            secondary="Ultima modifica"
          />
        </ListItem>{" "}
      </List>
    </Fragment>
  );
}

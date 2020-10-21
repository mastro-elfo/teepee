import React, { Fragment, useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core/";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import CloseIcon from "@material-ui/icons/CheckCircle";
import PrintIcon from "@material-ui/icons/Print";

import { useCart } from "./context";
import { update } from "../product/model";

export default function CloseDialog() {
  const { enqueueSnackbar } = useSnackbar();
  const [cart, setCart] = useCart();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    //
    Promise.all(
      cart.map(item => {
        const { id, quantity, stock } = item;
        const diff = stock - quantity;
        // TODO: if diff < 0 there is an error in the count
        // this can add a warning in dashboard
        return update(id, { ...item, stock: Math.max(0, diff) });
      })
    )
      .then(() => {
        setCart([]);
        setOpen(false);
        enqueueSnackbar("Il magazzino è stato aggiornato", { variant: "info" });
      })
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const handleDeleteAll = () => {
    setCart([]);
    setOpen(false);
  };

  const handlePrint = () => window.print();

  return (
    <Fragment>
      <IconButton
        key="close"
        onClick={() => setOpen(true)}
        disabled={cart.length === 0}
        title="Chiudi il conto"
      >
        <CloseIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Chiudi la spesa</DialogTitle>
        <DialogContent>
          <List>
            <ListItem button onClick={handlePrint} title="Stampa la ricevuta">
              <ListItemIcon>
                <PrintIcon />
              </ListItemIcon>
              <ListItemText primary="Stampa la ricevuta" secondary="" />
            </ListItem>

            <ListItem button onClick={handleClose} title="Chiudi la spesa">
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Chiudi la spesa"
                secondary="Aggiorna le quantità in magazzino"
              />
            </ListItem>

            <ListItem button onClick={handleDeleteAll} title="Annulla la spesa">
              <ListItemIcon>
                <DeleteForeverIcon />
              </ListItemIcon>
              <ListItemText
                primary="Annulla la spesa"
                secondary="Svuota il carrello senza aggiornare il magazzino"
              />
            </ListItem>
          </List>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            title="Annulla"
            onClick={() => setOpen(false)}
          >
            Annulla
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

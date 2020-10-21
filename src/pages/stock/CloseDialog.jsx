import React, { Fragment, useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import {
  Badge,
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

import { useStock } from "./context";
import { update } from "../product/model";

export default function CloseDialog() {
  const { enqueueSnackbar } = useSnackbar();
  const [stockList, setStock] = useStock();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    //
    Promise.all(stockList.map(item => update(item.id, item)))
      .then(() => {
        setStock([]);
        setOpen(false);
        enqueueSnackbar("Il magazzino è stato aggiornato", { variant: "info" });
      })
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  const handleDeleteAll = () => {
    setStock([]);
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton
        key="close"
        onClick={() => setOpen(true)}
        disabled={stockList.length === 0}
        title="Applica le modifiche"
      >
        <Badge color="secondary" badgeContent={stockList.length}>
          <CloseIcon />
        </Badge>
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Applica le modifiche</DialogTitle>
        <DialogContent>
          <List>
            <ListItem button onClick={handleClose} title="Applica le modifiche">
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Applica le modifiche"
                secondary="Aggiorna le quantità in magazzino"
              />
            </ListItem>

            <ListItem
              button
              onClick={handleDeleteAll}
              title="Scarta le modifiche"
            >
              <ListItemIcon>
                <DeleteForeverIcon />
              </ListItemIcon>
              <ListItemText
                primary="Scarta le modifiche"
                secondary="Non aggiorna il magazzino"
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

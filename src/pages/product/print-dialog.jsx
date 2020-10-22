import React, { Fragment, useEffect, useState } from "react";

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
} from "@material-ui/core";

import { AbsoluteCircularProgress, Loading } from "mastro-elfo-mui";

import WholeIcon from "@material-ui/icons/FormatListBulleted";
import PrintIcon from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";

export default function Component({
  onConfirm = (_, h) => {
    h();
  }
}) {
  const [open, setOpen] = useState(false);
  const [printing, setPrinting] = useState(false);

  const handleDone = () => {
    setPrinting(false);
    setOpen(false);
  };

  const handleConfirm = type => {
    setPrinting(type);
    onConfirm(type, handleDone);
  };

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <PrintIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Stampa la lista</DialogTitle>
        <DialogContent>
          <List>
            <ListItem
              button
              disabled={!!printing}
              onClick={() => handleConfirm("partial")}
            >
              <ListItemIcon>
                <SearchIcon />
                <Loading show={printing === "partial"}>
                  <AbsoluteCircularProgress
                    style={{ left: 0, right: "auto" }}
                  />
                </Loading>
              </ListItemIcon>
              <ListItemText
                primary="Risultati di ricerca"
                secondary="Stampa i risulati della ricerca attuale"
              />
            </ListItem>
            <ListItem
              button
              disabled={!!printing}
              onClick={() => handleConfirm("whole")}
            >
              <ListItemIcon>
                <WholeIcon />
                <Loading show={printing === "whole"}>
                  <AbsoluteCircularProgress
                    style={{ left: 0, right: "auto" }}
                  />
                </Loading>
              </ListItemIcon>
              <ListItemText
                primary="Elenco completo"
                secondary="Stampa tutti i prodotti presenti nel database"
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            title="Annulla"
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Annulla
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

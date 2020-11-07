import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  ListItemText,
} from "@material-ui/core/";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import PrintIcon from "@material-ui/icons/Print";

import { useStock } from "./context";
import { update } from "../product/model";

export default function CloseDialog() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [stockList, setStock] = useStock();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    // Close all changes and update db
    Promise.all(
      stockList.map(({ delta, stock, ...item }) =>
        // Update db with the new stock value
        update(item.id, { ...item, stock: Math.max(0, stock + delta) })
      )
    )
      .then(() => {
        setStock([]);
        setOpen(false);
        enqueueSnackbar(t("StockCloseDialog:stock-updated"), {
          variant: "info",
        });
      })
      .catch((err) => {
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
        title={t("StockCloseDialog:apply-changes")}
      >
        <Badge color="secondary" badgeContent={stockList.length}>
          <DoneIcon />
        </Badge>
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("StockCloseDialog:apply-changes")}</DialogTitle>
        <DialogContent>
          <List>
            <ListItem
              button
              onClick={handleClose}
              title={t("StockCloseDialog:apply-changes")}
            >
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("StockCloseDialog:apply-changes")}
                secondary={t("StockCloseDialog:update-stock-quantities")}
              />
            </ListItem>

            <ListItem
              button
              onClick={handleDeleteAll}
              title={t("StockCloseDialog:discard-changes")}
            >
              <ListItemIcon>
                <DeleteForeverIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("StockCloseDialog:discard-changes")}
                secondary={t("StockCloseDialog:dont-update-stock-quantities")}
              />
            </ListItem>
          </List>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            title={t("Cancel")}
            onClick={() => setOpen(false)}
          >
            {t("Cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

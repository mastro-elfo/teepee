import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  ListItemText,
} from "@material-ui/core/";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import PrintIcon from "@material-ui/icons/Print";

import { useCart } from "./context";
import { update } from "../product/model";
import { useStock } from "../stock/context";
import { addStockProduct } from "../stock/utils";
import { useNotifications } from "../../components/notifications";

export default function CloseDialog() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [_, pushNotification] = useNotifications();
  const [cart, setCart] = useCart();
  const [stockList, setStock] = useStock();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    //
    Promise.all(
      cart.map((item) => {
        const { id, quantity, stock, name, barcode } = item;
        const diff = stock - quantity;
        // if diff < 0 notify a warning in stock quantity
        if (diff < 0) {
          pushNotification({
            content: t("CartCloseDialog:warning-content", { name, barcode }),
            type: "warning",
            href: `/stock?q=${name}`,
          });
        }
        return update(id, { ...item, stock: Math.max(0, diff) });
      })
    )
      .then(() => {
        // Update pending stock quantity
        const copy = stockList.slice();
        cart.forEach((item) => {
          // Search item in pending list
          const index = copy.findIndex((i) => i.id === item.id);
          if (index !== -1) {
            // Update stock quantity in pending list
            const diff = item.stock - item.quantity;
            copy[index].stock = Math.max(0, diff);
          }
        });
        // Update pending list
        setStock(copy);
      })
      .then(() => {
        setCart([]);
        setOpen(false);
        enqueueSnackbar(t("CartCloseDialog:snackbar-content"), {
          variant: "info",
        });
      })
      .catch((err) => {
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
        title={t("CartCloseDialog:Button-title")}
      >
        <DoneIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("CartCloseDialog:Title")}</DialogTitle>
        <DialogContent>
          <List>
            <ListItem
              button
              onClick={handlePrint}
              title={t("CartCloseDialog:Print invoice")}
            >
              <ListItemIcon>
                <PrintIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("CartCloseDialog:Print invoice")}
                secondary=""
              />
            </ListItem>

            <ListItem
              button
              onClick={handleClose}
              title={t("CartCloseDialog:Close shopping")}
            >
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("CartCloseDialog:Close shopping")}
                secondary={t("CartCloseDialog:Update stock quantities")}
              />
            </ListItem>

            <ListItem
              button
              onClick={handleDeleteAll}
              title={t("CartCloseDialog:Cancel shopping")}
            >
              <ListItemIcon>
                <DeleteForeverIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("CartCloseDialog:Cancel shopping")}
                secondary={t(
                  "CartCloseDialog:Empty cart without update stock quantities"
                )}
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

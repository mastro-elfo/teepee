import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
} from "@material-ui/core";

import { AbsoluteCircularProgress, Loading } from "mastro-elfo-mui";

import WholeIcon from "@material-ui/icons/FormatListBulleted";
import PrintIcon from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";

export default function Component({
  onConfirm = (_, h) => {
    h();
  },
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [printing, setPrinting] = useState(false);

  const handleDone = () => {
    setPrinting(false);
    setOpen(false);
  };

  const handleConfirm = (type) => {
    setPrinting(type);
    onConfirm(type, handleDone);
  };

  return (
    <Fragment>
      <IconButton
        onClick={() => setOpen(true)}
        title={t("ProductPrintDialog:button-title")}
      >
        <PrintIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("ProductPrintDialog:dialog-title")}</DialogTitle>
        <DialogContent>
          <List>
            <ListItem
              button
              disabled={!!printing}
              onClick={() => handleConfirm("partial")}
              title={t("Print")}
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
                primary={t("ProductPrintDialog:partial-primary")}
                secondary={t("ProductPrintDialog:partial-secondary")}
              />
            </ListItem>
            <ListItem
              button
              disabled={!!printing}
              onClick={() => handleConfirm("whole")}
              title={t("Print")}
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
                primary={t("ProductPrintDialog:whole-primary")}
                secondary={t("ProductPrintDialog:whole-secondary")}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            title={t("Cancel")}
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            {t("Cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

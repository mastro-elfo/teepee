import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { IconButton, List, ListItem, TextField } from "@material-ui/core";

import {
  AbsoluteCircularProgress,
  BackIconButton,
  Conditional,
  ConfirmDialogButton,
  Content,
  Header,
  Loading,
  Page,
} from "mastro-elfo-mui";

import SaveIcon from "@material-ui/icons/Save";

import LoadingPage from "../loading";
import { del, read, update } from "./model";

function Component() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { go, goBack } = useHistory();
  const { id } = useParams();
  const [model, setModel] = useState();

  // Saving
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = `Teepee - ${t("ProductEdit:Header")}`;
  }, []);

  useEffect(() => {
    read(id)
      .then((data) => {
        setModel(data);
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, [id]);

  const handleSave = () => {
    setSaving(true);
    update(id, model)
      .then(() => {
        goBack();
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
        setSaving(false);
      });
  };

  const handleDelete = () => {
    del(id)
      .then(({ name }) => {
        // enqueueSnackbar(`${name} eliminato`, { variant: "success" });
        enqueueSnackbar(t("ProductEdit:product-deleted", { name }), {
          variant: "success",
        });
        go(-2);
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  if (!model) return <LoadingPage header={t("ProductEdit:Header")} />;

  const { barcode, name, description, price, stock } = model;

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title={t("Go Back")} />}
          RightActions={
            <IconButton
              title={t("Save")}
              onClick={handleSave}
              disabled={saving}
            >
              <SaveIcon />
              <Loading show={saving}>
                <AbsoluteCircularProgress color="secondary" />
              </Loading>
            </IconButton>
          }
        >
          {t("ProductEdit:Header")}
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem>
              <TextField
                fullWidth
                label={t("Product:Barcode")}
                value={barcode}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, barcode: value })
                }
              />
            </ListItem>

            <ListItem>
              <TextField
                fullWidth
                label={t("Product:Name")}
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
                label={t("Product:Description")}
                value={description}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, description: value })
                }
              />
            </ListItem>

            <ListItem>
              <TextField
                fullWidth
                label={t("Product:Price")}
                type="number"
                value={price}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, price: value })
                }
                onBlur={() =>
                  setModel({ ...model, price: Math.abs(parseFloat(price)) })
                }
                inputProps={{
                  min: 0,
                }}
              />
            </ListItem>

            <ListItem>
              <TextField
                fullWidth
                label={t("Product:Stock")}
                type="number"
                value={stock}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, stock: value })
                }
                onBlur={() =>
                  setModel({ ...model, stock: Math.abs(parseInt(stock)) })
                }
                inputProps={{
                  min: 0,
                }}
              />
            </ListItem>

            <ListItem>
              <ConfirmDialogButton
                variant="outlined"
                color="primary"
                title={t("ProductEdit:delete-product")}
                onConfirm={handleDelete}
                DialogProps={{
                  title: t("ProductEdit:delete-product-title"),
                  content: t("ProductEdit:delete-product-content"),
                  confirm: t("Delete"),
                  cancel: t("Cancel"),
                  ConfirmButtonProps: { title: t("Delete") },
                  CancelButtonProps: { title: t("Cancel") },
                }}
              >
                {t("Delete")}
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
  component: Component,
};

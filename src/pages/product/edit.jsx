import React, { useEffect, useState } from "react";

import { debounce } from "lodash";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";

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
import { del, read, readAll, update } from "./model";
import { loadCurrency } from "../settings/store";

function Component() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { go, goBack } = useHistory();
  // `id` from `useParams` is a string
  const { id: _id } = useParams();
  // Product model
  const [model, setModel] = useState();
  // Saving
  const [saving, setSaving] = useState(false);
  // Input Errors
  const [barcodeError, setBarcodeError] = useState(false);
  const hasError = [barcodeError].some((a) => a);
  // Explode properties
  const { id, barcode, name, description, price, stock } = model || {};
  // Currency
  const currency = loadCurrency();
  // Set title
  useEffect(() => {
    document.title = `Teepee - ${t("ProductEdit:Header")}`;
  }, []);
  // Read model data
  useEffect(() => {
    read(_id)
      .then((data) => {
        setModel(data);
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, [_id]);
  // Handle save click
  const handleSave = () => {
    setSaving(true);
    update(_id, model)
      .then(() => {
        goBack();
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
        setSaving(false);
      });
  };
  // Handle delete click
  const handleDelete = () => {
    del(_id)
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
  // Handle duplicate barcode check
  const handleBarcodeDuplicateError = debounce(
    () =>
      readAll()
        .then((r) =>
          // No duplicate if same `id`
          r.filter((item) => item.id !== id && item.barcode === barcode)
        )
        .then((r) => {
          if (r && r.length) {
            setBarcodeError(
              t("ProductCreate:BarcodeDuplicateError", { name: r[0].name })
            );
          }
        })
        .catch((err) => {
          console.error(err);
        }),
    300
  );
  // When `barcode` changes
  useEffect(() => {
    setBarcodeError(false);
    if (barcode) {
      // Check for duplicates
      handleBarcodeDuplicateError();
      return () => handleBarcodeDuplicateError.cancel();
    }
  }, [barcode]);
  // If model still not loaded display a loading page
  if (!model) return <LoadingPage header={t("ProductEdit:Header")} />;
  // Render
  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title={t("Go Back")} />}
          RightActions={
            // Save button
            <IconButton
              title={t("Save")}
              onClick={handleSave}
              disabled={hasError || saving}
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
            {/* Barcode */}
            <ListItem>
              <TextField
                fullWidth
                label={t("Product:Barcode")}
                value={barcode}
                onChange={({ target: { value } }) =>
                  setModel({ ...model, barcode: value })
                }
                error={!!barcodeError}
                helperText={barcodeError}
              />
            </ListItem>
            {/* Name */}
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
            {/* Description */}
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
            {/* Price */}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{currency}</InputAdornment>
                  ),
                }}
              />
            </ListItem>
            {/* Stock quantity */}
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
            {/* Delete button */}
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

// Route object
export const route = {
  path: "/product/e/:id",
  exact: true,
  component: Component,
};

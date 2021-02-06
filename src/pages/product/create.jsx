import React, { useEffect, useState } from "react";

import { debounce } from "lodash";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

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
  Content,
  Header,
  Loading,
  Page,
  useSearchParams,
} from "mastro-elfo-mui";

import SaveIcon from "@material-ui/icons/Save";

import { create, defaultValue, readAll } from "./model";
import { loadCurrency } from "../settings/store";

function Component() {
  const { t } = useTranslation();
  const { replace } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  // Product model
  const [model, setModel] = useState({ ...defaultValue, ...searchParams });
  // Saving
  const [saving, setSaving] = useState(false);
  // Input Errors
  const [barcodeError, setBarcodeError] = useState(false);
  const hasError = [barcodeError].some((a) => a);

  // Model properties
  const { barcode, name, description, price, stock } = model;
  // Currency
  const currency = loadCurrency();

  useEffect(() => {
    document.title = `Teepee - ${t("ProductCreate:Header")}`;
  }, []);

  const handleBarcodeDuplicateError = debounce(
    () =>
      readAll()
        .then((r) => r.filter((item) => item.barcode === barcode))
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

  useEffect(() => {
    setBarcodeError(false);
    if (barcode) {
      // Check for duplicates
      handleBarcodeDuplicateError();
      return () => handleBarcodeDuplicateError.cancel();
    }
  }, [barcode]);

  const handleSave = () => {
    setSaving(true);
    create(model)
      .then(({ id }) => {
        replace(`/product/v/${id}`);
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
        setSaving(false);
      });
  };

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title={t("Go Back")} />}
          RightActions={
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
          Nuovo prodotto
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
                error={!!barcodeError}
                helperText={barcodeError}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{currency}</InputAdornment>
                  ),
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
          </List>
        </Content>
      }
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/product/c",
  exact: true,
  component: Component,
};

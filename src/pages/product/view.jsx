import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

import { IconButton, List, ListItem, ListItemText } from "@material-ui/core";

import { BackIconButton, Content, Header, Page, Push } from "mastro-elfo-mui";

import EditIcon from "@material-ui/icons/Edit";
import PrintIcon from "@material-ui/icons/Print";

import Details from "./details";
import Loading from "../loading";
import { read } from "./model";
import { loadCurrency } from "../settings/store";

function Component() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [model, setModel] = useState();

  useEffect(() => {
    document.title = `Teepee - ${t("ProductView:Header")}`;
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

  const handlePrint = () => window.print();

  if (!model) return <Loading header="ProductView:Header" />;

  const { barcode, name, description, price, stock, _create, _update } = model;
  const currency = loadCurrency();

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title={t("Go Back")} />}
          RightActions={[
            <IconButton
              key="print"
              title={t("ProductView:Print-title")}
              onClick={handlePrint}
            >
              <PrintIcon />
            </IconButton>,
            <Push
              key="edit"
              href={`/product/e/${id}`}
              Component={IconButton}
              title={t("ProductView:Edit-title")}
            >
              <EditIcon />
            </Push>,
          ]}
        >
          {t("ProductView:Header")}
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem>
              <ListItemText
                primary={barcode}
                secondary={t("Product:Barcode")}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={name} secondary={t("Product:Name")} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={description}
                secondary={t("Product:Description")}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${price.toFixed(2)}${currency}`}
                secondary={t("Product:Price")}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={stock} secondary={t("Product:Stock")} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={new Date(_create).toLocaleString()}
                secondary={t("Product:Created")}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  _update === 0
                    ? t("Never")
                    : new Date(_update).toLocaleString()
                }
                secondary={t("Product:Updated")}
              />
            </ListItem>
          </List>
        </Content>
      }
      print={<Details {...model} />}
      TopFabProps={{ color: "primary", title: t("ToTop") }}
    />
  );
}

export const route = {
  path: "/product/v/:id",
  exact: true,
  component: Component,
};

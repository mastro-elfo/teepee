import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

export default function Component({
  barcode,
  name,
  description,
  price,
  stock,
  _create,
  _update,
}) {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Typography variant="h5">{t("ProductView:Header")}</Typography>
      <Typography variant="h6" color="textSecondary">
        {name}
      </Typography>
      <Typography>{new Date().toLocaleString()}</Typography>

      <List>
        <ListItem>
          <ListItemText primary={barcode} secondary={t("Product:Barcode")} />
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
            primary={`${price.toFixed(2)}€`}
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
            primary={new Date(_update).toLocaleString()}
            secondary={t("Product:Updated")}
          />
        </ListItem>
      </List>
    </Fragment>
  );
}

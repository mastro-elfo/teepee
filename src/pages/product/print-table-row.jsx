import React from "react";
import { useTranslation } from "react-i18next";

import { TableCell, TableRow } from "@material-ui/core";

import date2str from "../../utils/date2str";

export default function Row({
  barcode,
  currency,
  description,
  i,
  name,
  price,
  stock,
  _create,
  _update,
}) {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell>{i}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{barcode}</TableCell>
      <TableCell>
        {price.toFixed(2)}
        {currency}
      </TableCell>
      <TableCell>{stock}</TableCell>
      <TableCell>{date2str(_create, t("DateUnknown"))}</TableCell>
      <TableCell>{date2str(_update, t("DateUnknown"))}</TableCell>
    </TableRow>
  );
}

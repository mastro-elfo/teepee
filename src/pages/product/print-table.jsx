import React from "react";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { TableHeadCell } from "mastro-elfo-mui";

export default function Component({ list = [], callback = () => {} }) {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>{t("Product:Name")}</TableHeadCell>
            <TableHeadCell>{t("Product:Barcode")}</TableHeadCell>
            <TableHeadCell>{t("Product:Price")}</TableHeadCell>
            <TableHeadCell>{t("Product:Stock")}</TableHeadCell>
            <TableHeadCell>{t("Product:Created")}</TableHeadCell>
            <TableHeadCell>{t("Product:Updated")}</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <Row key={item.id} {...item} />
          ))}
          {callback()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ name, description, barcode, price, stock, _create, _update }) {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{barcode}</TableCell>
      <TableCell>{price.toFixed(2)}€</TableCell>
      <TableCell>{stock}</TableCell>
      <TableCell>{new Date(_create).toLocaleString()}</TableCell>
      <TableCell>{new Date(_update).toLocaleString()}</TableCell>
    </TableRow>
  );
}

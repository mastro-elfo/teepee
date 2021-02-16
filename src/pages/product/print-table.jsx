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

import Row from "./print-table-row";
import { loadCurrency } from "../settings/store";

export default function Component({ list = [], callback = () => {} }) {
  const { t } = useTranslation();

  const currency = loadCurrency();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>#</TableHeadCell>
            <TableHeadCell>{t("Product:Name")}</TableHeadCell>
            <TableHeadCell>{t("Product:Barcode")}</TableHeadCell>
            <TableHeadCell>{t("Product:Price")}</TableHeadCell>
            <TableHeadCell>{t("Product:Stock")}</TableHeadCell>
            <TableHeadCell>{t("Product:Created")}</TableHeadCell>
            <TableHeadCell>{t("Product:Updated")}</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item, i) => (
            <Row key={item.id} i={i} {...item} currency={currency} />
          ))}
          {callback()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

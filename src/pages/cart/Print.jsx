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

import { total, totalCount } from "./utils";
import { useCart } from "./context";
import { loadCurrency } from "../settings/store";

export default function CartTable() {
  const { t } = useTranslation();
  const [cart, setCart] = useCart();

  const currency = loadCurrency();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>{t("Product:Product")}</TableHeadCell>
            <TableHeadCell>{t("Product:Price")}</TableHeadCell>
            <TableHeadCell>{t("Product:Quantity")}</TableHeadCell>
            <TableHeadCell>{t("Product:Total")}</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>{t("Product:Total")}</TableCell>
            <TableCell> {totalCount(cart)}</TableCell>
            <TableCell>
              {total(cart).toFixed(2)}
              {currency}
            </TableCell>
          </TableRow>
        </TableFooter>
        <TableBody>
          {cart.map(({ id, name, price, quantity }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>
                {price.toFixed(2)}
                {currency}
              </TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>
                {(price * quantity).toFixed(2)}
                {currency}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

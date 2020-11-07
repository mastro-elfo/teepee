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

export default function CartTable() {
  const { t } = useTranslation();
  const [cart, setCart] = useCart();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>{t("Cart:Product")}</TableHeadCell>
            <TableHeadCell>{t("Cart:Price")}</TableHeadCell>
            <TableHeadCell>{t("Cart:Quantity")}</TableHeadCell>
            <TableHeadCell>{t("Cart:Total")}</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>{t("Cart:Product")}</TableCell>
            <TableCell> {totalCount(cart)}</TableCell>
            <TableCell>{total(cart).toFixed(2)}€</TableCell>
          </TableRow>
        </TableFooter>
        <TableBody>
          {cart.map(({ id, name, price, quantity }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{price.toFixed(2)}€</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>{(price * quantity).toFixed(2)}€</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

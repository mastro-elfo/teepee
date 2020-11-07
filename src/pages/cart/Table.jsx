import React from "react";
import { useTranslation } from "react-i18next";

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { TableHeadCell } from "mastro-elfo-mui";

import AddBoxIcon from "@material-ui/icons/AddBox";
import BackspaceIcon from "@material-ui/icons/Backspace";
import MinusBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

import { total, totalCount } from "./utils";
import { useCart } from "./context";

export default function CartTable() {
  const { t } = useTranslation();
  const [cart, setCart] = useCart();
  // console.log(cart);

  const handleAdd = (id) => {
    const copy = cart.slice();
    const index = copy.findIndex((i) => i.id === id);
    if (index !== -1) {
      copy[index].quantity += 1;
    }
    setCart(copy);
  };

  const handleSubtract = (id) => {
    const copy = cart.slice();
    const index = copy.findIndex((i) => i.id === id);
    if (index !== -1 && copy[index].quantity > 0) {
      copy[index].quantity -= 1;
    }
    setCart(copy);
  };

  const handleDelete = (id) => {
    const copy = cart.slice().filter((i) => i.id !== id);
    setCart(copy);
  };

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>{t("Product:Product")}</TableHeadCell>
              <TableHeadCell>{t("Product:Price")}</TableHeadCell>
              <TableHeadCell>{t("Product:Quantity")}</TableHeadCell>
              <TableHeadCell>{t("Product:Total")}</TableHeadCell>
              <TableHeadCell>{t("Product:Actions")}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>{t("Product:Total")}</TableCell>
              <TableCell> {totalCount(cart)}</TableCell>
              <TableCell>{total(cart).toFixed(2)}€</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
          <TableBody>
            {cart.map(({ id, name, price, quantity }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{price.toFixed(2)}€</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{(price * quantity).toFixed(2)}€</TableCell>
                <TableCell>
                  <IconButton title={t("Add")} onClick={() => handleAdd(id)}>
                    <AddBoxIcon />
                  </IconButton>
                  <IconButton
                    title={t("Subtract")}
                    onClick={() => handleSubtract(id)}
                  >
                    <MinusBoxIcon />
                  </IconButton>
                  <IconButton
                    title={t("Cart:Remove from cart")}
                    onClick={() => handleDelete(id)}
                    tabIndex={-1}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

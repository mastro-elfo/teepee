import React from "react";

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from "@material-ui/core";

import { TableHeadCell } from "mastro-elfo-mui";

import AddBoxIcon from "@material-ui/icons/AddBox";
import MinusBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import { total, totalCount } from "./utils";
import { useCart } from "./context";

export default function CartTable() {
  const [cart, setCart] = useCart();
  // console.log(cart);

  const handleAdd = id => {
    const copy = cart.slice();
    const index = copy.findIndex(i => i.id === id);
    if (index !== -1) {
      copy[index].quantity += 1;
    }
    setCart(copy);
  };

  const handleSubtract = id => {
    const copy = cart.slice();
    const index = copy.findIndex(i => i.id === id);
    if (index !== -1 && copy[index].quantity > 0) {
      copy[index].quantity -= 1;
    }
    setCart(copy);
  };

  const handleDelete = id => {
    const copy = cart.slice().filter(i => i.id !== id);
    setCart(copy);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Prodotto</TableHeadCell>
            <TableHeadCell>Prezzo</TableHeadCell>
            <TableHeadCell>Quantità</TableHeadCell>
            <TableHeadCell>Totale</TableHeadCell>
            <TableHeadCell>Azioni</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Totale</TableCell>
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
                <IconButton title="Aggiungi" onClick={() => handleAdd(id)}>
                  <AddBoxIcon />
                </IconButton>
                <IconButton title="Sottrai" onClick={() => handleSubtract(id)}>
                  <MinusBoxIcon />
                </IconButton>
                <IconButton
                  title="Rimuovi dal carrello"
                  onClick={() => handleDelete(id)}
                  tabIndex={-1}
                >
                  <RemoveShoppingCartIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

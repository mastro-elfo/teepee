import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from "@material-ui/core";

import { TableHeadCell } from "mastro-elfo-mui";

export default function Component({ list = [], callback = () => {} }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>Codice a barre</TableHeadCell>
            <TableHeadCell>Prezzo</TableHeadCell>
            <TableHeadCell>Magazzino</TableHeadCell>
            <TableHeadCell>Creato</TableHeadCell>
            <TableHeadCell>Modificato</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(item => (
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

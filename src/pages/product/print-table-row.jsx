import React from "react";

import { TableCell, TableRow } from "@material-ui/core";

export default function Row({
  name,
  description,
  barcode,
  price,
  stock,
  _create,
  _update,
  currency,
}) {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{barcode}</TableCell>
      <TableCell>
        {price.toFixed(2)}
        {currency}
      </TableCell>
      <TableCell>{stock}</TableCell>
      <TableCell>{new Date(_create).toLocaleString()}</TableCell>
      <TableCell>{new Date(_update).toLocaleString()}</TableCell>
    </TableRow>
  );
}

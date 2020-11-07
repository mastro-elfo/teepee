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

import { useStock } from "./context";
import { addStockProduct } from "./utils";

export default function StockTable() {
  const { t } = useTranslation();
  const [stock, setStock] = useStock();

  const handleDelete = (id) => {
    const copy = stock.slice().filter((i) => i.id !== id);
    setStock(copy);
  };

  const handleAdd = (product) => {
    setStock(addStockProduct(stock, product, 1));
  };

  const handleSubtract = (product) => {
    setStock(addStockProduct(stock, product, -1));
  };

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>{t("Product:Product")}</TableHeadCell>
              <TableHeadCell>{t("Product:Quantity")}</TableHeadCell>
              <TableHeadCell>{t("Product:Difference")}</TableHeadCell>
              <TableHeadCell colSpan={3}>{t("Product:Actions")}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableFooter></TableFooter>
          <TableBody>
            {stock.map((product) => {
              const { delta, id, name, stock } = product;

              return (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{stock + delta}</TableCell>
                  <TableCell>{`${delta > 0 ? "+" : ""}${delta}`}</TableCell>
                  <TableCell>
                    <IconButton
                      title={t("Add")}
                      onClick={() => handleAdd(product)}
                    >
                      <AddBoxIcon />
                    </IconButton>
                    <IconButton
                      title={t("Subtract")}
                      onClick={() => handleSubtract(product)}
                    >
                      <MinusBoxIcon />
                    </IconButton>
                    <IconButton
                      title={t("Delete row")}
                      onClick={() => handleDelete(id)}
                    >
                      <BackspaceIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

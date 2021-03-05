import React, { createRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";
// import { useSnackbar } from "notistack";
import delay from "../utils/delay";

import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import {
  BackIconButton,
  Content,
  Header,
  Page,
  // ResultList,
  SearchField,
  useSearchParams,
} from "mastro-elfo-mui";

import AddBoxIcon from "@material-ui/icons/AddBox";
import CloseIcon from "@material-ui/icons/CheckCircle";
import MinusBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import StorageIcon from "@material-ui/icons/Storage";

import { search } from "./product/model";
import CloseDialog from "./stock/CloseDialog";
import Table from "./stock/Table";
import { useStock } from "./stock/context";
import { addStockProduct } from "./stock/utils";
import background from "../assets/stock.svg";
import ResultList from "../components/result-list";
// import subheader from "../utils/subheader";

const ref = createRef();

function Component() {
  const { t } = useTranslation();
  const { q } = useSearchParams();
  // const { enqueueSnackbar } = useSnackbar();
  const [stock, setStock] = useStock();
  const [results, setResults] = useState();
  const [query, setQuery] = useState(q || "");

  useEffect(() => {
    document.title = `Teepee - ${t("Stock:Header")}`;
    ref.current.focus();
  }, []);

  const handleAdd = (product) => {
    setStock(addStockProduct(stock, product, 1));
    setResults();
    ref.current.focus();
    ref.current.select();
  };

  const handleSearch = (q, d) =>
    delay(0, search, d).then((r) => {
      if (!r) {
        setResults(r);
      } else if (r.length === 1) {
        const { name, barcode } = r[0];
        if (barcode === q) {
          handleAdd(r[0]);
          ref.current.focus();
          ref.current.select();
          // enqueueSnackbar(`${name} aggiunto a magazzino`, { variant: "info" });
        } else {
          setResults(r);
        }
      } else {
        setResults(r);
      }
    });

  const handleClear = () => {
    setQuery("");
    setResults();
  };

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title={t("Go Back")} />}
          RightActions={<CloseDialog />}
        >
          {t("Stock:Header")}
        </Header>
      }
      content={
        <Content>
          <SearchField
            fullWidth
            label={t("Search")}
            placeholder={t("Search-placeholder")}
            inputRef={ref}
            onSearch={handleSearch}
            onClear={handleClear}
            SearchButtonProps={{ title: t("Search") }}
            ClearButtonProps={{ title: t("Cancel") }}
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
          />
          <ResultList
            results={results}
            subheader={
              !!results && t("Product:subheader", { count: results.length })
            }
            Component={ResultItem}
            ComponentProps={{ handler: handleAdd }}
          />
          {stock.length > 0 && <Table />}
        </Content>
      }
      TopFabProps={{ color: "primary", title: t("ToTop") }}
      PaperProps={{
        style: {
          backgroundImage: `url(${background})`,
          backgroundSize: "50%",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        },
      }}
    />
  );
}

export const route = {
  path: "/stock",
  exact: true,
  component: Component,
};

export const drawer = {
  key: "stock",
  primary: i18n.t("Stock:Header"),
  secondary: "",
  icon: <StorageIcon />,
  title: i18n.t("Stock:drawer-title"),
};

function ResultItem({ handler, ...product }) {
  const { t } = useTranslation();
  const [stockList] = useStock();
  const { id, name, description, barcode, stock } = product;
  const productInStock = stockList.find((i) => i.id === product.id);
  return (
    <ListItem
      button={true}
      onClick={() => handler(product)}
      title={t("Stock:AddToStock")}
    >
      <ListItemIcon>
        {stock + (productInStock ? productInStock.delta : 0)}
      </ListItemIcon>
      <ListItemText primary={name} secondary={description || barcode} />
    </ListItem>
  );
}

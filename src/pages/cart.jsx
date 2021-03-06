import React, { createRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";

import { ListItem, ListItemText } from "@material-ui/core";

import {
  BackIconButton,
  Content,
  Header,
  Page,
  SearchField,
} from "mastro-elfo-mui";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import CloseDialog from "./cart/CloseDialog";
import Print from "./cart/Print";
import Table from "./cart/Table";
import { useCart } from "./cart/context";
import { total } from "./cart/utils";
import { search } from "./product/model";
import delay from "../utils/delay";
import background from "../assets/cart.svg";
import { loadCurrency } from "./settings/store";
import ResultList from "../components/result-list";

const ref = createRef();

function Component() {
  const { t } = useTranslation();
  const [cart, setCart] = useCart();
  const [results, setResults] = useState();
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = `Teepee - ${t("Cart:Title")}`;
    ref.current.focus();
  }, []);

  const handleAdd = (product) => {
    const copy = cart.slice();
    const index = copy.findIndex((i) => i.id === product.id);
    if (index !== -1) {
      copy[index].quantity += 1;
    } else {
      copy.push({ ...product, quantity: 1 });
    }
    setCart(copy);
    setResults();
    ref.current.focus();
    ref.current.select();
  };

  const handleSearch = (q, d) =>
    delay(0, search, d).then((r) => {
      if (!r) {
        setResults(r);
      } else if (r.length === 1) {
        const { barcode } = r[0];
        if (barcode === q) {
          // Exact match with barcode
          handleAdd(r[0]);
          ref.current.focus();
          ref.current.select();
        } else {
          setResults(r);
        }
      } else {
        setResults(r);
      }
    });

  const handleClear = () => {
    setResults();
    setQuery("");
  };
  const handleChange = ({ target: { value } }) => setQuery(value);

  const currency = loadCurrency();

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title={t("Go Back")} />}
          RightActions={<CloseDialog />}
        >
          {t("Cart:Header")}: {total(cart).toFixed(2)}
          {currency}
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
            onChange={handleChange}
          />
          <ResultList
            results={results}
            subheader={
              !!results && t("Product:subheader", { count: results.length })
            }
            Component={ResultItem}
            ComponentProps={{ handler: handleAdd }}
          />
          {cart.length > 0 && <Table />}
        </Content>
      }
      print={<Print />}
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
  path: "/cart",
  exact: true,
  component: Component,
};

export const drawer = {
  key: "cart",
  primary: i18n.t("Cart:drawer-primary"),
  secondary: "",
  icon: <ShoppingCartIcon />,
  title: i18n.t("Cart:drawer-title"),
};

function ResultItem({ handler, ...product }) {
  const { t } = useTranslation();
  const { name, description, barcode } = product;
  return (
    <ListItem
      button={true}
      onClick={() => handler(product)}
      title={t("Cart:AddToCart")}
    >
      <ListItemText primary={name} secondary={description || barcode} />
    </ListItem>
  );
}

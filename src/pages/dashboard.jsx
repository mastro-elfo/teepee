import React, { createRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Badge, Box, IconButton, Typography } from "@material-ui/core";

import {
  Content,
  DrawerIconButton,
  DrawerLists,
  Header,
  Page,
  Push,
  SearchField,
  pluralize,
} from "mastro-elfo-mui";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { drawer as about } from "./about";
import { drawer as backup } from "./backup";
import { drawer as cart } from "./cart";
import { drawer as help } from "./help";
import { drawer as product } from "./product";
import { drawer as settings } from "./settings";
import { drawer as stock } from "./stock";

import { useCart } from "./cart/context";
import { totalCount } from "./cart/utils";
import NoResults from "./dashboard/NoResults";
import ResultCard from "./dashboard/ResultCard";
import Notifications from "../components/notifications";
import { search } from "./product/model";
import { useStock } from "./stock/context";
// import subheader from "../utils/subheader";
import delay from "../utils/delay";
import background from "../assets/dashboard.svg";

const ref = createRef();

function Component() {
  const {
    location: { state = {} },
    push,
    replace,
  } = useHistory();
  const { t } = useTranslation();
  const [shoppingCart] = useCart();
  const [stockList] = useStock();
  const [results, setResults] = useState((state && state.results) || undefined);
  const [query, setQuery] = useState((state && state.q) || "");

  useEffect(() => {
    document.title = "Teepee";
    ref.current.focus();
  }, []);

  const handleSearch = (q, d) => {
    setQuery(q);
    return delay(0, search, d).then((r) => {
      setResults(r);
      replace({ state: { q, results: r } });
    });
  };

  const handleClear = () => {
    setResults();
    setQuery("");
    replace({ state: { q: "", results: undefined } });
  };

  return (
    <Page
      header={
        <Header
          LeftAction={
            <DrawerIconButton title={t("Dashboard:Open Menu")}>
              <DrawerLists
                lists={[
                  {
                    key: "pages",
                    header: t("Drawer:Pages"),
                    leftFill: true,
                    items: [
                      {
                        ...cart,
                        onClick: () => push("/cart"),
                        secondary:
                          shoppingCart.length > 0
                            ? t("Drawer:cart-secondary", {
                                count: shoppingCart.length,
                              })
                            : "",
                      },
                      {
                        ...stock,
                        onClick: () => push("/stock"),
                        secondary:
                          stockList.length > 0
                            ? t("Drawer:stock-secondary", {
                                count: stockList.length,
                              })
                            : "",
                      },
                      { ...product, onClick: () => push("/product") },
                    ],
                  },
                  {
                    key: "actions",
                    header: t("Drawer:Actions"),
                    leftFill: true,
                    items: [
                      { ...backup, onClick: () => push("/backup") },
                      { ...settings, onClick: () => push("/settings") },
                    ],
                  },
                  {
                    key: "application",
                    header: t("Drawer:Application"),
                    leftFill: true,
                    items: [
                      { ...help, onClick: () => push("/help") },
                      { ...about, onClick: () => push("/about") },
                    ],
                  },
                ]}
              />
            </DrawerIconButton>
          }
          RightActions={
            <Push href="/cart">
              <IconButton title={t("Dashboard:Open Cart")}>
                <Badge
                  color="secondary"
                  badgeContent={totalCount(shoppingCart)}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Push>
          }
        >
          {t("Dashboard:Header")}
        </Header>
      }
      content={
        <Content>
          <Notifications />

          <SearchField
            fullWidth
            label={t("Search")}
            placeholder={t("Search-placeholder")}
            onSearch={handleSearch}
            onClear={handleClear}
            inputRef={ref}
            SearchButtonProps={{ title: t("Search") }}
            ClearButtonProps={{ title: t("Cancel") }}
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
          />

          {!!results && results.length === 0 && <NoResults query={query} />}

          {!!results && results.length > 0 && (
            <Box px={2} pt={2}>
              <Typography variant="body2" color="textSecondary">
                {t("Product:subheader", { count: results.length })}
              </Typography>
            </Box>
          )}

          {!!results &&
            results.length > 0 &&
            results.map((item, i) => (
              <ResultCard
                key={`${item.id}-${i === 0}`}
                item={item}
                expand={i === 0}
              />
            ))}
        </Content>
      }
      TopFabProps={{ color: "primary", title: t("ToTop") }}
      PaperProps={{
        style: {
          // minHeight: "100%",
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
  path: "/",
  exact: true,
  component: Component,
};

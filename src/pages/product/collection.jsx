import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { IconButton, ListItem, ListItemText } from "@material-ui/core";

import {
  BackIconButton,
  Content,
  Header,
  Page,
  Push,
  SearchField,
  pluralize,
} from "mastro-elfo-mui";

import AddIcon from "@material-ui/icons/Add";

import ResultList from "../../components/result-list";
import PrintDialogIconButton from "./print-dialog";
import PrintTable from "./print-table";
import { readAll, search } from "./model";
import subheader from "../../utils/subheader";
import delay from "../../utils/delay";
import background from "../../assets/product.svg";

function Component() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState();
  const [printList, setPrintList] = useState({ list: [], callback: () => {} });

  useEffect(() => {
    document.title = `Teepee - ${t("ProductCollection:Header")}`;
  }, []);

  const handleCallback = (back) => {
    setTimeout(() => {
      window.print();
      setPrintList({ list: [], callback: () => {} });
      back();
    }, 0);
  };

  const handlePrint = (type, back) => {
    if (type === "partial") {
      setPrintList({
        list: results,
        callback: () => handleCallback(back),
      });
    } else if (type === "whole") {
      readAll().then((r) => {
        setPrintList({
          list: r,
          callback: () => handleCallback(back),
        });
      });
    }
  };

  const handleSearch = (q, d) =>
    delay(0, search, d).then((r) => {
      setResults(r);
    });

  const handleClear = () => {
    setResults();
    setQuery("");
  };
  const handleChange = ({ target: { value } }) => setQuery(value);

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton title={t("Go Back")} />}
          RightActions={[
            <PrintDialogIconButton key="print" onConfirm={handlePrint} />,
            <Push key="create" href="/product/c">
              <IconButton title={t("ProductCollection:add-title")}>
                <AddIcon />
              </IconButton>
            </Push>,
          ]}
        >
          {t("ProductCollection:Header")}
        </Header>
      }
      content={
        <Content>
          <SearchField
            fullWidth
            label={t("Search")}
            placeholder={t("Search-placeholder")}
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
          />
        </Content>
      }
      print={<PrintTable {...printList} />}
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
  path: "/product",
  exact: true,
  component: Component,
};

function ResultItem({ id, name, description, barcode }) {
  const { t } = useTranslation();
  const { push } = useHistory();
  return (
    <ListItem
      button={true}
      onClick={() => push(`/product/v/${id}`)}
      title={t("Product:OpenDetail")}
    >
      <ListItemText primary={name} secondary={description || barcode} />
    </ListItem>
  );
}

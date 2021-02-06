import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";

import { Button, IconButton } from "@material-ui/core";

import { BackIconButton, Content, Header, Page, Push } from "mastro-elfo-mui";
// import Markdown from "../components/Markdown";

import { H1, H2, H3, P, UL, LI, EM } from "./help/HelpContent";
import Loading from "./loading";

import AddIcon from "@material-ui/icons/Add";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import BackspaceIcon from "@material-ui/icons/Backspace";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import EditIcon from "@material-ui/icons/Edit";
import HelpIcon from "@material-ui/icons/Help";
import MenuIcon from "@material-ui/icons/Menu";
import MinusBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import PrintIcon from "@material-ui/icons/Print";
import SaveIcon from "@material-ui/icons/Save";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StorageIcon from "@material-ui/icons/Storage";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { NotificationAlert } from "../components/notifications";

function Component() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `Teepee - ${t("Help:Header")}`;
  }, []);

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title={t("Go Back")} />}>
          {t("Help:Header")}
        </Header>
      }
      content={
        <Content>
          <H1>{t("HelpContent:H1.0")}</H1>
          <H2>{t("HelpContent:H2.0")}</H2>
          <P>
            {t("HelpContent:P.0")} <MenuIcon fontSize="small" />
            {t("HelpContent:P.1")}
            <Push
              Component={Button}
              href="/product"
              color="primary"
              variant="contained"
              size="small"
              title={t("HelpContent:title.0")}
            >
              {t("HelpContent:Label.0")}
            </Push>
            {t("HelpContent:P.2")}
            <Push
              Component={IconButton}
              href="/product/c"
              color="primary"
              size="small"
              title={t("HelpContent:title.1")}
            >
              <AddIcon />
            </Push>
            .
          </P>
          <P>
            {t("HelpContent:P.3")} <SaveIcon fontSize="small" />.
          </P>

          <H2>{t("HelpContent:H2.1")}</H2>
          <P>
            {t("HelpContent:P.0")} <MenuIcon fontSize="small" />
            {t("HelpContent:P.1")}
            <Push
              Component={Button}
              href="/product"
              color="primary"
              variant="contained"
              size="small"
              title={t("HelpContent:title.0")}
            >
              {t("HelpContent:Label.0")}
            </Push>
            .
          </P>
          <P>{t("HelpContent:P.4")}</P>
          <P>
            {t("HelpContent:P.5")}
            <SaveIcon fontSize="small" />.
          </P>

          <H2>{t("HelpContent:H2.2")}</H2>
          <P>
            {t("HelpContent:P.0")} <MenuIcon fontSize="small" />
            {t("HelpContent:P.1")}
            <Push
              Component={Button}
              href="/product"
              color="primary"
              variant="contained"
              size="small"
              title={t("HelpContent:title.0")}
            >
              {t("HelpContent:Label.0")}
            </Push>
            .
          </P>
          <P>{t("HelpContent:P.4")}</P>
          <P>
            {t("HelpContent:P.6")}
            <Button variant="outlined" color="primary" size="small">
              Elimina
            </Button>
            .
          </P>

          <H1>{t("HelpContent:H1.1")}</H1>
          <H2>{t("HelpContent:H2.3")}</H2>
          <P>
            {t("HelpContent:P.0")}
            <MenuIcon fontSize="small" />
            {t("HelpContent:P.1")}
            <Push
              Component={Button}
              href="/cart"
              color="primary"
              variant="contained"
              size="small"
              title={t("HelpContent:title.2")}
            >
              {t("HelpContent:Label.1")}
            </Push>
            .
          </P>
          <P>{t("HelpContent:P.4")}</P>
          <P>{t("HelpContent:P.7")}</P>
          <P>
            {t("HelpContent:P.8")}
            <AddBoxIcon fontSize="small" /> <MinusBoxIcon fontSize="small" />{" "}
            <BackspaceIcon fontSize="small" />.
          </P>

          <H2>{t("HelpContent:H2.4")}</H2>
          <P>
            {t("HelpContent:P.0")}
            <MenuIcon fontSize="small" />
            {t("HelpContent:P.1")}
            <Push
              Component={Button}
              href="/cart"
              color="primary"
              variant="contained"
              size="small"
              title={t("HelpContent:title.2")}
            >
              {t("HelpContent:Label.1")}
            </Push>
            .
          </P>
          <P>
            {t("HelpContent:P.9")} <DoneIcon fontSize="small" />
            {t("HelpContent:P.10")}
          </P>
          <UL>
            <LI>
              <EM>{t("HelpContent:LI.0.0")}</EM>
              {t("HelpContent:LI.0.1")}
            </LI>
            <LI>
              <EM>{t("HelpContent:LI.1.0")}</EM>
              {t("HelpContent:LI.1.1")}
            </LI>
            <LI>
              <EM>{t("HelpContent:LI.2.0")}</EM>
              {t("HelpContent:LI.2.1")}
            </LI>
          </UL>

          <H1>{t("HelpContent:H1.2")}</H1>
          <H2>{t("HelpContent:H2.5")}</H2>
          <P>
            {t("HelpContent:P.0")}
            <MenuIcon fontSize="small" />
            {t("HelpContent:P.1")}
            <Push
              Component={Button}
              href="/stock"
              color="primary"
              variant="contained"
              size="small"
              title={t("HelpContent:title.2")}
            >
              {t("HelpContent:Label.2")}
            </Push>
            .
          </P>
          <P>{t("HelpContent:P.4")}</P>
          <P>{t("HelpContent:P.7")}</P>
          <P>{t("HelpContent:P.11")}</P>
          <P>
            {t("HelpContent:P.8")}
            <AddBoxIcon fontSize="small" /> <MinusBoxIcon fontSize="small" />{" "}
            <BackspaceIcon fontSize="small" />.
          </P>
          <P>
            {t("HelpContent:P.12")}
            <DoneIcon fontSize="small" />
            {t("HelpContent:P.10")}
          </P>
          <UL>
            <LI>
              <EM>{t("HelpContent:LI.3.0")}</EM>
              {t("HelpContent:LI.3.1")}
            </LI>
            <LI>
              <EM>{t("HelpContent:LI.4.0")}</EM>
              {t("HelpContent:LI.4.1")}
            </LI>
          </UL>

          <H1>{t("HelpContent:H1.3")}</H1>
          <H3>{t("HelpContent:H3.0")}</H3>
          <P>
            {t("HelpContent:P.13")}
            <MenuIcon fontSize="small" />
            {t("HelpContent:P.14")}
          </P>
          <P>
            {t("HelpContent:P.9")}
            <Push
              Component={IconButton}
              href="/cart"
              color="primary"
              size="small"
              ttle="Apri il carrello"
            >
              <ShoppingCartIcon />
            </Push>
            {t("HelpContent:P.15")}
          </P>
          <P>{t("HelpContent:P.16")}</P>
          <UL>
            <LI>
              <VisibilityIcon fontSize="small" />
              {t("HelpContent:LI.5")}
            </LI>
            <LI>
              <AddShoppingCartIcon fontSize="small" />
              {t("HelpContent:LI.6")}
            </LI>
            <LI>
              <StorageIcon fontSize="small" />
              {t("HelpContent:LI.7")}
            </LI>
          </UL>

          <P>{t("HelpContent:P.17")}</P>

          <NotificationAlert
            type="warning"
            content={t("CartCloseDialog:warning-content", {
              name: t("Product:Product"),
              barcode: "0123456789",
            })}
            handleOpen={() => {}}
            handleClose={() => {}}
          />

          <H1>{t("HelpContent:H1.4")}</H1>

          <H2>{t("HelpContent:H2.6")}</H2>

          <P>
            {t("HelpContent:P.0")}
            <MenuIcon fontSize="small" />
            {t("HelpContent:P.1")}
            <Push
              Component={Button}
              href="/settings"
              color="primary"
              variant="contained"
              size="small"
              title={t("HelpContent:title.3")}
            >
              {t("HelpContent:Label.3")}
            </Push>
            .
          </P>

          <P></P>
        </Content>
      }
      TopFabProps={{ color: "primary", title: t("ToTop") }}
    />
  );
}

export const route = {
  path: "/help",
  exact: true,
  component: Component,
};

export const drawer = {
  key: "help",
  primary: i18n.t("Help:Header"),
  icon: <HelpIcon />,
  title: i18n.t("Help:Header"),
};

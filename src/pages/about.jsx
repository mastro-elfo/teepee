import React, { useEffect } from "react";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";
import LogoIcon from "../assets/Logo";

import ChangelogCard from "./about/ChangelogCard";
import TopCard from "./about/TopCard";

function Component() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `Teepee - ${t("About:Header")}`;
  }, []);

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title="Torna indietro" />}>
          {t("About:Header")}
        </Header>
      }
      content={
        <Content>
          <TopCard />
          {t("Changelog:Changelog").map((item, i) => (
            <ChangelogCard key={i} {...item} />
          ))}
        </Content>
      }
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/about",
  exact: true,
  component: Component,
};

export const drawer = {
  key: "about",
  primary: i18n.t("About:Header"),
  secondary: "",
  icon: <LogoIcon style={{ stroke: "#ff9800" }} />,
  title: i18n.t("About:drawer-title"),
};

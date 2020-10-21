import React, { useEffect } from "react";
import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";
import LogoIcon from "../assets/Logo";

import ChangelogCard from "./about/ChangelogCard";
import TopCard from "./about/TopCard";
import changelog from "./about/changelog.json";

function Component() {
  useEffect(() => {
    document.title = "Teepee - Informazioni";
  });

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title="Torna indietro" />}>
          Informazioni
        </Header>
      }
      content={
        <Content>
          <TopCard />
          {changelog.map((item, i) => (
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
  component: Component
};

export const drawer = {
  key: "about",
  primary: "Informazioni",
  secondary: "",
  icon: <LogoIcon style={{ stroke: "#ff9800" }} />,
  title: "Informazioni sull'applicazione"
};

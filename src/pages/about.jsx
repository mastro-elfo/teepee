/*
This file prints the "About" page that displays informations about the application.

Informations are License, attributions, source code and changelog.
 */

import React, { useEffect, useState } from "react";
import i18n from "../utils/i18n";
import { useTranslation } from "react-i18next";

import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";
import LogoIcon from "../assets/Logo";

import ChangelogCard from "./about/ChangelogCard";
import TopCard from "./about/TopCard";

function Component() {
  // Translation function
  const { t } = useTranslation();
  // Changelog array, starts with `{skeleton: true}` items to display Skeletons while loading
  const [changelog, setChangelog] = useState(Array(3).fill({ skeleton: true }));
  // Set document title
  useEffect(() => {
    document.title = `Teepee - ${t("About:Header")}`;
  }, []);
  // Fetch changelog from server
  useEffect(() => {
    // Fetch from server
    fetch(
      `https://teepee-management.sourceforge.io/api/changelog/${i18n.language}`
    )
      .then((r) => {
        // Straightforward: if ok, get JSON, otherwise throw error
        if (r.ok) return r.json();
        throw new Error(r.statusText);
      })
      .then((changelog) => {
        // Check if changelog is an array
        if (changelog && changelog.map) {
          setChangelog(changelog);
        } else {
          throw new Error("Changelog is not a valid array");
        }
      })
      .catch((err) => {
        // No need to inform user about errors here
        console.error(err);
        // Set empty array to hide skeletons
        setChangelog([]);
      });
  }, []);
  // Render
  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title={t("Go Back")} />}>
          {t("About:Header")}
        </Header>
      }
      content={
        <Content>
          {/* General info about the app */}
          <TopCard />
          {/* Changelog list */}
          {!!changelog &&
            changelog.map &&
            changelog.map((item, i) => <ChangelogCard key={i} {...item} />)}
        </Content>
      }
      TopFabProps={{ color: "primary", title: t("ToTop") }}
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

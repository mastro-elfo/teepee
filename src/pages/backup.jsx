import React, { useEffect, useState } from "react";
import { remote } from "electron";
import { promises } from "fs";
import { useSnackbar } from "notistack";
import path from "path";
import { prefix } from "prefix-si";
import i18n from "../utils/i18n";
import { useTranslation } from "react-i18next";

import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";

import BackupIcon from "@material-ui/icons/Backup";
import SaveBackupIcon from "@material-ui/icons/CloudDownload";
import RestoreBackupIcon from "@material-ui/icons/Restore";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { filename, resetdb, stat } from "../utils/database";

const defaultPath = path.join(remote.app.getPath("documents"), "teepee.backup");

function Component() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [size, setSize] = useState();

  useEffect(() => {
    document.title = `Teepee - ${t("Backup:Header")}`;
  }, []);

  useEffect(() => {
    stat().then(({ size }) => setSize(size));
  }, []);

  const handleSave = () => {
    remote.dialog
      .showSaveDialog({
        title: t("Backup:Save backup"),
        defaultPath,
      })
      .then(({ canceled, filePath }) => {
        if (!canceled) {
          return promises.copyFile(filename, filePath).then(() => {
            enqueueSnackbar(t("Backup:Backup saved"), { variant: "success" });
          });
        }
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
  };

  const handleRestore = () => {
    remote.dialog
      .showOpenDialog({
        title: t("Backup:Restore backup"),
        defaultPath,
      })
      .then(({ canceled, filePaths }) => {
        if (!canceled && filePaths.length > 0) {
          return promises
            .readFile(filePaths[0])
            .then((content) => {
              const json = JSON.parse(content);
              if (json.lastid === undefined || json.product === undefined) {
                throw new Error(t("Backup:Invalid backup"));
              }
            })
            .then(() => promises.copyFile(filePaths[0], filename))
            .then(() => stat().then(({ size }) => setSize(size)))
            .then(() => resetdb())
            .then(() => {
              enqueueSnackbar(t("Backup:Backup restored"), {
                variant: "success",
              });
            });
        }
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
  };

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title={t("Go Back")} />}>
          {t("Backup:Header")}
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem
              button
              title={t("Backup:Save backup")}
              onClick={handleSave}
            >
              <ListItemIcon>
                <SaveBackupIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("Backup:Save backup")}
                secondary={size !== undefined ? prefix(size, "B") : ""}
              />
            </ListItem>

            <ListItem
              button
              title={t("Backup:Restore backup")}
              onClick={handleRestore}
            >
              <ListItemIcon>
                <RestoreBackupIcon />
              </ListItemIcon>
              <ListItemText primary={t("Backup:Restore backup")} />
            </ListItem>
          </List>
        </Content>
      }
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/backup",
  exact: true,
  component: Component,
};

export const drawer = {
  key: "backup",
  primary: i18n.t("Backup:Header"),
  secondary: "",
  icon: <BackupIcon />,
  title: i18n.t("Backup:drawer-title"),
};

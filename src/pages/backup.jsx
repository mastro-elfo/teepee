import React, { useEffect, useState } from "react";

import { remote } from "electron";
import { promises } from "fs";
import { useSnackbar } from "notistack";
import path from "path";
import { prefix } from "prefix-si";

import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";

import BackupIcon from "@material-ui/icons/Backup";
import SaveBackupIcon from "@material-ui/icons/CloudDownload";
import RestoreBackupIcon from "@material-ui/icons/Restore";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { resetdb } from "./product/model";
import { filename, stat } from "../database";

const defaultPath = path.join(remote.app.getPath("documents"), "teepee.backup");

function Component() {
  const { enqueueSnackbar } = useSnackbar();
  const [size, setSize] = useState();

  useEffect(() => {
    document.title = "Teepee - Backup";
  }, []);

  useEffect(() => {
    stat().then(({ size }) => setSize(size));
  }, []);

  const handleSave = () => {
    remote.dialog
      .showSaveDialog({
        title: "Salva backup",
        defaultPath
      })
      .then(({ canceled, filePath }) => {
        if (!canceled) {
          return promises.copyFile(filename, filePath).then(() => {
            enqueueSnackbar("Backup salvato", { variant: "success" });
          });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: "error" }));
  };

  const handleRestore = () => {
    remote.dialog
      .showOpenDialog({
        title: "Ripristina backup",
        defaultPath
      })
      .then(({ canceled, filePaths }) => {
        if (!canceled && filePaths.length > 0) {
          return promises
            .readFile(filePaths[0])
            .then(content => {
              const json = JSON.parse(content);
              if (json.lastid === undefined || json.product === undefined) {
                throw new Error("Backup non valido");
              }
            })
            .then(() => promises.copyFile(filePaths[0], filename))
            .then(() => stat().then(({ size }) => setSize(size)))
            .then(() => resetdb())
            .then(() => {
              enqueueSnackbar("Backup ripristinato", { variant: "success" });
            });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: "error" }));
  };

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title="Torna indietro" />}>
          Backup
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem button title="Crea un backup" onClick={handleSave}>
              <ListItemIcon>
                <SaveBackupIcon />
              </ListItemIcon>
              <ListItemText
                primary="Salva backup"
                secondary={size !== undefined ? prefix(size, "B") : ""}
              />
            </ListItem>

            <ListItem
              button
              title="Ripristina un backup"
              onClick={handleRestore}
            >
              <ListItemIcon>
                <RestoreBackupIcon />
              </ListItemIcon>
              <ListItemText primary="Ripristina backup" />
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
  component: Component
};

export const drawer = {
  key: "backup",
  primary: "Backup",
  secondary: "",
  icon: <BackupIcon />,
  title: "Crea/Ripristina Backup"
};

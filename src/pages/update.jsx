import React, { useEffect, useState } from "react";

import path from "path";
import { remote, shell } from "electron";
// BUG: There is a problem with fs-extra when app is packaged
import fs from "electron-fs-extra";
import { useSnackbar } from "notistack";

import {
  AbsoluteCircularProgress,
  BackIconButton,
  Content,
  Header,
  Loading,
  Page
} from "mastro-elfo-mui";

import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import GetAppIcon from "@material-ui/icons/GetApp";
import ReloadIcon from "@material-ui/icons/Replay";
import UpdateIcon from "@material-ui/icons/Update";

import { maj, version } from "../version.json";

function Component() {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState();
  const [downloaded, setDownloaded] = useState(false);
  const [didSave, setDidSave] = useState(undefined);

  const [latest, setLatest] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    document.title = "Teepee - Aggiornamenti";
  }, []);

  useEffect(() => {
    if (url) {
      // Watch download directory if a `path.basename(url)` file is created
      const watcher = fs.watch(
        remote.app.getPath("downloads"),
        (eventType, filename) => {
          if (eventType === "rename" && filename === path.basename(url)) {
            // User choosed to save
            setDidSave(true);
          }
        }
      );
      return () => watcher.close();
    }
  }, [url]);

  const handleLatest = () => {
    setLoading(true);
    setLatest();
    setDownloaded(false);
    fetch(
      `https://www.mastro-elfo.it/app/repos/api/repos/teepee/deb/latest/${maj}`
    )
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Response error");
      })
      .then(({ version, url }) => {
        // console.log("Latest", version);
        setLatest(version);
        setUrl(url);
      })
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDownload = () => {
    setDownloaded(true);
    shell.openExternal(url);
  };

  const handleOpen = () => {
    shell.openPath(
      path.join(remote.app.getPath("downloads"), path.basename(url))
    );
  };

  // Check if latest is newer than current
  const isNewer = !!latest ? compare(version, latest) : undefined;

  return (
    <Page
      header={
        <Header LeftAction={<BackIconButton title="Torna indietro" />}>
          Aggiornamenti
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem
              button
              onClick={handleLatest}
              disabled={loading}
              title="Clicca per controllare se ci sono aggiornamenti"
            >
              <ListItemIcon>
                <Loading show={loading}>
                  <AbsoluteCircularProgress />
                </Loading>
                {!!latest ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </ListItemIcon>{" "}
              <ListItemText
                primary="Controlla aggiornamenti"
                secondary="Clicca qui"
              />
            </ListItem>
            {isNewer === false && (
              <ListItem>
                <ListItemIcon>
                  <CheckBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Già aggiornato" />
              </ListItem>
            )}
            {!!isNewer && (
              <ListItem
                button
                onClick={handleDownload}
                title="Clicca per scaricare la nuova versione"
              >
                <ListItemIcon>
                  <GetAppIcon />
                </ListItemIcon>
                <ListItemText primary="Scarica la nuova versione" />
              </ListItem>
            )}
            {!!didSave && (
              <ListItem
                button
                onClick={handleOpen}
                title="Clicca per avviare l'aggiornamento"
              >
                <ListItemIcon>
                  <FolderOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Avvia l'aggiornamento" />
              </ListItem>
            )}
            {!!downloaded && (
              <ListItem>
                <ListItemIcon>
                  <ReloadIcon />
                </ListItemIcon>
                <ListItemText primary="Quando l'installazione è completata, riavvia l'app" />
              </ListItem>
            )}
          </List>
        </Content>
      }
      TopFabProps={{ color: "primary" }}
    />
  );
}

export const route = {
  path: "/update",
  exact: true,
  component: Component
};

export const drawer = {
  key: "update",
  primary: "Aggiornamenti",
  secondary: "",
  icon: <UpdateIcon />,
  title: "Controllo aggiornamenti"
};

function compare(current, latest) {
  const [cmaj, cmin, cbuild] = current.split(".").map(x => parseInt(x));
  const [lmaj, lmin, lbuild] = latest.split(".").map(x => parseInt(x));
  return (
    lmaj > cmaj ||
    (lmaj === cmaj && (lmin > cmin || (lmin === cmin && lbuild > cbuild)))
  );
}

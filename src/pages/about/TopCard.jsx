import React from "react";
import { useTranslation } from "react-i18next";
import { remote, shell } from "electron";

import LogoIcon from "../../assets/Logo";

import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";

import { ConfirmDialogButton } from "mastro-elfo-mui";

export default function Component() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <LogoIcon style={{ stroke: "#ff9800" }} />
          </Avatar>
        }
        title={`Teepee (${remote.app.getVersion()})`}
        subheader={t("About:description")}
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {t("About:license-header")}
        </Typography>
        <ConfirmDialogButton
          variant="contained"
          color="primary"
          size="small"
          DialogProps={{
            title: t("License"),
            content: license.split("\n"),
            confirm: t("Read"),
            ConfirmButtonProps: { title: t("Read") },
          }}
          title={t("Read-it")}
        >
          {t("Read-it")}
        </ConfirmDialogButton>
      </CardContent>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {t("About:open-source")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            shell.openExternal("https://github.com/mastro-elfo/teepee")
          }
          title={t("About:code-button-title")}
        >
          {t("About:code-button-label")}
        </Button>
      </CardContent>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {t("Development")}
        </Typography>
        <Typography>Francesco Michienzi</Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {t("Attributions")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => shell.openExternal("https://undraw.co")}
          title={t("About:undraw-button-title")}
        >
          unDraw
        </Button>
      </CardContent>
    </Card>
  );
}

const license = `
Copyright (c) 2020 Francesco Michienzi
Permission is hereby granted, free of charge, to any personobtaining a copy of this software and associated documentationfiles (the "Software"), to deal in the Software withoutrestriction, including without limitation the rights to use,copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom theSoftware is furnished to do so, subject to the followingconditions:
The above copyright notice and this permission notice shall beincluded in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIESOF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE ANDNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHTHOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISINGFROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OROTHER DEALINGS IN THE SOFTWARE.
`;

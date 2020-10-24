import React from "react";
import LogoIcon from "../../assets/Logo";

import { shell } from "electron";

import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography
} from "@material-ui/core";

import { ConfirmDialogButton } from "mastro-elfo-mui";

import { version } from "../../version.json";

export default function Component() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <LogoIcon style={{ stroke: "#ff9800" }} />
          </Avatar>
        }
        title={`Teepee (${version})`}
        subheader="Applicazione gestionale rivolto alle associazioni che promuovono commercio equo e solidale"
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Software distribuito con licenza MIT{" "}
        </Typography>
        <ConfirmDialogButton
          variant="contained"
          color="primary"
          size="small"
          DialogProps={{
            title: "Licenza",
            content: license.split("\n"),
            confirm: "Letto"
          }}
        >
          Leggi
        </ConfirmDialogButton>
      </CardContent>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Software OpenSource{" "}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            shell.openExternal("https://github.com/mastro-elfo/teepee")
          }
        >
          Codice
        </Button>
      </CardContent>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Sviluppatore
        </Typography>
        <Typography>Francesco Michienzi</Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Immagini
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => shell.openExternal("https://undraw.co")}
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

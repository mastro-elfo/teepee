import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { CircularProgress } from "@material-ui/core";
import { Header, Page } from "mastro-elfo-mui";

export default function Component({ header = "Loading:Header" }) {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("Loading");
  }, []);

  return (
    <Page
      header={
        <Header LeftAction={<CircularProgress color="secondary" />}>
          {t(header)}
        </Header>
      }
    />
  );
}

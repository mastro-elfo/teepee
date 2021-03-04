import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";

// import { Condition } from "mastro-elfo-mui";

export default function ResultList({ Component, results, subheader }) {
  const { push } = useHistory();
  const { t } = useTranslation();
  const [scrollLimit, setScrollLimit] = useState(10);

  useEffect(() => {
    setScrollLimit(10);
  }, [results]);

  const handleNext = () => setScrollLimit(scrollLimit + 10);

  if (results === null || results === undefined) return null;

  return (
    <List
      subheader={
        <ListSubheader>
          {t("Product:subheader", { count: results.length })}
        </ListSubheader>
      }
    >
      <InfiniteScroll
        dataLength={scrollLimit}
        next={handleNext}
        hasMore={scrollLimit < results.length}
      >
        {results.slice(0, scrollLimit).map(({ id, ...rest }) => (
          <Component key={id} id={id} {...rest} />
        ))}
      </InfiniteScroll>
    </List>
  );
}
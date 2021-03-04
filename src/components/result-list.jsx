import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroll-component";

import { List, ListSubheader } from "@material-ui/core";

export default function ResultList({ Component, results, subheader }) {
  const [scrollLimit, setScrollLimit] = useState(10);

  useEffect(() => {
    setScrollLimit(10);
  }, [results]);

  const handleNext = () => setScrollLimit(scrollLimit + 10);

  if (results === null || results === undefined) return null;

  return (
    <List subheader={<ListSubheader>{subheader}</ListSubheader>}>
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

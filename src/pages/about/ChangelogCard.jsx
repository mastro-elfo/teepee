import React from "react";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography
} from "@material-ui/core";

import { NestedListTypography } from "mastro-elfo-mui";

export default function Component({ version, date, content }) {
  return (
    <Box py={1}>
      <Card>
        <CardHeader title={version} subheader={date} />
        <CardContent>
          {content.map((item, i) => {
            if (typeof item === "string") {
              return <Typography key={i}>{item}</Typography>;
            } else if (typeof item === "object" && item.map) {
              return (
                <NestedListTypography key={i}>{item}</NestedListTypography>
              );
            } else {
              return null;
            }
          })}
        </CardContent>
      </Card>
    </Box>
  );
}

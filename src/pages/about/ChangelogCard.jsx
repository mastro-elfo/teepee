import React from "react";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { NestedListTypography } from "mastro-elfo-mui";

export default function Component({ version, date, content, skeleton }) {
  // If skeleton is true, use Skeleton component
  if (skeleton) {
    version = <Skeleton variant="text" width="3em" />;
    date = <Skeleton variant="text" width="9em" />;
    content = Array(3).fill(<Skeleton />);
  }
  // Render
  return (
    <Box py={1}>
      <Card>
        {/* Header */}
        <CardHeader title={version} subheader={date} />
        {/* Content */}
        <CardContent>
          {/* NestedListTypography from version 2 should have this behaviour */}
          {content.map((item, i) => {
            if (typeof item === "string" || item.type === Skeleton) {
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

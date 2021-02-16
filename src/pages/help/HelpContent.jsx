import React, { Fragment } from "react";

import { Box, Button, IconButton, Typography } from "@material-ui/core";
import { Push } from "mastro-elfo-mui";

export function H1({ children }) {
  return (
    <Box borderBottom="1px solid" mt={1}>
      <Typography variant="h5">{children}</Typography>
    </Box>
  );
}

export function H2({ children }) {
  return <Typography variant="h6">{children}</Typography>;
}

export function H3({ children }) {
  return (
    <Typography variant="h6" color="textSecondary">
      {children}
    </Typography>
  );
}

export function P({ children }) {
  return <Typography paragraph>{children}</Typography>;
}

export function EM({ children }) {
  return (
    <Typography
      component="strong"
      style={{ fontWeight: "bold" }}
      variant="inherit"
    >
      {children}
    </Typography>
  );
}

export function UL({ children }) {
  return (
    <Box pl={2}>
      {children}
      <P></P>
    </Box>
  );
}

export function LI({ children }) {
  return <Typography variant="body2">{children}</Typography>;
}

export function BaseButton({ children, isIcon = false, ...props }) {
  if (isIcon)
    return (
      <IconButton color="primary" size="small" {...props}>
        {children}
      </IconButton>
    );
  return (
    <Button color="primary" variant="contained" size="small" {...props}>
      {children}
    </Button>
  );
}

export function PushButton({ children, href, ...props }) {
  return (
    <Push href={href}>
      <BaseButton {...props}>{children}</BaseButton>
    </Push>
  );
}

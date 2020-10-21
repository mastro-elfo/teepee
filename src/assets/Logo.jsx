import React from "react";
import { SvgIcon } from "@material-ui/core";

export default function Logo(props) {
  return (
    <SvgIcon {...props}>
      <path
        style={{
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeOpacity: 1,
          fill: "none"
        }}
        d="m 2,20 10,-20 10,20"
      />
    </SvgIcon>
  );
}

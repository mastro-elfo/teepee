import React from "react";

import { Switch, Route } from "react-router-dom";

import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";

import { route as collection } from "./product/collection";
import { route as create } from "./product/create";
import { route as edit } from "./product/edit";
import { route as view } from "./product/view";

function Component() {
  return (
    <Switch>
      {[collection, create, edit, view].map(props => (
        <Route key={props.path} {...props} />
      ))}
    </Switch>
  );
}

export const route = {
  path: "/product",
  component: Component
};

export const drawer = {
  key: "product",
  primary: "Prodotti",
  secondary: "",
  icon: <EmojiObjectsIcon />,
  title: "Gestione prodotti"
};

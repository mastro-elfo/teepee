import React from "react";
import renderer from "react-test-renderer";
import Row from "./print-table-row";

const ITEM = {
  name: "name",
  description: "description",
  barcode: "barcode",
  price: 1,
  stock: 1,
  _create: "_create",
  _update: "_update",
  currency: "currency",
};

test("Render", () => {
  const component = renderer.create(<Row {...ITEM} />);
});

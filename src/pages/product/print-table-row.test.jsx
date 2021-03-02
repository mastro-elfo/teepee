import React from "react";
import renderer from "react-test-renderer";
import Row from "./print-table-row";

// https://react.i18next.com/misc/testing
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

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

import date2str from "./date2str";

test("Returns alt", () => {
  expect(date2str(null, "alt")).toBe("alt");
  expect(date2str("", "alt")).toBe("alt");
  expect(date2str(false, "alt")).toBe("alt");
  expect(date2str(true, "alt")).toBe("alt");
  expect(date2str({}, "alt")).toBe("alt");
  expect(date2str([], "alt")).toBe("alt");
});

test("Returns date", () => {
  expect(date2str(0, "alt")).not.toBe("alt");
  expect(date2str(1000, "alt")).not.toBe("alt");
  expect(date2str(-1000, "alt")).not.toBe("alt");
  expect(date2str("02/03/2021", "alt")).not.toBe("alt");
  expect(date2str("2021-03-02", "alt")).not.toBe("alt");
});

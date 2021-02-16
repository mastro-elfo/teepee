import delay from "./delay";

test("Returns a Promise", () => {
  expect(delay() instanceof Promise).toBe(true);
});

test("Not immediately called", () => {
  const callback = jest.fn();
  delay(0, callback);
  expect(callback.mock.calls.length).toBe(0);
});

test("Called once", () => {
  const callback = jest.fn();
  return delay(10, callback).then(() =>
    expect(callback.mock.calls.length).toBe(1)
  );
});

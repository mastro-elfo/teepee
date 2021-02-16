export default function (delay = 0, callback, ...args) {
  return new Promise((resolve) => setTimeout(resolve, delay)).then(
    () => typeof callback === "function" && callback(...args)
  );
}

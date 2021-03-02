export default function date2str(date, alt = "") {
  // Check type
  if (typeof date !== "string" && typeof date !== "number") {
    return alt;
  }
  // Try to create a Date
  let d = new Date(date).toLocaleString();
  if (d === "Invalid Date") {
    return alt;
  }
  // Ok
  return d;
}

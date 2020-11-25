// Get target from command line arguments
let target = "<target>";
if (process.argv && process.argv.length && process.argv.length > 2) {
  target = process.argv[2];
}
// Get version from package
const { version } = require("../package.json");
// Get major
const match = version.match(/^(\d+)\..*/);
// console.log(match);
if (!match || match.length < 2) {
  console.error("Error matching major", version, match);
  process.exit(1);
}
const major = match[1];
// Print publish command
console.log("Use the following command to publish");
console.log(
  `scp out/make/${target}/x64/* mastro-elfo@frs.sourceforge.net:/home/frs/project/teepee-management/v${major}`
);

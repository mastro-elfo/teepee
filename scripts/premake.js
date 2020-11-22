// Check if src/i18n.js has `lng` option commented
// Check if changelog(s) have an item about the actual version
// =============================================================================

const { exec } = require("child_process");
const path = require("path");

// Get version and makers from package
const { version } = require("../package.json");

// Check if src/i18n.js has `lng` option commented
exec(
  'cat ./src/utils/i18n.js | grep "lng:" | cut -d "/" -f 1',
  (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    if (stderr) {
      console.error(stderr);
      process.exit(2);
    }
    stdout = stdout.trim();
    if (stdout === "") {
      return;
    }
    if (!stdout.match(/\s*\/\/\s*lng/)) {
      console.error("Option lng in src/i18n.js must be commented");
    }
  }
);

// // Check if changelog(s) have an item about the actual version
// ["en", "it"].forEach((lng) => {
//   const filename = path.join("..", "src", "locales", lng, "Changelog.json");
//   const { Changelog } = require(filename);
//   const log = Changelog.find((item) => item.version === version);
//   if (!log) {
//     console.error(
//       `Changelog not found for version ${version} in language ${lng}`
//     );
//     process.exit(3);
//   }
//   const date = new Date(log.date);
//   if (!(date instanceof Date) || isNaN(date)) {
//     console.error(`Changelog has invalid date: ${log.date}`);
//     console.error("Is instance?", date instanceof Date);
//     console.error("Is NaN?", isNaN(date));
//     process.exit(4);
//   }
// });

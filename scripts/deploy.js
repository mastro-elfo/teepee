const { exec } = require("child_process");
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
// Copy to server
exec(
  `scp out/make/deb/x64/* mastro-elfo@frs.sourceforge.net:/home/frs/project/teepee-management/v${major}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    if (stderr) {
      console.error(stderr);
      process.exit(1);
    }
    console.log(stdout);
  }
);

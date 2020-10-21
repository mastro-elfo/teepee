const { version } = require("../package.json");
const { writeFileSync } = require("fs");

const [_, maj, min, build] = version.match(/(\d+)\.(\d+)\.(\d+)/);
writeFileSync(
  "./src/version.json",
  JSON.stringify({
    version,
    maj,
    min,
    build
  })
);

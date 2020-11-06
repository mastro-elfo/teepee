// Initialize file ./src/version.json

const { writeFileSync } = require("fs");

// Get version from package
const { version } = require("../package.json");

// Explode version into maj, min, and build
const [_, maj, min, build] = version.match(/(\d+)\.(\d+)\.(\d+)/);

// Write syncronously to file
writeFileSync(
  "./src/version.json",
  JSON.stringify({
    version,
    maj,
    min,
    build,
  })
);

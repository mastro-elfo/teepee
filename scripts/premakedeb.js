// Check if package version and maker version match

// Get version and makers from package
const {
  version,
  config: {
    forge: { makers },
  },
} = require("../package.json");

// Find the deb maker
const deb =
  makers &&
  makers.find &&
  makers.find(({ name }) => name === "@electron-forge/maker-deb");

if (!deb) {
  console.error("Maker '@electron-forge/maker-deb' not found, exit");
  process.exit(1);
}

// Get maker version in config
const {
  config: { version: debversion },
} = deb;

// Check versions
if (version !== debversion) {
  console.error(
    `Package version (${version}) and Deb version (${debversion}) don't match, exit`
  );
  process.exit(2);
}

// Versions match: nothing to do

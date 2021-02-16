// Check if package version and maker version match
// =============================================================================

// Get version and makers from package
const {
  version,
  config: {
    forge: { makers },
  },
} = require("../package.json");

// Find the rpm maker
const rpm =
  makers &&
  makers.find &&
  makers.find(({ name }) => name === "@electron-forge/maker-rpm");

if (!rpm) {
  console.error("Maker '@electron-forge/maker-rpm' not found, exit");
  process.exit(1);
}

// Get maker version in config
const {
  config: { version: rpmversion },
} = rpm;

// Check versions
if (version !== rpmversion) {
  console.error(
    `Package version (${version}) and rpm version (${rpmversion}) don't match, exit`
  );
  process.exit(2);
}

// Versions match: nothing to do

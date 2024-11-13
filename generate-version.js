// generate version.json file on build
/// do not convert into ES module

const fs = require('fs');
const packageJson = require('./package.json');

console.log('generate version');

const versionData = {
  version: packageJson.version,
};

fs.writeFileSync('./public/version.json', JSON.stringify(versionData, null, 2));

const { readFile, writeFile } = require('fs').promises;
const { join } = require('path');
// eslint-disable-next-line node/no-extraneous-require
const semver = require('semver');
// eslint-disable-next-line node/no-unpublished-require
const yunpkg = require('./node_modules/hexo-theme-yun/package.json');

const resolvePath = (...str) => join(__dirname, ...str);

(async function() {
  if (semver.gt(yunpkg.version, '1.8.11')) return;
  const jspath = resolvePath('node_modules/hexo-theme-yun/scripts/events/data.js');
  const buf = await readFile(jspath);
  let str = buf.toString();
  if (str.includes('merge(yaml')) return;
  console.log('Temporary fix vendors config.');
  str = str.replace(
    'const yaml = require(\'js-yaml\')',
    'const yaml = require(\'js-yaml\')\nconst { merge } = require(\'./utils\')'
  );
  str = str.replace(
    'hexo.theme.config.vendors = yaml.load(vendorsFile)',
    'hexo.theme.config.vendors = merge(yaml.load(vendorsFile), hexo.theme.config.vendors)'
  );
  await writeFile(jspath, str);
  console.log('Vendor config fix end.');
}());

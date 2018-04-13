/**
 * @fileoverview eslint utility functions
 * @author Paul Vollmer
 * @copyright 2018 Paul Vollmer. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

'use strict';

const path = require('path');
const pkg = require('../package.json');

/**
 * @param {String} string
 * @return {String}
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * get the name of a function argument
 * @param {ASTNode} node
 * @param {Number} i
 * @return {String}
 */
function getFunctionArgument(node, i) {
  return node.params[i].name;
}

/**
 * check if the code has a "module.exports" function
 * @param {String} filepath
 * @return {Boolean}
 */
function isModelsDir(filepath) {
  const filedirSplits = path.dirname(filepath).split(path.sep);
  if (filedirSplits[filedirSplits.length-1] === 'models') {
    return true;
  } else {
    return false;
  }
}

/**
 * check if the code has a "module.exports" function
 * @param {ASTNode} node
 * @return {Boolean}
 */
function isModuleExports(node) {
  if (node.parent) {
    if (node.parent.left) {
      if (node.parent.left.type === 'MemberExpression' &&
      node.parent.operator === '=' &&
      node.parent.left.object.name === 'module' && node.parent.left.object.type === 'Identifier' &&
      node.parent.left.property.name === 'exports' && node.parent.left.property.type === 'Identifier') {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true
  }
}

/**
 * @param {String} ruleName
 * @return {String}
 */
function docsUrl(ruleName) {
  return `${pkg.homepage}/tree/master/docs/rules/${ruleName}.md`;
}

const LoopbackFiles = {
  // Root Directories
  Boot: 'boot',
  Constants: 'constants',
  ConstantsErrors: 'errors.js',
  Lib: 'lib',
  Middleware: 'middleware',
  Models: 'models',
  Test: 'test',
  Util: 'util',
  UtilDisableRemoteMethods: 'disableRemoteMethods.js',

  // Root Files
  ComponentConfig: 'component-config.json',
  ConfigDevelopment: 'config.development.js',
  ConfigEnv: 'config.env.js',
  ConfigJSON: 'config.json',
  ConfigProduction: 'config.production.js',
  ConfigStaging: 'config.staging.js',
  ConfigTest: 'config.test.js',
  Datasources: 'datasources.json',
  DatasourcesLocal: 'datasources.local.js',
  MiddlewareJSON: 'middleware.json',
  ModelConfig: 'model-config.json',
  Server: 'server.js',
}

let flagFix = false;
for (var i = 0; i < process.argv.length; i++) {
  // console.log('i', i, process.argv[i]);
  if (process.argv[i] === '--fix') {
    flagFix = true
  }
}
// console.log(flagFix);

module.exports = {
  cwd: process.cwd(),
  argsTotal: process.argv.length,
  flagFix: flagFix,
  LoopbackFiles,
  capitalizeFirstLetter,
  docsUrl,
  getFunctionArgument,
  isModelsDir,
  isModuleExports,
};

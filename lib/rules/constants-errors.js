/**
 * @fileoverview Rule to ...
 * @author Paul Vollmer
 * @copyright 2018 Paul Vollmer. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const {docsUrl, isModuleExports, getFunctionArgument, capitalizeFirstLetter, isModelsDir, cwd, argsTotal, LoopbackFiles, flagFix} = require('../utils');

const BOILERPLATE_CONST_ERROR = `'use strict';

/**
 * __Error Names Sets__
 * InternalError[Offical]
 * RangeError[Offical]
 * ReferenceError[Offical]
 * SyntaxError[Offical]
 * TypeError[Offical]
 * URIError[Offical]
 * ValidationError[JOI]
 *
 * __Code def__
 * 1xxxx: Javascript runtime Error
 * 2xxxx: Internal lib/dependencis Error
 * 20xxx: Internal validate Error
 * 3xxxx: Database Error
 * 4xxxx: Our code base error(400 kind)
 * 40xxx: Our code side auth related error(400 kind)
 * 5xxxx: Our code base error(500 kind)
 * 50xxx: Our code side auth related error(500 kind)
 * 6xxxx: Other service Error
 *
 * __Rules about error code_
 * - the code should alway been incremented by 1
 * - removed/deprecated code should not been reused
 */
module.exports = {
  'DEFAULT': {
    statusCode: 500,
    code: 1000,
    message: 'server internal error',
  },
  '400': {
    statusCode: 400,
    code: 1400,
    message: 'server bad request',
  },
  '401': {
    statusCode: 401,
    code: 1401,
    message: 'server access denied',
  },
  '404': {
    statusCode: 404,
    code: 1404,
    message: 'server resource not found',
  },
  '404': {
    statusCode: 404,
    code: 1404,
    message: 'server resource not found',
  },
};
`

let src = ''
if (flagFix) {
  src = path.join(cwd, process.argv[argsTotal-2], LoopbackFiles.Constants, LoopbackFiles.ConstantsErrors);
} else {
  src = path.join(cwd, process.argv[argsTotal-1], LoopbackFiles.Constants, LoopbackFiles.ConstantsErrors);
}
// console.log(cwd);
// console.log(process.argv);
// console.log(src);
// console.log('-----------');

try {
  // console.log('TRY...');
  const data = fs.readFileSync(src, 'utf8');
  // console.log(data);
} catch (e) {
  // console.log('ERRRR', e);
  if (flagFix) {
    console.log('==> file not exist');
    try {
      fs.writeFileSync(src, BOILERPLATE_CONST_ERROR, 'utf8');
      console.log('==> successfully fixed code', LoopbackFiles.ConstantsErrors);
    } catch (e) {
      console.log('Error Fix Code', e);
    }
  } else {
    console.log('\n  No constants/errors.js file found. run with --fix flag to bootstrap file.\n');
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'loopback ...',
      category: 'loopback-models',
      recommended: true,
      url: docsUrl('button-has-type'),
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    let fname = context.getFilename()
    const dir = path.dirname(fname)
    const base = path.basename(fname)
    // console.log(fname);
    // console.log(dir);
    // console.log(base);

    return {
      Identifier(node) {
        if (node.name === 'module') {
          if (base === 'errors.js') {
            // console.log('NODE', node.name);
            // console.log('NODE', node.parent.parent.right.properties);
            if (node.parent) {
              if (node.parent.parent.right.properties[0].key.name !== 'DEFAULT') {
                context.report({node, message: 'missing DEFAULT'});
              }
              // TODO: check the object
              // for (var i = 0; i < node.parent.parent.right.properties.length; i++) {
              //   console.log(i, node.parent.parent.right.properties[i].key.name);
              // }
            }
          }
        }
      },
    };
  },
};

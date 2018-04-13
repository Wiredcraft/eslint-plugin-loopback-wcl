'use strict';

const rule = require('../../../lib/rules/logger')
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('example', rule, {

  valid: [
    'logger.info("hello world")',
    'logger.error("hello world")',
    'logger.warn("hello world")',
    'lib.logger("ignore this one")',
    'lib.foo.logger("ignore this one")'
  ],

  invalid: [
    {
      code: 'console.log("hello world")',
      output: 'logger.info("hello world")',
      errors: [ { messageId: 'avoidConsoleLog' } ]
    },
    {
      code: 'logger.log("hello world")',
      output: 'logger.info("hello world")',
      errors: [ { message: 'use logger.info, logger.warn or logger.error ( log )' } ]
    }
  ]

});

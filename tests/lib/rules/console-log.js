'use strict';

const rule = require('../../../lib/rules/console-log')
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run('console-log', rule, {

  valid: [
    'logger.info("hello world")',
  ],

  invalid: [
    {
      code: 'console.log("hello world")',
      output: 'logger.info("hello world")',
      errors: [ { messageId: 'avoidConsoleLog' } ]
    }
  ]

});

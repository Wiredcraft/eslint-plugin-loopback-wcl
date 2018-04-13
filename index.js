'use strict';

// console.log('loopback wcl plugin')
// console.log('-------------------');

module.exports = {
  configs: {
    recommended: {
      plugins: ['loopback-wcl'],
      rules: {
        'loopback-wcl/logger': 'warn',
      }
    }
  },
  rules: {
    'logger': require('./lib/rules/logger')
    'console-log': require('./lib/rules/console-log')
  }
};

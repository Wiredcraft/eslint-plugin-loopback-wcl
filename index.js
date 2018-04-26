'use strict';

module.exports = {
  configs: {
    recommended: {
      plugins: ['loopback-wcl'],
      rules: {
        'loopback-wcl/console-log': 'error',
        'loopback-wcl/logger-print': 'warn',
        'loopback-wcl/logger': 'warn'
      }
    }
  },
  rules: {
    'console-log': require('./lib/rules/console-log'),
    'logger-print': require('./lib/rules/logger-print'),
    'logger': require('./lib/rules/logger')
  }
};

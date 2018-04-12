'use strict';

const LOGGER_MODES = {
  INFO: 'info',
  ERROR: 'error',
  WARN: 'warn'
}

module.exports = {
  meta: {
    docs: {
      description: 'loopback logger',
      category: 'loopback-wcl',
      recommended: true
    },
    messages: {
      invalidLoggerMode: 'use logger.info, logger.warn or logger.error',
      avoidConsoleLog: 'Do not use console.log. use logger.info instead'
    },
    fixable: 'code',
    schema: [],
  },

  create: function(context) {
    return {
      Identifier: function(node) {
        if (node.name === 'console') {
          if (node.parent) {
            if (node.parent.property) {
              let prop = node.parent.property.name
              if (prop === 'log' || prop === 'error') {
                context.report({
                  node,
                  messageId: 'avoidConsoleLog',
                  fix: (fixer) => {
                    return [
                      fixer.replaceTextRange(node.range, 'logger'),
                      fixer.replaceTextRange(node.parent.property.range, 'info')
                    ]
                  }
                });
              }
            }
          }
        }
        if (node.name === 'logger') {
          if (node.parent) {
            if (node.parent.property) {
              let prop = node.parent.property.name
              if (prop !== LOGGER_MODES.INFO &&
                  prop !== LOGGER_MODES.ERROR &&
                  prop !== LOGGER_MODES.WARN) {
                context.report({
                  node,
                  messageId: 'invalidLoggerMode',
                  fix: (fixer) => {
                    return [
                      fixer.replaceTextRange(node.parent.property.range, 'info')
                    ]
                  }
                });
              }
            }
          }
        }
      }
    }
  }
};

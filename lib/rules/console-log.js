'use strict';

const {PLUGIN_CATEGORY, LOGGER_MODES} = require('./utils/constants')

module.exports = {
  meta: {
    docs: {
      description: 'loopback console.log',
      category: PLUGIN_CATEGORY,
      recommended: true
    },
    messages: {
      avoidConsoleLog: 'Do not use console.log. use logger.info instead'
    },
    fixable: 'code'
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
      }

    }
  }
};

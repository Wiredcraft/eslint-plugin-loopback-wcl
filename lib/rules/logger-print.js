'use strict';

const {PLUGIN_CATEGORY, LOGGER_MODES} = require('./utils/constants')

module.exports = {
  meta: {
    docs: {
      description: 'print logger usage to stdout',
      category: PLUGIN_CATEGORY,
      recommended: true
    }
  },

  create: function(context) {
    return {

      Identifier: function(node) {
        if (node.name === 'logger') {
          if (node.parent) {
            if (node.parent.property) {
              if (node.parent.property.parent === undefined) {
              // check if the node property is the first keyword. like this: "logger.*"
                let prop = node.parent.property.name
                if (prop === LOGGER_MODES.INFO &&
                    prop === LOGGER_MODES.ERROR &&
                    prop === LOGGER_MODES.WARN) {
                  context.report({
                    node,
                    messageId: 'app.logger.* used'
                  });
                }
              }
            }
          }
        }
      }
    }
  }
};

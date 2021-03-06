"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classNamingRule = void 0;

var testClassName = function testClassName(context, node) {
  if (node.type !== 'JSXIdentifier') {
    return false;
  }

  if (node.name !== 'className') {
    return false;
  } // className value


  var _node$parent$value = node.parent.value,
      value = _node$parent$value.value,
      range = _node$parent$value.range,
      type = _node$parent$value.type;

  if (!value || type !== 'Literal') {
    return false;
  }
  /* check for spaces at the start and end of the string Literal */


  var firstLetter = value[0];
  var lastLetter = value[value.length - 1];
  var canFix = context.options.length > 0 && context.options[0].fix; // allow for quote marks in jsx

  var firstLetterInRange = range[0] + 1;
  var lastLetterInRange = range[1] - 1;

  if (firstLetter === ' ' || lastLetter === ' ') {
    context.report({
      fix: function fix(fixer) {
        if (!canFix) {
          return null;
        }

        return fixer.replaceTextRange([firstLetterInRange, lastLetterInRange], value.trim());
      },
      message: 'class name should be not have whitespace at start or end',
      node: node
    });
    return true;
  }
  /* check each word in the string Literal for its casing */


  var classNameArray = value.split(" ");
  classNameArray.forEach(function (className) {
    var classNameFirstLetter = className[0];

    if (classNameFirstLetter !== classNameFirstLetter.toUpperCase()) {
      return false;
    }

    var updatedClassName = value.replace(className, className.charAt(0).toLowerCase() + className.slice(1));
    context.report({
      fix: function fix(fixer) {
        if (!canFix) {
          return null;
        }

        return fixer.replaceTextRange([firstLetterInRange, lastLetterInRange], updatedClassName);
      },
      message: 'class name should be camelCase',
      node: node
    });
    return true;
  });
};

var classNamingRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce camel casing, whitespace trimming for JSX classnames'
    },
    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        fix: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },
  create: function create(context) {
    return {
      JSXIdentifier: function JSXIdentifier(node) {
        testClassName(context, node, context.options.length ? context.options[0] : {});
      }
    };
  }
};
exports.classNamingRule = classNamingRule;
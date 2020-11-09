"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidJsonInFunctionRule = void 0;

var testFunctionParameters = function testFunctionParameters(context, node) {
  if (node.type !== 'Identifier') {
    return false;
  }

  var _context$options$ = context.options[0],
      argumentPosition = _context$options$.argumentPosition,
      functionName = _context$options$.functionName,
      sourceObject = _context$options$.sourceObject;

  if (node.name !== functionName) {
    return false;
  }

  var functionArgumentToValidate = node.parent.arguments[argumentPosition || 0].value;
  var isValidArgument = sourceObject.hasOwnProperty(functionArgumentToValidate);

  if (!isValidArgument) {
    context.report({
      message: "".concat(functionArgumentToValidate, " is not a valid identifier"),
      node: node
    });
    return true;
  }

  return true;
};

var isValidJsonInFunctionRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce valid json strings are used in the defined function'
    },
    schema: [{
      type: 'object',
      properties: {
        argumentPosition: {
          type: 'number'
        },
        functionName: {
          type: 'string'
        },
        sourceObject: {
          type: 'object'
        }
      },
      additionalProperties: false
    }]
  },
  create: function create(context) {
    return {
      Identifier: function Identifier(node) {
        testFunctionParameters(context, node, context.options.length ? context.options[0] : {});
      }
    };
  }
};
exports.isValidJsonInFunctionRule = isValidJsonInFunctionRule;
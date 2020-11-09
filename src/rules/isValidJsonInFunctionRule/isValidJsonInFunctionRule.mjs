function getNested(obj, args) {
  return args.reduce((obj, level) => obj && obj[level], obj)
}

const testFunctionParameters = (context, node) => {
  if (node.type !== 'Identifier') {
    return false;
  }
  const {argumentPosition, functionName, splitOn, sourceObject} = context.options[0]

  if (node.name !== functionName) {
    return false;
  }

  const functionArgumentToValidate = node.parent.arguments[argumentPosition || 0].value
  const objectKeysToValidate = functionArgumentToValidate.split(splitOn || '.');

  const isValidArgument = getNested(sourceObject, objectKeysToValidate)

  if (!isValidArgument) {
    context.report({
      message: `${functionArgumentToValidate} is not a valid identifier`,
      node
    });

    return true;
  }

  return true
};

export const isValidJsonInFunctionRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce valid json strings are used in the defined function'
    },
    schema: [
      {
        type: 'object',
        properties: {
          argumentPosition: {
            type: 'number',
          },
          functionName: {
            type: 'string'
          },
          splitOn: {
            type: 'string',
          },
          sourceObject: {
            type: 'object',
          }
        },
        additionalProperties: false
      }
    ]
  },
  create: (context) => {
    return {
      Identifier(node) {
        testFunctionParameters(context, node, context.options.length ? context.options[0] : {});
      }
    };
  }
};

const testFunctionParameters = (context, node) => {
  if (node.type !== 'Identifier') {
    return false;
  }
  const {argumentPosition, functionName, sourceObject, splitOn} = context.options[0];

  if (node.name !== functionName) {
    return false;
  }

  if (!node.parent.arguments || node.parent.arguments.length === 0) {
    return false
  }

  const functionArgumentToValidate = node.parent.arguments[argumentPosition || 0];
  if (!functionArgumentToValidate || !functionArgumentToValidate.value) {
    return false;
  }

  const functionArgumentValueToValidate = functionArgumentToValidate.value;
  const objectKeysToValidate = functionArgumentValueToValidate.split(splitOn || '.');
  const isValidArgument = objectKeysToValidate.reduce(
    (sourceObject, level) => sourceObject && sourceObject[level],
    sourceObject
  );

  if (!isValidArgument) {
    context.report({
      message: `${functionArgumentValueToValidate} is not a valid identifier`,
      node,
    });

    return true;
  }

  return true;
};

export const isValidJsonInFunctionRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce valid json strings are used in the defined function',
    },
    schema: [
      {
        type: 'object',
        properties: {
          argumentPosition: {
            type: 'number',
          },
          functionName: {
            type: 'string',
          },
          sourceObject: {
            type: 'object',
          },
          splitOn: {
            type: 'string',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    return {
      Identifier(node) {
        testFunctionParameters(context, node, context.options.length ? context.options[0] : {});
      },
    };
  },
};

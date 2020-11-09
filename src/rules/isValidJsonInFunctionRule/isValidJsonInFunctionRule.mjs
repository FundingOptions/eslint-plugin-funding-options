const testFunctionParameters = (context, node) => {

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
          functionName: {
            type: 'string'
          }
        },
        additionalProperties: false
      }
    ]
  },
  create: (context) => {
    return {
      JSXIdentifier(node) {
        testFunctionParameters(context, node, context.options.length ? context.options[0] : {});
      }
    };
  }
};

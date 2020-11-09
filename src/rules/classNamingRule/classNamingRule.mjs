const testClassName = (context, node) => {
  if (node.type !== 'JSXIdentifier') {
    return false;
  }

  if (node.name !== 'className') {
    return false;
  }

  // className value
  const {value, range, type} = node.parent.value;

  if (!value || type !== 'Literal') {
    return false;
  }

  /* check for spaces at the start and end of the string Literal */

  const firstLetter = value[0];
  const lastLetter = value[value.length - 1];
  const canFix = context.options.length > 0 && context.options[0].fix;
  // allow for quote marks in jsx
  const firstLetterInRange = range[0] + 1;
  const lastLetterInRange = range[1] - 1;

  if (firstLetter === ' ' || lastLetter === ' ') {
    context.report({
      fix: (fixer) => {
        if (!canFix) {
          return null;
        }

        return fixer.replaceTextRange([firstLetterInRange, lastLetterInRange], value.trim());
      },
      message: 'class name should be not have whitespace at start or end',
      node,
    });
    return true;
  }

  /* check each word in the string Literal for its casing */
  const classNameArray = value.split(' ');

  classNameArray.forEach((className) => {
    const classNameFirstLetter = className[0];
    if (classNameFirstLetter !== classNameFirstLetter.toUpperCase()) {
      return false;
    }

    const updatedClassName = value.replace(className, className.charAt(0).toLowerCase() + className.slice(1));

    context.report({
      fix: (fixer) => {
        if (!canFix) {
          return null;
        }

        return fixer.replaceTextRange([firstLetterInRange, lastLetterInRange], updatedClassName);
      },
      message: 'class name should be camelCase',
      node,
    });

    return true;
  });
};

export const classNamingRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce camel casing, whitespace trimming for JSX classnames',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          fix: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    return {
      JSXIdentifier(node) {
        testClassName(context, node, context.options.length ? context.options[0] : {});
      },
    };
  },
};

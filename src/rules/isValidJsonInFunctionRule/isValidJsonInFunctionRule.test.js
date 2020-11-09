import {RuleTester} from 'eslint';
import {isValidJsonInFunctionRule} from './isValidJsonInFunctionRule';

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  }
});

const ruleTester = new RuleTester();

ruleTester.run('isValidJsonInFunction', isValidJsonInFunctionRule, {
  valid: [
    {
      code: 'getPageRoute("conversion")',
      options: [{functionName: 'getPageRoute', sourceObject: {"conversion": "/helloWorld"}}]
    }, {
      code: 'getPageRoute("conversion")',
      options: [{functionName: 'getPageRoute', argumentPosition: 0, sourceObject: { "conversion": "/helloWorld" }}]
    }, {
      code: 'getPageRoute("conversion.url")',
      options: [{functionName: 'getPageRoute', argumentPosition: 0, sourceObject: { "conversion": { "url": "/helloWorld" }} }]
    }, {
      code: 'getPageRoute("conversion.url.home")',
      options: [{functionName: 'getPageRoute', argumentPosition: 0, sourceObject: { "conversion": { "url": { "home": "/helloWorld" }} }}]
    }, {
      code: 'getPageRoute("whatever", "conversion.url.home")',
      options: [{functionName: 'getPageRoute', argumentPosition: 1, sourceObject: { "conversion": { "url": { "home": "/helloWorld" }} }}]
    }, {
      code: 'getPageRouteVars("whatever", "conversion.url.home")',
      options: [{functionName: 'getPageRouteVars', argumentPosition: 1, sourceObject: { "conversion": { "url": { "home": "/helloWorld" }} }}]
    },
  ],
  invalid: [
    {
      code: 'getPageRoute("conversion")',
      errors: [
        {
          message: 'conversion is not a valid identifier',
          type: 'Identifier'
        }
      ],
      options: [{functionName: 'getPageRoute', argumentPosition: 0, sourceObject: { "conversion1": "/helloWorld" }}]
    },     {
      code: 'getPageRoute("conversion.url")',
      errors: [
        {
          message: 'conversion.url is not a valid identifier',
          type: 'Identifier'
        }
      ],
      options: [{functionName: 'getPageRoute', argumentPosition: 0, sourceObject: { "conversion1": "/helloWorld" }}]
    },    {
      code: 'getPageRoute("conversion.url")',
      errors: [
        {
          message: 'conversion.url is not a valid identifier',
          type: 'Identifier'
        }
      ],
      options: [{functionName: 'getPageRoute', argumentPosition: 0, sourceObject: { "conversion": {"url1:": "/helloWorld" }}}]
    },    {
      code: 'getPageRoute("conversion.url.home")',
      errors: [
        {
          message: 'conversion.url.home is not a valid identifier',
          type: 'Identifier'
        }
      ],
      options: [{functionName: 'getPageRoute', argumentPosition: 0, sourceObject: { "conversion": {"url:": {"home": "/helloWorld" }}}}]
    },
  ]
});

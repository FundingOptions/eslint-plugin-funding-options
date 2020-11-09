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
      options: [{functionName: 'getPageRoute', sourceObject: { "conversion": "/helloWorld" }}]
    }, {
      code: 'getPageRoute("conversion")',
      options: [{functionName: 'getPageRoute', argumentPosition: 0, sourceObject: { "conversion": "/helloWorld" }}]
    },
  ],
  invalid: []
});

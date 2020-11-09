"use strict";

var _eslint = require("eslint");

var _isValidJsonInFunctionRule = require("./isValidJsonInFunctionRule");

_eslint.RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  }
});

var ruleTester = new _eslint.RuleTester();
ruleTester.run('isValidJsonInFunction', _isValidJsonInFunctionRule.isValidJsonInFunctionRule, {
  valid: [{
    code: 'getPageRoute("conversion")',
    options: [{
      functionName: 'getPageRoute',
      sourceObject: {
        "conversion": "/helloWorld"
      }
    }]
  }, {
    code: 'getPageRoute("conversion")',
    options: [{
      functionName: 'getPageRoute',
      argumentPosition: 0,
      sourceObject: {
        "conversion": "/helloWorld"
      }
    }]
  }],
  invalid: []
});
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
  }, {
    code: 'getPageRoute("conversion.url")',
    options: [{
      functionName: 'getPageRoute',
      argumentPosition: 0,
      sourceObject: {
        "conversion": {
          "url": "/helloWorld"
        }
      }
    }]
  }, {
    code: 'getPageRoute("conversion.url.home")',
    options: [{
      functionName: 'getPageRoute',
      argumentPosition: 0,
      sourceObject: {
        "conversion": {
          "url": {
            "home": "/helloWorld"
          }
        }
      }
    }]
  }],
  invalid: [{
    code: 'getPageRoute("conversion")',
    errors: [{
      message: 'conversion is not a valid identifier',
      type: 'Identifier'
    }],
    options: [{
      functionName: 'getPageRoute',
      argumentPosition: 0,
      sourceObject: {
        "conversion1": "/helloWorld"
      }
    }]
  }, {
    code: 'getPageRoute("conversion.url")',
    errors: [{
      message: 'conversion.url is not a valid identifier',
      type: 'Identifier'
    }],
    options: [{
      functionName: 'getPageRoute',
      argumentPosition: 0,
      sourceObject: {
        "conversion1": "/helloWorld"
      }
    }]
  }, {
    code: 'getPageRoute("conversion.url")',
    errors: [{
      message: 'conversion.url is not a valid identifier',
      type: 'Identifier'
    }],
    options: [{
      functionName: 'getPageRoute',
      argumentPosition: 0,
      sourceObject: {
        "conversion": {
          "url1:": "/helloWorld"
        }
      }
    }]
  }, {
    code: 'getPageRoute("conversion.url.home")',
    errors: [{
      message: 'conversion.url.home is not a valid identifier',
      type: 'Identifier'
    }],
    options: [{
      functionName: 'getPageRoute',
      argumentPosition: 0,
      sourceObject: {
        "conversion": {
          "url:": {
            "home": "/helloWorld"
          }
        }
      }
    }]
  }]
});
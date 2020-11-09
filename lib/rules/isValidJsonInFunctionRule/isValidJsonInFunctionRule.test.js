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
var jsonUrls = JSON.stringify({
  conversion: {
    url: {
      home: {
        url: '/helloWorld'
      }
    }
  }
});
ruleTester.run('isValidJsonInFunction', _isValidJsonInFunctionRule.isValidJsonInFunctionRule, {
  valid: [{
    code: 'getPageRoute("conversion")',
    options: [{
      functionName: 'getPageRoute',
      sourceObject: {
        conversion: '/helloWorld'
      }
    }]
  }, {
    code: 'getPageRoute("conversion")',
    options: [{
      functionName: 'getPageRoute',
      argumentPosition: 0,
      sourceObject: {
        conversion: '/helloWorld'
      }
    }]
  }, {
    code: 'getPageRoute("conversion.url")',
    options: [{
      functionName: 'getPageRoute',
      sourceObject: {
        conversion: {
          url: '/helloWorld'
        }
      }
    }]
  }, {
    code: 'getPageRoute("conversion.url.home")',
    options: [{
      functionName: 'getPageRoute',
      sourceObject: {
        conversion: {
          url: {
            home: '/helloWorld'
          }
        }
      }
    }]
  }, {
    code: 'const abc = getPageRoute("conversion.url.home");',
    options: [{
      functionName: 'getPageRoute',
      sourceObject: {
        conversion: {
          url: {
            home: '/helloWorld'
          }
        }
      }
    }]
  }, {
    code: 'const abc = getPageRoute("conversion.url.home.url");',
    options: [{
      functionName: 'getPageRoute',
      sourceObject: {
        conversion: {
          url: {
            home: {
              url: '/helloWorld'
            }
          }
        }
      }
    }]
  }, // check json parse
  {
    code: 'const abc = getPageRoute("conversion.url.home.url");',
    options: [{
      functionName: 'getPageRoute',
      sourceObject: JSON.parse(jsonUrls)
    }]
  }, // check that the argumentPosition argument works
  {
    code: 'getPageRoute("whatever", "conversion.url.home")',
    options: [{
      functionName: 'getPageRoute',
      argumentPosition: 1,
      sourceObject: {
        conversion: {
          url: {
            home: '/helloWorld'
          }
        }
      }
    }]
  }, // check that the functionName argument works
  {
    code: 'getPageRouteVars("whatever", "conversion.url.home")',
    options: [{
      functionName: 'getPageRouteVars',
      argumentPosition: 1,
      sourceObject: {
        conversion: {
          url: {
            home: '/helloWorld'
          }
        }
      }
    }]
  }, // check that the splitOn argument works
  {
    code: 'getPageRouteVars("whatever", "conversion--url--home")',
    options: [{
      functionName: 'getPageRouteVars',
      argumentPosition: 1,
      splitOn: '--',
      sourceObject: {
        conversion: {
          url: {
            home: '/helloWorld'
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
      sourceObject: {
        conversion1: '/helloWorld'
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
      sourceObject: {
        conversion1: '/helloWorld'
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
      sourceObject: {
        conversion: {
          'url1:': '/helloWorld'
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
      sourceObject: {
        conversion: {
          'url1:': {
            home: '/helloWorld'
          }
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
      splitOn: '--',
      sourceObject: {
        conversion: {
          'url:': {
            home: '/helloWorld'
          }
        }
      }
    }]
  }]
});
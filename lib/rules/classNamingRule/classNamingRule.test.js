"use strict";

var _eslint = require("eslint");

var _classNamingRule = require("./classNamingRule");

_eslint.RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  }
});

var ruleTester = new _eslint.RuleTester();
ruleTester.run('classNaming', _classNamingRule.classNamingRule, {
  valid: [{
    code: '<div className="helloWorld" />',
    options: []
  }, {
    code: '<div />',
    options: []
  }, {
    code: 'function Accordion(props) { return (<div className="accordion">hello world</div>)}',
    options: []
  }, {
    code: 'function Accordion(props) { return (<div className="accordion extraClassName">hello world</div>)}',
    options: []
  }, {
    code: 'function Accordion(props) { return (<div className="accordion extraClassName anotherClassName">hello world</div>)}',
    options: []
  }],
  invalid: [// with fix = true, camelCasing
  {
    code: '<div className="HelloWorld" />',
    errors: [{
      message: 'class name should be camelCase',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: '<div className="helloWorld" />'
  }, {
    code: '<div className="Accordion">hello world</div>',
    errors: [{
      message: 'class name should be camelCase',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: '<div className="accordion">hello world</div>'
  }, {
    code: 'function Accordion(props) { return (<div className="Accordion">hello world</div>)}',
    errors: [{
      message: 'class name should be camelCase',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: 'function Accordion(props) { return (<div className="accordion">hello world</div>)}'
  }, // with fix = true, whitespace
  {
    code: '<div className=" helloWorld " />',
    errors: [{
      message: 'class name should be not have whitespace at start or end',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: '<div className="helloWorld" />'
  }, {
    code: '<div className=" helloWorld" />',
    errors: [{
      message: 'class name should be not have whitespace at start or end',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: '<div className="helloWorld" />'
  }, {
    code: '<div className="helloWorld " />',
    errors: [{
      message: 'class name should be not have whitespace at start or end',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: '<div className="helloWorld" />'
  }, {
    code: '<div className=" helloWorld ">hello world</div>',
    errors: [{
      message: 'class name should be not have whitespace at start or end',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: '<div className="helloWorld">hello world</div>'
  }, {
    code: '<div className=" helloWorld hiThere    ">hello world</div>',
    errors: [{
      message: 'class name should be not have whitespace at start or end',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: '<div className="helloWorld hiThere">hello world</div>'
  }, {
    code: 'function Accordion(props) { return (<div className=" helloWorld ">hello world</div>)}',
    errors: [{
      message: 'class name should be not have whitespace at start or end',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: 'function Accordion(props) { return (<div className="helloWorld">hello world</div>)}'
  }, // with fix = true, multi word classNames
  {
    code: 'function Accordion(props) { return (<div className="helloWorld HiThere">hello world</div>)}',
    errors: [{
      message: 'class name should be camelCase',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: 'function Accordion(props) { return (<div className="helloWorld hiThere">hello world</div>)}'
  }, {
    code: 'function Accordion(props) { return (<div className="HelloWorld hiThere">hello world</div>)}',
    errors: [{
      message: 'class name should be camelCase',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: 'function Accordion(props) { return (<div className="helloWorld hiThere">hello world</div>)}'
  }, {
    // weird example
    code: 'function Accordion(props) { return (<div className="helloWorld HelloWorld__whatever">hello world</div>)}',
    errors: [{
      message: 'class name should be camelCase',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: true
    }],
    output: 'function Accordion(props) { return (<div className="helloWorld helloWorld__whatever">hello world</div>)}'
  }, // with fix = false, camelCasing
  {
    code: 'function Accordion(props) { return (<div className="Accordion">hello world</div>)}',
    errors: [{
      message: 'class name should be camelCase',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: false
    }],
    output: 'function Accordion(props) { return (<div className="Accordion">hello world</div>)}'
  }, // no fix option - camelCase
  {
    code: 'function Accordion(props) { return (<div className="Accordion">hello world</div>)}',
    errors: [{
      message: 'class name should be camelCase',
      type: 'JSXIdentifier'
    }],
    options: [],
    output: 'function Accordion(props) { return (<div className="Accordion">hello world</div>)}'
  }, // with fix = false, whitespace
  {
    code: 'function Accordion(props) { return (<div className=" helloWorld ">hello world</div>)}',
    errors: [{
      message: 'class name should be not have whitespace at start or end',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: false
    }],
    output: 'function Accordion(props) { return (<div className=" helloWorld ">hello world</div>)}'
  }, // no fix option - whitespace
  {
    code: 'function Accordion(props) { return (<div className=" helloWorld ">hello world</div>)}',
    errors: [{
      message: 'class name should be not have whitespace at start or end',
      type: 'JSXIdentifier'
    }],
    options: [],
    output: 'function Accordion(props) { return (<div className=" helloWorld ">hello world</div>)}'
  }, // with fix = false, multi word classNames
  {
    code: 'function Accordion(props) { return (<div className="helloWorld HiThere">hello world</div>)}',
    errors: [{
      message: 'class name should be camelCase',
      type: 'JSXIdentifier'
    }],
    options: [{
      fix: false
    }],
    output: 'function Accordion(props) { return (<div className="helloWorld HiThere">hello world</div>)}'
  }]
});
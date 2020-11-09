"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rules = void 0;

var _classNamingRule = require("./rules/classNamingRule/classNamingRule");

var _isValidJsonInFunctionRule = require("./rules/isValidJsonInFunctionRule/isValidJsonInFunctionRule");

var rules = {
  classNaming: _classNamingRule.classNamingRule,
  isValidJsonInFunction: _isValidJsonInFunctionRule.isValidJsonInFunctionRule
};
exports.rules = rules;
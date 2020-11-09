import { classNamingRule } from "./rules/classNamingRule/classNamingRule";
import { isValidJsonInFunctionRule } from "./rules/isValidJsonInFunctionRule/isValidJsonInFunctionRule";

export const rules = {
  classNaming: classNamingRule,
  isValidJsonInFunction: isValidJsonInFunctionRule,
};

/**
 * Для структур неизвестного значения
 * Присвается тип any
 * @module any.ts
 * @description
 */
// @ts-ignore
import * as historyLib from "../any_lib";

var history = historyLib.default;

history.historyPush("test");
history.pop();
//     ^^^^^^ error

/**
 * Ситуации, когда использование any не является преступлением
 */
function getNextArrayElement(arg: any[], index: number) {
  return arg[index + 1] ? arg[index + 1] : undefined;
}

function variableIsNumber(arg: any): arg is Number {
  return typeof arg === "number";
}

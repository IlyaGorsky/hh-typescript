/**
 * Для структур неизвестного значения
 * Присвается тип any
 * @module any.ts
 * @description
 */
// @ts-ignore
import * as historyLib from "./any_lib";

var history = historyLib.default;

history.historyPush("test");
history.pop();
//     ^^^^^^ error

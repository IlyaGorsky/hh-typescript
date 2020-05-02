/**
 * Для структур неизвестного значения
 * Присвается тип any
 * @module any.ts
 * @description
 */
import * as historyLib from "./any_lib";

var history = historyLib.default;

history.push("test");
history.pop();
//     ^^^^^^ error

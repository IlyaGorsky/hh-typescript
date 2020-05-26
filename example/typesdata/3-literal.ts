/**
 * Строковые литеральные типы
 *
 * @name easing
 * @type {string}
 * @description переменой могут быть присвоены только union значения
 */
var easing: "in" | "out" | "easeInOut" | "lienar";

/**
 * Строковые литеральные типы алиас
 *
 * @alias easing
 */
type Easing = "in" | "out" | "easeInOut" | "lienar";
let animation: Easing = "out";

/**
 * Числовые литеральные типы
 *
 * @name numericCorners
 * @description переменой могут быть присвоены только union значения
 */
var numericCorners: 1 | 2 | 3 | 4;

/**
 * Числовые литеральные типы алиас
 *
 * @alias numericCorners
 */
type numericCorners = 1 | 2 | 3 | 4;

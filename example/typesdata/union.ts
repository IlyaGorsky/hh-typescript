/**
 * Объединения описывает значение, которое может быть одним из нескольких типов
 * @module union.ts
 * @description Использую вертикальную черту number | string | boolean
 */

/**
 * Переменная 2 с типами значения
 * @name userId
 */
var userId: number | string;

userId = 149;
console.log(userId);

userId = "149fff";
console.log(userId);

// userId = false;

/**
 * Игральаня кость
 *
 * @name dice
 * @description Числовой литерал
 */
var dice: 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Алиас для направлений
 *
 * @type Directions
 * @description С помощью оператора | можем составить алиас с перечеслением направлений
 */
type Directions = "up" | "down" | "left" | "right";
var whereMove: Directions = "up";

/**
 * Заполняет строку слева пробелами или новой строкой
 *
 * @param value {string}
 * @param padding {number|string}
 * @description Можем использовать тип для объединения параметра padding
 */
function padLeft(value: string, padding: number | string) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft("Hello world", 4));
console.log(padLeft("Hello world", " :) "));

/**
 * @module assertion.ts
 * @description
 *  type assertion приведение к типу
 *  мы можем подсказать компилятуру тип сущности
 *  приведение типа можно сделать 2 спосабами
 */
var helloWorldString: any = "Hello world";

// var helloWorldStringLength = (helloWorldString as Array<any>).pop();

/**
 * Cпособ 1
 */
var helloWorldStringLength: number = (<string>helloWorldString).length;

/**
 * Cпособ 2
 */
var helloWorldStringLength: number = (helloWorldString as string).length;

type Baz = { a: number; b: number };
let v1 = { a: 1, b: 2 } as Baz;
let v2 = { a: 1 } as Baz; // Супер тип
let v3 = { a: 1, b: 2, c: 3 } as Baz; // Подтип
// let v4 = { d: 4 } as Baz; // bad

let forms = document.querySelectorAll(".form") as NodeListOf<HTMLFormElement>;

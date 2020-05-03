/**
 * @module assertion.ts
 * @description
 *  type assertion приведение к типу
 *  мы можем подсказать компилятуру тип сущности
 *  приведение типа можно сделать 2 спосабами
 */
var helloWorldString: any = "Hello world";

// var helloWorldStringLen: object = (helloWorldString as Array<any>).pop();

/**
 * Cпособ 1
 */
var helloWorldStringLength: number = (<string>helloWorldString).length;

/**
 * Cпособ 2
 */
var helloWorldStringLength: number = (helloWorldString as string).length;

/**
 * @name Boolean
 * @description Логическое значение true или false
 */
var isTrue: boolean = true;

/**
 * @name String
 * @description Cтроки
 */
var userName: string = "";

/**
 * @name Number
 * @description Числовое значение
 */
var userId: number = 1;

/**
 * @name Null
 * @description Представляет собой пустое значение
 */
var studentInfo: null = null;

/**
 * @name Undefined
 * @description Переменная не имеющая присвоеного значения
 */
var react: undefined;
console.log(react);

/**
 * @name Array
 * @description Массивы
 */
var students: string[] = ["Jon", "Jane"];
var counters: number[] = [1, 2, 6];
var positive: boolean[] = [true, false];

/**
 * @name Object
 * @description Сложная структура данных состоящия из пары ключ значение
 */
var student: object = {
  id: new Date().getTime(),
  firstName: "Ilya",
  lastName: "Gorskiy",
};

/**
 * @name Enum
 * @description Набор числовых данных описанный с помощью строковых констант
 */
enum Frameworks {
  Angular, // 0
  React, // 1
  Vue, // 2
  Svelte, // 3
}
var currentFramework: string;
currentFramework = Frameworks[Frameworks.React];
// console.log(currentFramework)
// Frameworks[1] --> React

/**
 * @name Turple
 * @description Кортеж массивы но заране c известным набором элементов
 */
var userInfo: [string, number] = ["Ilya", 26];
var userName: string = userInfo[0];
// var userAge: string = userInfo[1];

/**
 * @name Any
 * @description Описывает данные которые могут быть не изветсны на момент написания приложения
 */
var someVar: any;

// console.log(someVar); // сейчас someVar - это string
// someVar = 20;
// someVar = "20"
// console.log(someVar); // сейчас someVar - это number

/**
 * @name Void
 * @description Отсутввие какого либо значения
 */
var result: void = undefined;

// undefined = 1;
// void 0;

/**
 * @name Never
 * @despcription Используется в качестве возвращаемого типа  функции например которые генирируют ошибку
 */
var error = (message: string) => {
  throw new Error(message);
};

var errorBadRequest = () => error("BadRequest");

/**
 * TODO:
 * @name Unknown
 * @description
 */

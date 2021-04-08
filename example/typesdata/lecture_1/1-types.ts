/**
 * Базовый тип any
 */
{
  // Тип any указывается при помощи ключевого слова any. Все типы в TypeScript
  // являются его подтипами. Это означает, что он совместим в обе стороны с любым другим
  // типом и с точки зрения системы типов является высшим типом (top type). 
  let apple: any = 0;
  apple = "";
  apple = true;

  // Если при объявлении переменных и полей не было присвоено значение, компилятором
  // будет выведен тип данных any .
  let lime; // lime: any
  let lemon; // lemon: any

  // Тоже самое справедливо для ф-ций, параметры и результат будут выведен как any
  let sum = function sum(a, b) { // function sum(a: any, b: any): any
    return a + b;
  }

  // Поскольку тип any позволяет работать со значением динамически, это не вызывает
  // ошибок при обращении. Что приводит пользу от типизации к нулю.
  let data: any = JSON.parse('{"id": "abc"}');
  let id = data.id; // ок
}


/**
 * Примитивные типы 
 * Number, String, Boolean, Symbol, BigInt 
 * @see https://tinyurl.com/1gyh8egu
 */
{
  /**
   * @name Number
   * @description В TypeScript, как и в JavaScript, все производные от number являются 64-битными 
   * числами двойной точности с плавающей запятой. 
  */
  let userId: number = 1; // number будет выведен явно
  let areaId = 113; // number будет выведен не явно
               // ^ infered type

  let binary: number = 0b101;
  let octal: number = 0o5;
  let decimal: number = 5;
  let hex: number = 0x5;

  // Тип number неявно преобразуется в тип Number , но не наоборот.
  let n: number = Number(5);
  let N: Number = new Number(5);
  
  // N.
  // N = n; // Ok
  // n = N; //Error -> Type 'Number' is not assignable to type 'number'.


  /**
   * @name String
   * @description Cтроки
   */
  let userName: string; // тип будет выведен явно
  let adminName = 'admin'; // тип будет выведен не явно
  
  // userName = 1
  // adminName = 1

  // Тип string неявно преобразуется в тип String , но не наоборот.
  // let s: string = String("");
  // let S: String = new String("");

  // S = s;
  // s = S;

  /**
   * @name Boolean
   * @description Логическое значение true или false
   */
  let isTrue: boolean = true; // тип будет выведен явно
  let isFalse = false; // тип будет выведен не явно

  // isTrue = 'true';

  // Тип boolean неявно преобразуется в тип Boolean , но не наоборот.
  // let b: boolean = Boolean(false);
  // let B: Boolean = new Boolean();

  // B = b;
  // b = B;
  

  /**
   * @name Symbol
   * @description Примитивный тип Symbol предоставляет уникальные идентификаторы, которые при
   *              желании могут использоваться в качестве индексируемых членов объекта
   */
  let someSymbol: symbol // тип будет выведен явно
  const uniqKey = Symbol('__meta__');

  // let someObject = {
  //   [uniqKey]: 'hashMeta'
  // }
  // let hash: string = someObject[uniqKey]


  /**
   * @name BigInt
   * @description — примитивный числовой тип позволяющий безопасно работать с числами
   * произвольной точности, в том числе значениями выходящими за пределы установленные типом Number.
   */
  let SomeBigInt: BigInt  // явное приведение типа
  let NumberBigInt = 9007199254740991n; // не явное приведение типов

  // let ManyBigInt: BigInt = BigInt(Number.MAX_VALUE) + NumberBigInt;
}


/**
 * Примитивные типы
 * Null, Undefined, Void, Never, Unknown
 * @see https://tinyurl.com/fklvs9b2
 */
{
  /**
   * @name Null
   * @description Представляет собой пустое значение
   */
  let currentDate: null = null;
  // тип null совместим со всеми типами, помимо него самого, с ним самим
  // совместим лишь тип undefined и any
  let anyDate: any;
  // currentDate = undefined;
  // currentDate = anyDate;

  // Это поведение можно изменить флагом --strictNullChecks (или общим флагом --strict)
  // strictNullChecks тип null является подтипом только одного типа any
  // currentDate = undefined;
  // currentDate = anyDate;
  
  /**
   * @name Undefined
   * @description неопределенный тип.
   * Тип undefined идентичен по своей работе с одноимённым типом из JavaScript
   */
  let react: undefined; 
  let vue = undefined;
  react = undefined;

  // При активном флаге --strictNullChecks , тип undefined является подтипом
  // только одного типа any .
  // let svelte: undefined = null;
  // let angular: any;


  /**
   * @name Void
   * @description Можно назвать полной противоположностью типа any , так как этот 
   * тип означает отсутствие конкретного типа. Основное предназначение типа Void — явно
   * указывать на то, что у функции или метода отсутствует возвращаемое значение.
   * Тип void является подтипом any и супертипом для null и undefined
   */
  let someFn = () => {}
  let analytics = {
    send(): any {}
  }
  let result: void = someFn();

  // При включенном --strictNullChecks , тип данных void совместим лишь с any и undefined .
  // result = null;
  // result = undefined;
  // result = analytics.send()

  // function a(): void {
  //   let result: number = 5;
  //   return result; // Error
  //  }

  //  function b(): void {
  //   let result: string = '5';
  //   return result; // Error
  //  }

  //  function c(): void {
  //   let result: any = 5;
  //   return result; // Ok
  //  }


  /**
   * @name Never
   * @despcription служит для указания того, что какие-либо операции никогда не будут выполнены.
   * Тип never можно указать только той функции, из которой программа действительно никогда не сможет выйти. 
   */
  let throwAppError = (message: string) => {
    throw new Error(`[APP]: message`);
  };

  let errorBadRequest = () => throwAppError("BadRequest");

  let infineLoop = () => {
    while(true) {}
  }


  /**
   * @name Unknown
   * @description Тип является типобезопасным аналогом типа any и представлен в виде
   *  литерала unknown . Все типы совместимы с типом unknown , в то время как сам тип
   *  unknown совместим только с самим собой и типом any
   *  ВАЖНО: над типом unknown запрещено выполнение каких-либо операций.
   */
  class CoolLibrary {
    // @ts-ignore
    sum(a, b) { return a + b }
  }
  let calc: unknown = new CoolLibrary();

  // calc.sum();

  const sumMethodGuard = (obj:any): obj is { sum(a: number, b:number): number} => {
    return 'sum' in obj && typeof obj.sum === 'function';
  }

  if (sumMethodGuard(calc)) {
    const sum = calc.sum(1, 2);
  }

  // let calc: any = new CoolLibrary();
  // calc.pow = () => {}

}


/**
 * Примитивный Тип 
 * @name Enum
 * @description Набор числовых данных описанный с помощью строковых констант
 * это конструкция, состоящая из набора именованных констант, именуемая
 * списком перечисления и определяемая такими примитивными типами, как number и string .
 * @see https://bit.ly/3dfcZLw
 */
{
  enum Frameworks {
    Angular, // 0
    React, // 1
    Vue, // 2
    Svelte, // 3
  }

  let currentFramework: string;
  currentFramework = Frameworks[Frameworks.React];
  // console.log(Frameworks[1]) --> React

  let idFrameworkd: number = Frameworks.React;

  enum Code {
    Ok = 200,
    BadRequest = 400
  }

  enum Currency {
    USD = 1, // 1
    EUR, // 2
    RUR = 4,
    GBP // 5
  }

  let gbp: 4;
  // let gbp: 5;
  gbp = Currency.GBP;

  // Псевдоним
  enum Fruits {
    Apple, // 0
    Pear, // 1
    Banana, // 2
    LaPomme = Apple // 0
  }

  // Так же можно указывать строковые значения
  enum FruitColors {
    Red = "#ff0000",
    Green = "#00ff00",
    Blue = "#0000ff"
  }
  
  /**
   * Перечисление enum объявленное с помощью ключевого слова const после
   * компиляции не оставляет в коде привычных конструкций.
   */

  const enum Color {
    Apple = 'green'
  }

  let colorApple = Color.Apple;
}


/**
 * Типы данных
 * Object, Array, Tuple
 */
{
  /**
   * @name Object
   * @description Ссылочный тип данных Object является базовым для всех ссылочных типов в TypeScript.
   *              Идентичен по своей работе одноименному типу из JavaScript.
   */
  let simpleObject: object;

  simpleObject = {};
  simpleObject = 5; 
  simpleObject = true;
  
  simpleObject = null; // Error, strictNullChecks = true
  simpleObject = undefined; // Error, strictNullChecks = true

  let student: { id : number, firstName: string, lastName: string};
  student =  {
    id: 1,
    firstName: "Ilya",
    lastName: "Gorskiy",
    // phone: '777 77 77',
  }
  // student.phone


  /**
   * @name Array
   * @description Ссылочный тип данных Array является типизированным спископодобным объектом,
   * содержащим логику для работы с элементами.
   */
  let students: string[] = ["Jon", "Jane"];
  let counters: number[] = [1, 2, 6];
  let boolArray: boolean[] = [true, false];
  let mixedArray = [...students, ...counters];

  // students.push(1) // Error

  // mixedArray.push("asdsa"); // Error

  class Animal {
    say?: string;
    voice() {}
  }
  class Cat extends Animal { voice() {} }
  class Dog extends Animal { say: 'Woof'; voice() {}}
  
  // const animals = [new Dog];
  const animals = [new Cat, new Dog];
  animals.push({say: ''});

  const catAndDogs = [new Cat, new Dog];
  catAndDogs.push(new Animal)

  /**
   * @name Tuple
   * @description Tuple (кортеж) описывает строгую последовательность множества типов, каждый
   *               из которых ограничивает элемент массива с аналогичным индексом. 
   */
  let userInfo: [string, number] = ["Ilya", 26];
  let userName: string = userInfo[0];
  let userAge: number = userInfo[1];

  // Кортеж поддерживате spread оператор
  type Strings = [string, string];
  type Numbers = [number, number];
  type Mixed = [...Strings, ...Numbers];
  let mixedTuple: Mixed;

  // mixedTuple.

  // Кортеж также поддерживает spred оператор
  function f(...rest: [number, string, boolean]): void {}
}




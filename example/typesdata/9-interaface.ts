/**
 * Interface
 * @module interface.ts
 * @description Интерфейсы выполняют роль способа определния контрактов в коде
 *              Интерфейсы называют структурным подтипом, т.е форма должна подчиняться описанной структуре
 */

interface IUser {
  firstName: string;
  lastName: string;
}

function prinUserFullName(user: IUser): void {
  console.log(`${user.firstName} ${user.lastName}`);
}

function printUserName(userObj: { firstName: string }) {
  console.log(userObj.firstName);
}

var someUser = {
  firstName: "Dead",
  lastName: "Pool",
} as const;

var someArray = [1, 2] as const;

someArray.push(1);

// prinUserFullName({ foo: 123, baz: 456 });
prinUserFullName(someUser);
printUserName({ firstName: "Dead" });

/**
 * Optional Properties
 * @description Опциональные поля
 *              Интефрейсы с не обязательными свойствами помечаются знаком ?
 */
interface UserConfig {
  name: string;
  age?: number;
}

function createUserConfig(userConfig: UserConfig): { id: string } {
  const number: number = Math.random();
  const id: string = number
    .toString(36)
    .substr(2, userConfig.age || userConfig.name.length);

  return {
    id,
  };
}

createUserConfig({ name: "Ilya" });
// createUserConfig({ age: 20 });

/**
 * Readonly Properties
 * @description Свойства для чтения
 *              Свойства обзначеные readonly могут быть изменины только при первончальном создании объекта
 */
interface IPoint {
  readonly x: number;
  readonly y: number;
}

var cursor: IPoint = {
  x: 20,
  y: 20,
};

cursor.x = 10;

/**
 * Excess Property Checks
 * @description Избытачная проверка на типы
 */
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  const newSquare = { color: "black", area: 100 };

  if (config.color) {
    newSquare.color = config.color;
  }

  if (config.width) {
    newSquare.area = config.width * config.width;
  }

  return newSquare;
}

createSquare({ color: "20fa", width: 20, opacity: 0.5 });
//                                          ^^^^^^^^^^^^  does not exist in type SquareConfig
// typescript не дает возможность передать объект больше чем перечислеными свойствами в SquareConfig

/**
 * Cпособ 1
 * Можно решить эту проблему с помощью  приведением типа
 */
createSquare({ color: "20fa", width: 20, opacity: 0.5 } as SquareConfig);

/**
 * Cпособ 2
 * Для работы интефрейса с остальным набором любых свойств;
 * Нужно указать что ключ может быть типа string а значение типа any
 */
interface SuperSquareConfig {
  color?: string;
  width?: number;
  [x: string]: any;
  // ^^^^^^^^^^^^^^^ достаточно
}

/**
 * Function Types
 * @description Интерфейсы способны описывать типы функций
 */
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
};

mySearch = function (src, sub) {
  let result = src.search(sub);
  return "string";
};

/**
 * Extending Interfaces
 * @description Наследование интефрейсов, работает как наследование классов. Череез ключевое слово extends
 */
type ShapeColor = {
  color: string;
};

class ShapeColorClass {
  color: string;

  constructor(color: string) {
    this.color = color;
  }
}

var someVarColor: ShapeColor = new ShapeColorClass("ted");

// var s =

// someVarColor = s;

interface PenStroke {
  penWidth: number;
}

/**
 * Комбинация интерфейсов
 */
interface Square extends ShapeColor, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

/**
 * Наследование - не тоже самое что объединение типов
 */
interface IUserDB {
  id: number;
  nickName: string;
}

interface ISession {
  id: number;
  nickName: boolean;
  hhid: string;
}

// Такой интерфейс не получится создать, т.к. типы не идентичны
interface IUserDBSession extends IUserDB, ISession {}

// Тип можно сделать через объединение, но он будет заведомо неправильным
type UserSession = IUserDB & ISession;

const userSession: UserSession = {
  id: 1,
  hhid: "123abc",
  nickName: "a", // должно быть never
};

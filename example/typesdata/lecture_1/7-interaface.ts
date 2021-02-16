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

let someUser = {
  firstName: "Dead",
  lastName: "Pool",
};

prinUserFullName(someUser);
// prinUserFullName({ firstName: "Dead" });

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
  return {
    id: 'u1'
  };
}

createUserConfig({ name: "Ilya" });
createUserConfig({ age: 20, name:"Ilya" });

/**
 * Readonly Properties
 * @description Свойства для чтения
 *              Свойства обзначеные readonly могут быть изменины только при первончальном создании объекта
 */
interface IPoint {
  readonly x: number;
  readonly y: number;
}

let cursor: IPoint = {
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

function createSquare(config: SquareConfig) {}

createSquare({ color: "20fa", width: 20, opacity: 0.5 });
//                                          ^^^^^^^^^^^^  does not exist in type SquareConfig
// typescript не дает возможность передать объект больше чем перечислеными свойствами в SquareConfig

/**
 * Cпособ 1
 * Можно решить эту проблему с помощью  приведением типа (casting type)
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
function createSuperSquare(config: SuperSquareConfig) { }
createSuperSquare({ color: "20fa", width: 20, opacity: 0.5 });

/**
 * Способ 3 Стурктурная типизация
 */

const meaningfulPoint = {
  opacity: 0.5,
  color: 'red',
}; 

const point: SquareConfig = meaningfulPoint; 

/**
 * Function Types
 * @description Интерфейсы способны описывать типы функций
 */
interface SearchFunc {
  (source: string, subString: string): boolean;  
}

let mySearch: SearchFunc;

mySearch = function (src, sub) {
  let result = src.search(sub);
  // return 1;
  return true
};

/**
 * Extending Interfaces
 * @description Наследование интефрейсов, работает как наследование классов. Череез ключевое слово extends
 */
interface ShapeColor  {
  color: string;
};

interface ShapePosition {
  x: number,
  color: number
}

class ShapeColorClass implements ShapeColor {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
}
const someVarColor: ShapeColor = new ShapeColorClass("red");

class ShapeClass implements ShapeColor, ShapePosition {
  color: string;
  x: 1;
  y: 2
}


/**
 * Комбинация интерфейсов
 */
interface ShapeColor {
  color: string;
}
interface PenStroke {
  penWidth: number;
}
interface Square extends ShapeColor, PenStroke {
  sideLength: number;
}

let square: Square;

square = {
  color: "blue",
  sideLength: 10,
  penWidth: 5
}



/**
 * Мержинг интерфейсов
 */

interface Car {
  model: string;
}

interface Car {
  fuel: boolean
}

let bmwCar: Car = {
  model: 'f30',
  fuel:true
}


// Полезный пример - можно расширять глобальный интерфейс
interface Window {
  webkitAudioContext: typeof AudioContext;
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// type vs interface
// типа можно реализовать или расширить, только если он представляет объектный тип
// ( object type ) или пересечение объектных типов со статически известными членами.
// Кроме того, псевдонимы типов нельзя использовать в таких операциях с типами
// времени выполнения как typeof и instanceof . Если псевдоним типа будет создан
// для объекта, то при попытке создать его экземпляр возникнет ошибка.

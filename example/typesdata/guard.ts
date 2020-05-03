/**
 * Защита типов и различие типов
 * @modue guard.ts
 * @description Защита это некотрая выполняемая проверка в момент выполнение некой ф-ции
 */

interface Fish {
  swim(): string;
}

interface Bird {
  fly(): string;
}

function getSmallPet(): Fish | Bird {
  var smallBird: Bird = {
    fly() {
      return "fly fly fly";
    },
  };

  var smallFish: Fish = {
    swim() {
      return "swim swim";
    },
  };
  return Math.random() * 1 < 0.5 ? smallBird : smallFish;
}

let pet = getSmallPet();

// function printConsoleSayPet(pet: Fish | Bird): void {
//   //   Каждый доступ к свойству приведет к ошибке
//   if (pet.swim) {
//     console.log(pet.swim());
//   } else if (pet.swim) {
//     console.log(pet.fly());
//   }
// }

// Для различие типов испольузется конструкция type assertion, т.е приведения типа
// function printConsoleSayPet(pet: Fish | Bird): void {
//   if ((<Fish>pet).swim) {
//     (<Fish>pet).swim();
//   } else {
//     (<Bird>pet).fly();
//   }
// }

// User defineds type guard
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

function printConsoleSayPet(pet: Fish | Bird): void {
  if (isFish(pet)) {
    console.log(pet.swim());
  } else {
    console.log(pet.fly());
  }
}

/**
 * typeof guard
 * @param x
 */
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function sum(a: number, b: number): number | never {
  if (isNumber(+a) && isNumber(+b)) {
    return +a + +b;
  }
  throw new Error("Expected arugments typeof number");
}

/**
 * Instance of guard
 */
class Foo {
  foo = 123;
  common = "123";
}

class Bar {
  bar = 123;
  common = "123";
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo);
  }
  if (arg instanceof Bar) {
    console.log(arg.bar);
  }
}

doStuff(new Foo());
doStuff(new Bar());

/**
 * Literal Type Guard
 */
type Role = "Applicant" | "Employer" | "Admin";

interface UserData {
  role: Role;
}

function getUserRole(user: UserData): Role | void {
  if (user.role === "Applicant") {
    return "Applicant";
  } else if (user.role === "Employer") {
    return "Employer";
  } else if (user.role === "Admin") {
    return "Admin";
  }
}

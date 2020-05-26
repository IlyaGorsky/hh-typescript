/**
 * @module function.ts
 * @description Фунцкии в ts
 */


/**
 * Результат выполнеия функции 
 */
function printHelloWolrd() :void {
  console.log("Hello World");
}

/**
 * Типизация параметра
 */
function printHelloByName(name: string): void {
  console.log(`Hello wrold, your name: ${name} !`);
}

/**
 * Типизация результата
 */
function getCurrentTime(): number {
  return Date.now();
}

/**
 * Значение по умолчанию
 */
function buildName(firstName = "Will", lastName: string):string {
  return firstName + " " + lastName;
}
let result1 = buildName("Bob"); // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
let result3 = buildName("Bob", "Adams"); // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams"); // 


/**
 * Опциональный параметр
 */
function getPriceByCountry(price: number, countryCode?: string): number {
  if (countryCode === "RU") {
    return price * 0.5 + price;
  }

  return price;
}
getPriceByCountry(10);
getPriceByCountry(12, "RU");

/**
 * Сигнатура функции
 */
type SomeFunction = (a: number, b: number) => number;
let f: SomeFunction = (a: number, b: number): number => a + b;

// var f2: SomeFunction = (a, b) => a + b
// f(2, "2")


interface CountryPrice  {
    code: string;
    price: number;
}

/**
 * Перезагрузка функции
 */
function getDiscountByCountry(price: number): number;
function getDiscountByCountry(price: number, countryCode: 'RU' | 'EN'): CountryPrice;
function getDiscountByCountry(price: number, countryCode: string): CountryPrice;
function getDiscountByCountry(price: number, countryCode?: string) : number | CountryPrice {
  if (countryCode === "RU" || countryCode === "EN") {
    let result = { code: countryCode, price: (price / 5) * 100}
    return result;
  }

  if(countryCode) {
    let result = {code: countryCode, price}; 
    return result;
  }

  return price
}
getDiscountByCountry(20)
getDiscountByCountry(10, "EN")
// getDiscountByCountry(10) + getDiscountByCountry(10, "RU")


/**
 * Rest 
 * Типизированый рест
 */
type Member = {name: string}

function isMember(member: Member): member is Member  {
  return (<Member>member).name !== undefined
}

function greeting(communityName:string, ...names:Member[] | string[]):void {
  if((names as any).some(isMember)) {
    console.log(`Hello new members ${communityName} community: ${(names as Member[]).map(member => member.name).join(',') }!`)
  } else {
    console.log(`Hello new members ${communityName} community: ${names.join(",")}!`)
  }
}

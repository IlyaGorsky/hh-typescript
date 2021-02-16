/**
 * @module function.ts
 * @description Фунцкии в ts
 */

{

  /**
   * Типизация параметра
   */
  function printHelloByName(name: string) {
    console.log(`Hello wrold, your name: ${name} !`);
  }

  /**
   * Типизация результата
   */
  function getCurrentTime():number {
    return Date.now();
  }

  /**
   * Значение по умолчанию
   */
  function buildName(firstName = "Will", lastName: string):string {
    return firstName + " " + lastName;
  }
  let result1 = buildName("Bob"); // error
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

  let res: number = getPriceByCountry(10);
  getPriceByCountry(12, "RU");


  /**
   * Опциональный параметр литерал
   */
  function someFunction(foo: 1, bar?: "bar") { }

  someFunction(1, "bar");
  // someFunction(2);
  // someFunctio(1, "baz")

  // Типизрованый spread + tuple
  function spreadFn(foo, ...rest: [{ id: string }, { id: {} }, ...number[]]) {
    rest[0].id + rest[3]
    // rest[1].id + rest[3]
  }

  // Алиас для функции
  type SomeFunction = (a: number, b: number) => number
  let fn2: SomeFunction = (a, b) => a + b;

  // Анотация типа для функции
  let fn: (a: number, b: number) => number
  fn = (a, b) => a + b
}


/**
 * Перезагрузка функции (overload)
 * @name Overload
 */
{
  type CountryPrice  = {
    code: string;
    price: number;
  }

  function getDiscountByCountry(price: number): number;
  function getDiscountByCountry(price: number, countryCode: 'RU' | 'EN'): CountryPrice;
  function getDiscountByCountry(price: number, countryCode: string): CountryPrice;
  function getDiscountByCountry(price: number, countryCode?: string) {
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


  const ua = getDiscountByCountry(10, "UA");
  const sum = getDiscountByCountry(20)+getDiscountByCountry(20)
  const discountEN = getDiscountByCountry(10, "EN")
  const sumRU = getDiscountByCountry(10) + getDiscountByCountry(10, "RU")
}
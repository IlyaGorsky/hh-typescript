/**
 * Alias
 * @module alias.ts
 * @description Псеводонимы типа создают новое имя для типам
 *              Псевдомиы могут иминовать примитивы, использовать объяедения, кортежи и пересечения.
 *              Создаются с помощью ключевого слова type
 */
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameResolver): Name {
  if (typeof n === "string") {
    return n;
  }

  return n();
}

/**
 * Псевдоимы типа могут использовать параметры с правой стороны объявления типа
 */
type UserInput<T> = { value: T };

/**
 * Псевдонимы могут ссылаться сами на себя тем самым делать вложеные структуры
 */
type Tree<T> = { value: T; left?: Tree<T>; right?: Tree<T> };

let tree: Tree<number> = { value: 1, left: { value: 2 }, right: { value: 3 } };

/**
 * Рекурсия
 * Связанаые списки
 */
type LinkidList<T> = T & { next?: LinkidList<T> };

interface Person {
  name: string;
}

let people: LinkidList<Person>;
people = {
  name: "Ilya",
  next: {
    name: "Alex",
    next: {
      name: "Danila",
    },
  },
};
people.name;
people.next?.name;

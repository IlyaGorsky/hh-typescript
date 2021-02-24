// На этом митапе мы будем писать логические конструкции внутри типов
// программировать типы, создавать универсальные компоненты, и разберемся как работает абракадабра в елочках <T>
// будем писать код, который позволит писать меньше кода

// Одна из вещей, которая пригодится нам в дальнейшем это возможность определения типа который мы явно не описывали - конструкция typeof

// Как говорили на прошлом митапе, всегда писать типы необзятально
// Когда мы пишем обычный js код полагаясь на автоматический вывод типов, мы делаем примерно так:
{
  const book = {
    name: "Learn TS",
    pages: 20,
    author: {
      name: "HH",
      about: "Best of the best",
      email: "dev@hh.ru",
    },
  };

  const title = book.name.toUpperCase();

  // в этом случае мы отдельно не описываем интерфейс книги, и сразу пишем код

  // теперь нам нужно написать функцию, которая будет работать с авторами книг
  // первый способ в лоб - описать структуру объекта автора
  {
    function sendMailToAuthor(author: {
      name: string;
      about: string;
      email: string;
    }) {
      return `mail to ${author.name} <${author.email}>`;
    }
  }

  // в этой ситуации нам нужно следить что в коде структура не изменится для автора
  // теперь используя конструкцию typeof перепишем функцию
  {
    function sendMailToAuthor(author: typeof book.author) {
      return `mail to ${author.name} <${author.email}>`;
    }
  }

  // все просто, везде работает
  // тоесть мы можем напрямую пользоваться возможностью тайпскрипта в автоматическом выводе типов
  type author = typeof book.author;
  type authorName = typeof book.author.name;

  // следующая конструкция, позволяющая модифицировать интерфейсы, не исползьуя при этом написание ts кода - as const
  const book2 = {
    name: "Learn TS",
    author: {
      name: "HH",
      about: "Best of the best",
      email: "dev@hh.ru",
    },
  } as const;

  book2.author.name = "Yandex"; // ошибка, потому что name readonly

  // для обычного js кода мы добаили as const, тем самым сделав объект немодифицируемым рекурсивно
  // as const можно использовать на любом уровне вложенности, где это необходимо
  // так же применять его к массивам и другим примитивам

  const bookAuthors = ["John Doe", "Vasya Pupkin"];
  const boorAuthorsTuple = ["John Doe", "Vasya Pupkin"] as const;
  // на столько const что push не работает
  boorAuthorsTuple.push("No Name");
  const badBookAuthors = bookAuthors as const;

  // Обратите внимание что последняя запись не имеет смысла, потому что тип уже вывелся как string
  // И чем массив отличается от кортежа
  // Хороший пример - состояние в реакте нельзя мутировать

  // условные типы
  // Например, мы хотим создать новую структуру книги на основе старой, если она соответствует нашим параметрам
  // мне главное, чтобы в новой книге было хотябы кол-во страниц
  type book1Type = typeof book;
  type book2Type = typeof book2;
  type formats = "A4" | "A5" | "A6";

  type newBook1 = book1Type extends { pages: number }
    ? book1Type & { format: formats }
    : { pages: number; format: formats };

  type newBook2 = book2Type extends { pages: number }
    ? book2Type & { format: formats }
    : { pages: number; format: formats };

  // "неживой" пример попроще
  type MyBooleanType = true;
  type InverseType = MyBooleanType extends true ? false : true;

  // Наконец немного притронемся к дженерикам
  // Конструкции выше выглядят очень статично и неудобно для использования. Тоесть, используются только по месту.
  // С помощью дженериков эти конструкции можно сделать универсальными
  // Сами по себе дженерики можно представить как обычные js функции, у которых может быть несколько аргументов
  // А использование дженериков - вызов этих функций с передачей аргументов
  type newBook<T> = T extends { pages: number }
    ? T & { format: formats }
    : { pages: number; format: formats };

  type newBookFrom1 = newBook<book1Type>;
  type newBookFrom2 = newBook<book2Type>;
  // Как видно, мы написали универсальный тип который можно использовать для создания интерфейсов новых книг
  // сохраняя старый формат

  // Рассмотрим другой пример, мы хотим научиться добавлять любой любой сущности какой то служебный параметр
  type Entity<T> = T & { id: number };
  type book1Entity = Entity<book1Type>;
  type book2Entity = Entity<book2Type>;
  type book3Entity = Entity;

  // Аргументы внутри дженерика тоже могут иметь значение по умолчанию, как и в js
  type BaseEntity<T = { pages: number }> = T & { id: number };
  type book1BaseEntity = BaseEntity<book1Type>;
  type book2BaseEntity = BaseEntity<book2Type>;
  type book3BaseEntity = BaseEntity;

  // Еще аргументы могут быть типизированы - типизация внутри типизации
  type BookEntity<T extends { pages: number }> = T & { id: number };
  type bookEntity1 = BookEntity<book1Type>;
  type bookEntity2 = BookEntity<book2Type>;
  type bookEntity3 = BookEntity<{ pages: 1 }>;

  // Слово extends в этом случае подразумевает уже условие наследования типа
  // может ли передаваемый тип разширять заданный

  // Задан тип и задано дефолтное значение
  type BookEntityWithDefault<
    T extends { pages: number } = { pages: number }
  > = T & { id: number };
  type _bookEntity1 = BookEntityWithDefault<book1Type>;
  // Если интерфейс не подходит - то дефолтный использоваться не будет
  type _bookEntity2 = BookEntityWithDefault<book2Type>;
  type _bookEntity3 = BookEntityWithDefault;

  // Exclude, Extract - готовые дженерики, которые позволяют убирать или сохранять свойства в объединенных типах
  type withoutA5 = Exclude<formats, "A5">;
  type onlyA5 = Extract<formats, "A5">;

  // Использование на живом коде для дженерных функций
  // Функция которая вернет то что ей было передано
  function getArgument(argument: any) {
    return argument;
  }

  const example1 = getArgument(1);
  // чтоб все работало как надо, используем дженерик
  {
    function getArgument<T>(argument: T) {
      return argument;
    }

    const example1 = getArgument("abc");
  }

  // Следующая конструкция которая исползьуется при более продвинутом выводе типов - infer
  // рассмотрим на примере

  const books = [book, book, book];

  // хотим вывести тип который используется внутри массива
  // решение в лоб - исползьовать первый или любой элемент массива

  type bookType1 = typeof books[0];
  type bookType2 = typeof books[100];
  type bookType3 = typeof books[number]["author"];

  type bookType4 = typeof books extends (infer U)[] ? U : never;
  type bookType5 = typeof books extends { pages: infer U }[] ? U : never;

  // Практической пользы пока мало, но этот простой пример чтоб дальше было понятнее
  // Примеры с Parameters, ReturnType

  // Индексы и перечисления
  // Как мы можем задать ключи для интерфейса и как мы можем получить ключи интерфейса
  // Есть переводы (тип или интерфейс не имеет значения) и их тип будет выглядеть примерно так
  type trls = {
    [key: string]: string;
  };
  // 2 вещи которые нужно знать:
  // вместо key можно использовать любоу другое слово, изменится только подсказка
  // Индексом может быть только строка или число
  // как вывести индексы - ключевое слово keyof
  type bookIndex = keyof typeof book;
  // если вывести индексы из trls, будет number|string
  // потому что мы можем обращаться к объектам и по строке и по числу
  type trlsIndex = keyof trls;
  // При этом, если мы изменим key на number, тип станет только number,
  // потому что к массивам мы должны обращаться только по индексу
  // не смотря на то что можно обратиться к элементу массива строкой - ts считает это опасным преобразованием
  // из любого числа можно сделать строку, но не из любой строки можно сделать число

  // Mapped types, составление новых типов на основе старых
  // Например, мы хотим сделать все свойства в книге необязательными, или доступными только для чтения
  type book = {
    name: string;
    pages: number;
  };
  // Нам нужно взять каждый ключ из этого интерфейса и сделать его readonly
  type readonlyBook = {
    readonly name: string;
    readonly pages: number;
  };
  // Но есть способ проще, мы можем перечислить ключи объекта таким образом
  type readonlyBook2 = {
    [K in keyof book]: book[K];
  };
  // Что делает keyof мы уже знаем - выводит ключи, a in проходим по этим ключам как это делает for..in
  // переменная K прикрепляется по очереди к каждому свойству из типа объединения (union) book
  // Нельзя расширить перечислямый интерфейс внутри, можно использовать только объединение &

  // Мы можем изменить тип всех свойств, изменить названия свойств
  // изменить атрибуты (обязательный/необязательный, readonly добавить убрать),
  type bookGetters = {
    readonly [K in keyof book as `get${Capitalize<K>}`]?: book[K];
  };
  // Можно сделать такие штуки дженерно
  type generedBookGetters<T> = {
    readonly [K in keyof T as `get${Capitalize<string & K>}`]?: T[K];
  };
  // Partial, Required, Readonly
  // Pick, Omit
  // Record
}

/**
 * Дженерики - обобщенные типы, способные работать с разными сущностями
 */

/**
 * Как работает дженерный Array
 * Array<number> === IArray<number> === number[]
 */
{
  interface IArray<T = any> {
    // Вместо T можно использовать любые имена. ItemType например
    [key: number]: T;
  }

  const array1: IArray = [1, "2", true];
  const array2: IArray<number> = [1, 2, 3];
  const _array2: IArray<number> = [1, "2", true];
}

/**
 * Дженерные функции
 */
{
  const addVariableToSession = <T>(variable: T) => {
    return {
      id: 1,
      nickName: "John",
      additionalProp: variable,
    };
  };

  const userSession = addVariableToSession({
    hhid: "123456",
    hhuid: "abcdef",
    token: "asdjh873hrhjb!usdhf",
  });

  console.log(userSession.additionalProp.token);
}

/**
 * Зависимый тип и extends
 */
{
  const getObjectProperty = <
    Source extends { a: number },
    PropName extends keyof Source
  >(
    source: Source,
    propName: PropName
  ) => {
    return source[propName];
  };

  const sourceObjectExample = {
    a: 1,
    b: "2",
    c: true,
  };

  const aPropFromSource: number = getObjectProperty(sourceObjectExample, "a");
  const aPropFromSourceAuto = getObjectProperty(sourceObjectExample, "a");
  const aPropFromSourceError: boolean = getObjectProperty(
    sourceObjectExample,
    "a"
  );

  const dPropFromSource: boolean = getObjectProperty(sourceObjectExample, "d");
  const badSource = getObjectProperty({ b: 5 }, "d");
}

/**
 * Нерабочий пример
 * propName тип определен уже внутри определения функции, и может быть любым ключем из объекта, а не конкретным
 * из за чего возвращаемый тип так же может быть любым типом из всех, которые есть в объекте source
 */
{
  const getObjectProperty = <Source extends {}>(
    source: Source,
    propName: keyof Source
  ) => {
    return source[propName];
  };

  const sourceObjectExample = {
    a: 1,
    b: "2",
    c: true,
  };

  const aPropFromSource: number = getObjectProperty(sourceObjectExample, "a");
}

/**
 * Еще нерабочий пример - пробуем без дженерика
 */
{
  const getObjectProperty = (source: {}, propName: keyof typeof source) => {
    return source[propName];
  };

  const sourceObjectExample = {
    a: 1,
    b: "2",
    c: true,
  };

  const aPropFromSource: number = getObjectProperty(sourceObjectExample, "a");
}

/**
 * Зависимый тип посложнее
 */
{
  const deletePropertiesFromObject = <
    Source extends {},
    PropName extends keyof Source
  >(
    source: Source,
    deleteProps: PropName[]
  ): Omit<Source, PropName> => {
    deleteProps.forEach((key) => {
      delete source[key];
    });
    return source;
  };

  const sourceObjectExample = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };

  const objectWithoutAB = deletePropertiesFromObject(sourceObjectExample, [
    "a",
    "b",
  ]);

  console.log(objectWithoutAB.a);
  console.log(objectWithoutAB.b);
  console.log(objectWithoutAB.c);
  console.log(objectWithoutAB.d);
}

/**
 * Дженерный интерфейс
 */
{
  interface AbstractIcon<Kind extends string = "default"> {
    size: 16 | 24 | 32;
    kind: Kind;
  }

  const defaultIcon: AbstractIcon = { size: 16, kind: "default" };
  const _defaultIcon: AbstractIcon = { size: 16, kind: "loading" };

  const removeIcon: AbstractIcon<"remove"> = { size: 16, kind: "remove" };

  const _removeIcon: AbstractIcon<"remove"> = { size: 16, kind: "default" };
  const __removeIcon: AbstractIcon<"remove"> = { size: 16, kind: "loading" };
}

/**
 * Дженерный класс
 */
{
  interface IPageDefaultState {
    pageName: string;
  }

  class Page<PageState extends {}> {
    fullPageState: IPageDefaultState & PageState;

    constructor(additionalPageState: PageState, pageName: string) {
      this.fullPageState = { pageName, ...additionalPageState };
    }
  }

  interface IVacancyPage {
    id: number;
    name: string;
    company: { name: string };
  }

  const vacancyPage = new Page<IVacancyPage>(
    {
      id: 1,
      name: "vacancy name",
      company: {
        name: "company name",
      },
    },
    "vacancy_view"
  );

  console.log(vacancyPage.fullPageState.name);
  console.log(vacancyPage.fullPageState.pageName);
}

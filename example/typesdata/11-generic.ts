/**
 * Дженерики - универсальные типы, способные работать с разными сущностями
 */

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
 * Зависимый тип
 */
{
  const getObjectProperty = <Source extends {}, PropName extends keyof Source>(
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
  const dPropFromSource: boolean = getObjectProperty(sourceObjectExample, "d");

  const aPropFromSourceError: boolean = getObjectProperty(
    sourceObjectExample,
    "a"
  );
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
  console.log(objectWithoutAB.c);
}

/**
 * Как работает дженерный Array
 * Array<number> === IArray<number> === number[]
 */
{
  interface IArray<T = any> {
    [key: number]: T;
  }

  const array1: IArray = [1, "2", true];
  const array2: IArray<number> = [1, 2, 3];
  const _array2: IArray<number> = [1, "2", true];
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

/**
 * Объединения описывает значение, которое может быть одним из нескольких типов
 * @module union.ts
 * @description Использую вертикальную черту number | string | boolean
 */

/**
 * Переменная 2 с типами значения
 * @name userId
 */
var userId: number | string;

userId = 149;
console.log(userId);

userId = "149fff";
console.log(userId);

// userId = false;

/**
 * Заполняет строку слева пробелами или новой строкой
 *
 * @param value {string}
 * @param padding {number|string}
 * @description Можем использовать тип для объединения параметра padding
 */
function padLeft(value: string, padding: number | string) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft("Hello world", 4));
console.log(padLeft("Hello world", " :) "));

/**
 * Игральаня кость
 *
 * @alias Dice
 * @name dice
 */
type Dice = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Алиас для направлений
 *
 * @alias Directions
 */
type Directions = "up" | "down" | "left" | "right";
var whereMove: Directions = "up";

interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

/**
 * Литерал с объединением типамиинтерфейсов
 *
 * @name Shape
 * @type {object}
 */
var Shape: Square | Rectangle | Circle;

Shape = {
  kind: "square",
  size: 10,
};

// Shape.width;

/**
 * Алиас c объединением интерфейсов
 * @alias Shape
 */
type Shape = Square | Rectangle | Circle;

// const figure: Shape = {
//   kind: "rectangle",
//   width: 10,
//   height: 10,
// };

// function getFigureWidth(fig: Shape): number {
//   switch (fig.kind) {
//     case "rectangle":
//       return fig.width;
//     case "circle":
//       return fig.radius * 2;
//     case "square":
//       return Math.sqrt(fig.size);
//   }
// }

/**
 * Intersection types
 * @description Пересечение типов
 * @example Типы пересечения похожи на типы объединения, но используются для группировки не скольких типов в один общий
 *          Для примера напишем функцию получение все избранных статей пользователя с типизируемым ответом
 *          Ответ может быть ErrorHandling & User & ArticlesData это значит что ответ будет иметь все члены трех типов
 *          Воспользуемся оператом & для вывода нового типа с пересчение всех объектов
 *          UserFavoritesResponse = UserDataResponse & ArticlesDataResposne;
 */

interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface UserModel {
  favorties: { name: string }[];
}

interface ArticlesData {
  articles: { name: string }[];
}

type UserDataResponse = UserModel & ErrorHandling;
type ArticlesDataResposne = ArticlesData & ErrorHandling;
type UserFavoritesResponse = UserDataResponse & ArticlesDataResposne;

function handleUserFavoritesResponse(response: UserFavoritesResponse): void {
  if (response.error) {
    console.log(response.error);
    return;
  }

  const articlesByFavorite = response.favorties.filter(
    ({ name }, index: number): boolean => {
      const article = response.articles[index];
      if (article && article.name) {
        return article.name === name;
      }
      return false;
    }
  );

  console.log(articlesByFavorite);
}

function getUserFavorites(): void {
  let fetchUser = {
    favorties: [{ name: "Lorem" }, { name: "test" }],
  };

  let fetcArticle = {
    articles: [{ name: "Lorem" }],
  };

  let response: UserFavoritesResponse = {
    articles: fetcArticle.articles,
    favorties: fetchUser.favorties,
    success: true,
  };

  handleUserFavoritesResponse(response);
}

getUserFavorites();

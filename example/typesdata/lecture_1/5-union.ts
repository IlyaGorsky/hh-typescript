/**
 *
 * @module union.ts
 * @description Объединения описывает значение, которое может быть одним из нескольких типов
 * Использую вертикальную черту number | string | boolean
 */
{
    /**
     * Можем объявлять переменую объяденив с примитивами
     */
    let userId: number | string;
    userId = 149;
    userId = "149fff";
    // userId = false;


    /**
     * Алисас с объядением строковых литералов
     * @alias Directions
     */
    type Directions = "up" | "down" | "left" | "right";

    let operatorMove: Directions = "up";

    // operatorMove = 'top';
  
    /**
     * Заполняет строку слева пробелами или новой строкой
     *
     * @description Здес можно использовать тип для объединения параметра padding
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
    // console.log(padLeft("Hello world", {}));

    interface SimpleSquare {
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
     * Литерал с объединением 
     *
     * @name Shape
     * @type {object}
     */
    let SomeShape: SimpleSquare | Rectangle | Circle;

    SomeShape = {
      kind: "circle",
      radius: 10,
    }
  
    SomeShape.radius;


    /**
     * Алиас c объединением интерфейсов
     * @alias Shape
     */
    type TypeShape = SimpleSquare | Rectangle | Circle;

    const figure: TypeShape = {
      kind: "rectangle",
      width: 10,
      height: 10,
    };

    function getFigureWidth(fig: TypeShape): number {
      switch (fig.kind) {
        case "rectangle":
          return fig.width;
        case "circle":
          return fig.radius * 2;
        case "square":
          return Math.sqrt(fig.size);
      }
    }
}

/**
 * Intersection types
 * @description Пересечение типов
 *              Типы пересечения похожи на типы объединения, но используются для группировки не скольких типов в один общий
 */
{
// Для примера напишем функцию получение все избранных статей пользователя
  interface ErrorResponseData {
    Ok: boolean;
    error?: { message: string };
  }

  interface Article {
    id: number;
    name: string
  }
  interface UserModel {
    favorites: Article[]
  }
  interface Articles {
    articles: Article[]
  }
  
  type UserFavoritesResponse = UserModel & Articles & ErrorResponseData;
  
  function getUserFavoritesArticle(response: UserFavoritesResponse) {
    if (!response.Ok) {
      console.error(response.error.message);
      return false
    }
    const articlesByFavorite = response.favorites.filter(
      ({ name }, index: number) => {
        const article = response.articles[index];
        if (article && article.id) {
          return article.name === name;
        }
        return false;
      }
    );
    return articlesByFavorite
  }

  const responseData = {
    Ok: true,
    articles: [{ id: 1, name: 'Some article' }, { id: 2, name:'Some article two'}],
    favorites: [{id: 1, name: 'Some article'}]
  }
  
  const favorites = getUserFavoritesArticle(responseData)

  if (Array.isArray(favorites)) {
    favorites.forEach((article) => {
      article.name
    })
  }
}

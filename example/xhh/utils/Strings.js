import NumberFormatter from "bloko/common/numberFormatter";

const ONE = 0;
const SOME = 1;
const MANY = 2;
const TEXT_CASES = [MANY, ONE, SOME, SOME, SOME, MANY];

/**
 * Word case dictionary with singular, paucal and plural forms of the word
 * i.e. ['день', 'дня', 'дней']
 * @typedef {[string, string, string]} CaseDict
 * @property {String} 0 - singular form, one
 * @property {String} 1 - paucal form, some
 * @property {String} 2 - plural form, many
 */

/**
 * Утилита по работе со строками
 */
const Strings = {
  /**
   * Позволяет форматировать строку подобно функции printf.
   *
   * <pre>
   * %[padding][width]type
   * padding   - An optional padding specifier that says what character will be
   *             used for padding the results to the right string size. This may
   *             be a space character or a "0" (zero character).
   * width     - An optional number, a width specifier that says how many
   *             characters (minimum) this conversion should result in.
   * precision - An optional precision specifier that says how many decimal digits
   *             should be displayed for floating-point numbers. This option has
   *             no effect for other types than float.
   * type      - A type specifier that says what type the argument data should be
   *             treated as. Possible types:
   *
   * % - a literal percent character. No argument is required.
   * d - the argument is treated as an integer, and presented as a decimal number.
   * s - the argument is treated as and presented as a string.
   * </pre>
   *
   * @param {String} string Формат
   * @param {Array}  data   Массив значений для форматирования.
   *
   * @returns {String}
   */
  printf(string, data) {
    const _convertData = function (format, data) {
      data = `${data}`;
      if (format === "%s" || format === "%d") {
        return data;
      }
      if (/%\d{2,2}d/.test(format)) {
        const symbol = format.substr(1, 1);
        const length = format.substr(2, 1);
        while (data.length < length) {
          data = symbol + data;
        }
      }
      return data;
    };
    if (typeof data !== "object") {
      data = [data];
    }
    const formats = string.match(/%(?:s|(?:\d{0,2}d))/g);
    if (formats) {
      for (let i = 0, l = formats.length; i < l; i++) {
        data[i] = typeof data[i] === "undefined" ? "" : data[i];
        string = string.replace(
          new RegExp(formats[i], ""),
          _convertData(formats[i], data[i])
        );
      }
    }
    return string.replace(/%%/g, "%");
  },
  /**
   * Производит числительное склонение по словарю.
   *
   * @example
   * pluralize(1, ['день', 'дня', 'дней']) -> 'день'
   * pluralize(2, ['день', 'дня', 'дней']) -> 'дня'
   * pluralize(5, ['день', 'дня', 'дней']) -> 'дней'
   *
   * @param {Number} num - number
   * @param {String[]} words - case dictionary
   *
   * @returns {String}
   */
  pluralize: (num, words) => {
    const remainder = num % 100;
    if (remainder > 10 && remainder < 15) {
      return words[MANY];
    }
    return words[TEXT_CASES[Math.min(num % 10, 5)]];
  },
  /**
   * Производит числительное склонение по словарю.
   *
   * @example
   * numConversion(1, ['день', 'дня', 'дней']) -> '1 день'
   * numConversion(2, ['день', 'дня', 'дней']) -> '2 дня'
   * numConversion(5, ['день', 'дня', 'дней']) -> '5 дней'
   *
   * @param {Number} num - number
   * @param {String[]} words - case dictionary
   * @param {Boolean} [dontPrintNumber=false] - don't print the number
   *
   * @returns {String}
   */
  numConversion(num, words, dontPrintNumber) {
    return dontPrintNumber
      ? this.pluralize(num, words)
      : `${num} ${this.pluralize(num, words)}`;
  },
  /**
   * Capitalize
   * @param  {String} str
   * @returns {String}
   */
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  /**
   * Округляет переданное число до двух знаков после запятой.
   * Оставляет десятичные только если они присутствуют после округления.
   * @example
   * 2 -> '2'
   * 2.00 -> '2'
   * 2.9033 -> '2,90'
   * 2.1488 -> '2,15'
   * 2340.543 -> '2 340,54'
   * @param {Number | String} cost
   * @param {String} [groupSeparator] разделитель разрядов
   * @returns {String}
   */
  formatCost(cost, groupSeparator) {
    const roundedCost = cost % 1 ? Number(cost).toFixed(2) : `${cost}`;
    if (groupSeparator !== undefined && groupSeparator !== null) {
      return NumberFormatter.format(roundedCost, { groupSeparator });
    }
    return NumberFormatter.format(roundedCost, {});
  },
  /**
   * Форматирует целочисленную цену в копейках (1 рубль == 100).
   * Используется в биллинге для исключения ошибок округления.
   * @example
   * 200 -> '2'
   * 200.00 -> '2'
   * 290.33 -> '2,90'
   * 214.88 -> '2,15'
   * 234054.3 -> '2 340,54'
   * @param {Number} cost Цена в копейках
   * @param {String} [groupSeparator] разделитель разрядов
   * @returns {String}
   */
  formatCostInCents(cost, groupSeparator) {
    return Strings.formatCost(cost / 100, groupSeparator);
  },
  /**
   * Парсит только цифры из строки, если таковых нет - возвращает пустую строку
   * @param  {String} str
   * @returns {String}
   */
  parseNumbers(str) {
    return str ? str.replace(/\D/g, "") : "";
  },
};

export default Strings;

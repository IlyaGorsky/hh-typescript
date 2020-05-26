import Strings from "Utils/Strings";
import Locales from "Utils/DatesLocales";

const DEFAULT_LOCALE =
  (typeof window !== "undefined" &&
    window.globalVars &&
    window.globalVars.lang) ||
  "RU";

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

/**
 * Возвращает день недели
 *
 * @param {Date} date Дата
 * @param {String[]} trl Строки переводов для дней, начиная с понедельника
 *
 * @returns {String}
 */
const getDayName = (date, trl) => trl[(date.getDay() + 6) % 7];

/**
 * Таймзона в виде строки
 *
 * @param {Date} date Дата
 *
 * @returns {String}
 */
const formatTZ = (date) =>
  Strings.printf("%s%02d:%02d", [
    date.getTimezoneOffset() > 0 ? "-" : "+",
    Math.abs(Math.floor(date.getTimezoneOffset() / 60)),
    Math.abs(date.getTimezoneOffset()) % 60,
  ]);

const toFormat = (date, dateFormat, lang = DEFAULT_LOCALE) => {
  const datesTranslations = Locales[lang];
  const month = /%e[^%]*%B/.test(dateFormat)
    ? datesTranslations.monthsGenitiveTrl
    : datesTranslations.monthsTrl;
  const formats = [
    [/%Y/g, Strings.printf("%04d", date.getFullYear())],
    [/%y/g, Strings.printf("%02d", date.getFullYear() % 100)],
    [/%m/g, Strings.printf("%02d", date.getMonth() + 1)],
    [/%n/g, Strings.printf("%d", date.getMonth() + 1)],
    [/%d/g, Strings.printf("%02d", date.getDate())],
    [/%e/g, Strings.printf("%d", date.getDate())],
    [/%H/g, Strings.printf("%02d", date.getHours())],
    [/%S/g, Strings.printf("%02d", date.getSeconds())],
    [/%M/g, Strings.printf("%02d", date.getMinutes())],
    [/%z/g, formatTZ(date)],
    [/%B/g, Strings.printf("%s", month[date.getMonth()])],
    [/%EEEE/g, getDayName(date, datesTranslations.daysOfTheWeekTrl)],
  ];
  return formats.reduce(
    (dateFormat, [regex, replacement]) =>
      dateFormat.replace(regex, replacement),
    dateFormat
  );
};

/**
 * Возвращает разницу между датами в днях
 *
 * @param {Date} dateOne Дата для сравнения
 * @param {Date} dateTwo Дата для сравнения
 *
 * @returns {Number}
 */
const diffInDays = (dateOne, dateTwo) =>
  Math.round((dateOne.getTime() - dateTwo.getTime()) / MILLISECONDS_IN_DAY);

/**
 * Возвращает разницу между датами в годах
 *
 * @param {Date} from Дата для сравнения
 * @param {Date} to Дата для сравнения
 *
 * @returns {Number}
 */
const diffInYears = (from, to) => {
  const years = to.getFullYear() - from.getFullYear();
  if (from.getMonth() < to.getMonth()) {
    return years;
  }
  if (from.getMonth() === to.getMonth()) {
    if (to.getDate() < from.getDate()) {
      return years - 1;
    }
    return years;
  }
  return years - 1;
};

/**
 * Конвертировать переданную строку, содержащую дату в формате ISO в объект Date
 *
 * @param {String} date
 *
 * @returns {Date}
 */
const convertISODateStringToDate = (date) => {
  if (!date) {
    return new Date(NaN);
  }
  const regexp = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)([+|-]\d+)?/;
  const match = date.match(regexp);
  if (match === null) {
    return new Date(NaN);
  }
  const [, year, month, day, hours, minutes, seconds] = match;
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

/**
 * Прибавить к дате указанное количество лет, месяцев и/или дней,
 * возвращает новый экземпляр даты
 *
 * @param {Date} date
 * @param {Object} params
 * @param {Number} [params.years]
 * @param {Number} [params.month]
 * @param {Number} [params.days]
 *
 * @returns {Date}
 */
const add = (date, { years = 0, months = 0, days = 0 }) => {
  const result = new Date(date);
  if (years) {
    result.setFullYear(date.getFullYear() + years);
  }
  if (months) {
    result.setMonth(date.getMonth() + months);
  }
  if (days) {
    result.setDate(date.getDate() + days);
  }
  return result;
};

/**
 * Вычесть из даты указанное количество лет, месяцев и/или дней,
 * возвращает новый экземпляр даты
 *
 * @param {Date} date
 * @param {Number} [years]
 * @param {Number} [months]
 * @param {Number} [days]
 *
 * @returns {Date}
 */
const sub = (date, { years = 0, months = 0, days = 0 }) =>
  add(date, { years: -years, months: -months, days: -days });

/**
 * Получить начало года, возвращает новый экземпляр даты
 *
 * @param {Date} date
 *
 * @returns {Date}
 */
const startOfYear = (date) => new Date(date.getFullYear(), 0, 1);

/**
 * Получить конец года, возвращает новый экземпляр даты
 *
 * @param {Date} date
 *
 * @returns {Date}
 */
const endOfYear = (date) => new Date(date.getFullYear() + 1, 0, 0);

/**
 * Получить начало месяца, возвращает новый экземпляр даты
 *
 * @param {Date} date
 *
 * @returns {Date}
 */
const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

/**
 * Получить конец месяца, возвращает новый экземпляр даты
 *
 * @param {Date} date
 *
 * @returns {Date}
 */
const endOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

/**
 * Получить начало дня, возвращает новый экземпляр даты
 *
 * @param {Date} date
 *
 * @returns {Date}
 */
const startOfDate = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

/**
 * Получить конец дня, возвращает новый экземпляр даты
 *
 * @param {Date} date
 *
 * @returns {Date}
 */
const endOfDate = (date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
    0,
    0,
    0,
    -1
  );

/**
 * Получить начало часа, возвращает новый экземпляр даты
 *
 * @param {Date} date
 *
 * @returns {Date}
 */
const startOfHour = (date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    0,
    0,
    0
  );

/**
 * Получить конец часа, возвращает новый экземпляр даты
 *
 * @param {Date} date
 *
 * @returns {Date}
 */
const endOfHour = (date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours() + 1,
    0,
    0,
    -1
  );

/**
 * Проверить, приходятся ли даты на один и тот же день
 *
 * @param {Date} left
 * @param {Date} right
 *
 * @returns {Boolean}
 */
const isSameDay = (left, right) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

/**
 * Проверить, что дата входит в диапазон
 *
 * @param {Date} date
 * @param {Date} start
 * @param {Date} end
 *
 * @returns {boolean}
 */
const isWithinRange = (date, start, end) => {
  const _date = date.getTime();
  return _date > start.getTime() && _date < end.getTime();
};

/**
 * Возвращает массив дней в диапазоне
 *
 * @param {Date} start
 * @param {Date} end
 *
 * @returns {Date[]}
 */
const eachDay = (start, end) =>
  [...Array(diffInDays(end, start) + 1).keys()].map((i) =>
    add(start, { days: i })
  );

/**
 * Получить отформатированные секунды для таймера, с количеством часов или без
 *
 * @param {Number} seconds
 *
 * @returns {String}
 */
const formatSeconds = (seconds) => {
  const SECONDS_IN_HOUR = 60 * 60;
  const format = seconds < SECONDS_IN_HOUR ? "%M:%S" : "%H:%M:%S";
  const counterDate = new Date();
  counterDate.setHours(0);
  counterDate.setMinutes(0);
  counterDate.setSeconds(seconds);
  return toFormat(counterDate, format, "RU");
};

const getSeconds = (date) => Math.floor(date / 1000);
const getCurrentSeconds = () => getSeconds(Date.now());

const IntervalMessages = (humanDatesRules) => {
  const humanDatesList = Object.keys(humanDatesRules).sort((a, b) =>
    Math.sign(b - a)
  );

  const get = (deltaTime) => {
    const deltaSeconds = getSeconds(deltaTime);
    const messageIndex = humanDatesList.findIndex((i) => i < deltaSeconds);

    try {
      return humanDatesRules[humanDatesList[messageIndex]].translation;
    } catch (error) {
      Debug.log("error out", "messageIndex is wrong", {
        error,
        humanDatesList,
        messageIndex,
        humanDatesRules,
        timeLeft: deltaTime,
      });
    }

    return null;
  };

  return { get };
};

const calculateDisabledDates = (
  selectedDate,
  lastAvailableDate = new Date()
) => {
  if (selectedDate.getTime() < startOfMonth(lastAvailableDate).getTime()) {
    return [];
  }

  const disabledFrom = new Date(
    Math.max(
      startOfMonth(selectedDate).getTime(),
      lastAvailableDate.getTime() + MILLISECONDS_IN_DAY
    )
  );
  const disabledTo = endOfMonth(selectedDate);

  if (disabledFrom.getTime() >= disabledTo.getTime()) {
    return [];
  }

  const result = [];
  const disabledDate = new Date(selectedDate);
  for (let i = disabledFrom.getDate(); i <= disabledTo.getDate(); i++) {
    disabledDate.setDate(i);
    result.push(toFormat(disabledDate, "%Y-%m-%d"));
  }

  return result;
};

const Dates = {
  toFormat,
  getDayName,
  diffInDays,
  diffInYears,
  convertISODateStringToDate,
  add,
  sub,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  startOfDate,
  endOfDate,
  startOfHour,
  endOfHour,
  isSameDay,
  isWithinRange,
  eachDay,
  formatSeconds,
  getCurrentSeconds,
  IntervalMessages,
  calculateDisabledDates,
};

export default Dates;

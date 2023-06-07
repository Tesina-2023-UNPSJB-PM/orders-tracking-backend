/**
 *
 * @returns the current date.
 */
export const getCurrentDate = () => new Date();

/**
 *
 * @returns the max time of the given date.
 * i.e: If date is "2023-05-03", it will returns the date "2023-05-03 23:59:59".
 */

export const getMaxTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

/**
 *
 * @returns the eldest date of all time.
 */

export const getEldestDate = () => new Date(1970, 0, 1);

/**
 * 
 * @param date 
 * @returns a duple with the given date, and the same date with the max time.
 */

export const getDateInterval = (date: Date | undefined) => ({
  fromDate: date ?? getEldestDate(),
  toDate: date ? getMaxTime(date) : getMaxTime(getCurrentDate()),
});

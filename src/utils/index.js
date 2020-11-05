/**
 * Reset second part of a timestamp back to 0.
 * @param ts Timestamp in second format.
 * @returns {number} Timestamp where the number of seconds is 0, in second format.
 */
function removeSecond(ts) {
  return (new Date(ts * 1000)).setSeconds(0) / 1000;
}

/**
 * Add padding zero of a number.
 * @param num Number to be added with padding zero.
 * @param width Max with to be fulfilled.
 * @returns {string} Number string with padding zero.
 */
function addPaddingZero(num, width) {
  return String(num).padStart(width, '0');
}

/**
 * Check whether all item in array are undefined.
 * @param array Array to be checked.
 * @returns {boolean}
 */
function allUndefined(array) {
  return array.filter((x) => x !== undefined).length === 0;
}

/**
 * Check lunar year.
 * @param year
 * @returns {boolean}
 */
function isLunarYear(year) {
  if (year % 100 !== 0) {
    if (year % 4 === 0) {
      return true;
    }
  } else {
    if (year % 400 === 0) {
      return true;
    }
  }
  return false;
}

/**
 * Count how many Feb 29th passed between start ts and end ts.
 * @param startTs
 * @param endTs
 * @returns {number}
 */
function countLunarYear(startTs, endTs) {
  const startYear = new Date(startTs * 1000).getFullYear();
  const endYear = new Date(endTs * 1000).getFullYear();
  let currentYear = startYear;
  let count = 0;
  while (currentYear <= endYear) {
    if (isLunarYear(currentYear)) {
      const feb29StartDate = new Date(new Date().setFullYear(currentYear, 1, 29));
      const feb29StartTs = Math.floor(feb29StartDate.setHours(0, 0, 0, 0) / 1000);
      const feb29EndTS = feb29StartTs + 24 * 60 * 60;
      if (startTs < feb29StartTs && endTs > feb29EndTS) {
        count += 1;
      }
    }
    currentYear += 1;
  }
  return count;
}

module.exports = {
  removeSecond,
  addPaddingZero,
  allUndefined,
  countLunarYear,
};

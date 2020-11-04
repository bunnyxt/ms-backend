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

module.exports = {
  removeSecond,
  addPaddingZero,
  allUndefined,
};

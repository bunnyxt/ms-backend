/**
 * Reset second part of a timestamp back to 0.
 * @param ts Timestamp in second format.
 * @returns {number} Timestamp where the number of seconds is 0, in second format.
 */
function removeSecond(ts) {
  return (new Date(ts * 1000)).setSeconds(0) / 1000;
}

module.exports = {
  removeSecond,
};

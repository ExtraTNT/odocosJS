
/**
 *  Converts an object to a query string.
 * @param {Object} x * Object to convert to query string.
 * @returns {string} query string starting with ?
 * @example mapToQuery({ a: 1, b: 2 }) // '?a=1&b=2'
 */
const mapToQuery = x =>
  Object.keys(x)
    .reduce((acc, c) => `${acc}${c}=${x[c]}&`, '?')
    .slice(0, -1);


export { mapToQuery };
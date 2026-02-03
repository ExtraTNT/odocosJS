/**
 * Memoize a single-argument function with a capped cache.
 * Stores up to 1000 entries; when the limit is reached the cache is cleared.
 * Uses the argument itself as the Map key (object identity for objects).
 * @param {function(*): *} f - Function to memoize.
 * @returns {function(*): *} Memoized function.
 * @example
 *   const slowSquare = n => { console.log('compute'); return n * n; };
 *   const fastSquare = memo(slowSquare);
 *   fastSquare(3); // logs 'compute', returns 9
 *   fastSquare(3); // cache hit, no log, returns 9
 */
const memo = f => {
  const cache = new Map();
  return x => {
    if (cache.size >= 1000) {
      cache.clear();
    }
    if (!cache.has(x)) {
      cache.set(x, f(x));
    }
    return cache.get(x);
  };
};

export { memo };

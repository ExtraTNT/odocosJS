/**
 * Pass-through debug helper that logs and returns the value.
 * Objects trigger dir/table output; primitives log value and typeof.
 * @param {*} x - Value to log.
 * @returns {*} The same value.
 */
const dbgId = x => {
  if (x !== null && typeof x === 'object') {
    console.log('dbg: object');
    console.dir(x);
    console.table(x);
  } else {
    console.log('dbg:', x, typeof x);
  }
  return x;
};

/**
 * Wrap a function to log execution time using performance.now().
 * @param {function} f - Function to benchmark.
 * @returns {function} Wrapped function logging duration.
 */
const dbgBench = f => (...args) => {
  const start = performance.now();
  const result = f(...args);
  const end = performance.now();
  console.log(`dbg: bench took ${end - start} ms`);
  return result;
};

/**
 * Wrap an async function, logging resolved value or returning fallback on rejection.
 * @param {function} f - Function returning a Promise.
 * @returns {function} (...args) => default => Promise resolving to value or default.
 */
const dbgResolvePromiseOrDefault = f => d => (...args) =>
  f(...args)
    .then(x => {
      console.log('dbg: promise resolved to', x);
      return x;
    })
    .catch(_e => {
      console.log('dbg: promise rejected, returning default', d);
      return d;
    });

/**
 * Wrap a synchronous function, logging output or returning fallback when it throws.
 * @param {function} f - Function to call.
 * @returns {function} (...args) => default => result or default.
 */
const dbgResolveOrDefault = f => d => (...args) => {
  try {
    const result = f(...args);
    console.log('dbg: function returned', result);
    return result;
  } catch (e) {
    console.log('dbg: function threw, returning default', d, e.message);
    return d;
  }
};

export {
  dbgId,
  dbgBench,
  dbgResolvePromiseOrDefault,
  dbgResolveOrDefault,
};
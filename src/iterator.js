// some iterator functions

/**
 * Create a simple iterator from an array.
 * The iterator exposes a single {@code next} method returning
 * {@code { value, done }} objects, similar to the built-in iterator protocol.
 *
 * @param {Array<*>} arr - Source array.
 * @returns {{ next: function(): { value: *, done: boolean } }} Iterator over the array.
 * @example
 *   const it = iteratorFromArray([1, 2]);
 *   it.next(); // { value: 1, done: false }
 *   it.next(); // { value: 2, done: false }
 *   it.next(); // { value: undefined, done: true }
 * @haskell iteratorFromArray :: [a] -> Iterator a
 */
const iteratorFromArray = arr => {
  let index = 0;
  return {
    next: () => (index < arr.length) ?
      { value: arr[index++], done: false }
      : { value: undefined, done: true },
  };
};

/**
 * Create a simple character iterator from a string.
 * Each {@code next} call yields the next character until the end of the string.
 *
 * @param {string} str - Source string.
 * @returns {{ next: function(): { value: string|undefined, done: boolean } }} Iterator over characters.
 * @example
 *   const it = iteratorFromString('ab');
 *   it.next(); // { value: 'a', done: false }
 *   it.next(); // { value: 'b', done: false }
 *   it.next(); // { value: undefined, done: true }
 * @haskell iteratorFromString :: String -> Iterator Char
 */
const iteratorFromString = str => {
  let index = 0;
  return {
    next: () => (index < str.length) ?
      { value: str.charAt(index++), done: false }
      : { value: undefined, done: true },
  };
};

/**
 * Wrap any built-in iterable (Array, String, Set, custom iterable, ...)
 * and expose a minimal iterator with a {@code next} method.
 *
 * @param {{ [Symbol.iterator]: function(): Iterator }} iterable - Any iterable value.
 * @returns {{ next: function(): { value: *, done: boolean } }} Iterator produced from the iterable.
 * @example
 *   const it = iteratorFromIterable(new Set([1, 2]));
 *   it.next(); // { value: 1, done: false }
 * @haskell iteratorFromIterable :: Iterable a -> Iterator a
 */
const iteratorFromIterable = iterable => {
  const it = iterable[Symbol.iterator]();
  return {
    next: () => it.next(),
  };
};

export { iteratorFromArray, iteratorFromString, iteratorFromIterable };

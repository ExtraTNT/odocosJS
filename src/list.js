import { Pair } from './core.js';

/**
 * Sentinel value representing the empty list.
 * @type {null}
 */
const emptyList = null;

/**
 * Construct a list node from a head and tail.
 * Tail can be either another list or a thunk () => list for lazy lists.
 * @param {*} head - The head value.
 * @param {*} tail - The tail list or thunk.
 * @returns {{ head: *, tail: * }} A list node.
 * @example
 * const xs = cons(1)(cons(2)(emptyList));
 */
const cons = head => tail => ({
  head,
  tail: tail,
});

/**
 * Get the head of a list, or emptyList if the list is empty.
 * @param {*} list - The list.
 * @returns {*} The head value or emptyList.
 * @example head(cons(1)(emptyList)) // 1
 */
const head = list => list ? list.head : emptyList;

/**
 * Get the tail of a list, or emptyList if the list is empty.
 * Note: tail may itself be a thunk; use forceTail to safely traverse.
 * @param {*} list - The list.
 * @returns {*} The tail value or emptyList.
 * @example tail(cons(1)(cons(2)(emptyList))) // { head: 2, ... }
 */
const tail = list => list ? list.tail : emptyList;


/**
 * Force the tail if it is a thunk, otherwise return it as-is.
 * @param {*} list - The list node.
 * @returns {*} The next list node (non-thunk) or emptyList.
 * @example
 * const xs = cons(1)(() => cons(2)(emptyList));
 * const t = forceTail(xs); // cons(2)(emptyList)
 */
const forceTail = list => {
  if (list == null) return emptyList;
  const t = tail(list);
  return typeof t === 'function' ? t() : t;
};

/**
 * Check whether a list is empty.
 * @param {*} list - The list.
 * @returns {boolean} True if the list is empty.
 * @example isEmpty(emptyList) // true
 */
const isEmpty = list => list == emptyList;

/**
 * Convert a (possibly lazy) list into a plain array.
 * @param {*} list - The list.
 * @returns {Array<*>} Array of elements.
 * @example toArray(cons(1)(cons(2)(emptyList))) // [1, 2]
 */
const toArray = list => isEmpty(list) ?
  []
  : [head(list), ...toArray(forceTail(list))];

/**
 * Build a (strict) list from an array.
 * @param {Array<*>} arr - Source array.
 * @returns {*} A list built from arr.
 * @example fromArray([1, 2]) // cons(1)(cons(2)(emptyList))
 */
const fromArray = arr => arr.length === 0 ?
  emptyList
  : cons(arr[0])(fromArray(arr.slice(1)));

/**
 * Map a function over a list, preserving laziness of the tail.
 * @param {function} f - Mapping function.
 * @returns {function} Function taking a list and returning a new list.
 * @example toArray(map(x => x * 2)(fromArray([1, 2]))) // [2, 4]
 * 
 * todo: causes infinite loop when transforming to array due to lazyness
 */
const listMap = f => s => isEmpty(s) ?
  emptyList
  : cons(f(head(s)))(() => listMap(f)(forceTail(s)));

/**
  *  Reduce a list to a single value.
  * @param {function} f funnction taking accumulator and current value producing new accumulator
  * @param {*} acc initial accumulator value
  * @param {*} xs list to reduce
  * @returns list reduced to accumulator
  */ 
const listReduce = f => acc => xs => isEmpty(xs) ?
  acc
  : listReduce(f)(f(acc)(head(xs)))(forceTail(xs));

/**
 * Evaluate a lazy list into a strict list by forcing all tails.
 * @param {*} s - The (possibly lazy) list.
 * @returns {*} A structurally equivalent strict list.
 * @example toArray(evaluate(cons(1)(() => cons(2)(emptyList)))) // [1, 2]
 */
const listEvaluate = s =>
  isEmpty(s) ?
    emptyList
    : cons(head(s))(listEvaluate(forceTail(s)));

/**
 * Take up to n elements from a list into a plain array.
 * @param {number} n - Number of elements to take.
 * @returns {function} Function taking a list and returning an array.
 * @example takeA(2)(fromArray([1, 2, 3])) // [1, 2]
 */
const takeA = n => s => n <= 0 || isEmpty(s) ?
  []
  : [head(s), ...takeA(n - 1)(forceTail(s))];

/**
 * Take up to n elements from a list, returning a list.
 * @param {number} n - Number of elements to take.
 * @returns {function} Function taking a list and returning a list.
 * @example toArray(take(2)(fromArray([1, 2, 3]))) // [1, 2]
 */
const take = n => s => n <= 0 || isEmpty(s) ?
  emptyList
  : cons(head(s))(take(n - 1)(forceTail(s)));

/**
 * Concatenate two lists.
 * @param {*} a - First list.
 * @returns {function} Function taking list b.
 * @example toArray(combineList(fromArray([1]))(fromArray([2, 3]))) // [1, 2, 3]
 */
const combineList = a => b =>
  isEmpty(a) ? b : cons(head(a))(combineList(forceTail(a))(b));

/**
 * Zip two lists with a combining function, stopping at the shorter.
 * @param {function} f - Combining function (a -> b -> c).
 * @returns {function} Function taking two lists.
 * @example toArray(zipWith(add)(fromArray([1, 2]))(fromArray([10, 20]))) // [11, 22]
 */
const zipWith = f => as => bs => 
  (isEmpty(as) || isEmpty(bs)) ?
    emptyList
    : cons
    (f(head(as))(head(bs)))
    (() => zipWith(f)(forceTail(as))(forceTail(bs)));

/**
 * Zip two lists into a list of Pairs.
 * @param {*} as - First list.
 * @returns {function} Function taking second list.
 * @example toArray(zip(fromArray([1, 2]))(fromArray([3, 4]))).map(p => p(fst)) // [1, 2]
 */
const zip = zipWith(Pair);

/**
 * Filter a list by predicate, preserving laziness of the tail.
 * @param {function} f - Predicate function.
 * @returns {function} Function taking a list.
 * @example toArray(filter(x => x % 2 === 0)(fromArray([1, 2, 3, 4]))) // [2, 4]
 */
const listFilter = f => xs => {
  if (isEmpty(xs)) return emptyList;
  const h = head(xs);
  const t = () => listFilter(f)(forceTail(xs));
  return f(h) ?
    cons(h)(t)
    : t();
}; 

/**
 * Take elements from the list while the predicate holds.
 * @param {function} predicate applied to each element
 * @returns {function} Function taking a list.
 */
const takeWhile = predicate => list => {
  if (isEmpty(list) || !predicate(head(list))) {
    return emptyList;
  }
  return cons(head(list))(takeWhile(predicate)(forceTail(list)));
};

/**
 * Drops elements from the list while the predicate holds, returns the rest.
 * @param {function} predicate applied to each element
 * @returns {function} Function taking a list.
 */
const dropWhile = predicate => list => {
  if (isEmpty(list)) {
    return emptyList;
  }
  if (predicate(head(list))) {
    return dropWhile(predicate)(forceTail(list));
  }
  return list;
};

/**
 * Groups consecutive elements by key function.
 * @param {function} keyFn 
 * @returns {function} Function taking a list.
 */
const groupBy = keyFn => list => {
  if (isEmpty(list)) {
    return emptyList;
  }
  const key = keyFn(head(list));
  const group = takeWhile(x => keyFn(x) === key)(list);
  const rest = dropWhile(x => keyFn(x) === key)(list);
  return cons(group)(groupBy(keyFn)(rest));
};

export {
  emptyList,
  cons,
  head,
  tail,
  forceTail,
  isEmpty,
  toArray,
  fromArray,
  listMap,
  listReduce,
  listEvaluate,
  takeA,
  take,
  combineList,
  zipWith,
  zip,
  listFilter,
  takeWhile,
  dropWhile,
  groupBy,
};
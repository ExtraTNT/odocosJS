'use strict';

/**
 * Executes a function n times, collecting the results in an array.
 * @param {Function} f function to execute, taking the iteration index as argument
 * @returns {Array} results of applying f n times
 * @example (5).times(i => i * 2) // [0, 2, 4, 6, 8]
 */
Number.prototype.times = function(f) {
  return Array.from({ length: this }).map((_, i) => f(i));
};

/**
 * Pipes the value through a function.
 * @param {Function} f function to call with this as argument
 * @returns result of applying f to this
 * @example (5).pipe(x => x * 2) // 10
 */
Object.prototype.pipe = function(f) {
  return f(this);
};

/**
 * Curries a function.
 * @returns multiple nested functions with single arguments
 * @example
 *   const sum4 = (a, b, c, d) => a + b + c + d;
 *   const curriedSum4 = sum4.curry();
 *   curriedSum4(1)(2)(3)(4) // 10
 */
Function.prototype.curry = function() {
  const f = this;
  const g = (...args) => args.length >= f.length
    ? f(...args)
    : (...moreArgs) =>
      g(...args, ...moreArgs);
  return g;
};

/**
 * Chains function calls.
 * @param {Function} g function to call with the result of this
 * @returns result of calling g with the result of this
 * @example
 *  const add1 = x => x + 1;
 *  const double = x => x * 2;
 *  const add1ThenDouble = add1.then(double);
 *  add1ThenDouble(3) // 8
 */
Function.prototype.then = function(g) {
  const f = this;
  return (...args) =>  g(f(...args));
};

/**
 * Flips the order of arguments of a curried function.
 * @returns a new function with flipped arguments
 * @example
 *   const subtract = a => b => a - b;
 *   const flippedSubtract = subtract.flip();
 *   flippedSubtract(5)(10) // 5
 */
Function.prototype.flip = function() {
  return a => b => this(b)(a);
};

/**
 * Returns the first element of the array.
 * @returns {*} First element or undefined for empty arrays.
 * @example [1, 2, 3].head() // 1
 */
Array.prototype.head = function() {
  return this.length === 0 ? undefined : this[0];
};

/**
 * Returns all elements except the first.
 * @returns {Array} New array without the first element.
 * @example [1, 2, 3].tail() // [2, 3]
 */
Array.prototype.tail = function() {
  return this.length <= 1 ? [] : this.slice(1);
};

/**
 * Returns the last element of the array.
 * @returns {*} Last element or undefined for empty arrays.
 * @example [1, 2, 3].last() // 3
 */
Array.prototype.last = function() {
  return this.length === 0 ? undefined : this.slice(-1)[0];
};

/**
 * Splits the array into chunks of the given size.
 * @param {number} size - Positive chunk size.
 * @returns {Array[]} Array of chunks.
 * @example [1,2,3,4].chunk(2) // [[1,2],[3,4]]
 */
Array.prototype.chunk = function(size) {
  if (size <= 0) return [];
  return this.reduce((acc, val, idx) => {
    const chunkIdx = Math.floor(idx / size);
    if (!acc[chunkIdx]) acc[chunkIdx] = [];
    acc[chunkIdx].push(val);
    return acc;
  }, []);
};

/**
 * Recursively flattens nested arrays.
 * @returns {Array} Flattened array.
 * @example [1, [2, [3]]].flatten() // [1, 2, 3]
 */
Array.prototype.flatten = function() {
  return this.reduce((acc, val) =>
    acc.concat(Array.isArray(val) ? val.flatten() : val), []);
};

/**
 * Removes duplicate values while preserving order.
 * @returns {Array} Array of unique values.
 * @example [1,1,2].unique() // [1,2]
 */
Array.prototype.unique = function() {
  return [...new Set(this)];
};

/**
 * Checks shallow equality against another array.
 * @param {Array} other - Array to compare.
 * @returns {boolean} True when lengths and items match.
 * @example [1,2].equals([1,2]) // true
 */
Array.prototype.equals = function(other) {
  return this.length === other.length && this.every((v, i) => v === other[i]);
};

/**
 * Sum of numeric elements.
 * @returns {number} Accumulated sum.
 * @example [1,2,3].sum() // 6
 */
Array.prototype.sum = function() {
  return this.reduce((acc, val) => acc + val, 0);
};

/**
 * Product of numeric elements.
 * @returns {number} Accumulated product.
 * @example [1,2,3].product() // 6
 */
Array.prototype.product = function() {
  return this.reduce((acc, val) => acc * val, 1);
};


/* 
//todo: fix this mess, is just the base alg
Array.prototype.heapify = function(comparator) {
  const arr = this;
  const n = arr.length;

  const heapify = (i, heapSize) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < heapSize && comparator(arr[left])(arr[largest]) > 0) {
      largest = left;
    }
    if (right < heapSize && comparator(arr[right])(arr[largest]) > 0) {
      largest = right;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(largest, heapSize);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(i, n);
  }
};
*/
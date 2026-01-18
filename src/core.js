/**
 * Identity function. Returns the value provided.
 * @param {*} x - Any value.
 * @returns {*} The same value x.
 * @example id(5) // 5
 */
const id = x => x;

/**
 * Constant function. Returns a function that ignores its argument and returns x.
 * @param {*} x - The value to return.
 * @returns {function} A function that returns x.
 * @example constant(5)(10) // 5
 */
const constant = x => _ => x;

/**
 * First. Returns the first of two arguments.
 * @param {*} x - The first argument.
 * @returns {function} A function that takes a second argument (ignored) and returns x.
 * @example fst(1)(2) // 1
 */
const fst = constant;

/**
 * Second. Returns the second of two arguments.
 * @param {*} _ - The first argument (ignored).
 * @returns {function} A function that takes y and returns y.
 * @example snd(1)(2) // 2
 */
const snd = _ => y => y;

/**
 * Pair. Creates a Church-encoded pair.
 * @param {*} x - The first element.
 * @param {*} y - The second element.
 * @returns {function} A function accepting a selector (like fst or snd).
 * @example Pair(1)(2)(fst) // 1
 */
const Pair = x => y => f => f(x)(y);

/**
 * Left. Represents the Left case of a Church-encoded Either.
 * @param {*} x - The value.
 * @returns {function} A function accepting two handlers, applying the first to x.
 * @example Left(2)(x => x + 1)(x => x * 2) // 3
 */
const Left = x => f => _ => f(x);

/**
 * Right. Represents the Right case of a Church-encoded Either.
 * @param {*} y - The value.
 * @returns {function} A function accepting two handlers, applying the second to y.
 * @example Right(2)(x => x + 1)(x => x * 2) // 4
 */
const Right = y => _ => g => g(y);

/**
 * Eliminiator for Either.
 * @param {function} e - The Either instance (Left or Right).
 * @param {function} l - Handler for Left case.
 * @param {function} r - Handler for Right case.
 * @returns {*} The result of applying the appropriate handler.
 * @example either(Left(1))(x => x)(y => 0) // 1
 */
const either = e => l => r => e(l)(r);

/**
 * Just. Alias for Right. Represents a present value.
 * @example Just(5)(() => 0)(x => x) // 5
 */
const Just = Right;

/**
 * Nothing. Alias for Left(undefined). Represents an absent value.
 * @example Nothing(() => 'empty')(x => x) // 'empty'
 */
const Nothing = Left();

/**
 * Pipe. Composes functions from left to right.
 * @param {...function} fs - The functions to compose.
 * @returns {function} A function waiting for the initial value.
 * @example pipe(x => x + 1, x => x * 2)(1) // 4
 */
const pipe = (...fs) => x => fs.reduce((v, f) => f(v), x);

/**
 * Compose. Composes functions from right to left.
 * @param {...function} fs - The functions to compose.
 * @returns {function} A function waiting for the initial value.
 * @example compose(x => x * 2, x => x + 1)(1) // 4
 */
const compose = (...fs) => x => fs.reduceRight((v, f) => f(v), x);

/**
 * Curry. Transforms a function of N arguments into N functions of 1 argument.
 * @param {function} f - The function to curry.
 * @param {number} [arity=f.length] - The number of arguments. !Do not specify!
 * @returns {function} The curried function.
 * @example curry((a, b) => a + b)(1)(2) // 3
 */
const curry = (f, arity = f.length) =>
  g = (...args) => args.length >= arity?
    f(...args)
    : (...moreArgs) =>
      g(...args, ...moreArgs);

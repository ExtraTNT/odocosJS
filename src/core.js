/**
 * Identity function. Returns the value provided.
 * @param {*} x - Any value.
 * @returns {*} The same value x.
 * @example id(5) // 5
 */
const id = x => x;

/**
 * Y combinator for anonymous recursion.
 * @param {function} f - The function to enable recursion for.
 * @returns {function} A recursive version of f.
 * @example
 * const id2 = M(id) // id2 is a recursive identity function
 * id2 (id2) (id(5)) // 5
 */
const Y = f => f(f);

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
 * Eliminator for Either.
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
const curry = f => {
  const g = (...args) => args.length >= f.length
    ? f(...args)
    : (...moreArgs) =>
      g(...args, ...moreArgs);
  return g;
};

/**
 * flip. Takes a function of first two arguments and flips them.
 * @param {function} f - The function to flip (a -> b -> c).
 * @returns {function} The flipped function (b -> a -> c).
 * @example flip(sub)(10)(5) // 5 - 10 = -5
 */
const flip = f => a => b => f(b)(a);

/**
 * toMaybe. Converts a value to a Maybe type.
 * @param {*} x value to convert
 * @returns Maybe Just(x) if x is not null, undefined, NaN or Nothing; otherwise Nothing.
 * @example toMaybe(5) // Just(5)
 * @example toMaybe(null) // Nothing
 */
const toMaybe = x => x === null || x === undefined || Number.isNaN(x) || x === Nothing ? Nothing : Just(x);

/**
 * bind. Chains a Maybe value with a function returning a Maybe.
 * Bind for Maybe: (>>=) 
 * @param {function} ma - The Maybe value.
 * @param {function} f - The function to apply if Just.
 * @returns {function} A new Maybe value.
 * @example bind(Just(5))(x => Just(x + 1)) // Just(6)
 * @example bind(Nothing)(x => Just(x + 1)) // Nothing
 * @example bind(Just(1))(x => bind(Just(x + 1))(y => Just(y * 2))) // Just(6)
 * @haskell bind :: Maybe a -> (a -> Maybe b) -> Maybe b
 */
const bind = ma => f => ma(_ => Nothing)(f);

/**
 * fromMaybe. Extracts the value from a Maybe, providing a default if Nothing.
 * @param {*} d - The default value.
 * @param {function} m - The Maybe value.
 * @returns {*} The extracted value or the default.
 * @example fromMaybe(0)(Just(5)) // 5
 * @example fromMaybe(0)(Nothing) // 0
 * @haskell fromMaybe :: a -> Maybe a -> a
 */
const fromMaybe = d => m => m(_ => d)(id);

/**
 * orElse. Provides an alternative Maybe value if the first is Nothing.
 * @param {function} ma - The primary Maybe value.
 * @param {function} mb - The alternative Maybe value.
 * @returns {function} The resulting Maybe value.
 * @example orElse(Nothing)(Just(5)) // Just(5)
 * @example orElse(Just(1))(Just(5)) // Just(1)
 * @haskell orElse :: Maybe a -> Maybe a -> Maybe a
 */
const orElse = ma => mb => ma(_ => mb)(x => Just(x));

/**
 * guard. Creates a Maybe value based on a condition.
 * @param {boolean} c - The condition.
 * @returns {function} A function that takes a value and returns Just(value) if the condition is true, otherwise Nothing.
 * @example guard(true)(5) // Just(5)
 * @example guard(false)(5) // Nothing
 * @haskell guard :: Bool -> a -> Maybe a
 */
const guard = c => v => c ? Just(v) : Nothing;

/**
 * lift. Lifts a curried function to operate on Maybe values.
 * @param {function} f - The curried function to lift (a -> b -> c).
 * @returns {function} A function that takes two Maybe values and returns a Maybe value.
 * @example lift(a => b => a + b)(Just(1))(Just(2)) // Just(3)
 * @example lift(a => b => a + b)(Just(1))(Nothing) // Nothing
 * @haskell lift :: (a -> b -> c) -> Maybe a -> Maybe b -> Maybe c
 */
const lift = f => a => b => bind(a)(x => bind(b)(y => Just(f(x)(y))));


export {
  id,
  Y,
  constant,
  fst,
  snd,
  Pair,
  Left,
  Right,
  either,
  Just,
  Nothing,
  pipe,
  compose,
  curry,
  flip,
  toMaybe,
  bind,
  fromMaybe,
  orElse,
  guard,
  lift,
};

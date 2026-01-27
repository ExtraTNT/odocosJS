import  * as core from '../src/core.js';
import { assertEq, printReport } from './test.js';

const {
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
  toMaybe,
  pipe,
  compose,
  curry,
  flip,
} = core;

const ok = [];

const emptyObject = {};
const emptyArray = [];

// id
ok.push(assertEq(1)(id(1)));
ok.push(assertEq('a')(id('a')));
ok.push(assertEq(true)(id(true)));
ok.push(assertEq(null)(id(null)));
ok.push(assertEq(undefined)(id(undefined)));
ok.push(assertEq(undefined)(id()));
ok.push(assertEq(emptyObject)(id(emptyObject)));
ok.push(assertEq(emptyArray)(id(emptyArray)));
ok.push (assertEq(id)(id(id)));

// Y combinator
const factorial = Y(f => n => n <= 1 ? 1 : n * f(f)(n - 1));
ok.push(assertEq(120)(factorial(5)));
ok.push(assertEq(1)(factorial(0)));
ok.push(assertEq(1)(factorial(1)));
ok.push(assertEq(3628800)(factorial(10)));

// constant
ok.push(assertEq(1)(constant(1)(2)));
ok.push(assertEq(null)(constant(null)(undefined)));
ok.push(assertEq(emptyObject)(constant(emptyObject)(1))); 

// fst
ok.push(assertEq(1)(fst(1)(2)));
ok.push(assertEq(null)(fst(null)(undefined)));
ok.push(assertEq(emptyObject)(fst(emptyObject)(1)));

// snd
ok.push(assertEq(2)(snd(1)(2)));
ok.push(assertEq(null)(snd(undefined)(null))); 
ok.push(assertEq(emptyObject)(snd(1)(emptyObject)));

// Pair
ok.push(assertEq(1)(Pair(1)(2)(fst)));
ok.push(assertEq(2)(Pair(1)(2)(snd)));
ok.push(assertEq(undefined)(Pair(undefined)(null)(fst)));
ok.push(assertEq(null)(Pair(undefined)(null)(snd)));
const p = Pair(1)(2);
ok.push(assertEq(1)(p(fst)));
ok.push(assertEq(2)(p(snd)));

// Left
ok.push(assertEq(1)(Left(1)(id)(y => 0)));
ok.push(assertEq(null)(Left(null)(id)(id)));
let leftSideEffect = 0;
let rightSideEffect = 0;
Left(1)(_ => leftSideEffect++)(_ => rightSideEffect++);
ok.push(assertEq(1)(leftSideEffect));
ok.push(assertEq(0)(rightSideEffect));

// Right
ok.push(assertEq(1)(Right(1)(x => 0)(id)));
ok.push(assertEq(null)(Right(null)(id)(id)));
leftSideEffect = 0;
rightSideEffect = 0;
Right(1)(_ => leftSideEffect++)(_ => rightSideEffect++);
ok.push(assertEq(0)(leftSideEffect));
ok.push(assertEq(1)(rightSideEffect));

// either
ok.push(assertEq(1)(either(Left(1))(id)(y => 0)));
ok.push(assertEq(1)(either(Right(1))(x => 0)(id)));
ok.push(assertEq(6)(either(Left(5))(x => x + 1)(x => x * 2)));
ok.push(assertEq(10)(either(Right(5))(x => x + 1)(x => x * 2)));

// Just
ok.push(assertEq(1)(Just(1)(x => 0)(id)));
ok.push(assertEq(20)(Just(10)(() => 'bad')(x => x * 2)));
// Nothing
ok.push(assertEq(1)(Nothing(() => 1)(() => 0)));
ok.push(assertEq(undefined)(Nothing(id)(() => 'bad')));

// pipe
ok.push(assertEq(4)(pipe(x => x + 1, x => x * 2)(1)));
ok.push(assertEq(3)(pipe(x => x * 2, x => x + 1)(1)));
ok.push(assertEq(1)(pipe(id)(1)));
ok.push(assertEq(1)(pipe()(1)));

// compose
ok.push(assertEq(3)(compose(x => x + 1, x => x * 2)(1)));
ok.push(assertEq(4)(compose(x => x * 2, x => x + 1)(1)));
ok.push(assertEq(1)(compose(id)(1)));
ok.push(assertEq(1)(compose()(1)));

// curry
const sum4 = (a, b, c, d) => a + b + c + d;
ok.push(assertEq(10)(curry(sum4)(1)(2)(3)(4)));
ok.push(assertEq(10)(curry(sum4)(1, 2)(3)(4)));
ok.push(assertEq(10)(curry(sum4)(1, 2, 3)(4)));
ok.push(assertEq(10)(curry(sum4)(1, 2, 3, 4)));
ok.push(assertEq(10)(curry(sum4)(1)(2, 3)(4)));
ok.push(assertEq(10)(curry(sum4)(1)(2)(3, 4)));
// flip
const sub = a => b => a - b;
ok.push(assertEq(-5)(sub(5)(10)));
ok.push(assertEq(5)(flip(sub)(5)(10)));
ok.push(assertEq(0)(flip(sub)(1)(1)));

const pairArgs = a => b => [a, b];
const flippedPair = flip(pairArgs)(1)(2);
ok.push(assertEq(2)(flippedPair[0]));
ok.push(assertEq(1)(flippedPair[1]));

// toMaybe
const unwrapMaybe = m =>
  m(() => ({ tag: 'Nothing' }))(x => ({ tag: 'Just', value: x }));

// Just cases
let m = unwrapMaybe(toMaybe(1));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(1)(m.value));

m = unwrapMaybe(toMaybe(0));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(0)(m.value));

m = unwrapMaybe(toMaybe(''));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq('')(m.value));

m = unwrapMaybe(toMaybe(false));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(false)(m.value));

m = unwrapMaybe(toMaybe(emptyObject));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(emptyObject)(m.value));

m = unwrapMaybe(toMaybe(emptyArray));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(emptyArray)(m.value));

// Nothing cases
m = unwrapMaybe(toMaybe(null));
ok.push(assertEq('Nothing')(m.tag));

m = unwrapMaybe(toMaybe(undefined));
ok.push(assertEq('Nothing')(m.tag));

const nan = 0 / 0;
m = unwrapMaybe(toMaybe(nan));
ok.push(assertEq('Nothing')(m.tag));

ok.push(assertEq(Nothing)(toMaybe(Nothing)));

const justFive = Just(5);
m = unwrapMaybe(toMaybe(justFive));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(justFive)(m.value));

printReport(ok);
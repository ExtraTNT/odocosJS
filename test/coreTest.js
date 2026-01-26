import  * as core from '../src/core.js';
import { assertEq, printReport } from './test.js';
const ok = [];

const emptyObject = {};
const emptyArray = [];

// id
ok.push(assertEq(1)(core.id(1)));
ok.push(assertEq('a')(core.id('a')));
ok.push(assertEq(true)(core.id(true)));
ok.push(assertEq(null)(core.id(null)));
ok.push(assertEq(undefined)(core.id(undefined)));
ok.push(assertEq(undefined)(core.id()));
ok.push(assertEq(emptyObject)(core.id(emptyObject)));
ok.push(assertEq(emptyArray)(core.id(emptyArray)));
ok.push (assertEq(core.id)(core.id(core.id)));

// Y combinator
const factorial = core.Y(f => n => n <= 1 ? 1 : n * f(f)(n - 1));
ok.push(assertEq(120)(factorial(5)));
ok.push(assertEq(1)(factorial(0)));
ok.push(assertEq(1)(factorial(1)));
ok.push(assertEq(3628800)(factorial(10)));

// constant
ok.push(assertEq(1)(core.constant(1)(2)));
ok.push(assertEq(null)(core.constant(null)(undefined)));
ok.push(assertEq(emptyObject)(core.constant(emptyObject)(1))); 

// fst
ok.push(assertEq(1)(core.fst(1)(2)));
ok.push(assertEq(null)(core.fst(null)(undefined)));
ok.push(assertEq(emptyObject)(core.fst(emptyObject)(1)));

// snd
ok.push(assertEq(2)(core.snd(1)(2)));
ok.push(assertEq(null)(core.snd(undefined)(null))); 
ok.push(assertEq(emptyObject)(core.snd(1)(emptyObject)));

// Pair
ok.push(assertEq(1)(core.Pair(1)(2)(core.fst)));
ok.push(assertEq(2)(core.Pair(1)(2)(core.snd)));
ok.push(assertEq(undefined)(core.Pair(undefined)(null)(core.fst)));
ok.push(assertEq(null)(core.Pair(undefined)(null)(core.snd)));
const p = core.Pair(1)(2);
ok.push(assertEq(1)(p(core.fst)));
ok.push(assertEq(2)(p(core.snd)));

// Left
ok.push(assertEq(1)(core.Left(1)(core.id)(y => 0)));
ok.push(assertEq(null)(core.Left(null)(core.id)(core.id)));
let leftSideEffect = 0;
let rightSideEffect = 0;
core.Left(1)(_ => leftSideEffect++)(_ => rightSideEffect++);
ok.push(assertEq(1)(leftSideEffect));
ok.push(assertEq(0)(rightSideEffect));

// Right
ok.push(assertEq(1)(core.Right(1)(x => 0)(core.id)));
ok.push(assertEq(null)(core.Right(null)(core.id)(core.id)));
leftSideEffect = 0;
rightSideEffect = 0;
core.Right(1)(_ => leftSideEffect++)(_ => rightSideEffect++);
ok.push(assertEq(0)(leftSideEffect));
ok.push(assertEq(1)(rightSideEffect));

// either
ok.push(assertEq(1)(core.either(core.Left(1))(core.id)(y => 0)));
ok.push(assertEq(1)(core.either(core.Right(1))(x => 0)(core.id)));
ok.push(assertEq(6)(core.either(core.Left(5))(x => x + 1)(x => x * 2)));
ok.push(assertEq(10)(core.either(core.Right(5))(x => x + 1)(x => x * 2)));

// Just
ok.push(assertEq(1)(core.Just(1)(x => 0)(core.id)));
ok.push(assertEq(20)(core.Just(10)(() => 'bad')(x => x * 2)));
// Nothing
ok.push(assertEq(1)(core.Nothing(() => 1)(() => 0)));
ok.push(assertEq(undefined)(core.Nothing(core.id)(() => 'bad')));

// pipe
ok.push(assertEq(4)(core.pipe(x => x + 1, x => x * 2)(1)));
ok.push(assertEq(3)(core.pipe(x => x * 2, x => x + 1)(1)));
ok.push(assertEq(1)(core.pipe(core.id)(1)));
ok.push(assertEq(1)(core.pipe()(1)));

// compose
ok.push(assertEq(3)(core.compose(x => x + 1, x => x * 2)(1)));
ok.push(assertEq(4)(core.compose(x => x * 2, x => x + 1)(1)));
ok.push(assertEq(1)(core.compose(core.id)(1)));
ok.push(assertEq(1)(core.compose()(1)));

// curry
const sum4 = (a, b, c, d) => a + b + c + d;
ok.push(assertEq(10)(core.curry(sum4)(1)(2)(3)(4)));
ok.push(assertEq(10)(core.curry(sum4)(1, 2)(3)(4)));
ok.push(assertEq(10)(core.curry(sum4)(1, 2, 3)(4)));
ok.push(assertEq(10)(core.curry(sum4)(1, 2, 3, 4)));
ok.push(assertEq(10)(core.curry(sum4)(1)(2, 3)(4)));
ok.push(assertEq(10)(core.curry(sum4)(1)(2)(3, 4)));
// flip
const sub = a => b => a - b;
ok.push(assertEq(-5)(sub(5)(10)));
ok.push(assertEq(5)(core.flip(sub)(5)(10)));
ok.push(assertEq(0)(core.flip(sub)(1)(1)));

const pairArgs = a => b => [a, b];
const flippedPair = core.flip(pairArgs)(1)(2);
ok.push(assertEq(2)(flippedPair[0]));
ok.push(assertEq(1)(flippedPair[1]));

// toMaybe
const unwrapMaybe = m =>
  m(() => ({ tag: 'Nothing' }))(x => ({ tag: 'Just', value: x }));

// Just cases
let m = unwrapMaybe(core.toMaybe(1));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(1)(m.value));

m = unwrapMaybe(core.toMaybe(0));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(0)(m.value));

m = unwrapMaybe(core.toMaybe(''));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq('')(m.value));

m = unwrapMaybe(core.toMaybe(false));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(false)(m.value));

m = unwrapMaybe(core.toMaybe(emptyObject));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(emptyObject)(m.value));

m = unwrapMaybe(core.toMaybe(emptyArray));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(emptyArray)(m.value));

// Nothing cases
m = unwrapMaybe(core.toMaybe(null));
ok.push(assertEq('Nothing')(m.tag));

m = unwrapMaybe(core.toMaybe(undefined));
ok.push(assertEq('Nothing')(m.tag));

const nan = 0 / 0;
m = unwrapMaybe(core.toMaybe(nan));
ok.push(assertEq('Nothing')(m.tag));

ok.push(assertEq(core.Nothing)(core.toMaybe(core.Nothing)));

const justFive = core.Just(5);
m = unwrapMaybe(core.toMaybe(justFive));
ok.push(assertEq('Just')(m.tag));
ok.push(assertEq(justFive)(m.value));

printReport(ok);
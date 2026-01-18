//requires ../src/core.js
//requires test.js
const ok = [];

const emptyObject = {};
const emptyArray = [];

// id
ok.push(eq(1)(id(1)));
ok.push(eq('a')(id('a')));
ok.push(eq(true)(id(true)));
ok.push(eq(null)(id(null)));
ok.push(eq(undefined)(id(undefined)));
ok.push(eq(undefined)(id()));
ok.push(eq(emptyObject)(id(emptyObject)));
ok.push(eq(emptyArray)(id(emptyArray)));

// constant
ok.push(eq(1)(constant(1)(2)));
ok.push(eq(null)(constant(null)(undefined)));
ok.push(eq(emptyObject)(constant(emptyObject)(1))); 

// fst
ok.push(eq(1)(fst(1)(2)));
ok.push(eq(null)(fst(null)(undefined)));
ok.push(eq(emptyObject)(fst(emptyObject)(1)));

// snd
ok.push(eq(2)(snd(1)(2)));
ok.push(eq(null)(snd(undefined)(null))); 
ok.push(eq(emptyObject)(snd(1)(emptyObject)));

// Pair
ok.push(eq(1)(Pair(1)(2)(fst)));
ok.push(eq(2)(Pair(1)(2)(snd)));
ok.push(eq(undefined)(Pair(undefined)(null)(fst)));
ok.push(eq(null)(Pair(undefined)(null)(snd)));
const p = Pair(1)(2);
ok.push(eq(1)(p(fst)));
ok.push(eq(2)(p(snd)));

// Left
ok.push(eq(1)(Left(1)(id)(y => 0)));
ok.push(eq(null)(Left(null)(id)(id)));
let leftSideEffect = 0;
let rightSideEffect = 0;
Left(1)(_ => leftSideEffect++)(_ => rightSideEffect++);
ok.push(eq(1)(leftSideEffect));
ok.push(eq(0)(rightSideEffect));

// Right
ok.push(eq(1)(Right(1)(x => 0)(id)));
ok.push(eq(null)(Right(null)(id)(id)));
leftSideEffect = 0;
rightSideEffect = 0;
Right(1)(_ => leftSideEffect++)(_ => rightSideEffect++);
ok.push(eq(0)(leftSideEffect));
ok.push(eq(1)(rightSideEffect));

// either
ok.push(eq(1)(either(Left(1))(id)(y => 0)));
ok.push(eq(1)(either(Right(1))(x => 0)(id)));
ok.push(eq(6)(either(Left(5))(x => x + 1)(x => x * 2)));
ok.push(eq(10)(either(Right(5))(x => x + 1)(x => x * 2)));

// Just
ok.push(eq(1)(Just(1)(x => 0)(id)));
ok.push(eq(20)(Just(10)(() => 'bad')(x => x * 2)));

// Nothing
ok.push(eq(1)(Nothing(() => 1)(() => 0)));
ok.push(eq(undefined)(Nothing(id)(() => 'bad')));

// pipe
ok.push(eq(4)(pipe(x => x + 1, x => x * 2)(1)));
ok.push(eq(3)(pipe(x => x * 2, x => x + 1)(1)));
ok.push(eq(1)(pipe(id)(1)));
ok.push(eq(1)(pipe()(1)));

// compose
ok.push(eq(3)(compose(x => x + 1, x => x * 2)(1)));
ok.push(eq(4)(compose(x => x * 2, x => x + 1)(1)));
ok.push(eq(1)(compose(id)(1)));
ok.push(eq(1)(compose()(1)));

// curry
const sum4 = (a, b, c, d) => a + b + c + d;
ok.push(eq(10)(curry(sum4)(1)(2)(3)(4)));
ok.push(eq(10)(curry(sum4)(1, 2)(3)(4)));
ok.push(eq(10)(curry(sum4)(1, 2, 3)(4)));
ok.push(eq(10)(curry(sum4)(1, 2, 3, 4)));
ok.push(eq(10)(curry(sum4)(1)(2, 3)(4)));
ok.push(eq(10)(curry(sum4)(1)(2)(3, 4)));

printReport(ok);
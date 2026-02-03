import { assertEq, printReport } from './test.js';
import { iteratorFromArray, iteratorFromString, iteratorFromIterable } from '../src/iterator.js';

const ok = [];

// iteratorFromArray on empty array
const itEmptyArray = iteratorFromArray([]);
const itEmptyFirst = itEmptyArray.next();
ok.push(assertEq(true)(itEmptyFirst.done));
ok.push(assertEq(undefined)(itEmptyFirst.value));
const itEmptySecond = itEmptyArray.next();
ok.push(assertEq(true)(itEmptySecond.done));
ok.push(assertEq(undefined)(itEmptySecond.value));

// iteratorFromArray on non-empty array
const itArray = iteratorFromArray([1, 2, 3]);
const itArrayFirst = itArray.next();
ok.push(assertEq(false)(itArrayFirst.done));
ok.push(assertEq(1)(itArrayFirst.value));
const itArraySecond = itArray.next();
ok.push(assertEq(false)(itArraySecond.done));
ok.push(assertEq(2)(itArraySecond.value));
const itArrayThird = itArray.next();
ok.push(assertEq(false)(itArrayThird.done));
ok.push(assertEq(3)(itArrayThird.value));
const itArrayFourth = itArray.next();
ok.push(assertEq(true)(itArrayFourth.done));
ok.push(assertEq(undefined)(itArrayFourth.value));

// iteratorFromString on empty string
const itEmptyString = iteratorFromString('');
const itEmptyStringFirst = itEmptyString.next();
ok.push(assertEq(true)(itEmptyStringFirst.done));
ok.push(assertEq(undefined)(itEmptyStringFirst.value));

// iteratorFromString on non-empty string
const itString = iteratorFromString('abc');
const itStringFirst = itString.next();
ok.push(assertEq(false)(itStringFirst.done));
ok.push(assertEq('a')(itStringFirst.value));
const itStringSecond = itString.next();
ok.push(assertEq(false)(itStringSecond.done));
ok.push(assertEq('b')(itStringSecond.value));
const itStringThird = itString.next();
ok.push(assertEq(false)(itStringThird.done));
ok.push(assertEq('c')(itStringThird.value));
const itStringFourth = itString.next();
ok.push(assertEq(true)(itStringFourth.done));
ok.push(assertEq(undefined)(itStringFourth.value));

// iteratorFromIterable with an array
const baseArray = [10, 20];
const itIterableArray = iteratorFromIterable(baseArray);
const itIterableArrayFirst = itIterableArray.next();
ok.push(assertEq(false)(itIterableArrayFirst.done));
ok.push(assertEq(10)(itIterableArrayFirst.value));
const itIterableArraySecond = itIterableArray.next();
ok.push(assertEq(false)(itIterableArraySecond.done));
ok.push(assertEq(20)(itIterableArraySecond.value));
const itIterableArrayThird = itIterableArray.next();
ok.push(assertEq(true)(itIterableArrayThird.done));
ok.push(assertEq(undefined)(itIterableArrayThird.value));

// iteratorFromIterable with a Set
const baseSet = new Set([1, 2]);
const itIterableSet = iteratorFromIterable(baseSet);
const itIterableSetFirst = itIterableSet.next();
ok.push(assertEq(false)(itIterableSetFirst.done));
ok.push(assertEq(true)(baseSet.has(itIterableSetFirst.value)));
const itIterableSetSecond = itIterableSet.next();
ok.push(assertEq(false)(itIterableSetSecond.done));
ok.push(assertEq(true)(baseSet.has(itIterableSetSecond.value)));
const itIterableSetThird = itIterableSet.next();
ok.push(assertEq(true)(itIterableSetThird.done));
ok.push(assertEq(undefined)(itIterableSetThird.value));

// iteratorFromIterable with a generator
function* gen() {
  yield 'x';
  yield 'y';
}

const itGen = iteratorFromIterable(gen());
const itGenFirst = itGen.next();
ok.push(assertEq(false)(itGenFirst.done));
ok.push(assertEq('x')(itGenFirst.value));
const itGenSecond = itGen.next();
ok.push(assertEq(false)(itGenSecond.done));
ok.push(assertEq('y')(itGenSecond.value));
const itGenThird = itGen.next();
ok.push(assertEq(true)(itGenThird.done));
ok.push(assertEq(undefined)(itGenThird.value));

printReport(ok);

import { assertEq, arrEq, printReport } from './test.js';
import '../src/prototypeUtils.js';

const ok = [];

// Number.prototype.times
ok.push(arrEq([0, 2, 4, 6, 8])((5).times(i => i * 2)));

// Object.prototype.pipe
ok.push(assertEq(10)((5).pipe(x => x * 2)));
const obj = ({ value: 2 }).pipe(x => ({ doubled: x.value * 2 }));
ok.push(assertEq(4)(obj.doubled));

// Function.prototype.curry
const sum4 = (a, b, c, d) => a + b + c + d;
const curried = sum4.curry();
ok.push(assertEq(10)(curried(1)(2)(3)(4)));
ok.push(assertEq(10)(curried(1, 2)(3)(4)));

// Function.prototype.then
const inc = x => x + 1;
const double = x => x * 2;
ok.push(assertEq(8)(inc.then(double).then(double)(1)));

// Function.prototype.flip
const subtract = a => b => a - b;
ok.push(assertEq(5)(subtract.flip()(5)(10)));

// Array.prototype.head/tail/last
ok.push(assertEq(1)([1, 2, 3].head()));
ok.push(arrEq([2, 3])([1, 2, 3].tail()));
ok.push(assertEq(3)([1, 2, 3].last()));
ok.push(assertEq(undefined)([].head()));
ok.push(arrEq([])([].tail()));
ok.push(assertEq(undefined)([].last()));

// Array.prototype.chunk
ok.push(arrEq([[1, 2], [3, 4], [5]])([1, 2, 3, 4, 5].chunk(2)));
ok.push(arrEq([])([1, 2, 3].chunk(0)));

// Array.prototype.flatten
ok.push(arrEq([1, 2, 3, 4])([1, [2, [3]], 4].flatten()));

// Array.prototype.unique
ok.push(arrEq([1, 2, 3])([1, 2, 2, 3, 1].unique()));

// Array.prototype.equals
ok.push(assertEq(true)([1, 2, 3].equals([1, 2, 3])));
ok.push(assertEq(false)([1, 2].equals([1, 2, 3])));

// Array.prototype.sum/product
ok.push(assertEq(6)([1, 2, 3].sum()));
ok.push(assertEq(0)([].sum()));
ok.push(assertEq(6)([1, 2, 3].product()));
ok.push(assertEq(1)([].product()));

printReport(ok);

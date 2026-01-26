import { assertEq, arrEq, printReport } from './test.js';
import {
  emptyList,
  cons,
  head,
  tail,
  isEmpty,
  toArray,
  fromArray,
  listMap,
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
} from '../src/list.js';

const ok = [];

const fst = x => y => x;

// emptyList and basic constructors
ok.push(assertEq(true)(isEmpty(emptyList)));

const single = cons(1)(emptyList);
ok.push(assertEq(false)(isEmpty(single)));
ok.push(assertEq(1)(head(single)));
ok.push(assertEq(true)(isEmpty(tail(single))));

ok.push(arrEq([1, 2])(toArray(cons(1)(cons(2)(emptyList)))));

// head/tail on empty
ok.push(assertEq(emptyList)(head(emptyList)));
ok.push(assertEq(emptyList)(tail(emptyList)));

// fromArray / toArray roundtrip
ok.push(arrEq([])(toArray(fromArray([]))));
ok.push(arrEq([1, 2, 3])(toArray(fromArray([1, 2, 3]))));

// map over strict list
const doubled = listMap(x => x * 2)(fromArray([1, 2, 3]));
ok.push(arrEq([2, 4, 6])(toArray(doubled)));

// lazy list using thunk tail
const lazy = cons(1)(() => cons(2)(() => cons(3)(emptyList)));
ok.push(assertEq(1)(head(lazy)));
ok.push(arrEq([1, 2])(toArray(take(2)(lazy))));

// evaluate should force all tails
ok.push(arrEq([1, 2, 3])(toArray(listEvaluate(lazy))));

// takeA (array version) edge cases
ok.push(arrEq([])(takeA(0)(fromArray([1, 2, 3]))));
ok.push(arrEq([])(takeA(-1)(fromArray([1, 2, 3]))));
ok.push(arrEq([])(takeA(2)(emptyList)));
ok.push(arrEq([1, 2])(takeA(2)(fromArray([1, 2, 3]))));
ok.push(arrEq([1, 2, 3])(takeA(10)(fromArray([1, 2, 3]))));

// take (list version) edge cases
ok.push(arrEq([])(toArray(take(0)(fromArray([1, 2, 3])))));
ok.push(arrEq([])(toArray(take(-1)(fromArray([1, 2, 3])))));
ok.push(arrEq([])(toArray(take(2)(emptyList))));
ok.push(arrEq([1, 2])(toArray(take(2)(fromArray([1, 2, 3])))));
ok.push(arrEq([1, 2, 3])(toArray(take(10)(fromArray([1, 2, 3])))));

// combineList
ok.push(arrEq([])(toArray(combineList(emptyList)(emptyList))));
ok.push(arrEq([1, 2, 3])(toArray(combineList(fromArray([1, 2, 3]))(emptyList))));
ok.push(arrEq([1, 2, 3])(toArray(combineList(emptyList)(fromArray([1, 2, 3])))));
ok.push(arrEq([1, 2, 3, 4])(toArray(combineList(fromArray([1, 2]))(fromArray([3, 4])))));

// zipWith and zip
const add = a => b => a + b;
ok.push(arrEq([11, 22])(toArray(zipWith(add)(fromArray([1, 2, 3]))(fromArray([10, 20])))));

const zipped = zip(fromArray([1, 2]))(fromArray(['a', 'b', 'c']));
const unzipped = toArray(zipped).map(p => p(fst));
ok.push(arrEq([1, 2])(unzipped));

// filter
ok.push(arrEq([2, 4])(toArray(listFilter(x => x % 2 === 0)(fromArray([1, 2, 3, 4, 5])))));

// filter on empty
ok.push(arrEq([])(toArray(listFilter(x => true)(emptyList))));

// takeWhile
ok.push(arrEq([1, 2])(toArray(takeWhile(x => x < 3)(fromArray([1, 2, 3, 2, 1])))));
ok.push(arrEq([])(toArray(takeWhile(x => x < 0)(fromArray([1, 2, 3])))));
ok.push(arrEq([])(toArray(takeWhile(x => true)(emptyList))));

// dropWhile
ok.push(arrEq([3, 4])(toArray(dropWhile(x => x < 3)(fromArray([1, 2, 3, 4])))));
ok.push(arrEq([])(toArray(dropWhile(x => true)(fromArray([1, 2, 3])))));
ok.push(arrEq([1, 2, 3])(toArray(dropWhile(x => x > 5)(fromArray([1, 2, 3])))));

// groupBy
ok.push(arrEq([[1, 2, 3]])(toArray(groupBy(_ => true)(fromArray([1, 2, 3]))).map(toArray)));
ok.push(arrEq([[1], [2], [3, 3]])(toArray(groupBy(x => x)(fromArray([1, 2, 3, 3]))).map(toArray)));

ok.push(arrEq([
  [1, 3],
  [2, 4, 4],
  [5],
])(toArray(groupBy(x => x & 1 === 1)(fromArray([1, 3, 2, 4, 4, 5]))).map(toArray)));
ok.push(arrEq([])(toArray(groupBy(x => x)(emptyList))));

printReport(ok);

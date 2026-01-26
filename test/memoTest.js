import { memo } from '../src/memo.js';
import { assertEq, printReport } from './test.js';
import { dbgBench } from '../src/dbg.js';

const ok = [];

let computeCount = 0;
const fastDouble = memo(n => {
  computeCount += 1;
  return n * 2;
});

ok.push(assertEq(4)(fastDouble(2)));
ok.push(assertEq(4)(fastDouble(2)));
ok.push(assertEq(1)(computeCount));

computeCount = 0;
const memoUndefined = memo(x => {
  computeCount += 1;
  return undefined;
});
ok.push(assertEq(undefined)(memoUndefined('foo')));
ok.push(assertEq(undefined)(memoUndefined('foo')));
ok.push(assertEq(1)(computeCount));

computeCount = 0;
const memoObj = memo(obj => {
  computeCount += 1;
  return obj.value;
});
const ref = { value: 5 };
ok.push(assertEq(5)(memoObj(ref)));
ref.value = 9;
ok.push(assertEq(5)(memoObj(ref)));
ok.push(assertEq(1)(computeCount));

let evictionCount = 0;
const cappedMemo = memo(x => {
  evictionCount += 1;
  return x;
});

ok.push(assertEq('persist')(cappedMemo('persist')));
for (let i = 0; i < 1000; i++) {
  cappedMemo(`key-${i}`);
}
ok.push(assertEq('persist')(cappedMemo('persist')));
ok.push(assertEq(1002)(evictionCount));


// fibonacci with memoization, benchmark 1000th
const fib = memo(n => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

try {
  ok.push(assertEq(0)(fib(0)));
  ok.push(assertEq(1)(fib(1)));
  ok.push(assertEq(1)(fib(2)));
  ok.push(assertEq(2)(fib(3)));
  ok.push(assertEq(3)(fib(4)));
  ok.push(assertEq(5)(fib(5)));
  ok.push(assertEq(8)(fib(6)));
  ok.push(assertEq(1346269)(fib(30)));
  ok.push(assertEq(3524578)(fib(33)));
  ok.push(assertEq(2178309)(fib(32)));

  console.log('Benchmark fib(1000)...');
  const fib1000 = dbgBench(fib)(1000);
  const fib1000Str = '4.346655768693743e+208';
  ok.push(assertEq(fib1000Str)(fib1000.toString()));  
} catch (e) {
  ok.push(assertEq('no error')(e.message));
}

printReport(ok);

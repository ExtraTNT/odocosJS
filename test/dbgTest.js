import  { dbgId, dbgBench, dbgResolveOrDefault, dbgResolvePromiseOrDefault } from '../src/dbg.js';
import { assertEq, printReport } from './test.js';

const ok = [];

const obj = { a: 1, b: 2 };
const arr = [1, 2, 3];

ok.push(assertEq('123')(dbgId('123')));
ok.push(assertEq(obj)(dbgId(obj)));
ok.push(assertEq(arr)(dbgId(arr)));

let called = false;
const benchResult = dbgBench(x => {
  called = true;
  return x * 2;
})(3);
ok.push(assertEq(true)(called));
ok.push(assertEq(6)(benchResult));

const resolved = dbgResolvePromiseOrDefault(x => Promise.resolve(x * 3))(0);
resolved(4).then(val => ok.push(assertEq(12)(val)));

const rejected = dbgResolvePromiseOrDefault(() => Promise.reject(new Error('fail')))(99);
rejected(7).then(val => ok.push(assertEq(99)(val)));

const safe = dbgResolveOrDefault(x => x + 5)(0);
ok.push(assertEq(15)(safe(10)));

const fallback = dbgResolveOrDefault(() => { throw new Error('boom'); })(42);
ok.push(assertEq(42)(fallback(0)));

setTimeout(() => printReport(ok), 0);

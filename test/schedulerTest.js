import { Scheduler, DataFlowVariable } from '../src/scheduler.js';
import { assertEq, printReport, arrEq } from './test.js';

const ok = [];

// Scheduler should run tasks sequentially (including async tasks)
const s = Scheduler();
const seen = [];

s.add(done => {
  setTimeout(() => {
    seen.push(1);
    done();
  }, 0);
});

s.add(done => {
  seen.push(2);
  done();
});

s.add(done => {
  setTimeout(() => {
    seen.push(3);
    done();
  }, 0);
});

// DataFlowVariable initializes lazily and only once
let calls = 0;
const dfv = DataFlowVariable(() => {
  calls += 1;
  return 42;
});

ok.push(assertEq(42)(dfv()));
ok.push(assertEq(42)(dfv()));
ok.push(assertEq(1)(calls));

// Allow async scheduler tasks to complete before checking order and reporting
setTimeout(() => {
  ok.push(arrEq([1,2,3])(seen));
  printReport(ok);
}, 10);

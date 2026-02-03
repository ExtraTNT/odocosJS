import Task from '../src/Task.js';
import { assertEq, printReport } from './test.js';

//Todo: maybe rework those tests (currently AI generated)
const ok = [];

const runTask = task => {
  let state = { kind: 'pending' };
  task.fork(
    error => { state = { kind: 'rejected', value: error }; },
    value => { state = { kind: 'resolved', value }; },
  );
  return state;
};

const expectResolved = expected => task => {
  const state = runTask(task);
  return (state.kind === 'resolved' && state.value === expected)
    ? { pass: true }
    : { pass: false, expected: { kind: 'resolved', value: expected }, actual: state };
};

const expectRejected = expected => task => {
  const state = runTask(task);
  return (state.kind === 'rejected' && state.value === expected)
    ? { pass: true }
    : { pass: false, expected: { kind: 'rejected', value: expected }, actual: state };
};

// Task.of resolves with the provided value
ok.push(expectResolved(42)(Task.of(42)));

// map transforms successful values
ok.push(expectResolved(84)(Task.of(42).map(x => x * 2)));

// map preserves rejections
const failingMap = new Task(rej => rej('boom'));
ok.push(expectRejected('boom')(failingMap.map(x => x + 1)));

// chain sequences computations and flattens resulting tasks
const chained = Task.of(2)
  .chain(x => Task.of(x + 3))
  .map(x => x * 2);
ok.push(expectResolved(10)(chained));

// chain propagates rejection from the produced Task
const chainReject = Task.of(2)
  .chain(() => new Task(rej => rej('nope')));
ok.push(expectRejected('nope')(chainReject));

// Tasks are lazy until fork is invoked
let executed = false;
const lazy = new Task((_rej, res) => {
  executed = true;
  res('done');
});

ok.push(assertEq(false)(executed));
lazy.fork(() => {}, () => {});
ok.push(assertEq(true)(executed));

printReport(ok);

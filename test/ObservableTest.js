import { Observable } from '../src/Observable.js';
import { assertEq, printReport } from './test.js';

const ok = [];

// getValue should return initial value
const o1 = Observable(1);
ok.push(assertEq(1)(o1.getValue()));

// setValue should update the stored value
const o2 = Observable(1);
o2.setValue(2);
ok.push(assertEq(2)(o2.getValue()));

// onChange listener should be called with new value
const o3 = Observable(0);
let calledWith = null;
o3.onChange(v => {
  calledWith = v;
});
o3.setValue(5);
ok.push(assertEq(5)(calledWith));

// multiple listeners should all be notified
const o4 = Observable('a');
let first = null;
let second = null;
o4.onChange(v => {
  first = v;
});
o4.onChange(v => {
  second = v;
});
o4.setValue('b');
ok.push(assertEq('b')(first));
ok.push(assertEq('b')(second));

// listeners should see all updates in order
const o5 = Observable(0);
const seen = [];
o5.onChange(v => {
  seen.push(v);
});
o5.setValue(1);
o5.setValue(2);
ok.push(assertEq(2)(seen.length));
ok.push(assertEq(1)(seen[0]));
ok.push(assertEq(2)(seen[1]));

printReport(ok);

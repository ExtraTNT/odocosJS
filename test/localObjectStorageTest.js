import { set, get, remove, clear, getAll, getKeys, getItems } from '../src/localObjectStorage.js';
import { assertEq, printReport } from './test.js';

const ok = [];
// initial clear
clear();

// set and get
set('testKey')(42);
ok.push(assertEq(42)(get('testKey')));
set('a')(1);
set('b')(2);
ok.push(assertEq(1)(get('a')));
ok.push(assertEq(2)(get('b')));

// getAll should return all stored values
const allValues = getAll();
ok.push(assertEq(3)(allValues.length));
ok.push(assertEq(true)(allValues.includes(42)));
ok.push(assertEq(true)(allValues.includes(1)));
ok.push(assertEq(true)(allValues.includes(2)));

// getKeys should return all keys
const keys = getKeys();
ok.push(assertEq(3)(keys.length));
ok.push(assertEq(true)(keys.includes('testKey')));
ok.push(assertEq(true)(keys.includes('a')));
ok.push(assertEq(true)(keys.includes('b')));

// getItems should return all key-value pairs
const items = getItems();
ok.push(assertEq(3)(items.length));
const itemMap = {};
items.forEach(({ key, value }) => {
  itemMap[key] = value;
});
ok.push(assertEq(42)(itemMap['testKey']));
ok.push(assertEq(1)(itemMap['a']));
ok.push(assertEq(2)(itemMap['b']));

// remove should delete specific item
remove('a');
ok.push(assertEq(null)(get('a')));
ok.push(assertEq(2)(get('b')));
ok.push(assertEq(42)(get('testKey')));

// same for objects
set('objKey')({ x: 10, y: 20 });
ok.push(assertEq(10)(get('objKey').x));
ok.push(assertEq(20)(get('objKey').y));
remove('objKey');
ok.push(assertEq(null)(get('objKey')));
// clear should remove all items
clear();
ok.push(assertEq(0)(getKeys().length));

printReport(ok);



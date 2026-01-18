const safeString = x => {
  if (x === null) return 'null';
  if (typeof x === 'number' && isNaN(x)) return 'NaN';
  if (typeof x === 'string') return `"${x}"`;
  if (typeof x === 'function') return 'Function';
  if (x === undefined) return 'undefined';
  try {
    return JSON.stringify(x);
  } catch (e) {
    return String(x);
  }
};

const assertEq = expected => actual => expected === actual?
  { pass: true }
  : { pass: false, expected, actual };

const assertLike = expected => actual => expected == actual?
  { pass: true }
  : { pass: false, expected, actual };

const printReport = xs => 
  xs.every(x => x.pass) ?
    document.writeln(`All ${xs.length} tests ok`)
    : xs.forEach((x, i) => 
      x.pass ?
        document.writeln(`Test ${i} ok</br>`)
        : document.writeln(`Test ${i} failed. Expected: ${safeString(x.expected)}, Actual: ${safeString(x.actual)}${safeString(x.actual) === safeString(x.expected) ? ' (==, but not ===)' : ''}</br>`), 
    );
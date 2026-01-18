const safeString = x => {
  if (typeof x === 'string') return `"${x}"`;
  if (typeof x === 'function') return 'Function';
  if (x === undefined) return 'undefined';
  try {
    return JSON.stringify(x);
  } catch (e) {
    return String(x);
  }
};

const eq = expected => actual => expected === actual ?
  { pass: true }
  : { pass: false, expected, actual };

const printReport = xs => 
  xs.every(x => x.pass) ?
    document.writeln('All tests ok')
    : xs.forEach((x, i) => 
      x.pass ?
        document.writeln(`Test ${i} ok</br>`)
        : document.writeln(`Test ${i} failed. Expected: ${safeString(x.expected)}, Actual: ${safeString(x.actual)}${safeString(x.actual) === safeString(x.expected) ? ' (==, but not ===)' : ''}</br>`), 
    );
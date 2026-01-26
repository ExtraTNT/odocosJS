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
// Helper to unwrap Maybe for testing
const unwrap = m => m(() => 'Nothing')(x => x);

// Check if value is roughly equal (for float math)
const approx = expected => actual => {
  if (typeof expected === 'number' && typeof actual === 'number') {
    return Math.abs(expected - actual) < 0.00001 ? { pass: true } : { pass: false, expected, actual };
  }
  return assertEq(expected)(actual);
};

const arrEq = expected => actual => assertEq(JSON.stringify(expected))(JSON.stringify(actual));

const assertEq = expected => actual => expected === actual?
  { pass: true }
  : { pass: false, expected, actual };

const assertLike = expected => actual => expected == actual?
  { pass: true }
  : { pass: false, expected, actual };

const assertNotEq = expected => actual => expected != actual?
  { pass: true }
  : { pass: false, expected, actual };

const writeToDiv = divId => content => {
  const div = document.getElementById(divId);
  if (div) {
    div.innerHTML = content;
  }
};

const printReport = xs => 
  xs.every(x => x.pass) ?
    writeToDiv('test-results')(`All ${xs.length} tests ok`)
    : xs.forEach((x, i) => 
      x.pass ?
        writeToDiv('test-results')(`Test ${i} ok</br>`)
        : writeToDiv('test-results')(`Test ${i} failed. Expected: ${safeString(x.expected)}, Actual: ${safeString(x.actual)}${safeString(x.actual) === safeString(x.expected) ? ' (==, but not ===)' : ''}</br>`), 
    );



export { assertEq, assertNotEq, assertLike, approx, arrEq, unwrap, printReport, writeToDiv };
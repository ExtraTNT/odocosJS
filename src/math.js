import { Just, Nothing, id, flip } from './core.js';

// Simple math

/**
 * Addition. Curried: first provide a, then b.
 * @param {number} a - First addend.
 * @returns {function} Function taking b and returning a + b.
 * @example add(1)(2) // 3
 */
const add = a => b => a + b;

/**
 * Multiplication. Curried: first provide a, then b.
 * @param {number} a - First factor.
 * @returns {function} Function taking b and returning a * b.
 * @example mul(2)(3) // 6
 */
const mul = a => b => a * b;

/**
 * Subtraction. Curried: a - b.
 * @param {number} a - Minuend.
 * @returns {function} Function taking b and returning a - b.
 * @example sub(3)(5) // -2
 */
const sub = a => b => a - b;

/**
 * Division. Curried: a / b.
 * @param {number} a - Dividend.
 * @returns {function} Function taking b and returning a / b.
 * @example div(6)(3) // 2
 */
const div = a => b => a / b;

// Comparison

/**
 * Strict equality comparison.
 * @param {*} a - First value.
 * @returns {function} Function taking b and returning a === b.
 * @example eq(1)(1) // true
 */
const eq = a => b => a === b;

/**
 * Less-than comparison.
 * @param {number} a - Left operand.
 * @returns {function} Function taking b and returning a < b.
 * @example lt(1)(2) // true
 */
const lt = a => b => a < b;

/**
 * Greater-than comparison.
 * @param {number} a - Left operand.
 * @returns {function} Function taking b and returning a > b.
 * @example gt(2)(1) // true
 */
const gt = a => b => a > b;

/**
 * Less-than-or-equal comparison.
 * @param {number} a - Left operand.
 * @returns {function} Function taking b and returning a <= b.
 * @example lte(1)(1) // true
 */
const lte = a => b => a <= b;

/**
 * Greater-than-or-equal comparison.
 * @param {number} a - Left operand.
 * @returns {function} Function taking b and returning a >= b.
 * @example gte(2)(1) // true
 */
const gte = a => b => a >= b;

// More advanced math

/**
 * Power function a^b.
 * @param {number} a - Base.
 * @returns {function} Function taking exponent b.
 * @example pow(2)(3) // 8
 */
const pow = a => b => Math.pow(a, b);

/**
 * Square of a number.
 * @param {number} a - Value.
 * @returns {number} a * a.
 * @example square(4) // 16
 */
const square = a => a * a;

/**
 * Cube of a number.
 * @param {number} a - Value.
 * @returns {number} a * a * a.
 * @example cube(3) // 27
 */
const cube = a => a * a * a;

/**
 * Modulo operation a % b.
 * @param {number} a - Dividend.
 * @returns {function} Function taking divisor b.
 * @example mod(10)(3) // 1
 */
const mod = a => b => a % b;

/**
 * Square root.
 * @type {function}
 * @example sqrt(25) // 5
 */
const sqrt = Math.sqrt;

/**
 * Absolute value.
 * @type {function}
 * @example abs(-5) // 5
 */
const abs = Math.abs;

/**
 * Natural logarithm.
 * @type {function}
 * @example log(Math.E) // 1
 */
const log = Math.log;

/**
 * Exponential function e^x.
 * @type {function}
 * @example exp(1) // Math.E
 */
const exp = Math.exp;

/**
 * Logarithm with arbitrary base.
 * @param {number} base - Logarithm base.
 * @returns {function} Function taking x and returning log_base(x).
 * @example logx(2)(8) // 3
 */
const logx = base => x => div(Math.log(x))(Math.log(base));

// Trigonometry

/**
 * Sine function.
 * @type {function}
 * @example sin(0) // 0
 */
const sin = Math.sin;

/**
 * Cosine function.
 * @type {function}
 * @example cos(0) // 1
 */
const cos = Math.cos;

/**
 * Tangent function.
 * @type {function}
 * @example tan(Math.PI / 4) // ~1
 */
const tan = Math.tan;

/**
 * Arcsine function.
 * @type {function}
 * @example asin(0) // 0
 */
const asin = Math.asin;

/**
 * Arccosine function.
 * @type {function}
 * @example acos(1) // 0
 */
const acos = Math.acos;

/**
 * Arctangent function.
 * @type {function}
 * @example atan(1) // ~PI/4
 */
const atan = Math.atan;

/**
 * Two-argument arctangent.
 * @param {number} y - Y coordinate.
 * @returns {function} Function taking x (X coordinate).
 * @example atan2(1)(1) // ~PI/4
 */
const atan2 = y => x => Math.atan2(y, x);

/**
 * Convert degrees to radians.
 * @param {number} x - Angle in degrees.
 * @returns {number} Angle in radians.
 * @example degToRad(180) // ~PI
 */
const degToRad = x => mul(div(Math.PI)(180))(x);

/**
 * Convert radians to degrees.
 * @param {number} x - Angle in radians.
 * @returns {number} Angle in degrees.
 * @example radToDeg(Math.PI) // ~180
 */
const radToDeg = x => mul(div(180)(Math.PI))(x);

// Hyperbolic functions

/**
 * Hyperbolic sine.
 * @type {function}
 * @example sinh(0) // 0
 */
const sinh = Math.sinh;

/**
 * Hyperbolic cosine.
 * @type {function}
 * @example cosh(0) // 1
 */
const cosh = Math.cosh;

/**
 * Hyperbolic tangent.
 * @type {function}
 * @example tanh(0) // 0
 */
const tanh = Math.tanh;

/**
 * Inverse hyperbolic sine.
 * @type {function}
 * @example asinh(0) // 0
 */
const asinh = Math.asinh;

/**
 * Inverse hyperbolic cosine.
 * @type {function}
 * @example acosh(1) // 0
 */
const acosh = Math.acosh;

/**
 * Inverse hyperbolic tangent.
 * @type {function}
 * @example atanh(0) // 0
 */
const atanh = Math.atanh;

// Aggregate functions
/**
 * Sum of an array of numbers.
 * @param {number[]} xs - Array of numbers.
 * @returns {number} Sum of elements.
 * @example sum([1, 2, 3]) // 6
 */
const sum = xs => xs.reduce((a, b) => add(a)(b), 0);

/**
 * Product of an array of numbers.
 * @param {number[]} xs - Array of numbers.
 * @returns {number} Product of elements.
 * @example prod([1, 2, 3, 4]) // 24
 */
const prod = xs => xs.reduce((a, b) => mul(a)(b), 1);

/**
 * Minimum of an array of numbers.
 * @param {number[]} xs - Array of numbers.
 * @returns {number} Minimum element (Infinity for empty arrays).
 * @example min([3, 1, 4]) // 1
 */
const min = xs => xs.reduce((a, b) => lt(a)(b) ? a : b, Infinity);
/**
 * Smallest N elements of an array.
 * Returns a new array containing up to the N smallest values in ascending order.
 * The original array is not modified.
 * @param {number} n - Number of smallest elements to take.
 * @returns {function} Function taking an array of numbers.
 * @example nMin(2)([3, 1, 4]) // [1, 3]
 * @example nMin(5)([3, 1, 4]) // [1, 3, 4]
 * @example nMin(0)([3, 1, 4]) // []
 */
const nMin = n => xs => xs.slice().sort((a, b) => a - b).slice(0, n);


/**
 * Maximum of an array of numbers.
 * @param {number[]} xs - Array of numbers.
 * @returns {number} Maximum element (-Infinity for empty arrays).
 * @example max([3, 1, 4]) // 4
 */
const max = xs => xs.reduce((a, b) => gt(a)(b) ? a : b, -Infinity);
/**
 * Largest N elements of an array.
 * Returns a new array containing up to the N largest values in descending order.
 * The original array is not modified.
 * @param {number} n - Number of largest elements to take.
 * @returns {function} Function taking an array of numbers.
 * @example nMax(2)([3, 1, 4]) // [4, 3]
 * @example nMax(5)([3, 1, 4]) // [4, 3, 1]
 * @example nMax(0)([3, 1, 4]) // []
 */
const nMax = n => xs => xs.slice().sort((a, b) => b - a).slice(0, n);

/**
 * Arithmetic mean (average) of an array of numbers.
 * Returns NaN for an empty array.
 * @param {number[]} xs - Array of numbers.
 * @returns {Just<number> | Nothing} Mean value.
 * @example mean([1, 2, 3]) // Just(2)
 */
const mean = xs => xs.length === 0 ? Nothing : Just(div(sum(xs))(xs.length));

/**
 * Median of an array of numbers.
 * For even length, returns the average of the two middle values.
 * Returns NaN for an empty array.
 * @param {number[]} xs - Array of numbers.
 * @returns {Just<number> | Nothing} Median value.
 * @example median([3, 1, 4]) // Just(3)
 * @example median([1, 2, 3, 4]) // Just(2.5)
 */
const median = xs => {
  const sorted = xs.slice().sort((a, b) => a - b);
  const len = sorted.length;

  if (len === 0) {
    return Nothing;
  }

  const mid = Math.floor(len / 2);

  return (len % 2 === 0) ?
    Just(div(add(sorted[mid - 1])(sorted[mid]))(2))
    : Just(sorted[mid]);
};

/**
 * Population variance of an array of numbers.
 * Uses divisor N (not N-1). Returns NaN for an empty array.
 * @param {number[]} xs - Array of numbers.
 * @returns {Just<number> | Nothing} Variance.
 * @example variance([1, 2, 3, 4]) // Just(1.25)
 */
const variance = xs => (xs.length === 0)?
  Nothing
  : mean(xs)(
    () => Nothing)(
    m => mean(xs.map(x => square(sub(x)(m)))));

/**
 * Population standard deviation of an array of numbers.
 * Defined as sqrt(variance(xs)). Returns NaN for an empty array.
 * @param {number[]} xs - Array of numbers.
 * @returns {Just<number> | Nothing} Standard deviation.
 * @example stddev([1, 2, 3, 4]) // Just(~1.1180)
 */
const stddev = xs => variance(xs)(() => Nothing)(v => Just(sqrt(v)));

// Logical

/**
 * Logical AND.
 * @param {boolean} a - First operand.
 * @returns {function} Function taking b and returning a && b.
 * @example and(true)(false) // false
 */
const and = a => b => a && b;

/**
 * Logical OR.
 * @param {boolean} a - First operand.
 * @returns {function} Function taking b and returning a || b.
 * @example or(true)(false) // true
 */
const or = a => b => a || b;

/**
 * Logical XOR.
 * @param {*} a - First value (truthy/falsy).
 * @returns {function} Function taking b and returning exclusive OR.
 * @example xor(true)(false) // true
 */
const xor = a => b => (!!a) !== (!!b);

/**
 * Logical NOT.
 * @param {*} a - Value.
 * @returns {boolean} Negated truthiness.
 * @example not(true) // false
 */
const not = a => !a;

/**
 * Logical NAND.
 * @param {boolean} a - First operand.
 * @returns {function} Function taking b and returning !(a && b).
 * @example nand(true)(true) // false
 */
const nand = a => b => not(and(a)(b));

/**
 * Logical NOR.
 * @param {boolean} a - First operand.
 * @returns {function} Function taking b and returning !(a || b).
 * @example nor(false)(false) // true
 */
const nor = a => b => not(or(a)(b));

// Vector operations

/**
 * Dot product of two vectors.
 * @param {number[]} a - First vector.
 * @returns {function} Function taking vector b and returning sum(a[i] * b[i]).
 * @example vecDot([1, 2, 3])([4, 5, 6]) // 32
 */
const vecDot = a => b => a.reduce((sum, ai, i) => add(sum)(mul(ai)(b[i])), 0);

/**
 * Vector addition a + b (element-wise).
 * @param {number[]} a - First vector.
 * @returns {function} Function taking vector b and returning a new vector.
 * @example vecAdd([1, 2, 3])([4, 5, 6]) // [5, 7, 9]
 */
const vecAdd = a => b => a.map((ai, i) => add(ai)(b[i]));

/**
 * Vector subtraction a - b (element-wise).
 * @param {number[]} a - First vector.
 * @returns {function} Function taking vector b and returning a new vector.
 * @example vecSub([4, 5, 6])([1, 2, 3]) // [3, 3, 3]
 */
const vecSub = a => b => a.map((ai, i) => sub(ai)(b[i]));

/**
 * Scalar multiplication of a vector.
 * @param {number} k - Scalar.
 * @returns {function} Function taking vector v and returning k * v.
 * @example vecScalarMul(2)([1, 2, 3]) // [2, 4, 6]
 */
const vecScalarMul = k => v => v.map(vi => mul(k)(vi));

/**
 * Scalar division of a vector.
 * @param {number} k - Scalar divisor.
 * @returns {function} Function taking vector v and returning v / k.
 * @example vecScalarDiv(2)([2, 4, 6]) // [1, 2, 3]
 */
const vecScalarDiv = k => v => v.map(vi => div(vi)(k));

/**
 * 3D cross product a x b.
 * @param {number[]} a - First 3D vector.
 * @returns {function} Function taking 3D vector b and returning a Maybe of vector.
 * Returns Nothing if either vector is not length 3.
 * @example vecCross([1, 2, 3])([4, 5, 6]) // Just([-3, 6, -3])
 */
const vecCross = a => b => 
  a.length !==3 || b.length !==3 ? Nothing
    : Just(
      [
        sub(mul(a[1])(b[2]))(mul(a[2])(b[1])),
        sub(mul(a[2])(b[0]))(mul(a[0])(b[2])),
        sub(mul(a[0])(b[1]))(mul(a[1])(b[0])),
      ]);

/**
 * Euclidean distance between two vectors.
 * @param {number[]} a - First vector.
 * @returns {function} Function taking vector b.
 * @example vecDistance([0, 0])([3, 4]) // 5
 */
const vecDistance = a => b => sqrt(a.reduce((sum, ai, i) => add(sum)(square(sub(ai)(b[i]))), 0));

/**
 * Magnitude (length) of a vector.
 * @param {number[]} v - Vector.
 * @returns {number} Euclidean norm of v.
 * @example vecMagnitude([3, 4]) // 5
 */
const vecMagnitude = v => sqrt(v.reduce((sum, vi) => add(sum)(square(vi)), 0));

/**
 * Normalize a vector to unit length.
 * @param {number[]} v - Vector.
 * @returns {number[]} Normalized vector, or the original if length is 0.
 * @example vecNormalize([3, 4]) // [0.6, 0.8]
 */
const vecNormalize = v => {
  const mag = vecMagnitude(v);
  return mag === 0 ? v : v.map(flip(div)(mag));
};

/**
 * Angle between two vectors in radians.
 * @param {number[]} a - First vector.
 * @returns {function} Function taking vector b.
 * @example vecAngle([1, 0])([0, 1]) // ~PI/2
 */
const vecAngle = a => b => 
  acos(div(vecDot(a)(b))(mul(vecMagnitude(a))(vecMagnitude(b))));

/**
 * Scalar projection of vector a onto b.
 * @param {number[]} a - Vector to project.
 * @returns {function} Function taking vector b.
 * @example vecScalarProjection([3, 4])([1, 0]) // [3, 0]
 */
const vecScalarProjection = a => b => {
  const dot = vecDot(b)(b);
  return dot === 0 ?
    b.map(_ => 0)
    : vecScalarMul(div(vecDot(a)(b))(dot))(b);
};

/**
 * Vector projection of a onto b.
 * @param {number[]} a - Vector to project.
 * @returns {function} Function taking vector b.
 * @example vecVectorProjection([3, 4])([1, 0]) // [3, 0]
 */
const vecVectorProjection = a => b => {
  const dotb = vecDot(b)(b);
  return (dotb === 0) ?
    b.map(_ => 0)
    : vecScalarMul(div(vecDot(a)(b))(dotb))(b);
};
  
/**
 * Vector rejection of a from b (component of a orthogonal to b).
 * @param {number[]} a - Original vector.
 * @returns {function} Function taking vector b.
 * @example vecVectorRejection([3, 4])([1, 0]) // [0, 4]
 */
const vecVectorRejection = a => b => 
  vecSub(a)(vecVectorProjection(a)(b));

/**
 * Transform a vector by a matrix.
 * @param {number[][]} m - Matrix.
 * @returns {function} Function taking vector v and returning a Maybe vector.
 * @example vecTransform([[1, 0], [0, 1]])([3, 4]) // Just([3, 4])
 */
const vecTransform = m => v =>
  m.length === 0 || m[0].length !== v.length ?
    Nothing
    : Just(m.map(row => vecDot(row)(v)));

// Matrix operations

/**
 * Create an identity matrix of size n x n.
 * @param {number} n - Dimension.
 * @returns {number[][]} Identity matrix.
 * @example matIdentity(2) // [[1, 0], [0, 1]]
 */
const matIdentity = n => 
  Array.from({ length: n }, (_,y) =>
    Array.from({ length: n }, (_,x) =>
      (y == x)? 1 : 0));
/**
 * Calculates the inverse of a matrix with size n x n
 * Detects uninversable matrixes and returns Nothing in this case
 * On inversable it returns Just(inversed matrix)
 * 
 * thx to Igor for deciding to play mtg with my room m8 the day i was implementing this 
 * 
 * @param {number[][]} - Matrix to inverse
 * @returns {Just(number[][]) | Nothing} - Inversed matrix
 * @example matInverse([[1,2,3],[4,5,4],[7,7,9]]) // [[-0.85,-0.15,0.35],[0.4,0.6,-0.4],[0.35,-0.35,0.15]]
 */
const matInverse = A => {
  const n = A.length;
  if (n === 0 || A[0].length !== n || matDeterminant(A)(_ => 0)(id) === 0) return Nothing;

  // Create augmented matrix [A | I]
  const matId = matIdentity(n);
  const AI = A.map((row, i) => [...row, ...matId[i]]);
  // Perform Gaussian elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (gt(abs(AI[k][i]))(abs(AI[maxRow][i]))) {
        maxRow = k;
      }
    }
    if (AI[maxRow][i] === 0) {
      return Nothing; // Singular matrix
    }
    // Swap rows
    [AI[i], AI[maxRow]] = [AI[maxRow], AI[i]];

    
    // Normalize pivot row
    const pivot = AI[i][i];
    for (let j = 0; j < 2 * n; j++) {
      AI[i][j] = div(AI[i][j])(pivot);
    }

    // Eliminate other rows
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = AI[k][i];
        for (let j = 0; j < 2 * n; j++) {
          AI[k][j] = sub(AI[k][j])(mul(factor)(AI[i][j]));
        }
      }
    }
  }

  // Extract inverse matrix
  const Ainv = AI.map(row => row.slice(n));
  return Just(Ainv);
};
/**
 * Transpose a matrix.
 * @param {number[][]} m - Matrix.
 * @returns {number[][]} Transposed matrix.
 * @example matTranspose([[1, 2], [3, 4]]) // [[1, 3], [2, 4]]
 */
const matTranspose = m => m.length === 0 ?
  []
  : m[0].map((_, i) =>
    m.map(row => row[i]),
  );

/**
 * Matrix addition A + B.
 * @param {number[][]} A - First matrix.
 * @returns {function} Function taking matrix B and returning a Maybe matrix.
 * @example matAdd([[1, 2]])([[3, 4]]) // Just([[4, 6]])
 */
const matAdd = A => B => (A.length !== B.length || A[0].length !== B[0].length) ?
  Nothing
  : Just(A.map((row, i) =>
    row.map((val, j) =>
      add(val)(B[i][j]),
    ),
  ));

/**
 * Matrix subtraction A - B.
 * @param {number[][]} A - First matrix.
 * @returns {function} Function taking matrix B and returning a Maybe matrix.
 * @example matSub([[3, 4]])([[1, 2]]) // Just([[2, 2]])
 */
const matSub = A => B => (A.length !== B.length || A[0].length !== B[0].length) ?
  Nothing
  : Just(A.map((row, i) =>
    row.map((val, j) =>
      sub(val)(B[i][j]),
    ),
  ));

/**
 * Scalar multiplication of a matrix.
 * @param {number} k - Scalar.
 * @returns {function} Function taking matrix A.
 * @example matScalarMul(2)([[1, 2]]) // [[2, 4]]
 */
const matScalarMul = k => A =>
  A.map(row => row.map(mul(k)));

/**
 * Scalar division of a matrix.
 * @param {number} k - Scalar divisor.
 * @returns {function} Function taking matrix A.
 * @example matScalarDiv(2)([[2, 4]]) // [[1, 2]]
 */
const matScalarDiv = k => A =>
  A.map(row => row.map(flip(div)(k)));

/**
 * Determinant of a square matrix (recursive Laplace expansion).
 * Returns Nothing for non-square or empty matrices.
 * @param {number[][]} A - Matrix.
 * @returns {*} Maybe number (determinant or Nothing).
 * @example matDeterminant([[1, 2], [3, 4]]) // Just(-2)
 */
const matDeterminant = A => (A.length === 0 || A.length !== A[0].length) ?
  Nothing
  : A.length === 1 ?
    Just(A[0][0])
    : A.length === 2 ?
      Just(sub(mul(A[0][0])(A[1][1]))(mul(A[0][1])(A[1][0])))
      : Just(A[0].reduce((det, a0j, j) =>
        add(det)
        (mul((mod(j)(2) === 0) ? 1 : -1)
        (mul(a0j)(matDeterminant(A.slice(1).map(row => row.filter((_, colIndex) => colIndex !== j)))
        (_ => Nothing)
        (id))))
      ,0));

/**
 * Matrix multiplication A * B.
 * Returns Nothing if dimensions are incompatible.
 * @param {number[][]} A - Left matrix.
 * @returns {function} Function taking matrix B and returning a Maybe matrix.
 * @example matMul([[1, 2], [3, 4]])([[2, 0], [1, 2]]) // Just([[4, 4], [10, 8]])
 */
const matMul = A => B => {
  if (!A || !A[0] || !B || !B[0] || A[0].length !== B[0].length) {
    return Nothing;
  }
  const Bt = matTranspose(B);
  return Just(A.map(rowA => Bt.map(vecDot(rowA))));
};

/**
 * Alias for matrix multiplication.
 * @example matDot(A)(B) // same as matMul(A)(B)
 */
const matDot = matMul;

/**
 * Trace of a matrix (sum of diagonal elements).
 * Returns Nothing for non-square or empty matrices.
 * @param {number[][]} A - Matrix.
 * @returns {*} Maybe number (trace or Nothing).
 * @example matTrace([[1, 2], [3, 4]]) // Just(5)
 */
const matTrace = A =>
  A.length === 0 || A.length !== A[0].length ?
    Nothing
    : Just(A.reduce((sum, row, i) => add(sum)(row[i]), 0));

// Bitwise

/**
 * bitwise AND
 * @param {number} a
 * @param {number} b
 * @returns {number} a & b
 * @example band(5)(3) // 1
 */
const band = a => b => a & b;
/**
 * bitwise OR
 * @param {number} a 
 * @param {number} b
 * @returns {number} a | b
 * @example bor(5)(3) // 7
 */
const bor = a => b => a | b;
/**
 * bitwise XOR
 * @param {number} a 
 * @param {number} b
 * @returns {number} a ^ b
 * @example bxor(5)(3) // 6
 */
const bxor = a => b => a ^ b;
/**
 * bitwise NOT
 * @param {number} a
 * @returns {number} ~a
 * @example bnot(5) // -6
 */
const bnot = a => ~a;

// Shifts
/**
 * Arithmetic left shift
 * @param {number} a number to shift
 * @param {number} b number of bits to shift
 * @returns {number} a << b
 * @example shift(5)(2) // 20
 */
const shift = a => b => a << b;
/**
 * Arithmetic right shift
 * @param {number} a number to shift
 * @param {number} b number of bits to shift
 * @returns {number} a >> b
 * @example rshift(20)(2) // 5
 */
const rshift = a => b => a >> b;
/**
 * Arithmetic unsigned right shift
 * @param {number} a number to shift
 * @param {number} b number of bits to shift
 * @returns {number} a >>> b
 * @example urshift(-1)(1) // 2147483647
 */
const urshift = a => b => a >>> b;

/**
 * Hashes a string
 */
const hash = s =>  Math.abs(s.split('').reduce((xs, x) => add(x.charCodeAt(0))(add((shift(xs)(6)))((sub(shift(xs)(16)))(xs))), 0)).toString(16);



export {
  add,
  mul,
  sub,
  div,
  eq,
  lt,
  gt,
  lte,
  gte,
  pow,
  square,
  cube,
  mod,
  sqrt,
  abs,
  log,
  exp,
  logx,
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  atan2,
  degToRad,
  radToDeg,
  sinh,
  cosh,
  tanh,
  asinh,
  acosh,
  atanh,
  sum,
  prod,
  min,
  nMin,
  max,
  nMax,
  mean,
  median,
  variance,
  stddev,
  and,
  or,
  xor,
  not,
  nand,
  nor,
  vecDot,
  vecAdd,
  vecSub,
  vecScalarMul,
  vecScalarDiv,
  vecCross,
  vecDistance,
  vecMagnitude,
  vecNormalize,
  vecAngle,
  vecScalarProjection,
  vecVectorProjection,
  vecVectorRejection,
  vecTransform,
  matIdentity,
  matInverse,
  matTranspose,
  matAdd,
  matSub,
  matScalarMul,
  matScalarDiv,
  matDeterminant,
  matMul,
  matDot,
  matTrace,
  band,
  bor,
  bxor,
  bnot,
  shift,
  rshift,
  urshift,
  hash,
};

//requires ../src/math.js
//requires test.js
const ok = [];

// Helper to unwrap Maybe for testing
const unwrap = m => m(() => 'Nothing')(x => x);

// Check if value is roughly equal (for float math)
const approx = expected => actual => {
  if (typeof expected === 'number' && typeof actual === 'number') {
    return Math.abs(expected - actual) < 0.00001 ? { pass: true } : { pass: false, expected, actual };
  }
  return assertEq(expected)(actual);
};

// Simple math
ok.push(assertEq(3)(add(1)(2)));
ok.push(assertEq(0)(add(-1)(1)));
ok.push(assertEq(0)(add(0)(0)));
ok.push(approx(0.3)(add(0.1)(0.2))); 

ok.push(assertEq(6)(mul(2)(3)));
ok.push(assertEq(0)(mul(5)(0)));
ok.push(assertEq(-6)(mul(2)(-3)));
ok.push(assertEq(1)(mul(-1)(-1)));

ok.push(assertEq(-1)(sub(1)(2)));
ok.push(assertEq(0)(sub(1)(1)));
ok.push(assertEq(2)(sub(1)(-1)));

ok.push(assertEq(2)(div(6)(3)));
ok.push(assertEq(Infinity)(div(1)(0)));
ok.push(assertEq(-Infinity)(div(-1)(0)));
ok.push(assertEq(0.5)(div(1)(2)));

// Comparison
ok.push(assertEq(true)(eq(1)(1)));
ok.push(assertEq(false)(eq(1)(2)));
ok.push(assertEq(false)(eq(0)('0'))); // Strict equality check

ok.push(assertEq(true)(lt(1)(2)));
ok.push(assertEq(false)(lt(2)(1)));
ok.push(assertEq(false)(lt(1)(1)));

ok.push(assertEq(true)(gt(2)(1)));
ok.push(assertEq(false)(gt(1)(2)));
ok.push(assertEq(false)(gt(1)(1)));

ok.push(assertEq(true)(lte(1)(1)));
ok.push(assertEq(true)(lte(1)(2)));
ok.push(assertEq(false)(lte(2)(1)));

ok.push(assertEq(true)(gte(1)(1)));
ok.push(assertEq(true)(gte(2)(1)));
ok.push(assertEq(false)(gte(1)(2)));

// More advanced math
ok.push(assertEq(8)(pow(2)(3)));
ok.push(assertEq(1)(pow(5)(0)));
ok.push(assertEq(4)(pow(-2)(2)));
ok.push(assertEq(-8)(pow(-2)(3)));
ok.push(assertEq(0.25)(pow(2)(-2)));

ok.push(assertEq(16)(square(4)));
ok.push(assertEq(16)(square(-4)));
ok.push(assertEq(0)(square(0)));

ok.push(assertEq(27)(cube(3)));
ok.push(assertEq(-27)(cube(-3)));
ok.push(assertEq(0)(cube(0)));

ok.push(assertEq(1)(mod(10)(3)));
ok.push(assertEq(0)(mod(4)(2)));
ok.push(assertEq(true)((Number.isNaN(mod(4)(0)) ? true : mod(4)(0))));

ok.push(assertEq(5)(sqrt(25)));
ok.push(assertEq(0)(sqrt(0)));
ok.push(assertEq(true)((Number.isNaN(sqrt(-1)) ? true : sqrt(-1))));
ok.push(assertEq(5)(abs(-5)));
ok.push(assertEq(5)(abs(5)));
ok.push(assertEq(0)(abs(0)));

ok.push(approx(0)(log(1)));
ok.push(assertEq(-Infinity)(log(0)));
ok.push(approx(Math.E)(exp(1)));
ok.push(assertEq(1)(exp(0)));
ok.push(approx(3)(logx(2)(8)));
ok.push(approx(2)(logx(10)(100)));

// Trigonometry
ok.push(approx(0)(sin(0)));
ok.push(approx(1)(sin(Math.PI / 2)));
ok.push(approx(0)(sin(Math.PI)));

ok.push(approx(1)(cos(0)));
ok.push(approx(0)(cos(Math.PI / 2)));
ok.push(approx(-1)(cos(Math.PI)));

ok.push(approx(0)(tan(0)));
ok.push(approx(1)(tan(Math.PI / 4)));

ok.push(approx(0)(asin(0)));
ok.push(approx(Math.PI / 2)(asin(1)));

ok.push(approx(0)(acos(1)));
ok.push(approx(Math.PI)(acos(-1)));

ok.push(approx(0)(atan(0)));
ok.push(approx(Math.PI / 4)(atan(1)));

ok.push(approx(Math.PI/4)(atan2(1)(1)));
ok.push(approx(Math.PI)(degToRad(180)));
ok.push(approx(180)(radToDeg(Math.PI)));

// Hyperbolic functions
ok.push(approx(0)(sinh(0)));
ok.push(approx(1)(cosh(0)));
ok.push(approx(0)(tanh(0)));

// Logical - Full Truth Tables
// AND
ok.push(assertEq(true)(and(true)(true)));
ok.push(assertEq(false)(and(true)(false)));
ok.push(assertEq(false)(and(false)(true)));
ok.push(assertEq(false)(and(false)(false)));

// OR
ok.push(assertEq(true)(or(true)(true)));
ok.push(assertEq(true)(or(true)(false)));
ok.push(assertEq(true)(or(false)(true)));
ok.push(assertEq(false)(or(false)(false)));

// XOR
ok.push(assertEq(false)(xor(true)(true)));
ok.push(assertEq(true)(xor(true)(false)));
ok.push(assertEq(true)(xor(false)(true)));
ok.push(assertEq(false)(xor(false)(false)));

// NAND
ok.push(assertEq(false)(nand(true)(true)));
ok.push(assertEq(true)(nand(true)(false)));
ok.push(assertEq(true)(nand(false)(true)));
ok.push(assertEq(true)(nand(false)(false)));

// NOR
ok.push(assertEq(false)(nor(true)(true)));
ok.push(assertEq(false)(nor(true)(false)));
ok.push(assertEq(false)(nor(false)(true)));
ok.push(assertEq(true)(nor(false)(false)));

// NOT
ok.push(assertEq(false)(not(true)));
ok.push(assertEq(true)(not(false)));

// Vector operations
const v1 = [1, 2, 3];
const v2 = [4, 5, 6];
ok.push(assertEq(32)(dot(v1)(v2))); 
ok.push(assertEq(32)(dot([4, 5, 6])([1, 2, 3]))); // Commutative
ok.push(assertEq(0)(dot([1, 0])([0, 1]))); // Orthogonal

// vecAdd
let v = vecAdd([1, 2, 3])([4, 5, 6]);
ok.push(assertEq(5)(v[0]));
ok.push(assertEq(7)(v[1]));
ok.push(assertEq(9)(v[2]));

v = vecAdd([0, 0, 0])([1, 2, 3]);
ok.push(assertEq(1)(v[0]));
ok.push(assertEq(2)(v[1]));
ok.push(assertEq(3)(v[2]));

v = vecAdd([-1, -2, -3])([1, 2, 3]);
ok.push(assertEq(0)(v[0]));
ok.push(assertEq(0)(v[1]));
ok.push(assertEq(0)(v[2]));

// vecSub
v = vecSub([4, 5, 6])([1, 2, 3]);
ok.push(assertEq(3)(v[0]));
ok.push(assertEq(3)(v[1]));
ok.push(assertEq(3)(v[2]));

v = vecSub([1, 2, 3])([1, 2, 3]);
ok.push(assertEq(0)(v[0]));
ok.push(assertEq(0)(v[1]));
ok.push(assertEq(0)(v[2]));

v = vecSub([0, 0, 0])([1, 2, 3]);
ok.push(assertEq(-1)(v[0]));
ok.push(assertEq(-2)(v[1]));
ok.push(assertEq(-3)(v[2]));

// scalarMul
v = scalarMul(2)([1, 2, 3]);
ok.push(assertEq(2)(v[0]));
ok.push(assertEq(4)(v[1]));
ok.push(assertEq(6)(v[2]));

v = scalarMul(0)([1, 2, 3]);
ok.push(assertEq(0)(v[0]));
ok.push(assertEq(0)(v[1]));
ok.push(assertEq(0)(v[2]));

v = scalarMul(-1)([1, -2, 3]);
ok.push(assertEq(-1)(v[0]));
ok.push(assertEq(2)(v[1]));
ok.push(assertEq(-3)(v[2]));

// scalarDiv
v = scalarDiv(2)([2, 4, 6]);
ok.push(assertEq(1)(v[0]));
ok.push(assertEq(2)(v[1]));
ok.push(assertEq(3)(v[2]));

v = scalarDiv(-2)([2, -4, 6]);
ok.push(assertEq(-1)(v[0]));
ok.push(assertEq(2)(v[1]));
ok.push(assertEq(-3)(v[2]));

v = scalarDiv(1)([1, 2, 3]);
ok.push(assertEq(1)(v[0]));
ok.push(assertEq(2)(v[1]));
ok.push(assertEq(3)(v[2]));

// magnitude
ok.push(approx(3.741657)(magnitude(v1))); // sqrt(14)
ok.push(assertEq(0)(magnitude([0, 0, 0])));
ok.push(assertEq(5)(magnitude([3, 4])));
ok.push(assertEq(0)(magnitude([])));

// normalize non-zero vector
const vn = normalize([3, 0, 0]);
ok.push(assertEq(1)(vn[0]));
ok.push(assertEq(0)(vn[1]));
ok.push(assertEq(0)(vn[2]));
ok.push(approx(1)(magnitude(vn))); // normalized length ~ 1

const vn2 = normalize([3, 4]);
ok.push(approx(3 / 5)(vn2[0]));
ok.push(approx(4 / 5)(vn2[1]));
ok.push(approx(1)(magnitude(vn2)));

// normalize zero and empty vectors: should return same reference
const vZero = [0, 0, 0];
const vZeroNorm = normalize(vZero);
ok.push(assertEq(true)(vZero === vZeroNorm));
ok.push(assertEq(0)(vZeroNorm[0]));

const vEmpty = [];
const vEmptyNorm = normalize(vEmpty);
ok.push(assertEq(true)(vEmpty === vEmptyNorm));
ok.push(assertEq(0)(vEmptyNorm.length));

// vecCross (3D cross product)
// a x b for a=[1,2,3], b=[4,5,6] => [-3,6,-3]
let c = unwrap(vecCross([1, 2, 3])([4, 5, 6]));
ok.push(assertEq(-3)(c[0]));
ok.push(assertEq(6)(c[1]));
ok.push(assertEq(-3)(c[2]));

// Parallel vectors: cross should be zero vector
c = unwrap(vecCross([1, 2, 3])([2, 4, 6]));
ok.push(assertEq(0)(c[0]));
ok.push(assertEq(0)(c[1]));
ok.push(assertEq(0)(c[2]));

// Anti-symmetry: a x b = -(b x a)
const c1 = unwrap(vecCross([1, 2, 3])([4, 5, 6]));
const c2 = unwrap(vecCross([4, 5, 6])([1, 2, 3]));
ok.push(assertEq(-c1[0])(c2[0]));
ok.push(assertEq(-c1[1])(c2[1]));
ok.push(assertEq(-c1[2])(c2[2]));

// Invalid dimensions should yield Nothing
ok.push(assertEq('Nothing')(unwrap(vecCross([1, 2])([3, 4]))));
ok.push(assertEq('Nothing')(unwrap(vecCross([1, 2, 3, 4])([5, 6, 7, 8]))));
ok.push(assertEq('Nothing')(unwrap(vecCross([])([]))));

// Matrix operations
const M1 = [[1, 2], [3, 4]];
const M2 = [[2, 0], [1, 2]];
// M1 * M2 = [[4, 4], [10, 8]]
const MEst = matMul(M1)(M2);
const MRes = unwrap(MEst);
ok.push(assertEq(4)(MRes[0][0]));
ok.push(assertEq(4)(MRes[0][1]));
ok.push(assertEq(10)(MRes[1][0]));
ok.push(assertEq(8)(MRes[1][1]));

const MIdentity = [[1, 0], [0, 1]];
const MIdRes = unwrap(matMul(M1)(MIdentity));
ok.push(assertEq(1)(MIdRes[0][0]));
ok.push(assertEq(2)(MIdRes[0][1]));
ok.push(assertEq(3)(MIdRes[1][0]));
ok.push(assertEq(4)(MIdRes[1][1]));

const M3 = [[1]]; 
ok.push(assertEq('Nothing')(unwrap(matMul(M1)(M3))));

ok.push(assertEq('Nothing')(unwrap(matMul([])(M3))));

// Bitwise
ok.push(assertEq(1)(band(3)(1)));
ok.push(assertEq(0)(band(3)(0)));
ok.push(assertEq(3)(bor(1)(2)));
ok.push(assertEq(0)(bor(0)(0)));
ok.push(assertEq(3)(bxor(1)(2)));
ok.push(assertEq(0)(bxor(1)(1)));
ok.push(assertEq(-2)(bnot(1)));

// Shifts
ok.push(assertEq(8)(shift(2)(2))); // 2 << 2 = 8
ok.push(assertEq(1)(rshift(4)(2))); // 4 >> 2 = 1
ok.push(assertEq(1)(urshift(4)(2))); // 4 >>> 2 = 1
ok.push(assertEq(-1)(rshift(-4)(2)));
ok.push(assertEq(1073741823)(urshift(-4)(2)));

printReport(ok);

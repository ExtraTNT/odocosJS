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
ok.push(assertEq(32)(vecDot(v1)(v2))); 
ok.push(assertEq(32)(vecDot(v2)(v1))); // Commutative
ok.push(assertEq(0)(vecDot([1, 0])([0, 1]))); // Orthogonal

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
v = vecScalarMul(2)([1, 2, 3]);
ok.push(assertEq(2)(v[0]));
ok.push(assertEq(4)(v[1]));
ok.push(assertEq(6)(v[2]));

v = vecScalarMul(0)([1, 2, 3]);
ok.push(assertEq(0)(v[0]));
ok.push(assertEq(0)(v[1]));
ok.push(assertEq(0)(v[2]));

v = vecScalarMul(-1)([1, -2, 3]);
ok.push(assertEq(-1)(v[0]));
ok.push(assertEq(2)(v[1]));
ok.push(assertEq(-3)(v[2]));

// scalarDiv
v = vecScalarDiv(2)([2, 4, 6]);
ok.push(assertEq(1)(v[0]));
ok.push(assertEq(2)(v[1]));
ok.push(assertEq(3)(v[2]));

v = vecScalarDiv(-2)([2, -4, 6]);
ok.push(assertEq(-1)(v[0]));
ok.push(assertEq(2)(v[1]));
ok.push(assertEq(-3)(v[2]));

v = vecScalarDiv(1)([1, 2, 3]);
ok.push(assertEq(1)(v[0]));
ok.push(assertEq(2)(v[1]));
ok.push(assertEq(3)(v[2]));

// cross
const crossA = [1, 0, 0];
const crossB = [0, 1, 0];
const crossC = [0, 0, 1];
ok.push(assertEq(crossC[0])(unwrap(vecCross(crossA)(crossB))[0]));
ok.push(assertEq(crossC[1])(unwrap(vecCross(crossA)(crossB))[1]));
ok.push(assertEq(crossC[2])(unwrap(vecCross(crossA)(crossB))[2]));
ok.push(assertEq(crossA[0])(unwrap(vecCross(crossB)(crossC))[0]));
ok.push(assertEq(crossA[1])(unwrap(vecCross(crossB)(crossC))[1]));
ok.push(assertEq(crossA[2])(unwrap(vecCross(crossB)(crossC))[2]));
ok.push(assertEq(crossB[0])(unwrap(vecCross(crossC)(crossA))[0]));
ok.push(assertEq(crossB[1])(unwrap(vecCross(crossC)(crossA))[1]));
ok.push(assertEq(crossB[2])(unwrap(vecCross(crossC)(crossA))[2]));

const crossD = [1, 2, 3];
const crossE = [4, 5, 6];
const crossF = [-3, 6, -3];
ok.push(assertEq(crossF[0])(unwrap(vecCross(crossD)(crossE))[0]));
ok.push(assertEq(crossF[1])(unwrap(vecCross(crossD)(crossE))[1]));
ok.push(assertEq(crossF[2])(unwrap(vecCross(crossD)(crossE))[2]));
ok.push(assertEq(-crossF[0])(unwrap(vecCross(crossE)(crossD))[0]));
ok.push(assertEq(-crossF[1])(unwrap(vecCross(crossE)(crossD))[1]));
ok.push(assertEq(-crossF[2])(unwrap(vecCross(crossE)(crossD))[2]));

ok.push(assertEq('Nothing')(unwrap(vecCross([1,2])([3,4]))));
ok.push(assertEq('Nothing')(unwrap(vecCross([1,2,3,4])([5,6,7,8]))));
ok.push(assertEq('Nothing')(unwrap(vecCross([])([]))));

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

// distance
ok.push(approx(5)(vecDistance([1, 2, 3])([4, 6, 3]))); // 3-4-5 triangle in XY plane
ok.push(approx(7.81024968)(vecDistance([1, 2, 3])([4, 6, 9])));
ok.push(approx(0)(vecDistance([1, 2, 3])([1, 2, 3]))); // same point

// magnitude
ok.push(approx(3.741657)(vecMagnitude(v1))); // sqrt(14)
ok.push(assertEq(0)(vecMagnitude([0, 0, 0])));
ok.push(assertEq(5)(vecMagnitude([3, 4])));
ok.push(assertEq(0)(vecMagnitude([])));

// normalize non-zero vector
const vn = vecNormalize([3, 0, 0]);
ok.push(assertEq(1)(vn[0]));
ok.push(assertEq(0)(vn[1]));
ok.push(assertEq(0)(vn[2]));
ok.push(approx(1)(vecMagnitude(vn))); // normalized length ~ 1

const vn2 = vecNormalize([3, 4]);
ok.push(approx(3 / 5)(vn2[0]));
ok.push(approx(4 / 5)(vn2[1]));
ok.push(approx(1)(vecMagnitude(vn2)));

// normalize zero and empty vectors: should return same reference
const vZero = [0, 0, 0];
const vZeroNorm = vecNormalize(vZero);
ok.push(assertEq(true)(vZero === vZeroNorm));
ok.push(assertEq(0)(vZeroNorm[0]));

const vEmpty = [];
const vEmptyNorm = vecNormalize(vEmpty);
ok.push(assertEq(true)(vEmpty === vEmptyNorm));
ok.push(assertEq(0)(vEmptyNorm.length));

ok.push(approx(Math.PI / 3)(vecAngle([1, 0, 0])([0.5, Math.sqrt(3)/2, 0]))); // 60 degrees
ok.push(approx(Math.PI / 2)(vecAngle([1, 0, 0])([0, 1, 0]))); // 90 degrees
ok.push(approx(0)(vecAngle([1, 0, 0])([2, 0, 0]))); // 0 degrees

// scalar projection
ok.push(approx([0, 0, 0][0])(vecScalarProjection([1, 2, 3])([0, 0, 0])[0]));
ok.push(approx([0, 0, 0][1])(vecScalarProjection([1, 2, 3])([0, 0, 0])[1]));
ok.push(approx([0, 0, 0][2])(vecScalarProjection([1, 2, 3])([0, 0, 0])[2]));

const proj = vecScalarProjection([3, 4, 0])([1, 2, 0]);
ok.push(approx(2.2)(proj[0]));
ok.push(approx(4.4)(proj[1]));
ok.push(approx(0)(proj[2]));

// scalar rejection
ok.push(approx([1, 2, 3][0])(vecVectorRejection([1, 2, 3])([0, 0, 0])[0]));
ok.push(approx([1, 2, 3][1])(vecVectorRejection([1, 2, 3])([0, 0, 0])[1]));
ok.push(approx([1, 2, 3][2])(vecVectorRejection([1, 2, 3])([0, 0, 0])[2]));

const rej = vecVectorRejection([3, 4, 0])([1, 2, 0]);
ok.push(approx(0.8)(rej[0]));
ok.push(approx(-0.4)(rej[1]));
ok.push(approx(0)(rej[2]));

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

const M4 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const M4T = matTranspose(M4);
ok.push(assertEq(1)(M4T[0][0]));
ok.push(assertEq(4)(M4T[0][1]));
ok.push(assertEq(7)(M4T[0][2]));
ok.push(assertEq(2)(M4T[1][0]));
ok.push(assertEq(5)(M4T[1][1]));
ok.push(assertEq(8)(M4T[1][2]));
ok.push(assertEq(3)(M4T[2][0]));
ok.push(assertEq(6)(M4T[2][1]));
ok.push(assertEq(9)(M4T[2][2]));

const MEmpty = matTranspose([]);
ok.push(assertEq(0)(MEmpty.length));

// Identity matrix
const MI = matIdentity(3);
ok.push(assertEq(1)(MI[0][0]));
ok.push(assertEq(0)(MI[0][1]));
ok.push(assertEq(0)(MI[0][2]));
ok.push(assertEq(0)(MI[1][0]));
ok.push(assertEq(1)(MI[1][1]));
ok.push(assertEq(0)(MI[1][2]));
ok.push(assertEq(0)(MI[2][0]));
ok.push(assertEq(0)(MI[2][1]));
ok.push(assertEq(1)(MI[2][2]));


// Matrix Addition
const MA1 = [[1, 2], [3, 4]];
const MA2 = [[5, 6], [7, 8]];
const MARes = unwrap(matAdd(MA1)(MA2));
ok.push(assertEq(6)(MARes[0][0]));
ok.push(assertEq(8)(MARes[0][1]));
ok.push(assertEq(10)(MARes[1][0]));
ok.push(assertEq(12)(MARes[1][1]));

ok.push(assertEq('Nothing')(unwrap(matAdd([[1]])([[1,2]]))));
ok.push(assertEq('Nothing')(unwrap(matAdd([[1,2]])([[1]]))));

// Matrix Subtraction
const MSRes = unwrap(matSub(MA2)(MA1));
ok.push(assertEq(4)(MSRes[0][0]));
ok.push(assertEq(4)(MSRes[0][1]));
ok.push(assertEq(4)(MSRes[1][0]));
ok.push(assertEq(4)(MSRes[1][1]));

ok.push(assertEq('Nothing')(unwrap(matSub([[1]])([[1,2]]))));
ok.push(assertEq('Nothing')(unwrap(matSub([[1,2]])([[1]]))));

// Matrix Scalar Multiplication
const MSMRes = matScalarMul(2)(MA1);
ok.push(assertEq(2)(MSMRes[0][0]));
ok.push(assertEq(4)(MSMRes[0][1]));
ok.push(assertEq(6)(MSMRes[1][0]));
ok.push(assertEq(8)(MSMRes[1][1]));

// Matrix Scalar Division
const MSDRes = matScalarDiv(2)(MA1);
ok.push(assertEq(0.5)(MSDRes[0][0]));
ok.push(assertEq(1)(MSDRes[0][1]));
ok.push(assertEq(1.5)(MSDRes[1][0]));

// Determinant
const MD0 = [];
ok.push(assertEq('Nothing')(unwrap(matDeterminant(MD0))));
const MD1 = [[5]];
ok.push(assertEq(5)(unwrap(matDeterminant(MD1))));
const MD2 = [[1,2],[3,4]];
ok.push(assertEq(-2)(unwrap(matDeterminant(MD2))));
const MD3 = [[6,1,1],[4,-2,5],[2,8,7]];
ok.push(assertEq(-306)(unwrap(matDeterminant(MD3))));
const MD4 = [[1,0,2,-1],[3,0,0,5],[2,1,4,-3],[1,0,5,0]];
ok.push(assertEq(30)(unwrap(matDeterminant(MD4))));

ok.push(assertEq('Nothing')(unwrap(matDeterminant([[1,2,3],[4,5,6]]))));
ok.push(assertEq('Nothing')(unwrap(matDeterminant([]))));

const MTrace = [[1,2,3],[4,5,6],[7,8,9]];
ok.push(assertEq(15)(unwrap(matTrace(MTrace))));
ok.push(assertEq('Nothing')(unwrap(matTrace([[1,2,3],[4,5,6]]))));
ok.push(assertEq('Nothing')(unwrap(matTrace([]))));

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

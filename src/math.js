//requires core.js

// Simple math
const add = a => b => a + b;
const mul = a => b => a * b;
const sub = a => b => a - b;
const div = a => b => a / b;

// Comparison
const eq = a => b => a === b;
const lt = a => b => a < b;
const gt = a => b => a > b;
const lte = a => b => a <= b;
const gte = a => b => a >= b;

// More advanced math
const pow = a => b => Math.pow(a, b);
const square = a => a * a;
const cube = a => a * a * a;
const mod = a => b => a % b;
const sqrt = Math.sqrt;
const abs = Math.abs;
const log = Math.log;
const exp = Math.exp;
const logx = base => x => div(Math.log(x))(Math.log(base));

// Trigonometry
const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan;
const asin = Math.asin;
const acos = Math.acos;
const atan = Math.atan;
const atan2 = y => x => Math.atan2(y, x);
const degToRad = x => mul(div(Math.PI)(180))(x);
const radToDeg = x => mul(div(180)(Math.PI))(x);

// Hyperbolic functions
const sinh = Math.sinh;
const cosh = Math.cosh;
const tanh = Math.tanh;
const asinh = Math.asinh;
const acosh = Math.acosh;
const atanh = Math.atanh;

// Logical
const and = a => b => a && b;
const or = a => b => a || b;
const xor = a => b => (!!a) !== (!!b);
const not = a => !a;
const nand = a => b => not(and(a)(b));
const nor = a => b => not(or(a)(b));

// Vector operations
// Todo: verify those functions, I was maybe some whiskey in...
const dot = a => b => a.reduce((sum, ai, i) => add(sum)(mul(ai)(b[i])), 0);
const vecAdd = a => b => a.map((ai, i) => add(ai)(b[i]));
const vecSub = a => b => a.map((ai, i) => sub(ai)(b[i]));
const scalarMul = k => v => v.map(vi => mul(k)(vi));
const scalarDiv = k => v => v.map(vi => div(vi)(k));
const vecCross = a => b => 
  a.length !==3 || b.length !==3 ? Nothing
    : Just(
      [
        sub(mul(a[1])(b[2]))(mul(a[2])(b[1])),
        sub(mul(a[2])(b[0]))(mul(a[0])(b[2])),
        sub(mul(a[0])(b[1]))(mul(a[1])(b[0])),
      ]);

const magnitude = v => sqrt(v.reduce((sum, vi) => add(sum)(square(vi)), 0));
const normalize = v => {
  const mag = magnitude(v);
  return mag === 0 ? v : v.map(flip(div)(mag));
};

// matrix operations
const matMul = A => B => {
  if (!A || !A[0] || !B || !B[0] || A[0].length !== B.length) {
    return Nothing;
  }
  const Bt = B[0].map((_, i) => B.map(row => row[i]));
  return Just(A.map(row => Bt.map(dot(row))));
};

// Bitwise
const band = a => b => a & b;
const bor = a => b => a | b;
const bxor = a => b => a ^ b;
const bnot = a => ~a;

// Shifts
const shift = a => b => a << b;
const rshift = a => b => a >> b;
const urshift = a => b => a >>> b;


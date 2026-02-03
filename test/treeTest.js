import * as tree from '../src/tree.js';
import { assertEq, printReport } from './test.js';

const ok = [];

const { Leaf, BTree, l, r, toArray, pushL, pushR, pushAddressed, pop } = tree;

// Basic toArray on single leaf
const t1 = Leaf(1);
ok.push(assertEq('[1]')(JSON.stringify(toArray(t1))));

// toArray on a small manual tree: BTree(Leaf(1))(Leaf(2)) -> [1, 2]
const t2 = BTree(Leaf(1))(Leaf(2));
ok.push(assertEq('[1,2]')(JSON.stringify(toArray(t2))));

// toArray on deeper tree: ((1,2),(3,4)) -> [1,2,3,4]
const tDeep = BTree(BTree(Leaf(1))(Leaf(2)))(BTree(Leaf(3))(Leaf(4)));
ok.push(assertEq('[1,2,3,4]')(JSON.stringify(toArray(tDeep))));

// toArray on empty tree should be []
const tEmpty = null;
ok.push(assertEq('[]')(JSON.stringify(toArray(tEmpty))));

// pushL should insert on the leftmost side
const t3 = pushL(t2)(Leaf(0));
ok.push(assertEq('[0,1,2]')(JSON.stringify(toArray(t3))));

// pushR should insert on the rightmost side
const t4 = pushR(t2)(Leaf(3));
ok.push(assertEq('[1,2,3]')(JSON.stringify(toArray(t4))));

// pushL on empty creates the leaf tree
const tLempty = pushL(tEmpty)(Leaf(5));
ok.push(assertEq('[5]')(JSON.stringify(toArray(tLempty))));

// pushR on empty creates the leaf tree
const tRempty = pushR(tEmpty)(Leaf(6));
ok.push(assertEq('[6]')(JSON.stringify(toArray(tRempty))));

// pushAddressed with l uses pushL
const t5 = pushAddressed(t2)(l)(Leaf(0));
ok.push(assertEq('[0,1,2]')(JSON.stringify(toArray(t5))));

// pushAddressed with r uses pushR
const t6 = pushAddressed(t2)(r)(Leaf(3));
ok.push(assertEq('[1,2,3]')(JSON.stringify(toArray(t6))));

// pushAddressed with unknown address is a no-op
const badAddr = x => x; // neither l nor r
const tBad = pushAddressed(t2)(badAddr)(Leaf(9));
ok.push(assertEq('[1,2]')(JSON.stringify(toArray(tBad))));

// Helper to extract from Pair
const fst = p => p(x => _ => x);
const snd = p => p(_ => y => y);

// pop from left should remove the leftmost leaf
const leftPop = pop(t3)(l);
ok.push(assertEq(0)(fst(leftPop)));
ok.push(assertEq('[1,2]')(JSON.stringify(toArray(snd(leftPop)))));

// pop from right should remove the rightmost leaf
const rightPop = pop(t4)(r);
ok.push(assertEq(3)(fst(rightPop)));
ok.push(assertEq('[1,2]')(JSON.stringify(toArray(snd(rightPop)))));

// pop from left on deeper tree: [1,2,3,4] -> pop 1, rest [2,3,4]
const deepLeftPop = pop(tDeep)(l);
ok.push(assertEq(1)(fst(deepLeftPop)));
ok.push(assertEq('[2,3,4]')(JSON.stringify(toArray(snd(deepLeftPop)))));

// pop from right on deeper tree: remaining [2,3,4] -> pop 4, rest [2,3]
const deepAfterLeft = snd(deepLeftPop);
const deepRightPop = pop(deepAfterLeft)(r);
ok.push(assertEq(4)(fst(deepRightPop)));
ok.push(assertEq('[2,3]')(JSON.stringify(toArray(snd(deepRightPop)))));

// pop on empty tree should give (null, empty)
const emptyPop = pop(tEmpty)(l);
ok.push(assertEq(null)(fst(emptyPop)));
ok.push(assertEq('[]')(JSON.stringify(toArray(snd(emptyPop)))));

// pop with invalid direction should be a no-op, returning (null, same tree)
const badDir = x => x; // neither l nor r
const badDirPop = pop(t2)(badDir);
ok.push(assertEq(null)(fst(badDirPop)));
ok.push(assertEq('[1,2]')(JSON.stringify(toArray(snd(badDirPop)))));

// toString should produce a non-empty string for non-empty tree
ok.push(assertEq(true)(toString(t2).length > 0));

// toString on empty tree should be a single dot
ok.push(assertEq('·')(toString(tEmpty)));

// ---- Larger trees: sizes 5, 7, 24, 25 ----

// helper to build a left-leaning tree of n leaves [0..n-1]
const buildLeftTree = n => {
  let t = null;
  for (let i = 0; i < n; i += 1) {
    t = pushL(t)(Leaf(i));
  }
  return t;
};

// helper to build a right-leaning tree of n leaves [0..n-1]
const buildRightTree = n => {
  let t = null;
  for (let i = 0; i < n; i += 1) {
    t = pushR(t)(Leaf(i));
  }
  return t;
};

// size 5 left-leaning tree
const tSize5 = buildLeftTree(5);
ok.push(assertEq(5)(toArray(tSize5).length));
ok.push(assertEq('[0,1,2,3,4]')(JSON.stringify(toArray(tSize5))));

// popping all elements from the left should yield them in order and end empty
let accTree5 = tSize5;
let accValues5 = [];
for (let i = 0; i < 5; i += 1) {
  const p = pop(accTree5)(l);
  accValues5.push(fst(p));
  accTree5 = snd(p);
}
ok.push(assertEq('[0,1,2,3,4]')(JSON.stringify(accValues5)));
ok.push(assertEq('[]')(JSON.stringify(toArray(accTree5))));

// size 7 right-leaning tree
const tSize7 = buildRightTree(7);
ok.push(assertEq(7)(toArray(tSize7).length));
ok.push(assertEq('[0,1,2,3,4,5,6]')(JSON.stringify(toArray(tSize7))));

// popping all elements from the right should yield them in reverse order
let accTree7 = tSize7;
let accValues7 = [];
for (let i = 0; i < 7; i += 1) {
  const p = pop(accTree7)(r);
  accValues7.push(fst(p));
  accTree7 = snd(p);
}
ok.push(assertEq('[6,5,4,3,2,1,0]')(JSON.stringify(accValues7)));
ok.push(assertEq('[]')(JSON.stringify(toArray(accTree7))));

// size 24 mixed tree: alternate pushL and pushR
let tSize24 = null;
for (let i = 0; i < 24; i += 1) {
  tSize24 = (i % 2 === 0) ? pushL(tSize24)(Leaf(i)) : pushR(tSize24)(Leaf(i));
}
ok.push(assertEq(24)(toArray(tSize24).length));
ok.push(assertEq('[22,20,18,16,14,12,10,8,6,4,2,0,1,3,5,7,9,11,13,15,17,19,21,23]')(JSON.stringify(toArray(tSize24))));

// size 25 mixed tree: start from size-24 tree and push one more element
const tSize25 = pushL(tSize24)(Leaf(24));
ok.push(assertEq(25)(toArray(tSize25).length));
ok.push(assertEq('[24,22,20,18,16,14,12,10,8,6,4,2,0,1,3,5,7,9,11,13,15,17,19,21,23]')(JSON.stringify(toArray(tSize25))));

printReport(ok);

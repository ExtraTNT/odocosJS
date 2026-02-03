
import { Pair, fst, snd } from './core.js';

/**
 * Left selector (like fst) for Church-encoded pairs/branches.
 * @param {*} x - Left value.
 * @returns {function} Function taking the right value and returning x.
 * @example l(1)(2) // 1
 * @haskell l :: a -> b -> a
 */
const l = fst;

/**
 * Right selector (like snd) for Church-encoded pairs/branches.
 * @param {*} _ - Left value (ignored).
 * @returns {function} Function taking the right value and returning it.
 * @example r(1)(2) // 2
 * @haskell r :: a -> b -> b
 */
const r = snd;

/**
 * Leaf constructor for a Church-encoded binary tree.
 * Calls the leaf continuation with the stored value.
 *
 * @param {*} value - Value stored in the leaf.
 * @returns {function} Church-encoded tree expecting leaf and node continuations.
 * @example
 *   const t = Leaf(1);
 *   t(x => x)(lTree => rTree => 0); // 1
 * @haskell Leaf :: a -> Tree a
 */
const Leaf = value => leaf => node => leaf(value);

/**
 * Binary tree node constructor for Church-encoded trees.
 * Calls the node continuation with left and right subtrees.
 *
 * @param {function} left - Left subtree (Tree a).
 * @param {function} right - Right subtree (Tree a).
 * @returns {function} Church-encoded tree expecting leaf and node continuations.
 * @example
 *   const t = BTree(Leaf(1))(Leaf(2));
 *   toArray(t); // [1, 2]
 * @haskell BTree :: Tree a -> Tree a -> Tree a
 */
const BTree = left => right => leaf => node => node(left)(right);

/**
 * Sentinel representing the empty tree.
 * @type {null}
 * @haskell emptyTree :: Tree a   -- represented here as null
 */
const emptyTree = null;

/**
 * Check whether a tree is empty.
 * @param {*} tree - Tree value or null.
 * @returns {boolean} True if tree is emptyTree.
 * @haskell isEmpty :: Tree a -> Bool
 */
const isEmpty = tree => tree === emptyTree;

/**
 * Convert a Church-encoded binary tree to an array of leaf values (left-to-right).
 * @param {*} tree - Church-encoded tree or null.
 * @returns {Array<*>} Array of leaf values in traversal order.
 * @example toArray(BTree(Leaf(1))(Leaf(2))) // [1, 2]
 * @haskell toArray :: Tree a -> [a]
 */
const toArray = tree => isEmpty(tree)?
  []
  : tree(v => [v])(
    left => right => [...toArray(left), ...toArray(right)]);

/**
 * Push a leaf tree to the leftmost position of a tree.
 * If the tree is empty, returns the leaf tree.
 *
 * @param {*} tree - Original tree (Tree a or null).
 * @returns {function} Function taking a leaf tree to insert.
 * @example
 *   const t = BTree(Leaf(1))(Leaf(2));
 *   toArray(pushL(t)(Leaf(0))); // [0, 1, 2]
 * @haskell pushL :: Tree a -> Tree a -> Tree a
 */
const pushL = tree => leafTree => isEmpty(tree)?
  leafTree
  : tree(v => BTree(leafTree)(Leaf(v)))(
    left => right => BTree(pushL(left)(leafTree))(right));

/**
 * Push a leaf tree to the rightmost position of a tree.
 * If the tree is empty, returns the leaf tree.
 *
 * @param {*} tree - Original tree (Tree a or null).
 * @returns {function} Function taking a leaf tree to insert.
 * @example
 *   const t = BTree(Leaf(1))(Leaf(2));
 *   toArray(pushR(t)(Leaf(3))); // [1, 2, 3]
 * @haskell pushR :: Tree a -> Tree a -> Tree a
 */
const pushR = tree => leafTree => isEmpty(tree)?
  leafTree
  : tree(v => BTree(Leaf(v))(leafTree))(
    left => right => BTree(left)(pushR(right)(leafTree)));

/**
 * Push a leaf tree to a position in the tree determined by an address.
 * The address is either selector l (go left) or r (go right).
 * Invalid addresses leave the tree unchanged.
 *
 * @param {*} tree - Original tree (Tree a or null).
 * @returns {function} Function taking address and then leaf tree.
 * @example
 *   pushAddressed(t)(l)(Leaf(0)); // like pushL
 *   pushAddressed(t)(r)(Leaf(3)); // like pushR
 * @haskell pushAddressed :: Tree a -> (b -> b -> b) -> Tree a -> Tree a
 */
const pushAddressed = tree => address => leafTree =>
  address === l ?
    pushL(tree)(leafTree)
    : address === r ?
      pushR(tree)(leafTree)
      : tree;

// Internal helpers for popping leftmost / rightmost leaf
const popLeftInternal = tree => isEmpty(tree) ?
  ({ value: null, tree: emptyTree })
  : tree(v => ({ value: v, tree: emptyTree }))(left => right => {
    const { value, tree: newLeft } = popLeftInternal(left);
    return isEmpty(newLeft) ? 
    // Left subtree emptied, collapse into right subtree
      { value, tree: right }
      : { value, tree: BTree(newLeft)(right) };
  });

const popRightInternal = tree => isEmpty(tree) ? { value: null, tree: emptyTree } :
  tree(v => ({ value: v, tree: emptyTree }))(left => right => {
    const { value, tree: newRight } = popRightInternal(right);
    return isEmpty(newRight) ?
      // Right subtree emptied, collapse into left subtree
      { value, tree: left }
      : { value, tree: BTree(left)(newRight) };
  });


/**
 * Pop a leaf value from the tree from a given direction.
 * Direction is l (leftmost) or r (rightmost); other values are a no-op.
 * Returns a Church-encoded Pair of (poppedValue, newTree).
 *
 * @param {*} tree - Original tree (Tree a or null).
 * @returns {function} Function taking direction selector (l or r).
 * @example
 *   const p = pop(t)(l);
 *   const value = p(x => _ => x);
 *   const rest  = p(_ => y => y);
 * @haskell pop :: Tree a -> (b -> b -> b) -> Pair (Maybe a) (Tree a)
 */
const pop = tree => direction => {
  const dir = direction === l ? 'L'
    : direction === r ? 'R'
      : null;

  const { value, tree: rest } = dir === 'L'
    ? popLeftInternal(tree)
    : dir === 'R'
      ? popRightInternal(tree)
      : { value: null, tree };

  return Pair(value)(rest);
};


export {
  l,
  r,
  Leaf,
  BTree,
  toArray,
  pushL,
  pushR,
  pushAddressed,
  pop,
};
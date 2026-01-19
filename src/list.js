//requires core.js
const emptyList = null;

const cons = head => tail => ({
  head,
  tail: tail,
});

const head = list => list? list.head : emptyList;

const tail = list => list? list.tail : emptyList;

// Force the tail if it is a thunk, otherwise return it as-is.
// May causes issues with lists of functions
const forceTail = list => {
  if (list == null) return emptyList;
  const t = tail(list);
  return typeof t === 'function' ? t() : t;
};

const isEmpty = list => list == emptyList;

const toArray = list => isEmpty(list) ?
  []
  :  [head(list), ...toArray(forceTail(list))];

const fromArray = arr => arr.length === 0 ?
  emptyList
  : cons(arr[0])(fromArray(arr.slice(1)));

const map = f => s =>
  cons(f(head(s)))(() => map(f)(tail(s)));

const evaluate = s =>
  isEmpty(s) ?
    emptyList
    : cons(head(s))(evaluate(forceTail(s)));

const takeA = n => s => n <= 0 || isEmpty(s) ?
  []
  : [head(s), ...takeA(n - 1)(forceTail(s))];

const take = n => s => n <= 0 || isEmpty(s) ?
  emptyList
  : cons(head(s))(take(n - 1)(forceTail(s)) );

const combineList = a => b =>
  isEmpty(a) ? b : cons(head(a))(combineList(forceTail(a))(b));

const zipWith = f => as => bs => 
  (isEmpty(as) || isEmpty(bs)) ?
    emptyList
    : cons
    (f(head(as))(head(bs)))
    (() => zipWith(f)(forceTail(as))(forceTail(bs)));

const zip = zipWith(Pair);

const filter = f => xs => {
  const h = head(xs);
  const t = () => filter(f)(forceTail(xs));
  return f(h) ?
    cons(h)(t)
    : t();
}; 
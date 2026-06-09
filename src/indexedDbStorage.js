/**
 * indexedDbStorage — curried key/value store over IndexedDB.
 *
 * Same intent as localObjectStorage but every operation is async (returns a
 * Promise) and values can be any structured-cloneable type — strings, Blobs,
 * ArrayBuffers, plain objects. Good fit for anything that would blow past
 * localStorage's ~5 MB per-origin quota (e.g. audio / video / large images).
 *
 * Curried factory: `openDb(dbName)(storeName)` returns an object with the
 * usual KV operations. The DB connection is opened lazily on first use and
 * cached across the same factory instance.
 * @example
 *   const store = openDb('myDB')('myStore');
 *   await store.set('foo')('bar');
 *   const value = await store.get('foo');       // Just('bar') | Nothing
 *   const keys  = await store.getKeys();        // ['foo', …]
 *   await store.remove('foo');
 *   await store.clear();
 *
 * @haskell openDb :: String -> String -> Store
 *          Store.set    :: String -> a -> Promise ()
 *          Store.get    :: String -> Promise (Maybe a)
 *          Store.remove :: String -> Promise ()
 *          Store.clear  :: Promise ()
 *          Store.getKeys:: Promise [String]
 *          Store.getAll :: Promise [Maybe a]
 *          Store.getItems :: Promise [{ key, value :: Maybe a }]
 */

import { Just, Nothing } from './core.js';

// Lazy db opener. The first call to a Store.* operation pays the upgrade
// cost; subsequent calls reuse the cached connection promise.
const _openConnection = (dbName, storeName) => new Promise((resolve, reject) => {
  const req = indexedDB.open(dbName, 1);
  req.onupgradeneeded = () => {
    const db = req.result;
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName);
    }
  };
  req.onsuccess = () => resolve(req.result);
  req.onerror   = () => reject(req.error);
});

// Run a single store operation in its own transaction. `fn` receives the
// object store and returns the IDBRequest produced by `s.get` / `s.put` / etc.
const _run = (storeName, mode) => fn => db => new Promise((resolve, reject) => {
  const req = fn(db.transaction(storeName, mode).objectStore(storeName));
  req.onsuccess = () => resolve(req.result);
  req.onerror   = () => reject(req.error);
});

/**
 * Open (or create) a database + object store. Returns the curried KV API.
 *
 *   const store = openDb('dervo-game-editor')('asset-blobs');
 *
 * Re-calling `openDb(...)(...)` with the same names returns a NEW factory
 * with its own cached connection — callers wanting a singleton should
 * stash the result themselves.
 *
 * @param {string} dbName
 * @returns {function(string): Store}
 * @example
 *  const store = openDb('myDB')('myStore');
 *  await store.set('foo')('bar');
 *  const value = await store.get('foo');       // Just('bar') | Nothing
 *  const keys  = await store.getKeys();        // ['foo', …]
 *  await store.remove('foo');
 *  await store.clear();
 */
const openDb = dbName => storeName => {
  let conn = null;
  const db = () => (conn ||= _openConnection(dbName, storeName));

  const set = key => value =>
    db().then(_run(storeName, 'readwrite')(s => s.put(value, key)))
      .then(() => undefined);

  const get = key =>
    db().then(_run(storeName, 'readonly')(s => s.get(key)))
      .then(v => v === undefined ? Nothing : Just(v));

  const remove = key =>
    db().then(_run(storeName, 'readwrite')(s => s.delete(key)))
      .then(() => undefined);

  const clear = () =>
    db().then(_run(storeName, 'readwrite')(s => s.clear()))
      .then(() => undefined);

  const getKeys = () =>
    db().then(_run(storeName, 'readonly')(s => s.getAllKeys()));

  const getAll = () =>
    db().then(_run(storeName, 'readonly')(s => s.getAll()))
      .then(arr => arr.map(v => Just(v)));

  /**
  * Get all items in the store as an array of objects with `key` and `value` properties.
  * Each `value` is wrapped in a `Just` constructor.
  *
  * @returns {Promise<Array<{ key: string, value: Just<any> }>>}
  * @example
  *  const items = await store.getItems();
  *  // items is an array like: [{ key: 'foo', value: Just('bar') }, ...]
  */
  const getItems = () =>
    db().then(d => new Promise((resolve, reject) => {
      const tx = d.transaction(storeName, 'readonly');
      const s  = tx.objectStore(storeName);
      const kReq = s.getAllKeys();
      const vReq = s.getAll();
      let keys, vals, kDone = false, vDone = false;
      const settle = () => { if (kDone && vDone) resolve(keys.map((k, i) => ({ key: k, value: Just(vals[i]) }))); };
      kReq.onsuccess = () => { keys = kReq.result; kDone = true; settle(); };
      vReq.onsuccess = () => { vals = vReq.result; vDone = true; settle(); };
      kReq.onerror   = () => reject(kReq.error);
      vReq.onerror   = () => reject(vReq.error);
    }));

  return { set, get, remove, clear, getKeys, getAll, getItems };
};

export { openDb };

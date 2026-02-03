
import { Just, Nothing, id } from './core.js'; 
/**
 * set a value in localStorage (can be any JSON-serializable value)
 * @param {string} key 
 * @returns function taking value to set
 * @haskell set :: String -> a -> ()
 */
const set = key => value => localStorage.setItem(key, JSON.stringify(value));

/**
 * get a value from localStorage
 * @param {string} key 
 * @returns the stored value (deserialized if possible) or null if not found.
 * @haskell get :: String -> Maybe a
 */
const get = key => {
  const value = localStorage.getItem(key);
  if (!value) return Nothing;
  try {
    return Just(JSON.parse(value));
  } catch (_e) {
    return Just(value);
  }
};

/**
 * delete a value from localStorage
 * @param {string} key
 */
const remove = key => localStorage.removeItem(key);

/**
 * clear all values from localStorage, should only be used for testing
 */
const clear = () => localStorage.clear();

/**
 * get all stored values from localStorage
 * @returns {Array} Array of all stored values (deserialized if possible)
 */
const getAll = () => {
  const keys = Object.keys(localStorage);
  return keys.map(key => get(key) );
};

/**
 * get all keys from localStorage
 * @returns {string[]} Array of all stored keys
 */
const getKeys = () => Object.keys(localStorage);

/**
 * gets all key-value pairs from localStorage
 * @returns {Array} Array of all key-value pairs (values deserialized if possible)
 */
const getItems = () => {
  const keys = Object.keys(localStorage);
  return keys.map(key => ({ key, value: get(key) }));
};

export { set, get, remove, clear, getAll, getKeys, getItems };
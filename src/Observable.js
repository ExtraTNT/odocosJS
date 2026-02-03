
/**
 * Observable value.
 * @param {*} v value to store
 * @returns {Object} Observable with methods to getValue, setValue, and onChange to register listeners.
 * @example
 *   const o = Observable(1);
 *   o.onChange(v => console.log('new value:', v));
 *   o.setValue(2); // logs "new value: 2"
 *   console.log(o.getValue()); // 2
 */
const Observable = v => {
  const listeners = [];
  return {
    onChange: l => listeners.push(l),
    getValue: () => v,
    setValue: n => {
      v = n;
      listeners.forEach(l => l(v));
    },

  };
};

export { Observable };
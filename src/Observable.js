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

/**
 * Scheduler for tasks to be executed sequentially.
 * Tasks added to the scheduler are executed one at a time in the order they were added.
 * Each task is a function that may return a Promise; the scheduler waits for its completion
 * before starting the next task.
 * 
 * Tasks can be added via the `add` method.
 * @example
 * const scheduler = Scheduler();
 * scheduler.add(() => fetch('/api/data1').then(res => res.json()).then(data => console.log(data)));
 * scheduler.add(() => new Promise(resolve => setTimeout(() => { console.log('Task 2 done'); resolve(); }, 1000)));
 * @returns 
 */
const Scheduler = () => {
  const queue = [];
  let scheduled = false;
  const process = () => {
    if(queue.length < 1 || scheduled) return;
    scheduled = true;
    const task = queue.pop();
    new Promise(resolve => task(resolve)).finally(() => {
      scheduled = false;
      process();
    });
  };
  const add = task => {
    queue.unshift(task);
    process();
  };
  return { add };
};

/**
 * Lazy data flow variable.
 * The variable is initialized with the result of calling `init` on first access.
 * @param {function} init - Initialization function.
 * @returns {function} function that returns the variable's value, initialising it, if needed.
 * @example
 * const lazyVar = DataFlowVariable(() => {
 *   console.log('Initializing...');
 *   return 42;
 * });
 * console.log(lazyVar()); // Logs "Initializing..." then 42
 * console.log(lazyVar()); // Logs 42
 */
const DataFlowVariable = init => {
  let value = undefined;
  return () => (value === undefined)? value = init() : value;
};

export { Scheduler, DataFlowVariable };

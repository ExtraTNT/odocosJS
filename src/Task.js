/**
 * Minimal Task monad for representing lazy async computations.
 * Tasks are created with a function that receives `reject` and `resolve` callbacks
 * and are executed only when `fork` is invoked.
 * @example
 * const succeed = Task.of(1);
 * succeed
 *   .map(x => x + 1)
 *   .chain(x => Task.of(x * 2))
 *   .fork(console.error, console.log); // 4
 */
class Task {
  /**
   * Create a new Task.
   * @param {function(function(*), function(*))} fork - Function taking (reject, resolve).
   */
  constructor(fork) {
    this.fork = fork;
  }

  /**
   * Lift a plain value into a resolved Task.
   * @param {*} x - Value to wrap.
   * @returns {Task} Task resolved with x.
   * @example Task.of(3).fork(console.error, console.log); // 3
   */
  static of(x) {
    return new Task((_rej, res) => res(x));
  }

  /**
   * Functor map: transform the resolved value while preserving rejection.
   * @param {function(*) : *} f - Mapping function.
   * @returns {Task} New Task with mapped result.
   * @example Task.of(2).map(x => x * 3).fork(console.error, console.log); // 6
   */
  map(f) {
    return new Task((rej, res) => this.fork(rej, x => res(f(x))));
  }

  /**
   * Monad chain/flatMap: sequence Tasks, flattening the result.
   * @param {function(*) : Task} f - Function returning the next Task.
   * @returns {Task} Flattened Task.
   * @example
   * Task.of(2)
   *   .chain(x => Task.of(x + 5))
   *   .fork(console.error, console.log); // 7
   */
  chain(f) {
    return new Task((rej, res) => this.fork(rej, x => f(x).fork(rej, res)));
  }
}

export default Task;
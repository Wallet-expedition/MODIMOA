/**
 *
 * @param {Function} fn callback function
 * @param {Number} delay delay time
 * @returns
 */

export function throttle(fn, delay) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}

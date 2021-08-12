/**
 *
 * @param {Function} fn callback function
 * @param {Number} delay delay time
 * @returns
 */

export function throttle(fn, delay) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}

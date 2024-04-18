export function _typeof(data, type) {
  return Object.prototype.toString.call(data) === "[object " + type + "]";
}

export const D = document;

export const W = window;

export function addEventListener(a, b, c, d) {
  a && a.addEventListener(b, c, d || false);
}

export function removeEventListener(a, b, c, d) {
  a && a.removeEventListener(b, c, d || false);
}

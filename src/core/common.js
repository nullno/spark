export function _typeof(data, type) {
  if (data === null || data === undefined) {
    return type === "Null" ? data === null : type === "Undefined" ? data === undefined : false;
  }
  switch (type) {
    case "String": return typeof data === "string";
    case "Number": return typeof data === "number" && !isNaN(data);
    case "Boolean": return typeof data === "boolean";
    case "Function": return typeof data === "function";
    case "Array": return Array.isArray(data);
    case "Object": return typeof data === "object" && !Array.isArray(data);
    case "HTMLCollection": return typeof HTMLCollection !== "undefined" && data instanceof HTMLCollection;
    default: return Object.prototype.toString.call(data) === "[object " + type + "]";
  }
}

export const D = document;

export const W = window;

export function addEventListener(a, b, c, d) {
  a && a.addEventListener(b, c, d || false);
}

export function removeEventListener(a, b, c, d) {
  a && a.removeEventListener(b, c, d || false);
}

export function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

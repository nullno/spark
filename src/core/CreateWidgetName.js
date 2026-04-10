import Cache from "./Cache.js";

var _counter = 0;

export default function(widgetName) {
  var hashName;
  do {
    hashName = widgetName + "-" + (((1 + Math.random()) * 0x10000000) | 0).toString(16) + "_" + (++_counter);
  } while (Cache.ClassNames._has(hashName));
  Cache.ClassNames._add(hashName);
  return hashName;
}

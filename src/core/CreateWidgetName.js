/**
 * [CreateWidgetName description]
 * @AuthorHTL
 * @DateTime  2020-08-21T14:51:25+0800
 * @param     {[type]}                 widgetName [description]
 */
import Cache from "./Cache.js";

export default function (widgetName) {
  let hashName =
    widgetName + "-" + (((1 + Math.random()) * 0x10000000) | 0).toString(16);
  let testHash = Cache.ClassNames.join(",");

  hashName = -testHash.indexOf(hashName) == true ? hashName : hashName + "x2";

  Cache.ClassNames.push(hashName);
  return hashName;
}

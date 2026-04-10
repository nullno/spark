/**
 * extend 组件公共工具函数
 */
import { D } from "../common.js";
import Cache from "../Cache.js";

// widgetToDOM: 将 Spark widget 对象转为真实 DOM 节点
export function widgetToDOM(w) {
  if (!w) return null;
  if (w.nodeType) return w;
  if (typeof w === "string") {
    var c = Cache.WidgetCache[w];
    return c ? widgetToDOM(c) : D.createTextNode(w);
  }
  if (typeof w !== "object") return D.createTextNode(String(w));
  var el = D.createElement(w.tag || "div");
  if (w.style) el.style.cssText = w.style;
  if (w.className && typeof w.className === "string") el.className = w.className;
  if (w.idName) el.id = w.idName;
  if (w.type === "Text" && w.text != null) el.textContent = w.text;
  if (w.type === "Image" && w.imgurl) el.src = w.imgurl;
  if (w.child) {
    var ch = Array.isArray(w.child) ? w.child : [w.child];
    for (var i = 0; i < ch.length; i++) {
      var d = widgetToDOM(ch[i]);
      if (d) el.appendChild(d);
    }
  }
  if (w.on) {
    var bind = function(fn) { return function(e) { fn.call(w, e); }; };
    if (w.on.click) el.addEventListener("click", bind(w.on.click));
    if (w.on.hover || w.on.enter) el.addEventListener("mouseenter", bind(w.on.hover || w.on.enter));
    if (w.on.out || w.on.leave) el.addEventListener("mouseleave", bind(w.on.out || w.on.leave));
  }
  if (w.shover) {
    var orig = w.style || "";
    el.addEventListener("mouseenter", function() { for (var k in w.shover) el.style[k] = w.shover[k]; });
    el.addEventListener("mouseleave", function() { el.style.cssText = orig; });
  }
  if (typeof w.init === "function") { w.$el = el; w.init.call(w); }
  w.$el = el;
  return el;
}

// 气泡定位映射
export var posMap = {
  top: "bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:8px;",
  bottom: "top:100%;left:50%;transform:translateX(-50%);margin-top:8px;",
  left: "right:100%;top:50%;transform:translateY(-50%);margin-right:8px;",
  right: "left:100%;top:50%;transform:translateY(-50%);margin-left:8px;",
};

// 日期工具
export function pad(n) { return n < 10 ? "0" + n : String(n); }
export function formatDate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

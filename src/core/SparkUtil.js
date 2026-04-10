import { _typeof } from "./common.js";

const inBrowser = typeof window !== "undefined";
const UA = inBrowser && window.navigator.userAgent.toLowerCase();

let SparkUtil = {
  screen: {
    width: function() { return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; },
    height: function() { return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; },
    scrollTop: function() { return document.documentElement.scrollTop || document.body.scrollTop; },
    scrollHeight: function() { return document.documentElement.scrollHeight || document.body.scrollHeight; },
    resize: function(cb) {
      var fn = function() { cb({ width: SparkUtil.screen.width(), height: SparkUtil.screen.height() }); };
      fn(); window.addEventListener("resize", fn);
    },
  },
  includes: function(s1, s2) { return s1.indexOf(s2) !== -1; },
  trimAll: function(s) { return s.replace(/\s*/g, ""); },
  trim: function(s) { return s ? s.replace(/^\s*|\s*$/g, "") : ""; },
  debounce: function(fn, delay) {
    var t = null;
    return function(e) {
      e.stopPropagation();
      var args = arguments;
      t && clearTimeout(t);
      t = setTimeout(function() { fn.apply(this, args); }, delay);
    };
  },
  throttle: function(fn, delay) {
    var last = 0;
    return function() {
      var now = +new Date();
      if (now - last > delay) { fn.apply(this, arguments); last = now; }
    };
  },
  objectToQueryString: function(obj) {
    var pairs = Object.entries(obj).map(function(kv) {
      return encodeURIComponent(kv[0]) + "=" + encodeURIComponent(kv[1]);
    });
    return pairs.length > 0 ? "?" + pairs.join("&") : "";
  },
  getQueryParam: function(name, url) {
    var reg = new RegExp("(\\?|&)" + name + "=([^&#]*)");
    var r = reg.exec(url || location.href);
    return r ? decodeURIComponent(r[2]) : null;
  },
  urlQuery: function(urlString) {
    var url = new URL(urlString || location.href);
    if (!url.search && url.hash.indexOf("?") === -1) return {};
    var deParam = url.search ? /\?[^#]+/.exec(url.search)[0] : url.hash ? /\?[^#]+/.exec(url.hash)[0] : null;
    var params = new URLSearchParams(deParam.replace("?", ""));
    var q = {};
    params.forEach(function(v, k) { q[k] = decodeURIComponent(v || ""); });
    return q;
  },
  deepCopyObj: function(obj) {
    var r = Array.isArray(obj) ? [] : {};
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        r[k] = typeof obj[k] === "object" && obj[k] !== null ? this.deepCopyObj(obj[k]) : obj[k];
      }
    }
    return r;
  },
  loadScript: function(url, cb) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.onload = function() { cb(s); };
    s.src = url;
    document.body.appendChild(s);
  },
  getFile: function(filepath, resolve, reject) {
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {
      if (XHR.readyState === 4 && XHR.status === 200) resolve && resolve(XHR.responseText);
      else reject && reject();
    };
    XHR.open("get", filepath);
    XHR.responseType = "text";
    XHR.send();
  },
  unique: function(arr) {
    if (!Array.isArray(arr)) return;
    var res = [], obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) { res.push(arr[i]); obj[arr[i]] = 1; }
    }
    return res;
  },
  devTool: function(url) {
    this.loadScript(url || "https://cdn.bootcss.com/eruda/1.5.8/eruda.min.js", function() { eruda.init(); });
  },
  env: {
    inBrowser: inBrowser,
    UA: UA,
    isMobile: UA && /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
    isIE: UA && /msie|trident/.test(UA),
    isIE9: UA && UA.indexOf("msie 9.0") > 0,
    isEdge: UA && UA.indexOf("Edge/") > 0,
    isAndroid: UA && UA.indexOf("android") > 0,
    isIOS: UA && /iphone|ipad|ipod|ios/.test(UA),
    isChrome: UA && /chrome\/\d+/.test(UA),
    isFF: UA && UA.match(/firefox\/(\d+)/),
    isWeixin: UA && UA.match(/MicroMessenger\/[0-9]/i),
    isQQ: UA && UA.match(/QQ\/[0-9]/i),
  },
  getImgInfo: function(url, cb) {
    var img = new Image();
    img.src = url;
    img.onload = function() { cb({ width: img.width, height: img.height }); };
  },
  compareRemove: function(arr, compare) {
    if (Array.isArray(arr) && compare) {
      for (var i = 0; i < arr.length; i++) {
        if ((compare.a ? arr[i][compare.a] : arr[i]) === compare.b) { arr.splice(i, 1); i--; }
      }
    }
  },
  traverse: function(data, cb) {
    if (Array.isArray(data)) {
      for (var i = 0, l = data.length; i < l; i++) cb(data[i], i, i === l - 1);
    } else if (_typeof(data, "Object")) {
      var keys = Object.keys(data);
      for (var i = 0, l = keys.length; i < l; i++) cb(keys[i]);
    } else if (_typeof(data, "Number")) {
      for (var i = 0; i < data; i++) cb(i, i === data - 1);
    }
  },
  isInArray: function(arr, compare) {
    for (var i = 0; i < arr.length; i++) {
      if ((compare.a ? arr[i][compare.a] : arr[i]) === compare.b) return i;
    }
    return -1;
  },
  isInArrayIncludes: function(arr, compare) {
    for (var i = 0; i < arr.length; i++) {
      if (SparkUtil.includes(compare.a ? arr[i][compare.a] : arr[i], compare.b)) return i;
    }
    return -1;
  },
};

export default SparkUtil;

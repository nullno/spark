import { _typeof, D } from "./common.js";
import SparkUtil from "./SparkUtil.js";
import DefaultSetting from "./DefaultSetting.js";

const _core = {
  prefixMap: {
    transition: ["-webkit-"],
    transform: ["-webkit-"],
    animation: ["-webkit-"],
    "animation-name": ["-webkit-"],
    "user-select": ["-webkit-", "-moz-"],
    "backface-visibility": ["-webkit-"],
    "flex-direction": ["-webkit-"],
    flex: ["-webkit-"],
    "justify-content": ["-webkit-"],
    "align-items": ["-webkit-"],
    "flex-wrap": ["-webkit-"],
  },
  insert: function(attr, val, css) {
    var s = D.createElement("style");
    s.type = "text/css";
    s.setAttribute(attr, val);
    s.innerText += (/modifycss/.test(attr) ? "." + val : "") + css;
    D.head.insertBefore(s, D.head.lastChild);
  },
  remove: function(sel) {
    var el = D.querySelector(sel);
    if (el) D.head.removeChild(el);
  },
  getStyleEl: function(sel) { return D.querySelector(sel); },
  autoprefixer: function(item, obj) {
    var p = item.split(":");
    var param = SparkUtil.trim(p[0]), value = SparkUtil.trim(p[1]);
    var prefixes = this.prefixMap[param];
    if (prefixes) {
      for (var i = 0; i < prefixes.length; i++) obj[prefixes[i] + param] = value;
    }
  },
};

const CSSManager = {
  cssParse: {
    add: function(id, css) {
      css = css && SparkUtil.trim(css);
      _core.remove("[data-style='" + id + "']");
      _core.insert("data-style", id, css);
    },
    modify: function(selector, css) {
      css = SparkUtil.trim(css);
      var el = _core.getStyleEl('[data-modifycss="' + selector + '"]');
      if (el) { el.textContent = "." + selector + css; }
      else { _core.insert("data-modifycss", selector, css); }
    },
    strStyleToObj: function(str) {
      var obj = {};
      if (!_typeof(str, "String")) return obj;
      var urls = [];
      var safe = SparkUtil.trim(str).replace(/url\s*\([^)]*\)/gi, function(m) {
        urls.push(m); return "__URL_" + (urls.length - 1) + "__";
      });
      var arr = safe.replace(/"/g, "").replace(/'/g, "").split(";");
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          var item = arr[i];
          for (var j = 0; j < urls.length; j++) item = item.replace("__URL_" + j + "__", urls[j]);
          var ci = item.indexOf(":");
          if (ci !== -1) {
            obj[SparkUtil.trim(item.substring(0, ci))] = SparkUtil.trim(item.substring(ci + 1));
            _core.autoprefixer(item, obj);
          }
        }
      }
      return obj;
    },
    objStyleToStr: function(obj) {
      if (!_typeof(obj, "Object")) return "";
      var o = {};
      for (var k in obj) o[k.replace(/([A-Z])/g, "-$1").toLowerCase()] = obj[k];
      var t = JSON.stringify(o);
      if (t === "{}") return "";
      return t.replace(/","/g, ";").replace(/":"/g, ":").replace(/"/g, "").replace("{", "").replace("}", ";");
    },
    strStyleHandle: function(last, next, cls) {
      var idx = last.indexOf(next);
      if (idx !== -1) last = last.substring(0, idx) + ",." + cls + last.substring(idx);
      return last;
    },
  },
  ResetCss: function() {
    var gray = DefaultSetting.gray
      ? 'html{filter:grayscale(100%);-webkit-filter:grayscale(100%);}'
      : "";
    return (DefaultSetting.resetCss ||
      'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;box-sizing:border-box;vertical-align:baseline;background:transparent;}ol,ul{list-style:none;}blockquote,q{quotes:none;}:focus{outline:0;}ins{text-decoration:none;}del{text-decoration:line-through;}table{border-collapse:collapse;border-spacing:0;}*{-webkit-tap-highlight-color:rgba(0,0,0,0);}::-webkit-scrollbar{width:5px;height:5px;background-color:#F3F3F3;}::-webkit-scrollbar-track{width:5px;background-color:rgba(0,0,0,0);border-radius:2em;}::-webkit-scrollbar-thumb{background-color:rgba(61,63,63,.5);background-clip:padding-box;min-height:20px;border-radius:2em;}::-webkit-scrollbar-thumb:hover{background-color:rgba(61,63,63,1);}') + gray;
  },
  makeStyleTree: function(css) {
    var full = this.ResetCss() + css;
    if (full) this.cssParse.add("MainCss", full);
  },
  makeNextStyleTree: function(css, addr) {
    if (css) this.cssParse.add("NextCss-" + addr, css);
  },
  removeStyleEl: function(name) {
    if (!name) return;
    _core.remove('[data-modifycss="' + name + '"]');
    _core.remove('[data-style="' + name + '"]');
    _core.remove('[data-style="NextCss-' + name + '"]');
  },
};

export default CSSManager;

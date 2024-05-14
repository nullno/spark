/* Util tools*/
/**
 * [SparkUtil 工具包]
 * @type {Object}
 */
import { _typeof } from "./Common.js";

const inBrowser = typeof window !== "undefined";
const UA = inBrowser && window.navigator.userAgent.toLowerCase();

let SparkUtil = {
  /*screen*/
  screen: {
    width: function () {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      );
    },
    height: function () {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      );
    },
    scrollTop: function () {
      return document.documentElement.scrollTop || document.body.scrollTop;
    },
    scrollHeight: function () {
      return (
        document.documentElement.scrollHeight || document.body.scrollHeight
      );
    },
    resize: function (callback) {
      var resize = function () {
        callback({
          width: SparkUtil.screen.width(),
          height: SparkUtil.screen.height(),
        });
      };
      resize();
      window.addEventListener("resize", resize);
    },
  },
  /*包含字符串*/
  includes: function (str1, str2) {
    return str1.indexOf(str2) == -1 ? false : true;
  },
  /*去除空格*/
  trimAll: function (str) {
    return str.replace(/\s*/g, "");
  },
  /*去除两端空格*/
  trim: function (str) {
    if (!str) return "";
    return str.replace(/^\s*|\s*$/g, "");
  },
  /**
   * [debounce 防抖函数]
   * @AuthorHTL
   */
  debounce: function (fn, delay) {
    var timer = null;
    return function (e) {
      e.stopPropagation();
      var _this = this,
        args = arguments;
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(this, args);
      }, delay);
    };
  },
  /**
   * [throttle 节流函数]
   * @AuthorHTL
   */
  throttle: function (fn, delay) {
    var lastTime = 0;
    return function () {
      var nowTime = +new Date();
      if (nowTime - lastTime > delay) {
        fn.apply(this, arguments);
        lastTime = nowTime;
      }
    };
  },
  /**
   * [objectToQueryString 对象转换为查询字符串]
   * @AuthorHTL
   * @DateTime  2020-03-29T16:11:00+0800
   * @param     {[type]}                 obj  [description]
   * @return    {[type]}                 string[description]
   */
  objectToQueryString: function (obj) {
    var pairs = Object.entries(obj).map(
      ([key, value]) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(value)
    );
    return pairs.length > 0 ? "?" + pairs.join("&") : "";
  },
  /**
   * [getQueryParam 获取指定名称的 url 参数值]
   * @AuthorHTL
   * @DateTime  2020-03-29T16:11:00+0800
   * @param     {[type]}                 name  [description]
   * @param     {[type]}                 url   [description]
   * @return    {[type]}                 string[description]
   */
  getQueryParam: function (name, url) {
    var reg = new RegExp("(\\?|&)" + name + "=([^&#]*)");
    var result = reg.exec(url ? url : location.href);
    return result != null ? decodeURIComponent(result[2]) : null;
  },
  /**
   * [urlQuery 获取链接所有query参数]
   * @AuthorHTL
   * @DateTime  2020-03-29T16:11:00+0800
   * @param     {[type]}                 url  [description]
   * @return    {[type]}                 obj  [description]
   */
  urlQuery: function (urlString) {
    const url = new URL(urlString || location.href);
    if (!url.search && url.hash.indexOf("?") == -1) {
      return {};
    }
    var deParam = url.search
      ? /\?[^#]+/.exec(url.search)[0]
      : url.hash
      ? /\?[^#]+/.exec(url.hash)[0]
      : null;

    var params = new URLSearchParams(deParam.replace("?", ""));
    var queryParams = {};
    params.forEach((value, key) => {
      queryParams[key] = decodeURIComponent(value || "");
    });
    return queryParams;
  },
  /**
   * [deepCopyObj 对象深拷贝]
   * @AuthorHTL
   * @DateTime  2020-03-29T16:11:16+0800
   * @param     {[type]}                 obj [description]
   * @return    {[type]}                     [description]
   */
  deepCopyObj: function (obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          result[key] = this.deepCopyObj(obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  /**
   * [loadScript 动态加载js脚本]
   * @AuthorHTL
   * @DateTime  2020-03-29T16:11:29+0800
   * @param     {[type]}                 jsurl    [description]
   * @param     {Function}               callback [description]
   * @return    {[type]}                          [description]
   */
  loadScript: function (jsurl, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
      //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      //Others
      script.onload = function () {
        callback(script);
      };
    }
    script.src = jsurl;
    document.body.appendChild(script);
  },
  getFile: function (filepath, resolve, reject) {
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function () {
      if (XHR.readyState == 4 && XHR.status == 200) {
        resolve && resolve(XHR.responseText);
      } else {
        reject && reject();
      }
      //打印成功后返回的数据
    };
    XHR.load;
    XHR.open("get", filepath);
    XHR.responseType = "text";
    XHR.send();
  },
  /*arr unique*/
  unique: function (arr) {
    if (!Array.isArray(arr)) {
      console.log("type error!");
      return;
    }
    var res = [],
      obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        res.push(arr[i]);
        obj[arr[i]] = 1;
      } else {
        obj[arr[i]]++;
      }
    }
    return res;
  },
  /**
   * [devTool 开发调试工具]
   * @AuthorHTL
   * @DateTime  2020-03-29T16:11:46+0800
   * @return    {[type]}                 [description]
   */
  devTool: function (url) {
    this.loadScript(
      url || "https://cdn.bootcss.com/eruda/1.5.8/eruda.min.js",
      function () {
        console.info("eruda dev tool init ok");
        eruda.init();
      }
    );
  },
  /**
   * [BrowserMatch description]
   * @type {Object}
   *
   * @use    SparkUtil.env.isMobile
   */
  env: {
    inBrowser: inBrowser,
    UA: UA,
    isMobile:
      UA && /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
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
  /*获取图片宽高*/
  getImgInfo: function (url, callback) {
    var img = new Image();
    img.src = url;
    // 加载完成执行
    img.onload = function () {
      callback({ width: img.width, height: img.height });
    };
  },
  /*数组匹配移除*/
  compareRemove: function (datas, compare) {
    if (_typeof(datas, "Array") && compare) {
      for (var i = 0; i < datas.length; i++) {
        (function (index) {
          if (
            (compare["a"] ? datas[index][compare["a"]] : datas[index]) ==
            compare["b"]
          ) {
            datas.splice(index, 1);
            i--;
          }
        })(i);
      }
    }
  },
  /*遍历  datas <Array> || <Number>*/
  traverse: function (datas, callback) {
    if (_typeof(datas, "Array")) {
      var allLength = datas.length;
      var maxEveryLength = 40;
      var currentIndex = 0;
      if (allLength <= maxEveryLength) {
        for (var i = currentIndex; i < allLength; i++) {
          callback(datas[i], i, i == allLength - 1);
        }
      } else {
        // 多数据切片
        var ArrayHandle = function () {
          for (
            var i = currentIndex;
            i < currentIndex + maxEveryLength && i < allLength;
            i++
          ) {
            callback(datas[i], i, i == allLength - 1);
          }
          currentIndex = i;
          if (currentIndex < allLength) {
            ArrayHandle();
          }
        };
        ArrayHandle();
      }
    }
    if (_typeof(datas, "Object")) {
      for (var key in datas) {
        if (datas.hasOwnProperty(key)) {
          callback(key);
        }
      }
    }
    if (_typeof(datas, "Number")) {
      var allLength = datas;
      var maxEveryLength = 40;
      var currentIndex = 0;
      if (allLength <= maxEveryLength) {
        for (var i = currentIndex; i < allLength; i++) {
          callback(i, i == allLength - 1);
        }
      } else {
        // 数字切片
        var NumberHandle = function () {
          for (
            var i = currentIndex;
            i < currentIndex + maxEveryLength && i < allLength;
            i++
          ) {
            callback(i, i == allLength - 1);
          }
          currentIndex = i;
          if (currentIndex < allLength) {
            NumberHandle();
          }
        };
        NumberHandle();
      }
    }
  },
  /*数组中是否存在元素,并返回索引 精确查找
         compare:{a:原数组key,b:值}
        */
  isInArray: function (arr, compare) {
    for (var i = 0; i < arr.length; i++) {
      if ((compare["a"] ? arr[i][compare["a"]] : arr[i]) == compare["b"]) {
        return i;
      }
      if (i == arr.length - 1) {
        return -1;
      }
    }
  },
  /*数组中是否存在包含字符元素,并返回索引 模糊查找*/
  isInArrayIncludes: function (arr, compare) {
    for (var i = 0; i < arr.length; i++) {
      if (
        SparkUtil.includes(
          compare["a"] ? arr[i][compare["a"]] : arr[i],
          compare["b"]
        )
      ) {
        return i;
      }
      if (i == arr.length - 1) {
        return -1;
      }
    }
  },
};

export default SparkUtil;

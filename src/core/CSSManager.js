/*[cssParse  样式解析注入 STYLE web版]*/

import { _typeof, D } from "./Common.js";

import SparkUtil from "./SparkUtil.js";

import DefaultSetting from "./DefaultSetting.js";

const _core = {
  autoprefixerConfig: {
    param: {
      transition: ["-webkit-", "-moz-", "-ms-", "-o-"],
      transform: ["-webkit-", "-moz-", "-ms-", "-o-"],
      animation: ["-webkit-", "-moz-", "-ms-", "-o-"],
      "animation-name": ["-webkit-", "-moz-", "-ms-", "-o-"],
      "user-select": ["-webkit-", "-moz-", "-ms-", "-o-"],
      "border-radius": ["-webkit-", "-moz-", "-ms-"],
      "border-top-colors": ["-moz-"],
      "border-right-colors": ["-moz-"],
      "border-bottom-colors": ["-moz-"],
      "border-left-colors": ["-moz-"],
      "box-shadow": ["-webkit-", "-moz-"],
      "backface-visibility": ["-webkit-", "-moz-", "-ms-"],
      "flex-direction": ["-webkit-", "-moz-", "-ms-", "-o-"],
      flex: ["-prefix-box", "-webkit-box-", "-moz-box-", "-webkit-", "-ms-"],
      order: ["box-order", "-webkit-box-", "-moz-box-", "-webkit-"],
      "justify-content": ["-webkit-", "-moz-", "-ms-", "-o-"],
      "align-items": ["-webkit-", "-moz-", "-ms-", "-o-"],
      "flex-wrap": ["-webkit-", "-moz-", "-ms-", "-o-"],
      "flex-flow": ["-webkit-", "-moz-"],
      "background-size": ["-webkit-"],
      "box-sizing": ["-webkit-", "-moz-"],
    },
    value: {
      grid: ["-ms-grid"],
      flex: ["box", "-webkit-box", "-ms-flexbox", "-moz-box", "-webkit-flex"],
      "linear-gradient": [
        "-webkit-linear-gradient",
        "-moz-linear-gradient",
        "-ms-linear-gradient",
        "-o-linear-gradient",
      ],
      calc: ["-webkit-calc"],
    },
  },
  insert: function (Attribute, AttributeVal, cssStr) {
    var newStyle = D.createElement("style");
    newStyle.type = "text/css";
    newStyle.setAttribute(Attribute, AttributeVal);
    newStyle.innerText +=
      (/modifycss/.test(Attribute) ? "." + AttributeVal : "") + cssStr;
    D.head.insertBefore(newStyle, D.head.lastChild);
  },
  remove: function (dataTarget) {
    var delTarget = D.querySelector(dataTarget);
    if (delTarget) {
      D.head.removeChild(delTarget);
    }
  },
  getStyleEl(dataTarget) {
    var el = D.querySelector(dataTarget);
    return el;
  },
  autoprefixer: function (CssItem, tempObj) {
    var p = CssItem.split(":");
    var param = SparkUtil.trim(p[0]),
      value = SparkUtil.trim(p[1]);
    var cssParam = this.autoprefixerConfig.param[param];
    if (cssParam) {
      SparkUtil.traverse(cssParam, function (cssParamItem, index, end) {
        tempObj[cssParamItem + param] = value;
      });
    }
    /* xcss值兼容匹配
       var cssValue = this.autoprefixerConfig.value[value];
       var cssValue = '',cssValueKey='';
       for(var key in this.autoprefixerConfig.value){
        if(SparkUtil.includes(value,key)){
          cssValueKey = key;
          cssValue = this.autoprefixerConfig.value[key];
        }
       }
       if(cssValue){
          SparkUtil.traverse(cssValue,function(cssValueItem,index,end){
            tempObj[param] = cssValueItem;
             tempObj[param] = value.replace(new RegExp(cssValueKey,'ig'),cssValueItem);
          })
        }
       str.replace(new RegExp('transition','ig'),'-webkit-transition');
     */
  },
};

const CSSManager = {
  cssParse: {
    /*追加*/
    add: function (id, cssStr) {
      cssStr = cssStr && SparkUtil.trim(cssStr);
      _core.remove("[data-style='" + id + "']");
      _core.insert("data-style", id, cssStr);
    },
    /*修改*/
    modify: function (selector, cssStr) {
      setTimeout(function () {
        cssStr = SparkUtil.trim(cssStr);
        /*
        try {
        if (!/^\.|#/.test(selector)) {
          throw 'WARN: modify style selector must star" .|| #"}';
        }
        if (!/^\{.*\}$/.test(cssStr)) {
          throw 'WARN: modify style cssstr must star"{" end "}"}';
        }
        } catch (error) {
          console.warn(error);
        }
        */
        _core.remove('[data-modifycss="' + selector + '"]');
        _core.insert("data-modifycss", selector, cssStr);
        // var StyleEl = _core.getStyleEl('[data-modifycss="' + selector + '"]');
        // if (StyleEl) {
        //   StyleEl.innerText = "." + selector + cssStr;
        // } else {
        //   _core.insert("data-modifycss", selector, cssStr);
        // }
      });
    },
    /*样式字符串转对象*/
    strStyleToObj: function (str) {
      var tempObj = {};
      // typeof str !='string'
      if (!_typeof(str, "String")) {
        return tempObj;
      }

      var CssArr = SparkUtil.trim(str)
        .replace(new RegExp("http:", "ig"), "")
        .replace(new RegExp("https:", "ig"), "")
        .replace(new RegExp('"', "ig"), "")
        .replace(new RegExp("'", "ig"), "")
        .split(";");

      SparkUtil.traverse(CssArr, function (CssItem, index, end) {
        if (CssItem) {
          var tempCssItem = CssItem;
          var p = CssItem.split(":");
          tempObj[SparkUtil.trim(p[0])] = SparkUtil.trim(p[1]);
          _core.autoprefixer(tempCssItem, tempObj);
        }
      });

      return tempObj;
    },
    /*样式对象转字符串*/
    objStyleToStr: function (obj) {
      if (!_typeof(obj, "Object")) {
        return "";
      }
      var newObj = {};
      for (var key in obj) {
        newObj[key.replace(/([A-Z])/g, "-$1").toLowerCase()] = obj[key];
      }
      var t = JSON.stringify(newObj);
      if (t == "{}") {
        return "";
      }

      var CssStr = t
        .replace(new RegExp('\\","', "ig"), ";")
        .replace(new RegExp('\\":"', "ig"), ":")
        .replace(new RegExp('"', "ig"), "")
        .replace(new RegExp("{"), "")
        .replace(new RegExp("}"), ";");
      return CssStr;
    },
    /*样式合并处理*/
    strStyleHandle: function (laststr, nextstr, className) {
      var _insertIndex = laststr.indexOf(nextstr);
      if (_insertIndex != -1) {
        laststr =
          laststr.substring(0, _insertIndex) +
          ",." +
          className +
          laststr.substring(_insertIndex, laststr.length);
      }

      return laststr;
    },
  },
  /*
   * [ResetCss 重置css]
   * @AuthorHTL
   * @DateTime  2020-04-02T22:18:59+0800
   */
  ResetCss: function (cssStr) {
    var grayStr =
      DefaultSetting.gray == true
        ? 'html{ filter: grayscale(100%); -webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%); filter: url("data:image/svg+xml;utf8,#grayscale"); filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); -webkit-filter: grayscale(1);}'
        : "";

    return (
      DefaultSetting.resetCss ||
      'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;box-sizing:border-box;vertical-align:baseline;background:transparent;}ol,ul{list-style:none;}blockquote,q{quotes:none;}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none;}:focus{outline:0;}ins{text-decoration:none;}del{text-decoration:line-through;}table{border-collapse:collapse;border-spacing:0;}*{-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}::-webkit-scrollbar{width:5px;height:5px;position:fixed;background-color:#F3F3F3;}::-webkit-scrollbar-track{width:5px;background-color:rgba(0,0,0,0);-webkit-border-radius:2em;-moz-border-radius:2em;border-radius:2em}::-webkit-scrollbar-thumb{background-color:rgba(61,63,63,.5);background-clip:padding-box;min-height:20px;-webkit-border-radius:2em;-moz-border-radius:2em;border-radius:2em}::-webkit-scrollbar-thumb:hover{background-color:rgba(61,63,63,1)}' +
        grayStr
    );
  },
  /* 初始化 style  */
  makeStyleTree: function (_cssStr) {
    var cssStr = this.ResetCss() + _cssStr;
    cssStr && this.cssParse.add("MainCss", cssStr);
  },
  /* 新增dom style  */
  makeNextStyleTree: function (_cssStr, address) {
    _cssStr && this.cssParse.add("NextCss-" + address, _cssStr);
  },
  /*
   * [removeStyleEl 移除样式]
   * @AuthorHTL
   * @DateTime  2024-04-22
   */
  removeStyleEl(name) {
    if (!name) return;
    _core.remove('[data-modifycss="' + name + '"]');
    _core.remove('[data-style="' + name + '"]');
    _core.remove('[data-style="NextCss-' + name + '"]');
  },
};

export default CSSManager;

/**
 * [WidgetWatchParams 监听属性管理]
 * @type {Object}
 */
import { D } from "./common.js";

import SparkUtil from "./SparkUtil.js";

import CSSManager from "./CSSManager.js";

import GetAddressData from "./GetAddressData.js";

export default {
  vif: function (oval, nval, obj) {
    if (obj._defining) return nval;
    if (oval === nval) return nval;

    if (!nval) {
      obj.remove();
    } else {
      if (obj.type != "Page") {
        var W = GetAddressData(obj.$record.parentName),
          PW = GetAddressData(obj.$record.prevName),
          NW = GetAddressData(obj.$record.nextName);

        if (PW) {
          PW.after(obj);
        } else if (NW) {
          NW.before(obj);
        } else if (W && W.child == 0) {
          W.append(obj);
        }
      }
    }

    return nval;
  },
  show: function (oval, nval, obj) {
    if (obj._defining) {
      if (!nval) {
        var origInit = obj.$_init;
        obj.$_init = function () {
          origInit && origInit.call(obj);
          if (obj.$el) obj.$el.style.display = "none";
        };
      }
      return nval;
    }
    var tempOld = oval;
    if (oval === nval) return nval;

    /*数据改变*/
    var aniSet = obj.hideAni;
    if (!obj.$el) {
      // Queue the show change for after render
      var origInit = obj.$_init;
      obj.$_init = function () {
        origInit && origInit.call(obj);
        if (!nval && obj.$el) {
          obj.$el.style.display = "none";
        }
      };
      return nval;
    }
    if (!nval && aniSet && aniSet.ani) {
      obj.style = "animation:" + aniSet.ani;
      var removeTimer = setTimeout(function () {
        clearTimeout(removeTimer);
        obj.style = "animation:unset;";
        if (obj.$el) obj.$el.style.display = "none";
      }, aniSet.time);
    } else if (nval && obj.showAni) {
      obj.style = "animation:" + obj.showAni.ani + ";";
      if (obj.$el) obj.$el.style.display = "";
    } else if (nval) {
      if (obj.$el) obj.$el.style.display = "";
    } else if (!nval) {
      if (obj.$el) obj.$el.style.display = "none";
    }
    /*变化监听*/
    if (!obj._defining) {
      obj.watch &&
        obj.watch["show"] &&
        obj.watch["show"].call(obj, tempOld, nval);
    }
    return nval;
  },
  style: function (oval, nval, obj) {
    var tempOld = oval;
    if (typeof nval === "string") {
      nval = SparkUtil.trim(nval);
      if (oval == nval) return nval;
      var tempNewVal = nval;
      try {
        var oldObj = typeof tempOld === "string"
          ? CSSManager.cssParse.strStyleToObj(tempOld)
          : {};
        var newStyleObj = Object.assign(
          oldObj,
          CSSManager.cssParse.strStyleToObj(tempNewVal)
        );

        obj.styleObj = newStyleObj;

        nval = CSSManager.cssParse.objStyleToStr(newStyleObj);

        CSSManager.cssParse.modify(obj.name, "{" + nval + "}");

        return nval;
      } catch (err) {
        console.error("Spark: style error on " + obj.name);
        return nval;
      }
    } else {
      return nval;
    }
  },
  className: function (oval, nval, obj) {
    if (obj._defining) return nval;
    var tempOld = oval;
    if (typeof nval === "string") {
      if (oval === nval) return nval;

      /*类名改变*/
      var nodeList = D.getElementsByClassName(obj.name);
      SparkUtil.traverse(nodeList.length, function (i, end) {
        nodeList[i].className = obj.className
          ? nodeList[i].className.replace(tempOld, nval)
          : nodeList[i].className + " " + nval;
      });
      /*变化监听*/
      if (!obj._defining) {
        obj.watch &&
          obj.watch["className"] &&
          obj.watch["className"].call(obj, tempOld, nval);
      }
    }
    return nval;
  },
  text: function (oval, nval, obj) {
    if (obj._defining) return nval;
    var tempOld = oval;
    if (oval === nval) return nval;

    /*数据改变*/
    var nodeList = D.getElementsByClassName(obj.name);
    SparkUtil.traverse(nodeList.length, function (i, end) {
      nodeList[i].innerText = nval;
    });

    /*变化监听*/
    if (!obj._defining) {
      obj.watch &&
        obj.watch["text"] &&
        obj.watch["text"].call(obj, tempOld, nval);
    }
    return nval;
  },
  child: function (oval, nval, obj) {
    if (obj._defining) return nval;
    if (JSON.stringify(oval) === JSON.stringify(nval)) return nval;
    /*变化监听*/
    obj.watch && obj.watch["child"] && obj.watch["child"].call(obj, oval, nval);

    return nval;
  },
  value: function (oval, nval, obj) {
    var tempOld = oval;

    if (obj.type === "Input") {
      obj.placeholderEnable = nval == "";
      if (obj.isFocus) {
        obj.placeholderEnable = false;
      }
      if (!obj.writing && !obj._defining) {
        var nodeList = D.getElementsByClassName(obj.name);
        SparkUtil.traverse(nodeList.length, function (i, end) {
          nodeList[i].innerText = obj.placeholderEnable
            ? obj.placeholder
            : nval;
        });
      }
    }

    /*变化监听 - skip during defineProperty initialization*/
    if (!obj._defining) {
      obj.watch &&
        obj.watch["value"] &&
        obj.watch["value"].call(obj, tempOld, nval);
    }

    return nval;
  },
  enable: function (oval, nval, obj) {
    if (obj._defining) return nval;
    var tempOld = oval;
    if (oval === nval) return nval;

    if (obj.$el) {
      obj.$el.setAttribute("contenteditable", nval);
      obj.style = nval ? "cursor:auto;" : "cursor:not-allowed;";
    }

    return nval;
  },
};

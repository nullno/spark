/**
 * [WidgetOperate 组件操作]
 * @AuthorHTL
 * @DateTime  2020-08-21T12:14:58+0800
 */
import { _typeof } from "./Common.js";

import SparkUtil from "./SparkUtil.js";

import GetAddressData from "./GetAddressData.js";

import CreateDomTree from "./CreateDomTree.js";

import CSSManager from "./CSSManager.js";

import Cache from "./Cache.js";

const WidgetOperate = {};
/**
 * [clearWidget 删除清空组件]
 * @AuthorHTL
 * @DateTime  2020-09-18T17:01:28+0800
 * @return    {[type]}                 [description]
 */
WidgetOperate.clearWidget = function (_Widget) {
  _Widget.rendered = false;
  _Widget.deactivated && _Widget.deactivated();
  var _scope = this;
  if (_Widget.name.indexOf("Page") > -1) {
    return;
  }
  if (
    !_typeof(_Widget.$el, "HTMLCollection") ||
    (_typeof(_Widget.$el, "HTMLCollection") && _Widget.$el.length === 0)
  ) {
    CSSManager.removeStyleEl(_Widget.name);
    delete Cache.WidgetCache[_Widget.name];
  }
  if (_Widget.child.length > 0) {
    SparkUtil.traverse(_Widget.child, function (item, index, end) {
      _scope.clearWidget(GetAddressData(item));
    });
  }
};

/**
 * [updateListIndex 更新列表索引]
 * @AuthorHTL
 * @DateTime  2020-09-16T00:37:43+0800
 * @return    {[type]}                 [description]
 */
WidgetOperate.updateListIndex = function (_ListWidget) {
  var _scope = this;

  var _core = function (_widget, realIndex) {
    SparkUtil.traverse(_widget.child, function (item, index, end) {
      var _thisWidget = GetAddressData(item);
      if (_thisWidget.type == "Text" && _thisWidget.listIndex) {
        _thisWidget.text = realIndex;
      }
      if (_thisWidget.child.length > 0) {
        _core(_thisWidget, realIndex);
      }
    });
  };

  SparkUtil.traverse(_ListWidget.child, function (item, index, end) {
    var _thisWidget = GetAddressData(item);
    if (_thisWidget) {
      _thisWidget.listIndex = index;
      _thisWidget.init && _thisWidget.init();
      _core(_thisWidget, index);
    }
  });
};
/**
 * [addDom 添加节点]
 * @AuthorHTL
 * @DateTime  2020-08-27T15:29:35+0800
 * @param     {[type]}                 target  [description]
 * @param     {[type]}                 newdoms [description]
 * @param     {[type]}                 addtype [description]
 */
WidgetOperate.addDom = function (target, newdoms, addtype, set) {
  var _scope = this;
  // console.log('-----'+addtype+'-----')
  var abTarget = target;
  if (addtype == "after" || addtype == "before") {
    if (_typeof(target.parentName, "String")) {
      target = GetAddressData(target.parentName);
    } else {
      return target;
    }
  }

  if (!target.child || !newdoms) {
    return target;
  }
  var nodeArr = [];

  var tempChild = target.child.slice(0);

  //多个
  if (_typeof(newdoms, "Array")) {
    nodeArr = nodeArr.concat(newdoms);
  }
  //单个
  if (_typeof(newdoms, "Object")) {
    nodeArr.push(newdoms);
  }
  SparkUtil.traverse(nodeArr, function (item, index, end) {
    if (!GetAddressData(item.name)) {
      //remove 后可以复用
      _scope.WidgetCache[item.name] = item;
    }
    // var aniSet = set || item.showAni;
    // if (aniSet && aniSet.ani) {
    //   item.style = "animation:" + aniSet.ani + ";";
    // }

    if (addtype == "append") {
      tempChild.push(item.name);
    }
    if (addtype == "prepend") {
      tempChild.unshift(item.name);
    }
    if (addtype == "after") {
      var tIndex = SparkUtil.isInArray(tempChild, { b: abTarget.name });
      tempChild.splice(tIndex + 1, 0, item.name);
    }
    if (addtype == "before") {
      var tIndex = SparkUtil.isInArray(tempChild, { b: abTarget.name });
      tempChild.splice(tIndex, 0, item.name);
    }

    CreateDomTree(
      item.name,
      addtype == "after" || addtype == "before" ? abTarget : target,
      false,
      addtype
    );

    if (end) {
      // _scope.createDomTree(target.name,target.$el,false)
      target.child = tempChild;
    }
    // console.log(end,index,item)
  });

  nodeArr = tempChild = null;
  return target;
};

/**
 * [remove 移除节点]
 * @AuthorHTL
 * @DateTime  2020-09-16T00:38:07+0800
 * @param     {[type]}                 target [description]
 * @param     {[type]}                 deleteDom [description]
 * @return    {[type]}                        [description]
 */
WidgetOperate.remove = function (target, deleteDom) {
  var _scope = this;
  //三种删除方式
  // console.log('-----remove-----')
  if (!target) return;
  if (!target.child || deleteDom == "[object Undefined]") {
    return target;
  }
  //非目标子集

  var tempChild = target.child.slice(0),
    belongIndex = SparkUtil.isInArray(target.child, { b: deleteDom.name });

  if (_typeof(deleteDom, "Object") && belongIndex != -1) {
    SparkUtil.compareRemove(tempChild, { b: deleteDom.name });
    /*
    var delParentName = function () {
      SparkUtil.compareRemove(deleteDom.parentName, { b: target.name });
      // if(deleteDom.parentName.length==0){
      //   delete deleteDom.parentName;
      //   delete deleteDom.$el;
      // }
    };
    */
    var delFn = function (targetEl) {
      /*List Data 处理*/
      if (target.type === "List") {
        target.data.splice(belongIndex, 1);
      }
      if (_typeof(deleteDom.$el, "HTMLCollection")) {
        for (var i = deleteDom.$el.length - 1; i >= 0; --i) {
          if (deleteDom.$el[i].parentNode == targetEl) {
            targetEl.removeChild(deleteDom.$el[i]);
          }
        }
        SparkUtil.compareRemove(deleteDom.parentName, { b: target.name });
      } else if (deleteDom.$el) {
        targetEl.removeChild(deleteDom.$el);

        // delete deleteDom.parentName;
        // delete deleteDom.$el;
      }
    };

    if (_typeof(target.$el, "HTMLCollection")) {
      SparkUtil.traverse(target.$el.length, function (index, end) {
        delFn(target.$el[index]);
      });
    } else {
      delFn(target.$el);
    }

    _scope.clearWidget(deleteDom);

    target.child = tempChild;
  }

  if (_typeof(deleteDom, "String")) {
    if (deleteDom == "firstChild" || deleteDom == "lastChild") {
      _scope.remove(
        target,
        deleteDom == "firstChild" ? 0 : tempChild.length - 1
      );
    } else {
      console.warn("second<string>:firstChild || lastChild");
    }
  }

  if (_typeof(deleteDom, "Number")) {
    if (_typeof(target.$el, "HTMLCollection")) {
      SparkUtil.traverse(target.$el.length, function (index, end) {
        target.$el[index].childNodes[deleteDom] &&
          target.$el[index].removeChild(
            target.$el[index].childNodes[deleteDom]
          );
      });
    } else {
      target.$el.childNodes[deleteDom] &&
        target.$el.removeChild(target.$el.childNodes[deleteDom]);
    }

    var tempWidget = GetAddressData(tempChild[deleteDom]);
    _scope.clearWidget(tempWidget);

    // if(!_typeof(tempWidget.$el,'HTMLCollection')){
    //     delete tempWidget.parentName;
    //     delete tempWidget.$el;
    // }

    tempChild.splice(deleteDom, 1);

    target.child = tempChild;
  }

  //如果是列表变化更新索引
  if (target.type === "List") {
    var timer = setTimeout(function () {
      clearTimeout(timer);
      _scope.updateListIndex(target);
    }, 100);
  }
  tempChild = null;

  return target;
};

export default WidgetOperate;

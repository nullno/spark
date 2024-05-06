/**
 * [createDomTree description]
 * @AuthorHTL
 * @DateTime  2020-08-21T13:50:05+0800
 * @param     {[type]}                 _rootAddress [description]
 * @param     {[type]}                 domTarget   [description]
 * @param     {[type]}                 DF          [DocumentFragment]
 * @param     {Function}               callback    [description]
 * @return    {[type]}                             [description]
 */
import { _typeof, D } from "./Common.js";

import SparkUtil from "./SparkUtil.js";

import GetAddressData from "./GetAddressData.js";

import AddWidgetEvent from "./AddWidgetEvent.js";

import DefaultSetting from "./DefaultSetting.js";

import CSSManager from "./CSSManager.js";

import WidgetOperate from "./WidgetOperate.js";
import Cache from "./Cache.js";

export default function (_rootAddress, domTarget, init, addType, callback) {
  var _core = {
    // df: document.createDocumentFragment(),
    _html: null,
    _css: "",
    _eventQueue: [], //leave
    _rootAddress: _rootAddress,
    _lastAddress: null,
    _clear: function () {
      this._eventQueue = [];
      this._html = null;
    },
    /*render them*/
    render: function () {
      var _this = this;
      var domData = GetAddressData(_this._rootAddress);
      if (!domData.$el || !domData.keepalive) {
        _this.readAddress(domData);
      }

      //初始化渲染body
      if (domData.type === "Page" && init) {
        /*insert html*/
        var AC = D.getElementById("spark-" + DefaultSetting.name);
        var hasPage = D.getElementsByClassName(domData.name).length <= 1;
        domData.parentName = "spark-" + DefaultSetting.name;

        if (domData.$el && domData.keepalive) {
          AC.appendChild(domData.$el);
          _this.renderCompleteKeepAlive.call(_this, _this._rootAddress);

          callback && setTimeout(() => callback(), 10);
          return;
        }
        if (!AC) {
          _this.pushCommonCss();
          /*insert css*/
          CSSManager.makeStyleTree(_this._css);
          var tempDom = D.createElement("div");
          tempDom.setAttribute("id", "spark-" + DefaultSetting.name);
          tempDom.innerHTML = this._html;
          domTarget.insertBefore(tempDom, domTarget.firstChild);
          tempDom = null;
          domData["$record"] = {
            parentName: domData.parentName,
            blongIndex: 0,
          };
        } else if (hasPage) {
          CSSManager.makeNextStyleTree(_this._css, _this._rootAddress);
          var tempDom = D.createElement("div");
          tempDom.innerHTML = this._html;
          AC.appendChild(tempDom.firstChild);
          tempDom = null;
          domData["$record"] = {
            parentName: domData.parentName,
            blongIndex: AC.childNodes.length - 1,
          };
        } else {
          return;
        }

        /*default bind event && el && init*/
        var tempTimer = setTimeout(function () {
          clearTimeout(tempTimer);
          _this.initPushEvent.call(_this, true);
          _this.renderComplete.call(_this, _this._rootAddress);
          _this._clear();

          callback && setTimeout(() => callback(), 10);
        });
      } else {
        //后期渲染部分节点

        // 如果已渲染过节点
        if (domData.$el && domData.keepalive) {
          // console.log('had $el')
          if (addType == "after" || addType == "before") {
            var abTarget = domTarget;
            if (_typeof(domTarget.parentName, "String")) {
              domTarget = GetAddressData(domTarget.parentName);
            } else {
              console.warn("insert failed!");
              return;
            }
            _this.after_before(
              domTarget.$el,
              abTarget.$el,
              domData.$el,
              addType,
              true
            );
          }

          if (addType == "append" || addType == "prepend") {
            _this.append_prepend(domTarget.$el, domData.$el, addType, true);
          }

          _this.renderCompleteKeepAlive.call(_this, _this._rootAddress);

          callback && setTimeout(() => callback(), 10);
          return;
        }

        //新增节点
        /*append css moveto pushcss()*/
        CSSManager.makeNextStyleTree(_this._css, _this._rootAddress);

        /*append html*/
        var tempDom = document.createElement("div");
        tempDom.innerHTML = _this._html;

        if (addType == "after" || addType == "before") {
          var abTarget = domTarget;

          if (_typeof(domTarget.parentName, "String")) {
            domTarget = GetAddressData(domTarget.parentName);
          } else {
            console.warn("insert failed!");
            return;
          }

          _this.after_before(
            domTarget.$el,
            abTarget.$el,
            tempDom,
            addType,
            false
          );
        }

        if (addType == "append" || addType == "prepend") {
          _this.append_prepend(domTarget.$el, tempDom, addType, false);
        }

        /*append bind event*/
        var tempTimer = setTimeout(function () {
          clearTimeout(tempTimer);
          _this.initPushEvent.call(_this); //子节点事件
          _this.renderComplete.call(_this, _this._rootAddress);
          //如果是列表更新索引
          if (domTarget.type === "List") {
            WidgetOperate.updateListIndex(domTarget);
          }

          _this._clear();
        });
      }
    },
    /*add dom way 1 */
    append_prepend: function (el, newel, type, handel) {
      var _this = this;
      if (_typeof(el, "HTMLCollection")) {
        SparkUtil.traverse(el.length, function (index, end) {
          if (!handel) {
            var tempDom = document.createElement("div");
            tempDom.innerHTML = _this._html;
            if (type == "append") {
              el[index].appendChild(tempDom.firstChild);
              AddWidgetEvent(el[index].lastChild, _this._rootAddress);
            }
            if (type == "prepend") {
              el[index].insertBefore(tempDom.firstChild, el[index].firstChild);
              AddWidgetEvent(el[index].firstChild, _this._rootAddress);
            }
          } else {
            if (type == "append") {
              el[index].appendChild(newel);
            }
            if (type == "prepend") {
              el[index].insertBefore(newel, el[index].firstChild);
            }
          }
        });
      } else {
        if (!handel) {
          if (type == "append") {
            el.appendChild(newel.firstChild);
            AddWidgetEvent(el.lastChild, _this._rootAddress);
          }
          if (type == "prepend") {
            el.insertBefore(newel.firstChild, el.firstChild);
            AddWidgetEvent(el.firstChild, _this._rootAddress);
          }
        } else {
          if (type == "append") {
            el.appendChild(newel);
          }
          if (type == "prepend") {
            el.insertBefore(newel, el.firstChild);
          }
        }
      }
    },
    /*add dom way 2 */
    after_before: function (el, abTarget, newel, type, handel) {
      var _this = this;
      if (_typeof(el, "HTMLCollection")) {
        SparkUtil.traverse(el.length, function (index, end) {
          var parentNode = abTarget[index].parentNode;
          if (!handel) {
            var tempDom = document.createElement("div");
            tempDom.innerHTML = _this._html;

            if (type == "after") {
              if (parentNode.lastChild == abTarget[index]) {
                parentNode.appendChild(tempDom.firstChild);
              } else {
                parentNode.insertBefore(
                  tempDom.firstChild,
                  abTarget[index].nextElementSibling
                );
              }
              AddWidgetEvent(
                abTarget[index].nextElementSibling,
                _this._rootAddress
              );
            }
            if (type == "before") {
              parentNode.insertBefore(tempDom.firstChild, abTarget[index]);
              AddWidgetEvent(
                abTarget[index].previousElementSibling,
                _this._rootAddress
              );
            }
          } else {
            if (type == "after") {
              if (parentNode.lastChild == abTarget[index]) {
                parentNode.appendChild(newel);
              } else {
                parentNode.insertBefore(
                  newel,
                  abTarget[index].nextElementSibling
                );
              }
            }
            if (type == "before") {
              parentNode.insertBefore(newel, abTarget[index]);
            }
          }
        });
      } else {
        var parentNode = abTarget.parentNode;
        if (!handel) {
          if (type == "after") {
            if (parentNode.lastChild == abTarget) {
              parentNode.appendChild(newel.firstChild);
            } else {
              parentNode.insertBefore(
                newel.firstChild,
                abTarget.nextElementSibling
              );
            }
            AddWidgetEvent(abTarget.nextElementSibling, _this._rootAddress);
          }

          if (type == "before") {
            parentNode.insertBefore(newel.firstChild, abTarget);
            AddWidgetEvent(abTarget.previousElementSibling, _this._rootAddress);
          }
        } else {
          if (type == "after") {
            if (parentNode.lastChild == abTarget) {
              parentNode.appendChild(newel);
            } else {
              parentNode.insertBefore(newel, abTarget.nextElementSibling);
            }
          }
          if (type == "before") {
            parentNode.insertBefore(newel, abTarget);
          }
        }
      }
    },
    renderCompleteKeepAlive(address) {
      var _this = this;
      var node = GetAddressData(address);
      node.rendered = true;
      node.activated && node.activated();
      if (node.child && node.child.length > 0) {
        SparkUtil.traverse(node.child, function (nodeItem, index, end) {
          _this.renderCompleteKeepAlive(nodeItem);
        });
      }
    },
    /*add render complete function*/
    renderComplete: function (address) {
      var _this = this;
      var node = GetAddressData(address);
      var nodeList = D.getElementsByClassName(address);

      node.$el = nodeList.length > 1 ? nodeList : nodeList[0];

      // set hide
      if (node.show != undefined && !node.show) {
        node.style = "display:none;";
      }
      // if(!node.vif){
      //     node.remove();
      // }

      if (!init && node.parentName) {
        if (typeof node.parentName === "object") {
          node.parentName.push(domTarget.name);
        }
        if (typeof node.parentName === "string") {
          var tempParentName = node.parentName;
          node.parentName = [];
          node.parentName = node.parentName.concat([
            tempParentName,
            domTarget.name,
          ]);
        }

        node.parentName = SparkUtil.unique(node.parentName);
      } else if (!init && !node.parentName) {
        node.parentName = domTarget.name;
      }

      //drag type
      if (node.type === "Drag") {
        node.position = {
          x: node.$el.offsetLeft,
          y: node.$el.offsetTop,
          startX: 0,
          startY: 0,
          direction: null,
        };
      }

      //default fn
      node.width = function (val) {
        if (val) {
          node.style = "width:" + val + ";";
        } else {
          //return parseInt(node.styleObj['width'] || node.$el.offsetWidth)
          return node.$el.offsetWidth;
        }
      };
      node.height = function (val) {
        if (val) {
          node.style = "height:" + val + ";";
        } else {
          // return parseInt(node.styleObj['height'] || node.$el.offsetHeight)
          return node.$el.offsetHeight;
        }
      };
      node.getChild = function (index) {
        if (node.child && node.child.length <= 0) return;
        if (_typeof(index, "Number")) {
          return GetAddressData(node.child[index]);
        } else {
          var child = [];
          SparkUtil.traverse(node.child, function (e, index, end) {
            child.push(GetAddressData(e));
          });
          return child;
        }
      };

      node.rendered = true;

      node.$_init && node.$_init();
      node.init && node.init();
      node.created && node.created();
      node.activated && node.activated();

      /*  if(node.watch){
                      SparkUtil.traverse(node.watch,function(key){
                          node.watch[key].call(node,'',node.key);
                      })
                  }   */

      if (node.child && node.child.length > 0) {
        SparkUtil.traverse(node.child, function (nodeItem, index, end) {
          _this.renderComplete(nodeItem);
        });
      }
    },
    /*dom tree*/
    pushHtml: function (parent, child, nowaddress) {
      var _this = this;
      _this._html = !_this._html
        ? _this.RegExp(parent, child, nowaddress)
        : _this.RegExp(_this._html, child, _this._lastAddress);
    },
    pushCommonCss: function () {
      var cssStr = "";
      for (var key in Cache.CSSCache) {
        cssStr += "." + key + "{" + Cache.CSSCache[key].style + "}";
      }
      this._css += cssStr;
    },
    /*css tree*/
    pushCss: function (_node) {
      var _this = this;
      var pointer = "cursor:pointer;";
      var className = _typeof(_node.style, "Object")
          ? _node.style["name"]
          : _node.name,
        cssStr = _typeof(_node.style, "Object")
          ? _node.style["style"]
          : _node.style,
        hclassName = _typeof(_node.shover, "Object")
          ? _node.shover["name"]
          : _node.name,
        hcssStr = _typeof(_node.shover, "Object")
          ? _node.shover["style"]
          : _node.shover;

      /*去重处理*/
      cssStr =
        "{" +
        (_node.on ? pointer : "") +
        CSSManager.cssParse.objStyleToStr(
          CSSManager.cssParse.strStyleToObj(cssStr)
        ) +
        "}";

      if (hcssStr) {
        hcssStr =
          "{" +
          pointer +
          CSSManager.cssParse.objStyleToStr(
            CSSManager.cssParse.strStyleToObj(hcssStr)
          ) +
          "}";
      }

      var c =
        cssStr != "{}"
          ? !SparkUtil.includes(_this._css, className)
            ? "." + className + cssStr
            : ""
          : "";
      var h =
        _node.shover &&
        !SparkUtil.includes(_this._css, "." + hclassName + ":hover")
          ? "." + hclassName + ":hover" + hcssStr
          : "";

      if (
        SparkUtil.includes(_this._css, cssStr) ||
        SparkUtil.includes(_this._css, hcssStr)
      ) {
        if (
          SparkUtil.includes(_this._css, cssStr) &&
          !SparkUtil.includes(_this._css, className)
        ) {
          _this._css = CSSManager.cssParse.strStyleHandle(
            _this._css,
            cssStr,
            className
          );
        }
        if (SparkUtil.includes(_this._css, hcssStr)) {
          _this._css = CSSManager.cssParse.strStyleHandle(
            _this._css,
            hcssStr,
            hclassName + ":hover"
          );
        }
      } else {
        _this._css += SparkUtil.trim(c + h);
      }
    },
    /*default add event*/
    initPushEvent: function (noIgnoreRootAdress) {
      var _this = this;
      /*去重*/
      // _this._eventQueue = new Array(...new Set(_this._eventQueue))

      _this._eventQueue = SparkUtil.unique(_this._eventQueue);

      SparkUtil.traverse(_this._eventQueue, function (nodeName, index, end) {
        if (_this._rootAddress != nodeName || noIgnoreRootAdress) {
          var nodeList = document.getElementsByClassName(nodeName);
          SparkUtil.traverse(nodeList.length, function (index, end) {
            AddWidgetEvent(nodeList[index], nodeName);
          });
        }
      });
    },
    RegExp: function (parent, child, address) {
      return parent.replace(new RegExp("\\[\\[" + address + "\\]\\]"), child);
    },
    handelQueue: function (queue) {
      var _this = this;
      queue.forEach(function (address) {
        _this._lastAddress = address;
        _this.readAddress(GetAddressData(address));
      });
    },
    readAddress: function (_node) {
      var _this = this;
      var tempParentHtml = _node.html,
        tempChildHtml = "",
        queue = [],
        i = 0;

      if (!_node.child || _node.child.length == 0) {
        _this.pushHtml(tempParentHtml, tempChildHtml, _node.name);
      }
      _this.pushCss(_node);

      if (_node.on && _typeof(_node.on, "Object")) {
        _this._eventQueue.push(_node.name);
      }

      while (_node.child && _node.child[i]) {
        var nw = GetAddressData(_node.child[i]);
        nw.child && queue.push(nw.name);
        tempChildHtml += nw.html;
        _this.pushCss(nw);

        if (nw.on && _typeof(nw.on, "Object")) {
          _this._eventQueue.push(nw.name);
        }

        if (i === _node.child.length - 1) {
          _this.pushHtml(tempParentHtml, tempChildHtml, _node.name);
          queue.length > 0 ? _this.handelQueue(queue) : null;
        }

        i++;
      }
    },
  };

  try {
    _core.render();
  } catch (e) {
    console.error(e);
  }
}

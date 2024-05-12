/**
 * 模态框
 */
import { _typeof } from "../Common.js";
import WidgetManager from "../WidgetManager.js";
import CSSManager from "../CSSManager.js";

export default function (p) {
  var option = {
    bgColor: "rgba(0,0,0,0.5)", //
    bgClose: false,
    bgShow: false,
    drag: false,
    stopProp: true,
    positionMargin: "3%",
    autoClose: false,
    position: "center",
  };
  p = Object.assign(option, p);
  p.show = false;

  var Modal = {
    wrap: null,
    inner: null,
    set: function (m) {
      var _this = this;

      var positionMargin = m.positionMargin;
      switch (m.position) {
        case "topcenter":
          m.style =
            "top:" +
            positionMargin +
            ";left:50%;margin-left:-" +
            m.width() / 2 +
            "px;margin-top:unset;bottom:unset;";
          break;
        case "topleft":
          m.style =
            "top:" +
            positionMargin +
            ";left:" +
            positionMargin +
            ";margin-top:unset;margin-left:unset;bottom:unset;";
          break;
        case "topright":
          m.style =
            "top:" +
            positionMargin +
            ";right:" +
            positionMargin +
            ";margin-top:unset;margin-left:unset;bottom:unset;";
          break;
        case "bottomcenter":
          m.style =
            "bottom:" +
            positionMargin +
            ";left:50%;margin-left:-" +
            m.width() / 2 +
            "px;margin-top:unset;top:unset;";
          break;
        case "bottomleft":
          m.style =
            "bottom:" +
            positionMargin +
            ";left:" +
            positionMargin +
            ";margin-top:unset;margin-left:unset;top:unset;";
          break;
        case "bottomright":
          m.style =
            "bottom:" +
            positionMargin +
            ";right:" +
            positionMargin +
            ";margin-top:unset;margin-left:unset;top:unset;";
          break;
        default:
          m.style =
            "top:50%;left:50%;margin-left:-" +
            m.width() / 2 +
            "px;margin-top:-" +
            m.height() / 2 +
            "px;bottom:unset;right:unset;";
          break;
      }
      _this.autoClose(m);
    },
    autoCloseTimer: null,
    autoClose: function (m) {
      if (_typeof(m.autoClose, "Number")) {
        var speed = m.autoClose < 1000 ? 1000 : m.autoClose;
        this.autoCloseTimer = setTimeout(function () {
          clearTimeout(Modal.autoCloseTimer);
          m.close();
        }, speed);
      }
    },
    con: function () {
      var o = Object.assign({}, p);
      delete o.child;
      delete o.hideAni;
      delete o.showAni;
      delete o.show;
      delete o.style;
      delete o.on;
      Object.assign(Modal.wrap, o);
    },
  };

  if (!p.bgShow) {
    p.on = p.bgClose
      ? {
          click: function () {
            this.close();
          },
        }
      : null;
    p.close = function () {
      Modal.inner.show = false;
      clearTimeout(Modal.autoCloseTimer);
    };
    p.open = function () {
      if (Modal.inner.show) return;
      Modal.inner.show = true;
      Modal.set(Modal.inner);
    };
  }
  if (_typeof(p.style, "Object")) {
    p.style = CSSManager.cssParse.objStyleToStr(p.style);
  }

  p.style = p.style
    ? p.style + "position:fixed;z-index:9999;cursor:auto;"
    : "width:50px;height:50px;position:fixed;z-index:9999;background-color:#3D3F3F;cursor:auto;";

  Modal.inner = WidgetManager.Fixed(p);

  Modal.wrap = p.bgShow
    ? WidgetManager.Fixed({
        style:
          "top:0;left:0;right:0;width:100%;height:100%;background-color:" +
          p.bgColor +
          ";z-index:9999;overflow:hidden;cursor:auto;",
        child: [Modal.inner],
        show: false,
        on: p.bgClose
          ? {
              click: function () {
                this.close();
              },
            }
          : null,
        close: function () {
          Modal.inner.show = false;
          if (Modal.inner.hideAni && Modal.inner.hideAni.time) {
            setTimeout(function () {
              Modal.wrap.show = false;
            }, Modal.inner.hideAni.time);
          } else {
            Modal.wrap.show = false;
          }
          clearTimeout(Modal.autoCloseTimer);
        },
        open: function () {
          if (Modal.wrap.show) return;
          Modal.wrap.show = Modal.inner.show = true;
          Modal.set(Modal.inner);
        },
      })
    : null;
  p.bgShow && Modal.con();
  return p.bgShow ? Modal.wrap : Modal.inner;
}

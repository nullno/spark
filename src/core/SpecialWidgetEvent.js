/**
 * [specialWidgetEvent 特殊组件事件]
 * @AuthorHTL
 * @DateTime  2020-09-21T15:23:23+0800
 * @return    {[type]}                 [description]
 */
import { addEventListener, removeEventListener } from "./Common.js";

import SparkUtil from "./SparkUtil.js";

import GetAddressData from "./GetAddressData.js";

export default function (type) {
  var spfn = {
    Drag: {
      status: 0,
      container: document.body,
      _this: null,
      bodyEvent: function () {
        spfn.Drag.end();
      },
      start: function (ev, target) {
        if (this.bounded && this.bounded.disable) return;
        var touch = ev.targetTouches && ev.targetTouches[0];

        var screen = touch || ev;
        if (this.bounded && this.bounded.parent) {
          spfn.Drag.container = GetAddressData(this.parentName).$el;
        }
        this.position.startX = screen.clientX - target.offsetLeft;
        this.position.startY = screen.clientY - target.offsetTop;
        this.position.lastX = this.position.x;
        this.position.lastY = this.position.y;

        spfn.Drag.status = 1;
        spfn.Drag._this = this;
        this.on["press"].call(this);
        addEventListener(
          spfn.Drag.container,
          SparkUtil.env.isMobile ? "touchmove" : "mousemove",
          spfn.Drag.move,
          { passive: false }
        );

        if (this.bounded && !this.bounded.parent) {
          addEventListener(
            spfn.Drag.container,
            SparkUtil.env.isMobile ? "touchend" : "mouseup",
            spfn.Drag.bodyEvent
          );
        }
      },
      move: function (e, target) {
        //!SparkUtil.env.isMobile &&

        if (!spfn.Drag.status) return;
        e.preventDefault();
        e.stopPropagation();
        var ev = e || window.event;
        var _this = spfn.Drag._this;
        var touch = ev.targetTouches && ev.targetTouches[0];
        var screen = touch || ev;

        var newX =
          _this.bounded && _this.bounded.x
            ? 0
            : screen.clientX - _this.position.startX;
        var newY =
          _this.bounded && _this.bounded.y
            ? 0
            : screen.clientY - _this.position.startY;

        /*溢出边界*/
        if (_this.bounded && _this.bounded.out) {
          var parentBoxWidth =
              spfn.Drag.container.tagName === "BODY"
                ? SparkUtil.screen.width()
                : spfn.Drag.container.offsetWidth,
            parentBoxHeight =
              spfn.Drag.container.tagName === "BODY"
                ? SparkUtil.screen.height()
                : spfn.Drag.container.offsetHeight;
          if (newX <= 0) {
            newX = 0;
          }
          if (newX + _this.width() >= parentBoxWidth) {
            newX = parentBoxWidth - _this.width();
          }
          if (newY <= 0) {
            newY = 0;
          }
          if (newY + _this.height() >= parentBoxHeight) {
            newY = parentBoxHeight - _this.height();
          }
        }

        /*记录方向*/
        if (newX > _this.position.x) {
          _this.position.direction = "right";
        }
        if (newX < _this.position.x) {
          _this.position.direction = "left";
        }
        if (newY > _this.position.y) {
          _this.position.direction = "down";
        }
        if (newY < _this.position.y) {
          _this.position.direction = "up";
        }

        _this.position.x = newX;
        _this.position.y = newY;
        //XY约束
        var left =
            _this.bounded && _this.bounded.x
              ? ""
              : "left:" + _this.position.x + "px;",
          top =
            _this.bounded && _this.bounded.y
              ? ""
              : "top:" + _this.position.y + "px;";

        _this.style = left + top;

        _this.on["move"].call(_this);
      },
      end: function (target) {
        if (spfn.Drag.status == 0) return;
        var _this = spfn.Drag._this;
        spfn.Drag.status = 0;
        _this.on["up"].call(_this);
        removeEventListener(
          spfn.Drag.container,
          SparkUtil.env.isMobile ? "touchmove" : "mousemove",
          spfn.Drag.move
        );
        if (_this.bounded && !_this.bounded.parent) {
          removeEventListener(
            spfn.Drag.container,
            SparkUtil.env.isMobile ? "touchend" : "mouseup",
            spfn.Drag.bodyEvent
          );
        }
      },
    },
  };

  return spfn[type];
}

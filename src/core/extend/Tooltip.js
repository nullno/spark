/**
 * Tooltip 文字提示
 */
import WidgetManager from "../WidgetManager.js";
import { posMap as positionMap } from "./_utils.js";

export default function (p) {
  !p && (p = {});
  var title = p.title || "";
  var placement = p.placement || "top";
  var color = p.color || "rgba(0,0,0,0.75)";
  var child = p.child || null;

  var arrowMap = {
    top: "top:100%;left:50%;transform:translateX(-50%);border-top-color:" + color + ";",
    bottom: "bottom:100%;left:50%;transform:translateX(-50%);border-bottom-color:" + color + ";",
    left: "left:100%;top:50%;transform:translateY(-50%);border-left-color:" + color + ";",
    right: "right:100%;top:50%;transform:translateY(-50%);border-right-color:" + color + ";",
  };

  var bubble = WidgetManager.Box({
    style:
      "position:absolute;z-index:1070;" + (positionMap[placement] || positionMap.top) +
      "background-color:" + color + ";color:#fff;font-size:12px;padding:6px 8px;" +
      "border-radius:4px;white-space:nowrap;pointer-events:none;" +
      "opacity:0;transition:opacity 0.2s;line-height:1.5;",
    child: [WidgetManager.Text(title, { style: "" })],
  });

  var children = [];
  if (child) {
    if (Array.isArray(child)) {
      children = children.concat(child);
    } else {
      children.push(child);
    }
  }
  children.push(bubble);

  var wrapper = WidgetManager.Box({
    style: "position:relative;display:inline-block;" + (p.style || ""),
    child: children,
    on: {
      enter: function () {
        bubble.style = "opacity:1;";
      },
      leave: function () {
        bubble.style = "opacity:0;";
      },
    },
  });

  wrapper.setTitle = function (val) {
    title = val;
  };

  return wrapper;
};

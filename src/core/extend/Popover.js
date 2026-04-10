/**
 * Popover 气泡卡片
 */
import WidgetManager from "../WidgetManager.js";
import { posMap } from "./_utils.js";

export default function (p) {
  !p && (p = {});
  var title = p.title || "";
  var content = p.content || "";
  var trigger = p.trigger || "hover"; // hover, click
  var placement = p.placement || "top";
  var isVisible = false;

  var popChildren = [];
  if (title) {
    popChildren.push(WidgetManager.Text(title, {
      style: "font-size:14px;font-weight:600;color:rgba(0,0,0,0.85);margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #f0f0f0;",
    }));
  }
  if (typeof content === "string") {
    popChildren.push(WidgetManager.Text(content, {
      style: "font-size:14px;color:rgba(0,0,0,0.65);",
    }));
  } else if (content) {
    popChildren.push(content);
  }

  var popover = WidgetManager.Box({
    style: "position:absolute;" + (posMap[placement] || posMap.top) +
      "background-color:#fff;border-radius:4px;padding:12px;min-width:150px;" +
      "box-shadow:0 3px 6px -4px rgba(0,0,0,0.12),0 6px 16px 0 rgba(0,0,0,0.08);" +
      "z-index:1060;white-space:nowrap;",
    child: popChildren,
    show: false,
    stopProp: true,
  });

  var triggerWidget = p.children || WidgetManager.Text("Hover me", {
    style: "cursor:pointer;color:#4B95FF;",
  });

  var events = {};
  if (trigger === "hover") {
    events.enter = function () {
      isVisible = true;
      popover.show = true;
    };
    events.leave = function () {
      isVisible = false;
      popover.show = false;
    };
  } else if (trigger === "click") {
    events.click = function () {
      isVisible = !isVisible;
      popover.show = isVisible;
    };
  }

  var wrapper = WidgetManager.Box({
    style: "position:relative;display:inline-block;" + (p.style || ""),
    child: [triggerWidget, popover],
    on: events,
  });

  if (trigger === "click") {
    wrapper.$_init = function () {
      document.addEventListener("click", function () {
        if (isVisible) {
          isVisible = false;
          popover.show = false;
        }
      });
    };
  }

  wrapper.setVisible = function (val) {
    isVisible = val;
    popover.show = val;
  };

  return wrapper;
};

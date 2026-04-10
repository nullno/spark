/**
 * Timeline 时间线
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var items = p.items || [];
  var mode = p.mode || "left"; // left, right, alternate

  var timelineChildren = [];

  items.forEach(function (item, idx) {
    var color = item.color || "#4B95FF";
    var isLast = idx === items.length - 1;

    // Dot
    var dot = item.dot
      ? item.dot
      : WidgetManager.Box({
          style: "width:12px;height:12px;border-radius:50%;background-color:" + color +
            ";border:2px solid " + color + ";flex-shrink:0;box-shadow:0 0 0 3px " + color + "20;",
        });

    // Line
    var line = WidgetManager.Box({
      style: "width:2px;flex:1;background-color:#e2e8f0;min-height:20px;" +
        (isLast ? "visibility:hidden;" : ""),
    });

    // Axis
    var axis = WidgetManager.Box({
      style: "display:flex;flex-direction:column;align-items:center;margin:0 16px;flex-shrink:0;",
      child: [dot, line],
    });

    // Content
    var contentChildren = [];
    if (item.label) {
      contentChildren.push(WidgetManager.Text(item.label, {
        style: "font-size:14px;color:rgba(0,0,0,0.85);font-weight:500;margin-bottom:4px;",
      }));
    }
    if (item.children) {
      var desc = typeof item.children === "string"
        ? WidgetManager.Text(item.children, { style: "font-size:14px;color:rgba(0,0,0,0.65);" })
        : item.children;
      contentChildren.push(desc);
    }
    if (item.time) {
      contentChildren.push(WidgetManager.Text(item.time, {
        style: "font-size:12px;color:rgba(0,0,0,0.45);margin-top:4px;",
      }));
    }

    var content = WidgetManager.Box({
      style: "flex:1;padding-bottom:24px;padding-top:0;",
      child: contentChildren,
    });

    var isRight = mode === "right" || (mode === "alternate" && idx % 2 === 1);
    var rowChildren = isRight ? [content, axis] : [axis, content];

    var row = WidgetManager.Box({
      style: "display:flex;" + (isRight ? "flex-direction:row-reverse;" : ""),
      child: rowChildren,
    });

    timelineChildren.push(row);
  });

  return WidgetManager.Box({
    style: (p.style || ""),
    child: timelineChildren,
  });
};

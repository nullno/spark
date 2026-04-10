/**
 * Empty 空状态
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var description = p.description !== undefined ? p.description : "\u6682\u65E0\u6570\u636E";
  var image = p.image || null;
  var imageStyle = p.imageStyle || "";

  var children = [];

  // Default SVG-like empty illustration using box
  if (image) {
    if (typeof image === "string") {
      children.push(
        WidgetManager.Image(image, {
          style: "width:64px;height:64px;object-fit:contain;" + imageStyle,
        })
      );
    } else {
      children.push(image);
    }
  } else {
    // Simple empty icon with boxes
    var emptyIcon = WidgetManager.Box({
      style:
        "width:64px;height:41px;margin:0 auto 8px;" +
        "border:2px dashed #d9d9d9;border-radius:4px;position:relative;" +
        "display:flex;align-items:center;justify-content:center;" + imageStyle,
      child: [
        WidgetManager.Box({
          style: "width:20px;height:2px;background-color:#d9d9d9;border-radius:1px;",
        }),
      ],
    });
    children.push(emptyIcon);
  }

  // Description
  if (description !== false && description !== null) {
    children.push(
      WidgetManager.Text(description, {
        style: "font-size:14px;color:rgba(0,0,0,0.25);line-height:22px;margin-top:8px;",
      })
    );
  }

  // Extra children
  if (p.child) {
    var extra = Array.isArray(p.child) ? p.child : [p.child];
    for (var i = 0; i < extra.length; i++) {
      children.push(extra[i]);
    }
  }

  var empty = WidgetManager.Box({
    style:
      "display:flex;flex-direction:column;align-items:center;justify-content:center;" +
      "padding:32px 0;" + (p.style || ""),
    child: children,
  });

  return empty;
};

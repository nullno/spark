/**
 * Breadcrumb 面包屑
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var items = p.items || [];
  var separator = p.separator || "/";
  var onClick = p.onClick || null;

  var children = [];
  for (var i = 0; i < items.length; i++) {
    (function (idx) {
      var item = items[idx];
      var isLast = idx === items.length - 1;

      var crumb = WidgetManager.Text(item.text || item.title || item, {
        style:
          "font-size:14px;line-height:22px;" +
          (isLast
            ? "color:rgba(0,0,0,0.85);"
            : "color:rgba(0,0,0,0.45);cursor:pointer;transition:color 0.2s;"),
        on: !isLast
          ? {
              click:
                onClick || item.onClick
                  ? function () {
                      if (item.onClick) item.onClick(item, idx);
                      else if (onClick) onClick(item, idx);
                    }
                  : null,
              hover: function () {
                this.style = "color:#4B95FF;";
              },
              out: function () {
                this.style = "color:rgba(0,0,0,0.45);";
              },
            }
          : null,
      });

      children.push(crumb);

      if (!isLast) {
        children.push(
          WidgetManager.Text(separator, {
            style:
              "margin:0 8px;color:rgba(0,0,0,0.45);font-size:14px;",
          })
        );
      }
    })(i);
  }

  var breadcrumb = WidgetManager.Box({
    style: "display:flex;align-items:center;" + (p.style || ""),
    child: children,
  });

  return breadcrumb;
};

/**
 * Dropdown 下拉菜单
 */
import WidgetManager from "../WidgetManager.js";
import { D, addEventListener } from "../common.js";

export default function (p) {
  !p && (p = {});
  var items = p.items || [];
  var trigger = p.trigger || "hover";
  var placement = p.placement || "bottomLeft";
  var child = p.child || null;
  var onSelect = p.onSelect || null;

  var placementMap = {
    bottomLeft: "top:100%;left:0;padding-top:4px;",
    bottomRight: "top:100%;right:0;padding-top:4px;",
    bottomCenter: "top:100%;left:50%;transform:translateX(-50%);padding-top:4px;",
    topLeft: "bottom:100%;left:0;padding-bottom:4px;",
    topRight: "bottom:100%;right:0;padding-bottom:4px;",
    topCenter: "bottom:100%;left:50%;transform:translateX(-50%);padding-bottom:4px;",
  };

  var menuItems = [];
  for (var i = 0; i < items.length; i++) {
    (function (idx) {
      var item = items[idx];
      if (item.type === "divider") {
        menuItems.push(
          WidgetManager.Box({
            style: "height:1px;background-color:#f0f0f0;margin:4px 0;",
          })
        );
        return;
      }

      var disabled = item.disabled || false;
      var danger = item.danger || false;
      var textColor = disabled
        ? "rgba(0,0,0,0.25)"
        : danger
        ? "#ff4d4f"
        : "rgba(0,0,0,0.85)";

      var menuItem = WidgetManager.Box({
        style:
          "padding:5px 12px;cursor:" + (disabled ? "not-allowed" : "pointer") + ";" +
          "font-size:14px;line-height:22px;white-space:nowrap;" +
          "transition:background-color 0.2s;border-radius:4px;",
        child: [
          WidgetManager.Text(item.label || "", {
            style: "color:" + textColor + ";",
          }),
        ],
        shover: !disabled ? { "background-color": "#f5f5f5" } : null,
        on: !disabled
          ? {
              click: function () {
                hideMenu();
                if (item.onClick) item.onClick(item);
                if (onSelect) onSelect(item.key || idx, item);
              },
            }
          : null,
      });
      menuItems.push(menuItem);
    })(i);
  }

  var menuInner = WidgetManager.Box({
    style:
      "min-width:120px;background-color:#fff;border-radius:8px;padding:4px;" +
      "box-shadow:0 6px 16px rgba(0,0,0,0.08),0 3px 6px rgba(0,0,0,0.05);",
    child: menuItems,
  });

  var menu = WidgetManager.Box({
    style:
      "position:absolute;" + (placementMap[placement] || placementMap.bottomLeft) +
      "opacity:0;pointer-events:none;transition:opacity 0.2s;z-index:1050;",
    child: [menuInner],
  });

  function showMenu() {
    menu.style = "opacity:1;pointer-events:auto;";
  }

  function hideMenu() {
    menu.style = "opacity:0;pointer-events:none;";
  }

  var triggerChildren = [];
  if (child) {
    if (Array.isArray(child)) triggerChildren = triggerChildren.concat(child);
    else triggerChildren.push(child);
  }
  triggerChildren.push(menu);

  var onEvents = {};
  if (trigger === "hover") {
    onEvents.enter = showMenu;
    onEvents.leave = hideMenu;
  } else if (trigger === "click") {
    onEvents.click = function () {
      if (menu._visible) {
        hideMenu();
        menu._visible = false;
      } else {
        showMenu();
        menu._visible = true;
      }
    };
  }

  var dropdown = WidgetManager.Box({
    style: "position:relative;display:inline-block;" + (p.style || ""),
    child: triggerChildren,
    on: onEvents,
  });

  dropdown.show = showMenu;
  dropdown.hide = hideMenu;

  return dropdown;
};

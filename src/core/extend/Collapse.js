/**
 * Collapse 折叠面板
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var items = p.items || [];
  var accordion = p.accordion || false;
  var defaultActiveKey = p.defaultActiveKey || [];
  var bordered = p.bordered !== false;
  var onChange = p.onChange || null;

  var activeKeys = [].concat(defaultActiveKey);
  var panelRefs = [];

  var panelChildren = [];
  for (var i = 0; i < items.length; i++) {
    (function (idx) {
      var item = items[idx];
      var key = item.key || String(idx);
      var isActive = activeKeys.indexOf(key) > -1;

      // Arrow icon
      var arrow = WidgetManager.Text("\u25B6", {
        style:
          "font-size:10px;color:rgba(0,0,0,0.45);transition:transform 0.3s;" +
          "margin-right:12px;display:inline-block;" +
          (isActive ? "transform:rotate(90deg);" : ""),
      });

      // Header
      var header = WidgetManager.Box({
        style:
          "padding:12px 16px;cursor:pointer;display:flex;align-items:center;" +
          "background-color:#fafafa;border-bottom:1px solid #d9d9d9;" +
          "user-select:none;transition:background-color 0.2s;",
        shover: { "background-color": "#f0f0f0" },
        child: [
          arrow,
          WidgetManager.Text(item.label || "", {
            style: "font-size:14px;color:rgba(0,0,0,0.85);font-weight:500;flex:1;",
          }),
        ],
        on: {
          click: function () {
            var keyIdx = activeKeys.indexOf(key);
            if (keyIdx > -1) {
              activeKeys.splice(keyIdx, 1);
              content.style = "max-height:0;overflow:hidden;opacity:0;padding:0 16px;";
              arrow.style = "transform:rotate(0deg);";
            } else {
              if (accordion) {
                for (var j = 0; j < panelRefs.length; j++) {
                  if (j !== idx) {
                    panelRefs[j].content.style = "max-height:0;overflow:hidden;opacity:0;padding:0 16px;";
                    panelRefs[j].arrow.style = "transform:rotate(0deg);";
                  }
                }
                activeKeys = [];
              }
              activeKeys.push(key);
              content.style = "max-height:2000px;overflow:hidden;opacity:1;padding:16px;";
              arrow.style = "transform:rotate(90deg);";
            }
            if (onChange) onChange(accordion ? activeKeys[0] : activeKeys.slice());
          },
        },
      });

      // Content
      var contentChild = item.children
        ? Array.isArray(item.children)
          ? item.children
          : [item.children]
        : [];

      var content = WidgetManager.Box({
        style:
          (isActive
            ? "max-height:2000px;opacity:1;padding:16px;"
            : "max-height:0;opacity:0;padding:0 16px;") +
          "overflow:hidden;transition:max-height 0.3s ease,opacity 0.3s ease,padding 0.3s ease;" +
          "border-bottom:1px solid #d9d9d9;background-color:#fff;",
        child: contentChild,
      });

      panelRefs.push({ content: content, arrow: arrow });
      panelChildren.push(header);
      panelChildren.push(content);
    })(i);
  }

  var collapse = WidgetManager.Box({
    style:
      (bordered ? "border:1px solid #d9d9d9;border-radius:4px;overflow:hidden;" : "") +
      "background-color:#fff;" + (p.style || ""),
    child: panelChildren,
  });

  collapse.setActiveKey = function (keys) {
    activeKeys = [].concat(keys);
    for (var j = 0; j < panelRefs.length; j++) {
      var item = items[j];
      var key = item.key || String(j);
      if (activeKeys.indexOf(key) > -1) {
        panelRefs[j].content.style = "max-height:2000px;opacity:1;padding:16px;";
        panelRefs[j].arrow.style = "transform:rotate(90deg);";
      } else {
        panelRefs[j].content.style = "max-height:0;opacity:0;padding:0 16px;";
        panelRefs[j].arrow.style = "transform:rotate(0deg);";
      }
    }
  };

  return collapse;
};

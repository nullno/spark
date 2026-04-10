/**
 * Alert 警告提示
 */
import WidgetManager from "../WidgetManager.js";

var typeConfig = {
  success: { color: "#52c41a", bg: "#f6ffed", border: "#b7eb8f", icon: "\u2713" },
  info: { color: "#1890ff", bg: "#e6f7ff", border: "#91d5ff", icon: "\u2139" },
  warning: { color: "#faad14", bg: "#fffbe6", border: "#ffe58f", icon: "\u26a0" },
  error: { color: "#f5222d", bg: "#fff1f0", border: "#ffa39e", icon: "\u2717" },
};

export default function (p) {
  !p && (p = {});
  var type = p.type || "info";
  var message = p.message || "";
  var description = p.description || "";
  var closable = p.closable !== false;
  var showIcon = p.showIcon !== false;
  var banner = p.banner || false;
  var config = typeConfig[type] || typeConfig.info;

  var children = [];

  if (showIcon) {
    children.push(
      WidgetManager.Text(config.icon, {
        style:
          "font-size:" + (description ? "20px" : "14px") + ";margin-right:8px;color:" +
          config.color + ";flex-shrink:0;" + (description ? "margin-top:2px;" : ""),
      })
    );
  }

  var textChildren = [];
  textChildren.push(
    WidgetManager.Text(message, {
      style: "font-size:14px;color:#333;font-weight:" + (description ? "600" : "400") + ";",
    })
  );

  if (description) {
    textChildren.push(
      WidgetManager.Text(description, {
        style: "font-size:14px;color:#666;margin-top:4px;",
      })
    );
  }

  children.push(
    WidgetManager.Box({
      style: "flex:1;display:flex;flex-direction:column;",
      child: textChildren,
    })
  );

  var alert;

  if (closable) {
    children.push(
      WidgetManager.Text("\u00d7", {
        style:
          "cursor:pointer;font-size:16px;color:#999;margin-left:8px;flex-shrink:0;transition:color 0.2s;",
        shover: { color: "#333" },
        on: {
          click: function () {
            alert.show = false;
            p.onClose && p.onClose();
          },
        },
      })
    );
  }

  alert = WidgetManager.Box({
    style:
      "display:flex;align-items:" + (description ? "flex-start" : "center") +
      ";padding:" + (description ? "16px" : "8px 16px") +
      ";background-color:" + config.bg + ";border:1px solid " + config.border +
      ";border-radius:" + (banner ? "0" : "8px") + ";margin-bottom:16px;" +
      (p.style || ""),
    child: children,
  });

  return alert;
};

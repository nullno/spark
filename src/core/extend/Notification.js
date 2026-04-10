/**
 * Notification 通知提醒框
 */
import WidgetManager from "../WidgetManager.js";
import { D } from "../common.js";

var containers = {};

var typeConfig = {
  success: { icon: "\u2713", color: "#52c41a" },
  error: { icon: "\u2717", color: "#ff4d4f" },
  warning: { icon: "\u0021", color: "#faad14" },
  info: { icon: "\u0069", color: "#1890ff" },
};

var placementStyles = {
  topRight: "top:24px;right:24px;",
  topLeft: "top:24px;left:24px;",
  bottomRight: "bottom:24px;right:24px;",
  bottomLeft: "bottom:24px;left:24px;",
};

function getContainer(placement) {
  if (containers[placement]) return containers[placement];
  var div = D.createElement("div");
  div.style.cssText =
    "position:fixed;" + (placementStyles[placement] || placementStyles.topRight) +
    "z-index:1100;display:flex;flex-direction:column;pointer-events:none;";
  D.body.appendChild(div);
  containers[placement] = div;
  return div;
}

function showNotification(config) {
  var type = config.type || "info";
  var message = config.message || "";
  var description = config.description || "";
  var duration = config.duration !== undefined ? config.duration : 4.5;
  var placement = config.placement || "topRight";
  var onClose = config.onClose || null;
  var closable = config.closable !== false;

  var cfg = typeConfig[type] || typeConfig.info;
  var container = getContainer(placement);

  var notifDiv = D.createElement("div");
  notifDiv.style.cssText =
    "width:384px;max-width:calc(100vw - 48px);background:#fff;border-radius:8px;" +
    "box-shadow:0 6px 16px rgba(0,0,0,0.08),0 3px 6px rgba(0,0,0,0.05);" +
    "padding:16px 24px;margin-bottom:16px;pointer-events:auto;position:relative;" +
    "opacity:0;transform:translateX(" + (placement.indexOf("Right") > -1 ? "100%" : "-100%") + ");" +
    "transition:opacity 0.3s,transform 0.3s;";

  // Icon
  var iconEl = D.createElement("span");
  iconEl.style.cssText =
    "width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;" +
    "justify-content:center;font-size:14px;font-weight:bold;color:#fff;" +
    "background-color:" + cfg.color + ";position:absolute;top:16px;left:24px;";
  iconEl.textContent = cfg.icon;

  var contentDiv = D.createElement("div");
  contentDiv.style.cssText = "margin-left:40px;padding-right:" + (closable ? "16px" : "0") + ";";

  var titleEl = D.createElement("div");
  titleEl.style.cssText =
    "font-size:16px;font-weight:500;color:rgba(0,0,0,0.85);line-height:24px;margin-bottom:8px;";
  titleEl.textContent = message;

  var descEl = D.createElement("div");
  descEl.style.cssText = "font-size:14px;color:rgba(0,0,0,0.65);line-height:22px;";
  descEl.textContent = description;

  contentDiv.appendChild(titleEl);
  if (description) contentDiv.appendChild(descEl);

  notifDiv.appendChild(iconEl);
  notifDiv.appendChild(contentDiv);

  function remove() {
    notifDiv.style.opacity = "0";
    notifDiv.style.transform =
      "translateX(" + (placement.indexOf("Right") > -1 ? "100%" : "-100%") + ")";
    setTimeout(function () {
      if (notifDiv.parentNode) notifDiv.parentNode.removeChild(notifDiv);
      if (onClose) onClose();
    }, 300);
  }

  if (closable) {
    var closeBtn = D.createElement("span");
    closeBtn.style.cssText =
      "position:absolute;top:16px;right:16px;cursor:pointer;font-size:14px;" +
      "color:rgba(0,0,0,0.45);width:22px;height:22px;display:flex;" +
      "align-items:center;justify-content:center;border-radius:4px;transition:background-color 0.2s;";
    closeBtn.textContent = "\u2715";
    closeBtn.onmouseover = function () {
      closeBtn.style.backgroundColor = "#f5f5f5";
    };
    closeBtn.onmouseout = function () {
      closeBtn.style.backgroundColor = "transparent";
    };
    closeBtn.onclick = remove;
    notifDiv.appendChild(closeBtn);
  }

  container.appendChild(notifDiv);

  requestAnimationFrame(function () {
    notifDiv.style.opacity = "1";
    notifDiv.style.transform = "translateX(0)";
  });

  if (duration > 0) {
    setTimeout(remove, duration * 1000);
  }

  return { close: remove };
}

function Notification(config) {
  if (typeof config === "string") {
    return showNotification({ message: config });
  }
  // Support both {title,content} and {message,description} parameter styles
  if (config.title && !config.message) config.message = config.title;
  if (config.content && !config.description) config.description = config.content;
  return showNotification(config);
}

Notification.open = function (config) {
  return showNotification(config);
};
Notification.success = function (config) {
  config.type = "success";
  return showNotification(config);
};
Notification.error = function (config) {
  config.type = "error";
  return showNotification(config);
};
Notification.warning = function (config) {
  config.type = "warning";
  return showNotification(config);
};
Notification.info = function (config) {
  config.type = "info";
  return showNotification(config);
};

export default Notification;

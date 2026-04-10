/**
 * Message 全局提示
 */
import WidgetManager from "../WidgetManager.js";
import { D } from "../common.js";

var messageContainer = null;

function getContainer() {
  if (messageContainer) return messageContainer;
  messageContainer = WidgetManager.Fixed({
    style:
      "top:8px;left:50%;transform:translateX(-50%);z-index:1100;" +
      "display:flex;flex-direction:column;align-items:center;pointer-events:none;",
    child: [],
  });
  // Append to body
  var div = D.createElement("div");
  div.id = "spark-message-container";
  div.style.cssText = "position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:1100;" +
    "display:flex;flex-direction:column;align-items:center;pointer-events:none;";
  D.body.appendChild(div);
  messageContainer._el = div;
  return messageContainer;
}

var typeConfig = {
  success: { icon: "\u2713", color: "#52c41a" },
  error: { icon: "\u2717", color: "#ff4d4f" },
  warning: { icon: "\u0021", color: "#faad14" },
  info: { icon: "\u0069", color: "#1890ff" },
  loading: { icon: "\u27F3", color: "#1890ff" },
};

function showMessage(type, content, duration, onClose) {
  var cfg = typeConfig[type] || typeConfig.info;
  duration = duration !== undefined ? duration : 3;

  var container = getContainer();
  var el = container._el;

  var msgDiv = D.createElement("div");
  msgDiv.style.cssText =
    "display:flex;align-items:center;padding:9px 12px;background:#fff;" +
    "border-radius:8px;box-shadow:0 6px 16px rgba(0,0,0,0.08),0 3px 6px rgba(0,0,0,0.05);" +
    "margin-bottom:8px;pointer-events:auto;opacity:0;transform:translateY(-100%);" +
    "transition:opacity 0.3s,transform 0.3s;max-width:80vw;";

  var iconSpan = D.createElement("span");
  iconSpan.style.cssText =
    "width:20px;height:20px;border-radius:50%;display:inline-flex;align-items:center;" +
    "justify-content:center;margin-right:8px;font-size:12px;font-weight:bold;" +
    "color:#fff;background-color:" + cfg.color + ";flex-shrink:0;";
  iconSpan.textContent = cfg.icon;

  var textSpan = D.createElement("span");
  textSpan.style.cssText = "font-size:14px;color:rgba(0,0,0,0.85);line-height:22px;";
  textSpan.textContent = content;

  msgDiv.appendChild(iconSpan);
  msgDiv.appendChild(textSpan);
  el.appendChild(msgDiv);

  // Animate in
  requestAnimationFrame(function () {
    msgDiv.style.opacity = "1";
    msgDiv.style.transform = "translateY(0)";
  });

  // Auto remove
  var timer = null;
  function remove() {
    msgDiv.style.opacity = "0";
    msgDiv.style.transform = "translateY(-100%)";
    setTimeout(function () {
      if (msgDiv.parentNode) msgDiv.parentNode.removeChild(msgDiv);
      if (onClose) onClose();
    }, 300);
  }

  if (duration > 0) {
    timer = setTimeout(remove, duration * 1000);
  }

  return { close: remove };
}

function Message(options) {
  if (typeof options === "string") {
    return showMessage("info", options);
  }
  var type = (options && options.type) || "info";
  var content = (options && options.content) || "";
  var duration = options && options.duration !== undefined ? options.duration : undefined;
  var onClose = (options && options.onClose) || undefined;
  return showMessage(type, content, duration, onClose);
}

Message.success = function (content, duration, onClose) {
  return showMessage("success", content, duration, onClose);
};
Message.error = function (content, duration, onClose) {
  return showMessage("error", content, duration, onClose);
};
Message.warning = function (content, duration, onClose) {
  return showMessage("warning", content, duration, onClose);
};
Message.info = function (content, duration, onClose) {
  return showMessage("info", content, duration, onClose);
};
Message.loading = function (content, duration, onClose) {
  return showMessage("loading", content, duration, onClose);
};

export default Message;

/**
 * Popconfirm 气泡确认框
 */
import WidgetManager from "../WidgetManager.js";
import { posMap } from "./_utils.js";

export default function (p) {
  !p && (p = {});
  var title = p.title || "确定吗？";
  var okText = p.okText || "确定";
  var cancelText = p.cancelText || "取消";
  var onConfirm = p.onConfirm || null;
  var onCancel = p.onCancel || null;
  var placement = p.placement || "top";
  var isVisible = false;

  var titleWidget = WidgetManager.Box({
    style: "display:flex;align-items:flex-start;margin-bottom:12px;",
    child: [
      WidgetManager.Text("\u26A0", {
        style: "font-size:14px;color:#faad14;margin-right:8px;flex-shrink:0;",
      }),
      WidgetManager.Text(title, {
        style: "font-size:14px;color:rgba(0,0,0,0.65);",
      }),
    ],
  });

  var cancelBtn = WidgetManager.Button(cancelText, {
    style: "padding:2px 8px;font-size:12px;background-color:#fff;color:#333;border:1px solid #d9d9d9;margin-right:8px;",
    on: {
      click: function () {
        isVisible = false;
        popover.show = false;
        onCancel && onCancel();
      },
    },
  });

  var okBtn = WidgetManager.Button(okText, {
    style: "padding:2px 8px;font-size:12px;",
    on: {
      click: function () {
        isVisible = false;
        popover.show = false;
        onConfirm && onConfirm();
      },
    },
  });

  var buttons = WidgetManager.Box({
    style: "display:flex;justify-content:flex-end;",
    child: [cancelBtn, okBtn],
  });

  var popover = WidgetManager.Box({
    style: "position:absolute;" + (posMap[placement] || posMap.top) +
      "background-color:#fff;border-radius:4px;padding:12px 16px;min-width:180px;" +
      "box-shadow:0 3px 6px -4px rgba(0,0,0,0.12),0 6px 16px 0 rgba(0,0,0,0.08);" +
      "z-index:1060;",
    child: [titleWidget, buttons],
    show: false,
    stopProp: true,
  });

  var triggerWidget = p.children || WidgetManager.Text("Delete", {
    style: "cursor:pointer;color:#ff4d4f;",
  });

  var wrapper = WidgetManager.Box({
    style: "position:relative;display:inline-block;" + (p.style || ""),
    child: [triggerWidget, popover],
    on: {
      click: function () {
        isVisible = !isVisible;
        popover.show = isVisible;
      },
    },
  });

  wrapper.$_init = function () {
    document.addEventListener("click", function () {
      if (isVisible) {
        isVisible = false;
        popover.show = false;
      }
    });
  };

  return wrapper;
};

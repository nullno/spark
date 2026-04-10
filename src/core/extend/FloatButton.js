/**
 * FloatButton 悬浮按钮（可拖拽）
 */
import { D, W, addEventListener } from "../common.js";

export default function (p) {
  !p && (p = {});
  var icon = p.icon || "\u2699";
  var tooltip = p.tooltip || "";
  var right = p.right !== undefined ? p.right : 24;
  var bottom = p.bottom !== undefined ? p.bottom : 24;
  var size = p.size || 48;
  var draggable = p.draggable !== false;
  var onClick = p.onClick || null;
  var bgColor = p.bgColor || "#4B95FF";

  var el = D.createElement("div");
  el.style.cssText =
    "position:fixed;z-index:1010;right:" + right + "px;bottom:" + bottom + "px;" +
    "width:" + size + "px;height:" + size + "px;border-radius:50%;" +
    "background-color:" + bgColor + ";color:#fff;cursor:pointer;" +
    "display:flex;align-items:center;justify-content:center;" +
    "box-shadow:0 6px 16px rgba(0,0,0,0.12);font-size:" + Math.round(size * 0.45) + "px;" +
    "transition:box-shadow 0.2s,transform 0.2s;user-select:none;";

  el.textContent = icon;
  if (tooltip) el.title = tooltip;

  // hover effect
  el.addEventListener("mouseenter", function () {
    if (!isDragging) {
      el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
      el.style.transform = "scale(1.08)";
    }
  });
  el.addEventListener("mouseleave", function () {
    el.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
    el.style.transform = "scale(1)";
  });

  // drag support
  var isDragging = false;
  var hasMoved = false;
  var startX = 0, startY = 0, origX = 0, origY = 0;

  if (draggable) {
    el.addEventListener("mousedown", function (e) {
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;
      var rect = el.getBoundingClientRect();
      origX = rect.left;
      origY = rect.top;
      el.style.transition = "none";
      e.preventDefault();
    });

    addEventListener(D, "mousemove", function (e) {
      if (!isDragging) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
      var newX = origX + dx;
      var newY = origY + dy;
      // clamp to viewport
      newX = Math.max(0, Math.min(W.innerWidth - size, newX));
      newY = Math.max(0, Math.min(W.innerHeight - size, newY));
      el.style.left = newX + "px";
      el.style.top = newY + "px";
      el.style.right = "auto";
      el.style.bottom = "auto";
    });

    addEventListener(D, "mouseup", function () {
      if (!isDragging) return;
      isDragging = false;
      el.style.transition = "box-shadow 0.2s,transform 0.2s";
    });
  }

  // click (only if not dragged)
  el.addEventListener("click", function (e) {
    if (hasMoved) return;
    if (onClick) onClick(e);
  });

  // mount
  var mounted = false;
  var floatBtn = {
    mount: function () {
      if (!mounted) {
        D.body.appendChild(el);
        mounted = true;
      }
    },
    unmount: function () {
      if (mounted && el.parentNode) {
        el.parentNode.removeChild(el);
        mounted = false;
      }
    },
    el: el,
  };

  // auto mount
  if (D.body) {
    floatBtn.mount();
  } else {
    addEventListener(D, "DOMContentLoaded", function () { floatBtn.mount(); });
  }

  return floatBtn;
};

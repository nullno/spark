/**
 * Modal 模态框
 */
import { D } from "../common.js";
import { widgetToDOM } from "./_utils.js";

export default function(p) {
  !p && (p = {});
  var bgShow = p.bgShow !== false;
  var bgClose = p.bgClose || false;
  var bgColor = p.bgColor || "rgba(0,0,0,0.45)";
  var position = p.position || "center";
  var closable = p.closable !== false;
  var onClose = p.onClose || null;
  var autoClose = p.autoClose || false;
  var drag = p.drag || false;
  var cache = p.cache || false;
  var userStyle = p.style || "";
  var child = p.child || [];

  var maskEl = D.createElement("div");
  maskEl.className = "spark-modal-mask";
  maskEl.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9998;" +
    "background-color:" + bgColor + ";opacity:0;transition:opacity 0.3s;" +
    (bgShow ? "" : "display:none;");

  var panelEl = D.createElement("div");
  panelEl.className = "spark-modal-content";
  panelEl.style.cssText =
    "position:fixed;z-index:9999;opacity:0;transform:scale(0.85);" +
    "transition:opacity 0.3s,transform 0.3s;" + userStyle;
  if (!userStyle) {
    panelEl.style.cssText +=
      "width:480px;max-width:90vw;background:#fff;border-radius:12px;" +
      "padding:24px;box-shadow:0 12px 40px rgba(0,0,0,0.12);";
  }

  if (closable) {
    var closeBtn = D.createElement("span");
    closeBtn.className = "spark-modal-close";
    closeBtn.style.cssText =
      "position:absolute;top:12px;right:12px;width:28px;height:28px;cursor:pointer;" +
      "display:flex;align-items:center;justify-content:center;font-size:16px;color:#999;" +
      "border-radius:6px;transition:background-color 0.2s;z-index:1;";
    closeBtn.textContent = "\u2715";
    closeBtn.onmouseover = function() { closeBtn.style.backgroundColor = "#f5f5f5"; };
    closeBtn.onmouseout = function() { closeBtn.style.backgroundColor = "transparent"; };
    closeBtn.onclick = function(e) { e.stopPropagation(); modal.close(); };
    panelEl.appendChild(closeBtn);
  }

  function renderChildren() {
    var arr = Array.isArray(child) ? child : [child];
    for (var i = 0; i < arr.length; i++) {
      var dom = widgetToDOM(arr[i]);
      if (dom) panelEl.appendChild(dom);
    }
  }

  var wrapEl = D.createElement("div");
  wrapEl.className = "spark-modal-wrap";
  wrapEl.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;z-index:9998;pointer-events:none;";
  wrapEl.appendChild(maskEl);
  wrapEl.appendChild(panelEl);

  var mounted = false;
  var autoCloseTimer = null;

  function setPosition() {
    var pw = panelEl.offsetWidth, ph = panelEl.offsetHeight;
    panelEl.style.top = ""; panelEl.style.left = ""; panelEl.style.right = "";
    panelEl.style.bottom = ""; panelEl.style.marginLeft = ""; panelEl.style.marginTop = "";
    switch (position) {
      case "topcenter":
        panelEl.style.top = "5%"; panelEl.style.left = "50%";
        panelEl.style.marginLeft = -pw / 2 + "px"; break;
      case "topleft":
        panelEl.style.top = "5%"; panelEl.style.left = "5%"; break;
      case "topright":
        panelEl.style.top = "5%"; panelEl.style.right = "5%"; break;
      case "bottomcenter":
        panelEl.style.bottom = "5%"; panelEl.style.left = "50%";
        panelEl.style.marginLeft = -pw / 2 + "px"; break;
      case "bottomleft":
        panelEl.style.bottom = "5%"; panelEl.style.left = "5%"; break;
      case "bottomright":
        panelEl.style.bottom = "5%"; panelEl.style.right = "5%"; break;
      default:
        panelEl.style.top = "50%"; panelEl.style.left = "50%";
        panelEl.style.marginLeft = -pw / 2 + "px";
        panelEl.style.marginTop = -ph / 2 + "px"; break;
    }
  }

  if (drag) {
    (function() {
      var isDragging = false, startX = 0, startY = 0, origLeft = 0, origTop = 0;
      panelEl.style.cursor = "move";
      panelEl.addEventListener("mousedown", function(e) {
        isDragging = true; startX = e.clientX; startY = e.clientY;
        var r = panelEl.getBoundingClientRect();
        origLeft = r.left; origTop = r.top; e.preventDefault();
      });
      D.addEventListener("mousemove", function(e) {
        if (!isDragging) return;
        panelEl.style.left = origLeft + e.clientX - startX + "px";
        panelEl.style.top = origTop + e.clientY - startY + "px";
        panelEl.style.marginLeft = "0"; panelEl.style.marginTop = "0";
        panelEl.style.right = "auto"; panelEl.style.bottom = "auto";
      });
      D.addEventListener("mouseup", function() { isDragging = false; });
    })();
  }

  if (bgClose) maskEl.onclick = function() { modal.close(); };
  panelEl.onclick = function(e) { e.stopPropagation(); };

  var modal = {
    open: function() {
      if (!mounted) {
        D.body.appendChild(wrapEl);
        renderChildren();
        mounted = true;
      }
      wrapEl.style.width = "100%"; wrapEl.style.height = "100%";
      wrapEl.style.pointerEvents = "auto";
      maskEl.style.display = "";
      requestAnimationFrame(function() {
        maskEl.style.opacity = "1";
        panelEl.style.opacity = "1";
        panelEl.style.transform = "scale(1)";
        setPosition();
      });
      if (autoClose) {
        autoCloseTimer = setTimeout(function() { modal.close(); }, autoClose < 1000 ? 1000 : autoClose);
      }
    },
    close: function() {
      clearTimeout(autoCloseTimer);
      maskEl.style.opacity = "0";
      panelEl.style.opacity = "0";
      panelEl.style.transform = "scale(0.85)";
      setTimeout(function() {
        wrapEl.style.width = "0"; wrapEl.style.height = "0";
        wrapEl.style.pointerEvents = "none";
        if (onClose) onClose();
        if (!cache) modal.destroy();
      }, 300);
    },
    destroy: function() {
      clearTimeout(autoCloseTimer);
      if (mounted && wrapEl.parentNode) {
        wrapEl.parentNode.removeChild(wrapEl);
        mounted = false;
      }
    },
  };

  return modal;
}

/**
 * Drawer 抽屉
 */
import { D } from "../common.js";
import { widgetToDOM } from "./_utils.js";

export default function(p) {
  !p && (p = {});
  var title = p.title || "";
  var placement = p.placement || "right";
  var width = p.width || 378;
  var height = p.height || 378;
  var closable = p.closable !== false;
  var maskClosable = p.maskClosable !== false;
  var onClose = p.onClose || null;
  var cache = p.cache || false;
  var child = p.child || [];

  var isHorizontal = placement === "left" || placement === "right";
  var transformHidden = {
    right: "translateX(100%)", left: "translateX(-100%)",
    top: "translateY(-100%)", bottom: "translateY(100%)",
  };

  var maskEl = D.createElement("div");
  maskEl.className = "spark-drawer-mask";
  maskEl.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;" +
    "background-color:rgba(0,0,0,0.45);opacity:0;transition:opacity 0.3s;pointer-events:none;";

  var panelEl = D.createElement("div");
  panelEl.className = "spark-drawer-content";
  var sizeStyle = isHorizontal
    ? "width:" + width + "px;height:100%;top:0;" + placement + ":0;"
    : "height:" + height + "px;width:100%;left:0;" + placement + ":0;";
  panelEl.style.cssText =
    "position:fixed;" + sizeStyle + "background-color:#fff;z-index:1001;" +
    "box-shadow:-6px 0 16px rgba(0,0,0,0.08),-3px 0 6px rgba(0,0,0,0.05);" +
    "display:flex;flex-direction:column;max-width:100vw;" +
    "transform:" + transformHidden[placement] + ";transition:transform 0.3s cubic-bezier(0.7,0.3,0.1,1);";

  if (closable) {
    var closeBtn = D.createElement("span");
    closeBtn.className = "spark-drawer-close";
    closeBtn.style.cssText =
      "position:absolute;top:16px;right:16px;width:24px;height:24px;cursor:pointer;" +
      "display:flex;align-items:center;justify-content:center;font-size:16px;color:#999;" +
      "border-radius:4px;transition:background-color 0.2s;z-index:1;";
    closeBtn.textContent = "\u2715";
    closeBtn.onmouseover = function() { closeBtn.style.backgroundColor = "#f5f5f5"; };
    closeBtn.onmouseout = function() { closeBtn.style.backgroundColor = "transparent"; };
    closeBtn.onclick = function() { drawer.close(); };
    panelEl.appendChild(closeBtn);
  }

  if (title) {
    var headerEl = D.createElement("div");
    headerEl.className = "spark-drawer-header";
    headerEl.style.cssText =
      "padding:16px 24px;border-bottom:1px solid #f0f0f0;position:relative;" +
      "font-size:16px;font-weight:600;color:rgba(0,0,0,0.85);line-height:22px;";
    headerEl.textContent = title;
    panelEl.appendChild(headerEl);
  }

  var bodyEl = D.createElement("div");
  bodyEl.className = "spark-drawer-body";
  bodyEl.style.cssText = "padding:24px;flex:1;overflow:auto;";
  panelEl.appendChild(bodyEl);

  function renderChildren() {
    var arr = Array.isArray(child) ? child : [child];
    for (var i = 0; i < arr.length; i++) {
      var dom = widgetToDOM(arr[i]);
      if (dom) bodyEl.appendChild(dom);
    }
  }

  var wrapEl = D.createElement("div");
  wrapEl.className = "spark-drawer-wrap";
  wrapEl.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;z-index:1000;pointer-events:none;";
  wrapEl.appendChild(maskEl);
  wrapEl.appendChild(panelEl);

  var mounted = false;
  var savedOverflow = "";

  if (maskClosable) maskEl.onclick = function() { drawer.close(); };

  var drawer = {
    open: function() {
      if (!mounted) {
        D.body.appendChild(wrapEl);
        renderChildren();
        mounted = true;
      }
      savedOverflow = D.body.style.overflow;
      D.body.style.overflow = "hidden";
      wrapEl.style.width = "100%"; wrapEl.style.height = "100%";
      wrapEl.style.pointerEvents = "auto";
      requestAnimationFrame(function() {
        maskEl.style.opacity = "1";
        maskEl.style.pointerEvents = "auto";
        panelEl.style.transform = "translateX(0) translateY(0)";
      });
    },
    close: function() {
      maskEl.style.opacity = "0";
      maskEl.style.pointerEvents = "none";
      panelEl.style.transform = transformHidden[placement];
      D.body.style.overflow = savedOverflow;
      setTimeout(function() {
        wrapEl.style.width = "0"; wrapEl.style.height = "0";
        wrapEl.style.pointerEvents = "none";
        if (onClose) onClose();
        if (!cache) drawer.destroy();
      }, 300);
    },
    destroy: function() {
      D.body.style.overflow = savedOverflow;
      if (mounted && wrapEl.parentNode) {
        wrapEl.parentNode.removeChild(wrapEl);
        mounted = false;
      }
    },
  };

  return drawer;
}

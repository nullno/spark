/**
 * BackTop 回到顶部 — 原生 DOM 实现
 */
import { D, W, addEventListener } from "../common.js";

export default function (p) {
  !p && (p = {});
  var visibilityHeight = p.visibilityHeight || 400;
  var duration = p.duration || 450;
  var right = p.right || 40;
  var bottom = p.bottom || 40;
  var onClick = p.onClick || null;

  var el = D.createElement("div");
  el.style.cssText =
    "position:fixed;right:" + right + "px;bottom:" + bottom + "px;z-index:1010;" +
    "width:40px;height:40px;border-radius:50%;background-color:#fff;" +
    "box-shadow:0 3px 6px rgba(0,0,0,0.12);cursor:pointer;" +
    "display:flex;align-items:center;justify-content:center;" +
    "opacity:0;pointer-events:none;transition:opacity 0.3s,transform 0.3s,box-shadow 0.2s;" +
    "transform:translateY(20px);";

  var arrow = D.createElement("span");
  arrow.style.cssText = "font-size:18px;color:#4B95FF;font-weight:bold;line-height:1;";
  arrow.textContent = "\u2191";
  el.appendChild(arrow);

  el.addEventListener("mouseenter", function () {
    el.style.boxShadow = "0 6px 16px rgba(0,0,0,0.16)";
    el.style.transform = "translateY(-2px)";
  });
  el.addEventListener("mouseleave", function () {
    var scrollTop = W.pageYOffset || D.documentElement.scrollTop;
    if (scrollTop > visibilityHeight) {
      el.style.boxShadow = "0 3px 6px rgba(0,0,0,0.12)";
      el.style.transform = "translateY(0)";
    }
  });

  function smoothScrollTop() {
    var start = W.pageYOffset || D.documentElement.scrollTop;
    var startTime = Date.now();
    function step() {
      var elapsed = Date.now() - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      W.scrollTo(0, start * (1 - ease));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  el.addEventListener("click", function () {
    smoothScrollTop();
    if (onClick) onClick();
  });

  addEventListener(W, "scroll", function () {
    var scrollTop = W.pageYOffset || D.documentElement.scrollTop;
    if (scrollTop > visibilityHeight) {
      el.style.opacity = "1";
      el.style.pointerEvents = "auto";
      el.style.transform = "translateY(0)";
    } else {
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      el.style.transform = "translateY(20px)";
    }
  });

  // auto mount
  var mounted = false;
  var backTop = {
    mount: function () {
      if (!mounted) { D.body.appendChild(el); mounted = true; }
    },
    unmount: function () {
      if (mounted && el.parentNode) { el.parentNode.removeChild(el); mounted = false; }
    },
    el: el,
  };

  if (D.body) {
    backTop.mount();
  } else {
    addEventListener(D, "DOMContentLoaded", function () { backTop.mount(); });
  }

  return backTop;
};

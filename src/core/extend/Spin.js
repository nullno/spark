/**
 * Spin 加载中
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var size = p.size || "default";
  var tip = p.tip || "";
  var spinning = p.spinning !== false;

  var sizeMap = { small: "20px", default: "32px", large: "44px" };
  var dotSize = sizeMap[size] || sizeMap["default"];
  var borderWidth = size === "small" ? "2px" : "3px";

  var spinner = WidgetManager.Box({
    style: "width:" + dotSize + ";height:" + dotSize +
      ";border:" + borderWidth + " solid #f0f0f0;border-top:" + borderWidth + " solid #4B95FF;" +
      "border-radius:50%;animation:sparkSpin 0.8s linear infinite;display:inline-block;",
  });

  var children = [spinner];

  if (tip) {
    children.push(WidgetManager.Text(tip, {
      style: "margin-top:8px;font-size:" + (size === "small" ? "12" : "14") + "px;color:#4B95FF;",
    }));
  }

  var container = WidgetManager.Box({
    style: "display:" + (spinning ? "inline-flex" : "none") +
      ";flex-direction:column;align-items:center;justify-content:center;" + (p.style || ""),
    child: children,
    show: spinning,
  });

  // Inject keyframes
  container.$_init = function () {
    if (!document.getElementById("spark-spin-keyframes")) {
      var style = document.createElement("style");
      style.id = "spark-spin-keyframes";
      style.textContent = "@keyframes sparkSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";
      document.head.appendChild(style);
    }
  };

  container.setSpinning = function (val) {
    spinning = val;
    container.show = val;
  };

  return container;
};

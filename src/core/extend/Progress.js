/**
 * Progress 进度条
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var percent = p.percent || 0;
  var type = p.type || "line";
  var status = p.status || "active";
  var showInfo = p.showInfo !== false;
  var strokeColor = p.strokeColor || "#4B95FF";
  var trailColor = p.trailColor || "#f5f5f5";
  var strokeWidth = p.strokeWidth || 8;
  var size = p.size || 120;

  var statusColors = {
    active: strokeColor,
    success: "#52c41a",
    exception: "#f5222d",
  };
  var barColor = statusColors[status] || strokeColor;

  if (type === "circle") {
    var r = (size - strokeWidth) / 2;
    var circumference = 2 * Math.PI * r;
    var offset = circumference - (percent / 100) * circumference;

    var statusIcon = "";
    if (status === "success") statusIcon = "\u2713";
    else if (status === "exception") statusIcon = "\u2717";
    else statusIcon = percent + "%";

    var infoText = WidgetManager.Text(statusIcon, {
      style:
        "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);" +
        "font-size:" + (size * 0.2) + "px;color:" + barColor + ";font-weight:600;",
    });

    var wrapper = WidgetManager.Stack({
      style:
        "width:" + size + "px;height:" + size + "px;display:inline-block;" +
        "background-color:transparent;" + (p.style || ""),
      child: showInfo ? [infoText] : [],
    });

    wrapper.setPercent = function (val) {
      percent = val;
      if (showInfo) infoText.text = val + "%";
    };

    return wrapper;
  }

  // Line type progress
  var inner = WidgetManager.Box({
    style:
      "width:" + percent + "%;height:100%;background-color:" + barColor +
      ";border-radius:" + strokeWidth + "px;transition:width 0.3s ease;",
  });

  var bar = WidgetManager.Box({
    style:
      "flex:1;height:" + strokeWidth + "px;background-color:" + trailColor +
      ";border-radius:" + strokeWidth + "px;overflow:hidden;",
    child: [inner],
  });

  var children = [bar];

  if (showInfo) {
    var infoStr = "";
    if (status === "success") infoStr = "\u2713";
    else if (status === "exception") infoStr = "\u2717";
    else infoStr = percent + "%";

    var info = WidgetManager.Text(infoStr, {
      style:
        "margin-left:8px;font-size:14px;color:" + barColor +
        ";min-width:40px;white-space:nowrap;",
    });
    children.push(info);
  }

  var progress = WidgetManager.Box({
    style:
      "display:flex;align-items:center;" + (p.style || ""),
    child: children,
  });

  progress.setPercent = function (val) {
    percent = val;
    inner.style = "width:" + val + "%;";
    if (showInfo) {
      info.text = val + "%";
    }
  };

  progress.setStatus = function (s) {
    status = s;
    var c = statusColors[s] || strokeColor;
    inner.style = "background-color:" + c + ";width:" + percent + "%;";
    if (showInfo) {
      var t = s === "success" ? "\u2713" : s === "exception" ? "\u2717" : percent + "%";
      info.text = t;
      info.style = "color:" + c + ";";
    }
  };

  return progress;
};

/**
 * Result 结果页
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var status = p.status || "info"; // success, error, warning, info
  var title = p.title || "";
  var subTitle = p.subTitle || "";
  var extra = p.extra || null;

  var iconMap = {
    success: { icon: "\u2714", color: "#52c41a" },
    error: { icon: "\u2718", color: "#ff4d4f" },
    warning: { icon: "\u26A0", color: "#faad14" },
    info: { icon: "\u2139", color: "#4B95FF" },
  };

  var cfg = iconMap[status] || iconMap.info;

  var children = [];

  // Icon
  children.push(WidgetManager.Text(cfg.icon, {
    style: "font-size:48px;color:" + cfg.color + ";margin-bottom:24px;",
  }));

  // Title
  if (title) {
    children.push(WidgetManager.Text(title, {
      style: "font-size:24px;color:rgba(0,0,0,0.85);font-weight:500;margin-bottom:8px;",
    }));
  }

  // SubTitle
  if (subTitle) {
    children.push(WidgetManager.Text(subTitle, {
      style: "font-size:14px;color:rgba(0,0,0,0.45);margin-bottom:24px;",
    }));
  }

  // Extra (buttons etc.)
  if (extra) {
    var extraChildren = Array.isArray(extra) ? extra : [extra];
    children.push(WidgetManager.Box({
      style: "display:flex;gap:8px;justify-content:center;",
      child: extraChildren,
    }));
  }

  return WidgetManager.Box({
    style: "display:flex;flex-direction:column;align-items:center;padding:48px 32px;" + (p.style || ""),
    child: children,
  });
};

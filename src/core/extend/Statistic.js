/**
 * Statistic 统计数值
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var title = p.title || "";
  var value = p.value !== undefined ? p.value : 0;
  var prefix = p.prefix || "";
  var suffix = p.suffix || "";
  var precision = p.precision !== undefined ? p.precision : null;
  var valueStyle = p.valueStyle || "";

  var displayValue = precision !== null ? Number(value).toFixed(precision) : String(value);

  var children = [];

  if (title) {
    children.push(WidgetManager.Text(title, {
      style: "font-size:14px;color:rgba(0,0,0,0.45);margin-bottom:4px;",
    }));
  }

  var valueChildren = [];
  if (prefix) {
    var prefixWidget = typeof prefix === "string"
      ? WidgetManager.Text(prefix, { style: "margin-right:4px;font-size:24px;color:rgba(0,0,0,0.85);" })
      : prefix;
    valueChildren.push(prefixWidget);
  }

  var valueText = WidgetManager.Text(displayValue, {
    style: "font-size:24px;font-weight:600;color:rgba(0,0,0,0.85);" + valueStyle,
  });
  valueChildren.push(valueText);

  if (suffix) {
    var suffixWidget = typeof suffix === "string"
      ? WidgetManager.Text(suffix, { style: "margin-left:4px;font-size:16px;color:rgba(0,0,0,0.85);" })
      : suffix;
    valueChildren.push(suffixWidget);
  }

  children.push(WidgetManager.Box({
    style: "display:flex;align-items:baseline;",
    child: valueChildren,
  }));

  var container = WidgetManager.Box({
    style: (p.style || ""),
    child: children,
  });

  container.setValue = function (val) {
    value = val;
    var dv = precision !== null ? Number(val).toFixed(precision) : String(val);
    valueText.text = dv;
  };

  return container;
};

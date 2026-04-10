/**
 * Badge 徽标数
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var count = p.count || 0;
  var maxCount = p.maxCount || 99;
  var dot = p.dot || false;
  var color = p.color || "#ff4d4f";
  var showZero = p.showZero || false;

  var displayText = count > maxCount ? maxCount + "+" : String(count);

  var badge;
  if (dot) {
    badge = WidgetManager.Box({
      style:
        "position:absolute;top:-4px;right:-4px;width:8px;height:8px;border-radius:50%;background-color:" +
        color + ";",
      show: count > 0 || showZero,
    });
  } else {
    badge = WidgetManager.Text(displayText, {
      style:
        "position:absolute;top:-8px;right:-8px;min-width:20px;height:20px;line-height:20px;" +
        "padding:0 6px;border-radius:10px;background-color:" + color +
        ";color:#fff;font-size:12px;text-align:center;white-space:nowrap;",
      show: count > 0 || showZero,
    });
  }

  var wrapper = WidgetManager.Box({
    style: "position:relative;display:inline-block;" + (p.style || ""),
    child: (p.child || []).concat([badge]),
  });

  wrapper.setCount = function (val) {
    count = val;
    if (dot) {
      badge.show = val > 0 || showZero;
    } else {
      badge.text = val > maxCount ? maxCount + "+" : String(val);
      badge.show = val > 0 || showZero;
    }
  };

  return wrapper;
};

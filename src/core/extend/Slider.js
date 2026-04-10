/**
 * Slider 滑动输入条
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var min = p.min || 0;
  var max = p.max || 100;
  var value = p.value || 0;
  var step = p.step || 1;
  var disabled = p.disabled || false;
  var onChange = p.onChange || null;
  var trackColor = p.trackColor || "#4B95FF";
  var railColor = p.railColor || "#f5f5f5";
  var showTooltip = p.showTooltip !== false;

  var percent = ((value - min) / (max - min)) * 100;

  // Track (filled part)
  var track = WidgetManager.Box({
    style:
      "position:absolute;left:0;top:0;height:100%;width:" + percent +
      "%;background-color:" + trackColor + ";border-radius:2px;transition:width 0.1s;",
  });

  // Rail
  var rail = WidgetManager.Box({
    style:
      "width:100%;height:4px;background-color:" + railColor +
      ";border-radius:2px;position:relative;",
    child: [track],
  });

  // Tooltip
  var tooltip = showTooltip
    ? WidgetManager.Box({
        style:
          "position:absolute;bottom:100%;left:50%;transform:translateX(-50%);" +
          "margin-bottom:8px;background:rgba(0,0,0,0.75);color:#fff;padding:2px 8px;" +
          "border-radius:4px;font-size:12px;white-space:nowrap;pointer-events:none;" +
          "opacity:0;transition:opacity 0.2s;",
        child: [WidgetManager.Text(String(value), { style: "" })],
      })
    : null;

  // Handle
  var handleChildren = tooltip ? [tooltip] : [];
  var handle = WidgetManager.Box({
    style:
      "position:absolute;top:50%;left:" + percent + "%;transform:translate(-50%,-50%);" +
      "width:14px;height:14px;background:#fff;border:2px solid " + trackColor +
      ";border-radius:50%;cursor:" + (disabled ? "not-allowed" : "pointer") +
      ";transition:box-shadow 0.2s,left 0.1s;z-index:1;",
    child: handleChildren,
    on: !disabled ? {
      hover: function () {
        this.style = "box-shadow:0 0 0 5px rgba(75,149,255,0.12);";
        if (tooltip) tooltip.style = "opacity:1;";
      },
      out: function () {
        this.style = "box-shadow:none;";
        if (tooltip) tooltip.style = "opacity:0;";
      },
    } : null,
  });

  var wrapper = WidgetManager.Box({
    style:
      "position:relative;height:4px;cursor:" + (disabled ? "not-allowed" : "pointer") +
      ";padding:8px 0;display:flex;align-items:center;" + (p.style || ""),
    child: [rail, handle],
    on: !disabled ? {
      click: function (e) {
        if (e && this.$el) {
          var rect = this.$el.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var pct = Math.max(0, Math.min(1, x / rect.width));
          var raw = min + pct * (max - min);
          value = Math.round(raw / step) * step;
          value = Math.max(min, Math.min(max, value));
          percent = ((value - min) / (max - min)) * 100;
          track.style = "width:" + percent + "%;";
          handle.style = "left:" + percent + "%;";
          if (tooltip && tooltip.getChild) {
            tooltip.getChild(0).text = String(value);
          }
          if (onChange) onChange(value);
        }
      },
    } : null,
  });

  wrapper.setValue = function (val) {
    value = Math.max(min, Math.min(max, val));
    percent = ((value - min) / (max - min)) * 100;
    track.style = "width:" + percent + "%;";
    handle.style = "left:" + percent + "%;";
  };

  wrapper.getValue = function () {
    return value;
  };

  return wrapper;
};

/**
 * InputNumber 数字输入框
 */
import WidgetManager from "../WidgetManager.js";
import WidgetParse from "../WidgetParse.js";

export default function (p) {
  !p && (p = {});
  var value = p.value !== undefined ? p.value : 0;
  var min = p.min !== undefined ? p.min : -Infinity;
  var max = p.max !== undefined ? p.max : Infinity;
  var step = p.step || 1;
  var disabled = p.disabled || false;
  var onChange = p.onChange || null;
  var precision = p.precision !== undefined ? p.precision : null;

  function formatVal(v) {
    v = Math.min(max, Math.max(min, v));
    return precision !== null ? parseFloat(v.toFixed(precision)) : v;
  }

  value = formatVal(value);

  var display = WidgetManager.Text(String(value), {
    style: "min-width:40px;text-align:center;font-size:14px;color:#333;line-height:30px;padding:0 8px;" +
      "border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9;user-select:none;",
  });

  var decBtn = WidgetManager.Text("\u2212", {
    style: "width:32px;height:32px;line-height:32px;text-align:center;cursor:" +
      (disabled || value <= min ? "not-allowed" : "pointer") +
      ";font-size:14px;color:" + (disabled || value <= min ? "#d9d9d9" : "#666") +
      ";transition:color 0.2s;user-select:none;",
    shover: disabled || value <= min ? null : { color: "#4B95FF" },
    on: disabled ? null : {
      click: function () {
        var newVal = formatVal(value - step);
        if (newVal !== value) {
          value = newVal;
          display.text = String(value);
          updateBtnState();
          onChange && onChange(value);
        }
      },
    },
  });

  var incBtn = WidgetManager.Text("+", {
    style: "width:32px;height:32px;line-height:32px;text-align:center;cursor:" +
      (disabled || value >= max ? "not-allowed" : "pointer") +
      ";font-size:14px;color:" + (disabled || value >= max ? "#d9d9d9" : "#666") +
      ";transition:color 0.2s;user-select:none;",
    shover: disabled || value >= max ? null : { color: "#4B95FF" },
    on: disabled ? null : {
      click: function () {
        var newVal = formatVal(value + step);
        if (newVal !== value) {
          value = newVal;
          display.text = String(value);
          updateBtnState();
          onChange && onChange(value);
        }
      },
    },
  });

  function updateBtnState() {
    decBtn.style = "color:" + (value <= min ? "#d9d9d9" : "#666") +
      ";cursor:" + (value <= min ? "not-allowed" : "pointer") + ";";
    incBtn.style = "color:" + (value >= max ? "#d9d9d9" : "#666") +
      ";cursor:" + (value >= max ? "not-allowed" : "pointer") + ";";
  }

  var container = WidgetManager.Box({
    style: "display:inline-flex;align-items:center;border:1px solid #d9d9d9;border-radius:4px;" +
      "background-color:" + (disabled ? "#f5f5f5" : "#fff") + ";" + (p.style || ""),
    child: [decBtn, display, incBtn],
  });

  container.getValue = function () { return value; };
  container.setValue = function (val) {
    value = formatVal(val);
    display.text = String(value);
    updateBtnState();
  };

  return container;
};

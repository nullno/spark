/**
 * Textarea 多行文本
 */
import WidgetManager from "../WidgetManager.js";
import WidgetParse from "../WidgetParse.js";

export default function (p) {
  !p && (p = {});
  var value = p.value || "";
  var placeholder = p.placeholder || "";
  var disabled = p.disabled || false;
  var maxLength = p.maxLength || null;
  var rows = p.rows || 4;
  var showCount = p.showCount || false;
  var onChange = p.onChange || null;

  var inputP = {
    value: value,
    placeholder: placeholder,
    enable: !disabled,
    multiline: true,
    style: "min-height:" + (rows * 22) + "px;line-height:22px;resize:vertical;" +
      "border:1px solid #d9d9d9;border-radius:4px;padding:8px 12px;font-size:14px;" +
      "background-color:" + (disabled ? "#f5f5f5" : "#fff") + ";width:100%;box-sizing:border-box;" +
      (p.style || ""),
    placeholderStyle: "color:#bfbfbf;",
    onStyle: "box-shadow:0 0 0 2px rgba(75,149,255,0.2);border-color:#4B95FF;",
    offStyle: "border-color:#d9d9d9;",
    on: {
      inputing: function (e) {
        if (maxLength && this.value.length > maxLength) {
          this.value = this.value.substring(0, maxLength);
        }
        value = this.value;
        if (showCount && countWidget) {
          countWidget.text = value.length + (maxLength ? "/" + maxLength : "");
        }
        onChange && onChange(value);
      },
    },
  };

  var textarea = WidgetManager.Input(inputP);

  if (!showCount) {
    return textarea;
  }

  var countText = value.length + (maxLength ? "/" + maxLength : "");
  var countWidget = WidgetManager.Text(countText, {
    style: "font-size:12px;color:rgba(0,0,0,0.45);text-align:right;margin-top:4px;",
  });

  var container = WidgetManager.Box({
    style: "display:flex;flex-direction:column;",
    child: [textarea, countWidget],
  });

  container.getValue = function () { return value; };
  container.setValue = function (val) {
    value = val;
    textarea.value = val;
    if (countWidget) {
      countWidget.text = val.length + (maxLength ? "/" + maxLength : "");
    }
  };

  return container;
};

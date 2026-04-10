/**
 * Select 下拉选择器
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var options = p.options || [];
  var value = p.value !== undefined ? p.value : "";
  var placeholder = p.placeholder || "请选择";
  var disabled = p.disabled || false;
  var width = p.width || "200px";
  var onChange = p.onChange || null;
  var isOpen = false;

  function getLabel(val) {
    for (var i = 0; i < options.length; i++) {
      var opt = typeof options[i] === "object" ? options[i] : { label: options[i], value: options[i] };
      if (opt.value === val) return opt.label;
    }
    return "";
  }

  var displayText = getLabel(value) || placeholder;
  var isPlaceholder = !getLabel(value);

  var labelWidget = WidgetManager.Text(displayText, {
    style: "flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:" +
      (isPlaceholder ? "#bfbfbf" : "#333") + ";font-size:14px;",
  });

  var arrow = WidgetManager.Text("\u25BC", {
    style: "font-size:10px;color:#999;transition:transform 0.2s;margin-left:8px;",
  });

  // Build option items
  var optionWidgets = [];
  var optionItems = [];

  options.forEach(function (opt, idx) {
    var optObj = typeof opt === "object" ? opt : { label: opt, value: opt };
    var item = WidgetManager.Text(optObj.label, {
      style: "padding:8px 12px;font-size:14px;cursor:pointer;white-space:nowrap;border-radius:6px;color:" +
        (optObj.value === value ? "#4B95FF" : "#333") + ";background-color:" +
        (optObj.value === value ? "#e6f7ff" : "transparent") + ";transition:all 0.15s;",
      shover: { "background-color": "#f5f5f5" },
      on: {
        click: function () {
          value = optObj.value;
          labelWidget.text = optObj.label;
          labelWidget.style = "color:#333;";
          // Update all items highlight
          optionItems.forEach(function (w, i) {
            var ov = typeof options[i] === "object" ? options[i].value : options[i];
            w.style = "color:" + (ov === value ? "#4B95FF" : "#333") +
              ";background-color:" + (ov === value ? "#e6f7ff" : "transparent") + ";";
          });
          dropdown.show = false;
          arrow.style = "transform:rotate(0deg);";
          isOpen = false;
          onChange && onChange(value);
        },
      },
    });
    optionItems.push(item);
    optionWidgets.push(item);
  });

  var dropdown = WidgetManager.Box({
    style: "position:absolute;top:100%;left:0;right:0;background-color:#fff;" +
      "border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.1);" +
      "max-height:256px;overflow-y:auto;z-index:1050;margin-top:4px;padding:4px;",
    child: optionWidgets,
    show: false,
    stopProp: true,
  });

  var selectBox = WidgetManager.Box({
    style: "position:relative;display:inline-block;width:" + width + ";" + (p.style || ""),
    child: [
      WidgetManager.Box({
        style: "display:flex;align-items:center;padding:4px 12px;min-height:36px;" +
          "border:1px solid #e2e8f0;border-radius:8px;background-color:" + (disabled ? "#f5f5f5" : "#fff") +
          ";cursor:" + (disabled ? "not-allowed" : "pointer") + ";transition:all 0.2s;",
        child: [labelWidget, arrow],
        shover: disabled ? null : { "border-color": "#4B95FF" },
        on: disabled ? null : {
          click: function () {
            isOpen = !isOpen;
            dropdown.show = isOpen;
            arrow.style = isOpen ? "transform:rotate(180deg);" : "transform:rotate(0deg);";
          },
        },
      }),
      dropdown,
    ],
  });

  // Close on outside click
  selectBox.$_init = function () {
    document.addEventListener("click", function () {
      if (isOpen) {
        isOpen = false;
        dropdown.show = false;
        arrow.style = "transform:rotate(0deg);";
      }
    });
  };

  selectBox.getValue = function () { return value; };
  selectBox.setValue = function (val) {
    value = val;
    var lbl = getLabel(val);
    labelWidget.text = lbl || placeholder;
    labelWidget.style = lbl ? "color:#333;" : "color:#bfbfbf;";
    optionItems.forEach(function (w, i) {
      var ov = typeof options[i] === "object" ? options[i].value : options[i];
      w.style = "color:" + (ov === value ? "#4B95FF" : "#333") +
        ";background-color:" + (ov === value ? "#e6f7ff" : "transparent") + ";";
    });
  };

  return selectBox;
};

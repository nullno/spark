/**
 * ColorPicker 颜色选择器
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var value = p.value || "#4B95FF";
  var onChange = p.onChange || null;
  var isOpen = false;

  var presetColors = p.presetColors || [
    "#ff4d4f", "#ff7a45", "#ffa940", "#ffc53d", "#ffec3d",
    "#a0d911", "#52c41a", "#13c2c2", "#1890ff", "#4B95FF",
    "#722ed1", "#eb2f96", "#333333", "#666666", "#999999",
    "#cccccc", "#f5f5f5", "#ffffff",
  ];

  var colorPreview = WidgetManager.Box({
    style: "width:24px;height:24px;border-radius:4px;background-color:" + value +
      ";border:1px solid #d9d9d9;cursor:pointer;",
  });

  var colorText = WidgetManager.Text(value, {
    style: "font-size:14px;color:#333;margin-left:8px;font-family:monospace;",
  });

  var colorGrid = [];
  presetColors.forEach(function (color) {
    colorGrid.push(WidgetManager.Box({
      style: "width:24px;height:24px;border-radius:3px;background-color:" + color +
        ";cursor:pointer;border:2px solid " + (color === value ? "#4B95FF" : "transparent") +
        ";transition:border-color 0.15s;",
      shover: { "border-color": "#4B95FF" },
      on: {
        click: function () {
          value = color;
          colorPreview.style = "background-color:" + color + ";";
          colorText.text = color;
          // Update grid borders
          colorGrid.forEach(function (g, i) {
            g.style = "background-color:" + presetColors[i] +
              ";border-color:" + (presetColors[i] === value ? "#4B95FF" : "transparent") + ";";
          });
          isOpen = false;
          dropdown.show = false;
          onChange && onChange(value);
        },
      },
    }));
  });

  var dropdown = WidgetManager.Box({
    style: "position:absolute;top:100%;left:0;margin-top:4px;background-color:#fff;" +
      "border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.15);" +
      "z-index:1050;padding:12px;display:grid;grid-template-columns:repeat(6,1fr);gap:8px;",
    child: colorGrid,
    show: false,
    stopProp: true,
  });

  var trigger = WidgetManager.Box({
    style: "display:inline-flex;align-items:center;padding:4px 8px;border:1px solid #d9d9d9;" +
      "border-radius:4px;cursor:pointer;background-color:#fff;transition:border-color 0.2s;",
    child: [colorPreview, colorText],
    shover: { "border-color": "#4B95FF" },
    on: {
      click: function () {
        isOpen = !isOpen;
        dropdown.show = isOpen;
      },
    },
  });

  var container = WidgetManager.Box({
    style: "position:relative;display:inline-block;" + (p.style || ""),
    child: [trigger, dropdown],
  });

  container.$_init = function () {
    document.addEventListener("click", function () {
      if (isOpen) { isOpen = false; dropdown.show = false; }
    });
  };

  container.getValue = function () { return value; };
  container.setValue = function (val) {
    value = val;
    colorPreview.style = "background-color:" + val + ";";
    colorText.text = val;
  };

  return container;
};

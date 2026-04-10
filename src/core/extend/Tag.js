/**
 * Tag 标签
 */
import WidgetManager from "../WidgetManager.js";

var presetColors = {
  blue: { bg: "#e6f7ff", border: "#91d5ff", text: "#1890ff" },
  green: { bg: "#f6ffed", border: "#b7eb8f", text: "#52c41a" },
  red: { bg: "#fff1f0", border: "#ffa39e", text: "#f5222d" },
  orange: { bg: "#fff7e6", border: "#ffd591", text: "#fa8c16" },
  gold: { bg: "#fffbe6", border: "#ffe58f", text: "#faad14" },
  cyan: { bg: "#e6fffb", border: "#87e8de", text: "#13c2c2" },
  purple: { bg: "#f9f0ff", border: "#d3adf7", text: "#722ed1" },
  magenta: { bg: "#fff0f6", border: "#ffadd2", text: "#eb2f96" },
  default: { bg: "#fafafa", border: "#d9d9d9", text: "#666" },
};

export default function (text, p) {
  !p && (p = {});
  var color = p.color || "default";
  var closable = p.closable || false;
  var preset = presetColors[color] || presetColors["default"];

  if (p.customColor) {
    preset = { bg: p.customColor, border: p.customColor, text: "#fff" };
  }

  var children = [
    WidgetManager.Text(text || "", {
      style: "font-size:12px;line-height:20px;",
    }),
  ];

  if (closable) {
    children.push(
      WidgetManager.Text("\u00d7", {
        style:
          "margin-left:4px;cursor:pointer;font-size:14px;color:" +
          preset.text + ";opacity:0.6;",
        shover: { opacity: "1" },
        on: {
          click: function (e) {
            e.stopPropagation();
            tag.show = false;
            p.onClose && p.onClose();
          },
        },
      })
    );
  }

  var tag = WidgetManager.Box({
    style:
      "display:inline-flex;align-items:center;padding:0 8px;height:22px;border-radius:4px;" +
      "background-color:" + preset.bg + ";border:1px solid " + preset.border +
      ";color:" + preset.text + ";font-size:12px;margin:0 4px 4px 0;" +
      "transition:all 0.2s;" + (p.style || ""),
    child: children,
    on: p.on || null,
  });

  tag.setText = function (val) {
    children[0].text = val;
  };

  return tag;
};

/**
 * Steps 步骤条
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var items = p.items || [];
  var current = p.current || 0;
  var direction = p.direction || "horizontal";
  var size = p.size || "default";
  var onChange = p.onChange || null;

  var iconSize = size === "small" ? 24 : 32;
  var fontSize = size === "small" ? 12 : 14;
  var stepRefs = [];

  function getStepStyle(idx) {
    if (idx < current) return { bg: "#4B95FF", color: "#fff", borderColor: "#4B95FF", titleColor: "rgba(0,0,0,0.85)" };
    if (idx === current) return { bg: "#4B95FF", color: "#fff", borderColor: "#4B95FF", titleColor: "rgba(0,0,0,0.85)" };
    return { bg: "#fff", color: "rgba(0,0,0,0.25)", borderColor: "rgba(0,0,0,0.25)", titleColor: "rgba(0,0,0,0.45)" };
  }

  var stepChildren = [];
  for (var i = 0; i < items.length; i++) {
    (function (idx) {
      var item = items[idx];
      var s = getStepStyle(idx);

      var iconContent = idx < current ? "\u2713" : String(idx + 1);

      var icon = WidgetManager.Box({
        style:
          "width:" + iconSize + "px;height:" + iconSize + "px;border-radius:50%;" +
          "background-color:" + s.bg + ";color:" + s.color + ";border:2px solid " + s.borderColor + ";" +
          "display:flex;align-items:center;justify-content:center;font-size:" + fontSize + "px;" +
          "font-weight:500;flex-shrink:0;transition:all 0.3s;",
        child: [WidgetManager.Text(iconContent, { style: "line-height:1;" })],
      });

      var titleText = WidgetManager.Text(item.title || "", {
        style:
          "font-size:" + fontSize + "px;color:" + s.titleColor + ";font-weight:500;" +
          "margin-" + (direction === "horizontal" ? "left" : "top") + ":8px;" +
          "white-space:nowrap;transition:color 0.3s;",
      });

      var descText = item.description
        ? WidgetManager.Text(item.description, {
            style:
              "font-size:12px;color:rgba(0,0,0,0.45);margin-top:4px;" +
              (direction === "horizontal" ? "margin-left:" + (iconSize + 8) + "px;" : ""),
          })
        : null;

      var stepContent = [];
      if (direction === "horizontal") {
        var row = WidgetManager.Box({
          style: "display:flex;align-items:center;",
          child: [icon, titleText],
        });
        stepContent.push(row);
        if (descText) stepContent.push(descText);
      } else {
        stepContent.push(icon);
        var textCol = [titleText];
        if (descText) textCol.push(descText);
        var colBox = WidgetManager.Box({
          style: "margin-left:8px;padding-bottom:24px;",
          child: textCol,
        });
        stepContent = [
          WidgetManager.Box({
            style: "display:flex;",
            child: [icon, colBox],
          }),
        ];
      }

      // Connector line (not for last item)
      if (idx < items.length - 1 && direction === "horizontal") {
        var lineColor = idx < current ? "#4B95FF" : "#f0f0f0";
        var line = WidgetManager.Box({
          style:
            "flex:1;height:2px;background-color:" + lineColor +
            ";margin:0 12px;align-self:center;min-width:24px;transition:background-color 0.3s;border-radius:1px;",
        });
        stepRefs.push({ icon: icon, title: titleText, desc: descText, line: line });
      } else {
        stepRefs.push({ icon: icon, title: titleText, desc: descText, line: null });
      }

      var step = WidgetManager.Box({
        style:
          (direction === "horizontal" ? "flex:1;display:flex;align-items:center;" : "") +
          "cursor:" + (onChange ? "pointer" : "default") + ";",
        child: direction === "horizontal"
          ? (idx < items.length - 1 ? [WidgetManager.Box({ style: "flex-shrink:0;", child: stepContent }), stepRefs[idx].line] : stepContent)
          : stepContent,
        on: onChange
          ? {
              click: function () {
                steps.setCurrent(idx);
                onChange(idx);
              },
            }
          : null,
      });

      stepChildren.push(step);
    })(i);
  }

  var steps = WidgetManager.Box({
    style:
      "display:flex;" +
      (direction === "horizontal" ? "align-items:center;" : "flex-direction:column;") +
      (p.style || ""),
    child: stepChildren,
  });

  steps.setCurrent = function (val) {
    current = val;
    for (var j = 0; j < items.length; j++) {
      var s = getStepStyle(j);
      var ref = stepRefs[j];
      var iconContent = j < current ? "\u2713" : String(j + 1);
      ref.icon.style =
        "background-color:" + s.bg + ";color:" + s.color + ";border-color:" + s.borderColor + ";";
      ref.title.style = "color:" + s.titleColor + ";";
      if (ref.line) {
        ref.line.style = "background-color:" + (j < current ? "#4B95FF" : "#f0f0f0") + ";";
      }
    }
  };

  return steps;
};

/**
 * Form 表单容器
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var fields = p.fields || [];
  var layout = p.layout || "horizontal"; // horizontal, vertical, inline
  var labelWidth = p.labelWidth || "100px";
  var onSubmit = p.onSubmit || null;

  var fieldRefs = {};
  var formChildren = [];

  fields.forEach(function (field) {
    var label = WidgetManager.Text(field.label || "", {
      style: "font-size:14px;color:rgba(0,0,0,0.85);font-weight:500;" +
        (layout === "horizontal" ? "width:" + labelWidth + ";flex-shrink:0;text-align:right;padding-right:12px;" : "margin-bottom:8px;") +
        (field.required ? "" : ""),
    });

    var required = field.required
      ? WidgetManager.Text("*", { style: "color:#ff4d4f;margin-right:4px;font-size:14px;" })
      : null;

    var labelRow = required
      ? WidgetManager.Box({
          style: "display:flex;align-items:" + (layout === "horizontal" ? "center" : "flex-start") + ";" +
            (layout === "horizontal" ? "width:" + labelWidth + ";flex-shrink:0;justify-content:flex-end;padding-right:12px;" : "margin-bottom:8px;"),
          child: [required, label],
        })
      : label;

    // The control widget
    var control = field.children || WidgetManager.Box({ style: "flex:1;" });
    fieldRefs[field.name || field.label] = control;

    // Error message
    var errorWidget = WidgetManager.Text("", {
      style: "font-size:12px;color:#ff4d4f;margin-top:4px;min-height:20px;",
      show: false,
    });

    var controlWrap = WidgetManager.Box({
      style: "flex:1;",
      child: [control, errorWidget],
    });

    var itemStyle = layout === "inline"
      ? "display:inline-flex;align-items:flex-start;margin-right:16px;margin-bottom:16px;"
      : layout === "horizontal"
      ? "display:flex;align-items:flex-start;margin-bottom:16px;"
      : "display:flex;flex-direction:column;margin-bottom:16px;";

    var item = WidgetManager.Box({
      style: itemStyle,
      child: [labelRow, controlWrap],
    });

    formChildren.push(item);
  });

  // Submit button area
  if (onSubmit) {
    var submitBtn = WidgetManager.Button(p.submitText || "提交", {
      on: {
        click: function () {
          var values = {};
          for (var key in fieldRefs) {
            var ref = fieldRefs[key];
            values[key] = ref.getValue ? ref.getValue() : (ref.value !== undefined ? ref.value : "");
          }
          onSubmit(values);
        },
      },
    });

    var btnRow = WidgetManager.Box({
      style: (layout === "horizontal" ? "padding-left:" + labelWidth + ";" : "") + "margin-top:8px;",
      child: [submitBtn],
    });
    formChildren.push(btnRow);
  }

  var form = WidgetManager.Box({
    style: (layout === "inline" ? "display:flex;flex-wrap:wrap;align-items:flex-start;" : "") + (p.style || ""),
    child: formChildren,
  });

  form.getFieldValue = function (name) {
    var ref = fieldRefs[name];
    return ref ? (ref.getValue ? ref.getValue() : ref.value) : undefined;
  };

  form.getFieldValues = function () {
    var values = {};
    for (var key in fieldRefs) {
      var ref = fieldRefs[key];
      values[key] = ref.getValue ? ref.getValue() : (ref.value !== undefined ? ref.value : "");
    }
    return values;
  };

  return form;
};

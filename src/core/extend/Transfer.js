/**
 * Transfer 穿梭框
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var dataSource = p.dataSource || [];
  var targetKeys = p.targetKeys ? p.targetKeys.slice() : [];
  var onChange = p.onChange || null;
  var titles = p.titles || ["源列表", "目标列表"];
  var width = p.itemWidth || "220px";

  var leftSelected = [];
  var rightSelected = [];

  function isTarget(key) { return targetKeys.indexOf(key) > -1; }

  var leftList, rightList, leftCountText, rightCountText;

  function buildItem(item, side) {
    var isChecked = side === "left" ? leftSelected.indexOf(item.key) > -1 : rightSelected.indexOf(item.key) > -1;
    var checkbox = WidgetManager.Checkbox(item.title || item.key, {
      checked: isChecked,
      disabled: item.disabled || false,
      onChange: function (val) {
        var arr = side === "left" ? leftSelected : rightSelected;
        var idx = arr.indexOf(item.key);
        if (val && idx === -1) arr.push(item.key);
        if (!val && idx > -1) arr.splice(idx, 1);
      },
    });
    return WidgetManager.Box({
      style: "padding:8px 12px;transition:background-color 0.15s;",
      child: [checkbox],
      shover: { "background-color": "#f5f5f5" },
    });
  }

  function render() {
    leftList.empty();
    rightList.empty();
    leftSelected = [];
    rightSelected = [];
    var leftCount = 0, rightCount = 0;

    dataSource.forEach(function (item) {
      if (isTarget(item.key)) {
        rightList.append(buildItem(item, "right"));
        rightCount++;
      } else {
        leftList.append(buildItem(item, "left"));
        leftCount++;
      }
    });

    leftCountText.text = leftCount + " 项";
    rightCountText.text = rightCount + " 项";
  }

  leftCountText = WidgetManager.Text("0 项", { style: "font-size:12px;color:rgba(0,0,0,0.45);" });
  rightCountText = WidgetManager.Text("0 项", { style: "font-size:12px;color:rgba(0,0,0,0.45);" });

  leftList = WidgetManager.Box({
    style: "max-height:300px;overflow-y:auto;",
    child: [],
  });

  rightList = WidgetManager.Box({
    style: "max-height:300px;overflow-y:auto;",
    child: [],
  });

  var leftPanel = WidgetManager.Box({
    style: "width:" + width + ";border:1px solid #d9d9d9;border-radius:4px;overflow:hidden;",
    child: [
      WidgetManager.Box({
        style: "padding:8px 12px;background-color:#fafafa;border-bottom:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;",
        child: [
          WidgetManager.Text(titles[0], { style: "font-size:14px;font-weight:500;color:rgba(0,0,0,0.85);" }),
          leftCountText,
        ],
      }),
      leftList,
    ],
  });

  var rightPanel = WidgetManager.Box({
    style: "width:" + width + ";border:1px solid #d9d9d9;border-radius:4px;overflow:hidden;",
    child: [
      WidgetManager.Box({
        style: "padding:8px 12px;background-color:#fafafa;border-bottom:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;",
        child: [
          WidgetManager.Text(titles[1], { style: "font-size:14px;font-weight:500;color:rgba(0,0,0,0.85);" }),
          rightCountText,
        ],
      }),
      rightList,
    ],
  });

  var toRightBtn = WidgetManager.Button("\u203A", {
    style: "padding:4px 12px;font-size:16px;margin-bottom:8px;",
    on: {
      click: function () {
        if (leftSelected.length > 0) {
          targetKeys = targetKeys.concat(leftSelected);
          render();
          onChange && onChange(targetKeys);
        }
      },
    },
  });

  var toLeftBtn = WidgetManager.Button("\u2039", {
    style: "padding:4px 12px;font-size:16px;",
    on: {
      click: function () {
        if (rightSelected.length > 0) {
          targetKeys = targetKeys.filter(function (k) { return rightSelected.indexOf(k) === -1; });
          render();
          onChange && onChange(targetKeys);
        }
      },
    },
  });

  var operations = WidgetManager.Box({
    style: "display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 16px;",
    child: [toRightBtn, toLeftBtn],
  });

  var container = WidgetManager.Box({
    style: "display:flex;align-items:flex-start;" + (p.style || ""),
    child: [leftPanel, operations, rightPanel],
  });

  container.$_init = function () { render(); };
  container.getTargetKeys = function () { return targetKeys.slice(); };

  return container;
};

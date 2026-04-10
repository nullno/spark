/**
 * Tabs 标签页
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var items = p.items || [];
  var activeKey = p.activeKey || (items[0] && items[0].key) || "0";
  var tabPosition = p.tabPosition || "top";

  var tabBtns = [];
  var tabPanels = [];
  var tabBtnWidgets = [];
  var tabPanelWidgets = [];

  items.forEach(function (item, index) {
    var key = item.key || String(index);
    var isActive = key === activeKey;

    var btn = WidgetManager.Text(item.label || "", {
      style:
        "padding:12px 16px;cursor:pointer;font-size:14px;transition:all 0.2s;white-space:nowrap;" +
        "border-bottom:2px solid " + (isActive ? "#4B95FF" : "transparent") + ";" +
        "color:" + (isActive ? "#4B95FF" : "#666") + ";font-weight:" + (isActive ? "600" : "400") + ";",
      shover: { color: "#4B95FF" },
      on: {
        click: function () {
          activeKey = key;
          tabBtnWidgets.forEach(function (b, i) {
            var k = items[i].key || String(i);
            var active = k === activeKey;
            b.style =
              "border-bottom-color:" + (active ? "#4B95FF" : "transparent") +
              ";color:" + (active ? "#4B95FF" : "#666") +
              ";font-weight:" + (active ? "600" : "400") + ";";
          });
          tabPanelWidgets.forEach(function (panel, i) {
            var k = items[i].key || String(i);
            panel.show = k === activeKey;
          });
          p.onChange && p.onChange(activeKey);
        },
      },
    });

    tabBtns.push(btn);
    tabBtnWidgets.push(btn);

    var panel = WidgetManager.Box({
      style: "padding:16px 0;" + (item.style || ""),
      child: item.children || [],
      show: isActive,
    });

    tabPanels.push(panel);
    tabPanelWidgets.push(panel);
  });

  var tabBar = WidgetManager.Box({
    style:
      "display:flex;border-bottom:1px solid #e8e8e8;overflow-x:auto;",
    child: tabBtns,
  });

  var container = WidgetManager.Box({
    style: (p.style || ""),
    child: [tabBar].concat(tabPanels),
  });

  container.setActiveKey = function (key) {
    activeKey = key;
    tabBtnWidgets.forEach(function (b, i) {
      var k = items[i].key || String(i);
      var active = k === key;
      b.style =
        "border-bottom-color:" + (active ? "#4B95FF" : "transparent") +
        ";color:" + (active ? "#4B95FF" : "#666") +
        ";font-weight:" + (active ? "600" : "400") + ";";
    });
    tabPanelWidgets.forEach(function (panel, i) {
      var k = items[i].key || String(i);
      panel.show = k === key;
    });
  };

  return container;
};

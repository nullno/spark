/**
 * Tree 树形控件
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var treeData = p.treeData || [];
  var defaultExpandAll = p.defaultExpandAll || false;
  var onSelect = p.onSelect || null;
  var selectedKey = p.selectedKey || null;

  function buildNode(node, level) {
    var key = node.key || node.title;
    var hasChildren = node.children && node.children.length > 0;
    var expanded = defaultExpandAll;
    var indent = level * 24;

    var childContainer = null;
    var arrow = null;

    if (hasChildren) {
      arrow = WidgetManager.Text(expanded ? "\u25BE" : "\u25B8", {
        style: "font-size:10px;color:rgba(0,0,0,0.45);width:16px;text-align:center;cursor:pointer;flex-shrink:0;transition:transform 0.2s;",
      });

      var childWidgets = [];
      node.children.forEach(function (child) {
        childWidgets.push(buildNode(child, level + 1));
      });

      childContainer = WidgetManager.Box({
        style: "",
        child: childWidgets,
        show: expanded,
      });
    }

    var icon = node.icon || null;

    var titleChildren = [];
    if (arrow) titleChildren.push(arrow);
    else {
      titleChildren.push(WidgetManager.Box({ style: "width:16px;flex-shrink:0;" }));
    }
    if (icon) titleChildren.push(icon);

    var titleText = WidgetManager.Text(node.title || "", {
      style: "font-size:14px;color:" + (key === selectedKey ? "#4B95FF" : "rgba(0,0,0,0.85)") +
        ";cursor:pointer;padding:4px 8px;border-radius:4px;transition:all 0.2s;flex:1;",
      shover: { "background-color": "#f5f5f5" },
      on: {
        click: function () {
          selectedKey = key;
          onSelect && onSelect(key, node);
        },
      },
    });
    titleChildren.push(titleText);

    var titleRow = WidgetManager.Box({
      style: "display:flex;align-items:center;padding:2px 0;padding-left:" + indent + "px;",
      child: titleChildren,
      on: hasChildren ? {
        click: function () {
          expanded = !expanded;
          childContainer.show = expanded;
          arrow.text = expanded ? "\u25BE" : "\u25B8";
        },
      } : null,
    });

    var nodeChildren = [titleRow];
    if (childContainer) nodeChildren.push(childContainer);

    return WidgetManager.Box({
      style: "",
      child: nodeChildren,
    });
  }

  var treeChildren = [];
  treeData.forEach(function (node) {
    treeChildren.push(buildNode(node, 0));
  });

  return WidgetManager.Box({
    style: (p.style || ""),
    child: treeChildren,
  });
};

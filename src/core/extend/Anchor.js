/**
 * Anchor 锚点导航
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var items = p.items || [];
  var offsetTop = p.offsetTop || 0;
  var onChange = p.onChange || null;
  var activeKey = p.activeKey || (items[0] && items[0].href) || "";

  var linkWidgets = [];

  function buildLinks(links, level) {
    var children = [];
    links.forEach(function (item) {
      var href = item.href || "";
      var isActive = href === activeKey;

      var link = WidgetManager.Text(item.title || "", {
        style: "display:block;padding:4px 0 4px " + (level * 16) + "px;font-size:13px;cursor:pointer;" +
          "color:" + (isActive ? "#4B95FF" : "rgba(0,0,0,0.65)") +
          ";text-decoration:none;transition:color 0.2s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
        shover: { color: "#4B95FF" },
        on: {
          click: function () {
            activeKey = href;
            updateActive();
            if (href) {
              var el = document.querySelector(href);
              if (el) {
                var top = el.getBoundingClientRect().top + window.pageYOffset - offsetTop;
                window.scrollTo({ top: top, behavior: "smooth" });
              }
            }
            onChange && onChange(href);
          },
        },
      });

      linkWidgets.push({ href: href, widget: link });
      children.push(link);

      if (item.children && item.children.length) {
        var sub = buildLinks(item.children, level + 1);
        children = children.concat(sub);
      }
    });
    return children;
  }

  function updateActive() {
    linkWidgets.forEach(function (lw) {
      lw.widget.style = "color:" + (lw.href === activeKey ? "#4B95FF" : "rgba(0,0,0,0.65)") +
        ";font-weight:" + (lw.href === activeKey ? "500" : "400") + ";";
    });
  }

  var linkChildren = buildLinks(items, 0);

  var indicator = WidgetManager.Box({
    style: "position:absolute;left:0;top:0;width:2px;height:100%;background-color:#f0f0f0;",
    child: [
      WidgetManager.Box({
        style: "width:2px;height:20px;background-color:#4B95FF;transition:top 0.2s;",
      }),
    ],
  });

  var container = WidgetManager.Box({
    style: "position:relative;padding-left:12px;" + (p.style || ""),
    child: [indicator].concat(linkChildren),
  });

  container.setActiveKey = function (key) {
    activeKey = key;
    updateActive();
  };

  return container;
};

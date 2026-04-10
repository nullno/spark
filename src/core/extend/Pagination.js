/**
 * Pagination 分页
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var current = p.current || 1;
  var total = p.total || 0;
  var pageSize = p.pageSize || 10;
  var onChange = p.onChange || null;
  var maxVisible = p.maxVisible || 7;

  var totalPages = Math.max(1, Math.ceil(total / pageSize));

  var btnStyle = "min-width:32px;height:32px;line-height:32px;text-align:center;" +
    "border:1px solid #d9d9d9;border-radius:4px;cursor:pointer;font-size:14px;" +
    "margin:0 4px;display:inline-block;background-color:#fff;color:#333;transition:all 0.2s;";
  var activeStyle = "border-color:#4B95FF;color:#4B95FF;font-weight:600;";
  var disabledStyle = "cursor:not-allowed;color:#d9d9d9;border-color:#d9d9d9;";

  var pageButtons = [];
  var pageWidgets = [];

  function buildPages() {
    var pages = [];
    if (totalPages <= maxVisible) {
      for (var i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      var start = Math.max(2, current - 2);
      var end = Math.min(totalPages - 1, current + 2);
      if (start > 2) pages.push("...");
      for (var i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  function render() {
    totalPages = Math.max(1, Math.ceil(total / pageSize));
    var pages = buildPages();

    // Remove old widgets
    container.empty();
    pageWidgets = [];

    // Prev button
    var prev = WidgetManager.Text("\u2039", {
      style: btnStyle + "font-size:18px;" + (current <= 1 ? disabledStyle : ""),
      shover: current > 1 ? { "border-color": "#4B95FF", color: "#4B95FF" } : null,
      on: current > 1 ? {
        click: function () { goTo(current - 1); },
      } : null,
    });
    container.append(prev);

    // Page buttons
    pages.forEach(function (page) {
      if (page === "...") {
        var dots = WidgetManager.Text("\u2026", {
          style: "min-width:32px;height:32px;line-height:32px;text-align:center;" +
            "display:inline-block;color:#999;font-size:14px;margin:0 4px;",
        });
        container.append(dots);
      } else {
        var isActive = page === current;
        var btn = WidgetManager.Text(String(page), {
          style: btnStyle + (isActive ? activeStyle : ""),
          shover: !isActive ? { "border-color": "#4B95FF", color: "#4B95FF" } : null,
          on: {
            click: (function (pg) {
              return function () { goTo(pg); };
            })(page),
          },
        });
        container.append(btn);
        pageWidgets.push({ page: page, widget: btn });
      }
    });

    // Next button
    var next = WidgetManager.Text("\u203A", {
      style: btnStyle + "font-size:18px;" + (current >= totalPages ? disabledStyle : ""),
      shover: current < totalPages ? { "border-color": "#4B95FF", color: "#4B95FF" } : null,
      on: current < totalPages ? {
        click: function () { goTo(current + 1); },
      } : null,
    });
    container.append(next);
  }

  function goTo(page) {
    if (page < 1 || page > totalPages || page === current) return;
    current = page;
    render();
    onChange && onChange(current, pageSize);
  }

  var container = WidgetManager.Box({
    style: "display:flex;align-items:center;flex-wrap:wrap;" + (p.style || ""),
    child: [],
  });

  container.goTo = goTo;
  container.setTotal = function (t) { total = t; render(); };
  container.getCurrent = function () { return current; };

  // Initial render after component is mounted
  container.$_init = function () { render(); };

  return container;
};

/**
 * DateRangePicker 日期范围选择器
 */
import WidgetManager from "../WidgetManager.js";
import { pad, formatDate } from "./_utils.js";

export default function (p) {
  !p && (p = {});
  var placeholder = p.placeholder || ["开始日期", "结束日期"];
  var onChange = p.onChange || null;
  var isOpen = false;
  var selecting = "start"; // "start" or "end"

  var now = new Date();
  var viewYear = now.getFullYear();
  var viewMonth = now.getMonth();
  var startDate = p.startDate ? new Date(p.startDate) : null;
  var endDate = p.endDate ? new Date(p.endDate) : null;
  function sameDay(a, b) { return a && b && a.toDateString() === b.toDateString(); }
  function inRange(d) {
    if (!startDate || !endDate) return false;
    return d > startDate && d < endDate;
  }

  var startLabel = WidgetManager.Text(startDate ? formatDate(startDate) : placeholder[0], {
    style: "font-size:13px;color:" + (startDate ? "#333" : "#bfbfbf") + ";",
  });
  var endLabel = WidgetManager.Text(endDate ? formatDate(endDate) : placeholder[1], {
    style: "font-size:13px;color:" + (endDate ? "#333" : "#bfbfbf") + ";",
  });

  var headerText = WidgetManager.Text("", { style: "font-size:14px;font-weight:600;color:rgba(0,0,0,0.85);flex:1;text-align:center;" });
  var daysContainer = WidgetManager.Box({
    style: "display:grid;grid-template-columns:repeat(7,1fr);gap:2px;",
    child: [],
  });

  function renderCalendar() {
    headerText.text = viewYear + "年" + (viewMonth + 1) + "月";
    daysContainer.empty();

    var weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    weekdays.forEach(function (wd) {
      daysContainer.append(WidgetManager.Text(wd, {
        style: "text-align:center;font-size:12px;color:rgba(0,0,0,0.45);padding:4px 0;font-weight:500;",
      }));
    });

    var firstDay = new Date(viewYear, viewMonth, 1).getDay();
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    var today = new Date();

    for (var i = 0; i < firstDay; i++) {
      daysContainer.append(WidgetManager.Box({ style: "height:28px;" }));
    }

    for (var d = 1; d <= daysInMonth; d++) {
      (function (day) {
        var date = new Date(viewYear, viewMonth, day);
        var isToday = date.toDateString() === today.toDateString();
        var isStart = sameDay(date, startDate);
        var isEnd = sameDay(date, endDate);
        var isInRange = inRange(date);
        var isSelected = isStart || isEnd;

        var bg = isSelected ? "#4B95FF" : isInRange ? "#e6f7ff" : "transparent";
        var color = isSelected ? "#fff" : isToday ? "#4B95FF" : "rgba(0,0,0,0.65)";
        var border = isToday && !isSelected ? "1px solid #4B95FF" : "1px solid transparent";

        var dayBtn = WidgetManager.Text(String(day), {
          style: "width:28px;height:28px;line-height:28px;text-align:center;font-size:13px;cursor:pointer;" +
            "border-radius:" + (isStart ? "4px 0 0 4px" : isEnd ? "0 4px 4px 0" : isInRange ? "0" : "4px") + ";" +
            "margin:0 auto;color:" + color + ";background-color:" + bg + ";border:" + border + ";transition:all 0.15s;",
          shover: { "background-color": isSelected ? "#4B95FF" : "#e6f7ff" },
          on: {
            click: function () {
              var clicked = new Date(viewYear, viewMonth, day);
              if (selecting === "start") {
                startDate = clicked;
                endDate = null;
                selecting = "end";
                startLabel.text = formatDate(clicked);
                startLabel.style = "color:#333;";
                endLabel.text = placeholder[1];
                endLabel.style = "color:#bfbfbf;";
              } else {
                if (clicked < startDate) {
                  endDate = startDate;
                  startDate = clicked;
                } else {
                  endDate = clicked;
                }
                selecting = "start";
                startLabel.text = formatDate(startDate);
                startLabel.style = "color:#333;";
                endLabel.text = formatDate(endDate);
                endLabel.style = "color:#333;";
                isOpen = false;
                dropdown.show = false;
                onChange && onChange(formatDate(startDate), formatDate(endDate));
              }
              renderCalendar();
            },
          },
        });
        daysContainer.append(dayBtn);
      })(d);
    }
  }

  var prevMonth = WidgetManager.Text("\u2039", {
    style: "cursor:pointer;font-size:18px;padding:0 8px;color:#666;user-select:none;",
    shover: { color: "#4B95FF" },
    on: { click: function () { viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } renderCalendar(); } },
  });
  var nextMonth = WidgetManager.Text("\u203A", {
    style: "cursor:pointer;font-size:18px;padding:0 8px;color:#666;user-select:none;",
    shover: { color: "#4B95FF" },
    on: { click: function () { viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } renderCalendar(); } },
  });

  var calHeader = WidgetManager.Box({
    style: "display:flex;align-items:center;padding:8px;border-bottom:1px solid #f0f0f0;",
    child: [prevMonth, headerText, nextMonth],
  });

  var dropdown = WidgetManager.Box({
    style: "position:absolute;top:100%;left:0;margin-top:4px;background-color:#fff;" +
      "border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.1);" +
      "z-index:1050;padding:12px;min-width:280px;",
    child: [calHeader, daysContainer],
    show: false,
    stopProp: true,
  });

  var trigger = WidgetManager.Box({
    style: "display:flex;align-items:center;padding:4px 12px;min-height:36px;" +
      "border:1px solid #d9d9d9;border-radius:8px;background-color:#fff;cursor:pointer;transition:border-color 0.2s;gap:4px;",
    child: [
      WidgetManager.Text("\uD83D\uDCC5", { style: "font-size:14px;color:#999;margin-right:4px;" }),
      startLabel,
      WidgetManager.Text("~", { style: "color:#ccc;margin:0 6px;font-size:13px;" }),
      endLabel,
    ],
    shover: { "border-color": "#4B95FF" },
    on: {
      click: function () {
        isOpen = !isOpen;
        dropdown.show = isOpen;
        if (isOpen) renderCalendar();
      },
    },
  });

  var container = WidgetManager.Box({
    style: "position:relative;display:inline-block;width:" + (p.width || "280px") + ";" + (p.style || ""),
    child: [trigger, dropdown],
  });

  container.$_init = function () {
    document.addEventListener("click", function () {
      if (isOpen) { isOpen = false; dropdown.show = false; }
    });
  };

  container.getValue = function () {
    return { start: startDate ? formatDate(startDate) : "", end: endDate ? formatDate(endDate) : "" };
  };

  return container;
};

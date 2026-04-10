/**
 * Calendar 日历/日期选择
 */
import WidgetManager from "../WidgetManager.js";
import { pad, formatDate } from "./_utils.js";

export default function (p) {
  !p && (p = {});
  var value = p.value || null;
  var placeholder = p.placeholder || "选择日期";
  var onChange = p.onChange || null;
  var isOpen = false;

  var now = value ? new Date(value) : new Date();
  var viewYear = now.getFullYear();
  var viewMonth = now.getMonth();
  var selectedDate = value ? new Date(value) : null;

  var displayText = selectedDate ? formatDate(selectedDate) : placeholder;

  var labelWidget = WidgetManager.Text(displayText, {
    style: "flex:1;font-size:14px;color:" + (selectedDate ? "#333" : "#bfbfbf") + ";",
  });

  var calIcon = WidgetManager.Text("\uD83D\uDCC5", {
    style: "font-size:14px;margin-left:8px;",
  });

  var headerText = WidgetManager.Text(viewYear + "年" + (viewMonth + 1) + "月", {
    style: "font-size:14px;font-weight:600;color:rgba(0,0,0,0.85);flex:1;text-align:center;",
  });

  var daysContainer = WidgetManager.Box({
    style: "display:grid;grid-template-columns:repeat(7,1fr);gap:2px;",
    child: [],
  });

  function renderCalendar() {
    headerText.text = viewYear + "年" + (viewMonth + 1) + "月";
    daysContainer.empty();

    // Weekday headers
    var weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    weekdays.forEach(function (wd) {
      daysContainer.append(WidgetManager.Text(wd, {
        style: "text-align:center;font-size:12px;color:rgba(0,0,0,0.45);padding:4px 0;font-weight:500;",
      }));
    });

    var firstDay = new Date(viewYear, viewMonth, 1).getDay();
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    var today = new Date();

    // Empty cells before first day
    for (var i = 0; i < firstDay; i++) {
      daysContainer.append(WidgetManager.Box({ style: "height:28px;" }));
    }

    for (var d = 1; d <= daysInMonth; d++) {
      (function (day) {
        var date = new Date(viewYear, viewMonth, day);
        var isToday = date.toDateString() === today.toDateString();
        var isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

        var dayBtn = WidgetManager.Text(String(day), {
          style: "width:28px;height:28px;line-height:28px;text-align:center;font-size:14px;cursor:pointer;" +
            "border-radius:4px;margin:0 auto;" +
            "color:" + (isSelected ? "#fff" : isToday ? "#4B95FF" : "rgba(0,0,0,0.65)") + ";" +
            "background-color:" + (isSelected ? "#4B95FF" : "transparent") + ";" +
            "border:" + (isToday && !isSelected ? "1px solid #4B95FF" : "1px solid transparent") + ";" +
            "transition:all 0.15s;",
          shover: { "background-color": isSelected ? "#4B95FF" : "#e6f7ff" },
          on: {
            click: function () {
              selectedDate = new Date(viewYear, viewMonth, day);
              labelWidget.text = formatDate(selectedDate);
              labelWidget.style = "color:#333;";
              isOpen = false;
              dropdown.show = false;
              onChange && onChange(formatDate(selectedDate));
            },
          },
        });
        daysContainer.append(dayBtn);
      })(d);
    }
  }

  var prevMonth = WidgetManager.Text("\u2039", {
    style: "cursor:pointer;font-size:18px;padding:0 8px;color:#666;",
    shover: { color: "#4B95FF" },
    on: {
      click: function () {
        viewMonth--;
        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        renderCalendar();
      },
    },
  });

  var nextMonth = WidgetManager.Text("\u203A", {
    style: "cursor:pointer;font-size:18px;padding:0 8px;color:#666;",
    shover: { color: "#4B95FF" },
    on: {
      click: function () {
        viewMonth++;
        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        renderCalendar();
      },
    },
  });

  var calHeader = WidgetManager.Box({
    style: "display:flex;align-items:center;padding:8px;border-bottom:1px solid #f0f0f0;",
    child: [prevMonth, headerText, nextMonth],
  });

  var dropdown = WidgetManager.Box({
    style: "position:absolute;top:100%;left:0;margin-top:4px;background-color:#fff;" +
      "border:1px solid #d9d9d9;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.15);" +
      "z-index:1050;padding:8px;min-width:280px;",
    child: [calHeader, daysContainer],
    show: false,
    stopProp: true,
  });

  var trigger = WidgetManager.Box({
    style: "display:flex;align-items:center;padding:4px 12px;min-height:32px;" +
      "border:1px solid #d9d9d9;border-radius:4px;background-color:#fff;cursor:pointer;transition:border-color 0.2s;",
    child: [labelWidget, calIcon],
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
    style: "position:relative;display:inline-block;width:" + (p.width || "200px") + ";" + (p.style || ""),
    child: [trigger, dropdown],
  });

  container.$_init = function () {
    document.addEventListener("click", function () {
      if (isOpen) { isOpen = false; dropdown.show = false; }
    });
  };

  container.getValue = function () { return selectedDate ? formatDate(selectedDate) : ""; };
  container.setValue = function (val) {
    selectedDate = val ? new Date(val) : null;
    labelWidget.text = selectedDate ? formatDate(selectedDate) : placeholder;
    labelWidget.style = "color:" + (selectedDate ? "#333" : "#bfbfbf") + ";";
  };

  return container;
};

/**
 * Table 表格
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var columns = p.columns || [];
  var dataSource = p.dataSource || [];
  var bordered = p.bordered || false;
  var striped = p.striped !== false;
  var size = p.size || "default";
  var onRowClick = p.onRowClick || null;

  var paddingMap = { small: "8px 8px", default: "12px 16px", large: "16px 16px" };
  var cellPad = paddingMap[size] || paddingMap["default"];
  var borderStyle = bordered ? "border:1px solid #f0f0f0;" : "";

  // Header
  var headerCells = [];
  columns.forEach(function (col) {
    headerCells.push(
      WidgetManager.Text(col.title || "", {
        tag: "th",
        style: "padding:" + cellPad + ";text-align:" + (col.align || "left") +
          ";font-weight:600;font-size:14px;color:rgba(0,0,0,0.85);background-color:#fafafa;" +
          "border-bottom:1px solid #f0f0f0;" + (bordered ? "border-right:1px solid #f0f0f0;" : "") +
          (col.width ? "width:" + col.width + ";" : ""),
      })
    );
  });

  var headerRow = WidgetManager.Box({
    tag: "tr",
    style: "display:table-row;",
    child: headerCells,
  });

  var thead = WidgetManager.Box({
    tag: "thead",
    style: "display:table-header-group;",
    child: [headerRow],
  });

  // Body rows
  var bodyRows = [];
  dataSource.forEach(function (record, rowIdx) {
    var cells = [];
    columns.forEach(function (col) {
      var cellContent;
      if (col.render) {
        cellContent = col.render(record[col.dataIndex], record, rowIdx);
      } else {
        var val = record[col.dataIndex];
        cellContent = WidgetManager.Text(val !== undefined && val !== null ? String(val) : "", {
          tag: "span",
          style: "font-size:14px;color:rgba(0,0,0,0.65);",
        });
      }

      cells.push(
        WidgetManager.Box({
          tag: "td",
          style: "padding:" + cellPad + ";text-align:" + (col.align || "left") +
            ";border-bottom:1px solid #f0f0f0;" + (bordered ? "border-right:1px solid #f0f0f0;" : "") +
            "vertical-align:middle;",
          child: [cellContent],
        })
      );
    });

    var bgColor = striped && rowIdx % 2 === 1 ? "#fafafa" : "#fff";
    var row = WidgetManager.Box({
      tag: "tr",
      style: "display:table-row;background-color:" + bgColor + ";transition:background-color 0.2s;",
      child: cells,
      shover: { "background-color": "#e6f7ff" },
      on: onRowClick ? {
        click: function () {
          onRowClick(record, rowIdx);
        },
      } : null,
    });
    bodyRows.push(row);
  });

  var tbody = WidgetManager.Box({
    tag: "tbody",
    style: "display:table-row-group;",
    child: bodyRows,
  });

  var table = WidgetManager.Box({
    style: "display:table;width:100%;border-collapse:collapse;" + borderStyle +
      "border-radius:4px;overflow:hidden;" + (p.style || ""),
    tag: "table",
    child: [thead, tbody],
  });

  table.setData = function (newData) {
    dataSource = newData;
    // Rebuild body by clearing and re-adding
    tbody.empty();
    newData.forEach(function (record, rowIdx) {
      var cells = [];
      columns.forEach(function (col) {
        var cellContent;
        if (col.render) {
          cellContent = col.render(record[col.dataIndex], record, rowIdx);
        } else {
          var val = record[col.dataIndex];
          cellContent = WidgetManager.Text(val !== undefined && val !== null ? String(val) : "", {
            tag: "span",
            style: "font-size:14px;color:rgba(0,0,0,0.65);",
          });
        }
        cells.push(
          WidgetManager.Box({
            tag: "td",
            style: "padding:" + cellPad + ";text-align:" + (col.align || "left") +
              ";border-bottom:1px solid #f0f0f0;" + (bordered ? "border-right:1px solid #f0f0f0;" : "") +
              "vertical-align:middle;",
            child: [cellContent],
          })
        );
      });
      var bgColor = striped && rowIdx % 2 === 1 ? "#fafafa" : "#fff";
      var row = WidgetManager.Box({
        tag: "tr",
        style: "display:table-row;background-color:" + bgColor + ";transition:background-color 0.2s;",
        child: cells,
        shover: { "background-color": "#e6f7ff" },
        on: onRowClick ? {
          click: function () { onRowClick(record, rowIdx); },
        } : null,
      });
      tbody.append(row);
    });
  };

  return table;
};

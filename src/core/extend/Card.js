/**
 * Card 卡片
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var title = p.title || "";
  var extra = p.extra || null;
  var bordered = p.bordered !== false;
  var hoverable = p.hoverable || false;
  var cover = p.cover || null;
  var bodyStyle = p.bodyStyle || "";

  var parts = [];

  // Cover image
  if (cover) {
    parts.push(
      WidgetManager.Image(cover, {
        style: "width:100%;display:block;border-radius:8px 8px 0 0;",
      })
    );
  }

  // Header
  if (title || extra) {
    var headerChildren = [];
    if (title) {
      headerChildren.push(
        WidgetManager.Text(title, {
          style: "font-size:16px;font-weight:600;color:#333;flex:1;",
        })
      );
    }
    if (extra) {
      headerChildren.push(extra);
    }
    parts.push(
      WidgetManager.Box({
        style:
          "display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid #f0f0f0;",
        child: headerChildren,
      })
    );
  }

  // Body
  var body = WidgetManager.Box({
    style: "padding:24px;" + bodyStyle,
    child: p.child || [],
  });
  parts.push(body);

  // Actions
  if (p.actions && p.actions.length > 0) {
    parts.push(
      WidgetManager.Box({
        style:
          "display:flex;align-items:center;border-top:1px solid #f0f0f0;",
        child: p.actions.map(function (action, index) {
          return WidgetManager.Box({
            style:
              "flex:1;text-align:center;padding:12px 0;cursor:pointer;" +
              (index > 0 ? "border-left:1px solid #f0f0f0;" : ""),
            child: [action],
          });
        }),
      })
    );
  }

  var card = WidgetManager.Box({
    style:
      "background:#fff;border-radius:8px;" +
      (bordered ? "border:1px solid #e8e8e8;" : "") +
      "box-shadow:0 1px 2px rgba(0,0,0,0.03);transition:all 0.3s;" +
      (p.style || ""),
    shover: hoverable
      ? { "box-shadow": "0 4px 16px rgba(0,0,0,0.12)", transform: "translateY(-2px)" }
      : null,
    child: parts,
    on: p.on || null,
  });

  card.body = body;
  return card;
};

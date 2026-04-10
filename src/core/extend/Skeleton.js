/**
 * Skeleton 骨架屏
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var active = p.active !== false;
  var avatar = p.avatar || false;
  var title = p.title !== false;
  var paragraph = p.paragraph !== false;
  var rows = p.rows || 3;

  var animStyle = active
    ? "background:linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%);" +
      "background-size:400% 100%;animation:sk-loading 1.4s ease infinite;"
    : "background-color:#f2f2f2;";

  // Inject keyframes
  var styleId = "spark-skeleton-style";
  if (active && typeof document !== "undefined" && !document.getElementById(styleId)) {
    var styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.textContent =
      "@keyframes sk-loading{0%{background-position:100% 50%}" +
      "100%{background-position:0 50%}}";
    document.head.appendChild(styleEl);
  }

  var children = [];

  // Avatar placeholder
  if (avatar) {
    var avatarSize = typeof avatar === "object" && avatar.size ? avatar.size : 40;
    var avatarShape = typeof avatar === "object" && avatar.shape === "square" ? "4px" : "50%";
    children.push(
      WidgetManager.Box({
        style:
          "width:" + avatarSize + "px;height:" + avatarSize + "px;" +
          "border-radius:" + avatarShape + ";margin-right:16px;flex-shrink:0;" + animStyle,
      })
    );
  }

  var contentChildren = [];

  // Title placeholder
  if (title) {
    contentChildren.push(
      WidgetManager.Box({
        style: "width:38%;height:16px;border-radius:4px;margin-bottom:16px;" + animStyle,
      })
    );
  }

  // Paragraph rows
  if (paragraph) {
    for (var i = 0; i < rows; i++) {
      var w = i === rows - 1 ? "61%" : "100%";
      contentChildren.push(
        WidgetManager.Box({
          style:
            "width:" + w + ";height:16px;border-radius:4px;" +
            (i < rows - 1 ? "margin-bottom:12px;" : "") + animStyle,
        })
      );
    }
  }

  var content = WidgetManager.Box({
    style: "flex:1;",
    child: contentChildren,
  });

  children.push(content);

  var skeleton = WidgetManager.Box({
    style: "display:flex;padding:16px 0;" + (p.style || ""),
    child: children,
  });

  return skeleton;
};

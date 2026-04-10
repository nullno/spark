/**
 * Avatar 头像
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var src = p.src || "";
  var text = p.text || "";
  var shape = p.shape || "circle";
  var sizeMap = { small: 24, default: 32, large: 40 };
  var avatarSize = typeof p.size === "number" ? p.size : (sizeMap[p.size] || 32);
  var bgColor = p.color || "#4B95FF";

  var borderRadius = shape === "square" ? "4px" : "50%";
  var fontSize = avatarSize * 0.45;

  if (src) {
    var avatar = WidgetManager.Image(src, {
      style:
        "width:" + avatarSize + "px;height:" + avatarSize + "px;" +
        "border-radius:" + borderRadius + ";object-fit:cover;display:inline-block;" +
        "vertical-align:middle;" + (p.style || ""),
    });
    avatar.setSrc = function (val) {
      avatar.src = val;
    };
    return avatar;
  }

  var displayText = text ? text.charAt(0).toUpperCase() : "U";

  var avatar = WidgetManager.Box({
    style:
      "width:" + avatarSize + "px;height:" + avatarSize + "px;" +
      "border-radius:" + borderRadius + ";background-color:" + bgColor +
      ";display:inline-flex;align-items:center;justify-content:center;" +
      "vertical-align:middle;overflow:hidden;" + (p.style || ""),
    child: [
      WidgetManager.Text(displayText, {
        style:
          "color:#fff;font-size:" + fontSize + "px;font-weight:500;" +
          "line-height:1;user-select:none;",
      }),
    ],
  });

  return avatar;
};

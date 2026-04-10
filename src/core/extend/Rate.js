/**
 * Rate 评分
 */
import WidgetManager from "../WidgetManager.js";

export default function (p) {
  !p && (p = {});
  var count = p.count || 5;
  var value = p.value || 0;
  var allowHalf = p.allowHalf || false;
  var disabled = p.disabled || false;
  var onChange = p.onChange || null;
  var color = p.color || "#fadb14";
  var sizeVal = p.size || 20;
  var character = p.character || "\u2605";

  var hoverValue = -1;
  var starRefs = [];

  function getStarStyle(idx, currentVal) {
    if (allowHalf) {
      if (idx + 1 <= currentVal) return color;
      if (idx + 0.5 <= currentVal) return color;
      return "#e8e8e8";
    }
    return idx < currentVal ? color : "#e8e8e8";
  }

  function updateStars(val) {
    for (var j = 0; j < starRefs.length; j++) {
      var c = getStarStyle(j, val);
      starRefs[j].style = "color:" + c + ";";
    }
  }

  var stars = [];
  for (var i = 0; i < count; i++) {
    (function (idx) {
      var star = WidgetManager.Text(character, {
        style:
          "font-size:" + sizeVal + "px;cursor:" + (disabled ? "default" : "pointer") +
          ";transition:color 0.2s,transform 0.2s;color:" +
          getStarStyle(idx, value) + ";user-select:none;padding:0 2px;display:inline-block;",
        on: !disabled
          ? {
              hover: function () {
                hoverValue = idx + 1;
                updateStars(hoverValue);
                this.style = "transform:scale(1.2);";
              },
              out: function () {
                hoverValue = -1;
                updateStars(value);
                this.style = "transform:scale(1);";
              },
              click: function () {
                value = idx + 1;
                updateStars(value);
                if (onChange) onChange(value);
              },
            }
          : null,
      });
      starRefs.push(star);
      stars.push(star);
    })(i);
  }

  var rate = WidgetManager.Box({
    style: "display:inline-flex;align-items:center;" + (p.style || ""),
    child: stars,
  });

  rate.setValue = function (val) {
    value = val;
    updateStars(value);
  };

  rate.getValue = function () {
    return value;
  };

  return rate;
};

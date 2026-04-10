/**
 * [WidgetManager 组件管理]
 * @AuthorHTL
 * @DateTime  2020-04-01T05:24:20+0800
 * * 路由，页面，文本，图片，视频，音频，容器，拖动容器，画布，文字按钮，文字图标，列表，
    横向排列，纵向排列,局部滚动容器，弹窗，swiper(需要引入swiper)
 */
import { _typeof } from "./common.js";

import Cache from "./Cache.js";

import CreateWidgetName from "./CreateWidgetName.js";

import CSSManager from "./CSSManager.js";

import WidgetParse from "./WidgetParse.js";

const WidgetManager = {
  Css: function (p) {
    !p && (p = "");
    var obj = { type: "Css" },
      address = CreateWidgetName("Css");
    obj.name = address;
    if (_typeof(p, "Object")) {
      p = CSSManager.cssParse.objStyleToStr(p);
    }
    obj.styleObj = CSSManager.cssParse.strStyleToObj(p);
    obj.style = CSSManager.cssParse.objStyleToStr(obj.styleObj);
    Cache.CSSCache[address] = obj;
    WidgetParse.setDefineProperty(address, ["style"]);

    return Cache.CSSCache[address];
  },
  Page: function (p) {
    var option = {
      link: {
        name: "",
        path: "/",
        redirect: "",
        meta: {},
        params: {},
        query: {},
        scrollTop: 0,
        recordLastPosition: true,
      },
    };

    p.link = Object.assign(option.link, p.link);

    return WidgetParse.getNxWidget("Page", p, "div", "position:relative;", [
      "style",
      "child",
      "className",
      "show",
      "vif",
    ]);
  },
  Text: function (str, p) {
    !p && (p = {});

    p.text = str.toString() ? str.toString() : "";

    return WidgetParse.getNxWidget("Text", p, "span", "", [
      "text",
      "style",
      "className",
      "show",
      "vif",
    ]);
  },
  Image: function (src, p) {
    !p && (p = {});
    p.imgurl = src;
    delete p.child;
    return WidgetParse.getNxWidget("Image", p, "img", "border:0;", [
      "style",
      "className",
      "show",
      "vif",
    ]);
  },
  Box: function (p) {
    return WidgetParse.getNxWidget(
      "Box",
      p,
      "div",
      "background-color:transparent;",
      ["style", "child", "className", "show", "vif"]
    );
  },

  List: function (p) {
    !p && (p = {});

    var option = {
      data: [],
      item: function (item, index) {
        console.log("no data");
      },
    };
    p = Object.assign(option, p);
    return WidgetParse.getNxWidget("List", p, "ul", "", [
      "style",
      "child",
      "show",
      "className",
      "vif",
    ]);
  },
  Drag: function (p) {
    !p && (p = {});
    var event = {
      press: function () {},
      move: function () {},
      up: function () {},
    };
    p.on = p.on ? Object.assign(event, p.on) : event;
    p.position = { x: 0, y: 0, startX: 0, startY: 0 };
    return WidgetParse.getNxWidget(
      "Drag",
      p,
      "div",
      "position:fixed;background-color:#3D3F3F;",
      ["style", "show", "className", "vif"]
    );
  },
  Stack: function (p) {
    return WidgetParse.getNxWidget(
      "Stack",
      p,
      "div",
      "position:relative;background-color:#3D3F3F;",
      ["style", "show", "className", "vif"]
    );
  },
  Position: function (p) {
    return WidgetParse.getNxWidget(
      "Position",
      p,
      "div",
      "position:absolute;background-color:#3D3F3F;",
      ["style", "show", "className", "vif"]
    );
  },
  Fixed: function (p) {
    return WidgetParse.getNxWidget(
      "Fixed",
      p,
      "div",
      "position:fixed;background-color:#3D3F3F;",
      ["style", "show", "className", "vif"]
    );
  },
  Input: function (p) {
    !p && (p = {});

    var option = {
      enable: true,
      writing: false,
      multiline: false,
      value: "",
      text: "",
      style: "",
      placeholder: "",
      isFocus: false,
      placeholderStyle: "color:#ccc;",
      placeholderEnable: p.value != "",
      onStyle: "color:#000;box-shadow:0 0 5px #4B95FF;",
      offStyle: "color:#ccc;box-shadow:none;",
    };

    var event = {
      paste: function (e) {
        console.log(e);
        setTimeout(() => {
          this.$el.selectionStart = this.$el.selectionEnd = this.value.length;
        }, 10);
      },
      input: function (e) {
        this.writing = true;
        this.isFocus = true;
        this.value = this.$el.innerText.replace(
          /<[\/\s]*(?:(?!div|br)[^>]*)>/g,
          ""
        );
        if (e.inputType == "insertFromPaste") {
          this.$el.innerText = this.value;
          this.autofocus();
        }
        if (this.value != "") {
          this.placeholderEnable = false;
        }

        this.on["inputing"] && this.on["inputing"].call(this, e);
      },
      onkeydown: function (e) {
        this.isFocus = false;
        if (!this.enable) {
          e.cancelBubble = true;
          e.preventDefault();
        }
        if (e.keyCode == 13 && !this.multiline) {
          e.cancelBubble = true;
          e.preventDefault();
          this.$el && this.$el.blur();
          this.on["keyEnter"] && this.on["keyEnter"].call(this, e);
        }
      },
      onblur: function (e) {
        this.writing = false;
        this.isFocus = false;
        if (!this.enable) {
          return;
        }

        if (this.value == "" || this.placeholderEnable) {
          // this.text = this.placeholder;
          this.placeholderEnable = true;
          this.value = "";
          this.style = this.offStyle + this.placeholderStyle;
        } else {
          this.style = this.offStyle;
        }

        this.on["blur"] && this.on["blur"].call(this, e);
      },
      onfocus: function (e) {
        if (!this.enable) {
          e.preventDefault();
          e.cancelBubble = true;
          this.style = "cursor:not-allowed;";
          return;
        }

        this.style = this.onStyle + "cursor:auto;";
        this.isFocus = true;
        if (this.placeholderEnable || this.value == this.placeholder) {
          this.placeholderEnable = false;
          this.value = "";
        }
        this.on["focus"] && this.on["focus"].call(this, e);
      },
    };

    p.on = p.on ? Object.assign(p.on, event) : event;

    p = Object.assign(option, p);

    p.attributes = p.enable ? "contenteditable=true" : "";

    p.style += !p.multiline ? "white-space:nowrap;" : "";

    p.style += !p.enable ? "cursor:not-allowed;" : "";

    p.style += p.offStyle;

    if (p.value == "" && p.placeholderEnable) {
      p.text = p.placeholder;
      p.style += p.placeholderStyle;
    }

    p.autofocus = function () {
      var obj = this.$el;
      if (window.getSelection) {
        obj.focus();
        var range = window.getSelection();
        range.selectAllChildren(obj);
        range.collapseToEnd();
      } else if (document.selection) {
        //ie10 9 8 7 6 5
        var range = document.selection.createRange();
        range.moveToElementText(obj);
        range.collapse(false);
        range.select();
      }
    };

    return WidgetParse.getNxWidget(
      "Input",
      p,
      "div",
      "background-color:transparent;border:1px solid #4B95FF;min-width:200px;min-height:40px;line-height:38px;margin:5px;padding:0 5px;border-radius:5px;overflow:hidden;cursor:auto;",
      ["style", "className", "show", "value", "enable", "vif"]
    );
  },
  Switch: function (p) {
    !p && (p = {});

    var option = {
      value: false,
      activeColor: "#4B95FF",
      inactiveColor: "#ccc",
      width: "44px",
      height: "22px",
    };
    p = Object.assign(option, p);

    var _activeColor = p.activeColor;
    var _inactiveColor = p.inactiveColor;
    var _width = p.width;
    var _height = p.height;
    var _onChange = p.onChange;

    var thumbStyle =
      "width:" + _height + ";height:" + _height +
      ";border-radius:50%;background-color:#fff;position:absolute;top:0;left:0;transition:transform 0.2s ease;box-shadow:0 1px 3px rgba(0,0,0,0.3);";

    var trackStyle =
      "width:" + _width + ";height:" + _height + ";border-radius:" + _height +
      ";background-color:" + (p.value ? _activeColor : _inactiveColor) +
      ";position:relative;cursor:pointer;transition:background-color 0.2s ease;display:inline-block;";

    if (p.value) {
      thumbStyle += "transform:translateX(calc(" + _width + " - " + _height + "));";
    }

    var thumb = WidgetParse.getNxWidget("Box", { style: thumbStyle }, "div", "", ["style"]);

    var switchWidget = WidgetParse.getNxWidget(
      "Box",
      {
        value: p.value,
        style: trackStyle + (p.style || ""),
        child: [thumb],
        on: {
          click: function () {
            this.value = !this.value;
          },
        },
        watch: {
          value: function (oldVal, newVal) {
            this.style = "background-color:" + (newVal ? _activeColor : _inactiveColor) + ";";
            thumb.style = newVal
              ? "transform:translateX(calc(" + _width + " - " + _height + "));"
              : "transform:translateX(0);";
            _onChange && _onChange.call(this, newVal);
          },
        },
        getValue: function () { return this.value; },
        setValue: function (val) { this.value = val; },
      },
      "div",
      "",
      ["style", "show", "vif", "value"]
    );

    return switchWidget;
  },

  Link: function (text, p) {
    !p && (p = {});
    p.text = text || "";
    p.tag = "a";
    if (p.href) {
      p.attributes = 'href="' + p.href + '"';
      if (p.target) {
        p.attributes += ' target="' + p.target + '"';
      }
    }
    return WidgetParse.getNxWidget("Text", p, "a", "color:#4B95FF;text-decoration:none;cursor:pointer;", [
      "text",
      "style",
      "className",
      "show",
      "vif",
    ]);
  },

  Button: function (text, p) {
    !p && (p = {});
    p.text = text || "";
    return WidgetParse.getNxWidget(
      "Text",
      p,
      "button",
      "padding:8px 16px;border:none;border-radius:4px;background-color:#4B95FF;color:#fff;cursor:pointer;font-size:14px;outline:none;transition:opacity 0.2s;",
      ["text", "style", "className", "show", "vif"]
    );
  },

  /**
   * Divider 分割线
   */
  Divider: function (text, p) {
    !p && (p = {});
    var isVertical = p.vertical || false;
    var dashed = p.dashed ? "border-style:dashed;" : "";
    var color = p.color || "#e8e8e8";

    if (isVertical) {
      p.text = "";
      return WidgetParse.getNxWidget(
        "Box",
        p,
        "div",
        "display:inline-block;width:1px;min-height:1em;margin:0 8px;vertical-align:middle;background-color:" + color + ";" + dashed,
        ["style", "className", "show", "vif"]
      );
    }

    if (text) {
      p.text = text;
      return WidgetParse.getNxWidget(
        "Text",
        p,
        "div",
        "display:flex;align-items:center;font-size:14px;color:#666;white-space:nowrap;margin:24px 0;" +
          "::before{content:\"\";flex:1;border-top:1px solid " + color + ";" + dashed + "margin-right:16px;}" +
          "::after{content:\"\";flex:1;border-top:1px solid " + color + ";" + dashed + "margin-left:16px;}",
        ["text", "style", "className", "show", "vif"]
      );
    }

    p.text = "";
    return WidgetParse.getNxWidget(
      "Box",
      p,
      "div",
      "border-top:1px solid " + color + ";" + dashed + "margin:24px 0;",
      ["style", "className", "show", "vif"]
    );
  },

  /**
   * Row 行容器（flex 布局）
   */
  Row: function (p) {
    !p && (p = {});
    var gutter = p.gutter || 0;
    var justify = p.justify || "flex-start";
    var align = p.align || "top";
    var wrap = p.wrap !== false ? "flex-wrap:wrap;" : "";
    var alignMap = { top: "flex-start", middle: "center", bottom: "flex-end" };

    return WidgetParse.getNxWidget(
      "Box",
      p,
      "div",
      "display:flex;" + wrap + "justify-content:" + justify + ";align-items:" + (alignMap[align] || align) + ";margin-left:-" + (gutter / 2) + "px;margin-right:-" + (gutter / 2) + "px;",
      ["style", "child", "className", "show", "vif"]
    );
  },

  /**
   * Col 列容器
   */
  Col: function (p) {
    !p && (p = {});
    var span = p.span || 24;
    var gutter = p.gutter || 0;
    var offset = p.offset || 0;
    var widthPercent = (span / 24) * 100;
    var offsetPercent = (offset / 24) * 100;
    var offsetStyle = offset ? "margin-left:" + offsetPercent + "%;" : "";

    return WidgetParse.getNxWidget(
      "Box",
      p,
      "div",
      "flex:0 0 " + widthPercent + "%;max-width:" + widthPercent + "%;padding-left:" + (gutter / 2) + "px;padding-right:" + (gutter / 2) + "px;" + offsetStyle,
      ["style", "child", "className", "show", "vif"]
    );
  },

  /**
   * Space 间距容器
   */
  Space: function (p) {
    !p && (p = {});
    var size = p.size || 8;
    var direction = p.direction === "vertical" ? "column" : "row";
    var wrap = p.wrap ? "flex-wrap:wrap;" : "";
    var align = p.align || "center";

    return WidgetParse.getNxWidget(
      "Box",
      p,
      "div",
      "display:inline-flex;flex-direction:" + direction + ";align-items:" + align + ";gap:" + size + "px;" + wrap,
      ["style", "child", "className", "show", "vif"]
    );
  },

  /**
   * Checkbox 复选框
   */
  Checkbox: function (text, p) {
    !p && (p = {});
    var initialChecked = p.checked || false;
    var disabled = p.disabled || false;
    var _onChange = p.onChange;

    var box = WidgetParse.getNxWidget("Box", {
      style: "width:16px;height:16px;border:2px solid " + (initialChecked ? "#4B95FF" : "#d9d9d9") +
        ";border-radius:3px;background-color:" + (initialChecked ? "#4B95FF" : "#fff") +
        ";display:inline-flex;align-items:center;justify-content:center;transition:all 0.2s;cursor:" +
        (disabled ? "not-allowed" : "pointer") + ";flex-shrink:0;margin-right:8px;",
      child: [
        WidgetParse.getNxWidget("Text", {
          text: initialChecked ? "\u2713" : "",
          style: "font-size:12px;color:#fff;line-height:1;"
        }, "span", "", ["text", "style"])
      ]
    }, "div", "", ["style", "child"]);

    var label = WidgetParse.getNxWidget("Text", {
      text: text || "",
      style: "color:" + (disabled ? "#bbb" : "#333") + ";font-size:14px;cursor:" + (disabled ? "not-allowed" : "pointer") + ";"
    }, "span", "", ["text", "style"]);

    var wrapper = WidgetParse.getNxWidget("Box", {
      value: initialChecked,
      style: "display:inline-flex;align-items:center;cursor:" + (disabled ? "not-allowed" : "pointer") + ";user-select:none;" + (p.style || ""),
      child: [box, label],
      on: disabled ? null : {
        click: function () {
          this.value = !this.value;
        }
      },
      watch: {
        value: function (oldVal, newVal) {
          box.style = "border-color:" + (newVal ? "#4B95FF" : "#d9d9d9") +
            ";background-color:" + (newVal ? "#4B95FF" : "#fff") + ";";
          box.getChild(0).text = newVal ? "\u2713" : "";
          _onChange && _onChange(newVal);
        }
      },
      getValue: function () { return this.value; },
      setValue: function (val) { this.value = val; }
    }, "div", "", ["style", "child", "show", "vif", "value"]);

    return wrapper;
  },

  /**
   * Radio 单选框
   */
  Radio: function (text, p) {
    !p && (p = {});
    var initialChecked = p.checked || false;
    var disabled = p.disabled || false;
    var _onChange = p.onChange;

    var dot = WidgetParse.getNxWidget("Box", {
      style: "width:8px;height:8px;border-radius:50%;background-color:" + (initialChecked ? "#4B95FF" : "transparent") + ";transition:all 0.2s;"
    }, "div", "", ["style"]);

    var circle = WidgetParse.getNxWidget("Box", {
      style: "width:16px;height:16px;border:2px solid " + (initialChecked ? "#4B95FF" : "#d9d9d9") +
        ";border-radius:50%;display:inline-flex;align-items:center;justify-content:center;transition:all 0.2s;cursor:" +
        (disabled ? "not-allowed" : "pointer") + ";flex-shrink:0;margin-right:8px;",
      child: [dot]
    }, "div", "", ["style", "child"]);

    var label = WidgetParse.getNxWidget("Text", {
      text: text || "",
      style: "color:" + (disabled ? "#bbb" : "#333") + ";font-size:14px;"
    }, "span", "", ["text", "style"]);

    var wrapper = WidgetParse.getNxWidget("Box", {
      value: initialChecked,
      style: "display:inline-flex;align-items:center;cursor:" + (disabled ? "not-allowed" : "pointer") + ";user-select:none;" + (p.style || ""),
      child: [circle, label],
      on: disabled ? null : {
        click: function () {
          if (!this.value) {
            this.value = true;
          }
        }
      },
      watch: {
        value: function (oldVal, newVal) {
          circle.style = "border-color:" + (newVal ? "#4B95FF" : "#d9d9d9") + ";";
          dot.style = "background-color:" + (newVal ? "#4B95FF" : "transparent") + ";";
          _onChange && _onChange(newVal);
        }
      },
      getValue: function () { return this.value; },
      setValue: function (val) { this.value = val; }
    }, "div", "", ["style", "child", "show", "vif", "value"]);

    return wrapper;
  },

  /**
   * RadioGroup 单选组
   */
  RadioGroup: function (p) {
    !p && (p = {});
    var options = p.options || [];
    var value = p.value || "";
    var radios = [];
    var radioWidgets = [];

    options.forEach(function (opt, idx) {
      var isChecked = (typeof opt === "object" ? opt.value : opt) === value;
      var labelText = typeof opt === "object" ? opt.label : opt;
      var optValue = typeof opt === "object" ? opt.value : opt;

      var radio = WidgetManager.Radio(labelText, {
        checked: isChecked,
        style: "margin-right:16px;",
        onChange: function () {
          value = optValue;
          radioWidgets.forEach(function (r, i) {
            if (i !== idx) r.setValue(false);
          });
          p.onChange && p.onChange(optValue);
        }
      });
      radios.push(radio);
      radioWidgets.push(radio);
    });

    var group = WidgetParse.getNxWidget("Box", {
      style: "display:inline-flex;align-items:center;flex-wrap:wrap;" + (p.style || ""),
      child: radios,
      getValue: function () { return value; },
      setValue: function (val) {
        value = val;
        options.forEach(function (opt, idx) {
          var optValue = typeof opt === "object" ? opt.value : opt;
          radioWidgets[idx].setValue(optValue === val);
        });
      }
    }, "div", "", ["style", "child", "show", "vif"]);

    return group;
  },

  //moreWiget...
};

export default WidgetManager;

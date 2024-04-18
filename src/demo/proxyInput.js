const Spark = require("../index.js");

console.log(Spark);

var title1 = Spark.Text("单行输入框：", { style: "padding:5px;" });

var Input = Spark.Input({
  watch: {
    value(o, n) {
      !this.placeholderEnable && (Text.getChild(0).text = n);
    },
  },
  on: {
    press() {
      Input3.enable = false;
    },
  },
});

var title1_1 = Spark.Text("多行输入框：", { style: "padding:5px;" });

var Input2 = Spark.Input({
  on: {
    inputing: function (e) {
      Text.getChild(0).text = this.value;
      Input3.enable = true;
    },
  },
  placeholder: "请输入...",
  multiline: true,
});

var title1_2 = Spark.Text("禁止输入", { style: "padding:5px;" });

var Input3 = Spark.Input({
  on: {
    inputing: function (e) {
      Text.getChild(0).text = this.value;
    },
  },
  enable: false,
  value: "---spark---",
});

var title2 = Spark.Text("输出框：", {
  style: "padding:20px 5px 5px;display:block;",
});
var Text = Spark.Box({
  style: Input.style + "color:#4B95FF;border:0;margin:0;",
  child: [Spark.Text("---")],

  init() {
    Input.value = 8888;
    // Input.autofocus()
  },
});

Spark.Page({
  //定义路由信息
  link: {
    name: "page1",
    path: "/",
  },
  style:
    "width:100%;min-height:" +
    Spark.screen.height() +
    "px;background-color:#fff;color:#34495e;overflow:hidden;padding:20px;",
  child: [title1, Input, title1_1, Input2, title1_2, Input3, title2, Text],
});

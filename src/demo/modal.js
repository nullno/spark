import Spark from "../index.js";

console.log(Spark);

var Modal1 = Spark.Modal({
  style:
    "width:500px;height:200px;background:#fff;border:2px solid #7566F9;border-radius:5px;overflow:hidden;",
  showAni: { ani: "fadeInDown 100ms ease-out both" },
  hideAni: { ani: "fadeOutUp 100ms both", time: 100 },
  bgClose: true, //点击任意可关闭 默认false
  // bgColor:'rgba(255,255,255,0.5)',//背景颜色 默认rgba(0,0,0,0.5)
  bgShow: true, //是否有背景 默认false
  drag: false, //是否可拖动 默认false
  // position:'bottomright', //topcener/topleft/topright/bottomcenter/bottomleft/bottomright 默认center
  // positionMargin:'3%', //距离边距间距 默认3%
  //autoClose:3000,//设置毫秒延时自动关闭，默认不false
  child: [
    Spark.Text("x", {
      style:
        "position:absolute;background:#7566F9;text-align:center;color:#fff; width:30px;height:30px;line-height:30px; right:0;top:0;",
      on: {
        click() {
          Modal1.close();
        },
      },
    }),
  ],
});

var Modal2 = Spark.Modal({
  style:
    "width:500px;height:200px;background:#fff;border:2px solid #7566F9;border-radius:5px;overflow:hidden;",
  showAni: { ani: "fadeInDown 100ms ease-out both" },
  hideAni: { ani: "fadeOutUp 100ms both", time: 100 },
  // bgClose:true,//点击任意可关闭 默认false
  // bgColor:'rgba(255,255,255,0.5)',//背景颜色 默认rgba(0,0,0,0.5)
  //bgShow:true,//是否有背景 默认false
  drag: false, //是否可拖动 默认false
  // position:'bottomright', //topcener/topleft/topright/bottomcenter/bottomleft/bottomright 默认center
  // positionMargin:'3%', //距离边距间距 默认3%
  //autoClose:3000,//设置毫秒延时自动关闭，默认不false
  child: [
    Spark.Text("x", {
      style:
        "position:absolute;background:#7566F9;text-align:center;color:#fff; width:30px;height:30px;line-height:30px; right:0;top:0;",
      on: {
        click() {
          Modal2.close();
        },
      },
    }),
  ],
});

var btncss = Spark.Css(
  "background:#7566F9;color:#fff;border-radius:5px;padding:20px 10px;margin:5px;"
);

var option1 = Spark.Text("弹窗1", {
  className: btncss,
  on: {
    click() {
      Modal1.open();
    },
  },
});
var option2 = Spark.Text("弹窗2(默认 center)", {
  className: btncss,
  on: {
    click() {
      Modal2.position = "center";
      Modal2.open();
    },
  },
});

var option3 = Spark.Text("弹窗3(topcenter)", {
  className: btncss,
  on: {
    click() {
      Modal2.position = "topcenter";
      Modal2.open();
    },
  },
});

var option4 = Spark.Text("弹窗4(bottomcenter)", {
  className: btncss,
  on: {
    click() {
      Modal2.position = "bottomcenter";
      Modal2.open();
    },
  },
});

var option5 = Spark.Text("弹窗5(bottomleft)", {
  className: btncss,
  on: {
    click() {
      Modal2.position = "bottomleft";
      Modal2.open();
    },
  },
});

var option6 = Spark.Text("弹窗6(自动关闭2000ms)", {
  className: btncss,
  on: {
    click() {
      Modal2.autoClose = 2000;
      Modal2.position = "topcenter";
      Modal2.open();
      // Modal2.autoClose = false;
    },
  },
});

var optionBox = Spark.Fixed({
  style:
    "width:100%;display:flex;justify-content:center;top:50%;margin-top:-25px;background:transparent;",
  child: [option1, option2, option3, option4, option5, option6],
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
    "px;background-color:#fff;color:#34495e;overflow:hidden;",
  child: [Modal1, Modal2, optionBox],
});

import Spark from "../index.js";

console.log(Spark);

var Navcss = Spark.Css(
  "width:50%;display:inline-block;background:transparent;text-align:center;"
);

var nextbtn = Spark.Text("前进", {
  on: {
    click() {
      Spark.router.go(1);
    },
  },
});

var backbtn = Spark.Text("返回", {
  on: {
    click() {
      Spark.router.go(-1);
    },
  },
});

var nav = Spark.Fixed({
  style:
    "bottom:0;width:100%;height:100px;line-height:100px;color:#fff; background:blue;display:flex;justify-content:space-around;",
  stopProp: true,
  diyfn(index) {
    Navcss.style = "background:transparent";
    this.getChild(index).style = "background:red;";
    // console.log(Spark.route)
  },
  activated() {
    this.diyfn(Spark.route.name == "page1" ? 0 : 1);
  },
  child: [
    Spark.Text("PAGE-1", {
      className: Navcss,
      on: {
        click() {
          // Spark.router.push({ name: "page1" });
          Spark.router.push("/?sss=2323"); //{ name: "page1" }
        },
      },
    }),
    Spark.Text("PAGE-2", {
      className: Navcss,
      on: {
        click() {
          // Spark.router.push("/page2/222/151");
          // Spark.router.push({
          //   path: "/page2/222/151",
          //   query: { aaaaaa: "2323" },
          // });
          Spark.router.push({
            name: "page2",
            params: { id: "22222", nid: "151" },
            query: { bbbb: "2323" },
          });
        },
      },
    }),
  ],
  created() {
    console.log("nav created", Spark.route);
  },
});

var ddd = Spark.Text("666", {
  vif: false,
  // show:false
});

var Hi = Spark.Text("hello spark!", {
  style:
    "font-size:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);min-width:300px;text-align:center;",
  stopProp: true,
  created() {
    console.log("Hi->", Spark.route.query);
  },
  activated() {
    this.text = Spark.route.query.sss || this.text;
    console.log("actived", this.$el);
  },
  on: {
    click() {
      // this.before(ddd);
      // ddd.show=true
      ddd.vif = true;
    },
    press() {
      this.text = "不要摸我嘛~";
    },
    up() {
      this.text = "----SPARK----";
    },
  },
});

/*返回顶部*/
var scrollTop1 = Spark.Fixed({
  style:
    "width:50px;height:50px;border-radius:50px;padding:9px; background:yellowgreen;right:20px;bottom:20px;",
  child: [Spark.Text("回到<br>顶部")],
  on: {
    click: function () {
      Spark.scrollTop(0, 500);
    },
  },
});

Spark.Page({
  //定义路由信息
  link: {
    name: "page1",
    path: "/",
    meta: {
      title: "你好",
    },
  },
  style:
    "width:100%;min-height:" +
    Spark.screen.height() +
    "px;background-color:#fff;color:#34495e;",
  child: [Hi, ddd, scrollTop1, nav, backbtn],
  // keepalive:false,
  created() {
    console.log(Spark.route.query);
    console.log("page1 created");
  },
  on: {
    click() {
      if (Hi.text == "hello spark!") {
        Hi.text = "hello word!";
        this.style = "background-color:#34495e;color:#fff;";
        // this.append(Hi)
      } else {
        Hi.text = "hello spark!";
        this.style = "background-color:#fff;color:#34495e;";

        // Hi.remove()
      }
    },
  },
});

Spark.Page({
  //定义路由信息
  link: {
    name: "page2",
    path: "/page2/:id/:nid",
  },
  style:
    "width:100%;min-height:" +
    Spark.screen.height() +
    "px;background-color:#1FCBC6;color:#fff;",
  child: [Hi, nav, backbtn],
  created() {
    console.log("page2 created");
  },
  activated() {
    // console.log("actived" + this);
  },
  deactivated() {
    // console.log('deactivated')
  },
});

// Spark.router.push("/index");

import Spark from "../index.js";

window.Spark = Spark;

console.log(window.Spark);
var listStyle = Spark.Css(
  "background-color:#fff;margin:5px;padding:5px;line-height:50px;color:#666;overflow:hidden;border-radius:5px;box-shadow:0 0 5px #ccc;"
);

var List = Spark.List({
  data: [
    { a: "item", b: "hello world" },
    { a: "item", b: "hello spark" },
    { a: "item", b: "hello CS" },
  ],
  item(item, index) {
    var template = Spark.Box({
      tag: "li",
      className: listStyle,
      style: "background-color:#fff;",
      showAni: { ani: "fadeInLeft 500ms  both" },
      hideAni: { ani: "bounceOutRight 500ms both", time: 222 },
      child: [
        Spark.Text(index, { listIndex: true }),
        Spark.Text("---" + item.b),
        Spark.Text("删除", {
          style: "float:right;",
          on: {
            click() {
              template.remove(); //{ ani: "bounceOutRight 500ms both", time: 500 }
            },
          },
        }),
      ],
      init() {
        // if(this.listIndex== 1){
        //     this.style='background-color:#7566F9;color:#fff;';
        // }else{
        //     this.style='background-color:#fff;color:#666;';
        // }
      },
      on: {
        click() {
          alert(item.b);
        },
        hover() {
          // listStyle.style = "background-color:#fff;color:#666;";
          this.style = "background-color:#7566F9;color:#fff;";
        },
        leave() {
          this.style = "background-color:#fff;color:#666;";
        },
      },
    });

    return template;
  },
});

var btncss = Spark.Css(
  "background:#7566F9;color:#fff;border-radius:5px;padding:20px 10px;margin:5px;"
);

var option1 = Spark.Text("头部插入数据", {
  className: btncss,
  on: {
    click() {
      List.insertFirst({
        a: "item",
        b: "头部插入数据1" + Math.random(0, 100) * 10,
      });
    },
  },
});
var option2 = Spark.Text("尾部插入数据", {
  className: btncss,
  on: {
    click() {
      List.insertLast([
        { a: "item", b: "尾部插入数据1" + Math.random(0, 100) * 10 },
        { a: "item", b: "尾部插入数据2" + Math.random(0, 100) * 10 },
      ]);
    },
  },
});

var option3 = Spark.Text("指定位置插入数据", {
  className: btncss,
  on: {
    click() {
      List.insert(1, [
        { a: "item", b: "指定位置插入数据1" + Math.random(0, 100) * 10 },
        { a: "item", b: "指定位置插入数据2" + Math.random(0, 100) * 10 },
      ]);
    },
  },
});

var option4 = Spark.Text("更新倒数第二条数据", {
  className: btncss,
  on: {
    click() {
      List.update(List.data.length - 2, {
        a: "更新",
        b: "倒数第二条数据已更新",
        c: { f: "666666" },
      });
    },
  },
});

var option5 = Spark.Text("删除倒数第二条数据", {
  className: btncss,
  on: {
    click() {
      List.delete(List.data.length - 2, 1);
    },
  },
});

var option6 = Spark.Text("删除前两条数据", {
  className: btncss,
  on: {
    click() {
      List.delete(0, 2);
    },
  },
});

var option7 = Spark.Text("清空数据", {
  className: btncss,
  on: {
    click() {
      List.clear();
    },
  },
});

var OptionMenu = Spark.Fixed({
  style:
    "width:100%;display:flex;justify-content:center;bottom:3%;background:transparent;",
  child: [option1, option2, option3, option4, option5, option6, option7],
});

// var List2 = Spark.List({
//   // data:[],
//   item(item, index) {
//     var template = Spark.Box({
//       tag: "li",
//       className: listStyle,
//       // style: "background-color:#fff;",
//       // showAni: { ani: "fadeInLeft 500ms  both" },
//       // hideAni: { ani: "bounceOutRight 500ms both", time: 222 },
//       child: [
//         Spark.Text(index, { listIndex: true }),
//         Spark.Text(
//           "---<b>(" +
//             item.date +
//             ")</b> 最高温度:" +
//             item.tmp_max +
//             "°C-最底温度:" +
//             item.tmp_min +
//             "°C"
//         ),
//         Spark.Text("删除", {
//           style: "float:right;",
//           on: {
//             click() {
//               template.remove({ ani: "bounceOutRight 500ms both", time: 500 });
//             },
//           },
//         }),
//       ],
//       on: {
//         click() {
//           alert("天气状况：" + item.cond_txt_d);
//         },
//         hover() {
//           listStyle.style = "background-color:#fff;color:#666;";
//           this.style = "background-color:#7566F9;color:#fff;";
//         },
//         leave() {
//           this.style = "background-color:#fff;color:#666;";
//         },
//       },
//     });

//     return template;
//   },
//   async init() {
//     const Res = await Spark.axios.get(
//       "https://www.hao123.com/api/getgoodthing?pageSize=3"
//     );
//     console.log(Res);
//     // this.insertLast(res.data.daily_forecast);
//   },
// });

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
  child: [List, OptionMenu],
});

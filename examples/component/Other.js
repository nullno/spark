/*#include [Carousel1->component/Carousel1];
 */
var Other = {
  render: function () {
    var Carousel1 = Spark.module.Carousel1;
    var title1 = Spark.Text("状态：", {
      child: [
        (activeText = Spark.Text("READY....", {
          style: "color:red;",
          watch: {
            text(ov, nv) {
              console.log("ov:" + ov, "nv:" + nv);
            },
          },
        })),
      ],
      tag: "h1",
      style: "width:90%;margin:0 auto;",
    });

    var boxComCss = Spark.Css(
      "position:absolute;width:50%;height:100%;text-align:left;padding:5px;background:#666;z-index:0;top:0;"
    );
    var useCode = Spark.Text("READY....", {
      tag: "pre",
      className: boxComCss,
      style: "left:0;",
      on: {
        click: function () {
          useCode.text = "显示隐藏：\n\nimg1.show=!img1.show";
          img1.show = !img1.show;
        },
      },
    });

    var node1 = Spark.Box({
      style:
        "min-width:20px;height:20px;background:red;display:inline-block;margin:2px;color:#fff;padding:0 5px;line-height:20px;overflow:hidden;",
      showAni: { ani: "zoomIn 500ms both" },
      hideAni: { ani: "bounceOut 500ms both", time: 500 },
      on: {
        click: function () {
          this.prepend(Spark.Text("node1"));
        },
      },
    });

    var img1 = Spark.Image(
      "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3836963292,3556801655&fm=26&gp=0.jpg",
      {
        style: "width:100px;display:inline-block;",
        idName: "tupian",
        showAni: { ani: "zoomIn 500ms both" },
        hideAni: { ani: "bounceOut 500ms both", time: 500 },
        show: true, //默认true;
      }
    );

    var targetContainer = Spark.Box({
      className: boxComCss,
      style: "right:0;",
      child: [node1, img1],
    });

    var bthcss = Spark.Css(
      "border:0;position:absolute;bottom:2px;background-color:#ccc;color:#fff;padding:10px;"
    );
    var wrapcss = Spark.Css(
      "width:90%;height:300px;margin:20px auto;border:1px dashed #fff; border-radius:5px;position:relative;text-align:center;"
    );

    var bthcss5 = Spark.Css("background:red; color:pink;");
    var btnAdd1 = Spark.Box({
      tag: "button",
      style: "background-color:green;left:2px;",
      className: bthcss,
      child: [Spark.Text("ADD append")],
      shover: bthcss5,
      on: {
        click: function (_this) {
          activeText.text = "append";
          useCode.text =
            "后置追加元素：\n\n方法1:targetContainer.append([node1,node1]);\n方法2：Spark.append(targetContainer,[node1,node1]);";
          targetContainer.append([node1, node1]);
        },
      },
    });

    var btnAdd2 = Spark.Box({
      tag: "button",
      style: "background-color:green;left:2px;bottom:45px;",
      className: bthcss,
      child: [Spark.Text("ADD prepend")],
      on: {
        click: function (_this) {
          activeText.text = "prepend";
          useCode.text =
            "前置添加元素：\n\n方法1:targetContainer.prepend(node2);\n方法2：Spark.prepend(targetContainer,node2);";
          targetContainer.prepend(
            Spark.Box({
              style:
                "min-width:20px;height:20px;background:yellow;display:inline-block;margin:2px;color:blue;padding:0 5px;line-height:20px;overflow:hidden;animation: bounceInLeft 0.5s both;",
              showAni: { ani: "bounceInLeft 0.5s both" },
              hideAni: { ani: "bounceOut 500ms both", time: 500 },
              on: {
                click: function () {
                  this.prepend(Spark.Text("node2"));
                },
              },
            })
          );
        },
      },
    });

    /*after()*/
    var btnAfter = Spark.Box({
      tag: "button",
      style: "background-color:green;left:100px;",
      className: bthcss,
      child: [Spark.Text("ADD after")],
      on: {
        click: function (_this) {
          activeText.text = "after";
          useCode.text =
            "指定元素后插入：\n\nimg1.after(<w>,{ani:<ani string>})";

          img1.after([
            Spark.Box({
              style:
                "min-width:20px;height:20px;background:pink;display:inline-block;margin:2px;color:blue;padding:0 5px;line-height:20px;overflow:hidden;",
              showAni: { ani: "zoomIn 500ms both" },
              hideAni: { ani: "bounceOut 500ms both", time: 500 },
              on: {
                click: function () {
                  this.prepend(Spark.Text("node3"));
                },
              },
            }),
          ]);
        },
      },
    });
    /*before()*/
    var btnBefore = Spark.Box({
      tag: "button",
      style: "background-color:green;left:100px;bottom:45px;",
      className: bthcss,
      child: [Spark.Text("ADD before")],
      on: {
        click: function (_this) {
          activeText.text = "before";
          useCode.text =
            "指定元素前插入：\n\nimg1.before(<w>,{ani:<ani string>})";

          img1.before(node1);
        },
      },
    });

    var btnDel1 = Spark.Box({
      tag: "button",
      style: "background-color:#666;right:2px;",
      className: bthcss,
      child: [Spark.Text("DEL Target node")],
      on: {
        click: function (_this) {
          activeText.text = "remove widget";
          useCode.text =
            "删除指定元素：\n\n方法1:node1.remove(ani);\n方法2：Spark.remove(targetContainer,node1);";
          // node1.style='animation: bounceOut 500ms both';
          node1.remove();

          // targetContainer.empty();
          // Spark.remove(targetContainer,node1);
        },
      },
    });

    var btnDel2 = Spark.Box({
      tag: "button",
      style: "background-color:#666;right:2px;bottom:45px;",
      className: bthcss,
      child: [Spark.Text("DEL index=0")],
      on: {
        click: function (_this) {
          activeText.text = "remove WidgetIndex";
          useCode.text =
            "删除索引元素：\n\n方式1：targetContainer.remove(<Widget> | <Index> |<firstChild,lastChild>)\n\n方式2：\n删除指定索引：Spark.remove(targetContainer,2);\n删除第一个:Spark.remove(targetContainer,'firstChild')\n删除最后一个：Spark.remove(targetContainer,'lastChild');";

          targetContainer.removeChild(node1);
        },
      },
    });

    var wrap = Spark.Box({
      className: wrapcss,
      style: "overflow:hidden;",
      child: [
        useCode,
        targetContainer,
        btnAdd1,
        btnAdd2,
        btnAfter,
        btnBefore,
        btnDel1,
        btnDel2,
      ],
      watch: {
        child: function (o, n) {
          console.log("update");
        },
      },
      on: {
        hover: function () {
          this.style = "border:1px dashed red;";
        },
        leave: function () {
          this.style = "border:1px dashed #fff;";
        },
      },
    });

    var title2 = Spark.Text("列表渲染：", {
      tag: "h1",
      style: "width:90%;margin:0 auto;",
    });

    var listStyle = Spark.Css("margin:5px;padding:5px;background-color:#666;"); //animation: fadeInLeft 500ms both;

    var List = Spark.List({
      data: [
        { a: "item", b: "hello world" },
        { a: "item", b: "hello spark" },
        { a: "item", b: "hello CS" },
      ],
      style:
        "width:100%;margin:0px auto;padding:5px;padding-bottom:100px;overflow:hidden;",
      item: function (item, index) {
        return Spark.Box({
          tag: "li",
          style:
            "margin:5px;padding:5px;background-color:#666;border:1px dashed #fff;",
          className: listStyle,
          showAni: { ani: "fadeInLeft 500ms  both" },
          hideAni: { ani: "bounceOutRight 500ms both", time: 500 },
          child: [
            Spark.Box({
              style:
                "min-width:20px;height:20px;background:blue;line-height:20px;float:left;",
              child: [Spark.Text(index, { listIndex: true })],
            }),
            Spark.Text(index, { listIndex: true }),
            Spark.Text("---" + item.a + "---", {
              on: {
                click() {
                  alert(item.b);
                },
              },
            }),
            item.c ? Spark.Text(item.c.f) : Spark.Text(item.b),
          ],
          init() {
            if (this.listIndex == 1) {
              this.style = "background-color:red;";
            } else {
              this.style = "background-color:#666;";
            }
          },
          on: {
            click() {
              listStyle.style = "background-color:#666;";
              this.style = "background-color:red;";
              this.remove({ ani: "bounceOutRight 500ms both", time: 500 });
              console.log(item);
            },
          },
        });
      },
    });

    /*渲染列表框*/
    var wrap2 = Spark.Box({
      className: wrapcss,
      style: "min-height:300px;height:auto;",
      child: [
        List,
        Spark.Text("尾部插入1", {
          tag: "button",
          className: bthcss,
          style: "background-color:green;left:2px;bottom:0;",
          on: {
            click() {
              useCode.text =
                "尾部插入:\n\nList.insertLast([{a:'item',b:'hello spark2'}])";
              List.insertLast([
                { a: "item", b: "hello spark2" + Math.random(0, 100) * 10 },
                { a: "item", b: "hello spark2" + Math.random(0, 100) * 10 },
              ]);
              // console.log(List)
            },
          },
        }),
        Spark.Text("头部插入2", {
          tag: "button",
          className: bthcss,
          style: "background-color:green;left:2px;bottom:45px;",
          on: {
            click() {
              useCode.text =
                "头部插入:\n\nList.insertFirst({a:'item',b:'hello spark2'})";
              List.insertFirst({
                a: "item",
                b: "hello spark1" + Math.random(0, 100) * 10,
              });

              // console.log(List)
            },
          },
        }),
        Spark.Text("指定位置插入3", {
          tag: "button",
          className: bthcss,
          style: "background-color:green;left:85px;bottom:0;",
          on: {
            click() {
              useCode.text = "指定位置插入:\n\n List.insert(5,<data>)";

              List.insert(1, [
                { a: "item", b: "hello spark331" + Math.random(0, 100) * 10 },
                { a: "item", b: "hello spark1" + Math.random(0, 100) * 10 },
              ]);
            },
          },
        }),
        Spark.Text("更新数据1", {
          tag: "button",
          className: bthcss,
          style: "background-color:green;left:85px;bottom:45px;",
          on: {
            click() {
              useCode.text = "更新数据:\n\n List.update(index,<newdata>)";

              List.update(List.data.length - 2, {
                a: "hellllllll",
                c: { f: "666666" },
              });
            },
          },
        }),
        Spark.Text("删除列表", {
          tag: "button",
          className: bthcss,
          style: "background-color:#666;right:2px;bottom:0;",
          on: {
            click() {
              useCode.text =
                "删除选中范围列表:\n\nList.delete(0,3);\n\n清空列表:\n\nList.clear();";
              // List.delete(0,1);
              List.clear();
            },
          },
        }),
      ],
    });

    var title3 = Spark.Text("层叠容器/可拖动容器:", {
      tag: "h1",
      style: "width:90%;margin:0 auto;",
    });

    var Stack1 = Spark.Stack({
      style:
        "width:50%;height:300px;background:#fff;overflow:hidden;float:left;",
      child: [
        Spark.Position({
          child: [Spark.Text("移动端不显示")],
          style: "width:100px;height:100px;background:blue;",
          show: Spark.env.isMobile ? false : true,
        }),
        !Spark.env.isMobile
          ? Spark.Position({
              child: [Spark.Text("移动端不渲染")],
              style:
                "width:100px;height:100px;background:#FF8905;left:40px;top:40px;",
            })
          : null,
        Spark.Position({
          style: "width:100px;height:100px;background:pink;left:80px;top:80px;",
          child: [Spark.Text("不可越过边界")],
          on: {
            click() {
              shape1.bounded.out = !shape1.bounded.out;
              this.getChild(0).text = shape1.bounded.out
                ? "不可越过边界"
                : "可越过边界";
            },
          },
        }),
        (shape1 = Spark.Drag({
          style:
            "width:100px;height:100px;background:#9300FF;border-radius:100px;z-index:9;",
          //约束条件
          bounded: {
            // y:true,//Y轴禁止拖动
            // x:true,//X轴禁止拖动
            parent: true, //父盒子约束,默认body
            out: true, //禁止溢出边界
            // disable:true,
          },
          on: {
            move() {
              // console.log(this.position.direction)
              Stack2.getChild(0).style =
                "left:" + this.position.x + "px;top:" + this.position.y + "px;";
            },
          },
        })),
      ],
    });

    var Stack2 = Spark.Stack({
      style:
        "width:50%;height:300px;background:yellow;overflow:hidden;float:right;",
      child: [
        Spark.Position({
          style:
            "width:100px;height:100px;background:#F7156A;border-radius:100px;",
        }),
      ],
    });

    /*层叠容器/可拖动容器：*/
    var wrap3 = Spark.Box({
      className: wrapcss,
      style: "min-height:300px;height:auto;",
      child: [Stack1, Stack2],
    });

    /*轮播图：*/
    var title4 = Spark.Text("轮播(coding....):", {
      tag: "h1",
      style: "width:90%;margin:0 auto;",
    });

    var wrap4 = Spark.Box({
      className: wrapcss,
      style: "height:300px;",
      child: [
        Carousel1,
        Spark.Text("上一张", {
          tag: "button",
          className: bthcss,
          style: "background-color:rgba(0,0,0,0.5);left:88px;bottom:125px;",
          on: {
            click() {
              Carousel1.slidePrev();
            },
          },
        }),
        Spark.Text("下一张", {
          tag: "button",
          className: bthcss,
          style: "background-color:rgba(0,0,0,0.5);right:88px;bottom:125px;",
          on: {
            click() {
              Carousel1.slideNext();
            },
          },
        }),
      ],
    });

    var title5 = Spark.Text("模态框弹窗:", {
      tag: "h1",
      style: "width:90%;margin:0 auto;",
    });

    var wrap5 = Spark.Box({
      className: wrapcss,
      style:
        "height:100px;display:flex;align-items:center;justify-content:space-around;",
      child: [
        Spark.Text("弹窗1", {
          style: "background-color:green;color:#fff;padding:5px;",
          on: {
            click() {
              Spark.module.Modals.type1.open();
            },
          },
        }),
        Spark.Text("弹窗2(默认 center)", {
          style: "background-color:green;color:#fff;padding:5px;",
          on: {
            click() {
              Spark.module.Modals.type2.position = "center";
              Spark.module.Modals.type2.open();
            },
          },
        }),
        Spark.Text("弹窗3(topcenter)", {
          style: "background-color:green;color:#fff;padding:5px;",
          on: {
            click() {
              Spark.module.Modals.type2.position = "topcenter";
              Spark.module.Modals.type2.open();
            },
          },
        }),
        Spark.Text("弹窗4(bottomcenter)", {
          style: "background-color:green;color:#fff;padding:5px;",
          on: {
            click() {
              Spark.module.Modals.type2.position = "bottomcenter";
              Spark.module.Modals.type2.open();
            },
          },
        }),
        Spark.Text("弹窗5(bottomleft)", {
          style: "background-color:green;color:#fff;padding:5px;",
          on: {
            click() {
              Spark.module.Modals.type2.position = "bottomleft";
              Spark.module.Modals.type2.open();
            },
          },
        }),
        Spark.Text("弹窗6(自动关闭2000ms)", {
          style: "background-color:green;color:#fff;padding:5px;",
          on: {
            click() {
              Spark.module.Modals.type2.autoClose = 2000;
              Spark.module.Modals.type2.position = "bottomcenter";
              Spark.module.Modals.type2.open();
              Spark.module.Modals.type2.autoClose = false;
            },
          },
        }),
      ],
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

    Spark.module.Other = Spark.Box({
      style: "background-color:none;",
      child: [
        title1,
        wrap,
        title2,
        wrap2,
        title3,
        wrap3,
        title4,
        wrap4,
        title5,
        wrap5,
        scrollTop1,
      ],
    });
  },
};

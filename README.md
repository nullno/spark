## Quickly create web pages by JavaScript

#### What is Spark?

`Spark.js` is a lightweight JavaScript library that adopts Dart writing style. It is a three-free product: no need to package, no need to think about className, no need to write HTML, you only need to focus on writing js scripts to create pages, and built-in data binding , event monitoring, routing management, network request and other functions, more component functions will be enriched in the future;

Spark.js` 是一个轻量级的 JavaScript 库，采用 dart 编写风格，它是一个三无产品：无需打包、无需思考 className、无需编写 html，你只需要专注于编写 js 脚本创建页面即可，内置数据绑定，事件监听，路由管理，网络请求等功能，未来会丰富更多组件功能；

## how to use?

Import directly using `<script src="Spark.js"></script>`

## DEMO

```text

└── demo
    ├── index.html
    ├── js
        └── spark.min.js
```

_index.html_ <a href="/demo/index.html"> [DEMO]</a>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Hello Spark</title>
  </head>
  <body>
    <script src="./js/spark.min.js"></script>
    <script>
      var Hi = Spark.Text("Hello Spark", {
        style:
          "font-size:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-weight:bolder;",
        stopProp: true,
        on: {
          press() {
            this.text = "Hello Spark";
          },
          up() {
            this.text = "绽放思想的火花，去智造无限可能";
          },
        },
      });

      var Page = Spark.Page({
        //定义路由信息
        link: {
          name: "page1",
          path: "/",
        },
        style:
          "width:100%;min-height:" +
          Spark.screen.height() +
          "px;background-color:#fff;color:#7566F9;",
        child: [Hi],
        state: 0,
        setColor(str, styleStr) {
          Hi.text = str;
          this.style = styleStr;
          this.state = !this.state;
        },
        on: {
          click() {
            if (!this.state) {
              this.setColor(
                "Hello Spark",
                "background-color:#7566F9;color:#fff;"
              );
            } else {
              this.setColor(
                "Hello Spark",
                "background-color:#fff;color:#7566F9;"
              );
            }
          },
        },
      });
    </script>
  </body>
</html>
```

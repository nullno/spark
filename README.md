## 介绍

> `目前不推荐项目中使用` 

 -------------------

#### Spark是什么

它就像乐高积木，可以拼凑出任何你想要的功能丰富的视图，降低代码维护的多样性，专注用最简单的方式去生产你的乐高玩具，Spark绽放思想的火花，去智造无限可能~

#### 适用对象

* IOT设备界面显示/数据可视化平台；

* 适用于提出不用html用纯js怎么做页面的这种问题的小伙伴；

* 不喜欢 npm 或者觉得编译工具太麻烦的同学；

* 一些全栈开发者 ；

## 使用

1.直接用 `<script>` 方式引入

2.npm安装，`暂未发布`
```
 npm install sparkjs

``` 

演示目录结构：
```text

└── demo
    ├── index.html
    ├── js
        └── spark.min.js
```

*index.html* <a href="/demo/index.html"> [演示]</a>

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
    
   var Hi = Spark.Text('Hello Spark',
      {style:'font-size:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-weight:bolder;',
      stopProp:true,
      on:{  
          press(){
            this.text = 'Hello Spark';
          },
          up(){
                this.text = '绽放思想的火花，去智造无限可能';
          }
        }
      });

    var Page = Spark.Page({
       //定义路由信息 
            link:{
              name:'page1',
              path:'/',
            },  
        style:'width:100%;min-height:'+Spark.screen.height()+'px;background-color:#fff;color:#7566F9;',
        child:[
                 Hi
        ],
        state:0,
        setColor(str,styleStr){
          Hi.text = str
          this.style = styleStr
          this.state =! this.state
        },
        on:{
          click(){
            if(!this.state){
              this.setColor('Hello Spark','background-color:#7566F9;color:#fff;')
            }else{
                this.setColor('Hello Spark','background-color:#fff;color:#7566F9;')
            }
            
          },
        }
       })
  </script>
</body>
</html>
```

## 更新记录

- 2020-11-08  基础组件功能

- 2020-11-19  新增axios，hash方式路由
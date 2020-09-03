# spark.js

- 有人问有没有不用写html直接用js写页面的JS， 今天它来了，let's start sparkweb !

### coding...
### 介绍
 
 基础组件:
 |  组件   | 说明  |   -- | --|
 |  ----  | ----  |  ----  | ----  |
 | Css  | 创建样式 |
 | Box  | 盒子容器 |
 | Image|图片|
 | List |列表渲染| 
 | Position |定位配合Stack使用| 
 | Stack |层叠盒子| 
 | Text |文字| 
 | Drag |可拖动容器|
 | Page |*基本页面组件|
 | Box3 | 插件容器|
 | ...|更多组件功能待开发|
 
 使用：
 ~~~
  var SparkApp = new Spark({
      //Setting parameters
  });
  
  //创建一个公用样式<css string>
  var commcsss = SparkApp.Css('width:90%;height:500px;position:relative;text-align:center;')
  
   //创建盒子
  var testBox1 = SparkApp.Box({
      style:'margin:20px auto;border:1px dashed #fff; border-radius:5px;',//<css string>
      className:commcsss || '.cssname',
      child:[SparkApp.Text('hello spark')]//[<Any Widget>]
  })
  
  //创建页面
  SparkApp.Page({child:[testBox1]})
 ~~~
 

 
 
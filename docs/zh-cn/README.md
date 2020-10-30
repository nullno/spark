## 介绍

> `目前不推荐项目中使用` 

 -------------------

#### Spark是什么？


便捷易用的前端组件库，像堆积木一样简单的去创建页面，借鉴Flutter核心原则，`一切皆为widget`
与其他各功能分离的框架不同，Spark一个对象模型即可包含样式、视图、控制器等功能；

#### 解决了什么痛点？

* 使用Spark前端编写页面，全程几乎都可以使用js代码去完成页面编写，不用同时去维护`*.css/*.html`文件；

* 不使用编译工具，也可以进行Autoprefixer；

* 更少体积的dom/style文件，加载更快；

#### 适用对象？

* IOT设备界面显示/数据可视化平台

* 适用于提出不用html用纯js怎么做页面的这种问题的小伙伴；

* 不喜欢 npm 或者觉得编译工具太麻烦的同学；

* 一些全栈开发者 ；

## 使用

演示目录结构：
```text

└── demo
    ├── index.html
    ├── js
    ├── component
        └── Home.js
```

*index.html* <a href="/demo/index.html"> [演示]</a>

```html  
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>SPARKJS</title>
</head>
<body>
  <script src="./js/spark.js"></script>
  <script>
		var SparkApp = new Spark();
	    SparkApp.Render({name:'Home',path:'component/Home'});
  </script>
</body>
</html>
```
*component/Home.js*
```javascript
var Home={
 render:function(){

    var Hi = SparkApp.Text('hello spark!',
    	{style:'font-size:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);',
    	stopProp:true,
    	on:{  
	     	  press(){
	     			this.text = '不要摸我嘛~';
	     	  },
	     	  up(){
	     	  	    this.text = '----SPARK----';
	     	  }
	     	}
    	});
    var Page = SparkApp.Page({
	     	style:'width:100%;min-height:'+SparkApp.screen.height()+'px;background-color:#fff;color:#34495e;',
	     	child:[
                 Hi
	     	],
	     	on:{
	     		click(){
	     			if(Hi.text=='hello spark!'){
	     				Hi.text = 'hello word!'
	     				this.style='background-color:#34495e;color:#fff;'
	     			}else{
	     				Hi.text = 'hello spark!' 
	     				this.style='background-color:#fff;color:#34495e;'
	     			}
	     			
	     		},
	     	}
	     })

       SparkApp.module.Home =  Page;
	
  }

}
```

## 更新记录
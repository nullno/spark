## 页面(Page)

* Page组件是一个页面`root节点`，等同于一个html页面，渲染的必要组件不可缺少；
* 多个Page组成多页面，会自动开启路由的方式访问页面 [#路由](zh-cn/more-pages.md)；
* `link`配置路由信息，支持路由参数传递；
### <a href="/demo/router.html">[演示]</a>
```javascript
Spark.Page({
  link:{
    name:'',
    path:'/',
    redirect:'',
    meta:{},
    params:{}
  },
	child:[<widget>]
})
Spark.Render();
```
-------------------
## 样式(Css)

定义样式类创建组件，方便样式管理，样式复用,`权重 < 组件.style`;

```javascript
var pagecss = Spark.Css('background-color:#666;font-size:20px;');
Spark.Page({
	className:pagecss,
	style:'background-color:#fff;'，
	child:[<widget>]
})

```
 -------------------
## 文字(Text)

创建文本,默认标签为span,通过tag可定义标签类型，设定text属性值即可改变视图文本

```javascript
Spark.Text('hello spark!',<options>);

var Hi =  Spark.Text('hello spark!',{
	tag:'h1',
	on:{
		click(){
			this.text='hello word!';
		}
	}
})
```
 -------------------
## 图片(Image)
```javascript
Spark.Image('img link',<options>)
```
 -------------------
## 输入框(Input)
```javascript
Spark.Input({
         on:{
               inputing:function(e){
                console.log(this.value)
               }
         },
         value:'',//关键值
         placeholder:'请输入...', //输入提示
       //placeholderStyle:'color:#ccc;',//输入提示样式
       //multiline:true, //是否多输入
       //onStyle:'color:#000;box-shadow:0 0 5px #4B95FF;',//输入时样式
       //offStyle:'color:#ccc;box-shadow:none;',//失去焦点时样式
      
    });

```
`Input.autofocus()` :自动获取焦点

### <a href="/demo/input.html">[演示]</a>
 -------------------
## 容器(Box)
```javascript
Spark.Box({
	child:[Hi]
})
```
 -------------------
## 列表渲染(List)

* 方便渲染列表，`data`属性中储存列表数据，`item`函数根据模板渲染列表；
* 生成的模板对象中包含 `listIndex` 可获取列表索引；
* 可进行数据的插入、删除、更新等操作；


```javascript
   var List =  Spark.List({
		   data:<Array> | <Json Array String> ,
		   item(item,index){
		   	 return <widget template>
		   }

		 })

```
### <a href="/demo/list.html">[演示]</a>
#### 列表操作方法
>列表插入

支持单条，多条数据插入
```javascript
  //尾部追加 
  List.insertLast({a:'item',b:'hello spark1'});
  List.insertLast([{a:'item',b:'hello spark2'},{a:'item',b:'hello spark3'}]);
 
 //头部插入
  List.insertFirst({a:'item',b:'hello spark1')；
 
 //指定位置插入
  List.insert(1,{a:'item',b:'hello spark1'});
  List.insert(1,[{a:'item',b:'hello spark2'},{a:'item',b:'hello spark3']);
                              

```
> 数据更新

指定索引的数据对象更新

```javascript
  List.update(<数据索引>,{a:'itemupdate',c:{f:'数据新属性'}})
```

> 数据删除

可进行数据组的删除，清空操作

```javascript
  //选中范围数据对象删除
  List.delete(0,1);

  //清空数据
  List.clear();
```

 -------------------
## 可拖动容器(Drag)

定义一个可以拖动的容器，通过约束条件可控制拖动的方向；
`position` 属性包含坐标、拖动方向等信息；
`bounded`  属性定义拖动条件；
`bounded.parent` 属性约定是否在父级元素内拖动，定义后不可修改；
```javascript
 Spark.Drag({
         style:'width:100px;height:100px;background:#9300FF;border-radius:100px;z-index:9;',
                     //约束条件
                      bounded:{
                          out:true,//禁止溢出边界
                      },
                      on:{
                        move(){

                          console.log(this.position)；
                        }
                        
                      }
     }) 
```
### <a href="/demo/drag.html">[演示]</a>

> 约束参数
```javascript   
   bounded:{
   			y:true,//Y轴禁止拖动
   			x:true,//X轴禁止拖动
   			parent:true,//父盒子约束,默认body
   			out:true,//禁止溢出边界
   			disable:true,//禁止拖动
   }
```
 -------------------
## 第三方插件(Three)

使用第三方插件，以swiper为例；



 -------------------
## 堆叠容器(Stack)

可进行固定定位、绝对定位、相对定位的容器，当然你仍然可以在其他组件的`style`中编写

```javascript
   //堆叠容器(Stack)
    Spark.Stack({
                 child:[]
              })
   //固定定位容器(Fixed)
   Spark.Fixed({
                 child:[]
              })

   //绝对定位容器(Position)
    Spark.Position({
                 child:[]
              })
```


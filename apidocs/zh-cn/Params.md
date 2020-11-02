## widget.child
> `Array`类型， 放置容器的子组件，`Image,Input`等没有此参数，`List` 设置此参数将会被`List.item()`模板覆盖
```
child:[widget1,widget2.....]
```
## widget.style
> `String`类型，设置css样式字符串,行内换行适用`\`即可
```
style:'background:#666;color:red;'
//换行
style:'background:#666;\
       color:red;\
       margin:0 5px;'
```
## widget.styleObj
>  `Object`类型，获取样式对象，不可定义，跟据样式自动生成的样式对象，可方便获取样式属性的当前值

## widget.className
> `<CssWidget>对象 | class name`，可以适用Css组件创建样式类，也可使用css的样式类名；

```
<style>
.test{background:#666;color:red;}
</style>

className:SparkApp.Css('background:#666;color:red;')

className:'.test'

```

## widget.shover
> `<CssWidget>对象 | css string` ,设置鼠标覆盖样式
```
shover:'background:#666;color:red;'

shover:'SparkApp.Css('background:#666;color:red;')'
```

## widget.tag
> 设置组件的标签类型

## widget.text
> 文本组件的`关键参数`，参数值改变即可影响视图改变


## widget.data
> List组件的`关键参数`，其他组件无设置

## widget.on

> 事件绑定对象，包含常用的事件绑定，兼容PC/移动
```
on:{
	click:function(){},
	press:function(){},
	move:function(){},
	up:function(){},
	hover:function(){},
	enter:function(){},
	out:function(){},
	leave:function(){},
}
```

## widget.show
> `Boolean`类型，设置元素是否显示

## widget.showAni
> 元素进场动画，使用css3 animate 动画，动画推荐使用 `animate.css`http://www.animate.net.cn;
> 也可使用自定义css3动画

```
showAni:{ani:'fadeInLeft 500ms  both'},

```
## widget.hideAni
> 元素离开动画，需设置离开时长ms
```
hideAni:{ani:'bounceOutRight 500ms both',time:500},

```
## widget.$el
> 获取dom对象

## widget.init()
> 执行周期 dom渲染后执行
```
 init:function(){
 	console.log(this.$el)
 }
```

## widget.getChild()

> 获取子组件信息
```
 widget.getChild(0).style="color:red;"
```

## widget.prepend()
> 从头部添加子组件`child`,支持批量添加
```
 //单个添加
 widget.prepend(SparkApp.Text('node1'))
 //批量添加
 widget.prepend([SparkApp.Text('node1'),SparkApp.Text('node2')])

 //其他方法指定组件内添加
 SparkApp.prepend(targetContainer,node1);
```
## widget.append()
> 从尾部添加子组件`child`,支持批量添加
```
 //单个添加
 widget.append(SparkApp.Text('node1'))

 //批量添加
 widget.append([SparkApp.Text('node1'),SparkApp.Text('node2')])

  //其他方法指定组件内添加
 SparkApp.prepend(targetContainer,node1);
```
## widget.before()
> 在某一组件之前添加,支持批量添加
## widget.after()
> 在某一组件之后添加,支持批量添加

## widget.remove()
> 移除组件,设置`hideAni`可设置移除动画
```
方法1: widget.remove();
方法2：SparkApp.remove(widgetParent,widget);


删除指定索引组件：SparkApp.remove(targetContainer,2);
删除第一个:SparkApp.remove(targetContainer,'firstChild');
删除最后一个：SparkApp.remove(targetContainer,'lastChild');
```
## widget.removeChild()
> 移除子组件
```
targetWidget.removeChild(<Widget> | <Index> |<firstChild,lastChild>);

```

## widget.empty()

> 清空子组件


## widget.width()
> 获取/设置组件宽度
```
    widget.width(100);//设置
    widget.width();//获取
```

## widget.height()

> 获取/设置组件高度
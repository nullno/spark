# 参数
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

className:Spark.Css('background:#666;color:red;')

className:'.test'

```

## widget.shover
> `<CssWidget>对象 | css string` ,设置鼠标覆盖样式
```
shover:'background:#666;color:red;'

shover:'Spark.Css('background:#666;color:red;')'
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

## widget.vif
> `Boolean`类型，设置元素是否显示，是否在dom文档中存在

## widget.keepalive
> `Boolean`类型，路由切换是否状态保留，默认true


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

## widget.stopProp
> `Boolean`类型，开启阻止冒泡



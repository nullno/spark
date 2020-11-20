
# 方法

## widget.init()/widget.created()
> 执行周期 组件创建时启用
```
 created:function(){
 	console.log(this.$el)
 }
```

## widget.activated()
> 执行周期 组件被激活时执行
```
 activated:function(){
 	 //do something...
 }
```

## widget.deactivated()
> 执行周期 组件被停用时执行
```
 deactivated:function(){
 	 //do something...
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
 widget.prepend(Spark.Text('node1'))
 //批量添加
 widget.prepend([Spark.Text('node1'),Spark.Text('node2')])

 //其他方法指定组件内添加
 Spark.prepend(targetContainer,node1);
```
## widget.append()
> 从尾部添加子组件`child`,支持批量添加
```
 //单个添加
 widget.append(Spark.Text('node1'))

 //批量添加
 widget.append([Spark.Text('node1'),Spark.Text('node2')])

  //其他方法指定组件内添加
 Spark.prepend(targetContainer,node1);
```
## widget.before()
> 在某一组件之前添加,支持批量添加
## widget.after()
> 在某一组件之后添加,支持批量添加

## widget.remove()
> 移除组件,设置`hideAni`可设置移除动画
```
方法1: widget.remove();
方法2：Spark.remove(widgetParent,widget);


删除指定索引组件：Spark.remove(targetContainer,2);
删除第一个:Spark.remove(targetContainer,'firstChild');
删除最后一个：Spark.remove(targetContainer,'lastChild');
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



## 浏览器环境

```
//更多
console.log(Spark.env)
```

## 获取链接参数
```
Spark.Util.urlParam(<name>, ?url)
```

##  屏幕信息
```
Spark.screen.width()
Spark.screen.height()
Spark.screen.resize();
//更多
console.log(Spark.screen)
```


## 对象拷贝
```
Spark.Util.deepCopyObj(obj)
```

## 字符串
```

//匹配
Spark.Util.includes(<str1>,<str2>)

//去除所有空格

Spark.Util.trimAll(str)

//去除两端空格
Spark.Util.trim(str)
```


## 数组
```
//一维数组不写key值
//匹配移除
Spark.Util.compareRemove(<array>,{?a:'key',b:'对应值'})

//匹配获取索引（精确查找）
Spark.Util.isInArray(<array>,{?a:'key',b:'对应值'})

//匹配获取索引（模糊查找）
Spark.Util.isInArrayIncludes(<array>,{?a:'key',b:'对应值'})


//遍历  datas:数组，对象，数字都可使用
Spark.Util.traverse(<datas>,function(item,index,end){
  //do something...
})

//重复过滤

Spark.Util.unique(arr)

```


## 类型判断
```
Spark.Util._typeof({},'Object')

Spark.Util._typeof('','String')

Spark.Util._typeof(null,'Null')

Spark.Util._typeof(1,'Number')

....
```


## 防抖/节流
```
//防抖
Spark.Util.debounce(function(){},500)
//节流
Spark.Util.throttle(function(){},500)
```


## 返回顶部
```
Spark.scrollTop(0,500);

```
## 动态脚本

```
Spark.Util.loadScript('url',function(){

    //do something...
	})
```

## 获取文件内容
```
Spark.Util.getFile(<filepath>,<resolve>,<reject>)
```


## 获取图片宽高
```
Spark.Util.getImgInfo((obj)=>{
	
	 console.log(obj) //{width:'',height:''}
})
```
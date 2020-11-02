 #### 简单轮播
```javascript
SparkApp.Carousel({
           style:'width:650px;height:300px;margin:0 auto;background-color:#000;',
           option:{
              //direction:'vertical',//vertical horizontal
              //speed:1000,
              // autoPlay:true,
              initSlide:2,
              pagination:true,
              // touchRatio:0.5,
           },
           child:[
                  SparkApp.Box({style:'background:#FF8905;',child:[
                   SparkApp.Image('http://p1.music.126.net/iMILqNtgdhnyJdTqUUly1Q==/109951165347186457.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]}),   
                  SparkApp.Box({style:'background:red;',child:[
                   SparkApp.Image('http://p1.music.126.net/VPbE1x7XACrAEMACVAr6Sw==/109951165347585577.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]}),
                  SparkApp.Box({style:'background:blue;',child:[
                   SparkApp.Image('http://p1.music.126.net/4TWDMkbgrNcjqOdQczE-Uw==/109951165348628815.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]}),
                  SparkApp.Box({style:'background:#9300FF;',child:[
                   SparkApp.Image('http://p1.music.126.net/L6_IG46iPayW5JgDcWIaGw==/109951165349039245.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]}),   
                  SparkApp.Box({style:'background:#F7156A;',child:[
                   SparkApp.Image('http://p1.music.126.net/Q6NQhyIFFwtPEPQghDvHgA==/109951165346336516.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]})
              ]
         });
```
### <a href="/demo/carousel.html">[演示]</a>
### 参数设置

`option.direction` 设置滑动方向 default:horizontal

`option.speed` 滑动速度

`option.autoPlay` 自动播放 default:false,设置true:3000,也可设置毫秒值最低2000ms

`option.initSlide` 初始slide位置

`option.touchRatio` 离开边界距离可滑动0-1

`option.pagination` 是否设置指示小圆点

`allowTouchMove` 是否允许拖动 default:true

`activeIndex` 当前索引值

`autoPlaySwitch` 当开启自动轮播时，可控制是否暂停

### 方法
 `Carousel.slidePrev()` 前一个

 `Carousel.slideNext()` 后一个

 `Carousel.slideTo(2) ` 滑动指定位置 

 `Carousel.prependSlide()` 向前追加slide

 `Carousel.appendSlide()` 向后追加slide

 `Carousel.update()` 更新轮播组件

 `Carousel.onInit()` 初始化完成
 
 `Carousel.stopAutoPlay()` 停止自动轮播

 `Carousel.startAutoPlay(time)` 开始自动轮播

 `Carousel.on.slideStart()`  滑动开始监听

 `Carousel.on.slideEnd()`  滑动结束监听



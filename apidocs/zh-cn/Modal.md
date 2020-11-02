 #### 常用弹窗模态框
```javascript
SparkApp.Modal({
                     style:'width:500px;height:200px;background:#fff;border:2px solid #9300FF;border-radius:5px;overflow:hidden;',
                     showAni:{ani:'fadeInDown 100ms ease-out both'},
                     hideAni:{ani:'fadeOutUp 100ms both',time:100},
                     bgClose:true,//点击任意可关闭 默认false
                     // bgColor:'rgba(255,255,255,0.5)',//背景颜色 默认rgba(0,0,0,0.5)
                     bgShow:true,//是否有背景 默认false
                     drag:false,//是否可拖动 默认false
                     // position:'bottomright', //topcener/topleft/topright/bottomcenter/bottomleft/bottomright 默认center
                     // positionMargin:'3%', //距离边距间距 默认3%
                     //autoClose:3000,//设置毫秒延时自动关闭，默认不false
                     child:[
                       SparkApp.Text('x',{
                                style:'position:absolute;background:#9300FF;text-align:center;color:#fff; width:30px;height:30px;line-height:30px; right:0;top:0;',
                                 on:{
                                    click(){

                                         Modal1.close();
                                    }
                                  }
                              })
                     ]
                 });
```                 
### <a href="/demo/modal.html">[演示]</a>
### 参数设置

`showAni/hideAni` 可设置弹窗动画[#showAni](zh-cn/Params?id=widgetshowani)

`bgClose` 点击遮罩层是否可关闭,default:false

`bgShow` 是否添加遮罩层，一旦设置不可修改,default:false

`bgColor` 遮罩层背景颜色,default:rgba(0,0,0,0.5)

`position` 弹窗位置：topcener | topleft | topright | bottomcenter | bottomleft | bottomright

`positionMargin` 设置弹窗距离边界间距 default:3%

`autoClose` 是否可自动关闭 default:false, 设置毫秒值可开启


### 方法

`Modal.open()` 打开弹窗

`Modal.close()` 关闭弹窗

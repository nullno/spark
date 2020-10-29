 var Modal ={
        render:function(){
         var Modal1 = SparkApp.Modal({
                     style:'width:500px;height:200px;background:#fff;border:2px solid #9300FF;border-radius:5px;overflow:hidden;',
                     showAni:{ani:'fadeInDown 100ms ease-out both'},
                     hideAni:{ani:'fadeOutUp 100ms both',time:100},
                     // bgClose:true,//点击任意可关闭 默认false
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
          
            var Modal2 = SparkApp.Modal({
                     style:'width:500px;height:200px;background:#fff;border:2px solid #3C6B87;border-radius:5px;overflow:hidden;',
                     showAni:{ani:'fadeInDown 100ms ease-out both'},
                     hideAni:{ani:'fadeOutUp 100ms both',time:100},
                     // bgClose:true,//点击任意可关闭 默认false
                     // bgColor:'rgba(255,255,255,0.5)',//背景颜色 默认rgba(0,0,0,0.5)
                     //bgShow:true,//是否有背景 默认false
                     drag:false,//是否可拖动 默认false
                     // position:'bottomright', //topcener/topleft/topright/bottomcenter/bottomleft/bottomright 默认center
                     // positionMargin:'3%', //距离边距间距 默认3%
                     //autoClose:3000,//设置毫秒延时自动关闭，默认不false
                     child:[
                       SparkApp.Text('x',{
                                style:'position:absolute;background:#3C6B87;text-align:center;color:#fff; width:30px;height:30px;line-height:30px; right:0;top:0;',
                                 on:{
                                    click(){
                                         Modal2.close();
                                    }
                                  }
                              })
                     ]
                 });

          SparkApp.module.Modals={
              type1:Modal1,
              type2:Modal2
          }

        }
}
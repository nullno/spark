/*回到顶部*/

import SparkUtil from '../SparkUtil.js'

export default function(val,time){
    var scrollTop = SparkUtil.screen.scrollTop();
    time= time?time:500;
    val = val?val:0;
    val = (val === 'bottom')?SparkUtil.screen.scrollHeight()-SparkUtil.screen.height():val;
    val = (val === 'top')?0:val;

    if(scrollTop==val)return;     
    var up  = scrollTop>val?true:false;
    var speed = parseInt(((Math.abs(scrollTop-val))/time)*100)+1;
    var TempSpeed =speed;
    var Timer = null;
    var stime = 0;
    var run = function(){
       Timer = setTimeout(function(){
              
                up?scrollTop-=speed:scrollTop+=speed;
             
                stime = 20;
                speed = parseInt(speed>parseInt(TempSpeed*0.2)?speed-speed/4:speed)+1;
              
               if(up){
                 if(scrollTop>val){
                   run()
                 };
                 if(scrollTop<=val){
                   clearTimeout(Timer);
                   scrollTop = val;
                 }
                }else{

                   if(val>scrollTop){
                    run()
                   };
                  if(scrollTop>=val){
                    clearTimeout(Timer);
                     scrollTop = val;
                  }
                  
               }
               document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
                
          },stime)
     }
    run(); 
}


/*#include [Other->component/Other];
*/
SparkApp.module.Home={
 render:function(){
    var Page = SparkApp.Page({
	     	style:'width:100%;min-height:'+SparkApp.screen.height()+'px;background-color:#272822;overflow:auto;padding:20px 0; padding-bottom:50px;color:#fff;',
	        showAni:{ani:'fadeIn 500ms  both'},
	     	child:[Other]
	     })
       SparkApp.screen.resize(function(screen){
	        Page.style='min-height:'+screen.height+'px;'
	   })
       
       this=Page;
	
  }

}




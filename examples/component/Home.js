
/*#include [Other->component/Other];
*/
var Home={
 render:function(){
 	var Other = Spark.module.Other;
    
    var Page = Spark.Page({
	     	style:'width:100%;min-height:'+Spark.screen.height()+'px;background-color:#272822;overflow:auto;padding:20px 0; padding-bottom:50px;color:#fff;',
	        //showAni:{ani:'fadeIn 500ms  both'},
	     	child:[Other,Spark.module.Modals.type1,Spark.module.Modals.type2]
	     })
       Spark.screen.resize(function(screen){
	        Page.style='min-height:'+screen.height+'px;'
	   })
       
       
       Spark.module.Home =  Page;
	
  }

}




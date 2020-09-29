/**
* demo202009021 [Dialog]  
*/
// var SparkApp = new Spark({});
//    console.log(SparkApp)


SparkApp.main({
  Carousel:'component/Carousel.js',
  Other:'component/Other.js',
  Page:'component/Page.js'
  },function(ee){

     console.log(152)
  })


// ['component/Carousel.sp']


   //  var page = SparkApp.Page({
   //   	style:'width:100%;min-height:'+SparkApp.screen.height()+'px;background-color:#272822;overflow:auto;padding:20px 0; padding-bottom:50px;color:#fff;',
   //      showAni:{ani:'fadeIn 500ms  both'},
   //   	child:[title1,wrap,title2,wrap2,title3,wrap3,title4,wrap4,scrollTop1]
   //   })

   // SparkApp.screen.resize(function(screen){
   //      page.style='min-height:'+screen.height+'px;'
   // })



/*#include [Other->component/Other];
*/
var About={
 render:function(){
 
     var Carousel2 =  SparkApp.Carousel({
           style:'width:650px;height:300px;margin:0 auto;background-color:#000;',
           option:{
              //direction:'vertical',//vertical horizontal
              //speed:1000,
              autoPlay:true,
              // initSlide:0,
              pagination:true,
              // touchRatio:0.5,
           },
           child:[
               SparkApp.CarouselWrapper({
                   child:[
                       SparkApp.Box({style:'background:#FF8905;',child:[
                        SparkApp.Image('http://p1.music.126.net/iMILqNtgdhnyJdTqUUly1Q==/109951165347186457.jpg?imageView&quality=89',{
                          style:'width:100%;height:100%;display:block;'})
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
               })

           ]
        });
    
     var dd =  SparkApp.Text('55555');
    var Page = SparkApp.Page({
	     	style:'width:100%;min-height:'+SparkApp.screen.height()+'px;background-color:red;overflow:auto;padding:20px 0; padding-bottom:50px;color:#fff;',
	        //showAni:{ani:'fadeIn 500ms  both'},
	     	child:[Carousel2]
	     })
       SparkApp.screen.resize(function(screen){
	        Page.style='min-height:'+screen.height+'px;'
	   })
       
       SparkApp.module.About =  Page;
	
  }

}




var Carousel1 ={
  name:'Carousel1',
  render: function(){

       Spark.module.Carousel1  = Spark.Carousel({
           style:'width:650px;height:100%;margin:0 auto;background-color:#000;',
           option:{
              //direction:'vertical',//vertical horizontal
              //speed:1000,
              autoPlay:true,
              initSlide:2,
              pagination:true,
              // touchRatio:0.5,
           },
           child:[
                  Spark.Box({style:'background:#FF8905;',child:[
                   Spark.Image('http://p1.music.126.net/iMILqNtgdhnyJdTqUUly1Q==/109951165347186457.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]}),   
                  Spark.Box({style:'background:red;',child:[
                   Spark.Image('http://p1.music.126.net/VPbE1x7XACrAEMACVAr6Sw==/109951165347585577.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]}),
                  Spark.Box({style:'background:blue;',child:[
                   Spark.Image('http://p1.music.126.net/4TWDMkbgrNcjqOdQczE-Uw==/109951165348628815.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]}),
                  Spark.Box({style:'background:#9300FF;',child:[
                   Spark.Image('http://p1.music.126.net/L6_IG46iPayW5JgDcWIaGw==/109951165349039245.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]}),   
                  Spark.Box({style:'background:#F7156A;',child:[
                   Spark.Image('http://p1.music.126.net/Q6NQhyIFFwtPEPQghDvHgA==/109951165346336516.jpg?imageView&quality=89',{
                     style:'width:100%;height:100%;'})
                   ]})
              ]
         });

   }  
}


/**
* demo202009021 [Dialog]  
*/
var SparkApp = new Spark({});
   console.log(SparkApp)


SparkApp.main({
  Carousel:'component/Carousel.js',
  Other:'component/Other.js',
  Page:'component/Page.js'
  },function(ee){

     console.log(152)
  })


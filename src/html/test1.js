import Spark from '../index.js'
	
   
   console.log(Spark)


   Spark.Render_Test=function(){
         
         if(Spark.vpage[0]){
             Spark.getWidget(Spark.vpage[0]).remove();
          }
         // 

        var Hi = Spark.Text('hello spark!',
    	{style:'font-size:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);',
    	stopProp:true,
    	on:{  
	     	  press(){
	     			this.text = '不要摸我嘛~';
	     	  },
	     	  up(){
	     	  	    this.text = '----SPARK----';
	     	  }
	     	}
    	});

       Spark.Page({
       	    path:'page1',
	     	style:'width:100%;min-height:'+Spark.screen.height()+'px;background-color:#fff;color:#34495e;',
	     	child:[
                 Hi
	     	],
	     	on:{
	     		click(){
	     			if(Hi.text=='hello spark!'){
	     				Hi.text = 'hello word!'
	     				this.style='background-color:#34495e;color:#fff;'
	     			}else{
	     				Hi.text = 'hello spark!' 
	     				this.style='background-color:#fff;color:#34495e;'
	     			}
	     			
	     		},
	     	}
	     })
         
          Spark.Render();
       }
 
	
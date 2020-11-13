import Spark from '../index.js'
	
   
   console.log(Spark)
     
      Spark.Link.setting({
          a1:'/',
          a2:'/'
      })

        
        var Hi = Spark.Text('hello spark!',
    	{style:'font-size:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);min-width:300px;text-align:center;',
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
       	    //定义路由信息 
       	    link:{
       	    	name:'page1',
       	    	path:'/',

       	    },
	     	style:'width:100%;min-height:'+Spark.screen.height()+'px;background-color:#fff;color:#34495e;overflow:hidden;',
	     	child:[
                   Spark.Drag({style:Hi.style,child:[Hi]}),
                  
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
         

         Spark.Page({
         	   //定义路由信息 
       	    link:{
       	    	name:'page2',
       	    	path:'/page2/:id',

       	    },
       	    style:'background:red;width:1000px;height:200px;'
         }) 

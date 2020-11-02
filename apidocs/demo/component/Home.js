
var Home={
 render:function(){

    var Hi = SparkApp.Text('hello spark!',
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
    var Page = SparkApp.Page({
	     	style:'width:100%;min-height:'+SparkApp.screen.height()+'px;background-color:#fff;color:#7566F9;',
	     	child:[
                 Hi
	     	],
	     	on:{
	     		click(){
	     			if(Hi.text=='hello spark!'){
	     				Hi.text = 'hello word!'
	     				this.style='background-color:#7566F9;color:#fff;'
	     			}else{
	     				Hi.text = 'hello spark!' 
	     				this.style='background-color:#fff;color:#7566F9;'
	     			}
	     			
	     		},
	     	}
	     })

       SparkApp.module.Home =  Page;
	
  }

}




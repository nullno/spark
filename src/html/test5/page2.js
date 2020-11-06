
export default {
	 render(){
        
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
	 	Spark.module.page2 = Spark.Page({
        style:'width:100%;min-height:'+Spark.screen.height()+'px;background-color:#fff;color:#34495e;overflow:hidden;padding:0;',
        child:[Hi]
        })

	 }
}
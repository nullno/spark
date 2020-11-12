import Spark from '../index.js'

   console.log(Spark)

         var listStyle = Spark.Css('background-color:#fff;margin:5px;padding:5px;line-height:50px;color:#666;overflow:hidden;border-radius:5px;box-shadow:0 0 5px #ccc;');

         var List =  Spark.List({
		   // data:[],
		   item(item,index){
		   	 var template =  Spark.Box({
		                tag:'li',
		                className:listStyle,
		                style:'background-color:#fff;',
		                showAni:{ani:'fadeInLeft 500ms  both'},
                        hideAni:{ani:'bounceOutRight 500ms both',time:222},
		                child:[
		                      Spark.Text(index,{listIndex:true}),
		                      Spark.Text('---<b>('+item.date+')</b> 最高温度:'+item.tmp_max+'°C-最底温度:'+item.tmp_min+'°C'),
		                      Spark.Text('删除',{
		                      	style:'float:right;',
		                        on:{click(){
		                       
		                        	  template.remove({ani:'bounceOutRight 500ms both',time:500})
		                          }}
		                        }),
		                     ],
		                on:{
		                    click(){
		                       alert('天气状况：'+item.cond_txt_d)
		                    },
		                    hover(){
		                    	 listStyle.style='background-color:#fff;color:#666;'
		                    	 this.style='background-color:#7566F9;color:#fff;';
		                    	},
		                    leave(){
		                    	 this.style='background-color:#fff;color:#666;';
		                    }	
		                }

		            });

		   	    return template;
		   },
		   init(){
               
                    Spark.axios.get('https://apip.weatherdt.com/v2/plugin/data/web?key=vcO19f1sX1&location=101200101&lang=zh',{}).then(res=>{

                    	console.log(res.data)
                    
                        this.insertLast(res.data.daily_forecast)
                    	 
                    })
		   	
		   }

		 })
        

        Spark.Page({
	     	style:'width:100%;min-height:'+Spark.screen.height()+'px;background-color:#fff;color:#34495e;overflow:hidden;',
	     	child:[List]
	     })
       
	    Spark.Render();









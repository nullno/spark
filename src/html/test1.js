import Spark from '../index.js'
	
   
   console.log(Spark)
     
      // Spark.Link.setting({
      //     a1:'/',
      //     a2:'/'
      // })
      // 
    var Navcss=Spark.Css('width:50%;display:inline-block;background:transparent;text-align:center;');

    
    var nav = Spark.Fixed({
            style:'bottom:0;width:100%;height:100px;line-height:100px;color:#fff; background:blue;display:flex;justify-content:space-around;',
            stopProp:true,
            diyfn(w){
                 Navcss.style='background:transparent';
                 w.style='background:red;';
                
                   console.log(Spark)
            },
            child:[

                 Spark.Text('PAGE-1',{
                  style:'background:red;',
                  className:Navcss,
                  on:{
                    click(){
                       nav.diyfn(this);
                       Spark.Link.push({name:'page1'});
                    }
                  }
                 }),
                  Spark.Text('PAGE-2',{
                    className:Navcss,
                    on:{
                      click(){
                        nav.diyfn(this);
                        Spark.Link.push({name:'page2',params:{id:'22222'}});

                      }
                    }
                 })
                    
             ]
                 
    })
            
            var ddd = Spark.Text('666',{
                                    vif:false
                                    // show:false
                                  })
        
        var Hi = Spark.Text('hello spark!',
    	{style:'font-size:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);min-width:300px;text-align:center;',
    	stopProp:true,
    	on:{
          click(){
                // this.before(ddd);
                // ddd.show=true
                ddd.vif = true
          },  
	     	  press(){
	     			this.text = '不要摸我嘛~';

	     	  },
	     	  up(){
	     	  	    this.text = '----SPARK----';

	     	  }
	     	}
    	});
       

   /*返回顶部*/
       var scrollTop1 = Spark.Fixed({
              style:'width:50px;height:50px;border-radius:50px;padding:9px; background:yellowgreen;right:20px;bottom:20px;',
              child:[Spark.Text('回到<br>顶部')],
              on:{
                click:function(){
                  Spark.scrollTop(0,500);
                }
              }
       })


       Spark.Page({
       	    //定义路由信息 
       	    link:{
       	    	name:'page1',
       	    	path:'/',
              meta:{
                title:'你好'
              }
       	    },
      	     	style:'width:100%;min-height:'+Spark.screen.height()+'px;background-color:#fff;color:#34495e;',
      	     	child:[Hi,ddd,scrollTop1,nav],
              // keepalive:false,
              created(){
                console.log('page1 created')
              },
      	     	on:{
      	     		click(){

      	     			if(Hi.text=='hello spark!'){
      	     				Hi.text = 'hello word!'
      	     				this.style='background-color:#34495e;color:#fff;'
                    // this.append(Hi)
      	     			}else{
      	     				Hi.text = 'hello spark!' 
      	     				this.style='background-color:#fff;color:#34495e;'

                    // Hi.remove()
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
              style:'width:100%;min-height:'+Spark.screen.height()+'px;background-color:#1FCBC6;color:#fff;',
            child:[Hi,nav],
             created(){
                console.log('page2 created')
              },
               activated(){
                console.log('actived'+this)
              },
              deactivated(){
                   console.log('deactivated')
              },
         }) 

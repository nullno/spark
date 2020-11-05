  const Spark = require('../index.js');
     
     console.log(Spark)


   
    var title1 = Spark.Text('单行输入框：',{style:'padding:5px;'})

    var Input = Spark.Input({
         watch:{
             value(o,n){
                    Input2.value = Text.getChild(0).text = n;
             }
         },
         value:'请输入....',
         on:{
               inputing:function(e){
                    console.log(this.value)
                    Input2.value=this.value;
               }
         }
    });
    
    var title1_1 = Spark.Text('多行输入框：',{style:'padding:5px;'})

    var Input2 = Spark.Input({
         value:'请输入....',
         on:{
               inputing:function(e){

   
                 Input.value=this.value;
                     
               }
         },
         multiline:true
    });
  
   
    var title2 =Spark.Text('输出框：',{style:'padding:20px 5px 5px;display:block;'})
    var Text =  Spark.Box({
                style:Input.style,
                child:[Spark.Text('---')],
                init(){
                       
                       Input.value=8888;
                       // this.getChild(0).text=Input.value;
                
                   // 
                }
      });
   






   Spark.Page({
        style:'width:100%;min-height:'+Spark.screen.height()+'px;background-color:#fff;color:#34495e;overflow:hidden;padding:20px;',
        child:[title1,Input,title1_1,Input2,title2,Text]
       })
       
   Spark.Render();



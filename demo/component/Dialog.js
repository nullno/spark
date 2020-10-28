 var Dialog ={
        render:function(){
         var Dialog1 = SparkApp.Dialog({
                     style:'width:500px;height:200px;background:#fff;',
                     showAni:{ani:'bounceIn 500ms both'},
                     hideAni:{ani:'bounceOut 500ms both',time:500},
                     bgClose:true, 
                     child:[
                       SparkApp.Text('x',{
                                style:'position:absolute;background:red;text-align:center;color:#fff; width:30px;height:30px;line-height:30px; right:0;top:0;',
                                 on:{
                                    click(){
                                         Dialog1.close();
                                    }
                                  }
                                
                              })
                     ]

                 });


          SparkApp.module.Dialog={
              type1:Dialog1
          }

        }
}
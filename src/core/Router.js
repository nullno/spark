import { _typeof,D } from './Common.js'

import SparkUtil from './SparkUtil.js'

import GetAddressData from './GetAddressData.js'

import CreateDomTree  from './CreateDomTree.js'

//构造路由
function Router(){

      this.name='hi router';


      
     


     

}

//初始化
Router.prototype.test = function(){


console.log('init router')


}

//hash模式
Router.prototype.hash = function(){

 
    return location.hash.slice(1);


}

//设置
Router.prototype.setting = function(params){
     
     Object.assign(this,params)

}

//进栈
Router.prototype.read = function(pagename){
	  const W = GetAddressData(pagename)
            W.link.address=pagename;
       this.change(W.link)
       
}


Router.prototype.change=function(link){
    

      const path_hash = this.hash();
          
      // console.log(H,LH)
            
       //带参数的路径匹配
       link.params = {};
       if(SparkUtil.includes(link.path,':')){
          	  let prevpath = link.path.match(/(\S*):/)[1];

               if(SparkUtil.includes('#'+path_hash,'#'+prevpath)){

		               let HArr=path_hash.split('/');

				        SparkUtil.traverse(link.path.split('/'),function(item,index,end){
				        	if(SparkUtil.includes(item,':')){
				        		const name = item.slice(1)
				        		link.params[name] = HArr[index];
				        	}
				        })
                      this.Render(link.address)
                      return;
		       }  
        }

        if(SparkUtil.includes(link.path,path_hash)){
          
           this.Render(link.address)

           return;

        }

        if(link.path === '/' ){

        	this.Render(link.address)

        }
     console.log(link)

      
}


//路由跳转

Router.prototype.Render = function(pagename){
     CreateDomTree(pagename,D.body,true);
}

const  $router = new Router() 

window.addEventListener(
    'hashchange',
    function (event) {
        const oldURL = event.oldURL; 
        const newURL = event.newURL; 
        console.log(newURL, oldURL);
    },
    false
);



export default $router;
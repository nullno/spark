import { _typeof,D } from './Common.js'

import SparkUtil from './SparkUtil.js'

import GetAddressData from './GetAddressData.js'

import CreateDomTree  from './CreateDomTree.js'

import Cache from './Cache.js'

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
        
    
          // if(!location.hash){
          //     location.hash = '/';  
          // }

    return location.hash.slice(1);


}

//设置
Router.prototype.setting = function(params){
     
     Object.assign(this,params)

}

//进栈
Router.prototype.read = function(pagename){
    if(!this.hash()){
       location.hash = '/'; 
        return;
    }
	     const W = GetAddressData(pagename)
          
         if(D.getElementsByClassName(W.name).length>=1){
              W.remove();
          }
          
          
          W.link.address=pagename;
         
          this.change(W.link)

}

//  Cache.PageCache 读取到当前路径页面
Router.prototype.readPage = function(){
  var _this = this;
      SparkUtil.traverse(Cache.PageCache,function(item,index,end){
            _this.read(item)
      })

}

Router.prototype.change = function(link){
      const path_hash = this.hash().replace(/\/$/,'');
            link.path = link.path.replace(/\/$/,'');      
     
       //普通匹配 
       if(link.path === path_hash){
          this.Render(link.address)
          return;
        }    

       //带参数匹配
       if(SparkUtil.includes(link.path,':') && path_hash!='/'){
          	  let prevpath = link.path.match(/(\S*):/)[1];
               
               const  HArr = path_hash.split('/');
               const  PArr = link.path.split('/');
   
               // console.log(HArr,PArr)

               if(SparkUtil.includes('#'+path_hash,'#'+prevpath) && HArr.length==PArr.length){
    				        SparkUtil.traverse(PArr,function(item,index,end){
    				        	if(SparkUtil.includes(item,':') && HArr[index]!=''){
    				        		const name = item.slice(1)
    				        		link.params[name] = HArr[index];
                   
    				        	}
    				        })
                  // console.log(link) 
                  this.Render(link.address)
                  return;
		          }  
        }

}


//路由跳转
Router.prototype.Render = function(pagename){
     CreateDomTree(pagename,D.body,true);
}

const  $router = new Router(); 

window.addEventListener(
    'hashchange',
    function (event) {

        // const oldURL = event.oldURL; 
        // const newURL = event.newURL; 
        // console.log(newURL, oldURL);
        // console.log($router.hash())

       $router.readPage()
                
    },
    false
);



export default $router;
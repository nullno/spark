import { _typeof,D } from './Common.js'

import SparkUtil from './SparkUtil.js'

import GetAddressData from './GetAddressData.js'

import CreateDomTree  from './CreateDomTree.js'

import Cache from './Cache.js'

//构造路由
function Router(){

      this.name='hi router';
      this.Outed = {};
      
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
   var _this = this;
      const path_hash = this.hash().replace(/\/$/,'');
      const link_path = link.path.replace(/\/$/,'');      
     
       //普通匹配 
       if(link_path === path_hash){
          this.Render(link.address)
          this.Outed = Object.assign(this.Outed,link);
          this.Outed.path=this.hash();
          return;
        }    

       //带参数匹配
       if(SparkUtil.includes(link.path,':') && path_hash!='/'){
          	  let prevpath = link_path.match(/(\S*):/)[1];
               
               const  HArr = path_hash.split('/');
               const  PArr = link_path.split('/');
   
               // console.log(HArr,PArr)

               if(SparkUtil.includes('#'+path_hash,'#'+prevpath) && HArr.length==PArr.length){
    				        SparkUtil.traverse(PArr,function(item,index,end){
    				        	if(SparkUtil.includes(item,':') && HArr[index]!=''){
    				        		const name = item.slice(1)
    				        		link.params[name] = HArr[index];
                   
    				        	}
    				        })
          
                  this.Render(link.address);
                  this.Outed = Object.assign(this.Outed,link);
                  this.Outed.path = this.hash();
                   
                  return;
		          }  
        }

}


//路由跳转
Router.prototype.Render = function(pagename){
     CreateDomTree(pagename,D.body,true);
}

//路由操作
Router.prototype.Out = function(){

}

Router.prototype.Out.push = function(p){
     if(!p)return'';
    if(_typeof(p,'String')){
       location.hash = p
    }
    if(_typeof(p,'Object')){
    
      SparkUtil.traverse(Cache.PageCache,function(item,index,end){
          const W = GetAddressData(item)
             if(W.link.name === p.name){
                 if(SparkUtil.includes(W.link.path,':') && _typeof(p.params,'Object')){
                       console.log(W.link.path,p)
                     SparkUtil.traverse(p.params,function(k){
                         console.log(k)
                     })
                     // location.hash = ''
                 }else{
                     location.hash = W.link.path
                 }
                
                  // console.log(W.link)
                  return;
             } 
            
      })
      
    }
}

Router.prototype.Out.replace = function(p){
  
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
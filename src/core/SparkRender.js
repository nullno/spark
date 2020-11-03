import { _typeof,D } from './common.js'
import SparkUtil from './SparkUtil.js'
import SparkCoreHandler from './SparkCoreHandler.js'

const _this = SparkCoreHandler;


/*模块加载相关函数*/
const LoadModule = function(module,callback){
    
        var modulePath = SparkUtil.includes(module.path,'.js')?module.path:module.path+'.js';
        SparkUtil.getFile(modulePath,function(codeText){
                  callback(codeText)
         })

}
/*创建运行函数*/
const ChunkVendors = function(codeText,callback){

 
      var MainJs = D.createElement('script')
          // MainJs.type = "text/javascript";
          // MainJs.id='chunk-vendors';
          MainJs.innerHTML=codeText;
          D.body.appendChild(MainJs);
      var tempTimer = setTimeout(function(){
               callback();
               clearTimeout(tempTimer)
               D.body.removeChild(MainJs);
           });
   
}
  
/*模块脚本代码*/
const  HandlerModuleCodeText = function(callback){

   var modules =  _this.tempModuleLoadQueue;
   if(modules.length<=0)return;
   var i=0;
   var mainCodeText = '';
   var _core = function(moduleItem){
    LoadModule(moduleItem,function(codeText){
            i++;
            mainCodeText+=codeText+'\n;'+moduleItem.name+'.render();\n';
            if(i>=modules.length){
              
               callback('(function(document, window){'+mainCodeText+'})(document, window)')
               return;
            }
           _core(modules[i]);
        })
    }
   _core(modules[i])

}
/* _this.renderQueues
   _this.tempModuleLoadQueue*/
  
const HandlerModule = function(_modules){
     var  tempModuleLoadQueue = [];
     var _core = function(modules){
       if(_typeof(modules,'Object')){
        tempModuleLoadQueue.push(modules);
          if(modules.depends){
                 _core(modules.depends);
         }
       }
        if(_typeof(modules,'Array')){
          tempModuleLoadQueue = tempModuleLoadQueue.concat(modules)
          SparkUtil.traverse(modules,function(item,index,end){
              if(item.depends){
                 _core(item.depends);
              }
         })
       }
    }

    _core(_modules);
    _this.tempModuleLoadQueue = tempModuleLoadQueue.reverse();

}


/**
 * [SparkRouter 单页面路由功能]
 * @AuthorHTL
 * @DateTime  2020-03-30T23:42:32+0800
 */
const  SparkRouter = function(type) {

  if(type=='PageModule'){
    _this.PageCache = _this.PageCache.reverse();
  }
  var pages = _this.PageCache;
  var i=0;
  var _core = function(pageitem){
    SparkCoreHandler.createDomTree(pageitem,D.body,true,'',function(){
         i++;
         if(i>=pages.length){
          return 
         };
         _core(pages[i])
    });
  }  
 _core(pages[i]);
}

/**
 * [Rander 所有节点渲染到页面上]
 * @AuthorHTL
 * @DateTime  2020-03-30T23:46:26+0800
 */
const SparkRender = function(pages) {

  var PageModule = [];
  var _core = function(type){
      if (_this.PageCache.length == 0) {
                var noTip = D.createElement('div')
                noTip.innerHTML='<h2 style="background:#000;color:#fff;padding:5px;">warning:please solve the error -> failed to create page!<h2>';
                D.body.insertBefore(noTip,D.body.firstChild);
                console.warn('please solve the error -> failed to create page!')
              } else if (_this.PageCache.length > 1) {
                SparkRouter(type);
              } else {
                _this.createDomTree(_this.PageCache[0],D.body,true);
              }
  }  

      if(_typeof(pages,'Undefined')){
            _core('PageSingle')
       }
      if(_typeof(pages,'Object')){
         PageModule.push(pages);
       }
      if(_typeof(pages,'Array')){
         PageModule = PageModule.concat(pages);
       }

     HandlerModule(PageModule);

     HandlerModuleCodeText(function(mainCodeText){
          ChunkVendors(mainCodeText,function(){
             _core('PageModule')
          });

     })
      

 }

 export default SparkRender;
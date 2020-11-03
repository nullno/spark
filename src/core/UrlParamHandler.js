

/**
 * [UrlParamHandler 链接参数缓存处理器]
 * @AuthorHTL
 * @DateTime  2020-05-11T14:23:35+0800
 * @return    {[type]}                 [description]
 */
 function UrlParamHandler(){
     this.getUrlSearchParam = function(url){
        return this.core(url || location.search);
     }
     this.getUrlHashParam=function(url){
        return this.core(url || location.hash);
     }
 }

 UrlParamHandler.prototype.core=function(u){
         var tempObj = {};
         if(u){
             var _s = u.substr(0,1);
             var temp_up =  u.replace(new RegExp('&&','g'),'&').replace(new RegExp('^\\' + _s + '*'),_s);
             var temp_str = temp_up.replace(new RegExp('^\\' + _s + '*'),''),
                 tempArr = [];
                
                 tempArr = temp_str.split('&');
             
               try{
                     for(var i=0;i<tempArr.length;i++){
                        var item = tempArr[i];
                        var o = item.split('=');
                        var key = item.match(/(\S*?)=/)[1],
                            value = item.match(/=(\S*)/)[1];
                         tempObj[key]=decodeURIComponent(value);
                     }
                  
                     tempObj['origin']= temp_up;
                 } catch(err){
                     console.warn(err+' url prase filed!')
                 }  
            } 
       
    return tempObj;
}

export default new UrlParamHandler();
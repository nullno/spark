/*
  -----------------更方便创建具有基本样式和功能的视图组件---------------
 视图组件解析（组件转dom处理，样式处理）->适配处理

                                      SparkWidget
                                          |
          Event-----------Data-----------Dom-----------Style---------Adapter
           |               |              |              |
           |------>      dataBind     domHandler      cssHandler

style:默认风格样式属性+自定义属性
dom:html标签重新归类，baseWidget
                        |
    文字，图片，视频，音频，容器，拖动容器，画布，文字按钮，文字图标，列表，
    横向排列，纵向排列,局部滚动容器，弹窗，其他扩展功能swiper(需要引入swiper)
     
widget|->nxdom 
      |    |-createClassName  
      |->nxstyle
      |->nxdata

*/
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(document, window) : typeof define === 'function' && define.amd ? define(factory) : (global = global || self,
    global.Spark = factory(document, window));
}(this, function(D, W) {
    'use strict';

/* base libs */  
  
  /*Browser evn info*/
  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();

  var _OP = Object.prototype;

  function addEventListener(a,b,c,d){
          // a && removeEventListener(a,b, c, d || false);
          a && a.addEventListener(b, c, d || false);
  } 
  function removeEventListener(a,b,c,d){
          a && a.removeEventListener(b, c, d || false);
  } 
  function _typeof(data,type){
     return  _OP.toString.call(data) === '[object '+type+']';
  }
  



 /*Object.assign polyfill*/
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
 
    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (_OP.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
/**
 * [arrProxy  ES6 arrary Proxy Polyfill]
 * @AuthorHTL
 * @DateTime  2020-08-21T12:08:57+0800
 * @param     {[type]}                 arr     [description]
 * @param     {[type]}                 handler [description]
 * @return    {[type]}                         [description]
 */
  function arrProxy(arr,handler){
    var newArrProto = [];
    var method = ['push','pop','shift','unshift','splice','sort','reverse','concat'];
    method.forEach(function (method) {
        // 原生Array的原型方法
        let original = Object.create(Array.prototype)[method];
        // 将push，pop等方法重新封装并定义在对象newArrProto的属性上
        // 这里需要注意的是封装好的方法是定义在newArrProto的属性上而不是其原型属性
        // newArrProto.__proto__ 没有改变
        newArrProto[method] = function mutator(n) {
             handler(method,n);
            // 调用对应的原生方法并返回结果（新数组长度）
            return original.apply(this, arguments);
        }

    });
    
    arr.__proto__ = newArrProto;
    return arr;

  } 

/* Util tools*/  
/**
 * [SparkUtil 工具包]
 * @type {Object}
 */
var SparkUtil = {
        /*screen*/
        screen:{
          width:function(){
               return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
           },
          height:function(){ return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
           },
          scrollTop:function(){
            return document.documentElement.scrollTop || document.body.scrollTop;
          },
          scrollHeight:function(){
            return document.documentElement.scrollHeight || document.body.scrollHeight;
          },
          resize:function(callback){
                 window.onresize=function(){
                      callback({width:SparkUtil.screen.width(),height:SparkUtil.screen.height()})
                 }
                 window.onresize();
          }
        },
        /*包含字符串*/
        includes: function(str1, str2) {
            return str1.indexOf(str2)==-1?false:true;
        },
        /*去除空格*/
        trimAll: function (str) {
                 return str.replace(/\s*/g,'');
        },
         /*去除两端空格*/
        trim: function (str) {
                 if(!str)return '';
                 return str.replace(/^\s*|\s*$/g,'');
        },
        /**
      * [debounce 防抖函数]
      * @AuthorHTL
      */
        debounce: function(fn, delay) {
            var timer = null;
            return function(e) {
                e.stopPropagation();
                var _this = this
                  , args = arguments;
                timer && clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(this, args);
                }, delay);
            }
        },
        /**
      * [throttle 节流函数]
      * @AuthorHTL
      */
        throttle: function(fn, delay) {
            var lastTime = 0;
            return function() {
                var nowTime = +new Date();
                if (nowTime - lastTime > delay) {
                    fn.apply(this, arguments);
                    lastTime = nowTime;
                }

            }

        },
        /**
      * [urlParam 获取指定名称的 url 参数值]
      * @AuthorHTL
      * @DateTime  2020-03-29T16:11:00+0800
      * @param     {[type]}                 name [description]
      * @param     {[type]}                 url  [description]
      * @return    {[type]}                      [description]
      */
        urlParam: function(name, url) {
            var reg = new RegExp('(\\?|&)' + name + '=([^&#]*)');
            var result = reg.exec(url ? url : location.href);
            return result != null ? decodeURIComponent(result[2]) : null;
        },
        /**
      * [deepCopyObj 对象深拷贝]
      * @AuthorHTL
      * @DateTime  2020-03-29T16:11:16+0800
      * @param     {[type]}                 obj [description]
      * @return    {[type]}                     [description]
      */
        deepCopyObj: function(obj) {
            var result = Array.isArray(obj) ? [] : {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        result[key] = this.deepCopyObj(obj[key]);
                    } else {
                        result[key] = obj[key];
                    }
                }
            }
            return result;
        },
        /**
     * [loadScript 动态加载js脚本]
     * @AuthorHTL
     * @DateTime  2020-03-29T16:11:29+0800
     * @param     {[type]}                 jsurl    [description]
     * @param     {Function}               callback [description]
     * @return    {[type]}                          [description]
     */
        loadScript: function(jsurl, callback) {
            var script = document.createElement('script')
            script.type = "text/javascript";
            if (script.readyState) {
                //IE
                script.onreadystatechange = function() {
                    if (script.readyState == 'loaded' || script.readyState == 'complete') {
                        script.onreadystatechange = null;
                        callback();
                    }
                  };
            } else {
                //Others
                script.onload = function() {
                    callback(script);
                };
            }
            script.src = jsurl;
            document.body.appendChild(script)
        },
        getfile:function(filepath,callback){

          var XHR = new XMLHttpRequest();
              XHR.open('get',filepath)
              XHR.responseType = 'text';
              XHR.onreadystatechange = function() {
                  //准备状态改变触发
              
                  if(XHR.readyState == 4 && XHR.status == 200) {
                  
                    callback(XHR.responseText)
                  }
                  //打印成功后返回的数据
              }
              XHR.send();
        },
        /*arr unique*/
        unique:function (arr) {
            if (!Array.isArray(arr)) {
                console.log('type error!')
                return
            }
            var res = [],
                obj = {};
            for (var i = 0; i < arr.length; i++) {
                if (!obj[arr[i]]) {
                    res.push(arr[i])
                    obj[arr[i]] = 1;
                } else {
                    obj[arr[i]]++
                }
            }
            return res;
        },
        /**
     * [devTool 开发调试工具]
     * @AuthorHTL
     * @DateTime  2020-03-29T16:11:46+0800
     * @return    {[type]}                 [description]
     */
        devTool: function(url) {
            this.loadScript(url || 'https://cdn.bootcss.com/eruda/1.5.8/eruda.min.js', function() {
                console.info('eruda dev tool init ok')
                eruda.init()
            })
        },
        /**
      * [BrowserMatch description]
      * @type {Object}
      *
      * @use    SparkUtil.env.isMobile
      */
        env: {
            inBrowser: inBrowser,
            UA: UA,
            isMobile: UA && /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
            isIE: UA && /msie|trident/.test(UA),
            isIE9: UA && UA.indexOf('msie 9.0') > 0,
            isEdge: UA && UA.indexOf('Edge/') > 0,
            isAndroid: UA && UA.indexOf('android') > 0,
            isIOS: UA && /iphone|ipad|ipod|ios/.test(UA),
            isChrome: UA && /chrome\/\d+/.test(UA),
            isFF: UA && UA.match(/firefox\/(\d+)/),
            isWeixin: UA && UA.match(/MicroMessenger\/[0-9]/i),
            isQQ:UA && UA.match(/QQ\/[0-9]/i)
        },
        /*获取图片宽高*/
        getImgInfo:function(url,callback){
                var img = new Image();
                    img.src = url;
                // 加载完成执行
                img.onload = function(){
                  callback({width:img.width,height:img.height})
              
                }
        },
        compareRemove:function(datas,compare){
          if(_typeof(datas,'Array') && compare ){
              for (var i = 0; i < datas.length; i++) {
                (function(index){
                　　if ((compare['a']?datas[index][compare['a']]:datas[index]) == compare['b']) {
                        datas.splice(index, 1);
                　　　　 i--; 
                　　}
                 })(i) 
                }
                /*for (var i = datas.length-1;i >= 0 ;i--) {
                    if (datas[i] == delparam) {
                        datas.splice(i,1);        //执行后datas.length会减一
                    }
                    callback(datas[i],i,i==0)  
                }*/
            }
        },
        /*遍历  datas <Array> || <Number>*/
        traverse:function(datas,callback){
            if(_typeof(datas,'Array')){
                var allLength = datas.length;
                var maxEveryLength = 40;
                var currentIndex = 0;
                   if(allLength<=maxEveryLength){ 
                      for(var i=currentIndex;i<allLength;i++){
                          callback(datas[i],i,i==allLength-1)  
                      }
                   }else{
                     // 多数据切片
                     setTimeout(function ArrayHander(){
                            for(var i=currentIndex;i<currentIndex+maxEveryLength && i<allLength;i++){
                                    callback(datas[i],i,i==allLength-1)  
                            }
                             currentIndex = i; 
                            if(currentIndex<allLength){
                                 // console.log(55) 
                                    setTimeout(ArrayHander,0)
                             }
                     },0) 
                   }     
            }
            if(_typeof(datas,'Object')){
              
            }
            if(_typeof(datas,'Number')){
                var allLength = datas;
                var maxEveryLength = 40;
                var currentIndex = 0;
                if(allLength<=maxEveryLength){ 
                      for(var i=currentIndex;i<allLength;i++){
                          callback(i,i==allLength-1)  
                      }
                   }else{
                     // 数字切片
                     setTimeout(function NumberHander(){
                            for(var i=currentIndex;i<currentIndex+maxEveryLength && i<allLength;i++){
                                    callback(i,i==allLength-1)  
                            }
                             currentIndex = i; 
                            if(currentIndex<allLength){
                                 console.log(66) 
                                    setTimeout(NumberHander,0)
                             }
                     },0) 
                   }     
                
              
            }

        },
        /*数组中是否存在元素,并返回索引
         compare:{a:原数组key,b:值}
        */
        isInArray:function(arr,compare){
                    for(var i=0;i<arr.length;i++){
                       if(((compare['a']?arr[i][compare['a']]:arr[i])==compare['b'])){
                         return i;
                      }
                      if(i==arr.length-1){
                         return -1;
                      }
                    }
        },
        /*数组中是否存在包含字符元素,并返回索引 模糊查找*/
        isInArrayIncludes:function(arr,compare){
              for(var i=0;i<arr.length;i++){
                      if(SparkUtil.includes((compare['a']?arr[i][compare['a']]:arr[i]),compare['b'])){
                     
                         return i;
                      }
                      if(i==arr.length-1){
                         return -1;
                      }
                    }
        }



    };


 

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
                     console.warn(err+' url参数中特殊符号可能未进行编码')
                 }  
            } 
       
    return tempObj;
}


/**
 * [SparkCoreHandler 核心功能]
 * @AuthorHTL
 * @DateTime  2020-08-21T12:14:58+0800
 */
function SparkCoreHandler(){
   var _scope = this;
   /*当前执行队列*/
    this.renderQueues=[];
    /**
     * [DefaultSetting 默认配置]
     * @type {Object}
     */
    this.DefaultSetting = {
                 name:'test',
                 title:'Spark Web',
                 scene:'pc',//mobile,pc,mp
                 router:'history',
                 devTool:false,
                 gray:false
         }
    /**
     * [widgetClassNames 组件名字缓存]
     * @type {Array}
     */
    this.widgetClassNames = [];
    /**
   * [_scope.CSSCache 样式管理]
   * @type {Object}
   */
     this.CSSCache = {};
      /**
   * [_scope.WidgetCache 组件缓存]
   * @type {Object}
   */
     this.WidgetCache = {};
      /**
   * [_scope.PageCache 页面缓存]
   * @type {Array}
   */
     this.PageCache = [];
    /**
     * [SparkEventCache 事件缓存]
     * @type {Array}
     */
     this.EventCache=[];
     
     this.CSS = this.CSSManager();
     this.HTML =  this.HTMLManager();

     /**
     * [WidgetWatchParams 监听属性管理]
     * @type {Object}
     */
     this.WidgetWatchParams = {
          show:function(oval, nval, obj) {
              var tempOld = oval;
              if (oval === nval)
                  return nval;
              /*变化监听*/
              obj.watch && obj.watch['show'] && obj.watch['show'](tempOld, nval);
              /*数据改变*/
             
            
                 var aniSet = obj.hideAni;

                     if(!nval && aniSet && aniSet.ani){
                            obj.style='animation:'+aniSet.ani;
                            var removeTimer=setTimeout(function(){
                                     clearTimeout(removeTimer);
                                  obj.style='display:none;animation:none;';
                                              
                              },aniSet.time);
                      }else if(nval && obj.showAni){
                          obj.style='animation:'+obj.showAni+';';
                          obj.style='r_d_n';
                       }else{
                          obj.style='r_d_n';
                       }
                     
              return nval;
          },
          style: function(oval, nval, obj) {
              var tempOld = oval;
              if (typeof nval === 'string') {
                  nval = SparkUtil.trim(nval);
                  var tempNewVal = nval=='r_d_n'?'':nval;
                  var newStyleObj={};
                  if (oval == nval)
                      return nval;
                  try {
                     
                     if(nval=='r_d_n')tempOld = tempOld.replace('display:none;','');
                     newStyleObj =  Object.assign(_scope.CSS.strStyleToObj(tempOld), _scope.CSS.strStyleToObj(tempNewVal));

                     obj.styleObj = newStyleObj;

                     nval = _scope.CSS.objStyleToStr(newStyleObj);
                     
                     // console.log(newStyleObj);
                 
                     _scope.CSS.modify(obj.name, '{' + nval + '}');

                     return nval;
                  } catch (err) {
                      console.error('style is an object:' + oval.name);
                  }
              } else {
                  return nval;
              }
          },
          className:function(oval, nval, obj){
             var tempOld = oval;
              if (typeof nval === 'string') {
              if (oval === nval)
                  return nval;
              /*变化监听*/
              obj.watch && obj.watch['className'] && obj.watch['className'](tempOld, nval);
              /*类名改变*/
              var nodeList = document.getElementsByClassName(obj.name);
              SparkUtil.traverse(nodeList.length,function(i,end){
                   nodeList[i].className = obj.className?nodeList[i].className.replace(tempOld,nval):nodeList[i].className+' '+nval;
              })
              /* for (var i = 0; i < nodeList.length; i++) {
                  nodeList[i].className = obj.className?nodeList[i].className.replace(tempOld,nval):nodeList[i].className+' '+nval;

               } */
              }else{
                 return nval;
             
               }

          },
          text: function(oval, nval, obj) {
              var tempOld = oval;
              if (oval === nval)
                  return nval;
              /*变化监听*/
              obj.watch && obj.watch['text'] && obj.watch['text'](tempOld, nval);
              /*数据改变*/
              var nodeList = document.getElementsByClassName(obj.name);
              SparkUtil.traverse(nodeList.length,function(i,end){
                   nodeList[i].innerText = nval;
              })
            
              return nval;
          },
          child: function(oval, nval, obj) {
          
               // console.log(tempOld)
              if (JSON.stringify(oval)  === JSON.stringify(nval))
                  return nval;
              /*变化监听*/
              obj.watch && obj.watch['child'] && obj.watch['child'](oval, nval);
             
              return nval;
          }
      };


}
/**
 * [CreateWidgetName description]
 * @AuthorHTL
 * @DateTime  2020-08-21T14:51:25+0800
 * @param     {[type]}                 widgetName [description]
 */
SparkCoreHandler.prototype.CreateWidgetName = function(widgetName){

    var hashName = widgetName + '-' + (((1 + Math.random()) * 0x10000000) | 0).toString(16);
            var testHash = this.widgetClassNames.join(',');

            hashName = (-testHash.indexOf(hashName) == true) ? hashName : hashName + 'x2';
            this.widgetClassNames.push(hashName);
  return hashName;
}

/**
 * [WidgetDefineProperty description]
 * @AuthorHTL
 * @DateTime  2020-08-21T13:56:40+0800
 * @param     {[type]}                 obj       [description]
 * @param     {[type]}                 propertys [description]
 */
SparkCoreHandler.prototype.WidgetDefineProperty =function(obj, propertys) {
        var _scope = this;
        var lastV = {};
           SparkUtil.traverse(propertys,function(propertyItem,index,end){
                lastV[propertyItem] = obj[propertyItem];
                (function(a) {
                    var tempVal = null;
                 
                    Object.defineProperty(obj, a, {
                        get: function() {
                            return tempVal;
                        },
                        set: function(newval) {
                            tempVal = lastV[a] = _scope.WidgetWatchParams[a]([lastV[a]][0], newval, obj);
                        }
                    })
                    obj[a] = lastV[a];
                })(propertyItem)
           })
        
}



    /**
 * [NxDom 组件生成Dom]
 * @AuthorHTL
 * @DateTime  2020-04-01T05:24:20+0800
 * * 路由，页面，文本，图片，视频，音频，容器，拖动容器，画布，文字按钮，文字图标，列表，
    横向排列，纵向排列,局部滚动容器，弹窗，swiper(需要引入swiper)
 */
 SparkCoreHandler.prototype.HTMLManager = function() {
        var _scope = this;
        var _core = {
            getAddress: function(widgets,parentName) {
                 if(!widgets)return [];
                var addressArr = [];
                SparkUtil.traverse(widgets,function(widgetItem,index,end){
                   widgetItem['parentName']=parentName;
                   addressArr.push(widgetItem['name'])
                })
                return addressArr;
            },
            getClassName: function(param) {
                var names = '';
                    names += (param && typeof param.className === 'object') ? param.className['name']+' ':
                             (param && typeof param.className === 'string') ? param.className+'':'';
                return names;
            },
            getDomEvent:function(type){
                   var DomEvent = {
                        clear:function(){
                   
                            this.delete(0,this.data.length);
                            return this;
                        },
                        delete:function(index,howmany,noani){
                            var tempChild = this.child.slice(0);
                            var delAdress = tempChild.splice(index,howmany);
                            var _this =this;
                               SparkUtil.traverse(delAdress,function(item,index,end){
                                      var delTarget=SparkCoreManage.getAddressData(item);
                                                  delTarget.remove('',noani);
                                                  tempChild = delAdress = null;
                               })
                          return this;

                        },
                        insertFirst:function(newdata,noani){
                           if(_typeof(newdata,'Undefined') || _typeof(newdata,'Null')){
                                  console.warn('no data');return;
                            }
                           var _this = this,
                               tempWidget =[],
                               newdatas =[];
                             //多个
                             if(_typeof(newdata,'Array')){
                                  SparkUtil.traverse(newdata,function(item,index,end){
                                    var w = _this.item(item,'');
                                     noani?(delete w.showAni,w.style='animation:none'):'';
                                     tempWidget.push(_this.item(item,''));
                                     newdatas.push(item);
                                  })
                             }else{
                                  tempWidget = this.item(newdata,'');
                                  noani?(delete tempWidget.showAni,tempWidget.style='animation:none'):'';
                                  newdatas.push(newdata);
                             }
                             this.data.splice.apply(this.data,[0, 0].concat(newdatas))
                             this.prepend(tempWidget);
                             tempWidget = newdatas = null;
                             return this;
                     },
                     insertLast:function(newdata,noani){
                             if(_typeof(newdata,'Undefined') || _typeof(newdata,'Null')){
                                  console.warn('no data');return;
                            }
                           var _this = this,     
                               tempWidget =[],
                               newdatas =[];

                             //多个
                             if(_typeof(newdata,'Array')){
                                  SparkUtil.traverse(newdata,function(item,index,end){
                                     var w = _this.item(item,'');
                                     
                                     noani?(delete w.showAni,w.style='animation:none;'):'';
                                     tempWidget.push(w);
                                     newdatas.push(item);
                                  })
                             }else{
                                    tempWidget = this.item(newdata,'');
                                    noani?(delete tempWidget.showAni,tempWidget.style='animation:none;'):''; 
                                    newdatas.push(newdata);
                             }
                             this.data = this.data.concat(newdatas);
                             this.append(tempWidget);
                             tempWidget = newdatas = null;
                             return this;
                     },
                     insert:function(index,newdata,noani){
                        
                            if(_typeof(newdata,'Undefined') || _typeof(newdata,'Null')){
                                  console.warn('no data');return;
                            }
                            var _this = this,
                                tempWidget =[],
                                newdatas =[],
                                _thisMaxIndex=this.child.length>0?this.child.length-1:0;
                             //多个
                             if(_typeof(newdata,'Array')){
                                  SparkUtil.traverse(newdata,function(item,index,end){
                                     newdatas.push(item);
                                  })
                             }else{
                                  newdatas.push(newdata);
                             }
                             
                             if(index>=_thisMaxIndex){
                                _thisMaxIndex==0?_this.insertFirst(newdatas,noani):_this.insertLast(newdatas,noani);
                            
                             }else{
                              
                                  SparkUtil.traverse(newdata,function(item,index,end){
                                     var _widget = _this.item(item,'');
                                     noani?(delete _widget.showAni,_widget.style='animation:none;'):'';
                                     tempWidget.push(_widget);
                                  })

                                  this.data.splice.apply(this.data,[index, 0].concat(newdatas));
                                  SparkCoreManage.getAddressData(this.child[index]).before(tempWidget);
                             }
                            
                            tempWidget = newdatas = null;

                            return this;
                     },
                     update:function(index,newdata){
                        if(_typeof(newdata,'Undefined') || _typeof(newdata,'Null') || index>this.data.length-1){
                                  console.warn('no data or not found');return;
                            }
                     
                      var tempData=null;
                      if(_typeof(newdata,'Object')){
                          tempData = Object.assign(this.data[index],newdata); 
                      }

                      if(_typeof(newdata,'String')|| _typeof(newdata,'Number')){
                            tempData = newdata;
                      }
                      this.insert(index,tempData,true);
                      
                      this.delete(((index+1>=this.data.length-1)?this.data.length-2:index+1),1,true);
                    
                     return this;

                   },
                    append:function(newdoms,set){
                            return SparkCoreManage.addDom(this,newdoms,'append',set)
                    },
                    prepend:function(newdoms,set){

                            return SparkCoreManage.addDom(this,newdoms,'prepend',set)
                    },
                    removeChild:function(deldom,set){
                                 var _this = this,
                                     tempWidget =null;
                               
                                if (_typeof(deldom,'Object')){
                                    tempWidget = deldom;
                                }
                                if (_typeof(deldom,'Number') || _typeof(deldom,'String')){
                                    var index = (deldom=='firstChild')?0:((deldom=='lastChild')?(this.child.length-1):deldom);
                                    tempWidget = _scope.getAddressData(this.child[index]);
                                }
                                 if(!tempWidget)return this;
                                   var aniSet = set ||  tempWidget.hideAni;
                                   if(aniSet  && aniSet.ani){
                                     tempWidget.style='animation:'+aniSet.ani+';';
                                     var removeTimer=setTimeout(function(){
                                                    clearTimeout(removeTimer);
                                                    SparkCoreManage.remove(_this,deldom);
                                                    tempWidget.style='animation:none;';
                                                    tempWidget = null;
                                        },aniSet.time)
                                   }else{
                                      SparkCoreManage.remove(this,deldom)
                                   }
                           
                         return this;
                       },
                       after:function(newdoms,set){

                            return SparkCoreManage.addDom(this,newdoms,'after',set)
                       },
                       before:function(newdoms,set){
                            return SparkCoreManage.addDom(this,newdoms,'before',set)    
                       },
                       remove:function(set,noani){
                          var tempWidget = this;
                          var aniSet = set ||  this.hideAni; 

                            if(_typeof(tempWidget.parentName,'Array')){
                                 var parentNames = tempWidget.parentName.slice(0);
                                 SparkUtil.traverse(parentNames,function(item,index){
                                  if(aniSet && aniSet.ani && !noani){

                                    tempWidget.style='animation:'+aniSet.ani+';';
                                    var removeTimer=setTimeout(function(){
                                       clearTimeout(removeTimer);
                                       SparkCoreManage.remove(_scope.WidgetCache[item],tempWidget);
                                       tempWidget.style='animation:none;';
                                     },aniSet.time)
                                  }else{

                                     SparkCoreManage.remove(_scope.WidgetCache[item],tempWidget)
                                  }
                                 })
                               
                            }
                            if(_typeof(tempWidget.parentName,'String')) {
                               if(aniSet && aniSet.ani && !noani){
                                    tempWidget.style='animation:'+aniSet.ani+';';
                                    var removeTimer=setTimeout(function(){
                                              clearTimeout(removeTimer);
                                              SparkCoreManage.remove(_scope.WidgetCache[tempWidget.parentName],tempWidget);
                                              tempWidget.style='animation:none;';
                                       },aniSet.time)
                                }else{
                                      SparkCoreManage.remove(_scope.WidgetCache[tempWidget.parentName],tempWidget)
                                }
                            }
                
                      // return this;
                    }   


                   };

                   return DomEvent[type];
            },
            getKeyValue:function(type){
                 var keyFn={
                      html:function(){
                          var idName = this.idName?'id='+this.idName:'';
                          var className = _core.getClassName(this)+this.name;

                          return  this.type=='Image'?
                            '<img '+idName+' class="'+className+'" src="'+this.imgurl+'" />'
                            : '<'+this.tag+' '+idName+' class="'+className+'">'+
                            (this.type=='Text'?this.text+'[['+this.name+']]':'[['+this.name+']]')+'</'+this.tag+'>';
                      },
                      style:function(){

                               var tempStyleStr = '';
                                 if(_typeof(this.className,'Object')){
                                  tempStyleStr += this.className.style;
                                 }
                                 tempStyleStr+=this.defaultcss+(this.style?this.style:'');
                              
                                 if(_typeof(this.showAni,'Object')){
                                    tempStyleStr +='animation:'+this.showAni.ani+';';
                                 }
                                 if(this.type==='Drag'){
                                  if(this.bounded && this.bounded.parent){
                                    tempStyleStr+='position:absolute;';
                                  }
                                 }
                                
                                
                             delete this.defaultcss;
                             return  tempStyleStr;

                      },
                      child:function(){
                        
                           var _tempChild=[]; //过滤一下子集组件
                           var _this = this;
                            if(this.type=='List'){
                               var tempDataArr=this.data;
                                   if(_typeof(this.data,'Number')){
                                       tempDataArr=[];
                                       SparkUtil.traverse(this.data,function(index,end){
                                           tempDataArr.push(index)
                                       })
                                   }
                                    /*jsonstr*/
                                    if(_typeof(this.data,'String')){
                                          try{tempDataArr = JSON.parse(this.data);}
                                          catch(err){
                                            tempDataArr=[];
                                            console.error('data 中 JSON 格式出错')
                                          }
                                        }
                                    if(_typeof(tempDataArr,'Array') && tempDataArr.length>0 && _typeof(this.item,'Function')){
                                                SparkUtil.traverse(tempDataArr,function(tempDataItem,index,end){
                                                    var _widget = _this.item(tempDataItem,index);
                                                        _widget.listIndex=index;
                                                        _tempChild.push(_widget);
                                                })
                                       }
                            }else{
                                 SparkUtil.traverse(this.child,function(widget,index,end){
                                              if(_typeof(widget,'Object')  && widget.name){
                                                 _tempChild.push(widget);
                                              }
                                   })
                            }


                          return _core.getAddress(_tempChild,this.name);
                      }
                 }

                 return keyFn[type].call(this);
            },
            setDefineProperty: function(address, arr) {
                _scope.WidgetDefineProperty(address.indexOf('Css') != -1 ? _scope.CSSCache[address] : _scope.WidgetCache[address], arr);
            },
            getNxWidget:function(nxtype,newparams,domtag,defaultcss,defineProperty){
             
                var p = !newparams?{}:newparams;
                var NEW_WIDGET = {
                                 name:_scope.CreateWidgetName(nxtype),
                                 show:true,
                                 style:'',
                                 className:'',
                                 type:nxtype,//
                                 defaultcss:defaultcss,
                                 tag:p.tag || domtag
                                };

               /*pulic type handler*/

      
                Object.assign(NEW_WIDGET, p); 
                
                NEW_WIDGET.styleObj = _scope.CSS.strStyleToObj(_core.getKeyValue.call(NEW_WIDGET,'style'));

                NEW_WIDGET.style = _scope.CSS.objStyleToStr(NEW_WIDGET.styleObj);

                NEW_WIDGET.html = _core.getKeyValue.call(NEW_WIDGET,'html');

                NEW_WIDGET.child =  _core.getKeyValue.call(NEW_WIDGET,'child');

               if(NEW_WIDGET.type === 'List'){
                  NEW_WIDGET.clear = _core.getDomEvent.call(NEW_WIDGET,'clear');
                  NEW_WIDGET.delete = _core.getDomEvent.call(NEW_WIDGET,'delete');
                  NEW_WIDGET.insertFirst = _core.getDomEvent.call(NEW_WIDGET,'insertFirst');
                  NEW_WIDGET.insertLast = _core.getDomEvent.call(NEW_WIDGET,'insertLast');
                  NEW_WIDGET.insert = _core.getDomEvent.call(NEW_WIDGET,'insert');
                  NEW_WIDGET.update = _core.getDomEvent.call(NEW_WIDGET,'update');
               }

               /*添加子集元素*/
               if(NEW_WIDGET.type != 'Image'){
                   NEW_WIDGET.append = _core.getDomEvent.call(NEW_WIDGET,'append');
                   NEW_WIDGET.prepend = _core.getDomEvent.call(NEW_WIDGET,'prepend');
                   NEW_WIDGET.removeChild = _core.getDomEvent.call(NEW_WIDGET,'removeChild');

                }

                 /*指定元素插入*/
                  NEW_WIDGET.after = _core.getDomEvent.call(NEW_WIDGET,'after');
                  NEW_WIDGET.before = _core.getDomEvent.call(NEW_WIDGET,'before');
                 /*删除元素*/
                  NEW_WIDGET.remove = _core.getDomEvent.call(NEW_WIDGET,'remove');
                 
                 _scope.WidgetCache[NEW_WIDGET.name] = NEW_WIDGET;

                 /*数据变化监听*/
                 defineProperty && _core.setDefineProperty(NEW_WIDGET.name, defineProperty);
              
                  if(nxtype=='Page'){
                     _scope.PageCache.push(NEW_WIDGET.name);
                     /*开始渲染*/
                     console.time("Render");
                     // _scope.SparkRender();
                     console.timeEnd("Render");
                  }
                

              return NEW_WIDGET;

            }
        };

        return {
            Css: function(p) {
                !p && (p = '');
                var obj = {type:'Css'}
                  , address = _scope.CreateWidgetName('Css');

                obj.name = address;
                obj.styleObj = _scope.CSS.strStyleToObj(p);
                obj.style = _scope.CSS.objStyleToStr(obj.styleObj);

                _scope.CSSCache[address] = obj;
                _core.setDefineProperty(address, ['style']);
                obj = 0;
                return _scope.CSSCache[address];
            },
            Page: function(p) {
  
              return _core.getNxWidget('Page',
                                    p,
                                    'div',
                                    'position:relative;',
                                    ['style','child','className','show'],
                                    );
            },
            Text: function(str, p) {

                !p && (p = {});
                 p.text=str;

                 return _core.getNxWidget('Text',
                                    p,
                                    'span',
                                    '',
                                    ['text','style','className','show'],
                                    );
            },
            Image: function(src,p) {
                 !p && (p = {});
                  p.imgurl=src;
                  return _core.getNxWidget('Image',
                                    p,
                                    'img',
                                    'border:0;',
                                    ['style','className','show'],
                                    );
            },
            Box: function(p) {
               
                return _core.getNxWidget('Box',
                                    p,
                                    'div',
                                    'background-color:#3D3F3F;',
                                    ['style','child','className','show'],
                                    );
            },

            List:function(p){
               return _core.getNxWidget('List',
                                    p,
                                    'ul',
                                    '',
                                    ['style','child','show'],
                                    );
            },
            Drag:function(p) {
                !p && (p = {});
                var event = {press:function(){},move:function(){},up:function(){}};
                p.on=p.on?Object.assign(event,p.on):event;
                p.position={x:0,y:0,startX:0,startY:0};
                return _core.getNxWidget('Drag',
                                    p,
                                    'div',
                                    'position:fixed;background-color:#3D3F3F;',
                                    ['style','show'],
                                    );
            },
            Stack:function(p) {
                return _core.getNxWidget('Stack',
                                    p,
                                    'div',
                                    'position:relative;background-color:#3D3F3F;',
                                    ['style','show'],
                                    );
            },
            Position:function(p) {
              return _core.getNxWidget('Position',
                                    p,
                                    'div',
                                    'position:absolute;background-color:#3D3F3F;',
                                    ['style','show'] 
                                    );
            },
            Fixed:function(p) {
              return _core.getNxWidget('Fixed',
                                    p,
                                    'div',
                                    'position:fixed;background-color:#3D3F3F;',
                                    ['style','show'] 
                                    );
            },
            Carousel:function(p) {
               !p && (p = {});
                var option = {
                      direction:'horizontal',//horizontal(默认水平) || vertical(垂直)
                      speed:1000,
                      autoPlay:false,
                      initSlide:0,
                      touchRatio:0.1,
                      allowTouchMove:true,
                     };
                p.option=p.option?Object.assign(option,p.option):option;
                p.activeIndex=0;
                p.slidePrev = function(time){
                    var activeIndex = this.activeIndex-1;
                    this.slideTo(activeIndex,time)
                };
                p.slideNext = function(time){

                   var activeIndex = this.activeIndex+1;

                    this.slideTo(activeIndex,time)
                      
                };
                p.slideTo=function(activeIndex,time){

                  if( activeIndex<0 || activeIndex>this.maxIndex)return;
                  
                    time = time || 1000;
                    var Wrapper = this.Wrapper;
                    if(!Wrapper.displacementSwitch)return;

                    Wrapper.displacementSwitch=false;
                   
                       
                    Wrapper.displacement({
                         a:{x:Wrapper.position.x,y:Wrapper.position.y},
                         b:{x:Wrapper.bounded.y?(-Wrapper.width()/Wrapper.child.length*activeIndex):0,y:Wrapper.bounded.x?(-Wrapper.height()/Wrapper.child.length*activeIndex):0}
                    },
                    activeIndex>=this.activeIndex,
                    time,
                    activeIndex) 
                };
                p.setPagination  = function(){
                  var _HTML = SparkCoreManage.HTML;
                  var _this = this;
                  this.paginationStyle = _HTML.Css('display:inline-block;width:10px;height:10px;border-radius:10px;margin:5px;background-color:rgba(255,255,255,0.5);');
                  this.paginationDefaultStyle='background-color:rgba(255,255,255,0.5);';
                  this.paginationActiveStyle='background-color:rgba(255,255,255,1);';
                  this.paginationList = _HTML.List({
                        tag:'div',
                        style:'width:100%;background-color:rgba(0,0,0,0); color:#fff;position:absolute;z-index:0;bottom:0;',
                        data:this.maxIndex+1,
                        item:function(item,index){
                                return  SparkApp.Box({
                                tag:'i',
                                style:'background-color:rgba(255,255,255,0.5);',  
                                className:_this.paginationStyle,
                                init:function(){
                                   if(item==_this.option.initSlide){
                                      this.style=_this.paginationActiveStyle;
                                   }
                                }, 
                                on:{
                                  click:function(){
                                     _this.slideTo(item);
                                  }
                                }  
                              });
                        }
                     });
                    this.append(this.paginationList)
             
                };
                p.update = function(){
                   var WrapperIndex = SparkUtil.isInArrayIncludes(this.child,{b:'CarouselWrapper'});

                   if(WrapperIndex==-1)return;
                   var w=this.width(),h=this.height();
                   var Wrapper =  _scope.getAddressData(this.child[WrapperIndex]);

                    this.style = 'overflow:hidden;position:relative;width:'+w+'px;height:'+h+'px;';
                   
                   /*设置*/
                    Wrapper.bounded.x = (this.option.direction=='vertical')?true:false;
                    Wrapper.bounded.y = (this.option.direction=='vertical')?false:true;
                    Wrapper.bounded.disable =  !this.option.allowTouchMove
                    var WrapperWidth = (this.option.direction=='vertical')?w:w*Wrapper.child.length;
                    var WrapperHeight = (this.option.direction=='vertical')?h*Wrapper.child.length:h; 
                    
                    Wrapper.style='overflow:hidden;position:absolute;width:'+WrapperWidth+'px;height:'+WrapperHeight+'px;';
                    
                    SparkUtil.traverse(Wrapper.child,function(name,index,end){
                       var _slide =  _scope.getAddressData(name);
                           _slide.style='position:relative;width:'+w+'px;height:'+h+'px;'+(p.option.direction=='vertical'?'':'float:left;');
                    });
                    this.Wrapper=Wrapper;
                    this.maxIndex = Wrapper.child.length-1;

                    this.option.initSlide =this.option.initSlide>this.maxIndex?this.maxIndex:this.option.initSlide;
                     
                   
                    if(this.option.pagination){
                       this.setPagination();
                    }
                    
                     if(_typeof(this.option.initSlide,'Number')){
                      var _this=this;
                      var timer = setTimeout(function(){
                              clearTimeout(timer)
                             _this.slideTo(_this.option.initSlide,100);
                       }) 
                  
                     }
                     
                    
                    
                     
                };
              return _core.getNxWidget('Carousel',
                                    p,
                                    'div',
                                    'position:relative;width:100%;height:100%;background-color:#3D3F3F;overflow:hidden;',
                                    ['style','show'] 
                                    );
            },
            CarouselWrapper:function(p) {
              !p && (p = {});

                p.position={x:0,y:0,startX:0,startY:0};
                p.bounded={y:true,parent:false,out:false,disable:true};
                p.type = 'Drag';
                p.on = {
                  press:function(){},
                  move:function(){
                          if(this.bounded.disable)return;
                             var _parentWidget = _scope.getAddressData(this.parentName);
                          if(this.bounded.y){
                              this.displacementBounce = Math.abs(this.position.lastX-this.position.x)>=_parentWidget.option.touchRatio*_parentWidget.width();
                          }
                          if(this.bounded.x){
                               this.displacementBounce = Math.abs(this.position.lastY-this.position.y)>=_parentWidget.option.touchRatio*_parentWidget.height();
                          } 
                  },
                  up:function(){
                     if(!this.displacementSwitch || this.bounded.disable)return;

                     var _parentWidget = _scope.getAddressData(this.parentName);
                     var activeIndex = _parentWidget.activeIndex;
          
                      this.displacementSwitch=false;
                      this.bounded.disable = true;
                      var add = true;//前进或后退
                        if(this.position.direction=='left' || this.position.direction=='up'){
                           if(this.displacementBounce){
                             activeIndex = activeIndex+1;
                              add=true;
                           }else{
                            add=false;
                           }
                          
                           if(activeIndex>this.child.length-1){
                             add=false;
                             activeIndex=this.child.length-1;
                           }
                        }
                        if(this.position.direction=='right' || this.position.direction=='down'){
                            if(this.displacementBounce){
                              activeIndex = activeIndex-1;
                               add=false;
                            }else{
                               add=true;
                            }
                          
                           if(activeIndex<0){
                             add=true;
                             activeIndex=0;
                           }
                        };
                      


                    this.displacement(
                          {
                               a:{x:this.position.x,y:this.position.y},
                               b:{x:this.bounded.y?(-this.width()/this.child.length*activeIndex):0,y:this.bounded.x?(-this.height()/this.child.length*activeIndex):0}
                          },
                          add,
                          _parentWidget.option.speed,
                          activeIndex
                          ); 

                  }
                }; 
                /*位移函数计算*/
                p.displacementBounce=true;
                p.displacementSwitch=true;
                p.displacement = function(p,add,time,activeIndex){
                    


                    time=time>1500?1500:time;
                    

                    
                    var _parentWidget = _scope.getAddressData(this.parentName);
                    var _this = this;
                    var distance = this.bounded.y?Math.abs(p.b.x-p.a.x):Math.abs(p.b.y-p.a.y);
 
                    var speed = parseInt((distance/time)*200)+1;
                    var TempSpeed = speed;
                     
                        
                    var runTimer=null; 
                    var stime=0;

                    if(_parentWidget.option.pagination){
                             _parentWidget.paginationStyle.style=_parentWidget.paginationDefaultStyle;
                      
                             _parentWidget.paginationList.getChild(activeIndex).style=_parentWidget.paginationActiveStyle;
                          }
                    var clearTimer = function(){
                          clearTimeout(runTimer);
                          _parentWidget.activeIndex = activeIndex;
                         
                          
                          _this.displacementSwitch = true;
                          if(_parentWidget.option.allowTouchMove){
                             _this.bounded.disable = false;
                          }
                         
              
                    }
                    var runDisplacement = function(){
                       
                        runTimer = setTimeout(function(){
                       
                             
                              add?(p.a.x-=speed,p.a.y-=speed):(p.a.x+=speed,p.a.y+=speed);
                            
                              stime = 20;
                             
                              speed = parseInt(speed>parseInt(TempSpeed*0.3)?(speed-speed/4):speed)+1;
                              
                              _this.position.x=parseInt(p.a.x);
                              _this.position.y=parseInt(p.a.y);
                              
                              
                              if(add){ //前进
                                  // console.log('前进',speed, _this.position.x)
                                if(_this.bounded.y){
                       
                                    if(p.a.x>p.b.x){
                                     
                                       runDisplacement();
                                    }else{
                                       _this.position.x = p.b.x;
                                      
                                       clearTimer();
                                       
                                    }
                                } 
                                if(_this.bounded.x){
                                    if(p.a.y>p.b.y){
                                       runDisplacement();
                                    }else{
                                       _this.position.y = p.b.y;
                                       clearTimer();
                                    }
                                  }
                               
                              }else{ //后退
                                    // console.log('后退',speed, _this.position.x)
                                 if(_this.bounded.y){  
                                   if(p.a.x<p.b.x){
                                      runDisplacement();
                                    }else{
                                       _this.position.x = p.b.x;
                                      clearTimer();
                                       
                                    }
                                  }  
                                  if(_this.bounded.x){ 
                                      if(p.a.y<p.b.y){
                                         runDisplacement();
                                      }else{
                                         _this.position.y = p.b.y;
                                         clearTimer();
                                      }
                                  }

                              } 

                          var left = (_this.bounded.x)?'':'left:'+_this.position.x+'px;',
                              top =  (_this.bounded.y)?'':'top:'+_this.position.y+'px;';
                              _this.style=left+top;

                       },stime)
                    
                    }; 
                  
                   runDisplacement();
                    
                };     
              return _core.getNxWidget('CarouselWrapper',
                                    p,
                                    'div',
                                    'width:100%;height:100%;position:absolute;background-color:#3D3F3F;overflow:hidden;touch-action:none;',
                                    ['style'] 
                                    );
            },
            //moreWiget...
        }
}

   /**
 * [NxStyle  样式解析注入 STYLE web版]
 * @AuthorHTL
 * @DateTime  2020-03-29T16:15:01+0800
 */
 SparkCoreHandler.prototype.CSSManager= function(){

        var _core = {
            autoprefixerConfig:{
              param:{
                'transition':['-webkit-','-moz-','-ms-','-o-'],
                'transform':['-webkit-','-moz-','-ms-','-o-'],
                'animation':['-webkit-','-moz-','-ms-','-o-'],
                'animation-name':['-webkit-','-moz-','-ms-','-o-'],
                'user-select':['-webkit-','-moz-','-ms-','-o-'],
                'border-radius':['-webkit-','-moz-','-ms-'],
                'border-top-colors':['-moz-'],
                'border-right-colors':['-moz-'],
                'border-bottom-colors':['-moz-'],
                'border-left-colors':['-moz-'],
                'box-shadow':['-webkit-','-moz-'],
                'backface-visibility':['-webkit-','-moz-','-ms-'],
                'flex-direction':['-webkit-','-moz-','-ms-','-o-'],
                'flex':['-prefix-box','-webkit-box-','-moz-box-','-webkit-','-ms-'],
                'order':['box-order','-webkit-box-','-moz-box-','-webkit-'],
                'justify-content':['-webkit-','-moz-','-ms-','-o-'],
                'align-items':['-webkit-','-moz-','-ms-','-o-'],
                'flex-wrap':['-webkit-','-moz-','-ms-','-o-'],
                'flex-flow':['-webkit-','-moz-'],
                'background-size':['-webkit-'],
                'box-sizing':['-webkit-','-moz-']
              },
              value:{
                'grid':['-ms-grid'],
                'flex':['box','-webkit-box','-ms-flexbox','-moz-box','-webkit-flex'],
                'linear-gradient':['-webkit-linear-gradient','-moz-linear-gradient','-ms-linear-gradient','-o-linear-gradient'],
                'calc':['-webkit-calc'],
              }
            },
            insert: function(Attribute, AttributeVal, cssStr) {
                var newStyle = D.createElement('style');
                    newStyle.type = "text/css";
                  newStyle.setAttribute(Attribute, AttributeVal);
                  newStyle.innerText += (/modifycss/.test(Attribute) ? '.' + AttributeVal : '') + cssStr;
                  D.head.insertBefore(newStyle, D.head.lastChild);
            },
            remove: function(dataTarget) {
                var delTarget = D.querySelector(dataTarget);
                if (delTarget) {
                    D.head.removeChild(delTarget);
                }
             },
            autoprefixer:function(CssItem,tempObj){
      
                         var p = CssItem.split(':');
                         var param = SparkUtil.trim(p[0]),
                             value = SparkUtil.trim(p[1]);
                         var cssParam = this.autoprefixerConfig.param[param];
                         if(cssParam){
                           SparkUtil.traverse(cssParam,function(cssParamItem,index,end){
                               tempObj[cssParamItem+param] = value;
                           })
                         }
                         /* xcss值兼容匹配
                           var cssValue = this.autoprefixerConfig.value[value];
                           var cssValue = '',cssValueKey='';
                           for(var key in this.autoprefixerConfig.value){
                            if(SparkUtil.includes(value,key)){
                              cssValueKey = key;
                              cssValue = this.autoprefixerConfig.value[key];
                            }
                           }
                           if(cssValue){
                              SparkUtil.traverse(cssValue,function(cssValueItem,index,end){
                                tempObj[param] = cssValueItem;
                                 tempObj[param] = value.replace(new RegExp(cssValueKey,'ig'),cssValueItem);
                              })
                            }
                           str.replace(new RegExp('transition','ig'),'-webkit-transition');
                         */
             }

        };
      
       return {
              /*追加*/
               add:function(id, cssStr) {
                    cssStr = cssStr && SparkUtil.trim(cssStr);
                    _core.remove("[data-style='" + id + "']")
                    _core.insert('data-style', id, cssStr)
                },
               /*修改*/ 
               modify: function(selector, cssStr) {
                  cssStr = SparkUtil.trim(cssStr);
                  /* try{
                          if(!/^\.|#/.test(selector)){
                             throw 'WARN: modify style selector must star" .|| #"}'
                          }
                          if(!/^\{.*\}$/.test(cssStr)){
                            throw 'WARN: modify style cssstr must star"{" end "}"}'
                           }
                        }catch(error){
                           console.warn(error)
                        }*/
                  _core.remove("[data-modifycss='" + selector + "']")
                  _core.insert('data-modifycss', selector, cssStr)
                },
               /*样式字符串转对象*/
               strStyleToObj:function(str){
                    var tempObj={};
                     if(typeof str !='string'){
                       return tempObj;
                      }
                   
                     var CssArr = SparkUtil.trim(str).replace(new RegExp('http:','ig'),'')
                                               .replace(new RegExp('https:','ig'),'')
                                               .replace(new RegExp('\"','ig'),'')
                                               .replace(new RegExp('\'','ig'),'').split(';');
                   
                    SparkUtil.traverse(CssArr,function(CssItem,index,end){
                      if(CssItem) {
                        var tempCssItem = CssItem;
                        var p = CssItem.split(':');
                        tempObj[SparkUtil.trim(p[0])] = SparkUtil.trim(p[1]);
                        _core.autoprefixer(tempCssItem,tempObj)
                      }
                    })
                   
                   return tempObj; 
               },
                /*样式对象转字符串*/
               objStyleToStr: function(obj){
                  var t = JSON.stringify(obj);
                  if(!_typeof(obj,'Object') || t == "{}"){
                         return '';
                  }

                  var CssStr = t.replace(new RegExp('\\","','ig'),';')
                                 .replace(new RegExp('\\":"','ig'),':')
                                 .replace(new RegExp('\"','ig'),'')
                                 .replace(new RegExp('\{'),'')
                                 .replace(new RegExp('\}'),';');

                  return CssStr;
                },
                /*样式合并处理*/
               strStyleHandle: function(laststr,nextstr,className){

                 var  _insertIndex=laststr.indexOf(nextstr);
                   if(_insertIndex != -1){
                    laststr = (laststr.substring(0,_insertIndex)+',.'+className)+
                                 (laststr.substring(_insertIndex,laststr.length));
                   }

                     return laststr;
               },
               
          }

 }
  /**
 * [getAddressData 通过地址获取组件所有信息]
 * @AuthorHTL
 * @DateTime  2020-04-01T05:25:07+0800
 * @param     {[type]}                 address [description]
 * @return    {[type]}                         [description]
 */
SparkCoreHandler.prototype.getAddressData = function(address) {
        try {
          
            if (typeof address == 'string' && address.indexOf('Css') != -1) {
                throw 'ERROR: Error useing Widget'
            }

        } catch (err) {
            console.error(err);
            return {}
        }
        return address && this.WidgetCache[address];
 }
 

   /*
 * [ResetCss 重置css]
 * @AuthorHTL
 * @DateTime  2020-04-02T22:18:59+0800
 */
 SparkCoreHandler.prototype.ResetCss = function(cssStr) {
      
    var grayStr = this.DefaultSetting.gray==true?'html{ filter: grayscale(100%); -webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%); filter: url("data:image/svg+xml;utf8,#grayscale"); filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); -webkit-filter: grayscale(1);}':'';

   return this.DefaultSetting.resetCss || 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;box-sizing:border-box;font-size:100%;vertical-align:baseline;background:transparent;}body{line-height:1;}ol,ul{list-style:none;}blockquote,q{quotes:none;}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none;}:focus{outline:0;}ins{text-decoration:none;}del{text-decoration:line-through;}table{border-collapse:collapse;border-spacing:0;}*{-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}::-webkit-scrollbar{width:5px;height:5px;position:absolute;}::-webkit-scrollbar-track{width:5px;background-color:rgba(0,0,0,0);-webkit-border-radius:2em;-moz-border-radius:2em;border-radius:2em}::-webkit-scrollbar-thumb{background-color:rgba(61,63,63,.5);background-clip:padding-box;min-height:20px;-webkit-border-radius:2em;-moz-border-radius:2em;border-radius:2em}::-webkit-scrollbar-thumb:hover{background-color:rgba(61,63,63,1)}'+grayStr;
  
  }

/* 初始化 style  */
 SparkCoreHandler.prototype.makeStyleTree = function(_cssStr) {
        var cssStr = this.ResetCss()+_cssStr;
        // this.ResetCss && this.CSS.add('resetCss', this.ResetCss());
        cssStr && this.CSS.add('MainCss', cssStr);

  }  
/* 新增 style  */
 SparkCoreHandler.prototype.makeNextStyleTree = function(_cssStr,address) {

        _cssStr && this.CSS.add('NextCss-'+address, _cssStr);
 } 

/**
 * [specialWidgetEvent 特殊组件事件]
 * @AuthorHTL
 * @DateTime  2020-09-21T15:23:23+0800
 * @return    {[type]}                 [description]
 */
 SparkCoreHandler.prototype.specialWidgetEvent = function(type){
      var _scope = this;
      var spfn = {
                 'Drag':{
                     status:0,
                     container:document.body,
                     _this:null,
                     bodyEvent:function(){
                        spfn.Drag.end()
                      },
                     start: function(ev,target){
                         if(this.bounded && this.bounded.disable)return;
                          var touch = ev.targetTouches && ev.targetTouches[0];
                          
                          var screen = touch || ev;
                          if(this.bounded && this.bounded.parent){  
                             spfn.Drag.container = _scope.getAddressData(this.parentName).$el;
                          }
                          this.position.startX=screen.clientX - target.offsetLeft;
                          this.position.startY=screen.clientY - target.offsetTop;
                          this.position.lastX= this.position.x;
                          this.position.lastY= this.position.y;

                          spfn.Drag.status=1;
                          spfn.Drag._this = this;
                          this.on['press'].call(this);
                          addEventListener(spfn.Drag.container,SparkUtil.env.isMobile ? 'touchmove' : 'mousemove',spfn.Drag.move,{ passive: false })
                        
                       
                          if(this.bounded && !this.bounded.parent){ 
                              addEventListener(spfn.Drag.container,SparkUtil.env.isMobile ? 'touchend' : 'mouseup',spfn.Drag.bodyEvent)
                          }
                     },
                     move:function(e,target){//!SparkUtil.env.isMobile && 
                         
                      if(!spfn.Drag.status)return;
                          e.preventDefault();e.stopPropagation();
                        var ev = e || window.event;
                        var _this = spfn.Drag._this;
                        var touch = ev.targetTouches && ev.targetTouches[0];
                        var screen = touch || ev;
                          
                          
                          var newX=(_this.bounded && _this.bounded.x)?0:(screen.clientX - _this.position.startX);
                          var newY=(_this.bounded && _this.bounded.y)?0:(screen.clientY - _this.position.startY);
                          
            
                          /*溢出边界*/
                          if(_this.bounded && _this.bounded.out){
                            var parentBoxWidth = (spfn.Drag.container.tagName==='BODY')? SparkUtil.screen.width():spfn.Drag.container.offsetWidth,
                                parentBoxHeight = (spfn.Drag.container.tagName==='BODY')? SparkUtil.screen.height():spfn.Drag.container.offsetHeight;
                            if(newX<=0){
                              newX=0;
                            }
                            if(newX+_this.width()>=parentBoxWidth){
                              newX = parentBoxWidth - _this.width();
                            }
                            if(newY<=0){
                             newY=0;
                            }
                             if(newY+_this.height()>=parentBoxHeight){
                              newY = parentBoxHeight - _this.height();
                            }
                          }
                          
                          /*记录方向*/
                           if(newX>_this.position.x){
                             _this.position.direction='right'
                           }
                           if(newX<_this.position.x){
                             _this.position.direction='left'
                           }
                            if(newY>_this.position.y){
                             _this.position.direction='down'
                           }
                           if(newY<_this.position.y){
                             _this.position.direction='up'
                           }

                          _this.position.x = newX;
                          _this.position.y = newY;
                          //XY约束
                        var left = (_this.bounded && _this.bounded.x)?'':'left:'+_this.position.x+'px;',
                            top =  (_this.bounded && _this.bounded.y)?'':'top:'+_this.position.y+'px;';
                            

                          _this.style=left+top;
 
                          _this.on['move'].call(_this);
                       
                     },
                     end:function(target){
                          if(spfn.Drag.status==0)return;
                       var _this = spfn.Drag._this;
                           spfn.Drag.status=0;
                           _this.on['up'].call(_this);
                          removeEventListener(spfn.Drag.container,SparkUtil.env.isMobile ? 'touchmove' : 'mousemove',spfn.Drag.move);
                          if(_this.bounded && !_this.bounded.parent){
                            removeEventListener(spfn.Drag.container,SparkUtil.env.isMobile ? 'touchend' : 'mouseup',spfn.Drag.bodyEvent);
                          } 
                      }  
                 }
                  
                }

      return spfn[type];

 }

  /**
 * [addEvent 注册基本组件事件]
 * @AuthorHTL
 * @DateTime  2020-04-05T04:21:49+0800
 */
 SparkCoreHandler.prototype.addWidgetEvent  = function(target, node) {
        node = this.getAddressData(node);
        if(!node.on)return;
        var spfn = this.specialWidgetEvent(node.type);
        

        if(node.on['click']){
            addEventListener(target,'click',node.debounce ? SparkUtil.debounce(function() {
                node.on['click'](node);
            }, 100) : function(e){
                 e.stopPropagation();
                 node.on['click'].call(node);

            },{capture:false,passive:true})
        }
        if(node.on['press']){

           addEventListener(target,SparkUtil.env.isMobile ? 'touchstart' : 'mousedown', function(e){
                 e.stopPropagation();
                 if(node.type == 'Drag' && spfn){
                    var ev = e || window.event;
                    spfn.start.call(node,ev,target)
                 }else{
                    node.on['press'].call(node);
                 }
            },{capture:true,passive:true});
           
        }
        if(node.on['move'] && node.type != 'Drag'){
         
           addEventListener(target,SparkUtil.env.isMobile ? 'touchmove' : 'mousemove', function(e){
                   e.stopPropagation();

                   node.on['move'].call(node);
              
            },{capture:true,passive:true});
           
        }
        if(node.on['up']){
           addEventListener(target,SparkUtil.env.isMobile ? 'touchend' : 'mouseup', function(e){
                 e.stopPropagation();
                 if(node.type == 'Drag' && spfn){
                    var ev = e || window.event;
                    spfn.end.call(node,ev,target)
                 }else{
                    node.on['up'].call(node);
                 }
            },{capture:true,passive:true});
          
        }
  
 }

/**
 * [createDomTree description]
 * @AuthorHTL
 * @DateTime  2020-08-21T13:50:05+0800
 * @param     {[type]}                 _rootAdress [description]
 * @param     {[type]}                 domTarget   [description]
 * @param     {[type]}                 DF          [DocumentFragment]
 * @param     {Function}               callback    [description]
 * @return    {[type]}                             [description]
 */
SparkCoreHandler.prototype.createDomTree=function(_rootAdress,domTarget,init,addtype,callback){
        var _scope = this;
        var _core = {
             // df: document.createDocumentFragment(),
            _html: null,
            _css: '',
            _eventQueue: [],//leave
            _rootAdress: _rootAdress,
            _lastAdress: null,
            _clear:function(){
                 this._eventQueue = [];
                 this._html = null;
            },
            /*render them*/
            render: function() {
                var _this = this;
                var domData=_scope.getAddressData(_this._rootAdress);
                _this.readAdress(domData);

                //初始化渲染body
                if(domData.type === 'Page' && init){

                           /*insert css*/
                          _scope.makeStyleTree(_this._css);
                          /*insert html*/
                          var NxContainer = document.createElement('div');
                          NxContainer.setAttribute('id', 'SparkApp-' + _scope.DefaultSetting.name);
                          NxContainer.innerHTML = this._html;
                          domTarget.insertBefore(NxContainer, domTarget.firstChild);
                          /*default bind event && el && init*/
                          var tempTimer= setTimeout(function(){
                              clearTimeout(tempTimer)
                              _this.initPushEvent.call(_this,true);
                              _this.renderComplete.call(_this,_this._rootAdress);
                              _this._clear();
                           });

                 
                }else{
                   //后期渲染部分节点
                
                     /*append css moveto pushcss()*/
                       _scope.makeNextStyleTree(_this._css,_this._rootAdress);
                 
                     /*append html*/

                        var tempDom = document.createElement("div");
                            tempDom.innerHTML = _this._html;
                            
                            if(addtype=='after' || addtype=='before'){
                                   var abTarget= domTarget;
                                  if(_typeof(domTarget.parentName,'String')) {
                                        domTarget = _scope.getAddressData(domTarget.parentName) 
                                  }else{
                                    console.warn('insert failed!')
                                    return;
                                  }

                                 _this.after_before(domTarget.$el,abTarget.$el,tempDom,addtype)
                             } 
                             

                             if(addtype == 'append' || addtype == 'prepend'){
                               _this.append_prepend(domTarget.$el,tempDom,addtype) 
                             }
                     
                     /*append bind event*/
                      var tempTimer= setTimeout(function(){
                         clearTimeout(tempTimer)
                         _this.initPushEvent.call(_this);//子节点事件
                         _this.renderComplete.call(_this,_this._rootAdress);
                         //如果是列表更新索引
                         if(domTarget.type==='List'){
                            _scope.updateListIndex(domTarget)
                         }
                 
                         _this._clear();
                     });      
                }
                  
            },
            /*add dom way 1 */
            append_prepend:function(el,newel,type){
                   var _this = this;
                    if(_typeof(el,'HTMLCollection')){
                                    SparkUtil.traverse(el.length,function(index,end){
                                      var tempDom = document.createElement("div");
                                          tempDom.innerHTML = _this._html;
                                        if(type == 'append'){
                                             el[index].appendChild(tempDom.firstChild);
                                            _scope.addWidgetEvent(el[index].lastChild, _this._rootAdress);
                                        }
                                        if(type == 'prepend'){
                                           el[index].insertBefore(tempDom.firstChild,el[index].firstChild);
                                           _scope.addWidgetEvent(el[index].firstChild, _this._rootAdress);
                                        }
                                  })
                      }else{
                         if(type == 'append'){
                          el.appendChild(newel.firstChild);                          
                          _scope.addWidgetEvent(el.lastChild, _this._rootAdress); 
                         }
                        if(type == 'prepend'){
                            el.insertBefore(newel.firstChild,el.firstChild);
                            _scope.addWidgetEvent(el.firstChild, _this._rootAdress);
                        }
                      }  

            },
             /*add dom way 2 */
            after_before:function(el,abTarget,newel,type){
                        var _this = this;
                        if(_typeof(el,'HTMLCollection')){
                              SparkUtil.traverse(domTarget.$el.length,function(index,end){
                          
                                   var tempDom = document.createElement("div");
                                       tempDom.innerHTML = _this._html;
                                    var parentNode = abTarget[index].parentNode;   

                                    if(type == 'after'){
                                      if(parentNode.lastChild == abTarget[index]){
                                         parentNode.appendChild(tempDom.firstChild);
                                       }else{
                                         parentNode.insertBefore(tempDom.firstChild,abTarget[index].nextElementSibling);                          
                                       }
                                       _scope.addWidgetEvent(abTarget[index].nextElementSibling, _this._rootAdress);
                                     }
                                     if(type == 'before'){
                                        parentNode.insertBefore(tempDom.firstChild,abTarget[index])                               
                                        _scope.addWidgetEvent(abTarget[index].previousElementSibling, _this._rootAdress)
                                     }

                               })
                         }else{
                                     var parentNode = abTarget.parentNode;

                                    if(type == 'after'){
                                       if(parentNode.lastChild == abTarget){
                                          parentNode.appendChild(newel.firstChild);
                                       }else{
                                          parentNode.insertBefore(newel.firstChild,abTarget.nextElementSibling);                         
                                       }
                                      _scope.addWidgetEvent(abTarget.nextElementSibling, _this._rootAdress);
                                    }  

                                     if(type == 'before'){
                                        parentNode.insertBefore(newel.firstChild,abTarget);                          
                                        _scope.addWidgetEvent(abTarget.previousElementSibling, _this._rootAdress);
                                     }
                          }
                               
            },
            /*add render complete function*/
            renderComplete:function(address){
                  var _this = this;
                  var node = _scope.getAddressData(address);
                  var nodeList = document.getElementsByClassName(address); 
                    
                  node.$el=nodeList.length>1?nodeList:nodeList[0];  
                  
                  
                  // set hide
                  if(node.show!=undefined && !node.show){
                      node.style='display:none;';
                  }
               
                  if(!init && node.parentName){
                    if(typeof node.parentName === 'object'){
                       node.parentName.push(domTarget.name)
                    }
                    if(typeof node.parentName === 'string'){
                        var tempParentName = node.parentName;
                           node.parentName = [];
                        
                            node.parentName = node.parentName.concat([tempParentName,domTarget.name])  
                             
                    } 
               
                   
                   node.parentName =  SparkUtil.unique(node.parentName)

                  }else if(!init && !node.parentName){
                      node.parentName=domTarget.name
                  }  
                  
                  //drag type
                  if(node.type==='Drag'){
                      node.position={
                                     x:node.$el.offsetLeft,
                                     y:node.$el.offsetTop,
                                     startX:0,
                                     startY:0,
                                     direction:null,
                                   }
                  }

                  //default fn
                  node.width=function(val){
                       if(val){
                          node.style='width:'+val+';'
                       }else{
                         //return parseInt(node.styleObj['width'] || node.$el.offsetWidth)
                         return node.$el.offsetWidth;
                       }
                  };
                  node.height=function(val){
                        if(val){
                          node.style='height:'+val+';'
                       }else{
                         // return parseInt(node.styleObj['height'] || node.$el.offsetHeight)
                         return node.$el.offsetHeight;
                       }
                  };
                  node.getChild = function(index){
                      if(node.child.length<=0)return;
                      return _scope.getAddressData(node.child[index]);
                  };
                  
                  /*轮播图执行*/
                  if(node.type==='Carousel'){
                     node.update();
                   }  
                  node.init && node.init();
                  if(node.child && node.child.length>0){
                     SparkUtil.traverse(node.child,function(nodeItem,index,end){
                       _this.renderComplete(nodeItem);
                     })
                   }    
            },
            /*dom tree*/
            pushHtml: function(parent, child, nowaddress) {
                var _this = this;
                _this._html = !_this._html ? (_this.RegExp(parent, child, nowaddress)) : (_this.RegExp(_this._html, child, _this._lastAdress));
            },
            /*css tree*/
            pushCss: function(_node) {
                var _this = this;
                var pointer = 'cursor:pointer;';
                var className = _typeof(_node.style,'Object')?_node.style['name']:_node.name
                  , cssStr = _typeof(_node.style,'Object')?_node.style['style']:_node.style
                  , hclassName = _typeof(_node.shover,'Object')? _node.shover['name']: _node.name
                  , hcssStr = _typeof(_node.shover,'Object')?_node.shover['style']:_node.shover;
                  /*去重处理*/
                   cssStr ='{' + (_node.on ? pointer : '') +_scope.CSS.objStyleToStr(_scope.CSS.strStyleToObj(cssStr)) + '}';
                 
                   if(hcssStr){
                     hcssStr = '{' + pointer +_scope.CSS.objStyleToStr(_scope.CSS.strStyleToObj(hcssStr)) + '}';
                   }
                  

                var c = cssStr!='{}'?(!SparkUtil.includes(_this._css, className) ? '.' + className + cssStr : ''):'';
                var h =  _node.shover && (!SparkUtil.includes(_this._css, '.' + hclassName + ':hover')) ? '.' + hclassName +':hover'+  hcssStr : '';
                
           
                  if(SparkUtil.includes(_this._css,cssStr) || SparkUtil.includes(_this._css,hcssStr)){
                    if(SparkUtil.includes(_this._css,cssStr) && !SparkUtil.includes(_this._css, className)){
                     _this._css = _scope.CSS.strStyleHandle(_this._css,cssStr,className);
                    }
                    if(SparkUtil.includes(_this._css,hcssStr)){
                    _this._css = _scope.CSS.strStyleHandle(_this._css,hcssStr,hclassName + ':hover');
                    }
                   }else{
                    _this._css +=SparkUtil.trim(c+h);
                  }

            },     
            /*default add event*/
            initPushEvent: function(noIgnoreRootAdress) {

                 var _this = this;
                    /*去重*/
                    // _this._eventQueue = new Array(...new Set(_this._eventQueue)) 
          
                    _this._eventQueue =  SparkUtil.unique(_this._eventQueue)
                      

                  SparkUtil.traverse(_this._eventQueue,function(nodeName,index,end){
                                   
                        if(_this._rootAdress !=nodeName || noIgnoreRootAdress){
                            var nodeList = document.getElementsByClassName(nodeName);
                               SparkUtil.traverse(nodeList.length,function(index,end){
                                    _scope.addWidgetEvent(nodeList[index], nodeName) 
                               })
                          }
                    })

            },
            RegExp: function(parent, child, address) {
                return parent.replace(new RegExp('\\[\\[' + address + '\\]\\]'), child);
            },
            handelQueue: function(queue) {
                var _this = this;
                queue.forEach(function(address) {
                    _this._lastAdress = address;
                    _this.readAdress(_scope.getAddressData(address))
                })
            },
            readAdress: function(_node) {
                var _this = this;
                var tempParentHtml = _node.html
                  , tempChildHtml = ''
                  , queue = []
                  , i = 0;

                if (!_node.child || _node.child.length == 0) {
                    _this.pushHtml(tempParentHtml, tempChildHtml, _node.name);

                }
                _this.pushCss(_node);

                if(_node.on && _typeof(_node.on,'Object')){
                   _this._eventQueue.push(_node.name)
                }
               

                while (_node.child&&_node.child[i]) {
                    var nw = _scope.getAddressData(_node.child[i]);
                    nw.child && queue.push(nw.name);
                    tempChildHtml += nw.html;
                    _this.pushCss(nw);

                    if(nw.on && _typeof(nw.on,'Object')){
                     _this._eventQueue.push(nw.name)
                    }

                    if (i === _node.child.length - 1) {
                        _this.pushHtml(tempParentHtml, tempChildHtml, _node.name);
                        queue.length > 0 ? _this.handelQueue(queue) : null;

                    }

                    i++;
                }

            }
        };

        try{
           _core.render();
        }catch(e){
          console.error(e)
        }
}



/**
 * [clearWidget 删除清空组件]
 * @AuthorHTL
 * @DateTime  2020-09-18T17:01:28+0800
 * @return    {[type]}                 [description]
 */
SparkCoreHandler.prototype.clearWidget = function(_Widget){
    var _scope = this;
    if(!_typeof(_Widget.$el,'HTMLCollection') || (_typeof(_Widget.$el,'HTMLCollection') && _Widget.$el.length === 0)){
         delete  this.WidgetCache[_Widget.name];
    }
    if(_Widget.child.length>0){
       SparkUtil.traverse(_Widget.child,function(item,index,end){
            _scope.clearWidget(_scope.getAddressData(item))
       })
        
    }
}

/**
 * [updateListIndex 更新列表索引]
 * @AuthorHTL
 * @DateTime  2020-09-16T00:37:43+0800
 * @return    {[type]}                 [description]
 */
SparkCoreHandler.prototype.updateListIndex = function(_ListWidget){
     
    var _scope = this;

    var _core = function(_widget,realIndex){
        SparkUtil.traverse(_widget.child,function(item,index,end){
          var _thisWidget = _scope.getAddressData(item);
           if(_thisWidget.type=='Text' && _thisWidget.listIndex){
              _thisWidget.text=realIndex;
           }
           if(_thisWidget.child.length>0){
               _core(_thisWidget,realIndex)
           }
        })
    }

    SparkUtil.traverse(_ListWidget.child,function(item,index,end){

      var _thisWidget=_scope.getAddressData(item);
           if(_thisWidget){
              _thisWidget.listIndex=index;
              _thisWidget.init && _thisWidget.init();
              _core(_thisWidget,index)
          }
    })



}
/**
 * [addDom 添加节点]
 * @AuthorHTL
 * @DateTime  2020-08-27T15:29:35+0800
 * @param     {[type]}                 target  [description]
 * @param     {[type]}                 newdoms [description]
 * @param     {[type]}                 addtype [description]
 */
SparkCoreHandler.prototype.addDom = function(target,newdoms,addtype,set){
   var _scope = this;
     // console.log('-----'+addtype+'-----')
      var abTarget = target;
       if(addtype=='after' || addtype=='before'){
            if(_typeof(target.parentName,'String')) {
                target = _scope.getAddressData(target.parentName) 
            }else{
              return target;
            }
        } 
     
       if(!target.child || !newdoms){
          return target;
        }
       var nodeArr = [];

       var tempChild=target.child.slice(0);
 
       //多个
       if(_typeof(newdoms,'Array')){
           nodeArr = nodeArr.concat(newdoms)
       }
       //单个
       if(_typeof(newdoms,'Object')){
           nodeArr.push(newdoms);
       }
       SparkUtil.traverse(nodeArr,function(item,index,end){
            
            if(!_scope.getAddressData(item.name)){
              //remove 后可以复用
              _scope.WidgetCache[item.name] = item;
            }
            var aniSet = set || item.showAni;
            if(aniSet && aniSet.ani){
               item.style = 'animation:'+aniSet.ani+';';
            }
           
            if(addtype=='append'){
                    tempChild.push(item.name)
            }
            if(addtype=='prepend'){
                    tempChild.unshift(item.name) 
            }
            if(addtype=='after'){
                   var tIndex = SparkUtil.isInArray(tempChild,{b:abTarget.name});
                   tempChild.splice(tIndex+1,0,item.name)
            }
            if(addtype=='before'){
                 var tIndex = SparkUtil.isInArray(tempChild,{b:abTarget.name});
                   tempChild.splice(tIndex,0,item.name)

            }
             

            _scope.createDomTree(item.name,(addtype=='after' || addtype=='before')?abTarget:target,false,addtype)

            if(end){
                 // SparkCoreManage.createDomTree(target.name,target.$el,false)
                 target.child =   tempChild;
            }
           // console.log(end,index,item)

       })

       nodeArr = tempChild = null;
       return target;
}

/**
 * [remove 移除节点]
 * @AuthorHTL
 * @DateTime  2020-09-16T00:38:07+0800
 * @param     {[type]}                 target [description]
 * @param     {[type]}                 deldom [description]
 * @return    {[type]}                        [description]
 */
SparkCoreHandler.prototype.remove = function(target,deldom){
   var _scope = this;
       //三种删除方式
        // console.log('-----remove-----')
        if(!target)return;
        if(!target.child || deldom=='[object Undefined]' ){
          return target;
        }
        //非目标子集

         var tempChild=target.child.slice(0),
             blongIndex = SparkUtil.isInArray(target.child,{b:deldom.name});
 
        if(_typeof(deldom,'Object') && blongIndex!=-1){
               

               SparkUtil.compareRemove(tempChild,{b:deldom.name})
               
              var delParentName =function(){
                 SparkUtil.compareRemove(deldom.parentName,{b:target.name});

                  // if(deldom.parentName.length==0){
                  //   delete deldom.parentName;
                  //   delete deldom.$el;
                  // }  
              }
              var delFn = function(targetEl){ 
                    /*List Data 处理*/
                     if(target.type==='List'){
                          target.data.splice(blongIndex,1);  
                      }
                    if(_typeof(deldom.$el,'HTMLCollection')){

                       for (var i = deldom.$el.length - 1; i >= 0; --i) {
                             if(deldom.$el[i].parentNode == targetEl){
                                targetEl.removeChild(deldom.$el[i])
                             }
                       }
                      SparkUtil.compareRemove(deldom.parentName,{b:target.name});
                
                     }else if(deldom.$el){
                         
                          targetEl.removeChild(deldom.$el);
                          
                          // delete deldom.parentName;
                          // delete deldom.$el;  
                     }

                    
                    
               } 

               if(_typeof(target.$el,'HTMLCollection')){
                    SparkUtil.traverse(target.$el.length,function(index,end){
                           delFn(target.$el[index])
                    })

                }else{
                          
                   delFn(target.$el)
                }  

             _scope.clearWidget(deldom);

             target.child = tempChild;
        }

        if(_typeof(deldom,'String')){
         
           if(deldom == 'firstChild' || deldom == 'lastChild'){
               _scope.remove(target,(deldom == 'firstChild')?0:tempChild.length-1)
           
           }else{
               console.warn('second<string>:firstChild || lastChild' )
           }
             
        }
        
        if(_typeof(deldom,'Number')){
            if(_typeof(target.$el,'HTMLCollection')){
                SparkUtil.traverse(target.$el.length,function(index,end){
                        target.$el[index].childNodes[deldom] && target.$el[index].removeChild(target.$el[index].childNodes[deldom])
                       })
            }else{
                target.$el.childNodes[deldom] && target.$el.removeChild(target.$el.childNodes[deldom])
            }

            var tempWidget =  _scope.getAddressData(tempChild[deldom]);
                _scope.clearWidget(tempWidget);
             
             // if(!_typeof(tempWidget.$el,'HTMLCollection')){
             //     delete tempWidget.parentName;
             //     delete tempWidget.$el;
             // }

            tempChild.splice(deldom,1);
            
            target.child = tempChild;


        }
    
    //如果是列表变化更新索引
      if(target.type==='List'){
       var timer = setTimeout(function(){
             clearTimeout(timer)
            _scope.updateListIndex(target)
        },100)
         
      }
     tempChild = null;

    return target;
}



/**
 * [SparkRouter 单页面路由功能]
 * @AuthorHTL
 * @DateTime  2020-03-30T23:42:32+0800
 */
SparkCoreHandler.prototype.SparkRouter = function() {
  
}

SparkCoreHandler.prototype.LoadModules = function(module){
    var _scope = this;
    console.log(_scope.module)
    var modulePath = SparkUtil.includes(module.path,'.js')?module.path:module.path+'.js';
   // SparkCoreManage.renderQueues.push({name:module.name,status:0});
   // 
    SparkUtil.getfile(modulePath,function(codeText){
          
          console.log(codeText)
        // var depends =  _scope.module[module.name].depends;
        //   if(depends && depends.length>0){

        //    SparkUtil.traverse(depends,function(item,index,end){
        //          SparkCoreManage.LoadModules.call(_scope,item)
        //     })
           
        //   }
         
    })

}

    /**
 * [Rander 所有节点渲染到页面上]
 * @AuthorHTL
 * @DateTime  2020-03-30T23:46:26+0800
 */
SparkCoreHandler.prototype.SparkRender = function(modules) {
  var _this = SparkCoreManage;
  var _scope = this;    
  var pages = [];
      if(_typeof(modules,'Object')){
         pages.push(modules);
       }
      if(_typeof(modules,'Array')){
         pages = pages.concat(modules);
       }
 
    
       SparkUtil.traverse(pages,function(item,index,end){
      
               _this.LoadModules.call(_scope,item)
       })
       
        return;
  
        if (_this.PageCache.length == 0) {
             console.warn('至少有存在一个Page页面')
        } else if (_this.PageCache.length > 1) {
              _this.SparkRouter()
        } else {
          _this.createDomTree(_this.PageCache[0],D.body,true)
        }

 }

/**
 * [urlParam url 参数缓存]
 * @type {[type]}
 */
   var UrlParamManage = new UrlParamHandler();
 
  /**
   * [SparkCoreManage 核心功能]
   * @type {SparkCoreHandler}
   */
   var SparkCoreManage = new SparkCoreHandler();




/*Spark core fn*/
function Spark(params){

         Object.assign(SparkCoreManage.DefaultSetting,params);
         Object.assign(this,SparkCoreManage.HTML);
        /*开启调试工具*/
        if(SparkCoreManage.DefaultSetting.devTool===true && _typeof(SparkCoreManage.DefaultSetting.devTool,'Boolean')){
           SparkUtil.devTool();
        }
        this.vcss = SparkCoreManage.CSSCache;
        this.vdom = SparkCoreManage.WidgetCache;
        this.vpage= SparkCoreManage.PageCache;
        this.Render = SparkCoreManage.SparkRender;
        this.module = {};
        this.moduleJs = null;
        this.env = SparkUtil.env;
        this.screen = SparkUtil.screen;
        this.urlParams={
          search: UrlParamManage.getUrlSearchParam(),
          hash: UrlParamManage.getUrlHashParam()
        };
 
}




/*通用组件追加/删除*/
/**
 * [addNext 向下添加组件]
 * @AuthorHTL
 * @DateTime  2020-08-24T13:48:18+0800
 * @param     {[type]}                 target [目标容器]
 * @param     {[type]}                 newdom [新元素 widget array || single widget]
 */
Spark.prototype.append =function(target,newdoms){


 return SparkCoreManage.addDom(target,newdoms,'append')
 
}
/*组件向上添加*/
Spark.prototype.prepend =function(target,newdoms){

  return SparkCoreManage.addDom(target,newdoms,'prepend')
  
}    
/*移除组件*/
Spark.prototype.remove =function(target,deldom){
  
  return SparkCoreManage.remove(target,deldom)
}
/*----------扩展--------------*/
/*回到顶部*/
Spark.prototype.scrollTop = function(val,time){
    var scrollTop = this.screen.scrollTop();
    time= time?time:500;
    val = val?val:0;
    val = (val === 'bottom')?this.screen.scrollHeight()-this.screen.height():val;
    val = (val === 'top')?0:val;

    if(scrollTop==val)return;     
    var up  = scrollTop>val?true:false;
    var speed = parseInt(((Math.abs(scrollTop-val))/time)*100)+1;
    var TempSpeed =speed;
    var Timer = null;
    var stime = 0;
    var run = function(){
       Timer = setTimeout(function(){
              
                up?scrollTop-=speed:scrollTop+=speed;
             
                stime = 20;
                speed = parseInt(speed>parseInt(TempSpeed*0.2)?speed-speed/4:speed)+1;
              
               if(up){
                 if(scrollTop>val){
                   run()
                 };
                 if(scrollTop<=val){
                   clearTimeout(Timer);
                   scrollTop = val;
                 }
                }else{

                   if(val>scrollTop){
                    run()
                   };
                  if(scrollTop>=val){
                    clearTimeout(Timer);
                     scrollTop = val;
                  }
                  
               }
               document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
                
          },stime)
     }
    run(); 
}



return Spark;
}));

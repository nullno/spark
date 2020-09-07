/*
  -----------------更方便创建具有基本样式和功能的视图组件---------------
 视图组件解析（组件转dom处理，样式处理）->适配处理

                                      NnWidget
                                          |
          Event-----------Data-----------Dom-----------Style---------Adapter
           |               |              |              |
           |------>      dataBind     domHandler      cssHandler

style:默认风格样式属性+自定义属性
dom:html标签重新归类，baseWidget
                        |
    文字，图片，视频，音频，容器，拖动容器，画布，文字按钮，文字图标，列表，
    横向排列，纵向排列,局部滚动容器，弹窗，swiper(需要引入swiper)
     
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
  function _typeof(d){
     return  _OP.toString.call(d);
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
                }
                ;
            } else {
                //Others
                script.onload = function() {
                    callback();
                }
                ;
            }
            script.src = jsurl;
            document.body.appendChild(script)
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
          if(_typeof(datas) === '[object Array]'  && compare ){
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
            //普通遍历
            if(_typeof(datas) === '[object Array]'){
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
            if(_typeof(datas) === '[object Object]'){
              
            }
            if(_typeof(datas) === '[object Number]'){
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
                 // for(var i=0;i<datas;i++){
                 //     callback(i,i==datas.length-1)
                 // }
              
            }

        },
        /*数组中是否存在元素,并返回索引*/
        isInArray:function(arr,compare){
                    for(var i=0;i<arr.length;i++){
                      if(((compare['a']?arr[i][compare['a']]:arr[i])==compare['b'])){
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
          data:function(oval, nval, obj){
                if (JSON.stringify(oval)  === JSON.stringify(nval)){
                         return nval;
                }
               var pushStop=true,el=obj.$el;
                obj['data'] = arrProxy(obj['data'],function(method,newarr){
                               console.log(method)
                                  switch(method){
                                    case 'push':
                                     // console.log(obj)
                                     pushStop && obj.addNext(obj.item(newarr))
                                    break;
                                    case 'concat':
                                    // console.log(newarr)
                                    var tempChild=[];
                                         SparkUtil.traverse(newarr,function(newItem,index,end){
                                             pushStop=false;
                                             obj['data'].push(newItem);
                                             tempChild.push(obj.item(newItem));
                                             if(end){
                                               pushStop=true;
                                             }
                                         })
                                     obj.addNext(tempChild)  
                                    break;
                                     case 'splice':
                                     // console.log('splice:'+newarr)

                                     break;
                                  }
                            });

                 if(el){
                      //移除旧节点
                    while(el.hasChildNodes()) {
                          el.removeChild(el.firstChild);
                     }
                    obj.child.splice(0,oval.length)
                     
                    obj['data'].splice(0,oval.length)
               
                    obj['data'].concat(nval)
                 }

               return nval;
              
          },
          style: function(oval, nval, obj) {
              var tempOld = oval;
              if (typeof nval === 'string') {
                  nval = SparkUtil.trim(nval);
                  var tempNewVal = nval;
                  var newStyleObj={};
                  if (oval == nval)
                      return nval;
                  try {
                     

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
             /* for (var i = 0; i < nodeList.length; i++) {
                  nodeList[i].innerText = nval;
              }*/
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
            getAddress: function(widgets,pname) {
                 if(!widgets)return [];
                var addressArr = [];
                SparkUtil.traverse(widgets,function(widgetItem,index,end){
                   widgetItem['parentName']=pname;
                   addressArr.push(widgetItem['name'])
                })
                // for (var i=0;i<widgets.length;i++) {
                //     widgets[i]['parentName']=pname;
                //     addressArr.push(widgets[i]['name'])
                // }
                return addressArr;
            },
            getClassName: function(param) {
                var names = '';
                /*names += (param && typeof param.style === 'string') ? ' ' + param.style['name'] : '';
                  names += (param && typeof param.shover === 'object') ? ' ' + param.shover['name'] : '';
                  names += (param && param.className ) ? ' ' + param.className : '';
                */
                names += (param && typeof param.className === 'object') ? param.className['name']+' ':
                         (param && typeof param.className === 'string') ? param.className+' ': '';
                return names;
            },
            getNxWidget:function(nxtype,newparams,domtag,defaultcss,defineProperty,defaultwatch){
               var p = newparams; 
            
                 !p && (p = {});
                var obj = {style:'',className:'',type:nxtype}
                  , address = _scope.CreateWidgetName(nxtype)
                  , className = _core.getClassName(p)+address
                  , idName = p.idName?'id='+p.idName:'';
                var tempStyleStr = '';
                    if(typeof p.className=='object'){
                      tempStyleStr += p.className.style;
                    }
                    tempStyleStr+=defaultcss+(p.style?p.style:'');
                var tempChild=[]; 
                if(nxtype=='List'){
                   var tempDataArr=p.data;
                     /*jsonstr*/
                        if(_typeof(p.data) === '[object String]'){
                              try{
                                 tempDataArr = JSON.parse(p.data)
                              }
                              catch(err){
                                tempDataArr=[];
                                console.error('data 中 JSON 格式出错')
                              }
                            }
                       if(_typeof(tempDataArr) === '[object Array]' && tempDataArr.length>0 && typeof p.item === 'function'){
                                  
                                    SparkUtil.traverse(tempDataArr,function(tempDataItem,index,end){
                                       tempChild.push(p.item(tempDataItem));
                                    })
                                  /*for(var i=0;i<tempDataArr.length;i++){
                                     
                                      tempChild.push(p.item(tempDataArr[i]));
                                    
                                  }*/
                        }
                }
                      
                        
                Object.assign(obj, p);  
                obj.name = address;
                obj.tag =  p.tag || domtag;
                obj.html = nxtype=='Image'?
                            '<img '+idName+' class="' + className + '" src="'+p.imgurl+'" />'
                            : '<'+obj.tag+' '+idName+' class="' + className + '">'+(nxtype=='Text'?p.text+'[[' + address + ']]':'[[' + address + ']]')+'</'+obj.tag+'>';
                obj.styleObj = _scope.CSS.strStyleToObj(tempStyleStr);
                obj.style = _scope.CSS.objStyleToStr(obj.styleObj);

                // console.log(p.child)
                
                obj.child = _core.getAddress(nxtype=='List'?tempChild:p.child,obj.name);
               

                _scope.WidgetCache[address] = obj;
               if(nxtype!='Image'){
                  /*新增*/
                  _scope.WidgetCache[address].append =function(newdoms){
                     
                            return SparkCoreManage.addDom(this,newdoms,'append')

                  }
                  _scope.WidgetCache[address].prepend =function(newdoms){
                            return SparkCoreManage.addDom(this,newdoms,'prepend')
                  }
                  _scope.WidgetCache[address].removeChild= function(deldom){

                           return SparkCoreManage.remove(this,deldom)
                   }
                }
                /*删除*/
                 _scope.WidgetCache[address].remove =function(){
                          var tempWidget = this;
                               
                            if(_typeof(tempWidget.parentName)==='[object Array]'){
                                 var parentNames = tempWidget.parentName.slice(0);
                                 SparkUtil.traverse(parentNames,function(item,index){
                                    SparkCoreManage.remove(_scope.WidgetCache[item],tempWidget)
                                 })
                               
                            }
                            if(_typeof(tempWidget.parentName)==='[object String]') {
                               SparkCoreManage.remove(_scope.WidgetCache[tempWidget.parentName],tempWidget)
                            }
                
                     // return SparkCoreManage.remove(target,deldom)
                }
                /*数据变化监听*/
                defineProperty && _core.defineProperty(address, defineProperty);
              
                if(nxtype=='Page'){
                   _scope.PageCache.push(address);
                   /*开始渲染*/
                   console.time("Render");
                   SparkRender();
                   console.timeEnd("Render");
                }

              return _scope.WidgetCache[address]

            },
            defineProperty: function(address, arr) {
                _scope.WidgetDefineProperty(address.indexOf('Css') != -1 ? _scope.CSSCache[address] : _scope.WidgetCache[address], arr);
            },
            defaultParams: {
            }
        }

        return {
            Css: function(p) {
                !p && (p = '');
                var obj = {type:'Css'}
                  , address = _scope.CreateWidgetName('Css');

                obj.name = address;
                obj.styleObj = _scope.CSS.strStyleToObj(p);
                obj.style = _scope.CSS.objStyleToStr(obj.styleObj);

                _scope.CSSCache[address] = obj;
                _core.defineProperty(address, ['style']);
                return _scope.CSSCache[address]
            },
            Page: function(p) {
  
              return _core.getNxWidget('Page',
                                    p,
                                    'div',
                                    'position:relative;',
                                    ['style'],
                                    false 
                                    );
            },
            Text: function(str, p) {

                !p && (p = {});
                 p.text=str;

                 return _core.getNxWidget('Text',
                                    p,
                                    'span',
                                    '',
                                    ['text','style','className'],
                                    true 
                                    );
            },
            Image: function(src,p) {
                 !p && (p = {});
                  p.imgurl=src;
                  return _core.getNxWidget('Image',
                                    p,
                                    '',
                                    'border:0;',
                                    null,
                                    false 
                                    );
            },
            Box: function(p) {
               

                return _core.getNxWidget('Box',
                                    p,
                                    'div',
                                    'background-color:#3D3F3F;',
                                    ['style', 'child'],
                                    false 
                                    );
            },
            Stack:function(p) {
               

                return _core.getNxWidget('Stack',
                                    p,
                                    'div',
                                    'position:relative;background-color:#3D3F3F;',
                                    ['style', 'child'],
                                    false 
                                    );
            },
            List:function(p){
               return _core.getNxWidget('List',
                                    p,
                                    'ul',
                                    '',
                                    ['style','data'],
                                    false 
                                    );
            },
            Drag: function(p) {
                return _core.getNxWidget('Drag',
                                    p,
                                    'div',
                                    '',
                                    null,
                                    false 
                                    );
            },
            Position:function(p) {
              return _core.getNxWidget('Position',
                                    p,
                                    'div',
                                    'position:absolute;background-color:#3D3F3F;',
                                    null,
                                    false,
                                    ['style', 'child'] 
                                    );
            },
            // moreWiget...
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
                    D.head.removeChild(delTarget)
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
                         // var cssValue = this.autoprefixerConfig.value[value];
                         // var cssValue = '',cssValueKey='';
                         // for(var key in this.autoprefixerConfig.value){
                         //  if(SparkUtil.includes(value,key)){
                         //    cssValueKey = key;
                         //    cssValue = this.autoprefixerConfig.value[key];
                         //  }
                         // }

            
                         
                         // if(cssValue){
                         //    SparkUtil.traverse(cssValue,function(cssValueItem,index,end){
                         //      tempObj[param] = cssValueItem;
                         //       // tempObj[param] = value.replace(new RegExp(cssValueKey,'ig'),cssValueItem);
                         //    })
                         //  }

                         // str.replace(new RegExp('transition','ig'),'-webkit-transition');
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
                  if(_typeof(obj) != '[object Object]' || t == "{}"){
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

   return this.DefaultSetting.resetCss || 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;box-sizing:border-box;font-size:100%;vertical-align:baseline;background:transparent;}body{line-height:1;}ol,ul{list-style:none;}blockquote,q{quotes:none;}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none;}:focus{outline:0;}ins{text-decoration:none;}del{text-decoration:line-through;}table{border-collapse:collapse;border-spacing:0;}*{-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{width:5px;background-color:rgba(0,0,0,0);-webkit-border-radius:2em;-moz-border-radius:2em;border-radius:2em}::-webkit-scrollbar-thumb{background-color:rgba(61,63,63,.5);background-clip:padding-box;min-height:20px;-webkit-border-radius:2em;-moz-border-radius:2em;border-radius:2em}::-webkit-scrollbar-thumb:hover{background-color:rgba(61,63,63,1)}'+grayStr;
  
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
 * [addEvent 注册组件事件]
 * @AuthorHTL
 * @DateTime  2020-04-05T04:21:49+0800
 */
 SparkCoreHandler.prototype.addWidgetEvent  = function(target, node) {
        node = this.getAddressData(node);
        if(!node.on){
          return;
        }
        if (node.on['click']) {
            addEventListener(target,'click',node.debounce ? SparkUtil.debounce(function() {
                node.on['click'](node);
            }, 100) : function(e){
                 e.stopPropagation();
                 node.on['click'](node);

            },{capture:false,passive:true})
        }
        if (node.on['down']) {

           addEventListener(target,SparkUtil.env.isMobile ? 'touchstart' : 'mousedown', function(e){
                 e.stopPropagation();
                 node.on['press'](node);
            },{capture:true,passive:true});
           
        }
        if (node.on['up']) {
           addEventListener(target,SparkUtil.env.isMobile ? 'touchend' : 'mouseup', function(e){
                 e.stopPropagation();
                 
                 node.on['up'](node);
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
            df: document.createDocumentFragment(),
            _html: null,
            _css: '',
            _eventQueue: [],//leave
            _rootAdress: _rootAdress,
            _lastAdress: null,
            /*render them*/
            render: function() {
                var _this = this;
                var domData=_scope.getAddressData(_this._rootAdress);
                _this.readAdress(domData);

                //初始化渲染body
                if(init){
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
                      _this.initPushEvent.call(_this);
                      _this.renderComplete.call(_this,_this._rootAdress);
              
                   });
                 
                }else{
                   //后期渲染部分节点
                   
                     /*append css moveto pushcss()*/
                       _scope.makeNextStyleTree(_this._css,_this._rootAdress);
                 
                     /*append html*/

                        var tempDom = document.createElement("div");
                            tempDom.innerHTML = _this._html;
                            
                       // console.log( _this.df)
                     
                             if(addtype == 'append'){
                               if(_typeof(domTarget.$el)==='[object HTMLCollection]'){
                                    SparkUtil.traverse(domTarget.$el.length,function(index,end){
                                     
                                      var tempDom = document.createElement("div");
                                          tempDom.innerHTML = _this._html;
                                      domTarget.$el[index].appendChild(tempDom.firstChild)
                                      _scope.addWidgetEvent(domTarget.$el[index].lastChild, _this._rootAdress)
                                  })
                               }else{
                                 domTarget.$el.appendChild(tempDom.firstChild)                          
                                 _scope.addWidgetEvent(domTarget.$el.lastChild, _this._rootAdress) 
                               }  
                             }
                             if(addtype == 'prepend'){
                                  if(_typeof(domTarget.$el)==='[object HTMLCollection]'){
                                     SparkUtil.traverse(domTarget.$el.length,function(index,end){
                                       var tempDom = document.createElement("div");
                                          tempDom.innerHTML = _this._html;
                                      domTarget.$el[index].insertBefore(tempDom.firstChild,domTarget.$el[index].firstChild)
                                      _scope.addWidgetEvent(domTarget.$el[index].firstChild, _this._rootAdress)
                                  })
                                  }else{
                                  domTarget.$el.insertBefore(tempDom.firstChild,domTarget.$el.firstChild)
                                  _scope.addWidgetEvent(domTarget.$el.firstChild, _this._rootAdress)
                                } 
                             }
                          
                     /*append bind event*/
                      var tempTimer= setTimeout(function(){
                         clearTimeout(tempTimer)
                         _this.initPushEvent.call(_this,true);
                         _this.renderComplete.call(_this,_this._rootAdress);
                         
                     });  
                      /*  var tempDomTarget = domTarget;
                    
                        typeof tempDomTarget ==='string' && (tempDomTarget = document.getElementsByClassName(tempDomTarget));
                            
                        var tempDom = document.createElement("div");
                            tempDom.innerHTML = _this._html;
                          
                        var nodeArr = tempDom.childNodes;
           
                         _this.tempPushEvent(domData,nodeArr[0]);
                             

                         DF.appendChild(nodeArr[0]);

                        // tempDom.innerHTML = this._html;   


                         // callback(_this,tempDomTarget);  
                         var t =  setTimeout(function(){
                            _this.renderComplete.call(_this,_this._rootAdress);
                            clearTimeout(t)
                          })*/

                      /*append bind event*/
                        
                }
               
                  
                
            },
            /*add render complete function*/
            renderComplete:function(address){
                  var _this = this;
                  var node = _scope.getAddressData(address);
                  var nodeList = document.getElementsByClassName(address); 
                    
                  node.$el=nodeList.length>1?nodeList:nodeList[0];  
                  node.init && node.init();
                
                  // (!init && !node.parentName) && (node.parentName=domTarget.name);
                  
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

                  if(node.child && node.child.length>0){
                     SparkUtil.traverse(node.child,function(nodeItem,index,end){
                       _this.renderComplete(nodeItem);
                     })
                      // for(var i=0;i<node.child.length;i++){
                      //    _this.renderComplete(node.child[i]);
                      // }
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
                var className = (typeof _node.style === 'object')?_node.style['name']:_node.name
                  , cssStr = (typeof _node.style === 'object')?_node.style['style']:_node.style
                  , hclassName = (typeof _node.shover === 'object')? _node.shover['name']: _node.name
                  , hcssStr = (typeof _node.shover === 'object')?_node.shover['style']:_node.shover;
                  /*去重处理*/
                   cssStr ='{' + (_node.on ? pointer : '') +_scope.CSS.objStyleToStr(_scope.CSS.strStyleToObj(cssStr)) + '}';
                   hcssStr = '{' + pointer +_scope.CSS.objStyleToStr(_scope.CSS.strStyleToObj(hcssStr)) + '}';
                 
                var c =  !SparkUtil.includes(_this._css, className) ? '.' + className + cssStr : '';
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
           
             /*append bind event*/
            newPushEvent:function (_node,target){
                           var _this = this;
                            _scope.addWidgetEvent(target, _node.name); 
                            if(_node.child){
                                 SparkUtil.traverse(_node.child,function(nodeItem,index,end){
                                   this.tempPushEvent(_scope.getAddressData(nodeItem),target.childNodes[index])
                                 })
                             /* for(var i=0;i<_node.child.length;i++){
                                this.tempPushEvent(_scope.getAddressData(_node.child[i]),target.childNodes[i])
                              }*/
                            }
                                  
                         },
            /*default add event*/
            initPushEvent: function(ignoreRootAdress) {

                 var _this = this;
                    /*去重*/
                    // _this._eventQueue = new Array(...new Set(_this._eventQueue)) 
          
                    _this._eventQueue =  SparkUtil.unique(_this._eventQueue)
                          // console.log(_this._eventQueue)
                         SparkUtil.traverse(_this._eventQueue,function(nodeName,index,end){
                                   
                                    if(!ignoreRootAdress && _this._rootAdress !=nodeName ){

                                        var nodeList = document.getElementsByClassName(nodeName);
                                       
                                           SparkUtil.traverse(nodeList.length,function(index,end){
                                                _scope.addWidgetEvent(nodeList[index], nodeName) 
                                           })
                                      }     
                                        //  if(init){}else{
                                        //    if(addtype == 'append'){
                                        //     console.log(nodeList.length)
                                        //      _scope.addWidgetEvent(nodeList[nodeList.length-1], nodeName) 
                                        //    }
                                        //    if(addtype == 'prepend'){
                                        //      _scope.addWidgetEvent(nodeList[0], nodeName) 
                                        //    }
                                        // }
                                   
                                      // (function(nodeName) {  })(eventItem)
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
                if(_node.on && (typeof _node.on === 'object')){
                   _this._eventQueue.push(_node.name)
                }
               

                while (_node.child&&_node.child[i]) {
                    var nw = _scope.getAddressData(_node.child[i]);
                    nw.child && queue.push(nw.name);
                    tempChildHtml += nw.html;
                    _this.pushCss(nw);

                    if(nw.on && (typeof nw.on === 'object')){
                     _this._eventQueue.push(nw.name)
                    }

                    if (i === _node.child.length - 1) {
                        _this.pushHtml(tempParentHtml, tempChildHtml, _node.name);
                        // _this._html =!_this._html?(_this.RegExp(tempParentHtml,tempChildHtml,_node.name))
                        //           :(_this.RegExp(_this._html,tempChildHtml,_this.lastNodeName));
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
 * [addDom description]
 * @AuthorHTL
 * @DateTime  2020-08-27T15:29:35+0800
 * @param     {[type]}                 target  [description]
 * @param     {[type]}                 newdoms [description]
 * @param     {[type]}                 addtype [description]
 */
SparkCoreHandler.prototype.addDom = function(target,newdoms,addtype){

     // console.log('-----'+addtype+'-----')
       if(!target.child || !newdoms){
          return target;
        }
       var nodeArr = [];
       var tempChild=target.child.slice(0);
 
       //多个
       if(_typeof(newdoms)==='[object Array]'){
           nodeArr = nodeArr.concat(newdoms)
       }
       //单个
       if(_typeof(newdoms)==='[object Object]'){
           nodeArr.push(newdoms);
       }

       SparkUtil.traverse(nodeArr,function(item,index,end){

      
            if(addtype=='append'){
                    tempChild.push(item.name)
            }
            if(addtype=='prepend'){
                    tempChild.unshift(item.name) 
            }

            SparkCoreManage.createDomTree(item.name,target,false,addtype)

            if(end){
                 // SparkCoreManage.createDomTree(target.name,target.$el,false)
              target.child =   tempChild;
            }
           // console.log(end,index,item)

       })


       return target;
}

SparkCoreHandler.prototype.remove = function(target,deldom){
   
       //三种删除方式
        // console.log('-----remove-----')
        if(!target.child || deldom=='[object Undefined]' ){
          return target;
        }
        //非目标子集
      
   
         var tempChild=target.child.slice(0);
 
        if(_typeof(deldom)==='[object Object]' && SparkUtil.isInArray(target.child,{b:deldom.name})!=-1){
                
               SparkUtil.compareRemove(tempChild,{b:deldom.name})
               
              var delParentName =function(){
                 SparkUtil.compareRemove(deldom.parentName,{b:target.name});
                  if(deldom.parentName.length==0){
                    delete deldom.parentName;
                    delete deldom.$el;
                  }  
              }
              var delFn = function(targetEl){ 
                    if(_typeof(deldom.$el)==='[object HTMLCollection]'){
          
                       for (var i = deldom.$el.length - 1; i >= 0; --i) {

                             if(deldom.$el[i].parentNode == targetEl){
                                targetEl.removeChild(deldom.$el[i])
                             }
                       }
                        delParentName();
                
                     }else if(deldom.$el){
                          
                          targetEl.removeChild(deldom.$el);
                          delete deldom.parentName;
                          delete deldom.$el;
                     }
                    
               } 

               if(_typeof(target.$el)==='[object HTMLCollection]'){
                    SparkUtil.traverse(target.$el.length,function(index,end){
                             delFn(target.$el[index])
                    })

                }else{
                   delFn(target.$el)
                }  
             target.child = tempChild;
        }

        if(_typeof(deldom)==='[object String]'){
         
           if(deldom == 'firstChild' || deldom == 'lastChild'){
               if(_typeof(target.$el)==='[object HTMLCollection]'){
                    SparkUtil.traverse(target.$el.length,function(index,end){
                    
                           target.$el[index].removeChild(target.$el[index][deldom])
                    })
               }else{
                 target.$el.removeChild(target.$el[deldom]);
               }
               target.child = tempChild.splice(deldom == 'firstChild'?0:tempChild.length-1,1)   
           }else{
                   console.warn('second<string>:firstChild || lastChild' )
           }
             
        }
        
        if(_typeof(deldom)==='[object Number]'){
            if(_typeof(target.$el)==='[object HTMLCollection]'){
                SparkUtil.traverse(target.$el.length,function(index,end){
                        target.$el[index].childNodes[deldom] && target.$el[index].removeChild(target.$el[index].childNodes[deldom])
                       })
            }else{
                target.$el.childNodes[deldom] && target.$el.removeChild(target.$el.childNodes[deldom])
            }
            target.child = tempChild.splice(deldom,1)
        }

    return target;
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





    /**
 * [SparkRouter 单页面路由功能]
 * @AuthorHTL
 * @DateTime  2020-03-30T23:42:32+0800
 */
    function SparkRouter() {
    }



    /**
 * [Rander 所有节点渲染到页面上]
 * @AuthorHTL
 * @DateTime  2020-03-30T23:46:26+0800
 */
   function SparkRender() {
        if (SparkCoreManage.PageCache.length == 0) {
             console.warn('至少有存在一个Page页面')
        } else if (SparkCoreManage.PageCache.length > 1) {
              SparkRouter()
        } else {
          SparkCoreManage.createDomTree(SparkCoreManage.PageCache[0],D.body,true)
        }
    }



/*Spark core fn*/
function Spark(params){

         Object.assign(SparkCoreManage.DefaultSetting,params);
         Object.assign(this,SparkCoreManage.HTML);
        /*开启调试工具*/
        if(SparkCoreManage.DefaultSetting.devTool===true && typeof SparkCoreManage.DefaultSetting.devTool === 'boolean'){
           SparkUtil.devTool();
        }
        this.vcss = SparkCoreManage.CSSCache;
        this.vdom = SparkCoreManage.WidgetCache;
        this.vpage= SparkCoreManage.PageCache;

        this.urlParams={
          search: UrlParamManage.getUrlSearchParam(),
          hash: UrlParamManage.getUrlHashParam()
        };

        this.env=SparkUtil.env;
       
 
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












   






    /**
 * [SparkCore description]
 * @AuthorHTL
 * @DateTime  2020-03-30T00:38:47+0800
 * @param     {[type]}                 params [description]
 */
  // function SparkCore(params) {
 
  //       Object.assign(DefaultSetting,params);
  //       /*开启调试工具*/
  //       if(DefaultSetting.devTool===true && typeof DefaultSetting.devTool === 'boolean'){
  //          SparkUtil.devTool();
  //       }
  //       // this.widget = HTML.parseWidget;
  //       this.vcss = _scope.CSSCache;
  //       this.vdom = _scope.WidgetCache;

       
  //       this.env=SparkUtil.env;
  //       Object.assign(this,HTML.parseWidget);
  //   }
    
    // SparkCore.prototype.render = SparkRender;

    return Spark;
}));

/*
 WidgetParse 组件解析
 */
import { _typeof,D } from './Common.js'

import SparkUtil from './SparkUtil.js' 

import Cache from './Cache.js'

import CreateWidgetName from './CreateWidgetName.js'

import GetAddressData from './GetAddressData.js'

import CSSManager from './CSSManager.js'

import WidgetOperate from './WidgetOperate.js'

import WidgetObserved from './WidgetObserved.js'

import Router from './Router.js'

const WidgetParse = {
            WidgetDefineProperty:function(obj, propertys) {
               
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
                                    tempVal = lastV[a] = WidgetObserved[a]([lastV[a]][0], newval, obj);
                                }
                            })
                            obj[a] = lastV[a];
                        })(propertyItem)
                   })
                
           },
            getAddress: function(widgets,parentName) {
                 if(!widgets)return [];
                var addressArr = [];
                SparkUtil.traverse(widgets,function(widgetItem,index,end){
             
                   widgetItem['parentName']=parentName;
                   widgetItem['$record']={
                     parentName:parentName,
                     blongIndex:index,
                     prevName:widgets[index-1]?widgets[index-1].name:null,
                     nextName:widgets[index+1]?widgets[index+1].name:null
                   };
                    if(widgetItem.vif){
                      addressArr.push(widgetItem['name']);
                     }
                
                })
                return addressArr;
            },
            getClassName: function(param) {
                var names = '';
                    names += (param && typeof param.className === 'object') ? param.className['name']+' ':
                             (param && typeof param.className === 'string') ? param.className+'':'';
                    names += (param && typeof param.shover === 'object') ? param.shover['name']+' ':'';         
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
                                      var delTarget=GetAddressData(item);
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
                                
                                  SparkUtil.traverse(newdatas,function(item,index,end){
                                     var _widget = _this.item(item,'');
                                     noani?(delete _widget.showAni,_widget.style='animation:none;'):'';
                                     tempWidget.push(_widget);
                                  })
                                  this.data.splice.apply(this.data,[index, 0].concat(newdatas));
                                  
                                  GetAddressData(this.child[index]).before(tempWidget);
                             }
                            
                            tempWidget = newdatas = null;

                            return this;
                     },
                     update:function(index,newdata){
                        if(_typeof(newdata,'Undefined') || _typeof(newdata,'Null') || index>this.data.length-1 || index<0){
                                  console.warn('not found data');return;
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
                            return WidgetOperate.addDom(this,newdoms,'append',set)
                    },
                    prepend:function(newdoms,set){

                            return WidgetOperate.addDom(this,newdoms,'prepend',set)
                    },
                    removeChild:function(deldom,set){
                                 var _this = this,
                                     tempWidget =null;
                               
                                if (_typeof(deldom,'Object')){
                                    tempWidget = deldom;
                                }
                                if (_typeof(deldom,'Number') || _typeof(deldom,'String')){
                                    var index = (deldom=='firstChild')?0:((deldom=='lastChild')?(this.child.length-1):deldom);
                                    tempWidget = GetAddressData(this.child[index]);
                                }
                                 if(!tempWidget)return this;
                                   var aniSet = set ||  tempWidget.hideAni;
                                   if(aniSet  && aniSet.ani){
                                     tempWidget.style='animation:'+aniSet.ani+';';
                                     var removeTimer=setTimeout(function(){
                                                    clearTimeout(removeTimer);
                                                    WidgetOperate.remove(_this,deldom);
                                                    tempWidget.style='animation:none;';
                                                    tempWidget = null;
                                        },aniSet.time)
                                   }else{
                                      WidgetOperate.remove(this,deldom)
                                   }
                           
                         return this;
                       },
                       after:function(newdoms,set){

                            return WidgetOperate.addDom(this,newdoms,'after',set)
                       },
                       before:function(newdoms,set){
                            return WidgetOperate.addDom(this,newdoms,'before',set)    
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
                                       WidgetOperate.remove(GetAddressData(item),tempWidget);
                                       tempWidget.style='animation:none;';
                                     },aniSet.time)
                                  }else{

                                     WidgetOperate.remove(GetAddressData(item),tempWidget)
                                  }
                                 })
                               
                            }
                            if(_typeof(tempWidget.parentName,'String') && !SparkUtil.includes(tempWidget.parentName,'spark-')) {

                               if(aniSet && aniSet.ani && !noani){
                                    tempWidget.style='animation:'+aniSet.ani+';';
                                    var removeTimer=setTimeout(function(){
                                              clearTimeout(removeTimer);
                                              WidgetOperate.remove(GetAddressData(tempWidget.parentName),tempWidget);
                                              tempWidget.style='animation:none;';
                                       },aniSet.time)
                                }else{
                                         WidgetOperate.remove(GetAddressData(tempWidget.parentName),tempWidget)
                                }
                            }
                              
                            if(tempWidget.parentName && tempWidget.$el && SparkUtil.includes(tempWidget.parentName,'spark-')){
                                    
                                    if(D.getElementsByClassName(tempWidget.name).length>=1){
                                       D.getElementById(tempWidget.parentName).removeChild(tempWidget.$el);
                                       WidgetOperate.clearWidget(tempWidget);
                                    }
                                  

                            } 
                
                      // return this;
                    },
                    empty:function(){
                             SparkUtil.traverse(this.child,function(item,index){
                              var w = GetAddressData(item); 
                                  w && w.remove('',true);
                             })
                            
                    }   

                   };

                   return DomEvent[type];
            },
            getKeyValue:function(type){
                 var keyFn={
                      html:function(){
                          var idName = this.idName?'id='+this.idName:'';
                          var className = WidgetParse.getClassName(this)+this.name;
                          var attributes = this.attributes || '';
                          
                          var content = (this.text || this.value)?(this.text || this.value)+'[['+this.name+']]':'[['+this.name+']]';

                          return  this.type=='Image'?
                            '<img '+idName+' class="'+className+'" src="'+this.imgurl+'" '+attributes+'/>'
                            : '<'+this.tag+' '+idName+' class="'+className+'" '+attributes+'>'+content+'</'+this.tag+'>';
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

                                  // if(this.show!=undefined && !this.show){
                                  //     tempStyleStr+='display:none;';
                                  // }
                                
                                
                             delete this.defaultcss;
                             return  tempStyleStr;

                      },
                      child:function(){
                        
                           var _tempChild=[]; //过滤一下子集组件
                           var _this = this;
                            if(this.type=='List'){
                               var tempDataArr=this.data;
                                   if(_typeof(this.data,'Number')){
                                      tempDataArr = [];
                                       SparkUtil.traverse(this.data,function(index,end){
                                           tempDataArr.push(index)
                                       })
                                       this.data = tempDataArr
                                   }
                                    /*jsonstr*/
                                    if(_typeof(this.data,'String')){
                                          try{tempDataArr = JSON.parse(this.data);}
                                          catch(err){
                                            tempDataArr=[];
                                            console.error('JSON error')
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


                          return WidgetParse.getAddress(_tempChild,this.name);
                      }
                 }

                 return keyFn[type].call(this);
            },
            setDefineProperty: function(address, arr) {

                WidgetParse.WidgetDefineProperty(address.indexOf('Css') != -1 ? Cache.CSSCache[address] : GetAddressData(address), arr);
            
            },
            getNxWidget:function(nxtype,newparams,domtag,defaultcss,defineProperty){
                var p = !newparams?{}:newparams;
                var NEW_WIDGET = {
                                 name:CreateWidgetName(nxtype),
                                 show:true,//显示或隐藏
                                 vif:true,
                                 keepalive:true,
                                 style:'',
                                 className:'',
                                 type:nxtype,//
                                 defaultcss:defaultcss,
                                 tag:p.tag || domtag,
                                 rendered:false
                                };
                
                if(p.stopProp){
                     if(p.on && !p.on.click){
                       Object.assign(p.on,{click:function(){}})
                     }
                     if(!p.on){
                       p.on={click:function(){}};
                     }
                }


               /*pulic type handler*/
                  
      
                Object.assign(NEW_WIDGET, p); 

             
                
                NEW_WIDGET.styleObj = CSSManager.cssParse.strStyleToObj(WidgetParse.getKeyValue.call(NEW_WIDGET,'style'));

                NEW_WIDGET.style = CSSManager.cssParse.objStyleToStr(NEW_WIDGET.styleObj);

                NEW_WIDGET.html = WidgetParse.getKeyValue.call(NEW_WIDGET,'html');

                NEW_WIDGET.child =  WidgetParse.getKeyValue.call(NEW_WIDGET,'child');

               if(NEW_WIDGET.type === 'List'){
                  NEW_WIDGET.clear = WidgetParse.getDomEvent.call(NEW_WIDGET,'clear');
                  NEW_WIDGET.delete = WidgetParse.getDomEvent.call(NEW_WIDGET,'delete');
                  NEW_WIDGET.insertFirst = WidgetParse.getDomEvent.call(NEW_WIDGET,'insertFirst');
                  NEW_WIDGET.insertLast = WidgetParse.getDomEvent.call(NEW_WIDGET,'insertLast');
                  NEW_WIDGET.insert = WidgetParse.getDomEvent.call(NEW_WIDGET,'insert');
                  NEW_WIDGET.update = WidgetParse.getDomEvent.call(NEW_WIDGET,'update');
               }

               /*添加子集元素*/
               if(NEW_WIDGET.type != 'Image' ||  NEW_WIDGET.type != 'Input'){
                   NEW_WIDGET.append = WidgetParse.getDomEvent.call(NEW_WIDGET,'append');
                   NEW_WIDGET.prepend = WidgetParse.getDomEvent.call(NEW_WIDGET,'prepend');
                   NEW_WIDGET.removeChild = WidgetParse.getDomEvent.call(NEW_WIDGET,'removeChild');
                    /*清空元素*/ 
                   NEW_WIDGET.empty = WidgetParse.getDomEvent.call(NEW_WIDGET,'empty');
                }

                 /*指定元素插入*/
                 if(NEW_WIDGET.type != 'Page'){
                  NEW_WIDGET.after = WidgetParse.getDomEvent.call(NEW_WIDGET,'after');
                  NEW_WIDGET.before = WidgetParse.getDomEvent.call(NEW_WIDGET,'before');
                  }
                 /*删除元素*/
                  NEW_WIDGET.remove = WidgetParse.getDomEvent.call(NEW_WIDGET,'remove');

                 
                 Cache.WidgetCache[NEW_WIDGET.name] = NEW_WIDGET;

                 /*指定参数变化监听*/
                 defineProperty && WidgetParse.setDefineProperty(NEW_WIDGET.name, defineProperty);
                  
                 /*page->路由管理->渲染指定页面*/  
                if(NEW_WIDGET.type === 'Page'){

                    Cache.PageCache.push(NEW_WIDGET.name);

                    Router.read(NEW_WIDGET.name);
                  }
                

                  return NEW_WIDGET;

            }
        };

export default WidgetParse;
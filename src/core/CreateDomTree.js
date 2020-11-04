
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
import { _typeof,D } from './Common.js'

import SparkUtil from './SparkUtil.js'

import GetAddressData from './GetAddressData.js'

import AddWidgetEvent from './AddWidgetEvent.js'

import DefaultSetting from './DefaultSetting.js'

import CSSManager from './CSSManager.js'

export default function (_rootAdress,domTarget,init,addtype,callback){
     
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
                var domData=GetAddressData(_this._rootAdress);
                _this.readAdress(domData);

                //初始化渲染body
                if(domData.type === 'Page' && init){

                          
                          /*insert html*/
                          var AC = D.getElementById('spark-' + DefaultSetting.name);
                          var hasPage = D.getElementsByClassName(domData.name).length<=1;
                                
                          if(!AC){
                             /*insert css*/
                              CSSManager.makeStyleTree(_this._css);
                              var tempDom = D.createElement('div');
                              tempDom.setAttribute('id', 'spark-' + DefaultSetting.name);
                              tempDom.innerHTML = this._html;
                              domTarget.insertBefore(tempDom, domTarget.firstChild);
                              tempDom=null;

                          }else if(hasPage){
                              CSSManager.makeNextStyleTree(_this._css,_this._rootAdress);
                             var tempDom = D.createElement('div');
                                 tempDom.innerHTML = this._html;
                              AC.appendChild(tempDom.firstChild);
                              tempDom=null;
                          }else{
                            return;
                          }
                         
                          /*default bind event && el && init*/
                          var tempTimer= setTimeout(function(){
                              clearTimeout(tempTimer)
                              _this.initPushEvent.call(_this,true);
                              _this.renderComplete.call(_this,_this._rootAdress);
                              _this._clear();
                       
                                 callback && callback();
                   
                             
                           });

                 
                }else{
                   //后期渲染部分节点
                
                     /*append css moveto pushcss()*/
                       CSSManager.makeNextStyleTree(_this._css,_this._rootAdress);
                 
                     /*append html*/

                        var tempDom = document.createElement("div");
                            tempDom.innerHTML = _this._html;
                            
                            if(addtype=='after' || addtype=='before'){
                                   var abTarget= domTarget;
                                  if(_typeof(domTarget.parentName,'String')) {
                                        domTarget = GetAddressData(domTarget.parentName) 
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
                                            AddWidgetEvent(el[index].lastChild, _this._rootAdress);
                                        }
                                        if(type == 'prepend'){
                                           el[index].insertBefore(tempDom.firstChild,el[index].firstChild);
                                           AddWidgetEvent(el[index].firstChild, _this._rootAdress);
                                        }
                                  })
                      }else{
                         if(type == 'append'){
                          el.appendChild(newel.firstChild);                          
                          AddWidgetEvent(el.lastChild, _this._rootAdress); 
                         }
                        if(type == 'prepend'){
                            el.insertBefore(newel.firstChild,el.firstChild);
                            AddWidgetEvent(el.firstChild, _this._rootAdress);
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
                                       AddWidgetEvent(abTarget[index].nextElementSibling, _this._rootAdress);
                                     }
                                     if(type == 'before'){
                                        parentNode.insertBefore(tempDom.firstChild,abTarget[index])                               
                                        AddWidgetEvent(abTarget[index].previousElementSibling, _this._rootAdress)
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
                                      AddWidgetEvent(abTarget.nextElementSibling, _this._rootAdress);
                                    }  

                                     if(type == 'before'){
                                        parentNode.insertBefore(newel.firstChild,abTarget);                          
                                        AddWidgetEvent(abTarget.previousElementSibling, _this._rootAdress);
                                     }
                          }
                               
            },
            /*add render complete function*/
            renderComplete:function(address){
                  var _this = this;
                  var node = GetAddressData(address);
                  var nodeList = D.getElementsByClassName(address); 
                    
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
                      return GetAddressData(node.child[index]);
                  };
                
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
                   cssStr ='{' + (_node.on ? pointer : '') +CSSManager.cssParse.objStyleToStr(CSSManager.cssParse.strStyleToObj(cssStr)) + '}';
                 
                   if(hcssStr){
                     hcssStr = '{' + pointer +CSSManager.cssParse.objStyleToStr(CSSManager.cssParse.strStyleToObj(hcssStr)) + '}';
                   }
                  

                var c = cssStr!='{}'?(!SparkUtil.includes(_this._css, className) ? '.' + className + cssStr : ''):'';
                var h =  _node.shover && (!SparkUtil.includes(_this._css, '.' + hclassName + ':hover')) ? '.' + hclassName +':hover'+  hcssStr : '';
               
           
                  if(SparkUtil.includes(_this._css,cssStr) || SparkUtil.includes(_this._css,hcssStr)){
                    if(SparkUtil.includes(_this._css,cssStr) && !SparkUtil.includes(_this._css, className)){
                     _this._css = CSSManager.cssParse.strStyleHandle(_this._css,cssStr,className);
                    }
                    if(SparkUtil.includes(_this._css,hcssStr)){
                    _this._css = CSSManager.cssParse.strStyleHandle(_this._css,hcssStr,hclassName + ':hover');
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
                                    AddWidgetEvent(nodeList[index], nodeName) 
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
                    _this.readAdress(GetAddressData(address))
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
                    var nw = GetAddressData(_node.child[i]);
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

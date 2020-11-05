/**
  * [WidgetWatchParams 监听属性管理]
  * @type {Object}
  */
import { D } from './Common.js'

import SparkUtil from './SparkUtil.js'
    
import CSSManager from './CSSManager.js'

export default {
          show:function(oval, nval, obj) {
              var tempOld = oval;
              if (oval === nval)
                  return nval;
              /*变化监听*/
              obj.watch && obj.watch['show'] && obj.watch['show'].call(obj,tempOld, nval);
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
                       }else if(nval){
                          obj.style='r_d_n';
                       }else if(!nval){
                         obj.style='display:none;';
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
                     newStyleObj =  Object.assign(CSSManager.cssParse.strStyleToObj(tempOld), CSSManager.cssParse.strStyleToObj(tempNewVal));

                     obj.styleObj = newStyleObj;

                     nval = CSSManager.cssParse.objStyleToStr(newStyleObj);
                     
                     // console.log(newStyleObj);
                 
                     CSSManager.cssParse.modify(obj.name, '{' + nval + '}');

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
              obj.watch && obj.watch['className'] && obj.watch['className'].call(obj,tempOld, nval);
              /*类名改变*/
              var nodeList = D.getElementsByClassName(obj.name);
              SparkUtil.traverse(nodeList.length,function(i,end){
                   nodeList[i].className = obj.className?nodeList[i].className.replace(tempOld,nval):nodeList[i].className+' '+nval;
              })
              }else{
                 return nval;
             
               }

          },
          text: function(oval, nval, obj) {
              var tempOld = oval;
              if (oval === nval)
                  return nval;
              /*变化监听*/
              obj.watch && obj.watch['text'] && obj.watch['text'].call(obj,tempOld, nval);
              /*数据改变*/
              var nodeList = D.getElementsByClassName(obj.name);
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
              obj.watch && obj.watch['child'] && obj.watch['child'].call(obj,oval, nval);
             
              return nval;
          },
          value:function(oval, nval, obj){
              var tempOld = oval;
              if (oval === nval)
                  return nval;
              /*变化监听*/
              obj.watch && obj.watch['value'] && obj.watch['value'].call(obj,tempOld, nval);
              if(!obj.writing){
                var nodeList = D.getElementsByClassName(obj.name);
                SparkUtil.traverse(nodeList.length,function(i,end){
                     nodeList[i].innerText = nval;
                })
              }

              return nval;
          }
     };
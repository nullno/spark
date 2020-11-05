
  /**
 * [addEvent 注册基本组件事件]
 * @AuthorHTL
 * @DateTime  2020-04-05T04:21:49+0800
 */
import { D } from './Common.js'

import { addEventListener } from './Common.js'

import SparkUtil from './SparkUtil.js'

import GetAddressData from './GetAddressData.js'

import SpecialWidgetEvent from './SpecialWidgetEvent.js'

export default function(target, node) {
        node = GetAddressData(node);
        
        if(!node.on)return;

        var spfn = SpecialWidgetEvent(node.type);
        

        if(node.on['click']){
            addEventListener(target,'click',node.debounce ? SparkUtil.debounce(function() {
                node.on['click'](node);
            }, 100) : function(e){
                 e.stopPropagation();
                 node.on['click'].call(node,e);

            },{capture:false,passive:true})
        }
        if(node.on['press']){

           addEventListener(target,SparkUtil.env.isMobile ? 'touchstart' : 'mousedown', function(e){
                 e.stopPropagation();
                 if(node.type == 'Drag' && spfn){
                    var ev = e || window.event;
                    spfn.start.call(node,ev,target)
                 }else{
                    node.on['press'].call(node,e);
                 }
            },{capture:true,passive:true});
           
        }
        if(node.on['move'] && node.type != 'Drag'){
         
           addEventListener(target,SparkUtil.env.isMobile ? 'touchmove' : 'mousemove', function(e){
                   e.stopPropagation();

                   node.on['move'].call(node,e);
              
            },{capture:true,passive:true});
           
        }
        if(node.on['up']){
           addEventListener(target,SparkUtil.env.isMobile ? 'touchend' : 'mouseup', function(e){
                 e.stopPropagation();
                 if(node.type == 'Drag' && spfn){
                    var ev = e || window.event;
                    spfn.end.call(node,ev,target)
                 }else{
                    node.on['up'].call(node,e);
                 }
            },{capture:true,passive:true});
          
        }

        if(node.on['hover']){
           addEventListener(target,'mouseover', function(e){
                 e.stopPropagation();
                  node.on['hover'].call(node,e);
            });
        }

        if(node.on['enter']){
           addEventListener(target,'mouseenter', function(e){
                 e.stopPropagation();
                  node.on['enter'].call(node,e);
            });
        }

        if(node.on['out']){
           addEventListener(target,'mouseout', function(e){
                 e.stopPropagation();
                  node.on['out'].call(node,e);
            });
        }

         if(node.on['leave']){
           addEventListener(target,'mouseleave', function(e){
                 e.stopPropagation();
                  node.on['leave'].call(node,e);
            });
        }
        
         if(node.on['input']){
           addEventListener(target,'input', function(e){
                  e.stopPropagation();
                  node.on['input'].call(node,e);
            });
        }
        if(node.on['keydown']){ 
           target.onkeydown = function(e) {
                  e.stopPropagation();
                  node.on['keydown'].call(node,e);
            };
        }

        
        
  
 }

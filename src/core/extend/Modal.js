/**
 * 模态框
 */
import { _typeof } from '../Common.js'

import WidgetManager from '../WidgetManager.js'

export default function(p) {
    
               var option = {
                    bgColor : 'rgba(0,0,0,0.5)',//
                    bgClose : false,
                    bgShow : false,
                    drag:false,
                    stopProp: true,
                    positionMargin:'3%',
                    autoClose:false,
                    position:'center'
                   };
               p = Object.assign(option,p);
               p.show = false;
               
               var Modal= {
                   wrap:null,
                   inner:null,
                   set:function(m){
                     var positionMargin = m.positionMargin;
                        switch(m.position){
                         case 'topcenter':
                            this.inner.style = 'top:'+positionMargin+';left:50%;margin-left:-'+this.inner.width()/2+'px;margin-top:none;bottom:none;';
                         break;
                         case 'topleft':
                            this.inner.style = 'top:'+positionMargin+';left:'+positionMargin+';margin-top:none;margin-left:none;bottom:none;';
                         break;
                         case 'topright':
                             this.inner.style = 'top:'+positionMargin+';right:'+positionMargin+';margin-top:none;margin-left:none;bottom:none;';
                         break;
                         case 'bottomcenter':
                           this.inner.style = 'bottom:'+positionMargin+';left:50%;margin-left:-'+this.inner.width()/2+'px;margin-top:none;top:none;';
                         break;
                         case 'bottomleft':
                            this.inner.style = 'bottom:'+positionMargin+';left:'+positionMargin+';margin-top:none;margin-left:none;top:none;';
                         break;
                         case 'bottomright':
                           this.inner.style = 'bottom:'+positionMargin+';right:'+positionMargin+';margin-top:none;margin-left:none;top:none;';
                         break;
                         default:
                           this.inner.style = 'top:50%;left:50%;margin-left:-'+this.inner.width()/2+'px;margin-top:-'+this.inner.height()/2+'px;bottom:none;right:none;';
                         break;
                        }
                       this.autoClose(m);
                    },
                    autoCloseTimer:null,
                    autoClose:function(m){
                      if(_typeof(m.autoClose,'Number')){
                         var speed = m.autoClose<1000?1000:m.autoClose;
                         this.autoCloseTimer = setTimeout(function(){
                          clearTimeout(Modal.autoCloseTimer)
                            m.close();
                          }, speed)
                       } 
                    },
                    con:function(){
                      delete p.child;
                      delete p.hideAni;
                      delete p.showAni
                      delete p.show;
                      delete p.style;
                      delete p.on;
                      Object.assign(Modal.wrap,p);
                    }
               };

                if(!p.bgShow){
                   p.on = p.bgClose?{click:function(){this.close();}}:null;
                   p.close = function(){
                       Modal.inner.show = false;
                       clearTimeout(Modal.autoCloseTimer);
                   };
                   p.open = function(){
                      if(Modal.inner.show)return;
                       Modal.inner.show = true;
                       Modal.set(Modal.inner);
                       // Modal.autoClose(Modal.inner);
                   };
                 }

                p.style=p.style?p.style+'position:fixed;z-index:9999;cursor:auto;':'width:50px;height:50px;position:fixed;z-index:9999;background-color:#3D3F3F;cursor:auto;';
                        
                Modal.inner = WidgetManager.Fixed(p);

                // WidgetParse.getNxWidget('Modal',
                //                     p,
                //                     'div',
                //                     'width:50px;height:50px;position:fixed;z-index:9999;background-color:#3D3F3F;cursor:auto;',
                //                     ['style','show'] 
                //                     );
          
                Modal.wrap = p.bgShow?WidgetManager.Fixed({
                        style:'top:0;left:0;right:0;width:100%;height:100%;background-color:'+p.bgColor+';z-index:9999;overflow:hidden;cursor:auto;',
                        child:[Modal.inner],
                        show:false,
                        on:p.bgClose?{click:function(){this.close();}}:null,
                        close:function(){
                           Modal.inner.show = false;
                           if(Modal.inner.hideAni && Modal.inner.hideAni.time){
                              setTimeout(function(){
                                  Modal.wrap.show = false;
                                },Modal.inner.hideAni.time)
                        
                           }else{
                              Modal.wrap.show = false;
                           }
                           clearTimeout(Modal.autoCloseTimer);
                        },
                        open:function(){
                         if(Modal.wrap.show)return;
                          Modal.wrap.show = Modal.inner.show = true;
                          Modal.set(Modal.wrap);
                        }
                        
                       }):null;
                   p.bgShow && Modal.con();
   return p.bgShow?Modal.wrap:Modal.inner;
}
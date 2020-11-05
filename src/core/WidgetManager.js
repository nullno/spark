    /**
 * [WidgetManager 组件管理]
 * @AuthorHTL
 * @DateTime  2020-04-01T05:24:20+0800
 * * 路由，页面，文本，图片，视频，音频，容器，拖动容器，画布，文字按钮，文字图标，列表，
    横向排列，纵向排列,局部滚动容器，弹窗，swiper(需要引入swiper)
 */


import Cache from './Cache.js'

import CreateWidgetName from './CreateWidgetName.js'

import CSSManager from './CSSManager.js'

import WidgetParse from './WidgetParse.js'

const WidgetManager ={
            Css: function(p) {
                !p && (p = '');
                var obj = {type:'Css'}
                  , address = CreateWidgetName('Css');

                obj.name = address;
                obj.styleObj = CSSManager.cssParse.strStyleToObj(p);
                obj.style = CSSManager.cssParse.objStyleToStr(obj.styleObj);

                Cache.CSSCache[address] = obj;
                WidgetParse.setDefineProperty(address, ['style']);

                return Cache.CSSCache[address];
            },
            Page: function(p) {
  
              return WidgetParse.getNxWidget('Page',
                                    p,
                                    'div',
                                    'position:relative;',
                                    ['style','child','className','show']
                                    );
            },
            Text: function(str, p) {

                !p && (p = {});
                 p.text=str;

                 return WidgetParse.getNxWidget('Text',
                                    p,
                                    'span',
                                    '',
                                    ['text','style','className','show']
                                    );
            },
            Image: function(src,p) {
                 !p && (p = {});
                  p.imgurl=src;
                  delete p.child;
                  return WidgetParse.getNxWidget('Image',
                                    p,
                                    'img',
                                    'border:0;',
                                    ['style','className','show']
                                    );
            },
            Box: function(p) {
               
                return WidgetParse.getNxWidget('Box',
                                    p,
                                    'div',
                                    'background-color:transparent;',
                                    ['style','child','className','show']
                                    );
            },

            List:function(p){
               return WidgetParse.getNxWidget('List',
                                    p,
                                    'ul',
                                    '',
                                    ['style','child','show','className']
                                    );
            },
            Drag:function(p) {
                !p && (p = {});
                var event = {press:function(){},move:function(){},up:function(){}};
                p.on=p.on?Object.assign(event,p.on):event;
                p.position={x:0,y:0,startX:0,startY:0};
                return WidgetParse.getNxWidget('Drag',
                                    p,
                                    'div',
                                    'position:fixed;background-color:#3D3F3F;',
                                    ['style','show','className']
                                    );
            },
            Stack:function(p) {
                return WidgetParse.getNxWidget('Stack',
                                    p,
                                    'div',
                                    'position:relative;background-color:#3D3F3F;',
                                    ['style','show','className']
                                    );
            },
            Position:function(p) {
              return WidgetParse.getNxWidget('Position',
                                    p,
                                    'div',
                                    'position:absolute;background-color:#3D3F3F;',
                                    ['style','show','className'] 
                                    );
            },
            Fixed:function(p) {
              return WidgetParse.getNxWidget('Fixed',
                                    p,
                                    'div',
                                    'position:fixed;background-color:#3D3F3F;',
                                    ['style','show','className'] 
                                    );
            },
            Input:function(p){
                 !p && (p = {});

                  var option = {
                       enable:true,
                       writing:false,
                       multiline:false,
                       value:'',
                       style:'',
                       autofocus:false,
                       placeholder:'please input....',
                       placeholderStyle:'color:#ccc;',
                       placeholderEnable:p.value!='',
                       onStyle:'color:#000;box-shadow:0 0 5px #4B95FF;',
                       offStyle:'color:#000;box-shadow:none;'
                  }

                
                 var event = {
                          input:function(e){
                             this.writing = true;
                             this.value = this.$el.innerText.replace(/<[\/\s]*(?:(?!div|br)[^>]*)>/g,'');
                             // console.log(this.value)
                             if(this.value!=''){
                              this.placeholderEnable = false;
                             }
                             this.on['inputing'] && this.on['inputing'].call(this,e);
                           
                          },
                          onkeydown:function(e){

                              if(!this.enable){
                                 e.preventDefault();
                              }
                              if(e.keyCode == 13 && !this.multiline){
                                e.cancelBubble=true;
                                e.preventDefault();
                              }
                             
                            },
                          onblur:function(e){
                              
                              this.writing = false;
                              if(this.value=='' || this.placeholderEnable){
                                 this.value = this.placeholder;
   
                                 this.style = this.offStyle+this.placeholderStyle;
                              }else{
                                this.style = this.offStyle;
                              }
                            },
                          onfocus:function(e){
                              this.style = this.onStyle;
                             
                              if(this.placeholderEnable || this.value==this.placeholder){
                                  this.value='';
                              }

                            },

                          };
                  
                
                 p.attributes='contenteditable=true';
                  

                 p.on=p.on?Object.assign(p.on,event):event;
                
                 p = Object.assign(option,p);

                 p.style += (!p.multiline?'white-space:nowrap;':'');
                 

                 p.autofocus=function(){
                           var obj = this.$el;
                            if (window.getSelection) {
                                obj.focus(); 
                                var range = window.getSelection();
                                range.selectAllChildren(obj);
                                range.collapseToEnd();
                            }
                            else if (document.selection) {//ie10 9 8 7 6 5
                                var range = document.selection.createRange();
                                range.moveToElementText(obj);
                                range.collapse(false);
                                range.select();
                            } 
                        }
        
                return WidgetParse.getNxWidget('Input',
                                    p,
                                    'div',
                                    'background-color:transparent;border:1px solid #4B95FF;min-width:200px;min-height:40px;line-height:38px;margin:5px;padding:0 5px;border-radius:5px;overflow:hidden;cursor:auto;',
                                    ['style','className','show','value']
                                    );
            },
            Textarea:function(){

            },
            Switch:function(p){

            } 
           
            //moreWiget...
        }

export default WidgetManager;
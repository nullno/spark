    /**
 * [WidgetManager 组件管理]
 * @AuthorHTL
 * @DateTime  2020-04-01T05:24:20+0800
 * * 路由，页面，文本，图片，视频，音频，容器，拖动容器，画布，文字按钮，文字图标，列表，
    横向排列，纵向排列,局部滚动容器，弹窗，swiper(需要引入swiper)
 */
import SparkCoreHandler from './SparkCoreHandler.js'

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

                SparkCoreHandler.CSSCache[address] = obj;
                WidgetParse.setDefineProperty(address, ['style']);

                return SparkCoreHandler.CSSCache[address];
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
                                    ['style','child','show']
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
                                    ['style','show']
                                    );
            },
            Stack:function(p) {
                return WidgetParse.getNxWidget('Stack',
                                    p,
                                    'div',
                                    'position:relative;background-color:#3D3F3F;',
                                    ['style','show']
                                    );
            },
            Position:function(p) {
              return WidgetParse.getNxWidget('Position',
                                    p,
                                    'div',
                                    'position:absolute;background-color:#3D3F3F;',
                                    ['style','show'] 
                                    );
            },
            Fixed:function(p) {
              return WidgetParse.getNxWidget('Fixed',
                                    p,
                                    'div',
                                    'position:fixed;background-color:#3D3F3F;',
                                    ['style','show'] 
                                    );
            },
            
           
            //moreWiget...
        }

export default WidgetManager;
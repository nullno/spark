import { _typeof } from './Common.js'

import SparkUtil from './SparkUtil.js'

import Cache from './Cache.js'

import WidgetOperate from './WidgetOperate.js'

import UrlParamHandler from './UrlParamHandler.js'

import SparkRender from './SparkRender.js'

import WidgetManager from './WidgetManager.js'

import DefaultSetting from './DefaultSetting.js'

import Extend from './Extend.js'

import GetAddressData from './GetAddressData.js'

 /*移动端开启调试工具*/
if(DefaultSetting.devTool===true && _typeof(DefaultSetting.devTool,'Boolean')){
    SparkUtil.devTool();
}

const Spark = {
        vcss:Cache.CSSCache,
        vdom: Cache.WidgetCache,
        vpage:Cache.PageCache,
        Render: SparkRender,
        module : {},
        moduleJs : null,
        env: SparkUtil.env,
        screen:SparkUtil.screen,
        Util:SparkUtil,
        urlParams:{
          search: UrlParamHandler.getUrlSearchParam(),
          hash: UrlParamHandler.getUrlHashParam()
        }
    };

Spark.Util._typeof = _typeof;

/**
 * [addNext 向下添加组件]
 * @AuthorHTL
 * @DateTime  2020-08-24T13:48:18+0800
 * @param     {[type]}                 target [目标容器]
 * @param     {[type]}                 newdom [新元素 widget array || single widget]
 */
Spark.append = function(target,newdoms){


 return WidgetOperate.addDom(target,newdoms,'append')
 
}
/*组件向上添加*/
Spark.prepend =function(target,newdoms){

  return WidgetOperate.addDom(target,newdoms,'prepend')
  
}    
/*移除组件*/
Spark.remove =function(target,deldom){
  
  return WidgetOperate.remove(target,deldom)
}

/*获取组件对象信息*/
Spark.GetAddressData = GetAddressData;


/*扩展组件*/
Spark.Extend=function(newWidget){
    Object.assign(Spark,Extend);
}



Object.assign(Spark,WidgetManager,Extend);



export default Spark;
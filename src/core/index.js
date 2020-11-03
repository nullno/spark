import SparkUtil from './SparkUtil.js'
import SparkCoreHandler from './SparkCoreHandler.js'
import UrlParamHandler from './UrlParamHandler.js'
import SparkRender from './SparkRender.js'


const Spark = {
        vcss:SparkCoreHandler.CSSCache,
        vdom: SparkCoreHandler.WidgetCache,
        vpage:SparkCoreHandler.PageCache,
        Render: SparkRender,
        module : {},
        moduleJs : null,
        env: SparkUtil.env,
        screen:SparkUtil.screen,
        urlParams:{
          search: UrlParamHandler.getUrlSearchParam(),
          hash: UrlParamHandler.getUrlHashParam()
        }
    };


Object.assign(Spark,SparkCoreHandler.HTML);


export default Spark;
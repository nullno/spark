export default {
  /*当前渲染队列*/
     renderQueues : [],

    /*模块加载队列*/
     tempModuleLoadQueue : [],

    /**
     * [widgetClassNames 组件地址缓存]
     * @type {Array}
     */
     ClassNames : [],
   /**
   * [CSSCache 样式缓存]
   * @type {Object}
   */
     CSSCache : {},
      /**
   * [WidgetCache 组件缓存]
   * @type {Object}
   */
     WidgetCache : {},
      /**
   * [PageCache 页面缓存]
   * @type {Array}
   */
     PageCache : [],
    /**
     * [SparkEventCache 事件缓存]
     * @type {Array}
     */
     EventCache : []
}
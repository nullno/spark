import { _typeof } from "./Common.js";

import SparkUtil from "./SparkUtil.js";

import Cache from "./Cache.js";

import WidgetOperate from "./WidgetOperate.js";

import WidgetManager from "./WidgetManager.js";

import DefaultSetting from "./DefaultSetting.js";

import Extend from "./Extend.js";

import GetAddressData from "./GetAddressData.js";

import Router from "./Router.js";

import axios from "axios";

const Spark = {
  vcss: Cache.CSSCache,
  vdom: Cache.WidgetCache,
  vpage: Cache.PageCache,
  module: {},
  moduleJs: null,
  env: SparkUtil.env,
  screen: SparkUtil.screen,
  Util: SparkUtil,
  setting: DefaultSetting,
};

Spark.Util._typeof = _typeof;

/*页面基本配置*/
Spark.setting = DefaultSetting._update;

/*获取组件对象信息*/
Spark.getWidget = GetAddressData;

/**
 * [addNext 向下添加组件]
 * @AuthorHTL
 * @DateTime  2020-08-24T13:48:18+0800
 * @param     {[type]}                 target [目标容器]
 * @param     {[type]}                 newdom [新元素 widget array || single widget]
 */
Spark.append = function (target, newdoms) {
  return WidgetOperate.addDom(target, newdoms, "append");
};
/*组件向上添加*/
Spark.prepend = function (target, newdoms) {
  return WidgetOperate.addDom(target, newdoms, "prepend");
};
/*移除组件*/
Spark.remove = function (target, deldom) {
  return WidgetOperate.remove(target, deldom);
};

/*扩展组件*/
Spark.Extend = function (newWidget) {
  Object.assign(Spark, newWidget);
};

/*数据请求*/
Spark.axios = axios;

//路由事件
Spark.router = Router.operate;
Spark.route = Router.Outed;

Object.assign(Spark, WidgetManager, Extend);

export default Spark;

import { _typeof } from "./common.js";

import SparkUtil from "./SparkUtil.js";

import Cache from "./Cache.js";

import WidgetOperate from "./WidgetOperate.js";

import WidgetManager from "./WidgetManager.js";

import DefaultSetting from "./DefaultSetting.js";

import Extend from "./Extend.js";

import GetAddressData from "./GetAddressData.js";

import Router from "./Router.js";

var VERSION = "1.0.0";

var Spark = {
  version: VERSION,
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
 * [append 向下添加组件]
 * @param {Object} target  目标容器
 * @param {Object|Array} newdoms  新元素
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

/*注册自定义组件*/
Spark.component = function (name, factory) {
  if (typeof name === "string" && typeof factory === "function") {
    Spark[name] = factory;
  } else if (_typeof(name, "Object")) {
    Object.assign(Spark, name);
  }
};

/*轻量 HTTP 请求（替代 axios，基于 fetch）*/
Spark.http = {
  request: function (url, options) {
    options = options || {};
    var method = (options.method || "GET").toUpperCase();
    var headers = options.headers || {};
    var fetchOpts = { method: method, headers: headers };
    if (options.data && method !== "GET" && method !== "HEAD") {
      if (typeof options.data === "object") {
        headers["Content-Type"] = headers["Content-Type"] || "application/json";
        fetchOpts.body = JSON.stringify(options.data);
      } else {
        fetchOpts.body = options.data;
      }
    }
    return fetch(url, fetchOpts).then(function (res) {
      var ct = res.headers.get("content-type") || "";
      var dataPromise = ct.indexOf("application/json") > -1 ? res.json() : res.text();
      return dataPromise.then(function (data) {
        return { status: res.status, ok: res.ok, data: data, headers: res.headers };
      });
    });
  },
  get: function (url, opts) { return Spark.http.request(url, Object.assign({}, opts, { method: "GET" })); },
  post: function (url, data, opts) { return Spark.http.request(url, Object.assign({}, opts, { method: "POST", data: data })); },
  put: function (url, data, opts) { return Spark.http.request(url, Object.assign({}, opts, { method: "PUT", data: data })); },
  del: function (url, opts) { return Spark.http.request(url, Object.assign({}, opts, { method: "DELETE" })); },
};

// 兼容：保留 Spark.axios 指向 Spark.http
Spark.axios = Spark.http;

//路由事件
Spark.router = Router.operate;
Spark.route = Router.Outed;

/*生命周期钩子 - 全局 beforeEach/afterEach */
Spark.onReady = function (callback) {
  if (typeof callback === "function") {
    window.addEventListener("DOMContentLoaded", callback);
  }
};

/*销毁所有组件 - 用于测试或页面卸载*/
Spark.destroy = function () {
  Cache.ClassNames.length = 0;
  for (var key in Cache.WidgetCache) {
    delete Cache.WidgetCache[key];
  }
  for (var key in Cache.CSSCache) {
    delete Cache.CSSCache[key];
  }
  Cache.PageCache.length = 0;
};

Object.assign(Spark, WidgetManager, Extend);

export default Spark;

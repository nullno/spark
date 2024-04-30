/**
 * [DefaultSetting 默认配置]
 * @type {Object}
 */
import SparkUtil from "./SparkUtil.js";
import { _typeof } from "./Common.js";

const DefaultSetting = {
  name: "web",
  title: "Spark Web",
  scene: "pc", //mobile,pc,mp
  devTool: false,
  gray: false,
  resetCss: "",
  _update: function (params) {
    params = params || {};
    delete params._update;
    Object.assign(DefaultSetting, params);
    document.title = DefaultSetting.title;
    /*移动端开启调试工具*/
    if (
      DefaultSetting.devTool === true &&
      _typeof(DefaultSetting.devTool, "Boolean")
    ) {
      SparkUtil.devTool();
    }
  },
};

export default DefaultSetting;

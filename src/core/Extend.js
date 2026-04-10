const requireWidget = require.context("./extend", true, /\.js$/);

const ExtendWidget = {};

requireWidget.keys().forEach((fileName) => {
  // 跳过公共工具模块
  if (fileName.indexOf("_utils") > -1) return;
  const componentConfig = requireWidget(fileName);

  const componentName = fileName
    .replace(/\//g, "")
    .replace(/\./g, "")
    .replace("js", "");

  ExtendWidget[componentName] = componentConfig.default || componentConfig;
});

export default ExtendWidget;

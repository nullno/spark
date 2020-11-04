
const requireWidget = require.context("./extend", true, /\.js$/);

const ExtendWidget = {};


requireWidget.keys().forEach((fileName) => {
 
     const componentConfig = requireWidget(fileName);
 
     const componentName = fileName.replace(/\//g, '').replace(/\./g, '').replace('js', '');
  
  
    ExtendWidget[componentName] = componentConfig.default || componentConfig;
  
})

export default ExtendWidget;
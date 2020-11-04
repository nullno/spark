
const requireWidget = require.context("./extend", true, /\.js$/);

const ExtendWidget = {};


requireWidget.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireWidget(fileName);
  // console.log(componentConfig)
  // Get the PascalCase version of the component name
  const componentName = fileName.replace(/\//g, '').replace(/\./g, '').replace('js', '');
  // Globally register the component
  
    // console.log(componentName,componentConfig.default || componentConfig)
    ExtendWidget[componentName] = componentConfig.default || componentConfig;
     
   // Vue.component(componentName, componentConfig.default || componentConfig)
})

export default ExtendWidget;
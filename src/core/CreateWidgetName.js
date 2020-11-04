/**
 * [CreateWidgetName description]
 * @AuthorHTL
 * @DateTime  2020-08-21T14:51:25+0800
 * @param     {[type]}                 widgetName [description]
 */
import SparkCoreHandler from './SparkCoreHandler.js';

export default function(widgetName){

    var hashName = widgetName + '-' + (((1 + Math.random()) * 0x10000000) | 0).toString(16);
            var testHash = SparkCoreHandler.widgetClassNames.join(',');

            hashName = (-testHash.indexOf(hashName) == true) ? hashName : hashName + 'x2';
            SparkCoreHandler.widgetClassNames.push(hashName);
  return hashName;
}

/**
 * [getAddressData 通过地址获取组件所有信息]
 * @param  {String} address  组件地址
 * @return {Object}          组件对象
 */
import Cache from "./Cache.js";

export default function (address) {
  if (!address || typeof address !== "string") {
    return null;
  }
  if (address.indexOf("Css") !== -1) {
    console.error("Spark: Cannot use Css widget as a child component. Address: " + address);
    return null;
  }
  return Cache.WidgetCache[address] || null;
}
